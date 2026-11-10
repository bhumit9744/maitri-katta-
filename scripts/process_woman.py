import sys
from PIL import Image, ImageFilter

input_path = r"C:\Users\gupta\.gemini\antigravity\brain\f1a3423e-d24f-4c45-9a97-2854e9596c40\bollywood_cartoon_woman_1793901472356.jpg"
output_path = r"d:\maitri\public\assets\cartoon-woman.png"

img = Image.open(input_path).convert("RGBA")
width, height = img.size

# Flood fill transparency from outside boundary (0,0) so internal white (teeth, eyes, ornaments) stays intact!
from collections import deque

visited = bytearray(width * height)
queue = deque()

# Add all outer border pixels that are near-white (> 240)
pixels = img.load()

for x in range(width):
    for y in [0, height - 1]:
        r, g, b, a = pixels[x, y]
        if r > 235 and g > 235 and b > 235:
            queue.append((x, y))
            visited[y * width + x] = 1

for y in range(height):
    for x in [0, width - 1]:
        if not visited[y * width + x]:
            r, g, b, a = pixels[x, y]
            if r > 235 and g > 235 and b > 235:
                queue.append((x, y))
                visited[y * width + x] = 1

while queue:
    cx, cy = queue.popleft()
    # Set transparent
    pixels[cx, cy] = (0, 0, 0, 0)
    
    for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
        if 0 <= nx < width and 0 <= ny < height:
            idx = ny * width + nx
            if not visited[idx]:
                r, g, b, a = pixels[nx, ny]
                # Threshold for background white / near-white off-white
                if r > 235 and g > 235 and b > 235:
                    visited[idx] = 1
                    queue.append((nx, ny))

img.save(output_path, "PNG")
print(f"Saved transparent cartoon woman to {output_path}")

