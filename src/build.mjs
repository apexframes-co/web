// Gjeneron gjithë faqen statike në dosjen dist/:  node src/build.mjs
import { mkdirSync, writeFileSync, readFileSync, cpSync, rmSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { company as C, sq, en } from './content.mjs';
import { routes, ui } from './ui.mjs';
import { products } from './products.mjs';
import { posts as basePosts } from './blog.mjs';
import { productExtra, postExtra, pageExtra, faqExtra } from './content-extra.mjs';
import { postExtra2 } from './content-extra2.mjs';
import { morePosts } from './blog-more.mjs';
const posts = [...basePosts, ...morePosts];
// përmbajtje shtesë (thellësi SEO/AEO): seksione + pyetje për artikujt, udhëzues për produktet
for (const l of ['sq', 'en']) {
  for (const post of posts) { const ex = (postExtra[post.id] || postExtra2[post.id])?.[l]; if (ex) { post[l].sections = [...post[l].sections, ...ex.sections]; post[l].faq = [...post[l].faq, ...ex.faq]; } }
  for (const p of products) { const ex = productExtra[p.id]?.[l]; if (ex) { p[l].guide = ex.guide; p[l].faq = [...p[l].faq, ...ex.faq]; } }
}
const extraBlock = (lang, id) => (pageExtra[id] ? `\n<section class="section section-tight"><div class="container narrow"><div class="prose">${pageExtra[id][lang]}</div></div></section>` : '');

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const LANGS = ['sq', 'en'];
const content = { sq, en };
const SITE_DATE = '2026-11-02';
const INDEXNOW_KEY = '50cb06343eddc8338461ecc930633918';
const year = new Date().getFullYear();

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });
cpSync(join(ROOT, 'files'), join(DIST, 'files'), { recursive: true });

const rd = (p) => readFileSync(join(ROOT, p), 'utf8');
const logoSvg = rd('assets/img/logo.svg').trim();
const markSvg = rd('assets/img/logo-mark.svg').trim();
const manifest = JSON.parse(rd('assets/img/photos/manifest.json'));
const models = JSON.parse(rd('src/catalogue.json'));
const PDF_URL = '/files/Apex-Frames-Katalogu-Dyer-PVC.pdf';
const PDF_MB = (statSync(join(ROOT, 'files/Apex-Frames-Katalogu-Dyer-PVC.pdf')).size / 1048576).toFixed(1).replace(/\.0$/, '');
const fillN = (t) => t.replace(/\{n\}/g, models.length);
const ver = createHash('sha1').update(rd('assets/css/styles.css') + rd('assets/js/main.js') + rd('assets/js/warranty.js') + rd('assets/js/admin-warranty.js')).digest('hex').slice(0, 8);
const INLINE_JS = "document.documentElement.classList.add('js')";
const INLINE_HASH = createHash('sha256').update(INLINE_JS).digest('base64');

/* ---------- ndihmëse ---------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const slugify = (s) => strip(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const other = (l) => (l === 'sq' ? 'en' : 'sq');
const rp = (l, id) => routes[id][l];
const pp = (l, p) => rp(l, 'products') + p.slug[l] + '/';
const bp = (l, post) => rp(l, 'blog') + post.slug[l] + '/';
const abs = (p) => C.url + p;
const MONTHS = { sq: ['janar', 'shkurt', 'mars', 'prill', 'maj', 'qershor', 'korrik', 'gusht', 'shtator', 'tetor', 'nëntor', 'dhjetor'], en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
const fmtDate = (l, d) => { const [y, m, day] = d.split('-').map(Number); return l === 'sq' ? `${day} ${MONTHS.sq[m - 1]} ${y}` : `${MONTHS.en[m - 1]} ${day}, ${y}`; };
const inline = (svg, cls) => svg.replace('<svg ', `<svg class="${cls}" `).replace(/clip-(\d)/g, `${cls}-c$1`).replace(/source-5/g, `${cls}-src`);

const icons = {
  window: '<rect x="8" y="5" width="32" height="38" rx="1.5"/><path d="M24 5v38M8 22h32"/><path d="M28 27l4 4"/>',
  alu: '<rect x="6" y="8" width="36" height="32" rx="1.5"/><rect x="11" y="13" width="26" height="22"/><path d="M24 13v22"/>',
  door: '<path d="M12 43V6h24v37"/><path d="M6 43h36"/><circle cx="31" cy="26" r="1.6"/><rect x="17" y="11" width="14" height="10"/>',
  facade: '<path d="M6 43V6h36v37"/><path d="M6 18h36M6 31h36M18 6v37M30 6v37"/>',
  glass: '<rect x="10" y="6" width="28" height="36" rx="1.5"/><path d="M17 16l7-7M17 26l14-14M24 30l7-7"/>',
  shutter: '<rect x="8" y="6" width="32" height="8" rx="1.5"/><path d="M10 14v26h28V14M10 20h28M10 26h28M10 32h28"/><path d="M41 10v20"/>',
  net: '<rect x="8" y="6" width="32" height="36" rx="1.5"/><path d="M8 15h32M8 24h32M8 33h32M17 6v36M26 6v36M35 6v36" stroke-width="1"/>',
  awning: '<path d="M6 14h36l-4 10H10z"/><path d="M8 14V8h32v6M10 24v18M38 24v18"/>',
  railing: '<path d="M6 40h36M10 40V14M24 40V14M38 40V14M6 14h36"/><path d="M13 20h8v14h-8zM27 20h8v14h-8z"/>',
  check: '<path d="M10 25l9 9 19-20"/>',
  arrow: '<path d="M8 24h32M28 12l12 12-12 12"/>',
};
const icon = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[n]}</svg>`;
const social = {
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.12 1.43-2.12 2.9V21H9z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.8.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.8.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 4.86a4.94 4.94 0 100 9.88 4.94 4.94 0 000-9.88zm0 8.15a3.21 3.21 0 110-6.42 3.21 3.21 0 010 6.42zm5.14-9.5a1.15 1.15 0 100 2.3 1.15 1.15 0 000-2.3z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 14.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.8h-.01a9.8 9.8 0 01-5-1.37l-.36-.21-3.72.97 1-3.62-.24-.37a9.8 9.8 0 1118.15-5.2 9.8 9.8 0 01-9.82 9.8zm8.35-18.15A11.75 11.75 0 002 17.7L.33 23.8l6.24-1.64a11.73 11.73 0 005.61 1.43h.01A11.75 11.75 0 0020.39 3.65z"/></svg>',
};

const ALT = {
  doors: { sq: 'Dyer rrëshqitëse alumini me xham në një shtëpi moderne (vizualizim)', en: 'Aluminium sliding glass doors on a modern house (visualisation)' },
  aluminium: { sq: 'Dyer dhe dritare alumini panoramike me xham (vizualizim)', en: 'Panoramic aluminium doors and windows with glass (visualisation)' },
  shutters: { sq: 'Dritare me grila persiane alumini të zeza në një fasadë të bardhë (vizualizim)', en: 'Window with black aluminium louvred shutters on a white facade (visualisation)' },
  facade: { sq: 'Fasadë xhami curtain wall me strukturë alumini të zezë (vizualizim)', en: 'Glass curtain wall facade with black aluminium structure (visualisation)' },
  glazing: { sq: 'Xham fasade që reflekton qiellin dhe pemët (vizualizim)', en: 'Facade glazing reflecting sky and trees (visualisation)' },
  awning: { sq: 'Tendë dielli mbi një tarracë me pamje nga deti (vizualizim)', en: 'Awning over a terrace with a sea view (visualisation)' },
  family: { sq: 'Familje në një kuzhinë me dyer panoramike alumini me xham', en: 'Family in a kitchen with panoramic aluminium glass doors' },
  window: { sq: 'Dritare e bardhë me tre krahë me pamje nga qielli', en: 'White three-sash window with a view of the sky' },
  shutters2: { sq: 'Grila persiane të bardha të hapura në një dritare në perëndim të diellit', en: 'White louvred shutters open on a window at sunset' },
  sliding: { sq: 'Dyer rrëshqitëse me kornizë të bardhë dhe pamje nga malet', en: 'Sliding doors with a white frame and a mountain view' },
  roller: { sq: 'Grila me litar me lamela të bardha dhe kuti të jashtme', en: 'White strap-operated roller shutters with an external box' },
  blackslider: { sq: 'Dyer rrëshqitëse me kornizë të zezë dhe pamje nga vreshtat', en: 'Black-framed sliding doors with a vineyard view' },
  building: { sq: 'Fasadë ndërtese me dritare dhe parapete balkoni të zeza', en: 'Building facade with windows and black balcony railings' },
  profile: { sq: 'Prerje e një profili alumini me thyerje termike dhe xham dopio', en: 'Cross-section of a thermally broken aluminium profile with double glazing' },
  door: { sq: 'Derë hyrëse antracit me panel anësor xhami dhe dorezë të gjatë', en: 'Anthracite entrance door with a glass side panel and a long handle' },
  glassroof: { sq: 'Strukturë xhami me kornizë të hollë metalike dhe pamje nga një ndërtesë klasike', en: 'Glass structure with a slim metal frame and a view of a classic building' },
  glassdoors: { sq: 'Dyer dhe ndarje alumini me xham në një ambient të ndritshëm zyrash', en: 'Aluminium glass doors and partitions in a bright office space' },
  pleated: { sq: 'Rrjetë kundër insekteve plissé në një derë ballkoni me pamje nga deti', en: 'Plissé insect screen on a balcony door with a sea view' },
  roll: { sq: 'Rrjetë kundër insekteve me rrotullim në një dritare dhe mostër rrjete', en: 'Roll-up insect screen on a window with a mesh sample' },
  railing: { sq: 'Kangjellë me xham sigurie dhe shtylla e doreza të zeza në një tarracë', en: 'Safety-glass railing with black posts and handrail on a terrace' },
};
function img(name, lang, { sizes = '100vw', eager = false, cls = '' } = {}) {
  const v = manifest[name];
  const big = v[v.length - 1];
  const srcset = v.map((x) => `/assets/img/photos/${name}-${x.w}.webp ${x.w}w`).join(', ');
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/photos/${name}-${big.w}.webp" srcset="${srcset}" sizes="${sizes}" width="${big.w}" height="${big.h}" alt="${esc(ALT[name][lang])}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;
}
const preloadFor = (name, sizes) => {
  const v = manifest[name];
  return `<link rel="preload" as="image" type="image/webp" imagesrcset="${v.map((x) => `/assets/img/photos/${name}-${x.w}.webp ${x.w}w`).join(', ')}" imagesizes="${sizes}">`;
};

/* ---------- JSON-LD ---------- */
const ORG = C.url + '/#organization';
const SITE = C.url + '/#website';
const PHONE = '+' + C.phoneHref.replace('+', '');
const orgNode = (lang) => ({
  '@type': 'HomeAndConstructionBusiness',
  '@id': ORG,
  name: 'Apex Frames',
  legalName: C.legalName,
  taxID: C.nuis,
  url: C.url + '/',
  logo: { '@type': 'ImageObject', url: abs('/assets/img/logo.png'), width: 640, height: 240 },
  image: abs('/assets/img/og-image.png'),
  email: C.email,
  telephone: PHONE,
  foundingDate: '2026-09-14',
  address: { '@type': 'PostalAddress', streetAddress: C.street, addressLocality: 'Tirana', addressCountry: 'AL' },
  geo: { '@type': 'GeoCoordinates', latitude: 41.3231, longitude: 19.8214 },
  hasMap: 'https://www.google.com/maps/search/?api=1&query=Piramida+e+Tiran%C3%ABs',
  areaServed: { '@type': 'Country', name: 'Albania' },
  sameAs: [C.linkedin, C.instagram],
  hasOfferCatalog: { '@type': 'OfferCatalog', name: lang === 'sq' ? 'Produktet dhe shërbimet e Apex Frames' : 'Apex Frames products and services', itemListElement: products.map((p) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: p[lang].name, url: abs(pp(lang, p)) } })) },
  knowsAbout: ['uPVC windows', 'Aluminium windows', 'Doors', 'Glass facades', 'Glazing', 'Shutters', 'Awnings', 'Window installation'],
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: C.email, telephone: PHONE, availableLanguage: ['sq', 'en'] },
});
const siteNode = () => ({ '@type': 'WebSite', '@id': SITE, url: C.url + '/', name: 'Apex Frames', publisher: { '@id': ORG }, inLanguage: ['sq', 'en'] });
const faqNode = (url, items) => ({ '@type': 'FAQPage', '@id': url + '#faq', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });

/* ---------- pjesët e përbashkëta ---------- */
function head({ lang, title, desc, path, alt, og, ogAlt, type = 'website', graph = [], preload = '', noindex = false, article = null }) {
  const url = abs(path);
  const ogUrl = abs(og || '/assets/img/og-image.png');
  const l2 = other(lang);
  const sqPath = lang === 'sq' ? path : alt;
  const jsonld = JSON.stringify({ '@context': 'https://schema.org', '@graph': [orgNode(lang), siteNode(), ...graph] });
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>${INLINE_JS}</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${url}">
${alt ? `<link rel="alternate" hreflang="${lang}" href="${url}">
<link rel="alternate" hreflang="${l2}" href="${abs(alt)}">
<link rel="alternate" hreflang="x-default" href="${abs(sqPath)}">` : ''}`}
<meta name="theme-color" content="#2f425e">
<meta name="geo.region" content="AL-11">
<meta name="geo.placename" content="Tiranë">
<meta name="geo.position" content="41.3231;19.8214">
<meta name="ICBM" content="41.3231, 19.8214">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Apex Frames">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogUrl}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogAlt || 'Apex Frames')}">
<meta property="og:locale" content="${lang === 'sq' ? 'sq_AL' : 'en_US'}">
<meta property="og:locale:alternate" content="${lang === 'sq' ? 'en_US' : 'sq_AL'}">
${article ? `<meta property="article:published_time" content="${article.date}">
<meta property="article:modified_time" content="${article.updated}">
<meta property="article:section" content="${esc(article.category)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogUrl}">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="Apex Frames Blog (${lang})" href="${lang === 'sq' ? '/feed.xml' : '/en/feed.xml'}">
${preload}
<link rel="stylesheet" href="/assets/css/styles.css?v=${ver}">
<script type="application/ld+json">${jsonld}</script>
</head>`;
}

function header(lang, current, alt, hero = false) {
  const u = ui[lang];
  const items = ['products', 'services', 'process', 'blog', 'about'];
  return `
<a class="skip" href="#main">${content[lang].skip}</a>
<header class="site-header${hero ? ' on-hero' : ''}" data-header>
  <div class="container header-inner">
    <a class="brand" href="${rp(lang, 'home')}" aria-label="Apex Frames">${inline(logoSvg, 'logo')}</a>
    <nav class="nav" id="nav" aria-label="${u.nav.aria}">
      <ul>${items.map((k) => `<li><a href="${rp(lang, k)}"${current === k ? ' aria-current="page"' : ''}>${u.nav[k]}</a></li>`).join('')}</ul>
      <a class="btn btn-dark nav-cta" href="${rp(lang, 'contact')}">${u.nav.cta}</a>
    </nav>
    <div class="header-tools">
      <a class="lang" href="${alt}" hreflang="${other(lang)}" lang="${other(lang)}" title="${content[lang].altName}">${content[lang].altLabel}</a>
      <button class="menu-btn" type="button" aria-controls="nav" aria-expanded="false" data-label-open="${u.nav.menu}" data-label-close="${u.nav.close}"><span></span><span></span><span class="sr">${u.nav.menu}</span></button>
    </div>
  </div>
</header>`;
}

function footer(lang) {
  const c = content[lang];
  const u = ui[lang];
  const label = (id) => (u.nav[id] && id !== 'cta' ? u.nav[id] : u.pages[id].label);
  const links = (ids) => ids.map((id) => `<li><a href="${rp(lang, id)}">${label(id)}</a></li>`).join('');
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a href="${rp(lang, 'home')}" class="brand" aria-label="Apex Frames">${inline(logoSvg, 'flogo')}</a>
      <p>${c.footer.tagline}</p>
      <div class="social">
        <a href="${C.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${social.linkedin}</a>
        <a href="${C.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${social.instagram}</a>
        <a href="https://wa.me/${C.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${social.whatsapp}</a>
      </div>
    </div>
    <div>
      <h2>${u.nav.products}</h2>
      <ul>${products.map((p) => `<li><a href="${pp(lang, p)}">${p[lang].name}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2>${c.footer.company}</h2>
      <ul>${links(['catalogue', 'about', 'services', 'process', 'partners', 'warranty', 'certificate', 'faq', 'blog'])}</ul>
    </div>
    <div>
      <h2>${u.pages.contact.label}</h2>
      <ul>
        <li><a href="mailto:${C.email}">${C.email}</a></li>
        <li><a href="tel:${C.phoneHref}">${C.phoneDisplay}</a></li>
        <li>${C.city}, ${lang === 'sq' ? 'Shqipëri' : 'Albania'}</li>
      </ul>
      <h2 class="h2-gap">${c.footer.legal}</h2>
      <ul>
        <li><a href="${rp(lang, 'privacy')}">${c.footer.privacy}</a></li>
        <li><a href="${rp(lang, 'terms')}">${c.footer.terms}</a></li>
        <li>${c.footer.nuis} ${C.nuis}</li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© ${year} ${C.legalName}. ${c.footer.rights}</p>
    <a href="#top">${c.footer.top} ↑</a>
  </div>
</footer>`;
}

function crumbs(lang, trail) {
  const u = ui[lang];
  const all = [{ name: u.crumbs.home, path: rp(lang, 'home') }, ...trail];
  const html = `<nav class="crumbs" aria-label="${u.crumbs.label}"><ol>${all.map((c, i) => (i === all.length - 1 ? `<li aria-current="page">${c.name}</li>` : `<li><a href="${c.path}">${c.name}</a></li>`)).join('')}</ol></nav>`;
  return { html, all };
}
const breadcrumbNode = (url, all) => ({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: strip(c.name), item: abs(c.path) })) });

const pageHero = ({ crumbHtml, label, h1, lead = '', extra = '', media = '', mediaCls = '' }) => `
<section class="page-hero">
  <div class="container">
    ${crumbHtml}
    <div class="ph-grid${media ? ' has-media' : ''}">
      <div class="ph-copy">
        <p class="label">${label}</p>
        <h1>${h1}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
        ${extra}
      </div>
      ${media ? `<figure class="ph-media${mediaCls}">${media}</figure>` : ''}
    </div>
  </div>
</section>`;

const ctaBand = (lang, title, text) => `
<section class="cta-band">
  <div class="container cta-inner">
    <div><h2>${title}</h2><p>${text}</p></div>
    <a class="btn btn-primary" href="${rp(lang, 'contact')}">${ui[lang].nav.cta} ${icon('arrow', 'ico ico-sm')}</a>
  </div>
</section>`;

const secHead = (n, label, title, lead = '') => `
<div class="sec-head" data-reveal>
  ${label && label !== title ? `<p class="label">${n ? `<span>${n}</span>` : ''}${label}</p>` : ''}
  <h2>${title}</h2>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</div>`;

const wrapTables = (h) => h.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
const faqList = (items) => `<div class="faq">${items.map((q) => `<details><summary>${q.q}</summary><p>${q.a}</p></details>`).join('')}</div>`;
const checks = (items) => `<ul class="checks">${items.map((x) => `<li>${icon('check', 'ico ico-xs')}<span>${x}</span></li>`).join('')}</ul>`;

function tile(lang, p, { text = true } = {}) {
  const t = p[lang];
  const media = p.image ? `<div class="tile-media">${img(p.image, lang, { sizes: '(max-width: 600px) 100vw, (max-width: 920px) 50vw, 380px' })}</div>` : `<div class="tile-media tile-icon">${icon(p.icon, 'ico ico-xl')}</div>`;
  return `<a class="tile" href="${pp(lang, p)}" data-reveal>${media}<div class="tile-body"><h3>${t.name}</h3>${text ? `<p>${t.answer.split('. ')[0].replace(/\.$/, '')}.</p>` : ''}<span class="more">${ui[lang].common.learnMore} ${icon('arrow', 'ico ico-sm')}</span></div></a>`;
}
function postCard(lang, post) {
  const t = post[lang];
  return `<a class="post-card" href="${bp(lang, post)}" data-reveal><div class="post-media">${img(post.image, lang, { sizes: '(max-width: 600px) 100vw, (max-width: 920px) 50vw, 380px' })}</div><div class="post-body"><p class="post-meta">${t.category} · ${t.readMin} ${ui[lang].common.minRead}</p><h3>${t.title}</h3><p>${t.desc}</p></div></a>`;
}

/* ---------- regjistri i faqeve ---------- */
const pages = [];
function wrap({ lang, key, id, current, path, alt, title, desc, og, ogAlt, type, graph, preload, noindex, article, body, hero = false, lastmod = SITE_DATE, images = [], scripts = [] }) {
  const html = `${head({ lang, title, desc, path, alt, og, ogAlt, type, graph, preload, noindex, article })}
<body id="top">
${header(lang, current, alt, hero)}
<main id="main">
${body}
</main>
${footer(lang)}
<script src="/assets/js/main.js?v=${ver}" defer></script>
${scripts.map((sc) => `<script src="/assets/js/${sc}?v=${ver}" defer></script>`).join('\n')}
</body>
</html>
`;
  const file = join(DIST, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  pages.push({ lang, key, id, path, alt, title, desc, html, og, lastmod, noindex, images });
}
const pageNode = (lang, url, title, desc, type, extra = {}) => ({ '@type': type, '@id': url + '#webpage', url, name: title, description: desc, isPartOf: { '@id': SITE }, about: { '@id': ORG }, inLanguage: lang, breadcrumb: { '@id': url + '#breadcrumb' }, datePublished: '2026-10-31', dateModified: SITE_DATE, ...extra });

/* ---------- faqet ---------- */
for (const lang of LANGS) {
  const c = content[lang];
  const u = ui[lang];
  const alt = (id) => rp(other(lang), id);

  /* ===== Kreu ===== */
  {
    const path = rp(lang, 'home');
    const url = abs(path);
    const featured = posts.slice(0, 3);
    const body = `
<section class="hero">
  <div class="hero-bg" aria-hidden="false">${img('doors', lang, { sizes: '100vw', eager: true })}</div>
  <p class="hero-note">${u.common.illustrative}</p>
  <div class="container hero-center">
    <p class="pill">${c.hero.eyebrow}</p>
    <h1>${c.hero.title}</h1>
    <p class="lead">${u.home.lead}</p>
    <div class="actions">
      <a class="btn btn-white" href="${rp(lang, 'contact')}">${c.hero.primary} ${icon('arrow', 'ico ico-sm')}</a>
      <a class="btn btn-glass" href="${rp(lang, 'products')}">${c.hero.secondary}</a>
    </div>
  </div>
  <div class="container"><dl class="stats">${c.hero.stats.map((s) => `<div><dt>${s.value}</dt><dd>${s.label}</dd></div>`).join('')}</dl></div>
</section>

<section class="section">
  <div class="container">
    ${secHead('01', u.nav.products, u.home.productsTitle)}
    <div class="tiles">${products.map((p) => tile(lang, p, { text: false })).join('')}</div>
    <p class="center-link"><a class="btn btn-link" href="${rp(lang, 'products')}">${u.common.allProducts} ${icon('arrow', 'ico ico-sm')}</a></p>
  </div>
</section>

<section class="section section-paper">
  <div class="container">
    ${secHead('02', u.nav.about, u.home.whyTitle)}
    <ul class="cols-3">${u.home.why.map((w) => `<li data-reveal><h3>${w.t}</h3><p>${w.d}</p></li>`).join('')}</ul>
  </div>
</section>

<section class="section section-dark">
  <div class="container">
    ${secHead('03', u.nav.process, u.home.processTitle)}
    <ol class="steps-inline">${c.process.steps.map((s, i) => `<li data-reveal><span class="dot">${String(i + 1).padStart(2, '0')}</span><h3>${s.title}</h3></li>`).join('')}</ol>
    <p class="center-link"><a class="btn btn-link btn-light" href="${rp(lang, 'process')}">${u.home.processAll} ${icon('arrow', 'ico ico-sm')}</a></p>
  </div>
</section>

<section class="section">
  <div class="container">
    ${secHead('04', u.nav.blog, u.home.blogTitle)}
    <div class="post-grid">${featured.map((p) => postCard(lang, p)).join('')}</div>
    <p class="center-link"><a class="btn btn-link" href="${rp(lang, 'blog')}">${u.common.allPosts} ${icon('arrow', 'ico ico-sm')}</a></p>
  </div>
</section>
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    wrap({ lang, key: 'home', id: 'home', current: '', path, alt: alt('home'), title: c.meta.title, desc: c.meta.description, og: '/assets/img/photos/doors-og.jpg', ogAlt: ALT.doors[lang], preload: preloadFor('doors', '100vw'), hero: true, body, graph: [{ '@type': 'WebPage', '@id': url + '#webpage', url, name: c.meta.title, description: c.meta.description, isPartOf: { '@id': SITE }, about: { '@id': ORG }, inLanguage: lang, dateModified: SITE_DATE, primaryImageOfPage: { '@type': 'ImageObject', url: abs('/assets/img/photos/doors-og.jpg') } }] });
  }

  /* ===== Rreth nesh ===== */
  {
    const id = 'about';
    const pg = u.pages.about;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: pg.label, path }]);
    const body = `${pageHero({ crumbHtml: cr.html, label: pg.label, h1: pg.h1, lead: c.about.lead })}
<section class="section section-tight">
  <div class="container two-col">
    <div class="col-head">${secHead('01', pg.label, c.about.title)}</div>
    <ul class="rows">${c.about.cards.map((x) => `<li data-reveal><h3>${x.title}</h3><p>${x.text}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="section section-paper">
  <div class="container">
    ${secHead('02', c.about.valuesTitle, c.about.valuesTitle)}
    <ul class="cols-5">${c.about.values.map((v) => `<li data-reveal><h3>${v.title}</h3><p>${v.text}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="section">
  <div class="container narrow">
    ${secHead('03', pg.factsTitle, pg.factsTitle)}
    <dl class="facts" data-reveal>
      <div><dt>${pg.facts[0]}</dt><dd>${C.legalName}</dd></div>
      <div><dt>${pg.facts[1]}</dt><dd>${C.nuis}</dd></div>
      <div><dt>${pg.facts[2]}</dt><dd>${esc(C.street)}, ${C.city}</dd></div>
      <div><dt>${pg.facts[3]}</dt><dd>${pg.activity}</dd></div>
    </dl>
  </div>
</section>${extraBlock(lang, 'about')}
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    wrap({ lang, key: id, id, current: 'about', path, alt: alt(id), title: pg.title, desc: pg.desc, body, graph: [pageNode(lang, url, pg.title, pg.desc, 'AboutPage'), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Produktet (faqja kryesore) ===== */
  {
    const id = 'products';
    const pg = u.pages.products;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: pg.label, path }]);
    const body = `${pageHero({ crumbHtml: cr.html, label: pg.label, h1: pg.h1, lead: pg.lead })}
<section class="section section-tight">
  <div class="container">
    <h2 class="sr">${pg.h1}</h2>
    <div class="tiles tiles-text">${products.map((p) => tile(lang, p)).join('')}</div>
    <p class="fineprint" data-reveal>${pg.note}</p>
  </div>
</section>
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    const list = { '@type': 'ItemList', '@id': url + '#list', itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p[lang].name, url: abs(pp(lang, p)) })) };
    wrap({ lang, key: id, id, current: 'products', path, alt: alt(id), title: pg.title, desc: pg.desc, body, graph: [pageNode(lang, url, pg.title, pg.desc, 'CollectionPage', { mainEntity: { '@id': url + '#list' } }), list, breadcrumbNode(url, cr.all)] });
  }

  /* ===== Faqet e produkteve ===== */
  for (const p of products) {
    const t = p[lang];
    const pr = u.product;
    const path = pp(lang, p);
    const url = abs(path);
    const alt2 = pp(other(lang), p);
    const cr = crumbs(lang, [{ name: u.pages.products.label, path: rp(lang, 'products') }, { name: t.name, path }]);
    const media = p.image ? img(p.image, lang, { sizes: '(max-width: 920px) 100vw, 480px', eager: true }) : `<div class="icon-panel">${icon(p.icon, 'ico')}</div>`;
    const relPosts = posts.filter((x) => x.products.includes(p.id)).slice(0, 3);
    const og = p.image ? `/assets/img/photos/${p.image}-og.jpg` : '/assets/img/og-image.png';
    const mv = p.image ? manifest[p.image][manifest[p.image].length - 1] : null;
    const body = `${pageHero({ crumbHtml: cr.html, label: u.pages.products.label, h1: t.h1, media, mediaCls: mv && mv.h / mv.w > 1.3 ? ' ph-portrait' : '' })}
<section class="section section-tight">
  <div class="container prod-layout">
    <div class="prod-main">
      <aside class="answer"><span>${u.common.answer}</span><p>${t.answer}</p></aside>
      <p class="intro">${t.intro}</p>
      <h2>${pr.includes}</h2>
      ${checks(t.features)}
      ${p.catalogue ? `<a class="cat-banner" href="${rp(lang, 'catalogue')}"><span class="cat-banner-media"><img src="/assets/img/catalogue/cover.webp" width="900" height="956" alt="${esc(u.cat.heroAlt)}" loading="lazy" decoding="async"></span><span class="cat-banner-text"><strong>${u.cat.banner.title}</strong><span>${fillN(u.cat.banner.text)}</span><em>${u.cat.banner.button} ${icon('arrow', 'ico ico-sm')}</em></span></a>` : ''}
      ${p.gallery ? `<div class="gallery${p.gallery.length === 1 ? ' gallery-1' : ''}">${p.gallery.map((g) => `<figure>${img(g, lang, { sizes: '(max-width: 600px) 100vw, 380px' })}</figure>`).join('')}</div>` : ''}
      <h2>${pr.bestFor}</h2>
      <ul class="chips">${t.bestFor.map((x) => `<li>${x}</li>`).join('')}</ul>
      ${t.guide ? `<h2>${t.guide.h}</h2><div class="prose">${t.guide.html}</div>` : ''}
      <h2>${pr.faq}</h2>
      ${faqList(t.faq)}
    </div>
    <aside class="prod-aside">
      <div class="aside-card">
        <h2>${pr.asideTitle}</h2>
        <p>${pr.asideText}</p>
        <dl>${pr.facts.map((f) => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl>
        <a class="btn btn-primary" href="${rp(lang, 'contact')}">${u.nav.cta} ${icon('arrow', 'ico ico-sm')}</a>
        <a class="aside-phone" href="tel:${C.phoneHref}">${C.phoneDisplay}</a>
      </div>
    </aside>
  </div>
</section>
${relPosts.length ? `<section class="section section-paper"><div class="container">${secHead('', pr.articles, pr.articles)}<div class="post-grid">${relPosts.map((x) => postCard(lang, x)).join('')}</div></div></section>` : ''}
<section class="section">
  <div class="container">
    ${secHead('', pr.related, pr.related)}
    <div class="tiles">${p.related.map((id2) => tile(lang, products.find((x) => x.id === id2), { text: false })).join('')}</div>
  </div>
</section>
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    const service = { '@type': 'Service', '@id': url + '#service', name: t.h1, description: t.answer, serviceType: pr.serviceType, provider: { '@id': ORG }, areaServed: { '@type': 'Country', name: 'Albania' }, url, image: abs(og) };
    wrap({ lang, key: 'product:' + p.id, id: p.id, current: 'products', path, alt: alt2, title: t.metaTitle, desc: t.metaDesc, og, ogAlt: p.image ? ALT[p.image][lang] : 'Apex Frames', preload: p.image ? preloadFor(p.image, '(max-width: 920px) 100vw, 480px') : '', body, graph: [pageNode(lang, url, t.metaTitle, t.metaDesc, 'WebPage', { mainEntity: { '@id': url + '#service' } }), service, faqNode(url, t.faq), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Shërbimet ===== */
  {
    const id = 'services';
    const pg = u.pages.services;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: pg.label, path }]);
    const body = `${pageHero({ crumbHtml: cr.html, label: pg.label, h1: pg.h1, lead: c.services.lead, media: img('aluminium', lang, { sizes: '(max-width: 920px) 100vw, 480px', eager: true }) })}
<section class="section section-tight">
  <div class="container">
    <ol class="svc-list">${c.services.items.map((s, i) => `<li data-reveal><span class="idx">0${i + 1}</span><div><h2>${s.title}</h2><p>${s.text}</p></div>${checks(u.servicesBullets[i])}</li>`).join('')}</ol>
    <div class="chips-block" data-reveal><h2>${c.services.modesTitle}</h2><ul class="chips">${c.services.modes.map((m) => `<li>${m}</li>`).join('')}</ul></div>
  </div>
</section>${extraBlock(lang, 'services')}
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    wrap({ lang, key: id, id, current: 'services', path, alt: alt(id), title: pg.title, desc: pg.desc, og: '/assets/img/photos/aluminium-og.jpg', ogAlt: ALT.aluminium[lang], preload: preloadFor('aluminium', '(max-width: 920px) 100vw, 480px'), body, graph: [pageNode(lang, url, pg.title, pg.desc, 'WebPage'), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Procesi ===== */
  {
    const id = 'process';
    const pg = u.pages.process;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: pg.label, path }]);
    const inst = posts.find((x) => x.id === 'window-installation-8-steps');
    const body = `${pageHero({ crumbHtml: cr.html, label: pg.label, h1: pg.h1, lead: c.process.lead })}
<section class="section section-tight">
  <div class="container two-col">
    <ol class="vsteps">${c.process.steps.map((s, i) => `<li data-reveal><span class="dot">${String(i + 1).padStart(2, '0')}</span><div><h2>${s.title}</h2><p>${s.text}</p></div></li>`).join('')}</ol>
    <div class="side-stack">
      <div class="aside-card" data-reveal>
        <h2>${pg.timesTitle}</h2>
        <dl>${pg.times.map((r) => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('')}</dl>
      </div>
      <div class="aside-card" data-reveal>
        <h2>${pg.moreTitle}</h2>
        <a class="btn btn-outline" href="${bp(lang, inst)}">${pg.more} ${icon('arrow', 'ico ico-sm')}</a>
      </div>
    </div>
  </div>
</section>${extraBlock(lang, 'process')}
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    wrap({ lang, key: id, id, current: 'process', path, alt: alt(id), title: pg.title, desc: pg.desc, body, graph: [pageNode(lang, url, pg.title, pg.desc, 'WebPage'), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Për profesionistët ===== */
  {
    const id = 'partners';
    const pg = u.pages.partners;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: pg.label, path }]);
    const body = `${pageHero({ crumbHtml: cr.html, label: pg.label, h1: pg.h1, lead: c.partners.lead })}
<section class="section section-tight">
  <div class="container">
    <h2 class="sr">${c.partners.title}</h2>
    <ul class="cols-4">${c.partners.items.map((x) => `<li data-reveal><h3>${x.title}</h3><p>${x.text}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="section section-paper">
  <div class="container two-col">
    <div class="col-head">${secHead('', pg.offerTitle, pg.offerTitle)}</div>
    <div data-reveal>${checks(pg.offer)}</div>
  </div>
</section>${extraBlock(lang, 'partners')}
${ctaBand(lang, c.partners.title, u.home.ctaText)}`;
    wrap({ lang, key: id, id, current: '', path, alt: alt(id), title: pg.title, desc: pg.desc, body, graph: [pageNode(lang, url, pg.title, pg.desc, 'WebPage'), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Garancia ===== */
  {
    const id = 'warranty';
    const pg = u.pages.warranty;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: pg.label, path }]);
    const tb = pg.table;
    const body = `${pageHero({ crumbHtml: cr.html, label: pg.label, h1: pg.h1, lead: pg.lead })}
<section class="section section-tight">
  <div class="container">
    <h2 class="sr">${c.warranty.title}</h2>
    <div class="figures">${c.warranty.items.map((x) => `<div data-reveal><span class="fig">${x.value}</span><h3>${x.title}</h3><p>${x.text}</p></div>`).join('')}</div>
  </div>
</section>
<section class="section section-paper">
  <div class="container">
    ${secHead('', pg.tableTitle, pg.tableTitle)}
    <div class="table-wrap" data-reveal><table><thead><tr>${tb[0].map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${tb.slice(1).map((r) => `<tr>${r.map((x) => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <p class="fineprint" data-reveal>${c.warranty.note}</p>
  </div>
</section>
<section class="section">
  <div class="container two-col">
    <div>${secHead('', pg.claimsTitle, pg.claimsTitle)}
      <ol class="vsteps compact">${pg.claims.map((s, i) => `<li data-reveal><span class="dot">${String(i + 1).padStart(2, '0')}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div></li>`).join('')}</ol>
    </div>
    <div class="side-stack"><div class="aside-card" data-reveal><h2>${pg.docsTitle}</h2>${checks(pg.docs)}</div></div>
  </div>
</section>
<section class="section section-tight"><div class="container narrow"><aside class="aside-card cert-cta" data-reveal><h2>${u.cert.cta.title}</h2><p>${u.cert.cta.text}</p><a class="btn btn-primary" href="${rp(lang, 'certificate')}">${u.cert.cta.button} ${icon('arrow', 'ico ico-sm')}</a></aside></div></section>${extraBlock(lang, 'warranty')}
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    wrap({ lang, key: id, id, current: '', path, alt: alt(id), title: pg.title, desc: pg.desc, body, graph: [pageNode(lang, url, pg.title, pg.desc, 'WebPage'), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Certifikata e garancisë (publike) ===== */
  {
    const id = 'certificate';
    const k = u.cert;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: u.pages.warranty.label, path: rp(lang, 'warranty') }, { name: k.label, path }]);
    const i18n = esc(JSON.stringify({ ...k.js, contact: rp(lang, 'contact') }));
    const f = k.f;
    const body = `${pageHero({ crumbHtml: cr.html, label: k.label, h1: k.h1, lead: k.lead })}
<section class="section section-tight" id="cert-app" data-api="/api/warranty/" data-lang="${lang}" data-i18n="${i18n}">
  <div class="container two-col">
    <div class="col-head">
      <h2 class="sr">${k.label}</h2>
      <ol class="vsteps compact">${k.steps.map((s2, i) => `<li><span class="dot">${String(i + 1).padStart(2, '0')}</span><div><h3>${s2[0]}</h3><p>${s2[1]}</p></div></li>`).join('')}</ol>
      <div class="aside-card cert-check">
        <h2>${k.checkTitle}</h2>
        <p>${k.checkLead}</p>
        <form id="cert-check" class="check-form" novalidate><input id="cert-q" name="q" placeholder="${esc(f.checkPh)}" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="${esc(k.checkTitle)}" required><button class="btn btn-dark" type="submit">${f.check}</button></form>
        <div id="cert-result" aria-live="polite"></div>
      </div>
    </div>
    <div>
      <form class="form" id="cert-form" novalidate>
        <h2 class="form-title">${k.formTitle}</h2>
        <p class="form-hint">${f.hint}</p>
        <div class="row"><label>${f.name}<input name="name" autocomplete="given-name" maxlength="60"></label><label>${f.surname}<input name="surname" autocomplete="family-name" maxlength="60"></label></div>
        <div class="row"><label>${f.email}<input type="email" name="email" autocomplete="email" maxlength="120"></label><label>${f.phone}<input type="tel" name="phone" autocomplete="tel" maxlength="24"></label></div>
        <label>${f.product}<input name="product" maxlength="120" placeholder="${esc(f.productPh)}"></label>
        <div class="row"><label>${f.purchaseDate}<input type="date" name="purchaseDate" min="2000-01-01"></label><label>${f.reference}<input name="reference" maxlength="60"></label></div>
        <div class="hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <input type="hidden" name="ts" value="">
        <label class="consent"><input type="checkbox" name="consent" required><span>${f.consent.replace('{privacy}', rp(lang, 'privacy'))}</span></label>
        <p class="form-info">${f.info.replace('{privacy}', rp(lang, 'privacy'))}</p>
        <p class="form-error" role="alert" hidden></p>
        <div class="actions"><button class="btn btn-primary" type="submit" data-sending="${esc(f.sending)}">${f.submit} ${icon('arrow', 'ico ico-sm')}</button></div>
      </form>
      <div class="aside-card cert-success" id="cert-success" hidden></div>
    </div>
  </div>
</section>
<section class="section section-paper section-faq">
  <div class="container narrow">
    ${secHead('', k.faqTitle, k.faqTitle)}
    ${faqList(k.faq)}
  </div>
</section>
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    wrap({ lang, key: id, id, current: '', path, alt: alt(id), title: k.title, desc: k.desc, body, scripts: ['warranty.js'], graph: [pageNode(lang, url, k.title, k.desc, 'WebPage'), faqNode(url, k.faq), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Pyetje të shpeshta ===== */
  {
    const id = 'faq';
    const pg = u.pages.faq;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: pg.label, path }]);
    const items = [...c.faq.items, ...u.extraFaq, ...faqExtra[lang]];
    const body = `${pageHero({ crumbHtml: cr.html, label: pg.label, h1: pg.h1, lead: pg.lead })}
<section class="section section-tight">
  <div class="container narrow">${faqList(items)}</div>
</section>
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    wrap({ lang, key: id, id, current: '', path, alt: alt(id), title: pg.title, desc: pg.desc, body, graph: [pageNode(lang, url, pg.title, pg.desc, 'FAQPage', { mainEntity: { '@id': url + '#faq' } }), faqNode(url, items), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Kontakt ===== */
  {
    const id = 'contact';
    const pg = u.pages.contact;
    const f = c.contact.form;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: pg.label, path }]);
    const opts = (arr) => arr.map((o) => `<option>${esc(o)}</option>`).join('');
    const body = `${pageHero({ crumbHtml: cr.html, label: pg.label, h1: pg.h1, lead: c.contact.lead })}
<section class="section section-tight">
  <div class="container two-col">
    <div class="col-head">
      <dl class="contact-list" data-reveal>
        <div><dt>${c.contact.labels.email}</dt><dd><a href="mailto:${C.email}">${C.email}</a></dd></div>
        <div><dt>${c.contact.labels.phone}</dt><dd><a href="tel:${C.phoneHref}">${C.phoneDisplay}</a></dd></div>
        <div><dt>${c.contact.labels.address}</dt><dd>${esc(C.street)}, ${C.city}<br><a href="https://www.google.com/maps/search/?api=1&amp;query=Piramida+e+Tiran%C3%ABs" target="_blank" rel="noopener">${u.common.directions}</a></dd></div>
        <div><dt>${c.contact.labels.follow}</dt><dd><a href="${C.linkedin}" target="_blank" rel="noopener">LinkedIn</a> · <a href="${C.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="https://wa.me/${C.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></dd></div>
      </dl>
      <h2 class="h2-sm">${pg.nextTitle}</h2>
      <ol class="vsteps compact">${pg.next.map((s, i) => `<li><span class="dot">${String(i + 1).padStart(2, '0')}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div></li>`).join('')}</ol>
    </div>
    <form class="form" id="quote-form" novalidate data-email="${C.email}" data-subject="${esc(f.subject)}" data-required="${esc(f.required)}">
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
      <label class="consent"><input type="checkbox" name="consent" required><span>${f.consent.replace('{privacy}', rp(lang, 'privacy'))}</span></label>
      <p class="form-error" role="alert" hidden></p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">${f.submit} ${icon('arrow', 'ico ico-sm')}</button>
        <a class="btn btn-link" href="https://wa.me/${C.whatsapp}" target="_blank" rel="noopener">${social.whatsapp}${f.whatsapp}</a>
      </div>
      <p class="form-note">${f.note}</p>
    </form>
  </div>
</section>${extraBlock(lang, 'contact')}`;
    wrap({ lang, key: id, id, current: '', path, alt: alt(id), title: pg.title, desc: pg.desc, body, graph: [pageNode(lang, url, pg.title, pg.desc, 'ContactPage'), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Katalogu ===== */
  {
    const id = 'catalogue';
    const k = u.cat;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: k.label, path }]);
    const title = fillN(k.title);
    const desc = fillN(k.desc);
    const series = ['T', 'I', 'F'];
    const count = (f) => models.filter(f).length;
    const mAlt = (m) => (m.side ? k.modelAltSide : k.modelAlt).replace('{code}', m.code);
    const dl = `<div class="ph-actions"><a class="btn btn-primary" href="${PDF_URL}" download>${k.download} <span class="btn-meta">PDF · ${PDF_MB} MB</span></a><a class="btn btn-link" href="#models">${k.browse}</a></div>`;
    const finImgs = ['finish-golden-oak', 'finish-nussbaum', 'finish-mahogany', 'finish-antracit-1', 'finish-antracit-2'];
    const finSize = { 'finish-golden-oak': [219, 512], 'finish-nussbaum': [231, 550], 'finish-mahogany': [233, 549], 'finish-antracit-1': [224, 549], 'finish-antracit-2': [230, 549] };
    const body = `${pageHero({ crumbHtml: cr.html, label: k.label, h1: k.h1, lead: fillN(k.lead), extra: dl, mediaCls: ' ph-natural', media: `<img src="/assets/img/catalogue/cover.webp" width="900" height="956" alt="${esc(k.heroAlt)}" fetchpriority="high">` })}
<section class="section section-tight" id="models">
  <div class="container">
    <aside class="answer cat-answer"><span>${u.common.answer}</span><p>${fillN(k.answer)}</p></aside>
    <div class="cat-toolbar" role="group" aria-label="${k.filtersAria}">
      <button type="button" class="chip-btn is-active" data-filter="all" aria-pressed="true">${k.filters.all} <span>${models.length}</span></button>
      ${series.map((sr) => `<button type="button" class="chip-btn" data-filter="${sr}" aria-pressed="false">${k.filters[sr]} <span>${count((m) => m.series === sr)}</span></button>`).join('\n      ')}
      <button type="button" class="chip-btn" data-filter="side" aria-pressed="false">${k.filters.side} <span>${count((m) => m.side)}</span></button>
      <p class="cat-count" aria-live="polite"><strong id="cat-count">${models.length}</strong> ${k.count}</p>
    </div>
    <ul class="cat-grid" id="cat-grid">
      ${models.map((m) => `<li class="cat-card" id="${m.code}" data-series="${m.series}" data-side="${m.side ? 1 : 0}"><button type="button" class="cat-btn" data-code="${m.code}" data-src="/assets/img/catalogue/models/${m.code}.webp" data-w="${m.w}" data-h="${m.h}" aria-label="${k.open} ${m.code}"><span class="cat-media"><img src="/assets/img/catalogue/models/${m.code}.webp" width="${m.w}" height="${m.h}" alt="${esc(mAlt(m))}" loading="lazy" decoding="async"></span><span class="cat-code">${m.code}${m.side ? `<small>${k.sideLabel}</small>` : ''}</span></button></li>`).join('\n      ')}
    </ul>
    <p class="fineprint" data-reveal>${k.note}</p>
  </div>
</section>
<section class="section">
  <div class="container two-col">
    <div class="col-head">${secHead('', k.how.title, k.how.title)}
      <p class="lead" data-reveal>${k.how.related} <a href="${pp(lang, products.find((x) => x.id === 'doors'))}">${products.find((x) => x.id === 'doors')[lang].name}</a> · <a href="${bp(lang, posts.find((x) => x.id === 'how-to-choose-entrance-door'))}">${posts.find((x) => x.id === 'how-to-choose-entrance-door')[lang].metaTitle.replace(' | Apex Frames', '')}</a></p>
    </div>
    <ol class="vsteps compact" data-reveal>${k.how.steps.map((x, i) => `<li><span class="dot">${String(i + 1).padStart(2, '0')}</span><div><p>${x}</p></div></li>`).join('')}</ol>
  </div>
</section>
<section class="section section-paper">
  <div class="container">
    ${secHead('', k.finishes.title, k.finishes.title, k.finishes.lead)}
    <ul class="finishes">${finImgs.map((f, i) => `<li data-reveal><span class="fin-media"><img src="/assets/img/catalogue/${f}.webp" width="${finSize[f][0]}" height="${finSize[f][1]}" alt="${esc(k.finishes.names[i])}" loading="lazy" decoding="async"></span><span class="fin-name">${k.finishes.names[i]}</span></li>`).join('')}</ul>
  </div>
</section>
<section class="section">
  <div class="container two-col">
    <div class="col-head">
      ${secHead('', k.panel.title, k.panel.title, k.panel.lead)}
      <h3 class="h3-sm" data-reveal>${k.panel.layersTitle}</h3>
      <ol class="layers" data-reveal>${k.panel.layers.map((x) => `<li>${x}</li>`).join('')}</ol>
    </div>
    <div class="panel-figs" data-reveal>
      <figure><img src="/assets/img/catalogue/panel-structure-1.webp" width="844" height="442" alt="${esc(k.panel.alt1)}" loading="lazy" decoding="async"></figure>
      <figure><img src="/assets/img/catalogue/panel-structure-2.webp" width="686" height="379" alt="${esc(k.panel.alt2)}" loading="lazy" decoding="async"></figure>
    </div>
  </div>
</section>
<section class="section section-paper section-faq">
  <div class="container narrow">
    ${secHead('', k.faqTitle, k.faqTitle)}
    ${faqList(k.faq)}
  </div>
</section>
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}
<dialog class="lightbox" id="lightbox" aria-label="${k.model}" data-contact="${rp(lang, 'contact')}" data-side="${k.sideLabel}">
  <button type="button" class="lb-close" aria-label="${k.close}">&times;</button>
  <button type="button" class="lb-nav lb-prev" aria-label="${k.prev}">&#8249;</button>
  <button type="button" class="lb-nav lb-next" aria-label="${k.next}">&#8250;</button>
  <figure class="lb-figure">
    <div class="lb-stage"><img id="lb-img" alt="${k.model}" width="325" height="657"></div>
    <figcaption><strong id="lb-code"></strong><span id="lb-tag"></span><a id="lb-cta" class="btn btn-primary" href="${rp(lang, 'contact')}">${k.cta} ${icon('arrow', 'ico ico-sm')}</a></figcaption>
  </figure>
</dialog>`;
    const list = { '@type': 'ItemList', '@id': url + '#models', name: k.h1, numberOfItems: models.length, itemListElement: models.map((m, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'ImageObject', name: `${k.model} ${m.code}`, caption: mAlt(m), contentUrl: abs(`/assets/img/catalogue/models/${m.code}.webp`) } })) };
    const doc = { '@type': 'DigitalDocument', '@id': url + '#pdf', name: k.h1 + ' (PDF)', url: abs(PDF_URL), encodingFormat: 'application/pdf', inLanguage: lang, publisher: { '@id': ORG } };
    wrap({ lang, key: id, id, current: 'catalogue', path, alt: alt(id), title, desc, images: models.map((m) => `/assets/img/catalogue/models/${m.code}.webp`), og: '/assets/img/photos/door-og.jpg', ogAlt: ALT.door[lang], preload: `<link rel="preload" as="image" type="image/webp" href="/assets/img/catalogue/cover.webp">`, body, graph: [pageNode(lang, url, title, desc, 'CollectionPage', { mainEntity: { '@id': url + '#models' }, hasPart: { '@id': url + '#pdf' } }), list, doc, faqNode(url, k.faq), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Blogu: lista ===== */
  {
    const id = 'blog';
    const pg = u.pages.blog;
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: pg.label, path }]);
    const body = `${pageHero({ crumbHtml: cr.html, label: pg.label, h1: pg.h1, lead: pg.lead })}
<section class="section section-tight"><div class="container"><h2 class="sr">${pg.h1}</h2><div class="post-grid">${posts.map((p) => postCard(lang, p)).join('')}</div></div></section>
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    const blog = { '@type': 'Blog', '@id': url + '#blog', name: pg.h1, url, inLanguage: lang, publisher: { '@id': ORG }, blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p[lang].title, url: abs(bp(lang, p)), datePublished: p.date })) };
    wrap({ lang, key: id, id, current: 'blog', path, alt: alt(id), title: pg.title, desc: pg.desc, body, graph: [pageNode(lang, url, pg.title, pg.desc, 'CollectionPage', { mainEntity: { '@id': url + '#blog' } }), blog, breadcrumbNode(url, cr.all)] });
  }

  /* ===== Blogu: artikujt ===== */
  for (const post of posts) {
    const t = post[lang];
    const path = bp(lang, post);
    const url = abs(path);
    const alt2 = bp(other(lang), post);
    const cr = crumbs(lang, [{ name: u.pages.blog.label, path: rp(lang, 'blog') }, { name: t.title, path }]);
    const secs = t.sections.map((s) => ({ ...s, id: slugify(s.h) }));
    const og = `/assets/img/photos/${post.image}-og.jpg`;
    const text = strip([t.answer, ...t.sections.map((s) => s.html), ...t.faq.map((f) => f.q + ' ' + f.a)].join(' '));
    const overlap = (x) => x.products.filter((id2) => post.products.includes(id2)).length;
    const others = posts.filter((x) => x.id !== post.id).sort((a, b) => overlap(b) - overlap(a)).slice(0, 2);
    const prods = post.products.map((id2) => products.find((x) => x.id === id2));
    const faqId = slugify(u.product.faq);
    const body = `
<article class="article">
  <header class="article-head">
    <div class="container narrow">
      ${cr.html}
      <p class="label">${t.category}</p>
      <h1>${t.title}</h1>
      <p class="byline">${u.common.by} · <time datetime="${post.date}">${fmtDate(lang, post.date)}</time> · ${t.readMin} ${u.common.minRead}</p>
    </div>
  </header>
  <div class="container narrow">
    <figure class="article-photo">${img(post.image, lang, { sizes: '(max-width: 820px) 100vw, 820px', eager: true, cls: 'cover' })}<figcaption>${u.common.illustrative}</figcaption></figure>
    <aside class="answer"><span>${u.common.answer}</span><p>${t.answer}</p></aside>
    <nav class="toc" aria-label="${u.common.toc}"><p>${u.common.toc}</p><ol>${secs.map((s) => `<li><a href="#${s.id}">${s.h}</a></li>`).join('')}<li><a href="#${faqId}">${u.product.faq}</a></li></ol></nav>
    <div class="prose">
      ${secs.map((s) => `<section><h2 id="${s.id}">${s.h}</h2>${wrapTables(s.html)}</section>`).join('\n')}
      <section><h2 id="${faqId}">${u.product.faq}</h2>${faqList(t.faq)}</section>
    </div>
    <div class="article-related">
      <h2>${u.common.related}</h2>
      <ul class="chips chips-links">${prods.map((p) => `<li><a href="${pp(lang, p)}">${p[lang].name}</a></li>`).join('')}</ul>
    </div>
  </div>
</article>
<section class="section section-paper"><div class="container"><div class="sec-head"><h2>${u.home.blogTitle}</h2></div><div class="post-grid post-grid-2">${others.map((x) => postCard(lang, x)).join('')}</div></div></section>
${ctaBand(lang, u.home.ctaTitle, u.home.ctaText)}`;
    const article = { '@type': 'BlogPosting', '@id': url + '#article', headline: t.title, description: t.desc, image: [abs(og)], datePublished: post.date, dateModified: post.updated, author: { '@id': ORG }, publisher: { '@id': ORG }, mainEntityOfPage: { '@id': url + '#webpage' }, inLanguage: lang, articleSection: t.category, keywords: [t.category, ...prods.map((p) => p[lang].name)].join(', '), wordCount: text.split(' ').length, isPartOf: { '@id': abs(rp(lang, 'blog')) + '#blog' } };
    wrap({ lang, key: 'post:' + post.id, id: post.id, current: 'blog', path, alt: alt2, title: t.metaTitle || `${t.title} | Apex Frames`, desc: t.desc, og, ogAlt: ALT[post.image][lang], type: 'article', article: { date: post.date, updated: post.updated, category: t.category }, preload: preloadFor(post.image, '(max-width: 820px) 100vw, 820px'), body, lastmod: post.updated, graph: [pageNode(lang, url, t.title, t.desc, 'WebPage', { mainEntity: { '@id': url + '#article' } }), article, faqNode(url, t.faq), breadcrumbNode(url, cr.all)] });
  }

  /* ===== Ligjore ===== */
  for (const id of ['privacy', 'terms']) {
    const p = c[id];
    const path = rp(lang, id);
    const url = abs(path);
    const cr = crumbs(lang, [{ name: p.title, path }]);
    const body = `
<section class="page-hero page-hero-sm"><div class="container narrow">${cr.html}<p class="label">${C.legalName}</p><h1>${p.title}</h1><p class="updated">${p.updated}</p></div></section>
<section class="section section-tight"><div class="container narrow"><div class="prose">${p.body}</div></div></section>`;
    wrap({ lang, key: id, id, current: '', path, alt: alt(id), title: `${p.title} | Apex Frames`, desc: p.metaDescription, body, graph: [pageNode(lang, url, p.title, p.metaDescription, 'WebPage'), breadcrumbNode(url, cr.all)] });
  }
}

/* ---------- paneli i adminit (vetëm SQ, noindex, jashtë sitemap-it) ---------- */
{
  const lang = 'sq';
  const path = '/admin/garancia/';
  const body = `${pageHero({ crumbHtml: '', label: 'Admin', h1: 'Certifikatat e garancisë', lead: 'Miratoni kërkesat dhe lëshoni certifikata me numër unik (AF-…), e vlefshme 5 vite.' })}
<section class="section section-tight" id="admin-app" data-api="/api/warranty/">
  <div class="container">
    <form id="login" class="form login-form" novalidate>
      <label>Fjalëkalimi i adminit<input type="password" id="pw" autocomplete="current-password" required></label>
      <p class="form-error" role="alert" hidden></p>
      <div class="actions"><button class="btn btn-primary" type="submit">Hyr</button></div>
    </form>
    <div id="panel" hidden>
      <div class="admin-bar">
        <p class="admin-next">Numri vijues: <strong id="admin-next"></strong></p>
        <div class="admin-tabs" role="tablist">
          <button type="button" class="chip-btn is-active" data-tab="pending">Në pritje <span id="n-pending">0</span></button>
          <button type="button" class="chip-btn" data-tab="issued">Të lëshuara <span id="n-issued">0</span></button>
          <button type="button" class="chip-btn" data-tab="rejected">Të refuzuara <span id="n-rejected">0</span></button>
          <button type="button" class="chip-btn" data-tab="new">Lësho të re</button>
        </div>
        <button type="button" class="btn btn-link" id="logout">Dil</button>
      </div>
      <div id="admin-msg" class="admin-msg" role="status" hidden></div>
      <div id="tab-pending"></div><div id="tab-issued" hidden></div><div id="tab-rejected" hidden></div>
      <form id="tab-new" class="form" hidden novalidate>
        <div class="row"><label>Emri<input name="name" maxlength="60"></label><label>Mbiemri<input name="surname" maxlength="60"></label></div>
        <div class="row"><label>Email<input type="email" name="email" maxlength="120"></label><label>Telefon<input type="tel" name="phone" maxlength="24"></label></div>
        <div class="row"><label>Produkti<input name="product" maxlength="120"></label><label>Data e blerjes (fillimi i garancisë)<input type="date" name="startDate"></label></div>
        <label>Nr. i kontratës ose faturës<input name="reference" maxlength="60"></label>
        <p class="form-error" role="alert" hidden></p>
        <p class="form-hint">Plotësoni të paktën një fushë (emër, kontakt ose referencë). Të dhëna të pakta janë të lejuara.</p>
        <div class="actions"><button class="btn btn-primary" type="submit">Lësho certifikatën</button></div>
      </form>
    </div>
  </div>
</section>`;
  wrap({ lang, key: 'admin', id: 'admin', current: '', path, alt: rp('en', 'home'), title: 'Admin: certifikatat e garancisë | Apex Frames', desc: 'Paneli i brendshëm për miratimin e certifikatave të garancisë.', body, noindex: true, scripts: ['admin-warranty.js'], graph: [] });
}

/* ---------- 404 ---------- */
writeFileSync(join(DIST, '404.html'), `${head({ lang: 'sq', title: '404 | Apex Frames', desc: sq.notFound.text, path: '/404.html', alt: null, noindex: true })}
<body class="nf">
<main id="main" class="nf-main">
  <a href="/" aria-label="Apex Frames">${inline(markSvg, 'nf-mark')}</a>
  <p class="nf-code">404</p>
  <h1>${sq.notFound.title} <span lang="en">/ ${en.notFound.title}</span></h1>
  <p>${sq.notFound.text}<br><span lang="en">${en.notFound.text}</span></p>
  <p><a class="btn btn-primary" href="/">${sq.notFound.back}</a> <a class="btn btn-outline" href="/en/">${en.notFound.back}</a></p>
</main>
</body>
</html>
`);

/* ---------- skedarë teknikë: sitemap, robots, llms, feeds, headers ---------- */
const w = (rel, data) => { const f = join(DIST, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, data); };

const groups = new Map();
for (const p of pages.filter((x) => !x.noindex)) { if (!groups.has(p.key)) groups.set(p.key, {}); groups.get(p.key)[p.lang] = p; }
w('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.filter((x) => !x.noindex).map((p) => { const g = groups.get(p.key); return `  <url>
    <loc>${abs(p.path)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="sq" href="${abs(g.sq.path)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(g.en.path)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(g.sq.path)}"/>
${[...(p.og ? [p.og] : []), ...p.images].map((im) => `    <image:image><image:loc>${abs(im)}</image:loc></image:image>`).join('\n')}
  </url>`; }).join('\n')}
</urlset>
`);

const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Amazonbot', 'DuckAssistBot', 'MistralAI-User', 'CCBot'];
w('robots.txt', `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Kërkuesit dhe motorët e përgjigjeve me AI mirëpriten / AI search and answer-engine crawlers are welcome
${aiBots.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /admin/\nDisallow: /api/`).join('\n\n')}

Sitemap: ${abs('/sitemap.xml')}
`);

const li = (p) => `- [${p.title.replace(/ \| Apex Frames.*$/, '')}](${abs(p.path)}): ${p.desc}`;
const llmsSection = (lang, label) => {
  const ps = pages.filter((p) => p.lang === lang && !p.noindex);
  const one = (k) => ps.find((p) => p.key === k);
  return `## ${label.products}
${ps.filter((p) => p.key.startsWith('product:')).map(li).join('\n')}

## ${label.company}
${['catalogue', 'about', 'services', 'process', 'partners', 'warranty', 'certificate', 'faq', 'contact'].map((k) => li(one(k))).join('\n')}

## Blog
${ps.filter((p) => p.key.startsWith('post:')).map(li).join('\n')}
`;
};
w('llms.txt', `# Apex Frames

> Apex Frames SHPK (NUIS ${C.nuis}) është kompani në Tiranë, Shqipëri, që furnizon dhe monton dritare, dyer dhe fasada premium PVC dhe alumini me sisteme të certifikuara europiane. / Apex Frames SHPK is a Tirana-based company supplying and installing premium aluminium and uPVC windows, doors and glass facades in Albania.

Faktet kryesore / Key facts:
- Kontakt / Contact: ${C.email}, ${C.phoneDisplay}, ${C.street}, ${C.city}, Albania
- Garanci / Warranty: 5 vjet produkt (sipas prodhuesit), 24 muaj montim / 5 years product (per manufacturer), 24 months installation
- Oferta / Quote: brenda 48 orëve pas vizitës teknike, e vlefshme 30 ditë / within 48 hours of the site visit, valid 30 days
- Çmimet jepen vetëm në ofertë me shkrim / Prices are given only in a written quote
- Gjuhët / Languages: shqip (${abs('/')}), English (${abs('/en/')})
- Vlerat teknike (Uw, Rw) merren vetëm nga deklarata e performancës (DoP) e prodhuesit / Technical values come only from the manufacturer's DoP

# Shqip

${llmsSection('sq', { products: 'Produktet', company: 'Kompania dhe shërbimet' })}
# English

${llmsSection('en', { products: 'Products', company: 'Company and services' })}
## Optional
- [Full text of all pages](${abs('/llms-full.txt')}): përmbajtja e plotë / complete content
- [Sitemap](${abs('/sitemap.xml')})
`);
const mainText = (html) => {
  const m = html.match(/<main[\s\S]*?<\/main>/);
  return (m ? m[0] : html).replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ').replace(/<\/(p|h[1-6]|li|tr|div|section|article|summary|dt|dd|figcaption)>/g, '\n').replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/[ \t]+/g, ' ').replace(/ ?\n ?/g, '\n').replace(/\n{2,}/g, '\n\n').trim();
};
w('llms-full.txt', `# Apex Frames: full content / përmbajtja e plotë\n\n` + pages.filter((p) => !p.noindex).map((p) => `## ${p.title}\nURL: ${abs(p.path)}\n\n${mainText(p.html)}`).join('\n\n---\n\n') + '\n');

const rfc822 = (d) => new Date(d + 'T08:00:00Z').toUTCString();
for (const lang of LANGS) {
  w(lang === 'sq' ? 'feed.xml' : 'en/feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Apex Frames Blog</title>
    <link>${abs(rp(lang, 'blog'))}</link>
    <description>${esc(ui[lang].pages.blog.desc)}</description>
    <language>${lang}</language>
    <lastBuildDate>${rfc822(SITE_DATE)}</lastBuildDate>
    <atom:link href="${abs(lang === 'sq' ? '/feed.xml' : '/en/feed.xml')}" rel="self" type="application/rss+xml"/>
${posts.map((p) => `    <item>
      <title>${esc(p[lang].title)}</title>
      <link>${abs(bp(lang, p))}</link>
      <guid isPermaLink="true">${abs(bp(lang, p))}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <category>${esc(p[lang].category)}</category>
      <description>${esc(p[lang].answer)}</description>
    </item>`).join('\n')}
  </channel>
</rss>
`);
}

w('site.webmanifest', JSON.stringify({ name: 'Apex Frames', short_name: 'Apex Frames', icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }], theme_color: '#2f425e', background_color: '#ffffff', display: 'browser' }, null, 2));
w('_headers', `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000
  Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-${INLINE_HASH}'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/files/*
  Cache-Control: public, max-age=86400

/admin/*
  X-Robots-Tag: noindex, nofollow
  Cache-Control: no-store

/api/*
  X-Robots-Tag: noindex

/llms.txt
  Content-Type: text/plain; charset=utf-8

/llms-full.txt
  Content-Type: text/plain; charset=utf-8
`);
w('_redirects', [
  ['/produktet/shkalle-helikoidale-parapete/', '/produktet/kangjella-inox-alumini-xhami/'],
  ['/en/products/spiral-stairs-balustrades/', '/en/products/stainless-aluminium-glass-railings/'],
  ['/produktet/dritare-dyer-upvc/', '/produktet/dritare-dyer-pvc/'],
  ['/en/products/upvc-windows-doors/', '/en/products/pvc-upvc-windows-doors/'],
  ['/blog/dritare-upvc-apo-alumini/', '/blog/dritare-pvc-apo-alumini/'],
  ['/en/blog/upvc-or-aluminium-windows/', '/en/blog/pvc-upvc-or-aluminium-windows/'],
].map(([from, to]) => `${from}  ${to}  301`).join('\n') + '\n');
w(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);
w('.well-known/security.txt', `Contact: mailto:${C.email}\nExpires: 2027-10-31T00:00:00.000Z\nPreferred-Languages: sq, en\nCanonical: ${abs('/.well-known/security.txt')}\n`);

console.log(`${pages.filter((p) => !p.noindex).length} faqe publike (${pages.filter((p) => !p.noindex).length / 2} për gjuhë) + ${pages.filter((p) => p.noindex).length} private → dist/`);
