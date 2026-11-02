// Audit SEO i dist/: node scripts/audit.mjs
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const D = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(D).filter((f) => f.endsWith('.html'));
const issues = []; const titles = new Map(); const descs = new Map();
const exists = (u) => { const p = u.split('#')[0].split('?')[0]; if (!p) return true; const f = join(D, p); return existsSync(f) && (statSync(f).isFile() || existsSync(join(f, 'index.html'))); };
for (const f of files) {
  const rel = f.replace(D, ''); const h = readFileSync(f, 'utf8');
  if (rel === '/404.html' || /name="robots" content="noindex"/.test(h)) continue;
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1 = (h.match(/<h1[ >]/g) || []).length;
  if (title.length < 25 || title.length > 70) issues.push(`${rel}: title ${title.length} ch`);
  if (desc.length < 90 || desc.length > 175) issues.push(`${rel}: description ${desc.length} ch`);
  if (h1 !== 1) issues.push(`${rel}: ${h1} h1`);
  titles.set(title, [...(titles.get(title) || []), rel]); descs.set(desc, [...(descs.get(desc) || []), rel]);
  if (!/<link rel="canonical"/.test(h)) issues.push(`${rel}: no canonical`);
  for (const m of h.matchAll(/<img [^>]*>/g)) { if (!/ alt="[^"]+"/.test(m[0])) issues.push(`${rel}: img without alt`); if (!/ width=/.test(m[0])) issues.push(`${rel}: img no width`); }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch (e) { issues.push(`${rel}: bad JSON-LD`); } }
  for (const m of h.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)) { if (!exists(m[1].replace(/\?.*$/, ''))) issues.push(`${rel}: broken link ${m[1]}`); }
  const ids = new Set([...h.matchAll(/ id="([^"]+)"/g)].map((x) => x[1]));
  for (const m of h.matchAll(/href="#([^"]+)"/g)) { if (!ids.has(m[1])) issues.push(`${rel}: dangling anchor #${m[1]}`); }
  // hreflang reciprocity
  const alt = [...h.matchAll(/hreflang="(sq|en)" href="https:\/\/www\.apexframes\.co([^"]*)"/g)];
  for (const a of alt) { if (!exists(a[2])) issues.push(`${rel}: hreflang target missing ${a[2]}`); }
}
for (const [t, l] of titles) if (l.length > 1) issues.push(`duplicate title: ${t} -> ${l.join(', ')}`);
for (const [t, l] of descs) if (l.length > 1) issues.push(`duplicate desc -> ${l.join(', ')}`);
const sm = readFileSync(join(D, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>https:\/\/www\.apexframes\.co([^<]*)<\/loc>/g)].map((m) => m[1]);
for (const l of locs) if (!exists(l)) issues.push(`sitemap: missing ${l}`);
console.log(`pages: ${files.length - 1}, sitemap urls: ${locs.length}`);
console.log(issues.length ? issues.join('\n') : 'AUDIT OK: no issues');
