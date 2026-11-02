// node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from '../netlify/lib/warranty-api.mjs';
import { memoryStore } from '../netlify/lib/blobs-store.mjs';
import { addYears, parseNumber, formatNumber } from '../netlify/lib/warranty-core.mjs';

const ENV = { ADMIN_PASSWORD: 'sekret-123', SITE_URL: 'https://www.apexframes.co' };
const noMail = { enabled: false, sent: [], async send(m) { this.sent.push(m); return { skipped: true }; } };
let clock = Date.parse('2026-11-03T10:00:00Z');
function setup() {
  const store = memoryStore(); const mailer = { ...noMail, sent: [], send(m) { this.sent.push(m); return Promise.resolve({ skipped: true }); } };
  const handler = createHandler({ store, mailer, env: ENV, now: () => clock });
  const call = async (path, { method = 'GET', body, token, ip = '1.1.1.1', headers = {} } = {}) => {
    const h = { 'x-nf-client-connection-ip': ip, origin: 'https://www.apexframes.co', ...headers, ...(token ? { authorization: `Bearer ${token}` } : {}), ...(body ? { 'content-type': 'application/json' } : {}) };
    const res = await handler(new Request('https://www.apexframes.co/api/warranty/' + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined }));
    const ct = res.headers.get('content-type') || '';
    return { status: res.status, ct, data: ct.includes('json') ? await res.json() : new Uint8Array(await res.arrayBuffer()) };
  };
  const login = async () => (await call('admin/login', { method: 'POST', body: { password: ENV.ADMIN_PASSWORD }, ip: '9.9.9.9' })).data.token;
  const applicant = (o = {}) => ({ name: 'Arben', surname: 'Hoxha', email: 'arben@example.com', phone: '+355 69 123 4567', product: 'Dritare PVC', consent: true, ts: clock - 5000, lang: 'sq', ...o });
  return { store, mailer, call, login, applicant };
}

test('numri, data dhe 5 vjet', () => {
  assert.equal(formatNumber(5657), 'AF-0005657');
  assert.equal(parseNumber('af 0005657'), 'AF-0005657'); assert.equal(parseNumber('5657'), 'AF-0005657'); assert.equal(parseNumber('AF-0000001'), null); assert.equal(parseNumber('xx'), null);
  assert.equal(addYears('2026-11-02', 5), '2031-11-02'); assert.equal(addYears('2024-02-29', 5), '2029-02-28');
});

test('rrjedha e plotë: kërkesë → miratim AF-0005657 → verifikim → PDF', async () => {
  const { call, login, applicant, mailer } = setup();
  const r = await call('request', { method: 'POST', body: applicant() });
  assert.equal(r.status, 200); assert.match(r.data.code, /^RQ-[A-Z2-9]{8}$/);
  const code = r.data.code;
  let st = await call(`status?code=${code}`); assert.equal(st.data.status, 'pending'); assert.equal(st.data.number, undefined);
  assert.equal((await call('admin/list')).status, 401);
  const token = await login();
  const list = await call('admin/list', { token }); assert.equal(list.data.next, 'AF-0005657'); assert.equal(list.data.requests.length, 1);
  const ap = await call('admin/approve', { method: 'POST', token, body: { code, startDate: '2026-11-02' } });
  assert.equal(ap.status, 200); assert.equal(ap.data.cert.number, 'AF-0005657'); assert.equal(ap.data.cert.validUntil, '2031-11-02');
  st = await call(`status?code=${code}`); assert.equal(st.data.status, 'approved'); assert.equal(st.data.number, 'AF-0005657'); assert.equal(st.data.pdf, true);
  const v = await call('verify?n=AF-0005657'); assert.equal(v.data.found, true); assert.equal(v.data.status, 'active'); assert.equal(v.data.holder, 'A. H.'); assert.equal(v.data.validUntil, '2031-11-02'); assert.ok(v.data.daysLeft > 1800);
  assert.ok(!JSON.stringify(v.data).includes('arben') && !JSON.stringify(v.data).includes('Hoxha'), 'verifikimi publik nuk zbulon të dhëna personale');
  const pdf = await call(`pdf?code=${code}`); assert.equal(pdf.status, 200); assert.equal(pdf.ct, 'application/pdf'); assert.equal(Buffer.from(pdf.data.slice(0, 5)).toString(), '%PDF-');
  assert.equal((await call('pdf?code=RQ-AAAAAAAA')).status, 404);
  assert.equal(mailer.sent.length, 3, 'email klientit + adminit (kërkesë) + klientit (miratim)');
  // numri i dytë
  const r2 = await call('request', { method: 'POST', body: applicant({ email: 'b@example.com' }), ip: '2.2.2.2' });
  const ap2 = await call('admin/approve', { method: 'POST', token, body: { code: r2.data.code } }); assert.equal(ap2.data.cert.number, 'AF-0005658');
  assert.equal(ap2.data.cert.startDate, '2026-11-03', 'data e fillimit = sot (Tiranë) kur nuk jepet');
});

test('skadim, revokim dhe rikthim', async () => {
  const { call, login, applicant } = setup();
  const token = await login();
  const { data: { code } } = await call('request', { method: 'POST', body: applicant() });
  await call('admin/approve', { method: 'POST', token, body: { code, startDate: '2026-11-03' } });
  assert.equal((await call('verify?n=5657')).data.status, 'active');
  await call('admin/revoke', { method: 'POST', token, body: { number: 'AF-0005657', reason: 'test' } });
  assert.equal((await call('verify?n=AF-0005657')).data.status, 'revoked');
  assert.equal((await call(`pdf?code=${code}`)).status, 404, 'PDF e revokuar nuk jepet te klienti');
  await call('admin/revoke', { method: 'POST', token, body: { number: 'AF-0005657', restore: true } });
  clock = Date.parse('2031-11-04T10:00:00Z'); // 5 vjet + 1 ditë
  assert.equal((await call('verify?n=AF-0005657', { ip: '3.3.3.3' })).data.status, 'expired');
  clock = Date.parse('2026-11-03T10:00:00Z');
});

test('validim, honeypot, kohë, pëlqim, kufizim, origjinë', async () => {
  const { call, applicant, store } = setup();
  const bad = await call('request', { method: 'POST', body: applicant({ email: 'x', phone: '12', name: '' }) });
  assert.equal(bad.status, 400); assert.deepEqual(Object.keys(bad.data.fields).sort(), ['email', 'name', 'phone']);
  assert.equal((await call('request', { method: 'POST', body: applicant({ consent: false }) })).status, 400);
  assert.equal((await call('request', { method: 'POST', body: applicant({ ts: clock - 100 }) })).status, 400, 'shumë shpejt = bot');
  const hp = await call('request', { method: 'POST', body: applicant({ website: 'http://spam' }) });
  assert.equal(hp.status, 200); assert.equal((await store.list('req/')).length, 0, 'honeypot nuk ruan asgjë');
  assert.equal((await call('request', { method: 'POST', body: applicant(), headers: { origin: 'https://evil.example' } })).status, 403);
  for (let i = 0; i < 3; i++) assert.equal((await call('request', { method: 'POST', body: applicant({ email: 'same@example.com' }), ip: `5.5.5.${i}` })).status, 200);
  assert.equal((await call('request', { method: 'POST', body: applicant({ email: 'same@example.com' }), ip: '5.5.5.9' })).status, 429, 'maks 3 kërkesa/ditë për email');
});

test('admini: fjalëkalim i gabuar, kufizim, token i skaduar, miratim i dyfishtë', async () => {
  const { call, login, applicant } = setup();
  assert.equal((await call('admin/login', { method: 'POST', body: { password: 'gabim' } })).status, 401);
  for (let i = 0; i < 8; i++) await call('admin/login', { method: 'POST', body: { password: 'gabim' }, ip: '7.7.7.7' });
  assert.equal((await call('admin/login', { method: 'POST', body: { password: ENV.ADMIN_PASSWORD }, ip: '7.7.7.7' })).status, 429);
  const token = await login();
  const { data: { code } } = await call('request', { method: 'POST', body: applicant() });
  const [a, b] = await Promise.all([1, 2].map(() => call('admin/approve', { method: 'POST', token, body: { code, startDate: '2026-11-03' } })));
  assert.deepEqual([a.status, b.status].sort(), [200, 409], 'vetëm një miratim kalon');
  const list = await call('admin/list', { token }); assert.equal(list.data.certificates.length, 1);
  clock += 13 * 3600 * 1000; assert.equal((await call('admin/list', { token })).status, 401, 'token skadon pas 12 orësh'); clock -= 13 * 3600 * 1000;
});

test('numërim unik në miratime paralele', async () => {
  const { call, login, applicant } = setup(); const token = await login();
  const codes = [];
  for (let i = 0; i < 6; i++) codes.push((await call('request', { method: 'POST', body: applicant({ email: `u${i}@example.com` }), ip: `8.8.8.${i}` })).data.code);
  const res = await Promise.all(codes.map((code) => call('admin/approve', { method: 'POST', token, body: { code, startDate: '2026-11-03' } })));
  const nums = res.map((r) => r.data.cert.number).sort();
  assert.deepEqual(nums, ['AF-0005657', 'AF-0005658', 'AF-0005659', 'AF-0005660', 'AF-0005661', 'AF-0005662']);
});

test('refuzim dhe lëshim i drejtpërdrejtë nga admini', async () => {
  const { call, login, applicant } = setup(); const token = await login();
  const { data: { code } } = await call('request', { method: 'POST', body: applicant() });
  await call('admin/reject', { method: 'POST', token, body: { code, reason: 'Nuk gjendet blerja' } });
  const st = await call(`status?code=${code}`); assert.equal(st.data.status, 'rejected'); assert.equal(st.data.reason, 'Nuk gjendet blerja');
  const iss = await call('admin/issue', { method: 'POST', token, body: { name: 'Elira', surname: 'Dervishi', product: 'Fasadë', startDate: '2026-10-01' } });
  assert.equal(iss.data.cert.number, 'AF-0005657'); assert.equal(iss.data.cert.validUntil, '2031-10-01');
  assert.equal((await call('admin/pdf?n=AF-0005657', { token })).ct, 'application/pdf');
});
