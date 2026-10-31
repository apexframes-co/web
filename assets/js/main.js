(() => {
  'use strict';
  const header = document.querySelector('[data-header]');
  const isHome = !!document.querySelector('.hero');
  if (header && !isHome) header.classList.add('solid');

  // Header i ngurtë pas scroll-it
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menuja mobile
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  if (btn && nav) {
    const set = (open) => {
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('.sr').textContent = open ? btn.dataset.labelClose : btn.dataset.labelOpen;
      header.classList.toggle('solid', open || !isHome);
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => e.target.closest('a') && set(false));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
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
  }
})();
