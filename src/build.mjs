// Gjeneron faqet statike në dosjen rrënjë: node src/build.mjs
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { company as C, brands, sq, en } from './content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const year = new Date().getFullYear();
const logo = readFileSync(join(ROOT, 'assets/img/logo.svg'), 'utf8').trim();
const mark = readFileSync(join(ROOT, 'assets/img/logo-mark.svg'), 'utf8').trim();
const inline = (svg, cls) => svg.replace('<svg ', `<svg class="${cls}" `).replace(/clip-(\d)/g, `${cls}-c$1`).replace(/source-5/g, `${cls}-src`);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const icons = {
  window: '<rect x="8" y="5" width="32" height="38" rx="1.5"/><path d="M24 5v38M8 22h32"/><path d="M28 27l4 4"/>',
  alu: '<rect x="6" y="8" width="36" height="32" rx="1.5"/><rect x="11" y="13" width="26" height="22"/><path d="M24 13v22"/>',
  door: '<path d="M12 43V6h24v37"/><path d="M6 43h36"/><circle cx="31" cy="26" r="1.6"/><rect x="17" y="11" width="14" height="10"/>',
  facade: '<path d="M6 43V6h36v37"/><path d="M6 18h36M6 31h36M18 6v37M30 6v37"/>',
  glass: '<rect x="10" y="6" width="28" height="36" rx="1.5"/><path d="M17 16l7-7M17 26l14-14M24 30l7-7"/>',
  shutter: '<rect x="8" y="6" width="32" height="8" rx="1.5"/><path d="M10 14v26h28V14M10 20h28M10 26h28M10 32h28"/><path d="M41 10v20"/>',
  net: '<rect x="8" y="6" width="32" height="36" rx="1.5"/><path d="M8 15h32M8 24h32M8 33h32M17 6v36M26 6v36M35 6v36" stroke-width="1"/>',
  awning: '<path d="M6 14h36l-4 10H10z"/><path d="M8 14V8h32v6M10 24v18M38 24v18"/>',
  stairs: '<path d="M24 4v40"/><path d="M24 10h14M24 18l-12 4M24 26h14M24 34l-12 4"/><circle cx="24" cy="44" r="0.5"/>',
  check: '<path d="M10 25l9 9 19-20"/>',
  mail: '<rect x="5" y="10" width="38" height="28" rx="2"/><path d="M5 12l19 14 19-14"/>',
  phone: '<path d="M14 6h-5a3 3 0 00-3 3c0 18 15 33 33 33a3 3 0 003-3v-5l-9-4-4 4c-5-2-9-6-11-11l4-4z"/>',
  pin: '<path d="M24 44s14-13 14-24a14 14 0 00-28 0c0 11 14 24 14 24z"/><circle cx="24" cy="20" r="5"/>',
  arrow: '<path d="M8 24h32M28 12l12 12-12 12"/>',
};
const icon = (n, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[n]}</svg>`;

const social = {
  linkedin:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.12 1.43-2.12 2.9V21H9z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.8.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.8.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 4.86a4.94 4.94 0 100 9.88 4.94 4.94 0 000-9.88zm0 8.15a3.21 3.21 0 110-6.42 3.21 3.21 0 010 6.42zm5.14-9.5a1.15 1.15 0 100 2.3 1.15 1.15 0 000-2.3z"/></svg>',
  whatsapp:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 14.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.8h-.01a9.8 9.8 0 01-5-1.37l-.36-.21-3.72.97 1-3.62-.24-.37a9.8 9.8 0 1118.15-5.2 9.8 9.8 0 01-9.82 9.8zm8.35-18.15A11.75 11.75 0 002 17.7L.33 23.8l6.24-1.64a11.73 11.73 0 005.61 1.43h.01A11.75 11.75 0 0020.39 3.65z"/></svg>',
};

// Ilustrimi i hero-s: profil dritareje/fasade abstrakte me ngjyrat e brandit.
const heroArt = `
<svg class="hero-art" viewBox="0 0 520 560" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7aa0c4"/><stop offset=".55" stop-color="#307eac"/><stop offset="1" stop-color="#2f425e"/>
    </linearGradient>
    <linearGradient id="glare" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="frameG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1f2428"/>
    </linearGradient>
  </defs>
  <rect x="20" y="20" width="480" height="520" rx="6" fill="url(#frameG)"/>
  <g class="pane p1"><rect x="44" y="44" width="210" height="300" fill="url(#sky)"/><rect x="44" y="44" width="210" height="300" fill="url(#glare)"/></g>
  <g class="pane p2"><rect x="266" y="44" width="210" height="300" fill="url(#sky)"/><rect x="266" y="44" width="210" height="300" fill="url(#glare)" opacity=".7"/></g>
  <g class="pane p3"><rect x="44" y="356" width="432" height="160" fill="url(#sky)" opacity=".9"/><rect x="44" y="356" width="432" height="160" fill="url(#glare)" opacity=".5"/></g>
  <path d="M60 300 L150 150 L190 210 L230 170 L254 200 L254 344 L44 344 L44 330Z" fill="#2f425e" opacity=".45"/>
  <path d="M266 260 L330 180 L400 250 L476 190 L476 344 L266 344Z" fill="#2f425e" opacity=".35"/>
  <rect x="236" y="190" width="6" height="40" rx="3" fill="#cccccc"/>
  <rect x="278" y="190" width="6" height="40" rx="3" fill="#cccccc"/>
  <g stroke="#ffffff" stroke-opacity=".12"><path d="M44 120h432M44 200h432"/></g>
</svg>`;

function header(t, page) {
  const home = t.path;
  const h = (id) => (page === 'home' ? `#${id}` : `${home}#${id}`);
  const links = ['about', 'products', 'services', 'process', 'partners', 'contact']
    .map((k) => `<li><a href="${h(k)}">${t.nav[k]}</a></li>`)
    .join('');
  const alt = page === 'home' ? t.altPath : t[page].altPath;
  return `
<a class="skip" href="#main">${t.skip}</a>
<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href="${home}" aria-label="Apex Frames">${inline(logo, 'logo')}</a>
    <nav class="nav" id="nav" aria-label="Main">
      <ul>${links}</ul>
      <a class="btn btn-primary nav-cta" href="${h('contact')}">${t.nav.cta}</a>
    </nav>
    <div class="header-tools">
      <a class="lang" href="${alt}" hreflang="${t.lang === 'sq' ? 'en' : 'sq'}" lang="${t.lang === 'sq' ? 'en' : 'sq'}" title="${t.altName}">${t.altLabel}</a>
      <button class="menu-btn" type="button" aria-controls="nav" aria-expanded="false" data-label-open="${t.nav.menu}" data-label-close="${t.nav.close}"><span></span><span></span><span class="sr">${t.nav.menu}</span></button>
    </div>
  </div>
</header>`;
}

function footer(t) {
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a href="${t.path}" class="brand brand-light" aria-label="Apex Frames">${inline(logo, 'flogo')}</a>
      <p>${t.footer.tagline}</p>
      <div class="social">
        <a href="${C.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${social.linkedin}</a>
        <a href="${C.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${social.instagram}</a>
        <a href="https://wa.me/${C.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${social.whatsapp}</a>
      </div>
    </div>
    <div>
      <h3>${t.footer.company}</h3>
      <ul>
        <li><a href="${t.path}#about">${t.nav.about}</a></li>
        <li><a href="${t.path}#products">${t.nav.products}</a></li>
        <li><a href="${t.path}#services">${t.nav.services}</a></li>
        <li><a href="${t.path}#partners">${t.nav.partners}</a></li>
        <li><a href="${t.path}#faq">${t.nav.faq}</a></li>
      </ul>
    </div>
    <div>
      <h3>${t.nav.contact}</h3>
      <ul>
        <li><a href="mailto:${C.email}">${C.email}</a></li>
        <li><a href="tel:${C.phoneHref}">${C.phoneDisplay}</a></li>
        <li>${esc(C.street)}, ${C.city}</li>
      </ul>
    </div>
    <div>
      <h3>${t.footer.legal}</h3>
      <ul>
        <li><a href="${t.privacy.path}">${t.footer.privacy}</a></li>
        <li><a href="${t.terms.path}">${t.footer.terms}</a></li>
        <li>${C.legalName}</li>
        <li>${t.footer.nuis}: ${C.nuis}</li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© ${year} ${C.legalName}. ${t.footer.rights}</p>
    <p class="tm">${t.footer.trademark}</p>
  </div>
</footer>`;
}

function head(t, { title, description, path, altPath, noindex = false, schema = '' }) {
  const other = t.lang === 'sq' ? 'en' : 'sq';
  return `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add('js')</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${C.url}${path}">
<link rel="alternate" hreflang="${t.lang}" href="${C.url}${path}">
<link rel="alternate" hreflang="${other}" href="${C.url}${altPath}">
<link rel="alternate" hreflang="x-default" href="${C.url}${t.lang === 'sq' ? path : altPath}">`}
<meta name="theme-color" content="#2f425e">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Apex Frames">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${C.url}${path}">
<meta property="og:image" content="${C.url}/assets/img/og-image.png">
<meta property="og:locale" content="${t.locale}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/styles.css">
${schema}
</head>`;
}

function schemaFor(t) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Apex Frames',
    legalName: C.legalName,
    taxID: C.nuis,
    url: C.url + t.path,
    logo: C.url + '/assets/img/logo.png',
    image: C.url + '/assets/img/og-image.png',
    email: C.email,
    telephone: C.phoneHref,
    description: t.meta.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: C.street,
      addressLocality: 'Tirana',
      addressCountry: C.country,
    },
    areaServed: { '@type': 'Country', name: 'Albania' },
    sameAs: [C.linkedin, C.instagram],
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return `<script type="application/ld+json">${JSON.stringify(org)}</script>\n<script type="application/ld+json">${JSON.stringify(faq)}</script>`;
}

const sectionHead = (s, center = false) => `
    <div class="section-head${center ? ' center' : ''}" data-reveal>
      <p class="eyebrow">${s.eyebrow}</p>
      <h2>${s.title}</h2>
      ${s.lead ? `<p class="lead">${s.lead}</p>` : ''}
    </div>`;

function home(t) {
  const f = t.contact.form;
  const opts = (arr) => arr.map((o) => `<option>${esc(o)}</option>`).join('');
  return `${head(t, { title: t.meta.title, description: t.meta.description, path: t.path, altPath: t.altPath, schema: schemaFor(t) })}
<body>
${header(t, 'home')}
<main id="main">

<section class="hero" id="top">
  <div class="hero-bg" aria-hidden="true">${inline(mark, 'hero-mark')}</div>
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow eyebrow-light">${t.hero.eyebrow}</p>
      <h1>${t.hero.title}</h1>
      <p class="lead">${t.hero.lead}</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="#contact">${t.hero.primary} ${icon('arrow', 'ico ico-sm')}</a>
        <a class="btn btn-ghost btn-lg" href="#products">${t.hero.secondary}</a>
      </div>
      <dl class="hero-stats">
        ${t.hero.stats.map((s) => `<div><dt>${s.value}</dt><dd>${s.label}</dd></div>`).join('')}
      </dl>
    </div>
    <div class="hero-visual">${heroArt}</div>
  </div>
</section>

<section class="brands" aria-label="${esc(t.brandsTitle)}">
  <div class="container brands-inner">
    <p>${t.brandsTitle}</p>
    <ul>${brands.map((b) => `<li>${b}</li>`).join('')}</ul>
  </div>
</section>

<section class="section" id="about">
  <div class="container">
    ${sectionHead(t.about)}
    <div class="cards-3">
      ${t.about.cards
        .map((c, i) => `<article class="card" data-reveal style="--d:${i * 80}ms"><span class="card-num">0${i + 1}</span><h3>${c.title}</h3><p>${c.text}</p></article>`)
        .join('')}
    </div>
    <div class="values" data-reveal>
      <h3 class="values-title">${t.about.valuesTitle}</h3>
      <ul>${t.about.values.map((v) => `<li><strong>${v.title}</strong><span>${v.text}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section section-tint" id="products">
  <div class="container">
    ${sectionHead(t.products)}
    <div class="products">
      ${t.products.items
        .map(
          (p, i) => `
      <article class="product" data-reveal style="--d:${(i % 3) * 80}ms">
        <div class="product-top">${icon(p.icon, 'ico ico-lg')}<span class="tag">${p.tag}</span></div>
        <h3>${p.title}</h3>
        <p>${p.text}</p>
        <details>
          <summary data-more="${t.products.more}" data-less="${t.products.less}">${t.products.more}</summary>
          <ul class="checks">${p.points.map((x) => `<li>${icon('check', 'ico ico-xs')}${x}</li>`).join('')}</ul>
        </details>
      </article>`
        )
        .join('')}
    </div>
    <p class="fineprint" data-reveal>${t.products.note}</p>
  </div>
</section>

<section class="section" id="services">
  <div class="container split">
    <div>
      ${sectionHead(t.services)}
      <div class="modes" data-reveal>
        <h3>${t.services.modesTitle}</h3>
        <ul class="checks">${t.services.modes.map((m) => `<li>${icon('check', 'ico ico-xs')}${m}</li>`).join('')}</ul>
      </div>
    </div>
    <ol class="service-list">
      ${t.services.items.map((s, i) => `<li data-reveal style="--d:${i * 80}ms"><span class="num">0${i + 1}</span><div><h3>${s.title}</h3><p>${s.text}</p></div></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section section-dark" id="process">
  <div class="container">
    ${sectionHead(t.process)}
    <ol class="steps">
      ${t.process.steps.map((s, i) => `<li data-reveal style="--d:${i * 70}ms"><span class="step-num">${String(i + 1).padStart(2, '0')}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section" id="partners">
  <div class="container">
    ${sectionHead(t.partners)}
    <div class="partners">
      ${t.partners.items.map((p, i) => `<article class="partner" data-reveal style="--d:${i * 80}ms"><h3>${p.title}</h3><p>${p.text}</p></article>`).join('')}
    </div>
    <div class="center-cta" data-reveal><a class="btn btn-primary btn-lg" href="#contact">${t.partners.cta} ${icon('arrow', 'ico ico-sm')}</a></div>
  </div>
</section>

<section class="section section-tint" id="warranty">
  <div class="container">
    ${sectionHead(t.warranty, true)}
    <div class="warranty">
      ${t.warranty.items.map((w, i) => `<div class="w-item" data-reveal style="--d:${i * 80}ms"><span class="w-value">${w.value}</span><h3>${w.title}</h3><p>${w.text}</p></div>`).join('')}
    </div>
    <p class="fineprint center" data-reveal>${t.warranty.note}</p>
  </div>
</section>

<section class="section" id="faq">
  <div class="container narrow">
    ${sectionHead(t.faq, true)}
    <div class="faq">
      ${t.faq.items.map((q) => `<details data-reveal><summary>${q.q}</summary><p>${q.a}</p></details>`).join('')}
    </div>
  </div>
</section>

<section class="section section-dark contact" id="contact">
  <div class="container contact-grid">
    <div>
      ${sectionHead(t.contact)}
      <ul class="contact-list" data-reveal>
        <li>${icon('mail')}<div><span>${t.contact.labels.email}</span><a href="mailto:${C.email}">${C.email}</a></div></li>
        <li>${icon('phone')}<div><span>${t.contact.labels.phone}</span><a href="tel:${C.phoneHref}">${C.phoneDisplay}</a></div></li>
        <li>${icon('pin')}<div><span>${t.contact.labels.address}</span><address>${esc(C.street)}<br>${C.city}, ${t.lang === 'sq' ? 'Shqipëri' : 'Albania'}</address></div></li>
      </ul>
      <div class="social social-lg" data-reveal>
        <span>${t.contact.labels.follow}</span>
        <a href="${C.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${social.linkedin}</a>
        <a href="${C.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${social.instagram}</a>
      </div>
    </div>
    <form class="form" id="quote-form" novalidate data-reveal data-email="${C.email}" data-subject="${esc(f.subject)}" data-required="${esc(f.required)}">
      <div class="row">
        <label>${f.name} *<input name="name" autocomplete="name" required></label>
        <label>${f.company}<input name="company" autocomplete="organization"></label>
      </div>
      <div class="row">
        <label>${f.email} *<input type="email" name="email" autocomplete="email" required></label>
        <label>${f.phone}<input type="tel" name="phone" autocomplete="tel"></label>
      </div>
      <div class="row">
        <label>${f.type}<select name="type">${opts(f.types)}</select></label>
        <label>${f.interest}<select name="interest">${opts(f.interests)}</select></label>
      </div>
      <label>${f.message} *<textarea name="message" rows="4" placeholder="${esc(f.messagePh)}" required></textarea></label>
      <label class="consent"><input type="checkbox" name="consent" required><span>${f.consent.replace('{privacy}', t.privacy.path)}</span></label>
      <p class="form-error" role="alert" hidden></p>
      <div class="form-actions">
        <button class="btn btn-primary btn-lg" type="submit">${f.submit} ${icon('arrow', 'ico ico-sm')}</button>
        <a class="btn btn-whatsapp btn-lg" href="https://wa.me/${C.whatsapp}" target="_blank" rel="noopener">${social.whatsapp}${f.whatsapp}</a>
      </div>
      <p class="form-note">${f.note}</p>
    </form>
  </div>
</section>

</main>
${footer(t)}
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

function legal(t, key) {
  const p = t[key];
  return `${head(t, { title: `${p.title} | Apex Frames`, description: p.metaDescription, path: p.path, altPath: p.altPath })}
<body>
${header(t, key)}
<main id="main" class="legal">
  <div class="container narrow">
    <p class="eyebrow">${C.legalName}</p>
    <h1>${p.title}</h1>
    <p class="updated">${p.updated}</p>
    <div class="prose">${p.body}</div>
  </div>
</main>
${footer(t)}
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

function notFound() {
  return `${head(sq, { title: '404 | Apex Frames', description: sq.notFound.text, path: '/404.html', altPath: '/404.html', noindex: true })}
<body class="nf">
<main id="main" class="nf-main">
  <a href="/" aria-label="Apex Frames">${inline(mark, 'nf-mark')}</a>
  <p class="nf-code">404</p>
  <h1>${sq.notFound.title} <span lang="en">/ ${en.notFound.title}</span></h1>
  <p>${sq.notFound.text}<br><span lang="en">${en.notFound.text}</span></p>
  <p><a class="btn btn-primary" href="/">${sq.notFound.back}</a> <a class="btn btn-outline" href="/en/">${en.notFound.back}</a></p>
</main>
</body>
</html>
`;
}

const out = (rel, html) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log('✓', rel);
};

for (const t of [sq, en]) {
  out(join(t.path, 'index.html'), home(t));
  out(join(t.privacy.path, 'index.html'), legal(t, 'privacy'));
  out(join(t.terms.path, 'index.html'), legal(t, 'terms'));
}
out('404.html', notFound());

const urls = [sq.path, en.path, sq.privacy.path, en.privacy.path, sq.terms.path, en.terms.path];
out(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${C.url}${u}</loc></url>`).join('\n')}
</urlset>
`
);
