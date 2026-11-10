import os
from PIL import Image, ImageFilter

base_dir = r"d:\maitri\public\assets"
os.makedirs(base_dir, exist_ok=True)

# 1. Load ref hero & section 2
ref2_path = r"C:\Users\gupta\.gemini\antigravity\brain\f1a3423e-d24f-4c45-9a97-2854e9596c40\.user_uploaded\media_1793986033842_de1d2c23.jpg"
ref2 = Image.open(ref2_path)
w2, h2 = ref2.size

# Hero is top part (y: 0 to 365)
hero_img = ref2.crop((0, 0, w2, 365))

# We want a clean background for the hero:
# On the right (x: 420 to 1024), we have the pristine restaurant facade with glowing Maitri Katta sign.
# On the left, where text was, we can create a clean, dark cinematic gradient with warm bokeh that seamlessly blends into the right half!
facade_right = hero_img.crop((410, 0, w2, 365))

# Create a 1920x820 high-res canvas for the hero background
hero_canvas = Image.new("RGB", (1920, 820), (20, 14, 12))

# Resize facade to fit the right 60% of the canvas
facade_w = int(1920 * 0.62)
facade_h = 820
facade_scaled = facade_right.resize((facade_w, facade_h), Image.Resampling.LANCZOS)

# Paste facade on the right
hero_canvas.paste(facade_scaled, (1920 - facade_w, 0))

# Create seamless dark gradient blend on the left so HTML text sits over pure cinematic darkness
from PIL import ImageDraw

overlay = Image.new("RGBA", (1920, 820), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

# Gradient from x: 0 to x: 1200
for x in range(1300):
    # from full opacity 255 at x=0 down to 0 at x=1250
    ratio = x / 1250.0
    alpha = int(255 * (1.0 - (ratio ** 1.8)))
    draw.line([(x, 0), (x, 820)], fill=(24, 16, 13, max(0, min(255, alpha))))

hero_final = Image.alpha_composite(hero_canvas.convert("RGBA"), overlay)
hero_final.convert("RGB").save(os.path.join(base_dir, "hero-restaurant-facade.jpg"), quality=95)
print("Saved hero-restaurant-facade.jpg")

# 2. Extract Section Two food dish (curry bowl + garlic naan)
# From ref2, bottom half (y: 360 to h2, x: 440 to w2)
dish_crop = ref2.crop((440, 365, w2, h2))
dish_crop.save(os.path.join(base_dir, "showcase-butter-chicken-naan.jpg"), quality=95)
print("Saved showcase-butter-chicken-naan.jpg")

# 3. Extract the Brand Story Hand from ref1 (media_1793985922302_69bc6341.jpg)
ref1_path = r"C:\Users\gupta\.gemini\antigravity\brain\f1a3423e-d24f-4c45-9a97-2854e9596c40\.user_uploaded\media_1793985922302_69bc6341.jpg"
ref1 = Image.open(ref1_path)
w1, h1 = ref1.size

# The hand with alta is in the bottom right corner (roughly x: 740 to 1024, y: 380 to 682)
hand_crop = ref1.crop((740, 380, w1, h1)).convert("RGBA")
# Flood fill transparent from outside border if needed, or save crop
hand_crop.save(os.path.join(base_dir, "brand-story-mudra-hand.png"))
print("Saved brand-story-mudra-hand.png")

# Also let's extract the film strip from ref1 for inspiration or reference
film_crop = ref1.crop((0, 0, w1, 380))
film_crop.save(os.path.join(base_dir, "ref-film-strip-header.jpg"), quality=92)
print("Saved ref-film-strip-header.jpg")

