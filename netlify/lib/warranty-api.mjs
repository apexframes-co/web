// API e certifikatave të garancisë: kërkesë → miratim nga admini → numër AF-0005657+ → verifikim online.
// createHandler injekton "store" dhe "mailer", prandaj testohet pa Netlify.
import {
  START_NUMBER, formatNumber, parseNumber, todayTirane, addYears, validateApplicant, newRequestCode, normalizeRequestCode, eraseCertificate, purgeExpired,
  createCertificate, publicCert, hash, hit, signToken, verifyToken, passwordMatches,
} from './warranty-core.mjs';
import { buildCertificatePdf } from './cert-pdf.mjs';
import { esc } from './mail.mjs';

const isoOk = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(s + 'T00:00:00Z').toISOString().slice(0, 10) === s;
const MAIL = {
  sq: {
    subjReq: 'Kërkesa juaj për certifikatë garancie', subjOk: 'Certifikata juaj e garancisë', page: '/garancia/certifikata/',
    req: (r, link) => `Përshëndetje ${r.name},<br><br>Kërkesa juaj për certifikatë garancie u pranua. Kodi i kërkesës është <strong>${r.code}</strong>. Ruajeni, sepse me të e kontrolloni statusin dhe e shkarkoni certifikatën sapo të miratohet: <a href="${link}">${link}</a>.<br><br>Apex Frames`,
    ok: (c, link, pdf) => `Përshëndetje ${c.name},<br><br>Certifikata juaj e garancisë u miratua.<br><strong>Nr. ${c.number}</strong> · e vlefshme nga ${c.startDate} deri më ${c.validUntil} (${c.years} vite).<br><br>Shkarkoni PDF-në: <a href="${pdf}">${pdf}</a><br>Kontrolloni afatin online: <a href="${link}">${link}</a><br><br>Apex Frames`,
  },
  en: {
    subjReq: 'Your warranty certificate request', subjOk: 'Your warranty certificate', page: '/en/warranty/certificate/',
    req: (r, link) => `Hello ${r.name},<br><br>We received your warranty certificate request. Your request code is <strong>${r.code}</strong>. Keep it: you can check the status and download the certificate once approved: <a href="${link}">${link}</a>.<br><br>Apex Frames`,
    ok: (c, link, pdf) => `Hello ${c.name},<br><br>Your warranty certificate has been approved.<br><strong>No. ${c.number}</strong> · valid from ${c.startDate} to ${c.validUntil} (${c.years} years).<br><br>Download the PDF: <a href="${pdf}">${pdf}</a><br>Check the validity online: <a href="${link}">${link}</a><br><br>Apex Frames`,
  },
};

export function createHandler({ store, mailer, env = process.env, now = () => Date.now() }) {
  const SITE = (env.SITE_URL || 'https://www.apexframes.co').replace(/\/$/, '');
  const salt = env.TOKEN_SECRET || env.ADMIN_PASSWORD || 'apex-frames';
  const secret = env.TOKEN_SECRET || env.ADMIN_PASSWORD || '';
  const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
  const pdfResponse = (bytes, number) => new Response(bytes, { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename="Certifikata-${number}.pdf"`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
  const readJson = async (req) => { try { if (Number(req.headers.get('content-length') || 0) > 20000) return null; const b = await req.json(); return b && typeof b === 'object' ? b : null; } catch { return null; } };
  const notify = (to, subject, html) => mailer.send({ to, subject, html, text: html.replace(/<br>/g, '\n').replace(/<[^>]+>/g, '') });

  return async function handler(req, context = {}) {
    const url = new URL(req.url);
    const route = url.pathname.replace(/^\/api\/warranty\/?/, '').replace(/\/$/, '');
    const method = req.method;
    const t = now();
    const today = todayTirane(new Date(t));
    const ip = req.headers.get('x-nf-client-connection-ip') || context.ip || (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    const ipHash = hash(ip, salt);
    if (method === 'POST') { const o = req.headers.get('origin'); if (o) { try { if (new URL(o).host !== url.host) return json({ error: 'origin' }, 403); } catch { return json({ error: 'origin' }, 403); } } }

    try {
      /* ===== PUBLIKE ===== */
      if (route === 'request' && method === 'POST') {
        if (!(await hit(store, `ip-req/${ipHash}`, 5, 3600, t))) return json({ error: 'rate' }, 429);
        const body = await readJson(req); if (!body) return json({ error: 'bad_request' }, 400);
        if (body.website) return json({ ok: true, code: newRequestCode() }); // honeypot: bot-ët marrin "sukses" të rremë
        const ts = Number(body.ts); if (!ts || t - ts < 1500 || t - ts > 6 * 3600 * 1000) return json({ error: 'timing' }, 400);
        if (body.consent !== true) return json({ error: 'consent' }, 400);
        const v = validateApplicant(body, { today }); if (!v.ok) return json({ error: 'validation', fields: v.errors }, 400);
        if (v.value.email && !(await hit(store, `em/${hash(v.value.email, salt)}`, 3, 86400, t))) return json({ error: 'rate' }, 429);
        let rec = null;
        for (let i = 0; i < 5 && !rec; i++) { const c = newRequestCode(); const r = { code: c, status: 'pending', createdAt: new Date(t).toISOString(), lang: body.lang === 'en' ? 'en' : 'sq', ...v.value }; if (await store.setIfNew(`req/${c}`, r)) rec = r; }
        if (!rec) return json({ error: 'server' }, 500);
        const L = MAIL[rec.lang]; const link = `${SITE}${L.page}?kod=${rec.code}`;
        await Promise.all([
          rec.email ? notify(rec.email, L.subjReq, L.req(rec, link)) : null,
          notify(env.ADMIN_NOTIFY_EMAIL || 'info@apexframes.co', `Kërkesë e re për certifikatë (${rec.code})`, `Kërkesë e re për certifikatë garancie (${rec.code}).<br>Shikojeni dhe miratojeni te ${SITE}/admin/garancia/ (të dhënat personale shihen vetëm te paneli).`),
        ]);
        return json({ ok: true, code: rec.code, mail: Boolean(rec.email && mailer.enabled) });
      }

      if (route === 'status' && method === 'GET') {
        if (!(await hit(store, `ip-chk/${ipHash}`, 40, 600, t))) return json({ error: 'rate' }, 429);
        const code = normalizeRequestCode(url.searchParams.get('code')); if (!code) return json({ found: false });
        const r = await store.get(`req/${code}`); if (!r) return json({ found: false });
        const out = { found: true, status: r.status === 'approving' ? 'pending' : r.status, code, name: `${r.name || ''} ${r.surname || ''}`.trim(), createdAt: r.createdAt, reason: r.status === 'rejected' ? r.reason || '' : undefined };
        if (r.status === 'approved' && r.number) { const c = await store.get(`cert/${r.number}`); if (c) { const pc = publicCert(c, today); Object.assign(out, { number: pc.number, startDate: pc.startDate, validUntil: pc.validUntil, years: pc.years, daysLeft: pc.daysLeft, today, certState: pc.status, product: c.product, pdf: c.status !== 'revoked' }); } }
        return json(out);
      }

      if (route === 'verify' && method === 'GET') {
        if (!(await hit(store, `ip-chk/${ipHash}`, 40, 600, t))) return json({ error: 'rate' }, 429);
        const n = parseNumber(url.searchParams.get('n')); if (!n) return json({ found: false });
        const c = await store.get(`cert/${n}`); if (!c) return json({ found: false });
        return json({ found: true, ...publicCert(c, today) });
      }

      if (route === 'pdf' && method === 'GET') {
        if (!(await hit(store, `ip-pdf/${ipHash}`, 20, 600, t))) return json({ error: 'rate' }, 429);
        const code = normalizeRequestCode(url.searchParams.get('code')); if (!code) return json({ error: 'not_found' }, 404);
        const r = await store.get(`req/${code}`); if (!r || r.status !== 'approved' || !r.number) return json({ error: 'not_found' }, 404);
        const c = await store.get(`cert/${r.number}`); if (!c || c.status === 'revoked') return json({ error: 'not_found' }, 404);
        return pdfResponse(await buildCertificatePdf(c, { siteUrl: SITE }), c.number);
      }

      /* ===== ADMIN ===== */
      if (route === 'admin/login' && method === 'POST') {
        if (!env.ADMIN_PASSWORD) return json({ error: 'not_configured' }, 503);
        if (!(await hit(store, `ip-login/${ipHash}`, 8, 900, t))) return json({ error: 'rate' }, 429);
        const body = await readJson(req);
        if (!body || !passwordMatches(body.password || '', env.ADMIN_PASSWORD)) return json({ error: 'invalid' }, 401);
        return json({ ok: true, token: signToken(secret, 12 * 3600, t) });
      }

      if (route.startsWith('admin/')) {
        const auth = (req.headers.get('authorization') || '').replace(/^Bearer /, '');
        if (!secret || !verifyToken(secret, auth, t)) return json({ error: 'unauthorized' }, 401);

        if (route === 'admin/list' && method === 'GET') {
          const loadAll = async (prefix) => { const keys = await store.list(prefix); const out = []; for (let i = 0; i < keys.length; i += 25) out.push(...(await Promise.all(keys.slice(i, i + 25).map((k) => store.get(k))))); return out.filter(Boolean); };
          const [requests, certificates, counter] = await Promise.all([loadAll('req/'), loadAll('cert/'), store.get('counter')]);
          requests.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
          certificates.sort((a, b) => b.number.localeCompare(a.number));
          return json({ today, next: formatNumber(counter ? counter.next : START_NUMBER), requests, certificates: certificates.map((c) => ({ ...c, state: publicCert(c, today).status, daysLeft: publicCert(c, today).daysLeft })) });
        }

        if ((route === 'admin/approve' || route === 'admin/reject') && method === 'POST') {
          const body = await readJson(req); const code = normalizeRequestCode(body?.code); if (!code) return json({ error: 'bad_request' }, 400);
          const cur = await store.getEtag(`req/${code}`); if (!cur) return json({ error: 'not_found' }, 404);
          if (cur.data.status !== 'pending') return json({ error: 'not_pending', status: cur.data.status }, 409);
          if (route === 'admin/reject') {
            const rec = { ...cur.data, status: 'rejected', rejectedAt: new Date(t).toISOString(), reason: String(body.reason || '').slice(0, 200) };
            if (!(await store.setIfMatch(`req/${code}`, rec, cur.etag))) return json({ error: 'conflict' }, 409);
            return json({ ok: true });
          }
          const edit = validateApplicant({ ...cur.data, name: body.name ?? cur.data.name, surname: body.surname ?? cur.data.surname, product: body.product ?? cur.data.product }, { today, requireOne: false });
          if (!edit.ok) return json({ error: 'validation', fields: edit.errors }, 400);
          const person = { ...cur.data, name: edit.value.name, surname: edit.value.surname };
          const startDate = body.startDate ? String(body.startDate) : cur.data.purchaseDate || today;
          if (!isoOk(startDate) || startDate < '2000-01-01' || startDate > addYears(today, 1)) return json({ error: 'validation', fields: { startDate: 'startDate' } }, 400);
          if (!(await store.setIfMatch(`req/${code}`, { ...cur.data, status: 'approving' }, cur.etag))) return json({ error: 'conflict' }, 409); // mbron nga miratimi i dyfishtë
          try {
            const cert = await createCertificate(store, person, { startDate, product: edit.value.product, now: t });
            await store.set(`req/${code}`, { ...person, status: 'approved', number: cert.number, startDate, approvedAt: new Date(t).toISOString() });
            const L = MAIL[cur.data.lang || 'sq'];
            if (person.email) await notify(cur.data.email, L.subjOk, L.ok(cert, `${SITE}${L.page}?n=${cert.number}`, `${SITE}/api/warranty/pdf?code=${code}`));
            return json({ ok: true, cert });
          } catch (e) { await store.set(`req/${code}`, cur.data); throw e; }
        }

        if (route === 'admin/revoke' && method === 'POST') {
          const body = await readJson(req); const n = parseNumber(body?.number); if (!n) return json({ error: 'bad_request' }, 400);
          const c = await store.get(`cert/${n}`); if (!c) return json({ error: 'not_found' }, 404);
          await store.set(`cert/${n}`, { ...c, status: body.restore ? 'active' : 'revoked', revokedAt: body.restore ? undefined : new Date(t).toISOString(), revokeReason: body.restore ? undefined : String(body.reason || '').slice(0, 200) });
          return json({ ok: true });
        }

        if (route === 'admin/issue' && method === 'POST') {
          const body = await readJson(req); if (!body) return json({ error: 'bad_request' }, 400);
          const v = validateApplicant(body, { today }); if (!v.ok) return json({ error: 'validation', fields: v.errors }, 400);
          const startDate = body.startDate ? String(body.startDate) : today;
          if (!isoOk(startDate) || startDate < '2000-01-01' || startDate > addYears(today, 1)) return json({ error: 'validation', fields: { startDate: 'startDate' } }, 400);
          let rec; for (let i = 0; i < 5 && !rec; i++) { const code = newRequestCode(); const r = { code, status: 'approving', createdAt: new Date(t).toISOString(), lang: 'sq', direct: true, ...v.value }; if (await store.setIfNew(`req/${code}`, r)) rec = r; }
          const cert = await createCertificate(store, rec, { startDate, product: v.value.product, now: t });
          await store.set(`req/${rec.code}`, { ...rec, status: 'approved', number: cert.number, startDate, approvedAt: new Date(t).toISOString() });
          return json({ ok: true, cert, code: rec.code });
        }

        if (route === 'admin/erase' && method === 'POST') {
          const body = await readJson(req); if (!body) return json({ error: 'bad_request' }, 400);
          const n = parseNumber(body.number);
          if (n) { if (!(await eraseCertificate(store, n, t))) return json({ error: 'not_found' }, 404); return json({ ok: true, kept: 'number-dates-status' }); }
          const code = normalizeRequestCode(body.code); const r = code && (await store.get(`req/${code}`));
          if (!r) return json({ error: 'not_found' }, 404);
          if (r.status === 'approved' && r.number) { await eraseCertificate(store, r.number, t); return json({ ok: true, kept: 'number-dates-status' }); }
          await store.delete(`req/${code}`); return json({ ok: true, kept: 'nothing' });
        }

        if (route === 'admin/purge' && method === 'POST') return json({ ok: true, ...(await purgeExpired(store, t)) });

        if (route === 'admin/pdf' && method === 'GET') {
          const n = parseNumber(url.searchParams.get('n')); const c = n && (await store.get(`cert/${n}`)); if (!c) return json({ error: 'not_found' }, 404);
          return pdfResponse(await buildCertificatePdf(c, { siteUrl: SITE }), c.number);
        }
      }
      return json({ error: 'not_found' }, 404);
    } catch (e) {
      console.error('warranty error', e);
      return json({ error: 'server' }, 500);
    }
  };
}
