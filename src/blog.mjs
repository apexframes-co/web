// Artikujt e blogut (SQ + EN). Struktura: përgjigje e shkurtër (answer), seksione me H2, FAQ.
// Rregull: pa vlera teknike numerike të shpikura; vlerat e sakta jepen vetëm nga DoP e prodhuesit.

const DATE = '2026-10-31';

export const posts = [
  {
    id: 'upvc-or-aluminium', image: 'family', date: DATE, updated: DATE, products: ['upvc', 'aluminium'],
    slug: { sq: 'dritare-upvc-apo-alumini', en: 'upvc-or-aluminium-windows' },
    sq: {
      title: 'Dritare uPVC apo alumini? Si të zgjidhni të duhurën',
      desc: 'Krahasim praktik mes dritareve uPVC dhe aluminit me thyerje termike: izolim, profile, ngjyra, hapje të mëdha, mirëmbajtje dhe kur ia vlen secila.',
      category: 'Zgjedhja e produktit', readMin: 5,
      answer: 'Zgjidhni uPVC kur doni izolim të mirë me kosto më të ulët për banesa. Zgjidhni alumin me thyerje termike kur ju duhen hapje të mëdha, profile të holla ose objekt komercial. Të dyja, kur janë të certifikuara dhe të montuara mirë, janë zgjidhje afatgjata.',
      sections: [
        { h: 'Krahasimi në një tabelë', html: `<table><thead><tr><th>Kriteri</th><th>uPVC</th><th>Alumin me thyerje termike</th></tr></thead><tbody>
<tr><td>Izolimi termik</td><td>Shumë i mirë; vlera sipas DoP</td><td>Shumë i mirë me thyerje termike; vlera sipas DoP</td></tr>
<tr><td>Profili</td><td>Më i trashë</td><td>Më i hollë, më shumë xham</td></tr>
<tr><td>Hapje të mëdha</td><td>Të mundshme me sisteme ngritje-rrëshqitëse</td><td>Ideal për panoramike dhe rrëshqitëse të mëdha</td></tr>
<tr><td>Ngjyra</td><td>E bardhë, dekor druri, e zezë, antracit</td><td>Gamë e gjerë RAL dhe imitacione druri</td></tr>
<tr><td>Mirëmbajtje</td><td>Minimale</td><td>Minimale</td></tr>
<tr><td>Kosto</td><td>Zakonisht më ekonomik</td><td>Zakonisht më e lartë</td></tr></tbody></table>` },
        { h: 'Kur ta zgjidhni uPVC', html: `<p>uPVC është zgjedhja e zakonshme për apartamente dhe shtëpi: izolim të mirë, mirëmbajtje të thjeshtë dhe çmim të arsyeshëm. Është i përshtatshëm edhe për rinovime, kur qëllimi është të përmirësohet rehatia dhe izolimi.</p>` },
        { h: 'Kur ta zgjidhni aluminin', html: `<p>Alumini kërkohet kur projekti ka hapje të mëdha, dyer rrëshqitëse ose palosëse, ose një pamje minimaliste me profile të holla. Është zgjedhje e zakonshme edhe për biznese, hotele dhe fasada.</p>` },
        { h: 'Çfarë ka më shumë rëndësi se materiali', html: `<p>Dy dritare nga i njëjti material mund të performojnë shumë ndryshe. Kontrolloni:</p><ul><li><strong>Sistemin e profilit</strong> dhe numrin e dhomave ajrore;</li><li><strong>Xhamin</strong>: dopio ose i trefishtë, Low-E, argon;</li><li><strong>Montimin</strong>: izolimi perimetral dhe mbyllja përcaktojnë rezultatin real;</li><li><strong>Dokumentin DoP</strong> të prodhuesit me vlerat e certifikuara.</li></ul>` },
      ],
      faq: [
        { q: 'Cili është më i qëndrueshëm: uPVC apo alumini?', a: 'Të dyja janë afatgjata kur vijnë nga një sistem i certifikuar dhe montohen saktë. Garancia jonë është 5 vjet për produktin dhe 24 muaj për montimin.' },
        { q: 'Cili izolon më mirë?', a: 'Nuk ka përgjigje të vetme: izolimi varet nga sistemi, xhami dhe montimi. Krahasoni vlerën Uw në deklaratën e performancës të secilit sistem.' },
      ],
    },
    en: {
      title: 'uPVC or Aluminium Windows? How to Choose the Right One',
      desc: 'A practical comparison of uPVC and thermally broken aluminium windows: insulation, profiles, colours, large openings, maintenance and when each makes sense.',
      category: 'Choosing products', readMin: 5,
      answer: 'Choose uPVC when you want good insulation at a lower cost for homes. Choose thermally broken aluminium when you need large openings, slim profiles or a commercial building. Both are long-lasting when certified and properly installed.',
      sections: [
        { h: 'Side-by-side comparison', html: `<table><thead><tr><th>Criteria</th><th>uPVC</th><th>Thermally broken aluminium</th></tr></thead><tbody>
<tr><td>Thermal insulation</td><td>Very good; value per DoP</td><td>Very good with thermal break; value per DoP</td></tr>
<tr><td>Profile</td><td>Thicker</td><td>Slimmer, more glass</td></tr>
<tr><td>Large openings</td><td>Possible with lift & slide systems</td><td>Ideal for panoramic and large sliding doors</td></tr>
<tr><td>Colours</td><td>White, woodgrain, black, anthracite</td><td>Wide RAL range and wood finishes</td></tr>
<tr><td>Maintenance</td><td>Minimal</td><td>Minimal</td></tr>
<tr><td>Cost</td><td>Usually more economical</td><td>Usually higher</td></tr></tbody></table>` },
        { h: 'When to choose uPVC', html: `<p>uPVC is the usual choice for apartments and houses: good insulation, simple maintenance and a reasonable price. It also suits renovations aimed at better comfort and insulation.</p>` },
        { h: 'When to choose aluminium', html: `<p>Aluminium is chosen for large openings, sliding or folding doors, or a minimalist look with slim profiles. It is also common in businesses, hotels and facades.</p>` },
        { h: 'What matters more than the material', html: `<p>Two windows of the same material can perform very differently. Check:</p><ul><li><strong>The profile system</strong> and number of air chambers;</li><li><strong>The glass</strong>: double or triple, Low-E, argon;</li><li><strong>Installation</strong>: perimeter insulation and sealing determine real-world results;</li><li><strong>The manufacturer’s DoP</strong> with certified values.</li></ul>` },
      ],
      faq: [
        { q: 'Which is more durable: uPVC or aluminium?', a: 'Both are long-lasting when they come from a certified system and are installed correctly. Our warranty is 5 years on the product and 24 months on installation.' },
        { q: 'Which insulates better?', a: 'There is no single answer: insulation depends on the system, the glass and the installation. Compare the Uw value in each system’s Declaration of Performance.' },
      ],
    },
  },
  {
    id: 'what-affects-window-prices', image: 'sliding', date: DATE, updated: DATE, products: ['upvc', 'aluminium', 'glazing'],
    slug: { sq: 'cfare-ndikon-ne-cmimin-e-dritareve', en: 'what-affects-window-prices' },
    sq: {
      title: 'Çfarë ndikon në çmimin e dritareve dhe dyerve?',
      desc: '8 faktorët që përcaktojnë çmimin e dritareve uPVC dhe alumini, si t’i krahasoni dy oferta drejt dhe çfarë mund të mos përfshihet.',
      category: 'Çmimet dhe oferta', readMin: 5,
      answer: 'Çmimi varet nga sistemi i profilit, madhësia, xhami, lloji i hapjes, ngjyra, aksesorët dhe montimi. Dy oferta krahasohen drejt vetëm kur specifikojnë të njëjtat elemente. Apex Frames nuk jep çmime verbale: çmimi shkruhet vetëm në ofertën e detajuar, pas matjes.',
      sections: [
        { h: '8 faktorët kryesorë', html: `<ol><li><strong>Sistemi i profilit</strong> (uPVC ose alumin, thellësia e ndërtimit, numri i dhomave).</li><li><strong>Përmasat</strong>: sipërfaqja në m² dhe numri i krahëve.</li><li><strong>Xhami</strong>: dopio ose i trefishtë, Low-E, akustik, i laminuar, i kalitur.</li><li><strong>Lloji i hapjes</strong>: fikse, anim-hapje, rrëshqitëse, ngritje-rrëshqitëse.</li><li><strong>Ngjyra</strong>: e bardhë, dekor druri, RAL, ngjyrë e ndryshme brenda e jashtë.</li><li><strong>Aksesorët</strong>: mekanizma, doreza, bravë, grila, rrjeta.</li><li><strong>Montimi</strong> dhe çmontimi i dritareve ekzistuese.</li><li><strong>Transporti</strong> dhe vendndodhja e objektit.</li></ol>` },
        { h: 'Si t’i krahasoni dy oferta', html: `<p>Kërkoni që çdo ofertë të tregojë të njëjtat elemente:</p><ul><li>sistemin e profilit dhe thellësinë;</li><li>përbërjen e xhamit;</li><li>markën dhe llojin e aksesorëve;</li><li>nëse montimi dhe pastrimi janë të përfshira;</li><li>garancinë për produktin dhe për montimin;</li><li>afatin e prodhimit dhe vlefshmërinë e ofertës;</li><li>nëse çmimi është përfundimtar.</li></ul>` },
        { h: 'Çfarë mund të mos përfshihet', html: `<p>Në përgjithësi nuk përfshihen kostot e prishjes strukturore ose të ndërhyrjeve civile jashtë fushës së montimit, materialet e furnizuara nga klienti dhe taksat doganore kur zbatohen. Në Apex Frames këto listohen veçmas në ofertë.</p>` },
        { h: 'Si merrni një ofertë të saktë', html: `<p>Çmimi i saktë del vetëm pas matjes. Procesi: kontakti, vizita teknike dhe matja, oferta e detajuar brenda 48 orëve, e vlefshme 30 ditë. Çmimi në ofertë është përfundimtar, pa kosto të fshehura.</p>` },
      ],
      faq: [
        { q: 'Pse nuk ka çmime në faqe?', a: 'Çmimi varet nga përmasat, sistemi, xhami dhe aksesorët, prandaj e japim vetëm në ofertën me shkrim pas matjes.' },
        { q: 'Sa vlen oferta?', a: 'Oferta vlen 30 ditë nga data e lëshimit.' },
        { q: 'A është çmimi përfundimtar?', a: 'Po. Çmimet në ofertë janë përfundimtare, pa kosto të fshehura. Apex Frames nuk është subjekt TVSH.' },
      ],
    },
    en: {
      title: 'What Affects the Price of Windows and Doors?',
      desc: 'The 8 factors that determine the price of uPVC and aluminium windows, how to compare two quotes fairly and what may not be included.',
      category: 'Pricing and quotes', readMin: 5,
      answer: 'Price depends on the profile system, size, glazing, opening type, colour, hardware and installation. Two quotes compare fairly only when they specify the same elements. Apex Frames gives no verbal prices: the price is written only in the detailed quote, after measurement.',
      sections: [
        { h: 'The 8 main factors', html: `<ol><li><strong>Profile system</strong> (uPVC or aluminium, build depth, number of chambers).</li><li><strong>Dimensions</strong>: area in m² and number of sashes.</li><li><strong>Glazing</strong>: double or triple, Low-E, acoustic, laminated, tempered.</li><li><strong>Opening type</strong>: fixed, tilt & turn, sliding, lift & slide.</li><li><strong>Colour</strong>: white, woodgrain, RAL, different colour inside and out.</li><li><strong>Hardware</strong>: mechanisms, handles, locks, shutters, screens.</li><li><strong>Installation</strong> and removal of existing windows.</li><li><strong>Transport</strong> and site location.</li></ol>` },
        { h: 'How to compare two quotes', html: `<p>Ask each quote to show the same elements:</p><ul><li>profile system and depth;</li><li>glazing composition;</li><li>hardware brand and type;</li><li>whether installation and clean-up are included;</li><li>warranty on the product and on installation;</li><li>production lead time and quote validity;</li><li>whether the price is final.</li></ul>` },
        { h: 'What may not be included', html: `<p>Generally not included are the costs of structural demolition or civil works outside the scope of installation, client-supplied materials, and customs duties where applicable. At Apex Frames these are listed separately in the quote.</p>` },
        { h: 'How to get an accurate quote', html: `<p>An accurate price only comes after measurement. The process: contact, site visit and measurement, a detailed quote within 48 hours, valid for 30 days. The price in the quote is final, with no hidden costs.</p>` },
      ],
      faq: [
        { q: 'Why are there no prices on the website?', a: 'Price depends on dimensions, system, glazing and hardware, so we give it only in a written quote after measurement.' },
        { q: 'How long is a quote valid?', a: 'A quote is valid for 30 days from the date of issue.' },
        { q: 'Is the price final?', a: 'Yes. Prices in the quote are final, with no hidden costs. Apex Frames is not VAT-registered.' },
      ],
    },
  },
  {
    id: 'double-or-triple-glazing', image: 'glazing', date: DATE, updated: DATE, products: ['glazing', 'facades'],
    slug: { sq: 'xham-dopio-apo-i-trefishte', en: 'double-or-triple-glazing' },
    sq: {
      title: 'Xham dopio apo i trefishtë? Argon, Low-E dhe si zgjidhet',
      desc: 'Si përbëhet xhami dopio dhe i trefishtë, çfarë bëjnë argoni dhe shtresa Low-E, kur ia vlen xhami i trefishtë dhe çfarë xhamash të tjerë ekzistojnë.',
      category: 'Xhama', readMin: 4,
      answer: 'Xhami dopio me gaz argon dhe shtresë Low-E mjafton shpesh për banesa. Xhami i trefishtë izolon më mirë, por është më i rëndë dhe më i shtrenjtë, prandaj ka kuptim për ambiente shumë të ftohta ose kur kërkohet izolim maksimal. Vlerën e saktë e jep gjithmonë deklarata e performancës.',
      sections: [
        { h: 'Si përbëhet xhami dopio', html: `<p>Xhami dopio ka dy fletë xhami të ndara nga një hapësirë e mbyllur e mbushur me gaz. Shënimi <strong>4-16-4</strong> do të thotë: xham 4 mm, hapësirë 16 mm, xham 4 mm. Xhami i trefishtë shton një fletë të tretë dhe një hapësirë të dytë (p.sh. 4-16-4-16-4).</p>` },
        { h: 'Çfarë bëjnë argoni dhe Low-E', html: `<ul><li><strong>Gazi argon</strong> në hapësirë ul kalimin e nxehtësisë krahasuar me ajrin.</li><li><strong>Shtresa Low-E</strong> është një veshje shumë e hollë dhe e padukshme që reflekton një pjesë të nxehtësisë, duke ulur humbjet në dimër.</li></ul>` },
        { h: 'Kur ia vlen xhami i trefishtë', html: `<p>Ka kuptim kur kërkohet izolim maksimal, në ambiente shumë të ftohta ose me zhurmë të lartë. Mbani parasysh se është më i rëndë dhe më i trashë, prandaj profili dhe aksesorët duhet të jenë të përshtatshëm.</p>` },
        { h: 'Xhama të tjerë që duhen njohur', html: `<ul><li><strong>I laminuar (triplex):</strong> sigurie, mban copat në rast thyerjeje.</li><li><strong>I kalitur:</strong> më rezistent, për dyer dhe parapete.</li><li><strong>Akustik:</strong> për rrugë me zhurmë.</li><li><strong>Stop-sol:</strong> kontroll diellor për ekspozim jugor.</li></ul>` },
        { h: 'Si lexohet vlera Ug dhe Uw', html: `<p>Ug i referohet vetëm xhamit, ndërsa Uw gjithë dritares (profil + xham). Sa më e ulët vlera, aq më pak nxehtësi humbet. Krahasoni vetëm vlera nga deklarata e performancës.</p>` },
      ],
      faq: [
        { q: 'Çfarë do të thotë 4-16-4?', a: 'Dy fletë xhami 4 mm të ndara nga një hapësirë 16 mm e mbushur me gaz.' },
        { q: 'A është xhami i trefishtë shumë i rëndë?', a: 'Është më i rëndë se dopio, prandaj profili dhe aksesorët duhet të përshtaten me peshën.' },
      ],
    },
    en: {
      title: 'Double or Triple Glazing? Argon, Low-E and How to Choose',
      desc: 'How double and triple glazing are built, what argon and Low-E coatings do, when triple glazing is worth it and which other glass types exist.',
      category: 'Glazing', readMin: 4,
      answer: 'Double glazing with argon gas and a Low-E coating is often enough for homes. Triple glazing insulates better but is heavier and costs more, so it makes sense for very cold rooms or when maximum insulation is required. The exact value always comes from the Declaration of Performance.',
      sections: [
        { h: 'How double glazing is built', html: `<p>Double glazing has two panes separated by a sealed, gas-filled space. The notation <strong>4-16-4</strong> means 4 mm glass, 16 mm gap, 4 mm glass. Triple glazing adds a third pane and a second gap (e.g. 4-16-4-16-4).</p>` },
        { h: 'What argon and Low-E do', html: `<ul><li><strong>Argon gas</strong> in the gap reduces heat transfer compared with air.</li><li><strong>A Low-E coating</strong> is a very thin, invisible layer that reflects part of the heat, reducing winter heat loss.</li></ul>` },
        { h: 'When triple glazing is worth it', html: `<p>It makes sense when maximum insulation is required, in very cold rooms or in high-noise locations. Keep in mind it is heavier and thicker, so the profile and hardware must be suitable.</p>` },
        { h: 'Other glass types to know', html: `<ul><li><strong>Laminated (triplex):</strong> safety glass that holds fragments if broken.</li><li><strong>Tempered:</strong> stronger, for doors and balustrades.</li><li><strong>Acoustic:</strong> for noisy streets.</li><li><strong>Solar control (stop-sol):</strong> for south-facing exposure.</li></ul>` },
        { h: 'How to read Ug and Uw', html: `<p>Ug refers to the glass only, while Uw refers to the whole window (frame + glass). The lower the value, the less heat is lost. Compare only values taken from the Declaration of Performance.</p>` },
      ],
      faq: [
        { q: 'What does 4-16-4 mean?', a: 'Two 4 mm panes separated by a 16 mm gas-filled gap.' },
        { q: 'Is triple glazing very heavy?', a: 'It is heavier than double, so the frame and hardware must suit the weight.' },
      ],
    },
  },
  {
    id: 'window-condensation', image: 'window', date: DATE, updated: DATE, products: ['upvc', 'glazing'],
    slug: { sq: 'kondensimi-ne-dritare', en: 'window-condensation' },
    sq: {
      title: 'Pse djersijnë dritaret? Kondensimi dhe si zgjidhet',
      desc: 'Pse shfaqet kondensimi në dritare, çfarë mund të bëni menjëherë, kur ka lidhje me dritaren dhe çfarë të kërkoni kur i ndërroni.',
      category: 'Këshilla', readMin: 4,
      answer: 'Kondensimi shfaqet kur ajri i ngrohtë dhe i lagësht takon një sipërfaqe të ftohtë. Zakonisht nuk është defekt, por shenjë e lagështisë së lartë ose e ajrimit të pamjaftueshëm. Një dritare më e mirë ul rrezikun, por ajrimi mbetet thelbësor.',
      sections: [
        { h: 'Pse ndodh', html: `<p>Ajri i brendshëm mban avuj uji nga gatimi, larja, thatja e rrobave dhe frymëmarrja. Kur ky ajër takon xhamin ose kornizën e ftohtë, avujt kondensohen në pika. Sa më e ftohtë sipërfaqja dhe sa më e lartë lagështia, aq më shumë kondensim.</p>` },
        { h: 'Çfarë mund të bëni menjëherë', html: `<ul><li>Ajrosni disa minuta, me dritare të hapura gjerësisht, në vend që t’i mbani të hapura pak për orë të tëra.</li><li>Përdorni ventilatorin kur gatuani ose lani.</li><li>Mos e thani rrobën brenda pa ajrim.</li><li>Mbani lagështinë e ambientit në nivele të moderuara; zakonisht rekomandohet rreth 40–60%.</li></ul>` },
        { h: 'Kur ka lidhje me dritaren', html: `<p>Kondensim i vazhdueshëm mund të tregojë dritare të vjetra me izolim të dobët, mbyllje të dëmtuar ose montim pa izolim të mirë perimetral. Dritaret e reja me xham të mirë mbajnë sipërfaqen e brendshme më të ngrohtë, prandaj kondensimi ulet. Një kondensim i lehtë i jashtëm në mëngjese të ftohta e të kthjellëta mund të ndodhë edhe me xham shumë izolues dhe nuk është defekt.</p>` },
        { h: 'Çfarë të kërkoni kur i ndërroni', html: `<ul><li>xham të përshtatshëm (dopio ose i trefishtë, Low-E);</li><li>montim me izolim perimetral me PU dhe mbyllje cilësore me silikon;</li><li>një plan ajrimi për banesën.</li></ul>` },
      ],
      faq: [
        { q: 'A është kondensimi defekt i dritares?', a: 'Në shumicën e rasteve jo: është pasojë e lagështisë dhe e temperaturës. Nëse është i vazhdueshëm, kontrollohen izolimi, mbyllja dhe montimi.' },
        { q: 'A e zgjidhin dritaret e reja kondensimin?', a: 'E ulin rrezikun, por nuk e zëvendësojnë ajrimin e rregullt.' },
      ],
    },
    en: {
      title: 'Why Do Windows Sweat? Condensation and How to Fix It',
      desc: 'Why condensation forms on windows, what you can do right away, when the window is the cause and what to look for when replacing them.',
      category: 'Advice', readMin: 4,
      answer: 'Condensation forms when warm, humid air meets a cold surface. It is usually not a defect but a sign of high humidity or insufficient ventilation. A better window lowers the risk, but ventilation remains essential.',
      sections: [
        { h: 'Why it happens', html: `<p>Indoor air carries water vapour from cooking, washing, drying clothes and breathing. When it meets cold glass or frames, the vapour condenses into droplets. The colder the surface and the higher the humidity, the more condensation.</p>` },
        { h: 'What you can do right away', html: `<ul><li>Ventilate for a few minutes with windows wide open, rather than leaving them slightly open for hours.</li><li>Use the extractor fan when cooking or washing.</li><li>Don’t dry laundry indoors without ventilation.</li><li>Keep indoor humidity moderate; roughly 40–60% is commonly recommended.</li></ul>` },
        { h: 'When the window is the cause', html: `<p>Persistent condensation can indicate old windows with poor insulation, damaged seals or installation without good perimeter insulation. New windows with good glazing keep the inner surface warmer, so condensation drops. Light external condensation on cold, clear mornings can occur even with highly insulating glass and is not a defect.</p>` },
        { h: 'What to look for when replacing', html: `<ul><li>suitable glazing (double or triple, Low-E);</li><li>installation with PU perimeter insulation and quality silicone sealing;</li><li>a ventilation plan for the home.</li></ul>` },
      ],
      faq: [
        { q: 'Is condensation a window defect?', a: 'In most cases no: it results from humidity and temperature. If it is persistent, insulation, sealing and installation should be checked.' },
        { q: 'Do new windows solve condensation?', a: 'They reduce the risk but do not replace regular ventilation.' },
      ],
    },
  },
  {
    id: 'declaration-of-performance-ce-marking', image: 'facade', date: DATE, updated: DATE, products: ['aluminium', 'upvc', 'facades'],
    slug: { sq: 'deklarata-e-performances-dop-shenja-ce', en: 'declaration-of-performance-ce-marking' },
    sq: {
      title: 'Deklarata e performancës (DoP) dhe shenja CE: si t’i lexoni', metaTitle: 'DoP dhe shenja CE: si t’i lexoni | Apex Frames',
      desc: 'Çfarë janë DoP dhe shenja CE për dritaret dhe dyert sipas EN 14351-1, çfarë vlerash përmbajnë dhe pse duhet t’i kërkoni para porosisë.',
      category: 'Standarde dhe dokumente', readMin: 4,
      answer: 'Deklarata e performancës (DoP) është dokumenti i prodhuesit që tregon vlerat e certifikuara të një dritareje ose dere, sipas standardit EN 14351-1 dhe Rregullores (BE) 305/2011. Shenja CE tregon se prodhuesi merr përgjegjësinë për ato vlera. Kërkojini të dyja para se të porosisni.',
      sections: [
        { h: 'Çfarë janë DoP dhe CE', html: `<p>Standardi europian <strong>EN 14351-1</strong> përcakton kërkesat për dritaret dhe dyert e jashtme të këmbësorëve. Prodhuesi nxjerr <strong>deklaratën e performancës</strong> me vlerat e produktit dhe vendos <strong>shenjën CE</strong> sipas Rregullores (BE) nr. 305/2011.</p>` },
        { h: 'Çfarë vlerash përmban', html: `<p>Zakonisht përfshin, ndër të tjera:</p><ul><li><strong>Uw:</strong> transmetimi termik i dritares;</li><li><strong>Rw:</strong> izolimi akustik;</li><li>përshkueshmëria e ajrit;</li><li>papërshkueshmëria ndaj ujit;</li><li>rezistenca ndaj ngarkesës së erës.</li></ul>` },
        { h: 'Si ta përdorni', html: `<ul><li>Krahasoni vetëm vlera nga DoP, jo nga broshura ose premtime verbale.</li><li>Sigurohuni që dokumenti i referohet sistemit dhe konfigurimit që po porosisni.</li><li>Për projekte me arkitekt ose institucione, dokumenti përdoret shpesh për specifikim.</li></ul>` },
        { h: 'Çfarë dokumentesh merrni nga Apex Frames', html: `<p>Në dorëzim merrni DoP dhe shenjën CE të prodhuesit, certifikatën e garancisë dhe udhëzuesin e mirëmbajtjes, së bashku me procesverbalin e dorëzimit.</p>` },
      ],
      faq: [
        { q: 'A jep Apex Frames DoP?', a: 'Po. Produktet vijnë me deklaratën e performancës dhe shenjën CE të prodhuesit, dhe mund t’i kërkoni që në fazën e ofertës.' },
        { q: 'Çfarë është Uw?', a: 'Është koeficienti i transmetimit termik të gjithë dritares. Sa më e ulët vlera, aq më pak nxehtësi humbet.' },
      ],
    },
    en: {
      title: 'Declaration of Performance (DoP) and CE Marking: How to Read Them', metaTitle: 'DoP and CE Marking: How to Read Them | Apex Frames',
      desc: 'What the DoP and CE marking mean for windows and doors under EN 14351-1, which values they contain and why you should request them before ordering.',
      category: 'Standards and documents', readMin: 4,
      answer: 'The Declaration of Performance (DoP) is the manufacturer’s document stating a window’s or door’s certified values, under EN 14351-1 and Regulation (EU) 305/2011. The CE marking shows the manufacturer takes responsibility for those values. Ask for both before ordering.',
      sections: [
        { h: 'What DoP and CE are', html: `<p>The European standard <strong>EN 14351-1</strong> sets requirements for external pedestrian doors and windows. The manufacturer issues a <strong>Declaration of Performance</strong> with the product values and affixes the <strong>CE marking</strong> under Regulation (EU) No 305/2011.</p>` },
        { h: 'What values it contains', html: `<p>It typically includes, among others:</p><ul><li><strong>Uw:</strong> thermal transmittance of the window;</li><li><strong>Rw:</strong> sound insulation;</li><li>air permeability;</li><li>water tightness;</li><li>resistance to wind load.</li></ul>` },
        { h: 'How to use it', html: `<ul><li>Compare only values from the DoP, not from brochures or verbal promises.</li><li>Make sure the document refers to the system and configuration you are ordering.</li><li>For projects with an architect or institutions, the document is often used for specification.</li></ul>` },
        { h: 'Which documents you get from Apex Frames', html: `<p>At handover you receive the manufacturer’s DoP and CE marking, the warranty certificate and the maintenance guide, together with the handover protocol.</p>` },
      ],
      faq: [
        { q: 'Does Apex Frames provide a DoP?', a: 'Yes. Products come with the manufacturer’s Declaration of Performance and CE marking, and you can request them at quote stage.' },
        { q: 'What is Uw?', a: 'The thermal transmittance coefficient of the whole window. The lower the value, the less heat is lost.' },
      ],
    },
  },
  {
    id: 'rope-or-motorised-shutters', image: 'roller', date: DATE, updated: DATE, products: ['shutters', 'upvc', 'aluminium'],
    slug: { sq: 'grila-me-litar-apo-me-motor', en: 'strap-or-motorised-shutters' },
    sq: {
      title: 'Grila me litar apo me motor? Kuti e jashtme apo e brendshme', metaTitle: 'Grila me litar apo me motor? | Apex Frames',
      desc: 'Si të zgjidhni mes grilave me litar dhe me motor, çfarë ndryshon mes kutisë së jashtme dhe asaj të brendshme dhe çfarë të pyesni para porosisë.',
      category: 'Zgjedhja e produktit', readMin: 4,
      answer: 'Grilat me litar janë zgjidhja ekonomike dhe e thjeshtë; grilat me motor dhe telekomandë janë më të rehatshme, sidomos për hapje të mëdha. Kutia e jashtme lejon montim të shpejtë dhe akses të lehtë, ndërsa kutia e brendshme jep pamje më të pastër dhe integrim estetik në fasadë.',
      sections: [
        { h: 'Litar apo motor', html: `<table><thead><tr><th>Kriteri</th><th>Me litar</th><th>Me motor</th></tr></thead><tbody>
<tr><td>Përdorimi</td><td>Manual, me litar</td><td>Me telekomandë</td></tr>
<tr><td>Hapje të mëdha</td><td>Më pak praktike</td><td>Zgjidhje e përshtatshme, me pjesë përforcuese për përmasa të mëdha</td></tr>
<tr><td>Materiali</td><td>PVC ose alumin</td><td>Përshtatet me dritaret uPVC dhe alumini</td></tr>
<tr><td>Montimi</td><td>I shpejtë</td><td>Motori zgjidhet sipas peshës dhe përmasave</td></tr>
<tr><td>Kostoja</td><td>Zgjidhje ekonomike</td><td>Zakonisht më e lartë</td></tr></tbody></table>` },
        { h: 'Kuti e jashtme apo e brendshme', html: `<ul><li><strong>Kutia e jashtme:</strong> ideale për montim të shpejtë dhe akses të lehtë.</li><li><strong>Kutia e brendshme:</strong> pamje më e pastër dhe integrim estetik në fasadë.</li></ul><p>Zgjedhja merret para matjes, sepse kutia ndikon në pamjen e fasadës dhe në hapësirën e disponueshme.</p>` },
        { h: 'Çfarë të pyesni para porosisë', html: `<ul><li>A përshtatet grila me dritaren tuaj (uPVC ose alumin)?</li><li>Cila ngjyrë përputhet me profilin e dritares ose derës?</li><li>Për grilat me motor: cili motor zgjidhet sipas peshës dhe përmasave?</li><li>A merrni udhëzues për përdorimin e telekomandës në dorëzim?</li></ul>` },
      ],
      faq: [
        { q: 'A përshtaten grilat me dritaret ekzistuese?', a: 'Grilat përshtaten me dritaret uPVC dhe alumini; përputhshmërinë e konfirmojmë gjatë vizitës teknike.' },
        { q: 'A merret udhëzues për telekomandën?', a: 'Po, për grilat me motor japim udhëzues përdorimi të telekomandës në dorëzim.' },
      ],
    },
    en: {
      title: 'Strap or Motorised Shutters? Outside or Inside Box', metaTitle: 'Strap or Motorised Shutters? | Apex Frames',
      desc: 'How to choose between strap-operated and motorised shutters, what differs between an outside and an inside box, and what to ask before ordering.',
      category: 'Choosing products', readMin: 4,
      answer: 'Strap-operated shutters are the simple, economical choice; motorised shutters with remote control are more comfortable, especially for large openings. An outside box allows quick installation and easy access, while an inside box gives a cleaner look and better integration into the facade.',
      sections: [
        { h: 'Strap or motor', html: `<table><thead><tr><th>Criteria</th><th>Strap-operated</th><th>Motorised</th></tr></thead><tbody>
<tr><td>Operation</td><td>Manual, with a strap</td><td>With a remote control</td></tr>
<tr><td>Large openings</td><td>Less practical</td><td>Suitable, with reinforcement parts for large sizes</td></tr>
<tr><td>Material</td><td>PVC or aluminium</td><td>Fits uPVC and aluminium windows</td></tr>
<tr><td>Installation</td><td>Quick</td><td>Motor selected by weight and size</td></tr>
<tr><td>Cost</td><td>Economical</td><td>Usually higher</td></tr></tbody></table>` },
        { h: 'Outside or inside box', html: `<ul><li><strong>Outside box:</strong> ideal for quick installation and easy access.</li><li><strong>Inside box:</strong> a cleaner look and better aesthetic integration into the facade.</li></ul><p>The choice is made before measurement, because the box affects the facade’s appearance and the available space.</p>` },
        { h: 'What to ask before ordering', html: `<ul><li>Does the shutter fit your window (uPVC or aluminium)?</li><li>Which colour matches the window or door profile?</li><li>For motorised shutters: which motor is selected for the weight and size?</li><li>Do you receive a user guide for the remote control at handover?</li></ul>` },
      ],
      faq: [
        { q: 'Do shutters fit existing windows?', a: 'Shutters fit uPVC and aluminium windows; we confirm compatibility during the technical visit.' },
        { q: 'Do I get a guide for the remote?', a: 'Yes, for motorised shutters we provide a remote-control user guide at handover.' },
      ],
    },
  },
  {
    id: 'window-installation-8-steps', image: 'aluminium', date: DATE, updated: DATE, products: ['upvc', 'aluminium', 'doors'],
    slug: { sq: 'montimi-i-dritareve-8-hapa', en: 'window-installation-8-steps' },
    sq: {
      title: 'Montimi i dritareve në 8 hapa: çfarë të kërkoni nga montuesi', metaTitle: 'Montimi i dritareve në 8 hapa | Apex Frames',
      desc: 'Procedura standarde e montimit të dritareve dhe dyerve në 8 hapa, nga inspektimi te pastrimi, dhe një listë kontrolli për klientin.',
      category: 'Montimi', readMin: 5,
      answer: 'Një montim i mirë ndjek 8 hapa: inspektim paraprak, çmontim, fiksim i kornizës, izolim perimetral me PU, mbyllje hermetike, rregullim mekanik, kontroll final dhe pastrim. Edhe dritarja më e mirë funksionon keq nëse montohet keq.',
      sections: [
        { h: 'Procedura në 8 hapa', html: `<ol><li><strong>Inspektimi paraprak:</strong> verifikohen kuotat, plani dhe gjendja e strukturës mbajtëse.</li><li><strong>Çmontimi</strong> (nëse aplikohet): heqje e kujdesshme e produktit ekzistues dhe pastrim i hapjes.</li><li><strong>Fiksimi i kornizës</strong> sipas specifikimeve të prodhuesit dhe standardit EN 14351-1.</li><li><strong>Izolimi perimetral</strong> me shkumë poliuretane (PU), brenda dhe jashtë.</li><li><strong>Mbyllja hermetike</strong> me silikon cilësor, neutral ose acetik sipas sipërfaqes.</li><li><strong>Rregullimi mekanik:</strong> kontroll dhe kalibrim i mekanizmave, fjetëzave dhe shinave.</li><li><strong>Kontrolli final:</strong> verifikim vizual, funksional dhe termoizolues i çdo produkti.</li><li><strong>Pastrimi i zonës:</strong> largim i materialeve dhe mbeturinave nga kantieri.</li></ol>` },
        { h: 'Lista e kontrollit për klientin', html: `<ul><li>A janë matjet e marra në objekt dhe a keni miratuar fletën e specifikimit?</li><li>A përfshihen çmontimi dhe pastrimi në ofertë?</li><li>A përdoret izolim perimetral dhe mbyllje në të dyja anët?</li><li>A kontrollohen të gjitha hapjet dhe bravat para dorëzimit?</li><li>A merrni procesverbal dorëzimi dhe certifikatë garancie?</li></ul>` },
        { h: 'Dorëzimi dhe garancia', html: `<p>Pas kontrollit final nënshkruhet procesverbali i dorëzimit nga të dyja palët. Prej kësaj date fillon garancia: 5 vjet për produktin dhe 24 muaj për montimin.</p>` },
      ],
      faq: [
        { q: 'Çfarë ndodh me dritaret ekzistuese?', a: 'Ato çmontohen me kujdes dhe hapja pastrohet para montimit të produktit të ri. Çmontimin mund ta kërkoni si pjesë të ofertës.' },
        { q: 'A montoni produkte të blera gjetkë?', a: 'Po. Ofrojmë edhe shërbim vetëm montimi, çmontimi ose izolimi kur klienti e furnizon vetë produktin.' },
      ],
    },
    en: {
      title: 'Window Installation in 8 Steps: What to Ask Your Installer', metaTitle: 'Window Installation in 8 Steps | Apex Frames',
      desc: 'The standard procedure for installing windows and doors in 8 steps, from inspection to clean-up, plus a client checklist.',
      category: 'Installation', readMin: 5,
      answer: 'A good installation follows 8 steps: preliminary inspection, removal, frame fixing, PU perimeter insulation, airtight sealing, mechanical adjustment, final inspection and clean-up. Even the best window performs poorly if badly installed.',
      sections: [
        { h: 'The 8-step procedure', html: `<ol><li><strong>Preliminary inspection:</strong> dimensions, plans and the condition of the supporting structure are verified.</li><li><strong>Removal</strong> (if applicable): careful removal of the existing product and clean-up of the opening.</li><li><strong>Frame fixing</strong> per the manufacturer’s specifications and EN 14351-1.</li><li><strong>Perimeter insulation</strong> with polyurethane (PU) foam, inside and out.</li><li><strong>Airtight sealing</strong> with quality silicone, neutral or acetic depending on the surface.</li><li><strong>Mechanical adjustment:</strong> checking and calibrating mechanisms, hinges and tracks.</li><li><strong>Final inspection:</strong> visual, functional and thermal check of every unit.</li><li><strong>Site clean-up:</strong> removal of materials and waste from the site.</li></ol>` },
        { h: 'Client checklist', html: `<ul><li>Were measurements taken on site and have you approved the specification sheet?</li><li>Are removal and clean-up included in the quote?</li><li>Is perimeter insulation and sealing used on both sides?</li><li>Are all openings and locks tested before handover?</li><li>Do you receive a handover protocol and warranty certificate?</li></ul>` },
        { h: 'Handover and warranty', html: `<p>After the final inspection, both parties sign the handover protocol. The warranty starts from that date: 5 years on the product and 24 months on installation.</p>` },
      ],
      faq: [
        { q: 'What happens to the existing windows?', a: 'They are carefully removed and the opening is cleaned before the new product is installed. You can request removal as part of the quote.' },
        { q: 'Do you install products bought elsewhere?', a: 'Yes. We also offer installation, removal or sealing as a standalone service when the client supplies the product.' },
      ],
    },
  },
];
