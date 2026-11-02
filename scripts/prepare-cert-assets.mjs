// Ngjesh shabllonin e certifikatës dhe shkronjat në netlify/lib/cert-assets.mjs (base64),
// që funksioni të mos varet nga skedarët në disk pas bundling-ut:  node scripts/prepare-cert-assets.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const b64 = (p) => readFileSync(join(root, p)).toString('base64');
const out = `// GJENERUAR nga scripts/prepare-cert-assets.mjs: mos e ndryshoni me dorë.
export const TEMPLATE_PDF = '${b64('netlify/assets/certificate-template.pdf')}';
export const FONT_REGULAR = '${b64('node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-400-normal.woff')}';
export const FONT_BOLD = '${b64('node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-700-normal.woff')}';
`;
writeFileSync(join(root, 'netlify/lib/cert-assets.mjs'), out);
console.log('cert-assets.mjs', Math.round(out.length / 1024), 'KB');
