# Procedurat e brendshme për të dhënat personale (certifikata e garancisë)

*Dokument i brendshëm i Apex Frames SHPK. Nuk është këshillë ligjore: një avokat shqiptar duhet ta rishikojë para përdorimit. Referenca: Ligji nr. 124/2024 "Për mbrojtjen e të dhënave personale".*

## 1. Çfarë ruajmë dhe pse
| Të dhëna | Detyruese? | Qëllimi | Baza | Afati |
|---|---|---|---|---|
| Emri, mbiemri, emaili, telefoni, produkti, data e blerjes, referenca | **Jo** (të paktën një detaj) | Shqyrtimi i kërkesës dhe lëshimi i certifikatës | Pëlqimi (të dhënat vullnetare); pas miratimit, përmbushja e detyrimit të garancisë | Kërkesat e pamiratuara: 12 muaj (fshirje automatike ditore). Certifikatat: garancia (5 vite) + 12 muaj, pastaj anonimizim automatik |
| Numri AF-…, datat, statusi | Po (pa të dhëna personale) | Kontrolli publik i afatit | Detyrimi i garancisë | Ruhen |
| Hash i IP-së (kufizim abuzimi) | Po | Siguria | Interes legjitim | 2 ditë (pastrim automatik) |

Parimi: **minimizim**. Admini plotëson emrin në certifikatë nga kontrata kur klienti nuk e ka dhënë.

## 2. Kërkesat e subjektit të të dhënave (afati: 30 ditë)
- **Akses / korrigjim:** shikoni të dhënat te `/admin/garancia/` dhe dërgojini klientit një përmbledhje me email; korrigjoni duke rishkruar kërkesën ose lëshuar sërish.
- **Fshirje:** te paneli, "Fshi të dhënat" (certifikatë) ose "Fshi" (kërkesë). Certifikata mbetet e vlefshme me numër, data dhe status, pa të dhëna personale.
- **Tërheqje pëlqimi:** njësoj si fshirja.
- Verifikoni identitetin e kërkuesit (p.sh. kodi i kërkesës ose numri i certifikatës) para se të jepni ose fshini të dhëna.

## 3. Shkelje e të dhënave (data breach)
1. Dokumentoni çdo shkelje dhe masat e marra (kush, çfarë, kur, si u zbulua).
2. Nëse sjell rrezik për personat: njoftoni **Komisionerin (idp.al) brenda 72 orëve**; nëse rreziku është i lartë, njoftoni edhe personat e prekur.
3. Veprime teknike: ndryshoni `ADMIN_PASSWORD` dhe `TOKEN_SECRET` te Netlify (kjo skadon menjëherë të gjitha sesionet e adminit), kontrolloni regjistrat e funksionit.

## 4. Përpunuesit (processors) dhe transferimet
| Ofruesi | Roli | Veprim i nevojshëm |
|---|---|---|
| Netlify, Inc. (SHBA) | Hostim, funksione, ruajtje (Blobs) | Pranoni/nënshkruani Marrëveshjen e Përpunimit të të Dhënave (DPA) në llogarinë tuaj Netlify; ajo përfshin klauzolat standarde kontraktuale |
| Resend (SHBA), **vetëm nëse aktivizohet** | Dërgim emailesh | Njëlloj: DPA; vendosni `RESEND_API_KEY` vetëm pasi ta keni bërë |

Politika e Privatësisë e përmend transferimin jashtë Shqipërisë. Konfirmoni te Netlify (privacy@netlify.com) ku ruhen të dhënat e Blobs dhe a mund të zgjidhet rajoni.

## 5. Regjistri i përpunimit (mbahet gati për Komisionerin)
Ky dokument + tabela në seksionin 1 + lista e përpunuesve në seksionin 4 shërbejnë si regjistër i veprimtarive të përpunimit. Përditësojeni sa herë ndryshon qëllimi, përpunuesi ose afati.

## 6. Siguria e panelit
- `ADMIN_PASSWORD`: të paktën 16 karaktere, unik. Mos e ndani në chat ose email. Ndryshojeni nëse është ndarë.
- Hyrja kufizohet (8 tentativa/15 min për IP), tokeni skadon pas 12 orësh dhe ruhet vetëm në sessionStorage.
- Mos e futni kurrë fjalëkalimin në git (`.env` është i injoruar).

## 7. Çfarë mbetet për rishikim ligjor
- A kërkohet DPA/klauzola shtesë ose njoftim te Komisioneri për transferimin në SHBA sipas tekstit përfundimtar të ligjit (burimet ndryshojnë: KPMG vs CMS).
- Teksti i certifikatës (5 vite) kundrejt garancisë ligjore 2-vjeçare për konsumatorët (Ligji 9902/2008): certifikata tani ka një shënim se garancia tregtare nuk cenon të drejtat ligjore.
- Nëse do të ruani të dhëna të personave nën 16 vjeç ose kategori të veçanta: nuk është qëllimi i këtij sistemi.
