# Apex Frames: faqja e internetit

Faqe statike dygjuhëshe (shqip `/`, anglisht `/en/`), 54 faqe, pa framework, pa cookies, pa kërkesa te palë të treta.

## Struktura
| Skedari | Çfarë përmban |
|---|---|
| `src/content.mjs` | Tekstet e përgjithshme (hero, rreth nesh, shërbime, proces, garanci, FAQ, kontakt, faqet ligjore) |
| `src/ui.mjs` | Rrugët (URL) dhe tekstet e faqeve të reja, titujt/përshkrimet SEO |
| `src/products.mjs` | 9 faqet e produkteve (SQ + EN) |
| `src/blog.mjs` | Artikujt e blogut (SQ + EN) |
| `src/build.mjs` | Gjeneratori: faqet, schema JSON-LD, sitemap, robots, llms.txt, RSS, `_headers` |
| `assets/` | CSS, JS, logo, foto (`assets/img/photos`) |
| `scripts/make_images.py` | Përgatit fotot (pret, heq vijat, WebP + JPG për OG) |
| `scripts/audit.mjs` | Audit SEO (titujt, përshkrimet, H1, alt, linqet, hreflang, JSON-LD) |

## Komandat
```bash
npm run build     # gjeneron dist/
npm run serve     # build + server lokal në http://localhost:8080
node scripts/audit.mjs   # audit SEO pas build
```

## Shtimi i një artikulli
Shtoni një objekt në `src/blog.mjs` (id, slug SQ/EN, foto, tekstet SQ + EN, `answer`, `sections`, `faq`). Faqja, sitemap, RSS, llms.txt, schema dhe lidhjet e brendshme krijohen automatikisht. Rendi në listë = rendi në faqe (më i riu sipas datës lart).

## Fotot
Vendosni foton burimore, shtoni një rresht te `JOBS` në `scripts/make_images.py`, ekzekutoni `npm run images -- <dosja>`, pastaj shtoni `ALT` te `src/build.mjs`. Përdorni foto reale të projekteve tuaja kur t'i keni: ato ndihmojnë shumë në besueshmëri dhe SEO.

## Publikimi (Netlify)
`netlify.toml` e ka vendosur: build `node src/build.mjs`, publish `dist`. Në Netlify: Domain management → përdorni `www.apexframes.co` si domain primar (kanonikali në faqe është `www`).

## Rregulla përmbajtjeje (Doktrina e Punës v2.0)
- Pa çmime në faqe: çmimet jepen vetëm në ofertën me shkrim.
- Vlerat teknike (Uw, Rw, klasat) vetëm nga DoP e prodhuesit; në faqe nuk shkruhen vlera të përafërta.
- Pa emra markash prodhuesish.
- Fotot janë vizualizime ilustruese; shënohen si të tilla.
- Nëse shtoni Google Analytics ose pixel, përditësoni Politikën e Privatësisë dhe shtoni banner cookies.
