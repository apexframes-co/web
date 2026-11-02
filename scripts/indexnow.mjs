// Njofton Bing/Yandex/etj. (IndexNow) për të gjitha URL-të e sitemap-it pas publikimit:
//   node scripts/indexnow.mjs
// Google nuk përdor IndexNow: për të dërgoni sitemap-in te Search Console.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const D = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const build = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'build.mjs'), 'utf8');
const key = build.match(/INDEXNOW_KEY = '([a-f0-9]{32})'/)[1];
const host = 'www.apexframes.co';
const urls = [...readFileSync(join(D, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URL → HTTP ${res.status} (200/202 = në rregull)`);
