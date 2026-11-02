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
| `scripts/audit.mjs` | Audit bazë SEO (titujt, përshkrimet, H1, alt, linqet, JSON-LD) |
| `scripts/audit-deep.mjs` | Audit i thelluar: hreflang reciprok, hierarkia e titujve, thellësia e përmbajtjes, linqet e brendshme, schema |
| `scripts/indexnow.mjs` | Njofton Bing/Yandex për URL-të e reja pas publikimit (IndexNow) |
| `src/content-extra*.mjs` | Përmbajtje shtesë për thellësi SEO/AEO (udhëzues produktesh, seksione e pyetje artikujsh) |

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

## SEO / AEO pas publikimit
1. Google Search Console: shtoni `https://www.apexframes.co/` dhe dërgoni `sitemap.xml`; kërkoni indeksim për faqen kryesore.
2. Bing Webmaster Tools: importoni nga Search Console; pastaj `node scripts/indexnow.mjs`.
3. Google Business Profile për adresën në Tiranë; pastaj shtojeni lidhjen te `sameAs` në `src/build.mjs`.
4. Termat: në shqip përdorni "PVC" (jo "uPVC"); në anglisht "PVC (uPVC)".
5. Pas çdo ndryshimi: `npm run build && node scripts/audit.mjs && node scripts/audit-deep.mjs`.

## Certifikata e garancisë online (5 vite, numri nis nga AF-0005657)
- **Klienti:** `/garancia/certifikata/` (EN: `/en/warranty/certificate/`). Plotëson emrin, mbiemrin, emailin, telefonin; merr një kod kërkese (RQ-…). Me kodin shkarkon PDF-në sapo miratohet; me numrin AF-… kushdo kontrollon afatin (shfaqen vetëm inicialet).
- **Admini:** `/admin/garancia/` (fjalëkalimi nga `ADMIN_PASSWORD`). Aprovon/refuzon kërkesat, lëshon certifikata direkt, revokon/rikthen, hap PDF-në.
- **Numërimi:** i vazhdueshëm dhe pa dublikime (shkrime të kushtëzuara në Netlify Blobs), nis nga AF-0005657.
- **Afati:** 5 vite nga data e blerjes që vendos admini; skadimi llogaritet sipas orës së Tiranës.
- **Të dhënat:** ruhen në Netlify Blobs (dyqani `warranty`). Funksioni: `netlify/functions/warranty.mjs`; logjika: `netlify/lib/`.
- **Variablat e mjedisit:** shih `.env.example` (detyrueshme: `ADMIN_PASSWORD`).
- **Testet:** `npm test` (7 teste të rrjedhës së plotë). Lokalisht: `npm run build && npm run dev:warranty` (ruajtje në memorie, admin: `test`).
- Nëse ndryshoni `netlify/assets/certificate-template.pdf`, ekzekutoni `npm run cert-assets`.
