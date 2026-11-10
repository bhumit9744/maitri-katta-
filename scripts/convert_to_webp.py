import os
import re
from PIL import Image, ImageOps

PUBLIC_DIR = 'public'
ORIGINALS_DIR = 'archive_raw_assets/original_images'
os.makedirs(ORIGINALS_DIR, exist_ok=True)

# List of photos to convert
# Exclude SVGs, existing WebP, transparent logos
EXCLUDE_BASENAMES = {
    'maitri-katta.svg',
    'maitri-food-doodle-pattern.svg',
    'maitri-heritage-pattern.svg',
    'maitri-katta-logo-transparent.png',
    'maitri-katta-logo-original.png',
    'brand-story-mudra-hand-transparent.png'
}

candidates = []
for root, dirs, files in os.walk(PUBLIC_DIR):
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in ['.jpg', '.jpeg', '.png'] and f not in EXCLUDE_BASENAMES:
            full_path = os.path.join(root, f)
            candidates.append(full_path)

print(f"Found {len(candidates)} photographic images to optimize into WebP.")

total_orig_bytes = 0
total_webp_bytes = 0
conversion_map = {}

for img_path in candidates:
    rel_path = os.path.relpath(img_path, PUBLIC_DIR).replace('\\', '/')
    orig_size = os.path.getsize(img_path)
    total_orig_bytes += orig_size

    base_no_ext, _ = os.path.splitext(rel_path)
    # Special fix for double extension like .jpg.jpg
    if base_no_ext.endswith('.jpg'):
        base_no_ext = base_no_ext[:-4]
    
    webp_rel_path = f"{base_no_ext}.webp"
    webp_full_path = os.path.join(PUBLIC_DIR, webp_rel_path.replace('/', os.sep))

    # Backup original before modifying
    backup_path = os.path.join(ORIGINALS_DIR, rel_path.replace('/', os.sep))
    os.makedirs(os.path.dirname(backup_path), exist_ok=True)
    with open(img_path, 'rb') as f_in, open(backup_path, 'wb') as f_out:
        f_out.write(f_in.read())

    # Convert using Pillow
    try:
        with Image.open(img_path) as im:
            im = ImageOps.exif_transpose(im)
            
            # For extremely large images (> 2000px wide), resize to max 1920px width to avoid memory waste
            w, h = im.size
            if w > 1920:
                new_w = 1920
                new_h = int(h * (1920 / w))
                im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
            elif h > 1920:
                new_h = 1920
                new_w = int(w * (1920 / h))
                im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)

            os.makedirs(os.path.dirname(webp_full_path), exist_ok=True)
            if im.mode in ('RGBA', 'LA'):
                im.save(webp_full_path, 'WEBP', quality=85, method=6)
            else:
                im = im.convert('RGB')
                im.save(webp_full_path, 'WEBP', quality=82, method=6)

        webp_size = os.path.getsize(webp_full_path)
        total_webp_bytes += webp_size
        conversion_map['/' + rel_path] = '/' + webp_rel_path
        # Also map without leading slash
        conversion_map[rel_path] = webp_rel_path

        # If the webp file is different from img_path, remove the old unoptimized file from public
        if img_path != webp_full_path and os.path.exists(img_path):
            os.remove(img_path)

        print(f"Converted: {rel_path} ({orig_size/1024:.1f} KB -> {webp_size/1024:.1f} KB, -{(1 - webp_size/orig_size)*100:.1f}%)")
    except Exception as e:
        print(f"Error converting {img_path}: {e}")

saved_bytes = total_orig_bytes - total_webp_bytes
print(f"\nTotal Original Storage: {total_orig_bytes / (1024*1024):.2f} MB")
print(f"Total WebP Storage: {total_webp_bytes / (1024*1024):.2f} MB")
print(f"Storage Saved: {saved_bytes / (1024*1024):.2f} MB ({(saved_bytes/total_orig_bytes)*100:.1f}% reduction!)")

# 3. Update all code references
SRC_DIR = 'src'
INDEX_HTML = 'index.html'

code_files = [INDEX_HTML]
for root, dirs, files in os.walk(SRC_DIR):
    for f in files:
        if f.endswith(('.jsx', '.js', '.css', '.html')):
            code_files.append(os.path.join(root, f))

updated_files_count = 0
for cfile in code_files:
    with open(cfile, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = content
    # Replace all occurrences sorted by longest path first to prevent partial replacements
    for old_path, new_path in sorted(conversion_map.items(), key=lambda x: len(x[0]), reverse=True):
        if old_path in modified:
            modified = modified.replace(old_path, new_path)

    if modified != content:
        with open(cfile, 'w', encoding='utf-8') as f:
            f.write(modified)
        updated_files_count += 1
        print(f"Updated references in: {cfile}")

print(f"\nUpdated asset references in {updated_files_count} source files.")

