import sys
from PIL import Image
from collections import deque

input_path = r"C:\Users\gupta\.gemini\antigravity\brain\f1a3423e-d24f-4c45-9a97-2854e9596c40\retro_bollywood_maharashtrian_thali_1793901577964.jpg"
output_path = r"d:\maitri\public\assets\maharashtrian-thali-illustration.png"

img = Image.open(input_path).convert("RGBA")
width, height = img.size

visited = bytearray(width * height)
queue = deque()
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
    pixels[cx, cy] = (0, 0, 0, 0)
    for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
        if 0 <= nx < width and 0 <= ny < height:
            idx = ny * width + nx
            if not visited[idx]:
                r, g, b, a = pixels[nx, ny]
                if r > 235 and g > 235 and b > 235:
                    visited[idx] = 1
                    queue.append((nx, ny))

img.save(output_path, "PNG")
print(f"Saved transparent thali illustration to {output_path}")

