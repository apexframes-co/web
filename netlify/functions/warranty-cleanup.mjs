// Pastrim ditor sipas politikës së ruajtjes: fshin kërkesat në pritje ose të refuzuara më të vjetra se 12 muaj
// dhe numëruesit e vjetër të kufizimit. Certifikatat e lëshuara nuk preken (ruhen gjatë garancisë).
import { blobsStore } from '../lib/blobs-store.mjs';
import { purgeExpired } from '../lib/warranty-core.mjs';

export default async () => {
  const r = await purgeExpired(blobsStore('warranty'), Date.now());
  console.log('warranty cleanup', JSON.stringify(r));
};

export const config = { schedule: '@daily' };
