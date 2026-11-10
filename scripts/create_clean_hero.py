from PIL import Image, ImageDraw, ImageFilter

ref2_path = r"C:\Users\gupta\.gemini\antigravity\brain\f1a3423e-d24f-4c45-9a97-2854e9596c40\.user_uploaded\media_1793986033842_de1d2c23.jpg"
ref2 = Image.open(ref2_path)
w2, h2 = ref2.size

# In ref2:
# Top header is y: 0 to 68. Below y=68 is the restaurant image.
# On the right, x: 490 to 1024, y: 65 to 365 has the glowing sign, facade, and plants.
# Let's crop x: 480 to 1024, y: 65 to 365
facade = ref2.crop((480, 65, w2, 365))

# We can also take the foliage on the bottom left if needed, or create a rich cinematic canvas.
canvas_w, canvas_h = 1920, 850
canvas = Image.new("RGB", (canvas_w, canvas_h), (18, 12, 10))

# Resize facade to fill the right portion: width = 1100, height = 850
facade_w = 1150
facade_h = canvas_h
facade_resized = facade.resize((facade_w, facade_h), Image.Resampling.LANCZOS)

# Paste on the right side
canvas.paste(facade_resized, (canvas_w - facade_w, 0))

# Create a smooth cinematic vignette and left dark gradient overlay
overlay = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

# Dark gradient covering the left half completely, smoothly feathering towards the restaurant entrance
# From x=0 to x=900 is strong dark charcoal (#120C0A)
for x in range(canvas_w):
    if x < 750:
        alpha = 255
    elif x < 1250:
        ratio = (x - 750) / 500.0
        # Smooth cosine or power curve
        alpha = int(255 * (1.0 - ratio) ** 1.5)
    else:
        alpha = 0
    draw.line([(x, 0), (x, canvas_h)], fill=(18, 12, 10, alpha))

# Also add subtle top vignette so header text pops
for y in range(120):
    ratio = (120 - y) / 120.0
    alpha = int(180 * ratio)
    draw.line([(0, y), (canvas_w, y)], fill=(10, 7, 6, alpha))

# Subtle bottom vignette
for y in range(canvas_h - 100, canvas_h):
    ratio = (y - (canvas_h - 100)) / 100.0
    alpha = int(220 * ratio)
    draw.line([(0, y), (canvas_w, y)], fill=(18, 12, 10, alpha))

result = Image.alpha_composite(canvas.convert("RGBA"), overlay)
result.convert("RGB").save(r"d:\maitri\public\assets\hero-maitri-facade.jpg", quality=96)
print("Generated clean hero-maitri-facade.jpg")

