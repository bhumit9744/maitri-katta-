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
  await page.setViewport({ width: 1440, height: 1000 });

  let baseUrl = 'http://localhost:5174';
  try {
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  } catch (e) {
    baseUrl = 'http://localhost:5173';
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  }

  await new Promise(r => setTimeout(r, 2000));

  // Scroll to .brand-story-fluid-section
  await page.evaluate(() => {
    const el = document.querySelector('.brand-story-fluid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });

  await new Promise(r => setTimeout(r, 1200));

  // 1. Capture the Brand Story banner and upper content
  await page.screenshot({
    path: path.join(__dirname, '../artifacts-brand-story-banner.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 } // current viewport
  });

  // 2. Also take a full viewport screenshot
  await page.screenshot({
    path: path.join(__dirname, '../artifacts-brand-story-viewport.png')
  });

  await browser.close();
  console.log('Brand story screenshots captured!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
