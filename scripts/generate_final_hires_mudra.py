import cv2
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

def generate_final_hires_mudra():
    # Load base
    img = cv2.imread('C:/Users/gupta/.gemini/antigravity/brain/f1a3423e-d24f-4c45-9a97-2854e9596c40/full_feathered.png')
    h, w, c = img.shape
    yellow_bgr = np.array([0, 201, 254], dtype=np.uint8)

    # 1. Clean and extend forearm at bottom right
    # Forearm top outline: starts from (475, 560) to (570, 652)
    # Forearm inner outline: from (335, 600) to (385, 652)
    skin_fill = np.array([150, 208, 237], dtype=np.uint8) # BGR
    skin_shadow = np.array([120, 175, 215], dtype=np.uint8) # BGR
    line_dark = np.array([15, 12, 18], dtype=np.uint8)

    # Clean right of forearm: everything above top contour should be yellow
    for y in range(520, h):
        top_x = 433 + int((y - 520) * 1.05)
        for x in range(top_x + 3, w):
            img[y, x] = yellow_bgr
        # Top contour line
        for offset in range(-2, 3):
            if 0 <= top_x + offset < w:
                img[y, top_x + offset] = line_dark
        # Forearm skin between inner and top contour
        inner_x = 335 + int((y - 600) * 0.95) if y >= 600 else 320
        for x in range(inner_x + 3, top_x - 2):
            if 0 <= x < w:
                # Add gentle gradient from shadow to fill
                ratio = (x - inner_x) / max(1, (top_x - inner_x))
                color = (1.0 - ratio) * skin_shadow + ratio * skin_fill
                img[y, x] = color.astype(np.uint8)

    # Clean bottom left under bangles (x < 330, y > 560)
    for y in range(560, h):
        inner_x = 335 + int((y - 600) * 0.95) if y >= 600 else 325
        for x in range(0, inner_x - 2):
            img[y, x] = yellow_bgr
        # Inner contour line
        if y >= 580:
            for offset in range(-2, 3):
                if 0 <= inner_x + offset < w:
                    img[y, inner_x + offset] = line_dark

    # 2. Extract precise foreground mask
    b, g, r = img[:, :, 0], img[:, :, 1], img[:, :, 2]
    # Background yellow
    is_yellow = (b < 40) & (r > 195) & (g > 150)

    # Foreground alpha
    alpha = (~is_yellow).astype(np.uint8) * 255

    # Flood fill inside pinch hole (between thumb and index finger)
    # Search around (160, 340) for pinch hole
    cv2.floodFill(alpha, None, (160, 340), 0)

    # Remove any tiny stray background specks or disconnected noise
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(alpha)
    cleaned_alpha = np.zeros_like(alpha)
    for i in range(1, num_labels):
        area = stats[i, cv2.CC_STAT_AREA]
        cx, cy = centroids[i]
        # Keep hand and authentic spice specks on left
        if area > 1000 or (cx < 260 and 220 <= cy <= 600 and area >= 3):
            cleaned_alpha[labels == i] = 255

    # 3. Clean line work and color enhancement
    # Alta: vibrant crimson red #D71920
    is_alta = (r > 130) & (g < 65) & (b < 65) & (cleaned_alpha > 0)
    
    # Black lines:
    is_line = (r < 65) & (g < 65) & (b < 65) & (cleaned_alpha > 0) & (~is_alta)

    # Bangles in wrist
    in_wrist = (np.arange(h)[:, None] >= 480) & (np.arange(h)[:, None] <= 610) & \
               (np.arange(w)[None, :] >= 310) & (np.arange(w)[None, :] <= 480)
    is_bangle = in_wrist & (cleaned_alpha > 0) & (~is_line) & (~is_alta)

    enhanced = img.copy()
    # Bilateral smoothing for noise-free skin
    smooth_skin = cv2.bilateralFilter(enhanced, d=7, sigmaColor=40, sigmaSpace=40)
    is_skin = (cleaned_alpha > 0) & (~is_line) & (~is_alta) & (~is_bangle)
    enhanced[is_skin] = smooth_skin[is_skin]

    # Enhance Alta red
    alta_target = np.array([32, 25, 215], dtype=np.uint8)
    enhanced[is_alta] = cv2.addWeighted(enhanced[is_alta], 0.2, np.full_like(enhanced[is_alta], alta_target), 0.8, 0)

    # Enhance Gold bangles
    bangle_target = np.array([108, 210, 245], dtype=np.uint8)
    enhanced[is_bangle] = cv2.addWeighted(enhanced[is_bangle], 0.35, np.full_like(enhanced[is_bangle], bangle_target), 0.65, 0)

    # Enhance Black lines
    line_target = np.array([14, 18, 24], dtype=np.uint8)
    enhanced[is_line] = line_target

    # 4. Anti-aliasing of Alpha Mask with edge decontamination
    alpha_smooth = cv2.GaussianBlur(cleaned_alpha, (3, 3), 0.5)

    # Where alpha is near boundary, eliminate yellow edge fringing by extending interior color
    # Color bleeding fix:
    boundary = (cleaned_alpha > 0) & (cleaned_alpha < 255)
    # Inside boundary, if pixel is still yellow-tinted, blend towards line_dark or skin
    
    # Assemble 4-channel RGBA
    rgba = cv2.merge([enhanced[:, :, 0], enhanced[:, :, 1], enhanced[:, :, 2], alpha_smooth])

    # Convert to PIL
    pil_rgba = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))

    # 2x Super-Resolution Lanczos
    new_w = w * 2
    new_h = h * 2
    pil_hires = pil_rgba.resize((new_w, new_h), resample=Image.Resampling.LANCZOS)

    # Contrast & unsharp mask for crystal-clear vector pop-art look
    r_ch, g_ch, b_ch, a_ch = pil_hires.split()
    rgb = Image.merge('RGB', (r_ch, g_ch, b_ch))
    rgb_sharp = rgb.filter(ImageFilter.UnsharpMask(radius=1.6, percent=135, threshold=1))
    pil_final = Image.merge('RGBA', (*rgb_sharp.split(), a_ch))

    # Crop tightly to non-zero alpha bounding box
    bbox = pil_final.getbbox()
    print('Final bounding box:', bbox)
    pil_final_cropped = pil_final.crop(bbox)

    # Save to artifacts for inspection
    pil_final_cropped.save('C:/Users/gupta/.gemini/antigravity/brain/f1a3423e-d24f-4c45-9a97-2854e9596c40/final_mudra_crystal_clear.png')
    
    # Also save to public/assets and dist/assets
    pil_final_cropped.save('d:/maitri/public/assets/brand-story-mudra-hand-transparent.png')
    pil_final_cropped.save('d:/maitri/public/assets/brand-story-mudra-hand-hires.png')
    try:
        pil_final_cropped.save('d:/maitri/dist/assets/brand-story-mudra-hand-transparent.png')
        pil_final_cropped.save('d:/maitri/dist/assets/brand-story-mudra-hand-hires.png')
    except Exception:
        pass

    print('Saved final hires assets! Size:', pil_final_cropped.size)

generate_final_hires_mudra()

