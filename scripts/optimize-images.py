"""Generate content-addressed responsive previews; retain all source files."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from PIL import Image, ImageOps
import hashlib
import json

root = Path(__file__).resolve().parents[1]
public = root / 'public'
output = public / 'optimized'
output.mkdir(exist_ok=True)
sources = [p for p in public.rglob('*') if p.is_file()
           and p.suffix.lower() in ('.png', '.jpg', '.jpeg', '.webp')
           and output not in p.parents]

def process(path):
    with Image.open(path) as opened:
        if getattr(opened, 'is_animated', False):
            return None
        image = ImageOps.exif_transpose(opened).convert('RGBA' if 'A' in opened.getbands() else 'RGB')
        w, h = image.size
        token = hashlib.sha256(path.read_bytes() + b'responsive-v1').hexdigest()[:16]
        variants = []
        for size in sorted({min(w, n) for n in (480, 960, 1600)}):
            dest = output / f'{token}-{size}.webp'
            if not dest.exists():
                preview = image.resize((size, max(1, round(h * size / w))), Image.Resampling.LANCZOS)
                preview.save(dest, 'WEBP', quality=86, method=4)
            variants.append((size, '/optimized/' + dest.name))
        source = '/' + path.relative_to(public).as_posix()
        full = source
        if path.suffix.lower() != '.webp':
            dest = output / f'{token}-full.webp'
            if not dest.exists():
                image.save(dest, 'WEBP', quality=94, method=4)
            if dest.stat().st_size < path.stat().st_size:
                full = '/optimized/' + dest.name
        default = min(variants, key=lambda v: abs(v[0] - 960))[1]
        entry = {'width': w, 'height': h, 'src': default,
                 'srcSet': ', '.join(f'{url} {size}w' for size, url in variants), 'full': full}
        return source, entry, path.stat().st_size, (output / default.split('/')[-1]).stat().st_size

with ThreadPoolExecutor(max_workers=4) as pool:
    results = [result for result in pool.map(process, sources) if result]
manifest = {source: entry for source, entry, _, _ in results}
(root / 'src/lib/image-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(json.dumps({'images': len(results), 'sourceMB': round(sum(r[2] for r in results) / 1048576, 2),
                  'previewMB': round(sum(r[3] for r in results) / 1048576, 2)}))
