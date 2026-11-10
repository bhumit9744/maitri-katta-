import urllib.request
import re

url = 'https://www.google.com/maps/search/Maitri+Katta+Family+Garden+Restaurant+Ambernath'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        print(f"Fetched {len(content)} bytes")
        # Find any text mentions of reviews or ratings
        matches = re.findall(r'(\d\.\d)\s*stars|\b4\.[0-2]\b|reviews?', content, re.IGNORECASE)
        print("Sample matches:", matches[:10])
except Exception as e:
    print("Fetch error:", e)

