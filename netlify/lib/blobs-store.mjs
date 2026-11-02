// Ruajtja e vërtetë: Netlify Blobs (e brendshme në Netlify, pa shërbime të jashtme), me konsistencë të fortë.
import { getStore } from '@netlify/blobs';

export function blobsStore(name = 'warranty') {
  const s = getStore({ name, consistency: 'strong' });
  return {
    async get(key) { return await s.get(key, { type: 'json' }); },
    async getEtag(key) { const r = await s.getWithMetadata(key, { type: 'json' }); return r ? { data: r.data, etag: r.etag } : null; },
    async set(key, value) { await s.setJSON(key, value); },
    async setIfNew(key, value) { const r = await s.setJSON(key, value, { onlyIfNew: true }); return r.modified; },
    async setIfMatch(key, value, etag) { const r = await s.setJSON(key, value, { onlyIfMatch: etag }); return r.modified; },
    async list(prefix) { const out = []; for await (const page of s.list({ prefix, paginate: true })) out.push(...page.blobs.map((b) => b.key)); return out; },
    async delete(key) { await s.delete(key); },
  };
}

// Version në memorie vetëm për teste dhe zhvillim lokal (nuk përdoret kurrë në prodhim).
export function memoryStore() {
  const m = new Map(); let v = 0;
  const clone = (x) => JSON.parse(JSON.stringify(x));
  return {
    async get(k) { return m.has(k) ? clone(m.get(k).data) : null; },
    async getEtag(k) { return m.has(k) ? { data: clone(m.get(k).data), etag: String(m.get(k).etag) } : null; },
    async set(k, val) { m.set(k, { data: clone(val), etag: ++v }); },
    async setIfNew(k, val) { if (m.has(k)) return false; m.set(k, { data: clone(val), etag: ++v }); return true; },
    async setIfMatch(k, val, etag) { if (!m.has(k) || String(m.get(k).etag) !== String(etag)) return false; m.set(k, { data: clone(val), etag: ++v }); return true; },
    async list(prefix) { return [...m.keys()].filter((k) => k.startsWith(prefix)); },
    async delete(k) { m.delete(k); },
    _dump: () => Object.fromEntries([...m].map(([k, x]) => [k, x.data])),
  };
}
