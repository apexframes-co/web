// Audit SEO/AEO i thelluar mbi dist/: node scripts/audit-deep.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const D = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(D).filter((f) => f.endsWith('/index.html'));
const pages = files.map((f) => {
  const h = readFileSync(f, 'utf8');
  const path = f.replace(D, '').replace(/index\.html$/, '');
  const main = (h.match(/<main[\s\S]*?<\/main>/) || [''])[0];
  const text = main.replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
  const links = [...h.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)].map((m) => m[1]);
  const heads = [...h.matchAll(/<h([1-6])[ >]/g)].map((m) => +m[1]);
  const ld = [...h.matchAll(/application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const nodes = ld.flatMap((j) => j['@graph'] || [j]);
  return { path, h, text, words: text.split(' ').length, links, heads, nodes, lang: (h.match(/<html lang="(\w+)"/) || [])[1], title: (h.match(/<title>([^<]*)/) || [])[1], h1: (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, '') };
});
const byPath = new Map(pages.map((p) => [p.path, p]));
const issues = [], notes = [];
const inbound = new Map(pages.map((p) => [p.path, 0]));
for (const p of pages) for (const l of new Set(p.links)) if (inbound.has(l) && l !== p.path) inbound.set(l, inbound.get(l) + 1);
for (const p of pages) {
  // hreflang reciprocity
  const alts = [...p.h.matchAll(/rel="alternate" hreflang="(\w[\w-]*)" href="https:\/\/www\.apexframes\.co([^"]*)"/g)].map((m) => [m[1], m[2]]);
  const other = alts.find(([l]) => l !== p.lang && l !== 'x-default');
  if (!other) issues.push(`${p.path}: no hreflang alternate`);
  else { const o = byPath.get(other[1]); if (!o) issues.push(`${p.path}: alternate missing ${other[1]}`); else if (!o.h.includes(`hreflang="${p.lang}" href="https://www.apexframes.co${p.path}"`)) issues.push(`${p.path}: hreflang not reciprocal with ${other[1]}`); }
  if (!p.h.includes(`rel="canonical" href="https://www.apexframes.co${p.path}"`)) issues.push(`${p.path}: canonical not self`);
  // headings
  let prev = 0; for (const h of p.heads) { if (prev && h > prev + 1) { issues.push(`${p.path}: heading skip h${prev}→h${h}`); break; } prev = h; }
  // thin content
  const kind = p.path.match(/privatesia|kushtet|privacy|terms/) ? 'legal' : p.path.includes('/blog/') && p.path.split('/').filter(Boolean).length > (p.lang === 'en' ? 2 : 1) ? 'post' : 'page';
  if (kind === 'post' && p.words < 450) notes.push(`thin post (${p.words} w): ${p.path}`);
  if (kind === 'page' && p.words < 250 && !p.path.match(/katalogu|catalogue/)) notes.push(`thin page (${p.words} w): ${p.path}`);
  // inbound links
  if ((inbound.get(p.path) || 0) < 3 && p.path !== '/' && p.path !== '/en/') notes.push(`few inbound links (${inbound.get(p.path)}): ${p.path}`);
  // schema
  const types = p.nodes.map((n) => [].concat(n['@type']).join('/'));
  for (const need of ['HomeAndConstructionBusiness', 'WebSite', 'WebPage|AboutPage|ContactPage|CollectionPage|FAQPage']) if (!types.some((t) => new RegExp(need).test(t))) issues.push(`${p.path}: schema missing ${need}`);
  if (!p.nodes.some((n) => n['@type'] === 'BreadcrumbList') && p.path !== '/' && p.path !== '/en/') issues.push(`${p.path}: no BreadcrumbList`);
  // title/h1 overlap
  const t = (p.title || '').toLowerCase(), h1 = (p.h1 || '').toLowerCase();
  if (p.path !== '/' && p.path !== '/en/' && h1 && !t.split(/[|:–-]/)[0].includes(h1.split(/[,:]/)[0].slice(0, 12))) notes.push(`title/H1 mismatch: ${p.path}: "${p.title}" vs "${p.h1}"`);
  // images
  for (const m of p.h.matchAll(/<img [^>]*>/g)) if (!/ alt="[^"]+"/.test(m[0]) && !/lb-img/.test(m[0])) issues.push(`${p.path}: img without alt`);
}
const sq = pages.filter((p) => p.lang === 'sq'), en = pages.filter((p) => p.lang === 'en');
const kw = (arr, re) => arr.filter((p) => re.test(p.title + ' ' + (p.h1 || ''))).length;
console.log(`pages ${pages.length} (sq ${sq.length}, en ${en.length}) | total words sq ${sq.reduce((a, p) => a + p.words, 0)} en ${en.reduce((a, p) => a + p.words, 0)}`);
console.log(`SQ titles/H1 with "PVC": ${kw(sq, /pvc/i)} | with "uPVC": ${kw(sq, /upvc/i)} | with "Tiranë|Shqipëri": ${kw(sq, /Tiran|Shqip/i)}`);
console.log(`EN titles/H1 with "PVC": ${kw(en, /pvc/i)} | with "Tirana|Albania": ${kw(en, /Tirana|Albania/i)}`);
console.log('--- ISSUES ---'); console.log(issues.length ? issues.join('\n') : 'none');
console.log('--- NOTES ---'); console.log(notes.length ? notes.join('\n') : 'none');
