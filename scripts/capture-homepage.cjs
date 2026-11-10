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
    await page.goto(`${baseUrl}/about`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  } catch (e) {
    baseUrl = 'http://localhost:5173';
    await page.goto(`${baseUrl}/about`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  }

  console.log('Connected to', baseUrl + '/about');
  await new Promise(r => setTimeout(r, 2000));

  // 1. About Split Hero (First 950px height)
  await page.screenshot({
    path: path.join(__dirname, '../artifacts-about-split-hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 }
  });
  console.log('Saved artifacts-about-split-hero.png');

  // 2. Full Page About Screenshot
  await page.screenshot({
    path: path.join(__dirname, '../artifacts-about-full-page.png'),
    fullPage: true
  });
  console.log('Saved artifacts-about-full-page.png');

  // 3. Mobile View (/about on 390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${baseUrl}/about`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({
    path: path.join(__dirname, '../artifacts-about-mobile.png'),
    clip: { x: 0, y: 0, width: 390, height: 1100 }
  });
  console.log('Saved artifacts-about-mobile.png');

  await browser.close();
  console.log('All about page screenshots captured successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
