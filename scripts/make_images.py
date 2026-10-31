"""Pregatit fotot: heq vijat e holla te mbivendosura, pret tekstin e pjekur ne imazh,
eksporton WebP me disa madhesi + nje JPG 1200x630 per Open Graph.
Perdorimi: python3 -I scripts/make_images.py <dosja_me_burimet>   (burimet: src-1.jpg ... src-16.jpg)"""
import json, sys, os
import numpy as np
from PIL import Image

SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'img', 'photos')
os.makedirs(OUT, exist_ok=True)

def runs_len(w, axis):
    """gjatesia e vargut te bardhe qe permban cdo piksel, sipas nje aksi"""
    a = w if axis == 1 else w.T
    out = np.zeros(a.shape, dtype=np.int32)
    for i, row in enumerate(a):
        d = np.diff(np.concatenate(([0], row.astype(np.int8), [0])))
        s, e = np.where(d == 1)[0], np.where(d == -1)[0]
        for x, y in zip(s, e):
            out[i, x:y] = y - x
    return out if axis == 1 else out.T

def remove_lines(img):
    a = np.asarray(img.convert('RGB')).astype(np.float32)
    w = a.min(axis=2) >= 244
    hl, vl = runs_len(w, 1), runs_len(w, 0)           # gjatesi horizontale / vertikale
    m = w & (((hl >= 60) & (vl <= 7)) | ((vl >= 60) & (hl <= 7)))
    for _ in range(2):                                 # zgjero maskën
        m = m | np.roll(m, 1, 0) | np.roll(m, -1, 0) | np.roll(m, 1, 1) | np.roll(m, -1, 1)
    keep = ~m
    for _ in range(80):                                # mbushje me difuzion
        n = (np.roll(a, 1, 0) + np.roll(a, -1, 0) + np.roll(a, 1, 1) + np.roll(a, -1, 1)) / 4
        a = np.where(m[..., None], n, a)
    return Image.fromarray(a.clip(0, 255).astype(np.uint8)), int(m.sum())

# emri: (burimi, crop kutia (l,t,r,b), crop OG (l,t,r,b) ne koordinatat e crop-it kryesor)
JOBS = {
    'doors':     ('src-2.jpg', (0, 330, 1200, 1600), (0, 330, 1200, 960)),
    'aluminium': ('src-3.jpg', (0, 330, 1200, 1600), (0, 380, 1200, 1010)),
    'shutters':  ('src-4.jpg', (0, 300, 1200, 1600), (0, 160, 1200, 790)),
    'facade':    ('src-5.jpg', (0, 800, 1200, 1600), (0, 100, 1200, 730)),
    'glazing':   ('src-5.jpg', (500, 900, 1200, 1600), (0, 0, 700, 368)),
    'awning':    ('src-6.jpg', (0, 300, 1200, 1600), (0, 380, 1200, 1010)),
    # foto të reja (kthesat e kaltra nuk hiqen dot me algoritëm: priten jashtë kadrit; clean=False)
    'family':    ('src-7.jpg', (400, 238, 1080, 975), (0, 0, 680, 357), False),
    'window':    ('src-8.jpg', (60, 262, 1020, 1100), (0, 100, 960, 604), False),
    'shutters2': ('src-9.jpg', (295, 268, 1080, 845), (0, 80, 785, 492), False),
    'sliding':   ('src-10.jpg', (310, 352, 1280, 1370), (0, 300, 970, 809), False),
    'roller':    ('src-11.jpg', (282, 232, 1024, 960), (0, 150, 742, 540), False),
    'blackslider': ('src-12.jpg', (22, 352, 945, 1372), (0, 150, 923, 635), False),
    'building':  ('src-13.jpg', (330, 250, 1280, 1290), (0, 150, 950, 649), False),
    'profile':   ('src-14.jpg', (365, 555, 1010, 945), (0, 25, 645, 364), False),
    'door':      ('src-16.jpg', (570, 320, 1280, 1500), (0, 60, 710, 433), False),
}
cache, manifest = {}, {}
for name, job in JOBS.items():
    src, box, og = job[:3]
    clean = job[3] if len(job) > 3 else True
    if (src, clean) not in cache:
        raw = Image.open(os.path.join(SRC, src)).convert('RGB')
        if clean:
            cache[(src, clean)], n = remove_lines(raw)
            print(src, 'piksele te rregulluar:', n)
        else:
            cache[(src, clean)] = raw
    im = cache[(src, clean)].crop(box)
    vs = []
    for w in (640, 960, 1200):
        if w > im.width: continue
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(os.path.join(OUT, f'{name}-{w}.webp'), 'WEBP', quality=78, method=6)
        vs.append({'w': w, 'h': r.height})
    if im.width < 1200 and im.width not in [v['w'] for v in vs]:
        im.save(os.path.join(OUT, f'{name}-{im.width}.webp'), 'WEBP', quality=78, method=6)
        vs.append({'w': im.width, 'h': im.height})
    o = im.crop(og).resize((1200, 630), Image.LANCZOS)
    o.save(os.path.join(OUT, f'{name}-og.jpg'), 'JPEG', quality=84, optimize=True)
    manifest[name] = vs
json.dump(manifest, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
print(manifest)
