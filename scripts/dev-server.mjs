// Server lokal për testim: shërben dist/ dhe /api/warranty/* me ruajtje NË MEMORIE (humbet kur ndalet).
//   npm run build && npm run dev:warranty   →  http://localhost:8888   (fjalëkalimi i adminit: test)
// Vetëm për zhvillim. Në prodhim përdoret Netlify Functions + Netlify Blobs.
import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHandler } from '../netlify/lib/warranty-api.mjs';
import { memoryStore } from '../netlify/lib/blobs-store.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const handler = createHandler({ store: memoryStore(), mailer: { enabled: false, send: async () => ({ skipped: true }) }, env: { ADMIN_PASSWORD: 'test', SITE_URL: 'http://localhost:8888' } });
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.pdf': 'application/pdf' };
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost:8888'));
  if (url.pathname.startsWith('/api/warranty/')) {
    const chunks = []; for await (const c of req) chunks.push(c);
    const r = await handler(new Request(url, { method: req.method, headers: req.headers, body: chunks.length ? Buffer.concat(chunks) : undefined }), { ip: req.socket.remoteAddress });
    res.writeHead(r.status, Object.fromEntries(r.headers)); return res.end(Buffer.from(await r.arrayBuffer()));
  }
  let p = join(root, decodeURIComponent(url.pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'Content-Type': types[extname(p)] || 'application/octet-stream' }); res.end(readFileSync(p));
}).listen(8888, () => console.log('http://localhost:8888  (admin: /admin/garancia/ · fjalëkalimi: test)'));
