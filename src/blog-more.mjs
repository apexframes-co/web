// Artikuj shtesë (SQ + EN). Të njëjtat rregulla si te blog.mjs: pa çmime, pa vlera teknike të shpikura, pa emra markash.
const DATE = '2026-10-31';

export const morePosts = [
  /* ---------- 1. Dyer rrëshqitëse ---------- */
  {
    id: 'sliding-doors-types', image: 'blackslider', date: DATE, updated: '2026-11-02', products: ['doors', 'aluminium', 'upvc'],
    slug: { sq: 'dyer-rreshqitese-llojet-dhe-si-zgjidhen', en: 'sliding-doors-types-and-how-to-choose' },
    sq: {
      title: 'Dyer rrëshqitëse: ngritje-rrëshqitëse, PSK apo klasike?',
      metaTitle: 'Dyer rrëshqitëse: llojet dhe si zgjidhen | Apex Frames',
      desc: 'Krahasim i dyerve ngritje-rrëshqitëse, rrëshqitëse klasike, paralel-rrëshqitëse me anim (PSK) dhe palosëse: si funksionojnë dhe kur ia vlen secila.',
      category: 'Zgjedhja e produktit', readMin: 5,
      answer: 'Dyert ngritje-rrëshqitëse janë për hapje të mëdha dhe përdorim të rehatshëm; rrëshqitëset klasike janë zgjidhja më e thjeshtë; PSK kombinon ventilimin me anim dhe rrëshqitjen paralele; dyert palosëse (akordeon) hapin gati gjithë gjerësinë. Zgjedhja varet nga përmasat, hapësira anash dhe buxheti.',
      sections: [
        { h: 'Llojet kryesore', html: `<table><thead><tr><th>Lloji</th><th>Si hapet</th><th>Më i përshtatshëm për</th></tr></thead><tbody>
<tr><td>Ngritje-rrëshqitëse (Hebeschiebe)</td><td>Krahu ngrihet pak dhe rrëshqet; kur mbyllet, zbret mbi guarnicionet</td><td>Hapje të mëdha, përdorim i shpeshtë</td></tr>
<tr><td>Rrëshqitëse klasike (Sliding)</td><td>Krahu rrëshqet në shina</td><td>Ballkone dhe hapje të thjeshta</td></tr>
<tr><td>Paralel-rrëshqitëse me anim (PSK)</td><td>Krahu anohet dhe pastaj rrëshqet paralel përpara pjesës fikse</td><td>Kur doni ventilim dhe rrëshqitje në të njëjtën derë</td></tr>
<tr><td>Palosëse (akordeon), alumin</td><td>Krahët palosen mbi njëri-tjetrin</td><td>Hapje shumë të gjera, lidhje brenda-jashtë</td></tr></tbody></table>` },
        { h: 'Si të zgjidhni', html: `<ul><li><strong>Gjerësia e hapjes:</strong> hapjet shumë të gjera kërkojnë zakonisht sisteme ngritje-rrëshqitëse, panoramike ose palosëse nga alumini.</li><li><strong>Hapësira anash:</strong> krahët që rrëshqasin kanë nevojë për vend ku të ndalojnë.</li><li><strong>Profili dhe ngjyra:</strong> PVC ose alumin; shih <a href="/blog/ngjyrat-e-dritareve-dhe-dyerve/">si zgjidhet ngjyra</a>.</li><li><strong>Xhami:</strong> dopio ose i trefishtë, i kalitur ose i laminuar për siguri.</li><li><strong>Rrjeta kundër insekteve:</strong> ofrohen modele rrëshqitëse dhe me palosje (plissé) për dyer.</li></ul>` },
        { h: 'Çfarë kontrollohet në vizitën teknike', html: `<p>Ekipi teknik verifikon kuotat, planin dhe gjendjen e strukturës mbajtëse, pastaj përgatit fletën e specifikimit që e miratoni para prodhimit. Për dyer të mëdha, këto matje përcaktojnë se cili sistem është i zbatueshëm.</p>` },
      ],
      faq: [
        { q: 'Cila derë rrëshqitëse është më e mirë për ballkon?', a: 'Për ballkone zgjidhet zakonisht rrëshqitësja klasike ose ngritje-rrëshqitësja, sipas gjerësisë së hapjes dhe buxhetit. Mund ta vlerësojmë gjatë vizitës teknike.' },
        { q: 'A mund të vendos rrjetë kundër insekteve në derën rrëshqitëse?', a: 'Po. Ofrojmë rrjeta rrëshqitëse horizontale dhe rrjeta me palosje (plissé) për dyer dhe dritare.' },
      ],
    },
    en: {
      title: 'Sliding Doors: Lift & Slide, PSK or Standard?',
      metaTitle: 'Sliding Doors: Types and How to Choose | Apex Frames',
      desc: 'A comparison of lift & slide, standard sliding, parallel-slide-tilt (PSK) and folding doors: how they work and when each makes sense.',
      category: 'Choosing products', readMin: 5,
      answer: 'Lift & slide doors suit large openings and comfortable daily use; standard sliding doors are the simplest solution; PSK combines tilt ventilation with parallel sliding; folding (bi-fold) doors open almost the full width. The choice depends on size, space at the side and budget.',
      sections: [
        { h: 'The main types', html: `<table><thead><tr><th>Type</th><th>How it opens</th><th>Best for</th></tr></thead><tbody>
<tr><td>Lift & slide (Hebeschiebe)</td><td>The leaf lifts slightly and slides; when closed it lowers onto the seals</td><td>Large openings, frequent use</td></tr>
<tr><td>Standard sliding</td><td>The leaf slides on tracks</td><td>Balconies and simple openings</td></tr>
<tr><td>Parallel-slide-tilt (PSK)</td><td>The leaf tilts, then slides parallel in front of the fixed part</td><td>When you want ventilation and sliding in one door</td></tr>
<tr><td>Folding (bi-fold), aluminium</td><td>Leaves fold over one another</td><td>Very wide openings, indoor-outdoor connection</td></tr></tbody></table>` },
        { h: 'How to choose', html: `<ul><li><strong>Opening width:</strong> very wide openings usually call for lift & slide, panoramic or aluminium folding systems.</li><li><strong>Space to the side:</strong> sliding leaves need somewhere to stop.</li><li><strong>Profile and colour:</strong> uPVC or aluminium; see <a href="/en/blog/window-and-door-colours/">how to choose the colour</a>.</li><li><strong>Glass:</strong> double or triple, tempered or laminated for safety.</li><li><strong>Insect screens:</strong> sliding and pleated (plissé) models are available for doors.</li></ul>` },
        { h: 'What is checked at the technical visit', html: `<p>Our technical team verifies dimensions, plans and the condition of the supporting structure, then prepares the specification sheet, which you approve before production. For large doors, these measurements determine which system is feasible.</p>` },
      ],
      faq: [
        { q: 'Which sliding door is best for a balcony?', a: 'Balconies usually get a standard sliding or lift & slide door, depending on opening width and budget. We can assess it during the technical visit.' },
        { q: 'Can I add an insect screen to a sliding door?', a: 'Yes. We offer horizontal sliding screens and pleated (plissé) screens for doors and windows.' },
      ],
    },
  },

  /* ---------- 2. Dera hyrëse ---------- */
  {
    id: 'how-to-choose-entrance-door', image: 'door', date: DATE, updated: '2026-11-02', products: ['doors', 'upvc', 'aluminium'],
    slug: { sq: 'si-zgjidhet-dera-hyrese', en: 'how-to-choose-an-entrance-door' },
    sq: {
      title: 'Si të zgjidhni derën hyrëse: PVC, alumin, me panel apo automatike',
      metaTitle: 'Si të zgjidhni derën hyrëse | Apex Frames',
      desc: 'Çfarë të kontrolloni kur zgjidhni derën hyrëse: materiali, paneli apo xhami, hapja e majtë ose e djathtë, xhami i sigurisë, brava dhe dyert automatike.',
      category: 'Zgjedhja e produktit', readMin: 4,
      answer: 'Zgjidhni derën hyrëse sipas përdorimit: PVC ose alumin për banesa dhe biznese, me panel të plotë kur doni privatësi dhe me xham sigurie kur doni dritë. Për hyrje biznesesh me trafik, dera automatike me sensor është më praktike. Përcaktoni hapjen e majtë ose të djathtë nga jashtë para porosisë.',
      sections: [
        { h: 'Pesë vendime para porosisë', html: `<ol><li><strong>Materiali:</strong> PVC ose alumin; alumini përdoret për ngarkesë të lartë dhe trafik intensiv.</li><li><strong>Paneli apo xhami:</strong> dyer me panel PVC (p.sh. antracit), me përmasa sipas porosisë, ose me pjesë xhami; shfletoni <a href="/katalogu/">katalogun me modele</a>.</li><li><strong>Xhami i sigurisë:</strong> i laminuar (triplex) ose i kalitur; shih <a href="/blog/xham-i-laminuar-apo-i-kalitur/">dallimin mes tyre</a>.</li><li><strong>Hapja:</strong> e majtë ose e djathtë, e përcaktuar nga jashtë; çdo krah i një dere dykrahëshe mund të ketë hapje të ndryshme.</li><li><strong>Brava, doreza dhe aksesorë</strong> sipas objektit.</li></ol>` },
        { h: 'Dyer automatike për biznese', html: `<p>Për hyrje dyqanesh, klinikash dhe objektesh publike ofrojmë dyer automatike me fotoelement (sensor) dhe sistem automatizimi profesional. Dera hapet vetë kur afrohet personi dhe nuk kërkon prekje.</p>` },
        { h: 'Çfarë të kërkoni nga furnizuesi', html: `<ul><li>deklaratën e performancës (DoP) dhe shenjën CE të prodhuesit;</li><li>fletën e specifikimit me hapjen e konfirmuar para prodhimit;</li><li>garancinë: 5 vjet për produktin dhe 24 muaj për montimin;</li><li>procesverbalin e dorëzimit pas montimit.</li></ul>` },
      ],
      faq: [
        { q: 'Si përcaktohet hapja e majtë ose e djathtë?', a: 'Përcaktohet duke parë derën nga jashtë, dhe e konfirmojmë në fletën e specifikimit para prodhimit.' },
        { q: 'A mund të ketë dera një panel anësor me xham?', a: 'Po, konfigurimet me panel anësor me xham dhe krah me panel prodhohen sipas porosisë dhe përcaktohen në specifikim.' },
      ],
    },
    en: {
      title: 'How to Choose an Entrance Door: uPVC, Aluminium, Panel or Automatic',
      metaTitle: 'How to Choose an Entrance Door | Apex Frames',
      desc: 'What to check when choosing an entrance door: material, panel or glass, left or right opening, safety glass, locks and automatic doors.',
      category: 'Choosing products', readMin: 4,
      answer: 'Choose an entrance door by use: uPVC or aluminium for homes and businesses, a solid panel for privacy and safety glass for light. For busy business entrances, an automatic sensor door is more practical. Define left or right opening from the outside before ordering.',
      sections: [
        { h: 'Five decisions before ordering', html: `<ol><li><strong>Material:</strong> uPVC or aluminium; aluminium is used for heavy loads and high traffic.</li><li><strong>Panel or glass:</strong> PVC panel doors (e.g. anthracite), made to size, or with glazed parts; browse the <a href="/en/catalogue/">catalogue of models</a>.</li><li><strong>Safety glass:</strong> laminated (triplex) or tempered; see <a href="/en/blog/laminated-or-tempered-glass/">the difference between them</a>.</li><li><strong>Opening:</strong> left or right, defined from outside; each leaf of a double door can open differently.</li><li><strong>Locks, handles and hardware</strong> to suit the building.</li></ol>` },
        { h: 'Automatic doors for businesses', html: `<p>For shop, clinic and public-building entrances we offer automatic doors with a sensor (photocell) and a professional automation system. The door opens by itself as a person approaches, with no touch needed.</p>` },
        { h: 'What to ask your supplier', html: `<ul><li>the manufacturer’s Declaration of Performance (DoP) and CE marking;</li><li>the specification sheet with the opening confirmed before production;</li><li>the warranty: 5 years on the product and 24 months on installation;</li><li>the handover protocol after installation.</li></ul>` },
      ],
      faq: [
        { q: 'How is left or right opening defined?', a: 'It is defined by looking at the door from outside, and we confirm it on the specification sheet before manufacture.' },
        { q: 'Can the door have a glass side panel?', a: 'Yes, configurations with a glass side panel and a panel leaf are made to order and defined in the specification.' },
      ],
    },
  },

  /* ---------- 3. Thyerja termike ---------- */
  {
    id: 'what-is-a-thermal-break', image: 'profile', date: DATE, updated: '2026-11-02', products: ['aluminium', 'facades'],
    slug: { sq: 'cfare-eshte-thyerja-termike', en: 'what-is-a-thermal-break' },
    sq: {
      title: 'Çfarë është thyerja termike në profilet e aluminit?',
      metaTitle: 'Çfarë është thyerja termike në alumin? | Apex Frames',
      desc: 'Thyerja termike është ndarja izoluese brenda profilit të aluminit. Si funksionon, pse ka rëndësi dhe kur mjafton alumini pa thyerje termike.',
      category: 'Standarde dhe dokumente', readMin: 4,
      answer: 'Thyerja termike është një ndarje izoluese brenda profilit të aluminit që ndërpret kalimin e nxehtësisë nga brenda jashtë dhe anasjelltas. Alumini përçon mirë nxehtësinë, prandaj profilet pa këtë ndarje humbasin energji shpejt. Vlerën e saktë të izolimit e jep gjithmonë Uw në deklaratën e performancës.',
      sections: [
        { h: 'Si funksionon', html: `<p>Profili ndahet në dy pjesë alumini, një të brendshme dhe një të jashtme, të lidhura mes tyre nga një element izolues me përçueshmëri të ulët. Kjo ndërprerje e ndalon nxehtësinë të kalojë drejtpërdrejt nëpër metal, pra e ul <strong>urën termike</strong> në kornizë.</p>` },
        { h: 'Pse ka rëndësi', html: `<ul><li><strong>Izolim më i mirë</strong> krahasuar me aluminin e thjeshtë.</li><li><strong>Rrezik më i ulët kondensimi</strong> në kornizë: shih <a href="/blog/kondensimi-ne-dritare/">pse djersijnë dritaret</a>.</li><li><strong>Rehati më e madhe</strong>, sepse korniza e brendshme nuk bëhet aq e ftohtë ose aq e nxehtë.</li></ul>` },
        { h: 'Kur mjafton alumini pa thyerje termike', html: `<p>Alumini i thjeshtë (pa thyerje termike) përdoret për pjesë fikse dhe ndarje, përfshirë xhamin dopio me pasqyrë. Për dritare, dyer ballkoni dhe dyer hyrëse që ndajnë ambientin e ngrohur nga jashtë, zgjidhet alumini me thyerje termike.</p>` },
        { h: 'Si ta verifikoni', html: `<ul><li>kërkoni vlerën <strong>Uw</strong> në deklaratën e performancës të sistemit;</li><li>krahasoni sistemin dhe xhamin që po ofrohen, jo vetëm profilin;</li><li>kërkoni montim me izolim perimetral: shih <a href="/blog/montimi-i-dritareve-8-hapa/">montimin në 8 hapa</a>.</li></ul>` },
      ],
      faq: [
        { q: 'A është alumini me thyerje termike i përshtatshëm për dimër?', a: 'Po, kur sistemi dhe xhami zgjidhen drejt dhe montimi është i mirë. Vlerat konkrete jepen në deklaratën e performancës.' },
        { q: 'Çfarë ndryshon nga PVC?', a: 'Të dyja mund të izolojnë mirë; alumini lejon profile më të holla dhe hapje më të mëdha. Lexoni krahasimin tonë të detajuar PVC kundrejt aluminit.' },
      ],
    },
    en: {
      title: 'What Is a Thermal Break in Aluminium Profiles?',
      metaTitle: 'What Is a Thermal Break in Aluminium? | Apex Frames',
      desc: 'A thermal break is the insulating separator inside an aluminium profile. How it works, why it matters and when plain aluminium is enough.',
      category: 'Standards and documents', readMin: 4,
      answer: 'A thermal break is an insulating separator inside the aluminium profile that interrupts heat flow from inside to outside and vice versa. Aluminium conducts heat well, so profiles without this separator lose energy quickly. The exact insulation value always comes from Uw in the Declaration of Performance.',
      sections: [
        { h: 'How it works', html: `<p>The profile is split into two aluminium parts, an inner and an outer one, joined by an insulating element with low conductivity. This break stops heat from passing straight through the metal, reducing the <strong>thermal bridge</strong> in the frame.</p>` },
        { h: 'Why it matters', html: `<ul><li><strong>Better insulation</strong> than plain aluminium.</li><li><strong>Lower condensation risk</strong> on the frame: see <a href="/en/blog/window-condensation/">why windows sweat</a>.</li><li><strong>More comfort</strong>, because the inner frame doesn’t get as cold or as hot.</li></ul>` },
        { h: 'When plain aluminium is enough', html: `<p>Plain aluminium (without a thermal break) is used for fixed panels and partitions, including mirrored double glazing. For windows, balcony doors and entrance doors that separate the heated space from the outside, thermally broken aluminium is chosen.</p>` },
        { h: 'How to verify', html: `<ul><li>ask for the <strong>Uw</strong> value in the system’s Declaration of Performance;</li><li>compare the system and glass being offered, not just the profile;</li><li>ask for installation with perimeter insulation: see <a href="/en/blog/window-installation-8-steps/">installation in 8 steps</a>.</li></ul>` },
      ],
      faq: [
        { q: 'Is thermally broken aluminium suitable for winter?', a: 'Yes, when the system and glass are chosen well and installation is good. Concrete values are given in the Declaration of Performance.' },
        { q: 'How does it differ from uPVC?', a: 'Both can insulate well; aluminium allows slimmer profiles and larger openings. Read our detailed uPVC vs aluminium comparison.' },
      ],
    },
  },

  /* ---------- 4. Laminuar vs kalitur ---------- */
  {
    id: 'laminated-or-tempered-glass', image: 'glassdoors', date: DATE, updated: '2026-11-02', products: ['glazing', 'doors', 'railings'],
    slug: { sq: 'xham-i-laminuar-apo-i-kalitur', en: 'laminated-or-tempered-glass' },
    sq: {
      title: 'Xham i laminuar apo i kalitur? Cili është më i sigurt',
      metaTitle: 'Xham i laminuar apo i kalitur | Apex Frames',
      desc: 'Dallimi mes xhamit të laminuar (triplex) dhe të kalitur, ku përdoret secili në dyer, parapete dhe dritare dhe pse përmasat duhen të sakta para porosisë.',
      category: 'Xhama', readMin: 4,
      answer: 'Xhami i laminuar (triplex) ka një shtresë ndërmjet fletëve dhe i mban copat bashkë nëse thyhet. Xhami i kalitur është më rezistent ndaj goditjes dhe, kur thyhet, bëhet copa të vogla. Për dyer dhe parapete zgjidhet njëri sipas rrezikut, dhe shpesh edhe të dy të kombinuara kur kërkohet siguri e shtuar.',
      sections: [
        { h: 'Krahasimi', html: `<table><thead><tr><th>Kriteri</th><th>Laminuar (triplex)</th><th>Kalitur</th></tr></thead><tbody>
<tr><td>Si është bërë</td><td>Dy ose më shumë fletë të ngjitura me një shtresë ndërmjet</td><td>Xham i trajtuar termikisht pas prerjes</td></tr>
<tr><td>Kur thyhet</td><td>Copat mbeten të ngjitura te shtresa</td><td>Bëhet copa të vogla</td></tr>
<tr><td>Pika e fortë</td><td>Mbetet në vend edhe pas thyerjes</td><td>Rezistencë më e lartë ndaj goditjes</td></tr>
<tr><td>Përdorimi tipik</td><td>Dyer, dritare, parapete, fasada</td><td>Dyer dhe parapete</td></tr></tbody></table>` },
        { h: 'Çfarë duhet ditur para porosisë', html: `<ul><li><strong>Xhami i kalitur nuk pritet pas kalitjes.</strong> Prandaj përmasat duhet të jenë të sakta para prodhimit: një arsye më shumë për matje në objekt dhe për fletën e specifikimit të miratuar.</li><li>Për <strong>dyer, parapete dhe ballkone</strong> pyesni projektuesin ose arkitektin cili lloj kërkohet nga projekti.</li><li>Kombinimet me xham akustik, Low-E ose stop-sol varen nga sistemi: shih <a href="/blog/xham-dopio-apo-i-trefishte/">xham dopio apo i trefishtë</a>.</li></ul>` },
        { h: 'Ku përdoret te Apex Frames', html: `<p>Xhama të laminuar dhe të kalitur përdoren te dyert hyrëse, dyert rrëshqitëse, fasadat dhe parapetet me xham sigurie. Kangjellat dhe parapetet prodhohen sipas matjeve në terren dhe projektit arkitektonik: shih <a href="/produktet/kangjella-inox-alumini-xhami/">kangjellat inox, alumini dhe xhami</a>.</p>` },
      ],
      faq: [
        { q: 'Si dallohet xhami i kalitur nga ai i zakonshëm?', a: 'Zakonisht ka një shenjë të gdhendur në cep nga prodhuesi. Kërkojeni te dokumentacioni i porosisë.' },
        { q: 'A mund të pritet xhami i kalitur në objekt?', a: 'Jo. Pas kalitjes xhami nuk pritet, prandaj matjet duhet të jenë të sakta para porosisë.' },
      ],
    },
    en: {
      title: 'Laminated or Tempered Glass? Which Is Safer',
      metaTitle: 'Laminated or Tempered Glass | Apex Frames',
      desc: 'The difference between laminated (triplex) and tempered glass, where each is used in doors, balustrades and windows and why dimensions must be exact before ordering.',
      category: 'Glazing', readMin: 4,
      answer: 'Laminated (triplex) glass has an interlayer between panes and holds fragments together if broken. Tempered glass is more impact-resistant and, when it breaks, turns into small pieces. For doors and balustrades one is chosen according to risk, and often both are combined when extra safety is required.',
      sections: [
        { h: 'Comparison', html: `<table><thead><tr><th>Criteria</th><th>Laminated (triplex)</th><th>Tempered</th></tr></thead><tbody>
<tr><td>How it’s made</td><td>Two or more panes bonded with an interlayer</td><td>Glass heat-treated after cutting</td></tr>
<tr><td>When it breaks</td><td>Fragments stay bonded to the interlayer</td><td>Breaks into small pieces</td></tr>
<tr><td>Strength</td><td>Stays in place even after breaking</td><td>Higher impact resistance</td></tr>
<tr><td>Typical use</td><td>Doors, windows, balustrades, facades</td><td>Doors and balustrades</td></tr></tbody></table>` },
        { h: 'What to know before ordering', html: `<ul><li><strong>Tempered glass cannot be cut after tempering.</strong> Dimensions must be exact before production: one more reason for on-site measurement and an approved specification sheet.</li><li>For <strong>doors, balustrades and balconies</strong> ask your designer or architect which type the project requires.</li><li>Combinations with acoustic, Low-E or solar-control glass depend on the system: see <a href="/en/blog/double-or-triple-glazing/">double or triple glazing</a>.</li></ul>` },
        { h: 'Where it is used at Apex Frames', html: `<p>Laminated and tempered glass is used in entrance doors, sliding doors, facades and safety-glass balustrades. Railings and balustrades are made to on-site measurements and the architectural design: see <a href="/en/products/stainless-aluminium-glass-railings/">stainless, aluminium and glass railings</a>.</p>` },
      ],
      faq: [
        { q: 'How can I tell tempered glass from ordinary glass?', a: 'It usually carries an etched mark in a corner from the manufacturer. Look for it in the order documentation.' },
        { q: 'Can tempered glass be cut on site?', a: 'No. After tempering, glass cannot be cut, so measurements must be accurate before ordering.' },
      ],
    },
  },

  /* ---------- 5. Tenda dhe pergola ---------- */
  {
    id: 'cassette-or-classic-awnings', image: 'awning', date: DATE, updated: '2026-11-02', products: ['awnings', 'shutters'],
    slug: { sq: 'tende-dielli-me-kasete-apo-klasike', en: 'cassette-or-classic-awnings' },
    sq: {
      title: 'Tendë dielli me kasetë apo klasike? Si të zgjidhni për tarracën',
      metaTitle: 'Tendë dielli me kasetë apo klasike për tarracën | Apex Frames',
      desc: 'Tenda me kasetë apo klasike, manuale apo me motor, dhe kur ia vlen një pergola alumini. Çfarë të vlerësoni për ballkonin ose tarracën tuaj.',
      category: 'Zgjedhja e produktit', readMin: 4,
      answer: 'Tenda me kasetë e mbron pëlhurën kur mblidhet dhe ka pamje më të pastër; modelet klasike janë më të thjeshta. Motori jep rehati, ndërsa mekanizmi manual është më ekonomik. Për ambiente më të mëdha, një pergola alumini me ose pa tendë është alternativa.',
      sections: [
        { h: 'Kasetë apo klasike', html: `<table><thead><tr><th>Kriteri</th><th>Me kasetë</th><th>Klasike</th></tr></thead><tbody>
<tr><td>Mbrojtja e pëlhurës</td><td>Kaseta e mbyll pëlhurën kur mblidhet</td><td>Pëlhura mbetet më e ekspozuar</td></tr>
<tr><td>Pamja</td><td>Më e pastër</td><td>Më e thjeshtë</td></tr>
<tr><td>Zgjedhja</td><td>Ekspozim i fortë, përdorim i shpeshtë</td><td>Zgjidhje më e thjeshtë</td></tr></tbody></table>` },
        { h: 'Manuale apo me motor', html: `<p>Tendat ofrohen <strong>manuale</strong> ose <strong>me motor</strong>. Motori e bën hapjen dhe mbylljen të rehatshme, sidomos për hapje të mëdha; manuali është zgjidhje më ekonomike. Pëlhura është material i certifikuar kundër rrezeve UV, me strukturë alumini rezistente.</p>` },
        { h: 'Çfarë të vlerësoni në vizitën teknike', html: `<ul><li>orientimin e tarracës dhe sa diell merr;</li><li>muri ose struktura ku fiksohet tenda dhe hapësira që mbulon;</li><li>era: mblidheni tendën kur ka erë të fortë;</li><li>ngjyrën e pëlhurës dhe harmonizimin me fasadën dhe me grilat.</li></ul>` },
        { h: 'Kur ia vlen një pergola', html: `<p>Pergolat prej alumini, me ose pa tendë, prodhohen sipas projektit dhe janë zgjidhje për tarraca të mëdha, restorante dhe kafene. Shih edhe <a href="/blog/grila-me-litar-apo-me-motor/">grilat me litar dhe me motor</a> për hijezimin e dritareve.</p>` },
      ],
      faq: [
        { q: 'A është pëlhura rezistente ndaj rrezeve të diellit?', a: 'Po, përdorim material të certifikuar kundër rrezeve UV.' },
        { q: 'A mund të vendos pergola pa tendë?', a: 'Po, pergolat prej alumini ofrohen me ose pa tendë, sipas projektit.' },
      ],
    },
    en: {
      title: 'Cassette or Classic Awning? How to Choose for Your Terrace',
      metaTitle: 'Cassette or Classic Awning | Apex Frames',
      desc: 'Cassette or classic awnings, manual or motorised, and when an aluminium pergola makes sense. What to assess for your balcony or terrace.',
      category: 'Choosing products', readMin: 4,
      answer: 'A cassette awning protects the fabric when retracted and looks cleaner; classic models are simpler. A motor adds comfort, while a manual mechanism is more economical. For larger spaces, an aluminium pergola with or without a canopy is the alternative.',
      sections: [
        { h: 'Cassette or classic', html: `<table><thead><tr><th>Criteria</th><th>Cassette</th><th>Classic</th></tr></thead><tbody>
<tr><td>Fabric protection</td><td>The cassette encloses the fabric when retracted</td><td>The fabric stays more exposed</td></tr>
<tr><td>Look</td><td>Cleaner</td><td>Simpler</td></tr>
<tr><td>Best for</td><td>Strong exposure, frequent use</td><td>A simpler solution</td></tr></tbody></table>` },
        { h: 'Manual or motorised', html: `<p>Awnings are offered <strong>manual</strong> or <strong>motorised</strong>. A motor makes opening and closing comfortable, especially for large spans; manual is the more economical choice. The fabric is UV-certified material on a strong aluminium structure.</p>` },
        { h: 'What to assess at the technical visit', html: `<ul><li>the terrace orientation and how much sun it gets;</li><li>the wall or structure the awning attaches to and the area it covers;</li><li>wind: retract the awning in strong wind;</li><li>the fabric colour and how it matches the facade and shutters.</li></ul>` },
        { h: 'When a pergola makes sense', html: `<p>Aluminium pergolas, with or without a canopy, are made to project and suit large terraces, restaurants and cafés. See also <a href="/en/blog/strap-or-motorised-shutters/">strap and motorised shutters</a> for shading windows.</p>` },
      ],
      faq: [
        { q: 'Is the fabric sun-resistant?', a: 'Yes, we use UV-certified material.' },
        { q: 'Can I get a pergola without a canopy?', a: 'Yes, aluminium pergolas are offered with or without a canopy, to project.' },
      ],
    },
  },

  /* ---------- 6. Ngjyrat ---------- */
  {
    id: 'window-and-door-colours', image: 'shutters', date: DATE, updated: '2026-11-02', products: ['upvc', 'aluminium', 'shutters'],
    slug: { sq: 'ngjyrat-e-dritareve-dhe-dyerve', en: 'window-and-door-colours' },
    sq: {
      title: 'Cilën ngjyrë të zgjidhni për dritaret: e bardhë, antracit apo dekor druri?',
      metaTitle: 'Ngjyrat e dritareve: e bardhë, antracit apo dekor druri? | Apex Frames',
      desc: 'Ngjyrat e disponueshme për dritaret PVC dhe aluminin, ngjyra e ndryshme brenda e jashtë, RAL dhe imitacione druri, dhe si ta harmonizoni me fasadën.',
      category: 'Zgjedhja e produktit', readMin: 4,
      answer: 'Për PVC ofrohen e bardha, dekor druri, e zeza (Jet Black) dhe antracit, edhe me ngjyrë të ndryshme brenda e jashtë. Për aluminin ka gamë të gjerë RAL dhe imitacione druri. Zgjidhni sipas fasadës, grilave dhe pamjes së brendshme, dhe kërkoni mostra para porosisë.',
      sections: [
        { h: 'Ngjyrat sipas materialit', html: `<table><thead><tr><th>Produkti</th><th>Ngjyrat</th></tr></thead><tbody>
<tr><td>Dritare dhe dyer PVC</td><td>E bardhë, dekor druri, e zezë (Jet Black), antracit; ngjyrë e ndryshme brenda dhe jashtë</td></tr>
<tr><td>Dritare dhe dyer alumini</td><td>Gamë e gjerë RAL dhe imitacione druri</td></tr>
<tr><td>Dyer me panel PVC</td><td>P.sh. antracit, me përmasa sipas porosisë</td></tr>
<tr><td>Grila persiane alumini</td><td>Ngjyra standarde dhe speciale RAL</td></tr></tbody></table>` },
        { h: 'Si ta harmonizoni me fasadën', html: `<ul><li><strong>E bardha:</strong> zgjedhje klasike që përshtatet me shumicën e fasadave.</li><li><strong>Antracit dhe e zezë:</strong> pamje moderne dhe kontrast i fortë me muret e çelëta.</li><li><strong>Dekor druri:</strong> ngrohtësi, sidomos në shtëpi me gjelbërim.</li><li><strong>Brenda e jashtë:</strong> mund të zgjidhni ngjyrë të ndryshme, p.sh. antracit jashtë dhe e bardhë brenda.</li><li><strong>Aksesorët:</strong> grilat, rrjetat dhe tendat zgjidhen në ngjyrën që përputhet me profilin; shih <a href="/blog/tende-dielli-me-kasete-apo-klasike/">tendat</a> dhe <a href="/blog/grila-me-litar-apo-me-motor/">grilat</a>.</li></ul>` },
        { h: 'Mostra dhe vizualizime', html: `<p>Ofrojmë mostra ngjyrash dhe vizualizime, që ta shihni zgjedhjen para prodhimit. Ngjyrat e errëta nxehen më shumë në diell; pyesni për sistemin e zgjedhur nëse dritaret janë shumë të ekspozuara.</p>` },
      ],
      faq: [
        { q: 'A mund të ketë dritarja ngjyrë të ndryshme brenda e jashtë?', a: 'Po, për dritaret PVC mund të zgjidhet ngjyrë e ndryshme nga brenda dhe nga jashtë.' },
        { q: 'A ka ngjyra RAL?', a: 'Po, për aluminin ofrojmë gamë të gjerë RAL dhe imitacione druri.' },
      ],
    },
    en: {
      title: 'Which Colour for Your Windows: White, Anthracite or Woodgrain?',
      metaTitle: 'Window Colours: White, Anthracite or Woodgrain? | Apex Frames',
      desc: 'The colours available for uPVC and aluminium windows, different colours inside and out, RAL and wood effects, and how to match your facade.',
      category: 'Choosing products', readMin: 4,
      answer: 'uPVC comes in white, woodgrain, black (Jet Black) and anthracite, even with a different colour inside and outside. Aluminium offers a wide RAL range and wood finishes. Choose by facade, shutters and interior look, and ask for samples before ordering.',
      sections: [
        { h: 'Colours by material', html: `<table><thead><tr><th>Product</th><th>Colours</th></tr></thead><tbody>
<tr><td>uPVC windows and doors</td><td>White, woodgrain, black (Jet Black), anthracite; different colour inside and outside</td></tr>
<tr><td>Aluminium windows and doors</td><td>Wide RAL range and wood finishes</td></tr>
<tr><td>PVC panel doors</td><td>E.g. anthracite, made to size</td></tr>
<tr><td>Aluminium louvred shutters</td><td>Standard and special RAL colours</td></tr></tbody></table>` },
        { h: 'How to match your facade', html: `<ul><li><strong>White:</strong> a classic choice that suits most facades.</li><li><strong>Anthracite and black:</strong> a modern look with strong contrast against light walls.</li><li><strong>Woodgrain:</strong> warmth, especially for homes with greenery.</li><li><strong>Inside and out:</strong> you can choose different colours, e.g. anthracite outside and white inside.</li><li><strong>Accessories:</strong> shutters, screens and awnings are chosen in the colour that matches the profile; see <a href="/en/blog/cassette-or-classic-awnings/">awnings</a> and <a href="/en/blog/strap-or-motorised-shutters/">shutters</a>.</li></ul>` },
        { h: 'Samples and visualisations', html: `<p>We provide colour samples and visualisations so you can see your choice before production. Dark colours get hotter in the sun; ask about the chosen system if your windows are very exposed.</p>` },
      ],
      faq: [
        { q: 'Can the window have different colours inside and outside?', a: 'Yes, for uPVC windows you can choose a different colour inside and outside.' },
        { q: 'Are RAL colours available?', a: 'Yes, for aluminium we offer a wide RAL range and wood finishes.' },
      ],
    },
  },

  /* ---------- 7. Curtain wall ---------- */
  {
    id: 'curtain-wall-facades', image: 'facade', date: DATE, updated: '2026-11-02', products: ['facades', 'glazing', 'aluminium'],
    slug: { sq: 'fasada-xhami-curtain-wall-cfare-duhet-te-dini', en: 'curtain-wall-facades-what-to-know' },
    sq: {
      title: 'Fasada xhami (curtain wall): çfarë duhet të dini para projektit',
      metaTitle: 'Fasada xhami curtain wall: çfarë të dini | Apex Frames',
      desc: 'Çfarë është një fasadë curtain wall, çfarë xhami përdoret, çfarë i duhet arkitektit dhe si ecën procesi nga projekti te montimi.',
      category: 'Standarde dhe dokumente', readMin: 5,
      answer: 'Një fasadë curtain wall është një strukturë alumini me termoizolim dhe xham që mbulon fasadën e ndërtesës dhe nuk mban peshën e saj. Prodhohet sipas projektit të arkitektit, me përmasa, ndarje dhe ngjyra RAL të personalizuara dhe me xham termik, stop-sol ose të laminuar.',
      sections: [
        { h: 'Çfarë përfshin', html: `<ul><li>strukturë alumini me termoizolim;</li><li>xham dopio, termik, stop-sol (kontroll diellor) ose i laminuar;</li><li>përmasa dhe ndarje sipas projektit të arkitektit;</li><li>ngjyra RAL të personalizuara;</li><li>rezistencë ndaj motit dhe izolim nga zhurma, me vlera sipas dokumentacionit të sistemit.</li></ul>` },
        { h: 'Zgjedhja e xhamit', html: `<table><thead><tr><th>Xhami</th><th>Përdoret kur</th></tr></thead><tbody>
<tr><td>Dopio termik</td><td>Kërkohet izolim termik</td></tr>
<tr><td>Stop-sol</td><td>Fasada merr shumë diell dhe duhet kontroll diellor</td></tr>
<tr><td>I laminuar</td><td>Kërkohet siguri: shih <a href="/blog/xham-i-laminuar-apo-i-kalitur/">laminuar apo i kalitur</a></td></tr></tbody></table>` },
        { h: 'Çfarë i duhet arkitektit', html: `<p>Për specifikim ofrojmë skeda teknike dhe dokumentacion të sistemit (DoP, CE), mostra ngjyrash dhe vizualizime. Mësoni si lexohen në <a href="/blog/deklarata-e-performances-dop-shenja-ce/">DoP dhe shenja CE</a>.</p>` },
        { h: 'Si ecën procesi', html: `<ol><li>Konsulencë teknike dhe përzgjedhje e sistemit sipas objektit.</li><li>Vizitë teknike dhe matje në terren.</li><li>Fletë specifikimi, e miratuar para prodhimit.</li><li>Prodhim sipas specifikimit të miratuar dhe transport.</li><li>Montim, kontroll final dhe procesverbal dorëzimi.</li></ol>` },
      ],
      faq: [
        { q: 'A është curtain wall vetëm për ndërtesa komerciale?', a: 'Jo. Fasadat zbatohen për objekte banimi, biznese dhe qendra tregtare.' },
        { q: 'A punoni sipas projektit të arkitektit?', a: 'Po. Fasadat prodhohen sipas projektit, dhe ju ofrojmë dokumentacionin për specifikim.' },
      ],
    },
    en: {
      title: 'Glass Curtain Wall Facades: What to Know Before the Project',
      metaTitle: 'Glass Curtain Wall Facades: What to Know | Apex Frames',
      desc: 'What a curtain wall facade is, which glass is used, what architects need and how the process runs from design to installation.',
      category: 'Standards and documents', readMin: 5,
      answer: 'A curtain wall facade is an insulated aluminium structure with glazing that clads the building facade and does not carry its weight. It is built to the architect’s design, with custom dimensions, divisions and RAL colours and with thermal, solar-control or laminated glass.',
      sections: [
        { h: 'What it includes', html: `<ul><li>an insulated aluminium structure;</li><li>double, thermal, solar-control (stop-sol) or laminated glass;</li><li>dimensions and divisions per the architect’s design;</li><li>custom RAL colours;</li><li>weather resistance and sound insulation, with values per the system documentation.</li></ul>` },
        { h: 'Choosing the glass', html: `<table><thead><tr><th>Glass</th><th>Used when</th></tr></thead><tbody>
<tr><td>Thermal double</td><td>Thermal insulation is required</td></tr>
<tr><td>Solar control (stop-sol)</td><td>The facade gets lots of sun and needs solar control</td></tr>
<tr><td>Laminated</td><td>Safety is required: see <a href="/en/blog/laminated-or-tempered-glass/">laminated or tempered</a></td></tr></tbody></table>` },
        { h: 'What the architect needs', html: `<p>For specification we provide technical data sheets and system documentation (DoP, CE), colour samples and visualisations. Learn how to read them in <a href="/en/blog/declaration-of-performance-ce-marking/">DoP and CE marking</a>.</p>` },
        { h: 'How the process runs', html: `<ol><li>Technical consulting and system selection for the building.</li><li>Site visit and on-site measurement.</li><li>Specification sheet, approved before production.</li><li>Manufacturing to the approved specification and delivery.</li><li>Installation, final inspection and handover protocol.</li></ol>` },
      ],
      faq: [
        { q: 'Is curtain wall only for commercial buildings?', a: 'No. Facades are built for residential buildings, businesses and shopping centres.' },
        { q: 'Do you work to the architect’s design?', a: 'Yes. Facades are fabricated to the project, and we provide the documentation for specification.' },
      ],
    },
  },

  /* ---------- 8. Zhurma ---------- */
  {
    id: 'reduce-street-noise', image: 'aluminium', date: DATE, updated: '2026-11-02', products: ['glazing', 'upvc', 'aluminium'],
    slug: { sq: 'si-te-zvogeloni-zhurmen-nga-rruga-me-dritare', en: 'reduce-street-noise-with-windows' },
    sq: {
      title: 'Si të zvogëloni zhurmën nga rruga me dritare të reja',
      metaTitle: 'Si të zvogëloni zhurmën nga rruga me dritare akustike | Apex Frames',
      desc: 'Çfarë ndikon në izolimin akustik të dritareve: xhami akustik, guarnicionet, profili dhe montimi. Si lexohet vlera Rw dhe çfarë të pyesni.',
      category: 'Këshilla', readMin: 4,
      answer: 'Izolimi nga zhurma varet nga katër gjëra: xhami (akustik ose i laminuar), guarnicionet dhe profili, montimi hermetik dhe ajrimi. Vlera Rw në deklaratën e performancës tregon izolimin: sa më e lartë, aq më pak zhurmë kalon. Një dritare e hapur ose me çarje e anulon efektin.',
      sections: [
        { h: 'Çfarë ndikon në izolimin akustik', html: `<ol><li><strong>Xhami:</strong> xhami akustik është i ndërtuar posaçërisht për zhurmën; xhami i laminuar ndihmon gjithashtu.</li><li><strong>Profili dhe guarnicionet:</strong> mbyllja e rreptë pengon kalimin e zërit.</li><li><strong>Montimi:</strong> çarjet rreth kornizës lejojnë zhurmën; izolimi perimetral me PU dhe silikoni cilësor i mbyllin.</li><li><strong>Ajrimi:</strong> dritarja e hapur nuk izolon aspak.</li></ol>` },
        { h: 'Si lexohet vlera Rw', html: `<p>Rw është vlera e izolimit akustik të dritares, e shprehur në decibel dhe e dhënë në deklaratën e performancës (DoP). Sa më e lartë vlera, aq më mirë izolon. Krahasoni vetëm vlera nga DoP e sistemit të plotë (profil + xham). Mësoni më shumë te <a href="/blog/deklarata-e-performances-dop-shenja-ce/">DoP dhe shenja CE</a>.</p>` },
        { h: 'Çfarë të pyesni para porosisë', html: `<ul><li>cili xham akustik propozohet dhe cila është vlera Rw e sistemit;</li><li>si bëhet montimi dhe mbyllja perimetrale: shih <a href="/blog/montimi-i-dritareve-8-hapa/">montimin në 8 hapa</a>;</li><li>çfarë mundësish ka për ajrim kur dritaret mbahen të mbyllura.</li></ul>` },
      ],
      faq: [
        { q: 'A mjafton xhami dopio për zhurmën?', a: 'Varet nga situata. Për rrugë me zhurmë ekziston xhami akustik; vlerat konkrete jepen në deklaratën e performancës.' },
        { q: 'A ndikon montimi në zhurmë?', a: 'Po. Çarjet rreth kornizës lejojnë kalimin e zhurmës, prandaj izolimi perimetral dhe silikoni ndikojnë në rezultat.' },
      ],
    },
    en: {
      title: 'How to Reduce Street Noise with New Windows',
      metaTitle: 'How to Reduce Street Noise with Acoustic Windows | Apex Frames',
      desc: 'What affects window sound insulation: acoustic glass, seals, profile and installation. How to read the Rw value and what to ask.',
      category: 'Advice', readMin: 4,
      answer: 'Noise insulation depends on four things: the glass (acoustic or laminated), the seals and profile, airtight installation and ventilation. The Rw value in the Declaration of Performance shows the insulation: the higher, the less noise gets through. An open or leaky window cancels the effect.',
      sections: [
        { h: 'What affects sound insulation', html: `<ol><li><strong>Glass:</strong> acoustic glass is built specifically for noise; laminated glass also helps.</li><li><strong>Profile and seals:</strong> a tight closure blocks sound.</li><li><strong>Installation:</strong> gaps around the frame let noise in; PU perimeter insulation and quality silicone close them.</li><li><strong>Ventilation:</strong> an open window insulates nothing.</li></ol>` },
        { h: 'How to read the Rw value', html: `<p>Rw is the window’s sound-insulation value, expressed in decibels and given in the Declaration of Performance (DoP). The higher the value, the better it insulates. Compare only values from the DoP of the complete system (frame + glass). Learn more in <a href="/en/blog/declaration-of-performance-ce-marking/">DoP and CE marking</a>.</p>` },
        { h: 'What to ask before ordering', html: `<ul><li>which acoustic glass is proposed and what the system’s Rw value is;</li><li>how installation and perimeter sealing are done: see <a href="/en/blog/window-installation-8-steps/">installation in 8 steps</a>;</li><li>what ventilation options exist when windows stay closed.</li></ul>` },
      ],
      faq: [
        { q: 'Is double glazing enough for noise?', a: 'It depends. For noisy streets acoustic glass exists; concrete values are given in the Declaration of Performance.' },
        { q: 'Does installation affect noise?', a: 'Yes. Gaps around the frame let noise through, so perimeter insulation and silicone affect the result.' },
      ],
    },
  },

  /* ---------- 9. Rrjeta kundër insekteve ---------- */
  {
    id: 'insect-screens-guide', image: 'pleated', date: DATE, updated: '2026-11-02', products: ['screens', 'aluminium', 'upvc'],
    slug: { sq: 'rrjeta-kunder-insekteve-cilin-model-te-zgjidhni', en: 'insect-screens-which-type-to-choose' },
    sq: {
      title: 'Rrjeta kundër insekteve: cilin model të zgjidhni për derë ose dritare',
      metaTitle: 'Rrjeta kundër insekteve: cilin model? | Apex Frames',
      desc: 'Rrjeta rrëshqitëse, vertikale me rrotullim, të fiksuara në kornizë dhe plissé: si funksionon secila, çfarë materiali përdoret dhe çfarë të pyesni para porosisë.',
      category: 'Zgjedhja e produktit', readMin: 4,
      answer: 'Për dyer ballkoni zgjidhen zakonisht rrjetat plissé (me palosje) ose ato rrëshqitëse; për dritare, rrjetat vertikale me rrotullim ose të fiksuara në kornizë. Rrjeta është prej fiberglassi ose poliesteri me mbrojtje anti-UV, dhe sistemi plissé modular ka nga 1 deri në 4 fletë.',
      sections: [
        { h: 'Llojet kryesore', html: `<table><thead><tr><th>Lloji</th><th>Si funksionon</th><th>Më i përshtatshëm për</th></tr></thead><tbody>
<tr><td>Rrëshqitëse horizontale</td><td>Rrëshqet në shina</td><td>Dritare dhe dyer me hapësirë anash</td></tr>
<tr><td>Vertikale me rrotullim</td><td>Rrotullohet dhe mbështillet në një kuti</td><td>Dritare</td></tr>
<tr><td>Të fiksuara në kornizë</td><td>Montohen në kornizë dhe qëndrojnë në vend</td><td>Dritare ku rrjeta nuk lëvizet shpesh</td></tr>
<tr><td>Plissé (me palosje)</td><td>Palosen si fizarmonikë</td><td>Dyer ballkoni dhe hapje të mëdha</td></tr></tbody></table>` },
        { h: 'Materiali dhe detajet', html: `<ul><li><strong>Rrjeta:</strong> prej fiberglassi ose poliesteri, me mbrojtje anti-UV.</li><li><strong>Sistemi plissé modular:</strong> ka nga 1 deri në 4 fletë, sipas gjerësisë së hapjes.</li><li><strong>Prag i ulët (3–7 mm)</strong> te dyert, për akses pa pengesa.</li><li><strong>Aksesorë cilësorë</strong> me frenues magnetik.</li></ul>` },
        { h: 'Çfarë të pyesni para porosisë', html: `<ul><li>cili model përshtatet me derën ose dritaren tuaj (shih edhe <a href="/blog/dyer-rreshqitese-llojet-dhe-si-zgjidhen/">llojet e dyerve rrëshqitëse</a>);</li><li>sa hapësirë ka anash për rrjetën kur hapet;</li><li>sa i ulët është pragu te dera;</li><li>cila ngjyrë përputhet me profilin e dritares ose derës.</li></ul>` },
      ],
      faq: [
        { q: 'Cili model është më i mirë për derë ballkoni?', a: 'Për dyer përdoren zakonisht modelet plissé ose rrëshqitëse. Modelin e zgjedhim sipas hapjes dhe hapësirës anash gjatë vizitës teknike.' },
        { q: 'A ka prag të ulët te dyert?', a: 'Po, sistemi plissé për dyer ka prag të ulët (3–7 mm) për akses pa pengesa.' },
      ],
    },
    en: {
      title: 'Insect Screens: Which Type to Choose for a Door or Window',
      metaTitle: 'Insect Screens: Which Type? | Apex Frames',
      desc: 'Sliding, vertical roll-up, fixed-frame and plissé insect screens: how each works, what material is used and what to ask before ordering.',
      category: 'Choosing products', readMin: 4,
      answer: 'For balcony doors, plissé (pleated) or sliding screens are usually chosen; for windows, vertical roll-up or fixed-frame screens. The mesh is fibreglass or polyester with UV protection, and the modular plissé system has from 1 to 4 leaves.',
      sections: [
        { h: 'The main types', html: `<table><thead><tr><th>Type</th><th>How it works</th><th>Best for</th></tr></thead><tbody>
<tr><td>Horizontal sliding</td><td>Slides on tracks</td><td>Windows and doors with space to the side</td></tr>
<tr><td>Vertical roll-up</td><td>Rolls up into a box</td><td>Windows</td></tr>
<tr><td>Fixed frame</td><td>Mounted in a frame and stays in place</td><td>Windows where the screen isn’t moved often</td></tr>
<tr><td>Plissé (pleated)</td><td>Folds like an accordion</td><td>Balcony doors and large openings</td></tr></tbody></table>` },
        { h: 'Material and details', html: `<ul><li><strong>Mesh:</strong> fibreglass or polyester, with UV protection.</li><li><strong>Modular plissé system:</strong> from 1 to 4 leaves, depending on the opening width.</li><li><strong>Low threshold (3–7 mm)</strong> on doors, for barrier-free access.</li><li><strong>Quality hardware</strong> with a magnetic catch.</li></ul>` },
        { h: 'What to ask before ordering', html: `<ul><li>which model fits your door or window (see also <a href="/en/blog/sliding-doors-types-and-how-to-choose/">sliding door types</a>);</li><li>how much space there is to the side for the screen when open;</li><li>how low the door threshold is;</li><li>which colour matches the window or door profile.</li></ul>` },
      ],
      faq: [
        { q: 'Which model is best for a balcony door?', a: 'Plissé or sliding models are usually used for doors. We choose the model according to the opening and the space to the side during the technical visit.' },
        { q: 'Is there a low threshold on doors?', a: 'Yes, the plissé system for doors has a low threshold (3–7 mm) for barrier-free access.' },
      ],
    },
  },

  /* ---------- 10. Kangjella me xham ---------- */
  {
    id: 'glass-railings-guide', image: 'railing', date: DATE, updated: '2026-11-02', products: ['railings', 'glazing', 'doors'],
    slug: { sq: 'kangjella-me-xham-cfare-duhet-te-dini', en: 'glass-railings-what-to-know' },
    sq: {
      title: 'Kangjella me xham, inox dhe alumin: çfarë të dini para porosisë',
      metaTitle: 'Kangjella me xham, inox dhe alumin | Apex Frames',
      desc: 'Si zgjidhen kangjellat me xham, inox ose alumin për ballkone, tarraca dhe shkallë: materialet, xhami i sigurisë, matja dhe çfarë të pyesni.',
      category: 'Zgjedhja e produktit', readMin: 4,
      answer: 'Kangjellat me xham e mbrojnë ballkonin, tarracën ose shkallën pa e prerë pamjen. Struktura bëhet prej inoksi ose alumini dhe xhami është sigurie, i laminuar ose i kalitur. Prodhohen sipas matjeve në terren; lartësinë dhe kërkesat e sigurisë i përcakton projekti dhe rregullat e ndërtimit.',
      sections: [
        { h: 'Inoks apo alumin', html: `<table><thead><tr><th>Kriteri</th><th>Inoks</th><th>Alumin</th></tr></thead><tbody>
<tr><td>Pamja</td><td>Metalike e pastër</td><td>E lehtë, përputhet me dritaret dhe dyert prej alumini</td></tr>
<tr><td>Kur zgjidhet</td><td>Kur doni një detaj metalik të dukshëm</td><td>Kur doni unitet me fasadën prej alumini</td></tr>
<tr><td>Xhami</td><td colspan="2">I njëjti xham sigurie, i laminuar ose i kalitur, në të dyja rastet</td></tr></tbody></table>` },
        { h: 'Xhami i sigurisë', html: `<p>Panelet përdorin xham sigurie. Dallimin mes xhamit të laminuar dhe të kalitur e shpjegojmë te <a href="/blog/xham-i-laminuar-apo-i-kalitur/">xham i laminuar apo i kalitur</a>. Xhami i kalitur nuk pritet pas kalitjes, prandaj matjet duhet të jenë të sakta para prodhimit.</p>` },
        { h: 'Si ecën porosia', html: `<ol><li>Vizitë teknike dhe matje në terren.</li><li>Fletë specifikimi, e miratuar para prodhimit.</li><li>Prodhim sipas specifikimit dhe transport.</li><li>Montim, kontroll final dhe procesverbal dorëzimi.</li></ol>` },
        { h: 'Çfarë të pyesni', html: `<ul><li>cila lartësi dhe cilat kërkesa sigurie kërkohen nga projekti ose nga rregullat e ndërtimit (pyesni projektuesin);</li><li>cili xham sigurie propozohet;</li><li>cila ngjyrë ose finiturë ka struktura;</li><li>si fiksohet struktura në ballkon ose në dysheme.</li></ul>` },
      ],
      faq: [
        { q: 'A është xhami i sigurisë i detyrueshëm?', a: 'Kjo varet nga projekti dhe rregullat e ndërtimit, prandaj pyesni projektuesin. Ne prodhojmë parapete me xham sigurie, të laminuar ose të kalitur.' },
        { q: 'Si matet kangjella?', a: 'Matjet merren në objekt nga ekipi teknik dhe specifikimi miratohet para prodhimit.' },
      ],
    },
    en: {
      title: 'Glass, Stainless and Aluminium Railings: What to Know Before Ordering',
      metaTitle: 'Glass, Stainless and Aluminium Railings | Apex Frames',
      desc: 'How to choose glass, stainless or aluminium railings for balconies, terraces and stairs: materials, safety glass, measurement and what to ask.',
      category: 'Choosing products', readMin: 4,
      answer: 'Glass railings protect a balcony, terrace or staircase without cutting the view. The structure is stainless steel or aluminium and the glass is safety glass, laminated or tempered. They are made to on-site measurements; height and safety requirements are set by the project and building rules.',
      sections: [
        { h: 'Stainless steel or aluminium', html: `<table><thead><tr><th>Criteria</th><th>Stainless steel</th><th>Aluminium</th></tr></thead><tbody>
<tr><td>Look</td><td>Clean metallic</td><td>Light, matches aluminium windows and doors</td></tr>
<tr><td>Chosen when</td><td>You want a visible metal detail</td><td>You want unity with an aluminium facade</td></tr>
<tr><td>Glass</td><td colspan="2">The same safety glass, laminated or tempered, in both cases</td></tr></tbody></table>` },
        { h: 'Safety glass', html: `<p>The panels use safety glass. We explain the difference between laminated and tempered glass in <a href="/en/blog/laminated-or-tempered-glass/">laminated or tempered glass</a>. Tempered glass cannot be cut after tempering, so measurements must be exact before production.</p>` },
        { h: 'How the order works', html: `<ol><li>Technical visit and on-site measurement.</li><li>Specification sheet, approved before production.</li><li>Manufacturing to the specification and delivery.</li><li>Installation, final inspection and handover protocol.</li></ol>` },
        { h: 'What to ask', html: `<ul><li>which height and safety requirements apply under the project or building rules (ask your designer);</li><li>which safety glass is proposed;</li><li>which colour or finish the structure has;</li><li>how the structure is fixed to the balcony or floor.</li></ul>` },
      ],
      faq: [
        { q: 'Is safety glass mandatory?', a: 'That depends on the project and building rules, so ask your designer. We make balustrades with safety glass, laminated or tempered.' },
        { q: 'How are railings measured?', a: 'Our technical team takes measurements on site and the specification is approved before production.' },
      ],
    },
  },
];
