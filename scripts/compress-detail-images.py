from PIL import Image
import os, glob

SRC = "D:/作品集/workspace/public/explorations/detail"
MAX_W = 1280
QUALITY = 82

files = sorted(glob.glob(os.path.join(SRC, "*.png")))
print(f"Found {len(files)} PNGs")

lines = []
total_src = 0
total_dst = 0
for p in files:
    base = os.path.splitext(os.path.basename(p))[0]  # e.g. 01
    im = Image.open(p).convert("RGB")
    w, h = im.size
    total_src += os.path.getsize(p)
    if w > MAX_W:
        nh = int(round(h * MAX_W / w))
        im = im.resize((MAX_W, nh), Image.LANCZOS)
        w, h = im.size
    out = os.path.join(SRC, base + ".webp")
    im.save(out, "WEBP", quality=QUALITY)
    sz = os.path.getsize(out)
    total_dst += sz
    lines.append(f"  {{ id: 'detail-{base}', img: '/explorations/detail/{base}.webp', url: '/explorations/detail/{base}.webp', height: {h} }},")
    print(f"{base}.webp -> {w}x{h}  {sz//1024}KB")

print("\n=== DETAIL_ITEMS ===")
print("const DETAIL_ITEMS: MasonryItem[] = [")
print("\n".join(lines))
print("]")
print(f"\nTotal: {total_src//1024//1024}MB -> {total_dst//1024//1024}MB")
