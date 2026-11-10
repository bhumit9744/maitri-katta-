import puppeteer from 'puppeteer-core';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  await page.goto('https://www.google.com/maps/place/Maitri+katta+Family+Garden+Restaurant/@19.18872,73.20815,17z', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));

  await page.screenshot({ path: 'scripts/gmaps_screenshot.png' });
  const html = await page.content();
  fs.writeFileSync('scripts/gmaps_page.html', html.slice(0, 50000));
  
  // Find all text nodes or clickable elements
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, div[role="tab"], a')).map(el => ({
      tag: el.tagName,
      role: el.getAttribute('role'),
      ariaLabel: el.getAttribute('aria-label'),
      text: el.innerText.slice(0, 50)
    })).filter(b => b.text || b.ariaLabel);
  });
  
  console.log('Interactive elements:', buttons.slice(0, 30));
  await browser.close();
})();

