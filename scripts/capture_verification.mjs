import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  // 1. Capture Menu Page with Agri signature dish
  console.log('Navigating to Menu...');
  await page.goto('http://localhost:5175/menu', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => window.scrollBy(0, 680));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'artifacts-menu-dishes-grid.png' });
  console.log('Saved artifacts-menu-dishes-grid.png');

  // 2. Capture Home Page Google Reviews Section
  console.log('Navigating to Home...');
  await page.goto('http://localhost:5175/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Scroll into the reviews section
  await page.evaluate(() => {
    const el = document.querySelector('.google-reviews-section');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.scrollBy(0, -90);
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'artifacts-home-reviews-viewport.png' });
  console.log('Saved artifacts-home-reviews-viewport.png');

  await browser.close();
  console.log('Done!');
})();
