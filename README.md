# Apex Frames — website

Static bilingual site (Albanian `/`, English `/en/`) for Apex Frames SHPK. No framework, no external requests, no cookies.

## Edit & build
- All text lives in `src/content.mjs` (`sq` and `en` objects). Edit there, never in the generated HTML.
- Layout: `src/build.mjs` · Styles: `assets/css/styles.css` · JS: `assets/js/main.js`
- Build: `npm run build` (writes `index.html`, `en/`, `privatesia/`, `kushtet/`, `en/privacy/`, `en/terms/`, `404.html`, `sitemap.xml`)
- Preview: `npm run serve` → http://localhost:8080

## Deploy
Any static host (GitHub Pages, Netlify, Cloudflare Pages). `CNAME` is set to `www.apexframes.co` for GitHub Pages.

## Content rules (from the Work Doctrine v2.0)
- No prices on the site; prices only in the written quote.
- Technical values (Uw, Rw, classes) only from the manufacturer's DoP.
- No third-party brand names on the site.
