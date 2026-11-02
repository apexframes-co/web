// Logjika e certifikatave të garancisë (e pavarur nga Netlify, e testueshme).
// Ruajtja kalon përmes një "store" me këtë ndërfaqe:
//   get(key) → objekt|null · getEtag(key) → {data, etag}|null · set(key, value)
//   setIfNew(key, value) → bool · setIfMatch(key, value, etag) → bool · list(prefix) → string[] · delete(key)
import { createHash, createHmac, randomInt, timingSafeEqual } from 'node:crypto';

export const START_NUMBER = 5657; // numri i parë i lëshuar: AF-0005657
export const WARRANTY_YEARS = 5;
const TZ = 'Europe/Tirane';
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/* ---------- ndihmëse: numra, data ---------- */
export const formatNumber = (n) => 'AF-' + String(n).padStart(7, '0');
export function parseNumber(input) {
  const s = String(input || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const m = s.match(/^(?:AF)?(\d{1,7})$/);
  if (!m) return null;
  const n = Number(m[1]);
  return n >= START_NUMBER ? formatNumber(n) : null;
}
export const todayTirane = (now = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(now);
const isoOk = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + 'T00:00:00Z')) && new Date(s + 'T00:00:00Z').toISOString().slice(0, 10) === s;
export function addYears(iso, years) {
  const [y, m, d] = iso.split('-').map(Number);
  const lastDay = new Date(Date.UTC(y + years, m, 0)).getUTCDate(); // fundi i të njëjtit muaj, viti i ri (29 shk → 28 shk)
  return new Date(Date.UTC(y + years, m - 1, Math.min(d, lastDay))).toISOString().slice(0, 10);
}
export const daysBetween = (fromIso, toIso) => Math.round((Date.parse(toIso + 'T00:00:00Z') - Date.parse(fromIso + 'T00:00:00Z')) / 86400000);
export function certStatus(cert, today) {
  if (cert.status === 'revoked') return 'revoked';
  if (today < cert.startDate) return 'upcoming';
  if (today > cert.validUntil) return 'expired';
  return 'active';
}

/* ---------- validim ---------- */
const NAME_RE = /^[\p{L}][\p{L}\p{M}\s.'’-]{1,59}$/u;
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
export function validateApplicant(body, { today, requireOne = true } = {}) {
  const v = {
    name: clean(body.name, 60), surname: clean(body.surname, 60), email: clean(body.email, 120).toLowerCase(),
    phone: clean(body.phone, 24), product: clean(body.product, 120), reference: clean(body.reference, 60), purchaseDate: clean(body.purchaseDate, 10),
  };
  const err = {};
  // Minimizim i të dhënave: asnjë fushë personale nuk është e detyrueshme; nëse jepet, vlerësohet formati.
  if (v.name && !NAME_RE.test(v.name)) err.name = 'name';
  if (v.surname && !NAME_RE.test(v.surname)) err.surname = 'surname';
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) err.email = 'email';
  if (v.phone && (!/^\+?[0-9\s().-]{6,24}$/.test(v.phone) || v.phone.replace(/\D/g, '').length < 6)) err.phone = 'phone';
  if (v.purchaseDate && (!isoOk(v.purchaseDate) || v.purchaseDate > today || v.purchaseDate < '2000-01-01')) err.purchaseDate = 'purchaseDate';
  // Të paktën një detaj identifikues/verifikues, që kërkesa të mos jetë e zbrazët (pa u detyruar asnjë fushë të veçantë).
  if (requireOne && !Object.keys(err).length && !(v.name || v.surname || v.email || v.phone || v.reference)) err.empty = 'empty';
  return Object.keys(err).length ? { ok: false, errors: err } : { ok: true, value: v };
}
export const initials = (name, surname) => {
  const parts = [name, surname].map((x) => (Array.from(x || '')[0] || '').toUpperCase()).filter(Boolean);
  return parts.length ? parts.join('. ') + '.' : '';
};

/* ---------- identifikues ---------- */
export const newRequestCode = () => 'RQ-' + Array.from({ length: 8 }, () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]).join('');
export const normalizeRequestCode = (s) => {
  const c = String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^RQ/, '');
  return /^[A-Z2-9]{8}$/.test(c) && [...c].every((ch) => CODE_ALPHABET.includes(ch)) ? 'RQ-' + c : null;
};
export async function allocateNumber(store) {
  for (let i = 0; i < 10; i++) {
    const cur = await store.getEtag('counter');
    if (!cur) { if (await store.setIfNew('counter', { next: START_NUMBER + 1 })) return START_NUMBER; continue; }
    if (await store.setIfMatch('counter', { next: cur.data.next + 1 }, cur.etag)) return cur.data.next;
  }
  throw new Error('counter_contention');
}

/* ---------- kufizim shpejtësie (pa ruajtur IP) ---------- */
export const hash = (s, salt = '') => createHash('sha256').update(salt + '|' + s).digest('hex').slice(0, 24);
export async function hit(store, key, limit, windowSec, nowMs) {
  const k = `rl/${key}/${Math.floor(nowMs / 1000 / windowSec)}`;
  const cur = (await store.get(k)) || { n: 0 };
  if (cur.n >= limit) return false;
  await store.set(k, { n: cur.n + 1, t: Math.floor(nowMs / 1000) });
  return true;
}

/* ---------- token admini (HMAC, pa cookies) ---------- */
const b64u = (b) => Buffer.from(b).toString('base64url');
export function signToken(secret, ttlSec, nowMs) {
  const payload = b64u(JSON.stringify({ exp: Math.floor(nowMs / 1000) + ttlSec }));
  return payload + '.' + createHmac('sha256', secret).update(payload).digest('base64url');
}
export function verifyToken(secret, token, nowMs) {
  const [payload, sig] = String(token || '').split('.');
  if (!payload || !sig) return false;
  const good = createHmac('sha256', secret).update(payload).digest('base64url');
  const a = Buffer.from(sig), b = Buffer.from(good);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try { return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Math.floor(nowMs / 1000); } catch { return false; }
}
export function passwordMatches(input, expected) {
  const a = createHash('sha256').update(String(input)).digest(), b = createHash('sha256').update(String(expected)).digest();
  return timingSafeEqual(a, b);
}

/* ---------- operacione mbi të dhënat ---------- */
export async function createCertificate(store, req, { startDate, product, now }) {
  const start = startDate;
  for (let i = 0; i < 5; i++) {
    const number = formatNumber(await allocateNumber(store));
    const cert = {
      number, requestCode: req.code, name: req.name || '', surname: req.surname || '', email: req.email || '', phone: req.phone || '',
      product: product ?? req.product ?? '', reference: req.reference ?? '', startDate: start, validUntil: addYears(start, WARRANTY_YEARS),
      years: WARRANTY_YEARS, status: 'active', issuedAt: new Date(now).toISOString(),
    };
    if (await store.setIfNew(`cert/${number}`, cert)) return cert;
  }
  throw new Error('cert_conflict');
}
export function publicCert(cert, today) {
  const status = certStatus(cert, today);
  return { number: cert.number, holder: initials(cert.name, cert.surname), startDate: cert.startDate, validUntil: cert.validUntil, years: cert.years, status, daysLeft: status === 'active' || status === 'upcoming' ? daysBetween(today, cert.validUntil) : 0, today };
}

/* ---------- fshirje / anonimizim (e drejta e fshirjes) dhe pastrim sipas afateve ---------- */
export const RETENTION_MONTHS = 12; // kërkesat e pamiratuara fshihen pas 12 muajsh; certifikatat anonimizohen 12 muaj pas skadimit
export const PII_FIELDS = ['name', 'surname', 'email', 'phone', 'reference'];
export const anonymize = (rec, nowMs) => { const o = { ...rec, erased: true, erasedAt: new Date(nowMs).toISOString() }; for (const f of PII_FIELDS) o[f] = ''; return o; };
/** Fshin të dhënat personale të një certifikate (numri, datat dhe statusi mbeten, që kontrolli publik të vazhdojë të punojë). */
export async function eraseCertificate(store, number, nowMs) {
  const c = await store.get(`cert/${number}`); if (!c) return false;
  await store.set(`cert/${number}`, anonymize(c, nowMs));
  if (c.requestCode) { const r = await store.get(`req/${c.requestCode}`); if (r) await store.set(`req/${c.requestCode}`, anonymize(r, nowMs)); }
  return true;
}
export async function purgeExpired(store, nowMs, months = RETENTION_MONTHS) {
  const cutoff = new Date(nowMs); cutoff.setUTCMonth(cutoff.getUTCMonth() - months);
  const cutoffIso = cutoff.toISOString(); let requests = 0, counters = 0;
  for (const k of await store.list('req/')) {
    const r = await store.get(k);
    if (r && (r.status === 'pending' || r.status === 'rejected') && r.createdAt < cutoffIso) { await store.delete(k); requests++; }
  }
  const cutoffDate = cutoffIso.slice(0, 10); let certificates = 0;
  for (const k of await store.list('cert/')) {
    const c = await store.get(k);
    if (c && !c.erased && c.validUntil < cutoffDate) { await eraseCertificate(store, c.number, nowMs); certificates++; } // 12 muaj pas skadimit të garancisë
  }
  for (const k of await store.list('rl/')) { const v = await store.get(k); if (!v || v.t < nowMs / 1000 - 2 * 86400) { await store.delete(k); counters++; } }
  return { requests, certificates, counters };
}
