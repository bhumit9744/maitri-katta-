import cv2
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

def generate_crystal_clear_mudra():
    # Load composite clean
    img = cv2.imread('C:/Users/gupta/.gemini/antigravity/brain/f1a3423e-d24f-4c45-9a97-2854e9596c40/comp_clean1.png')
    h, w, c = img.shape

    # 1. Background segmentation
    b, g, r = img[:, :, 0], img[:, :, 1], img[:, :, 2]
    # In pure yellow background: B is very low (< 35), R > 210, G > 165
    is_yellow = (b < 38) & (r > 200) & (g > 155)

    # Clean the small rectangular artifact on the right at x in [460, 500], y in [440, 520]
    for y in range(430, 530):
        for x in range(460, 510):
            is_yellow[y, x] = True

    # Build initial alpha mask (255 for foreground, 0 for background)
    alpha = (~is_yellow).astype(np.uint8) * 255

    # Connected components: keep the hand, bangles, and all falling spices
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(alpha)
    # The hand is the largest component
    # Spices are smaller components on the left (x < 250, y in [250, 600])
    cleaned_alpha = np.zeros_like(alpha)
    for i in range(1, num_labels):
        area = stats[i, cv2.CC_STAT_AREA]
        cx, cy = centroids[i]
        # Keep hand (area > 5000) or spice specks on left (cx < 260 and cy > 250 and area >= 4)
        if area > 1000 or (cx < 260 and 250 <= cy <= 600 and area >= 4):
            cleaned_alpha[labels == i] = 255

    # Inside the pinch (between thumb and index finger), there is an inner loop:
    # In is_fg.png, the hole inside the pinch is already black (alpha = 0), which is correct!
    
    # 2. Line art enhancement & noise reduction
    # Bilateral filter on the RGB image to smooth compression artifacts while keeping sharp edges
    smoothed = cv2.bilateralFilter(img, d=7, sigmaColor=75, sigmaSpace=75)
    
    # Color regions:
    # Alta: Crimson red (high R, low G, low B, hue in [170..180] or [0..10])
    hsv = cv2.cvtColor(smoothed, cv2.COLOR_BGR2HSV)
    H, S, V = hsv[:, :, 0], hsv[:, :, 1], hsv[:, :, 2]
    
    is_alta = ((H < 10) | (H > 165)) & (S > 120) & (V > 100) & (cleaned_alpha > 0)
    
    # Black line art: low V or low brightness
    gray = cv2.cvtColor(smoothed, cv2.COLOR_BGR2GRAY)
    is_line = (gray < 85) & (cleaned_alpha > 0)
    
    # Gold bangles:
    is_bangle = (H >= 12) & (H <= 28) & (S > 70) & (V > 120) & (cleaned_alpha > 0) & (~is_alta) & (~is_line)
    
    # Skin: remaining foreground
    is_skin = (cleaned_alpha > 0) & (~is_alta) & (~is_line) & (~is_bangle)

    # Create enhanced RGB
    result_rgb = smoothed.copy()
    
    # 3. Enhance Alta: rich Indian crimson with clean vibrancy
    # Target Alta crimson: BGR [28, 25, 206] -> #CE191C
    result_rgb[is_alta] = cv2.addWeighted(result_rgb[is_alta], 0.3, np.full_like(result_rgb[is_alta], [28, 25, 206]), 0.7, 0)
    
    # 4. Enhance Black lines: deep clean charcoal #1A120B -> BGR [11, 18, 26]
    result_rgb[is_line] = cv2.addWeighted(result_rgb[is_line], 0.2, np.full_like(result_rgb[is_line], [11, 18, 26]), 0.8, 0)

    # 5. Enhance Bangles: lustrous golden ochre #F4D068 -> BGR [104, 208, 244]
    # only in the wrist area y in [470, 620], x in [320, 520]
    bangle_wrist = is_bangle & (np.arange(h)[:, None] >= 470) & (np.arange(w)[None, :] >= 310)
    result_rgb[bangle_wrist] = cv2.addWeighted(result_rgb[bangle_wrist], 0.4, np.full_like(result_rgb[bangle_wrist], [104, 208, 244]), 0.6, 0)

    # 6. Anti-aliasing of Alpha Mask
    # Smooth alpha slightly with Gaussian blur and contrast stretch for crystal-crisp vector edges
    alpha_float = cleaned_alpha.astype(np.float32) / 255.0
    alpha_blurred = cv2.GaussianBlur(alpha_float, (3, 3), 0.6)
    alpha_final = np.clip((alpha_blurred - 0.2) / 0.6, 0.0, 1.0)
    alpha_uint8 = (alpha_final * 255).astype(np.uint8)

    # Combine into 4-channel RGBA
    rgba = cv2.merge([result_rgb[:, :, 0], result_rgb[:, :, 1], result_rgb[:, :, 2], alpha_uint8])

    # Convert to PIL Image for high-definition 2x upscaling and unsharp masking
    pil_rgba = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))
    
    # 2x upscale using Lanczos for razor sharp definition
    new_w = w * 2
    new_h = h * 2
    pil_hires = pil_rgba.resize((new_w, new_h), resample=Image.Resampling.LANCZOS)
    
    # Apply subtle unsharp mask to crisp up pop-art lines
    pil_hires_rgb = pil_hires.convert('RGB').filter(ImageFilter.UnsharpMask(radius=1.5, percent=150, threshold=2))
    # Keep the pristine hires alpha
    pil_hires.paste(pil_hires_rgb, (0, 0), mask=pil_hires.split()[3])

    # Save test outputs
    pil_rgba.save('C:/Users/gupta/.gemini/antigravity/brain/f1a3423e-d24f-4c45-9a97-2854e9596c40/clean_mudra_1x.png')
    pil_hires.save('C:/Users/gupta/.gemini/antigravity/brain/f1a3423e-d24f-4c45-9a97-2854e9596c40/clean_mudra_hires.png')
    print('Clean mudra outputs generated!')

generate_crystal_clear_mudra()

