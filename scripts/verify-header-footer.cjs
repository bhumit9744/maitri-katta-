const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  let baseUrl = 'http://localhost:5174';
  try {
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  } catch (e) {
    baseUrl = 'http://localhost:5173';
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  }

  console.log('Connected to', baseUrl + '/');
  await new Promise(r => setTimeout(r, 2000));

  // 1. Cinematic Header at top of page (transparent over hero)
  await page.screenshot({
    path: path.join(__dirname, '../artifacts-header-top.png'),
    clip: { x: 0, y: 0, width: 1440, height: 180 }
  });
  console.log('Saved artifacts-header-top.png');

  // 2. Cinematic Header when scrolled
  await page.evaluate(() => window.scrollBy(0, 300));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(__dirname, '../artifacts-header-scrolled.png'),
    clip: { x: 0, y: 0, width: 1440, height: 180 }
  });
  console.log('Saved artifacts-header-scrolled.png');

  // 3. Grand Finale Footer
  await page.evaluate(() => {
    const footer = document.querySelector('.grand-finale-footer');
    if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({
    path: path.join(__dirname, '../artifacts-footer-finale-hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });
  console.log('Saved artifacts-footer-finale-hero.png');

  // Scroll a bit more to capture the theatre marquee & cinema credits
  await page.evaluate(() => window.scrollBy(0, 750));
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(__dirname, '../artifacts-footer-credits.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('Saved artifacts-footer-credits.png');

  // 4. Mobile Header (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({
    path: path.join(__dirname, '../artifacts-header-mobile.png'),
    clip: { x: 0, y: 0, width: 390, height: 150 }
  });
  console.log('Saved artifacts-header-mobile.png');

  await browser.close();
  console.log('All verification screenshots captured!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

