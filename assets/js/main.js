(() => {
  'use strict';
  const header = document.querySelector('[data-header]');
  const hero = document.querySelector('.hero');

  // Header: xham i errët mbi hero, i çelët pasi dalim prej tij
  const onScroll = () => {
    if (!header) return;
    const past = !hero || window.scrollY > hero.offsetHeight - 110;
    header.classList.toggle('is-light', past);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // Menuja mobile
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  if (btn && nav) {
    const set = (open) => {
      nav.classList.toggle('open', open);
      header.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('.sr').textContent = open ? btn.dataset.labelClose : btn.dataset.labelOpen;
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => e.target.closest('a') && set(false));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
    document.addEventListener('click', (e) => { if (!header.contains(e.target)) set(false); });
  }

  // Animacioni i shfaqjes
  const els = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('in'));
  }

  // Lidhja aktive në navigim
  const links = [...document.querySelectorAll('.nav ul a[href^="#"]')];
  if (links.length && 'IntersectionObserver' in window) {
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const so = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { links.forEach((l) => l.classList.remove('active')); map.get(en.target.id)?.classList.add('active'); }
      }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) so.observe(s); });
  }

  // Teksti "Shiko / Mbyll detajet"
  document.querySelectorAll('.product details').forEach((d) => {
    const s = d.querySelector('summary');
    d.addEventListener('toggle', () => { s.textContent = d.open ? s.dataset.less : s.dataset.more; });
  });

  // Formulari: përgatit email (pa server, pa ruajtje të dhënash)
  const form = document.getElementById('quote-form');
  if (form) {
    const err = form.querySelector('.form-error');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach((f) => {
        const bad = f.type === 'checkbox' ? !f.checked : !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
        f.classList.toggle('invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) { err.textContent = form.dataset.required; err.hidden = false; return; }
      err.hidden = true;
      const d = Object.fromEntries(new FormData(form));
      const labels = [...form.querySelectorAll('label')].reduce((m, l) => {
        const f = l.querySelector('input,select,textarea');
        if (f && f.name !== 'consent') m[f.name] = l.childNodes[0].textContent.replace('*', '').trim();
        return m;
      }, {});
      const body = ['name', 'company', 'email', 'phone', 'type', 'interest', 'message']
        .filter((k) => d[k])
        .map((k) => `${labels[k]}: ${d[k]}`)
        .join('\n');
      const subject = `${form.dataset.subject} — ${d.name}`;
      window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
    form.addEventListener('input', (e) => e.target.classList.remove('invalid'));

    // Nga katalogu: /kontakt/?model=T17 plotëson mesazhin dhe interesin
    const model = new URLSearchParams(location.search).get('model');
    if (model && /^[TIF]\d{2}$/.test(model)) {
      const sq = document.documentElement.lang === 'sq';
      const msg = form.querySelector('[name=message]');
      if (msg && !msg.value) msg.value = sq ? `Interesohem për modelin ${model} nga katalogu i dyerve hyrëse PVC.` : `I am interested in model ${model} from the PVC entrance doors catalogue.`;
      const sel = form.querySelector('[name=interest]');
      if (sel && sel.options[2]) sel.selectedIndex = 2;
    }
  }

  // Katalogu: filtra dhe zmadhim
  const grid = document.getElementById('cat-grid');
  const box = document.getElementById('lightbox');
  if (grid && box) {
    const cards = [...grid.querySelectorAll('.cat-card')];
    const counter = document.getElementById('cat-count');
    const chips = [...document.querySelectorAll('.chip-btn')];
    const visible = () => cards.filter((c) => !c.hidden);
    chips.forEach((chip) => chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => { const on = c === chip; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
      cards.forEach((c) => { c.hidden = !(f === 'all' || c.dataset.series === f || (f === 'side' && c.dataset.side === '1')); });
      counter.textContent = visible().length;
    }));

    const img = document.getElementById('lb-img');
    const code = document.getElementById('lb-code');
    const tag = document.getElementById('lb-tag');
    const cta = document.getElementById('lb-cta');
    let current = null;
    const show = (card) => {
      const b = card.querySelector('.cat-btn');
      current = card;
      img.src = b.dataset.src; img.width = b.dataset.w; img.height = b.dataset.h;
      img.alt = card.querySelector('img').alt;
      code.textContent = b.dataset.code;
      tag.textContent = card.dataset.side === '1' ? box.dataset.side : '';
      cta.href = `${box.dataset.contact}?model=${b.dataset.code}`;
      history.replaceState(null, '', `#${b.dataset.code}`);
    };
    const open = (card) => { show(card); if (!box.open) box.showModal(); };
    const step = (d) => {
      const list = visible(); if (!list.length) return;
      const i = list.indexOf(current);
      show(list[(i + d + list.length) % list.length]);
    };
    grid.addEventListener('click', (e) => { const b = e.target.closest('.cat-btn'); if (b) open(b.closest('.cat-card')); });
    box.querySelector('.lb-close').addEventListener('click', () => box.close());
    box.querySelector('.lb-prev').addEventListener('click', () => step(-1));
    box.querySelector('.lb-next').addEventListener('click', () => step(1));
    box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
    box.addEventListener('close', () => history.replaceState(null, '', location.pathname + location.search));
    box.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
    const fromHash = () => {
      const target = cards.find((c) => c.id === decodeURIComponent(location.hash.slice(1)));
      if (target) open(target);
    };
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }
})();
