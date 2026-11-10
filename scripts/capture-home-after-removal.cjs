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

  // 1. Hero + Transition
  await page.screenshot({
    path: path.join(__dirname, '../artifacts-home-hero-transition.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1100 }
  });
  console.log('Saved artifacts-home-hero-transition.png');

  // 2. Next viewport down (Food showcase)
  await page.evaluate(() => window.scrollTo(0, 900));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(__dirname, '../artifacts-home-food-showcase.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1000 }
  });
  console.log('Saved artifacts-home-food-showcase.png');

  await browser.close();
  console.log('Homepage verification screenshots captured successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

