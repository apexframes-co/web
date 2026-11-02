// Netlify Function (v2) për /api/warranty/*  —  shih netlify/lib/warranty-api.mjs
import { createHandler } from '../lib/warranty-api.mjs';
import { blobsStore } from '../lib/blobs-store.mjs';
import { createMailer } from '../lib/mail.mjs';

let handler;
export default async (req, context) => {
  handler ||= createHandler({ store: blobsStore('warranty'), mailer: createMailer(process.env) });
  return handler(req, context);
};

export const config = { path: '/api/warranty/*' };
