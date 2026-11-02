// Faqja e certifikatës së garancisë: kërkesë, kontroll afati/statusi (pa cookies, pa libra të jashtme).
(() => {
  'use strict';
  const app = document.getElementById('cert-app');
  if (!app) return;
  const T = JSON.parse(app.dataset.i18n), api = app.dataset.api, lang = app.dataset.lang;
  const form = document.getElementById('cert-form'), success = document.getElementById('cert-success');
  const checkForm = document.getElementById('cert-check'), q = document.getElementById('cert-q'), result = document.getElementById('cert-result');
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const fmt = (iso) => iso.split('-').reverse().join('.');

  /* ----- forma e kërkesës ----- */
  const now = new Date(), pad = (n) => String(n).padStart(2, '0');
  form.elements.ts.value = Date.now();
  form.elements.purchaseDate.max = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  form.addEventListener('input', (e) => e.target.classList.remove('invalid'));
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = form.querySelector('.form-error'); err.hidden = true;
    const fail = (m) => { err.textContent = m; err.hidden = false; };
    const consent = form.elements.consent; consent.classList.toggle('invalid', !consent.checked);
    const mail = form.elements.email, phone = form.elements.phone;
    const badMail = mail.value.trim() && !/^\S+@\S+\.\S+$/.test(mail.value.trim()), badPhone = phone.value.trim() && phone.value.replace(/\D/g, '').length < 6;
    mail.classList.toggle('invalid', !!badMail); phone.classList.toggle('invalid', !!badPhone);
    if (!consent.checked) return fail(T.consent);
    if (badMail || badPhone) return fail(T.fieldErr);
    if (!['name', 'surname', 'email', 'phone', 'reference'].some((n) => form.elements[n].value.trim())) return fail(T.needOne);
    const btn = form.querySelector('button[type=submit]'), label = btn.innerHTML;
    btn.disabled = true; btn.textContent = btn.dataset.sending;
    const d = Object.fromEntries(new FormData(form));
    try {
      const r = await fetch(api + 'request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: d.name, surname: d.surname, email: d.email, phone: d.phone, product: d.product, purchaseDate: d.purchaseDate, reference: d.reference, website: d.website || '', ts: Number(d.ts), consent: true, lang }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { showSuccess(j.code, j.mail); form.hidden = true; }
      else if (j.error === 'validation') { Object.keys(j.fields || {}).forEach((n) => form.elements[n] && form.elements[n].classList.add('invalid')); fail(j.fields && j.fields.empty ? T.needOne : T.fieldErr); }
      else if (r.status === 429) fail(T.rate);
      else if (j.error === 'consent') fail(T.consent);
      else fail(T.generic);
    } catch { fail(T.generic); }
    btn.disabled = false; btn.innerHTML = label;
  });

  function showSuccess(code, mailed) {
    success.replaceChildren();
    success.append(el('h2', null, T.ok), el('p', null, T.codeLabel));
    const big = el('p', 'cert-code', code); success.append(big);
    const copy = el('button', 'btn btn-outline', T.copy); copy.type = 'button';
    copy.addEventListener('click', async () => { try { await navigator.clipboard.writeText(code); copy.textContent = T.copied; } catch { /* clipboard e bllokuar */ } });
    const again = el('button', 'btn btn-link', T.again); again.type = 'button';
    again.addEventListener('click', () => { q.value = code; run(); q.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
    success.append(el('p', 'cert-note', T.codeNote));
    success.append(el('p', 'cert-note', mailed ? T.mailNote : T.noMailNote));
    const act = el('div', 'actions'); act.append(copy, again); success.append(act);
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ----- kontrolli i afatit / statusit ----- */
  function parse(v) {
    const s = String(v).toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (/^RQ[A-Z2-9]{8}$/.test(s)) return { type: 'code', value: 'RQ-' + s.slice(2) };
    if (/^(AF)?\d{1,7}$/.test(s)) return { type: 'number', value: s.replace(/^AF/, '') };
    if (/^[A-Z2-9]{8}$/.test(s) && /[A-Z]/.test(s)) return { type: 'code', value: 'RQ-' + s };
    return null;
  }
  function span(from, to) {
    const [fy, fm, fd] = from.split('-').map(Number), [ty, tm, td] = to.split('-').map(Number);
    let y = ty - fy, m = tm - fm, d = td - fd;
    if (d < 0) { m--; d += new Date(Date.UTC(ty, tm - 1, 0)).getUTCDate(); }
    if (m < 0) { y--; m += 12; }
    return { y, m, d };
  }
  const row = (k, v) => { const r = el('div'); r.append(el('dt', null, k), el('dd', null, v)); return r; };
  function badge(text, kind) { return el('span', `badge badge-${kind}`, text); }

  function render(j, mode) {
    result.replaceChildren();
    const card = el('div', 'cert-result');
    if (!j.found) { card.append(el('p', 'cert-msg', T.notFound)); result.append(card); return; }
    const cert = mode === 'status' ? j.certState : j.status;                 // gjendja e certifikatës
    const key = mode === 'status' && j.status !== 'approved' ? j.status : cert;   // çfarë shfaqim te distinktivi
    const kind = { active: 'ok', pending: 'warn', upcoming: 'warn', expired: 'bad', revoked: 'bad', rejected: 'bad' };
    const head = el('div', 'cert-head');
    head.append(badge(T.st[key], kind[key]));
    if (j.number) head.append(el('strong', null, j.number));
    card.append(head);
    if (mode === 'status' && j.status === 'pending') card.append(el('p', 'cert-msg', T.pendingMsg));
    if (mode === 'status' && j.status === 'rejected') { card.append(el('p', 'cert-msg', T.rejectedMsg)); if (j.reason) card.append(el('p', 'cert-msg', `${T.reason}: ${j.reason}`)); }
    if (j.number && j.validUntil) {
      const dl = el('dl', 'cert-facts');
      dl.append(row(T.number, j.number));
      if (j.holder) dl.append(row(T.holder, j.holder)); else if (j.name) dl.append(row(T.holder, j.name));
      if (j.product) dl.append(row(T.product, j.product));
      dl.append(row(T.start, fmt(j.startDate)), row(T.until, fmt(j.validUntil)));
      if (cert === 'active' || cert === 'upcoming') {
        const s = span(j.today, j.validUntil);
        dl.append(row(T.left, `${s.y} ${T.years}, ${s.m} ${T.months}, ${s.d} ${T.days} (${j.daysLeft} ${T.days} ${T.total})`));
      } else if (cert === 'expired') dl.append(row(T.left, T.ended));
      card.append(dl);
      if (cert === 'active') {
        const total = Math.max(1, Date.parse(j.validUntil) - Date.parse(j.startDate)), used = Math.min(total, Math.max(0, Date.parse(j.today) - Date.parse(j.startDate)));
        const bar = el('div', 'progress'), fill = el('span'); fill.style.width = `${100 - Math.round((used / total) * 100)}%`; bar.append(fill); card.append(bar);
      }
      if (mode === 'status' && j.pdf) { const a = el('a', 'btn btn-primary', T.download); a.href = `${api}pdf?code=${encodeURIComponent(j.code)}`; a.target = '_blank'; a.rel = 'noopener'; card.append(a); }
    }
    result.append(card);
  }

  async function run() {
    const p = parse(q.value);
    result.replaceChildren();
    if (!p) { const c = el('div', 'cert-result'); c.append(el('p', 'cert-msg', T.invalid)); result.append(c); return; }
    try {
      const r = await fetch(`${api}${p.type === 'code' ? 'status?code=' : 'verify?n='}${encodeURIComponent(p.value)}`);
      if (r.status === 429) { const c = el('div', 'cert-result'); c.append(el('p', 'cert-msg', T.rate)); result.append(c); return; }
      render(await r.json(), p.type === 'code' ? 'status' : 'verify');
    } catch { const c = el('div', 'cert-result'); c.append(el('p', 'cert-msg', T.generic)); result.append(c); }
  }
  checkForm.addEventListener('submit', (e) => { e.preventDefault(); run(); });

  // lidhje nga email/QR: ?n=AF-0005657 ose ?kod=RQ-XXXXXXXX
  const params = new URLSearchParams(location.search);
  const pre = params.get('n') || params.get('kod');
  if (pre) { q.value = pre; run(); q.scrollIntoView({ block: 'center' }); }
})();
