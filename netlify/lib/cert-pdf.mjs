// Plotëson shabllonin e certifikatës (PDF) me të dhënat e klientit, numrin, afatin dhe një QR verifikimi.
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import QRCode from 'qrcode';
import { TEMPLATE_PDF, FONT_REGULAR, FONT_BOLD } from './cert-assets.mjs';

const NAVY = rgb(0.184, 0.259, 0.369); // #2f425e
const MUTED = rgb(0.39, 0.43, 0.46);
const BLUE = rgb(0.188, 0.494, 0.675); // #307eac
const b64 = (s) => Uint8Array.from(Buffer.from(s, 'base64'));
const fmtDate = (iso) => iso.split('-').reverse().join(' / ');
const fmtDateDots = (iso) => iso.split('-').reverse().join('.');

export async function buildCertificatePdf(cert, { siteUrl = 'https://www.apexframes.co' } = {}) {
  const pdf = await PDFDocument.load(b64(TEMPLATE_PDF));
  pdf.registerFontkit(fontkit);
  const regular = await pdf.embedFont(b64(FONT_REGULAR), { subset: true });
  const bold = await pdf.embedFont(b64(FONT_BOLD), { subset: true });
  const safe = (font, s) => { const set = new Set(font.getCharacterSet()); return Array.from(String(s)).map((ch) => (set.has(ch.codePointAt(0)) ? ch : '?')).join(''); };
  const page = pdf.getPage(0);
  const mb = page.getMediaBox();
  const Y = (top) => mb.y + mb.height - top; // koordinata nga lart (si në pdftotext) → PDF
  const text = (s, x, top, size, font, color = NAVY, maxWidth) => {
    let t = safe(font, s);
    if (maxWidth) while (t.length > 1 && font.widthOfTextAtSize(t, size) > maxWidth) t = t.slice(0, -2) + '…';
    page.drawText(t, { x, y: Y(top), size, font, color });
  };
  const centered = (s, x0, x1, top, size, font) => text(s, x0 + (x1 - x0 - font.widthOfTextAtSize(safe(font, s), size)) / 2, top, size, font);

  // fushat e shablonit: "Emri", "Data e blerjes", "Produkti" (shkruhen mbi vijat bosh)
  const fullName = `${cert.name || ''} ${cert.surname || ''}`.trim();
  if (fullName) text(fullName, 100, 559.5, 12, bold, NAVY, 180); // fusha mbetet bosh nëse emri nuk është dhënë
  const [yy, mm, dd] = cert.startDate.split('-');
  centered(dd, 149.9, 171.9, 577.5, 12, bold);
  centered(mm, 182.6, 204.6, 577.5, 12, bold);
  centered(yy, 215.4, 252.1, 577.5, 12, bold);
  if (cert.product) text(cert.product, 122, 595.5, 12, bold, NAVY, 160);

  // blloku i certifikatës (djathtas të të dhënave të klientit) + QR
  const bx = 318;
  text('Nr. i certifikatës', bx, 535, 8.5, regular, MUTED);
  text(cert.number, bx, 551.5, 17, bold, NAVY);
  text(`E vlefshme nga ${fmtDateDots(cert.startDate)}`, bx, 566, 9, regular, NAVY);
  text(`deri më ${fmtDateDots(cert.validUntil)}  (${cert.years} vite)`, bx, 579, 9, bold, BLUE);
  text('Verifikoni online në:', bx, 601, 6.8, regular, MUTED);
  text('apexframes.co/garancia/certifikata', bx, 610, 6.8, bold, BLUE);
  const url = `${siteUrl}/garancia/certifikata/?n=${cert.number}`;
  const qr = await pdf.embedPng(await QRCode.toBuffer(url, { margin: 0, width: 320, color: { dark: '#2f425e', light: '#ffffff' }, errorCorrectionLevel: 'M' }));
  page.drawImage(qr, { x: 480, y: Y(588), width: 56, height: 56 });

  // Shënim ligjor: garancia tregtare nuk cenon të drejtat ligjore të konsumatorit
  centered('Kjo garanci tregtare nuk cenon të drejtat ligjore të konsumatorit sipas Ligjit nr. 9902/2008 “Për mbrojtjen e konsumatorit”.', 40, 555.5, 806, 6.6, regular);

  pdf.setTitle(`Certifikatë garancie ${cert.number}`);
  pdf.setAuthor('Apex Frames SHPK');
  pdf.setSubject('Certifikatë garancie');
  pdf.setProducer('Apex Frames');
  pdf.setCreator('Apex Frames');
  return await pdf.save();
}
