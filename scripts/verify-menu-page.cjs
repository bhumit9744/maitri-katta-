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
  await page.setViewport({ width: 1440, height: 950 });

  let baseUrl = 'http://localhost:5174';
  try {
    await page.goto(`${baseUrl}/menu`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  } catch (e) {
    baseUrl = 'http://localhost:5173';
    await page.goto(`${baseUrl}/menu`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  }

  console.log('Connected to', baseUrl + '/menu');
  await new Promise(r => setTimeout(r, 2000));

  // 1. Menu Cover
  await page.screenshot({
    path: path.join(__dirname, '../artifacts-menu-cover.png')
  });
  console.log('Saved artifacts-menu-cover.png');

  // 2. Scroll to Agri Specials (Category with signature spotlight & dotted leader rows)
  await page.evaluate(() => {
    const el = document.getElementById('category-agri');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1200));

  // Add a dish to cart from the page so floating cart appears
  const addBtn = await page.$('.btn-spotlight-add');
  if (addBtn) {
    await addBtn.click();
    console.log('Clicked Add to Order on Spotlight');
  }
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(__dirname, '../artifacts-menu-agri-spotlight.png')
  });
  console.log('Saved artifacts-menu-agri-spotlight.png');

  // 3. Scroll further to Biryani & Tandoor
  await page.evaluate(() => {
    const el = document.getElementById('category-biryani');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(__dirname, '../artifacts-menu-biryani.png')
  });
  console.log('Saved artifacts-menu-biryani.png');

  // 4. Mobile View (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${baseUrl}/menu`, { waitUntil: 'domcontentloaded', timeout: 5000 });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll a bit down on mobile
  await page.evaluate(() => window.scrollBy(0, 350));
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(__dirname, '../artifacts-menu-mobile.png')
  });
  console.log('Saved artifacts-menu-mobile.png');

  await browser.close();
  console.log('All menu verification screenshots captured successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
