// Paneli i adminit për certifikatat e garancisë (tokeni ruhet vetëm në sessionStorage, pa cookies).
(() => {
  'use strict';
  const app = document.getElementById('admin-app');
  if (!app) return;
  const api = app.dataset.api;
  const $ = (s) => app.querySelector(s);
  let token = '', data = null;
  try { token = sessionStorage.getItem('af_admin') || ''; } catch { /* i bllokuar */ }
  const h = (tag, props, ...kids) => { const e = document.createElement(tag); Object.entries(props || {}).forEach(([k, v]) => { if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v); }); kids.flat().forEach((c) => c != null && e.append(c.nodeType ? c : document.createTextNode(c))); return e; };
  const fmt = (iso) => (iso ? iso.split('T')[0].split('-').reverse().join('.') : '—');
  const msg = (text, kind = 'ok', extra) => { const m = $('#admin-msg'); m.replaceChildren(text, ...(extra || [])); m.className = `admin-msg admin-msg-${kind}`; m.hidden = false; m.scrollIntoView({ block: 'nearest' }); };
  const state = { pending: ['warn', 'Në pritje'], active: ['ok', 'E vlefshme'], expired: ['bad', 'Skaduar'], revoked: ['bad', 'Revokuar'], upcoming: ['warn', 'Nis më vonë'] };

  async function call(path, opts = {}) {
    const r = await fetch(api + path, { ...opts, headers: { ...(opts.body ? { 'Content-Type': 'application/json' } : {}), Authorization: 'Bearer ' + token } });
    if (r.status === 401) { logout(); throw new Error('unauthorized'); }
    return r;
  }
  const post = async (path, body) => { const r = await call(path, { method: 'POST', body: JSON.stringify(body) }); return { ok: r.ok, status: r.status, j: await r.json().catch(() => ({})) }; };
  function logout() { token = ''; try { sessionStorage.removeItem('af_admin'); } catch { /* */ } $('#panel').hidden = true; $('#login').hidden = false; }

  /* ----- hyrja ----- */
  $('#login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = $('#login .form-error'); err.hidden = true;
    const r = await fetch(api + 'admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: $('#pw').value }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.token) { token = j.token; try { sessionStorage.setItem('af_admin', token); } catch { /* */ } $('#pw').value = ''; start(); }
    else { err.textContent = r.status === 429 ? 'Shumë tentativa. Provoni pas pak.' : r.status === 503 ? 'ADMIN_PASSWORD nuk është vendosur në Netlify.' : 'Fjalëkalimi është i gabuar.'; err.hidden = false; }
  });
  $('#logout').addEventListener('click', logout);
  app.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => {
    app.querySelectorAll('[data-tab]').forEach((x) => x.classList.toggle('is-active', x === b));
    ['pending', 'issued', 'rejected', 'new'].forEach((t) => { $('#tab-' + t).hidden = t !== b.dataset.tab; });
  }));

  async function start() {
    $('#login').hidden = true; $('#panel').hidden = false;
    try { const r = await call('admin/list'); data = await r.json(); render(); } catch { /* 401 e trajtuar */ }
  }

  /* ----- tabelat ----- */
  const table = (heads, rows) => h('div', { class: 'table-wrap' }, h('table', { class: 'admin-table' }, h('thead', null, h('tr', null, heads.map((x) => h('th', null, x)))), h('tbody', null, rows)));
  const mailto = (c) => { const origin = location.origin; const body = `Përshëndetje ${c.name},\n\nCertifikata juaj e garancisë u miratua.\nNr. ${c.number} · e vlefshme nga ${fmt(c.startDate)} deri më ${fmt(c.validUntil)} (${c.years} vite).\n\nShkarkoni PDF-në: ${origin}/api/warranty/pdf?code=${c.requestCode}\nKontrolloni afatin online: ${origin}/garancia/certifikata/?n=${c.number}\n\nApex Frames`; return `mailto:${c.email}?subject=${encodeURIComponent('Certifikata juaj e garancisë ' + c.number)}&body=${encodeURIComponent(body)}`; };
  async function openPdf(n) { const r = await call('admin/pdf?n=' + n); if (!r.ok) return msg('PDF nuk u gjenerua.', 'bad'); window.open(URL.createObjectURL(await r.blob()), '_blank', 'noopener'); }

  function render() {
    const pending = data.requests.filter((r) => r.status === 'pending' || r.status === 'approving');
    const rejected = data.requests.filter((r) => r.status === 'rejected');
    $('#admin-next').textContent = data.next;
    $('#n-pending').textContent = pending.length; $('#n-issued').textContent = data.certificates.length; $('#n-rejected').textContent = rejected.length;
    const draw = (id, node) => { $(id).replaceChildren(node); };

    draw('#tab-pending', pending.length ? table(['Kodi', 'Data', 'Klienti', 'Kontakti', 'Blerja', 'Veprime'], pending.map((r) => {
      const form = h('tr', { class: 'approve-row', hidden: true }, h('td', { colspan: 6 }, (() => {
        const date = h('input', { type: 'date', value: r.purchaseDate || data.today, 'aria-label': 'Data e fillimit' });
        const prod = h('input', { value: r.product || '', placeholder: 'Produkti', 'aria-label': 'Produkti', maxlength: 120 });
        const nm = h('input', { value: r.name || '', placeholder: 'Emri (nga kontrata)', 'aria-label': 'Emri', maxlength: 60 });
        const sn = h('input', { value: r.surname || '', placeholder: 'Mbiemri', 'aria-label': 'Mbiemri', maxlength: 60 });
        const go = h('button', { class: 'btn btn-primary', type: 'button', onclick: async () => {
          go.disabled = true;
          const { ok, j } = await post('admin/approve', { code: r.code, startDate: date.value, product: prod.value, name: nm.value, surname: sn.value });
          if (!ok) { go.disabled = false; return msg(j.error === 'not_pending' ? 'Kërkesa është përpunuar tashmë.' : 'Miratimi dështoi. Kontrolloni datën.', 'bad'); }
          await refresh(); msg(`U lëshua ${j.cert.number} për ${j.cert.name} ${j.cert.surname}. `, 'ok', [j.cert.email ? h('a', { href: mailto(j.cert) }, 'Dërgo email klientit') : h('span', null, 'Klienti nuk dha email: japini kodin ' + j.cert.requestCode), ' · ', h('a', { href: '#', onclick: (e) => { e.preventDefault(); openPdf(j.cert.number); } }, 'Hap PDF-në')]);
        } }, `Lësho ${data.next}`);
        return h('div', { class: 'approve-form' }, h('label', null, 'Fillimi i garancisë (data e blerjes)', date), h('label', null, 'Produkti', prod), h('label', null, 'Emri në certifikatë (opsional)', nm), h('label', null, 'Mbiemri (opsional)', sn), go);
      })()));
      return [h('tr', null,
        h('td', null, r.code), h('td', null, fmt(r.createdAt)), h('td', null, `${r.name || ''} ${r.surname || ''}`.trim() || '—'),
        h('td', null, r.email ? h('a', { href: 'mailto:' + r.email }, r.email) : null, r.email && r.phone ? h('br') : null, r.phone ? h('a', { href: 'tel:' + r.phone.replace(/[^\d+]/g, '') }, r.phone) : null, !r.email && !r.phone ? '—' : null),
        h('td', null, [r.product, r.purchaseDate && fmt(r.purchaseDate), r.reference].filter(Boolean).join(' · ') || '—'),
        h('td', { class: 'row-actions' },
          h('button', { class: 'btn btn-dark', type: 'button', onclick: () => { form.hidden = !form.hidden; } }, 'Aprovo'),
          h('button', { class: 'btn btn-outline', type: 'button', onclick: async () => { const reason = prompt('Arsyeja e refuzimit (do t’i shfaqet klientit):', ''); if (reason === null) return; await post('admin/reject', { code: r.code, reason }); refresh(); } }, 'Refuzo'),
          h('button', { class: 'btn btn-outline', type: 'button', onclick: () => eraseRequest(r.code) }, 'Fshi'))), form];
    }).flat()) : h('p', { class: 'admin-empty' }, 'Asnjë kërkesë në pritje.'));

    draw('#tab-issued', data.certificates.length ? table(['Nr.', 'Mbajtësi', 'Kontakti', 'Produkti', 'Fillon', 'Skadon', 'Gjendja', 'Veprime'], data.certificates.map((c) => h('tr', null,
      h('td', null, h('strong', null, c.number)), h('td', null, c.erased ? 'Të dhënat u fshinë' : `${c.name || ''} ${c.surname || ''}`.trim() || '—'),
      h('td', null, c.email ? h('a', { href: mailto(c) }, c.email) : '—', c.phone ? h('br') : null, c.phone || ''),
      h('td', null, c.product || '—'), h('td', null, fmt(c.startDate)), h('td', null, fmt(c.validUntil)),
      h('td', null, h('span', { class: `badge badge-${state[c.state][0]}` }, state[c.state][1]), c.daysLeft ? h('small', null, ` ${c.daysLeft} ditë`) : null),
      h('td', { class: 'row-actions' },
        h('button', { class: 'btn btn-dark', type: 'button', onclick: () => openPdf(c.number) }, 'PDF'),
        c.erased ? null : h('button', { class: 'btn btn-outline', type: 'button', title: 'Fshin emrin, emailin, telefonin dhe referencën; numri, datat dhe statusi mbeten', onclick: () => eraseCert(c.number) }, 'Fshi të dhënat'),
        h('button', { class: 'btn btn-outline', type: 'button', onclick: async () => { if (c.status === 'revoked') { await post('admin/revoke', { number: c.number, restore: true }); } else { const reason = prompt(`Revoko ${c.number}? Shkruani arsyen:`, ''); if (reason === null) return; await post('admin/revoke', { number: c.number, reason }); } refresh(); } }, c.status === 'revoked' ? 'Rikthe' : 'Revoko'))))) : h('p', { class: 'admin-empty' }, 'Asnjë certifikatë e lëshuar ende.'));

    draw('#tab-rejected', rejected.length ? table(['Kodi', 'Data', 'Klienti', 'Kontakti', 'Arsyeja', ''], rejected.map((r) => h('tr', null, h('td', null, r.code), h('td', null, fmt(r.createdAt)), h('td', null, `${r.name || ''} ${r.surname || ''}`.trim() || '—'), h('td', null, r.email || r.phone || '—'), h('td', null, r.reason || '—'), h('td', { class: 'row-actions' }, h('button', { class: 'btn btn-outline', type: 'button', onclick: () => eraseRequest(r.code) }, 'Fshi'))))) : h('p', { class: 'admin-empty' }, 'Asnjë kërkesë e refuzuar.'));
    const rejTable = $('#tab-rejected');
    if (!rejTable.querySelector('.purge')) rejTable.append(h('p', { class: 'admin-empty purge' }, 'Kërkesat në pritje dhe të refuzuara fshihen automatikisht pas 12 muajsh. ', h('button', { class: 'btn btn-link', type: 'button', onclick: async () => { const { j } = await post('admin/purge', {}); msg(`U pastruan ${j.requests || 0} kërkesa të vjetra.`, 'ok'); refresh(); } }, 'Pastro tani')));
    const nf = $('#tab-new'); if (!nf.elements.startDate.value) nf.elements.startDate.value = data.today;
  }
  async function eraseCert(n) {
    if (!confirm(`Të fshihen të dhënat personale të ${n}? Numri, datat dhe statusi mbeten, kështu që kontrolli online vazhdon të punojë. Veprimi nuk kthehet.`)) return;
    const { ok } = await post('admin/erase', { number: n }); await refresh(); msg(ok ? `U fshinë të dhënat personale të ${n}.` : 'Fshirja dështoi.', ok ? 'ok' : 'bad');
  }
  async function eraseRequest(code) {
    if (!confirm(`Të fshihet përfundimisht kërkesa ${code}? Veprimi nuk kthehet.`)) return;
    const { ok } = await post('admin/erase', { code }); await refresh(); msg(ok ? `Kërkesa ${code} u fshi.` : 'Fshirja dështoi.', ok ? 'ok' : 'bad');
  }
  async function refresh() { const r = await call('admin/list'); data = await r.json(); render(); }

  $('#tab-new').addEventListener('submit', async (e) => {
    e.preventDefault(); const f = e.target, err = f.querySelector('.form-error'); err.hidden = true;
    const body = Object.fromEntries(new FormData(f));
    const { ok, j } = await post('admin/issue', body);
    if (!ok) { err.textContent = 'Kontrolloni fushat (emri, mbiemri, emaili/telefoni, data).'; err.hidden = false; return; }
    f.reset(); await refresh(); msg(`U lëshua ${j.cert.number} për ${j.cert.name} ${j.cert.surname}. `, 'ok', [h('a', { href: '#', onclick: (ev) => { ev.preventDefault(); openPdf(j.cert.number); } }, 'Hap PDF-në')]);
  });

  if (token) start();
})();
