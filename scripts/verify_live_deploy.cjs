const puppeteer = require('puppeteer-core');
const path = require('path');

const ARTIFACTS_DIR = 'C:\\Users\\gupta\\.gemini\\antigravity\\brain\\f1a3423e-d24f-4c45-9a97-2854e9596c40';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const routes = [
    { name: 'Home', url: 'https://maitri-katta-restaurant.netlify.app/' },
    { name: 'Menu', url: 'https://maitri-katta-restaurant.netlify.app/menu' },
    { name: 'About', url: 'https://maitri-katta-restaurant.netlify.app/about' },
    { name: 'Gallery', url: 'https://maitri-katta-restaurant.netlify.app/gallery' },
    { name: 'Contact', url: 'https://maitri-katta-restaurant.netlify.app/contact' },
  ];

  for (const r of routes) {
    console.log(`Checking live route: ${r.name} (${r.url})...`);
    const res = await page.goto(r.url, { waitUntil: 'networkidle0' });
    const status = res ? res.status() : 0;
    console.log(`Status: ${status}`);

    if (r.name === 'Home') {
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'live_netlify_home.png')
      });
    }
  }

  await browser.close();
  console.log('Live verification complete!');
})();

