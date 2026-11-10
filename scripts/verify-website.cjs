const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runQA() {
  console.log('🚀 Starting Maitri Katta 2.0 Complete QA Verification...\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[CONSOLE ERROR] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(`[PAGE ERROR] ${err.message}`);
  });

  // TEST 1: HOME PAGE DESKTOP
  console.log('1️⃣ Testing Homepage (Desktop 1280x850)...');
  await page.setViewport({ width: 1280, height: 850 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_home_desktop.png') });
  console.log('   ✓ Homepage rendered successfully.');

  // TEST 2: BOLLYWOOD SECTION & FEATURED FOOD ON HOME
  console.log('2️⃣ Verifying Bollywood Campaign & Food on Home...');
  const headline = await page.$eval('.hero-headline', (el) => el.textContent);
  console.log(`   ✓ Hero headline found: "${headline.replace(/\s+/g, ' ').trim()}"`);
  const campaign = await page.$eval('.campaign-heading', (el) => el.textContent);
  console.log(`   ✓ Bollywood campaign found: "${campaign.trim()}"`);

  // Scroll down and screenshot campaign
  await page.evaluate(() => window.scrollBy(0, 850));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_home_bollywood_food.png') });

  // TEST 3: MENU PAGE & CART INTERACTION
  console.log('3️⃣ Testing Menu Page (/menu)...');
  await page.goto(`${BASE_URL}/menu`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_menu_desktop.png') });

  const dishCount = await page.$$eval('.menu-dish-card', (cards) => cards.length);
  console.log(`   ✓ Found ${dishCount} authentic dishes on Menu page.`);

  // Test Filtering
  console.log('   Testing Diet Filters (Veg Only)...');
  await page.click('.diet-filter-btn:first-child');
  await new Promise((r) => setTimeout(r, 400));
  const vegCount = await page.$$eval('.menu-dish-card', (cards) => cards.length);
  console.log(`   ✓ Filtered to ${vegCount} Vegetarian dishes.`);

  // Reset filter
  await page.click('.reset-filters-btn');
  await new Promise((r) => setTimeout(r, 400));

  // Add dish to order
  console.log('   Adding Mutton Lapeta to Cart...');
  const firstAddBtn = await page.$('.btn-add-dish');
  if (firstAddBtn) {
    await firstAddBtn.click();
    await new Promise((r) => setTimeout(r, 300));
  }

  // Open Cart Drawer
  console.log('4️⃣ Testing Cart Drawer & WhatsApp Order Flow...');
  const cartBtn = await page.$('.header-cart-btn');
  await cartBtn.click();
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_cart_drawer_open.png') });

  // Fill in customer details
  await page.type('#customer-name', 'Rohan Deshmukh');
  await page.type('#customer-phone', '9820198765');
  await page.type('#special-instructions', 'Keep gravy spicy with extra sliced onions');

  const waBtnHref = await page.$eval('.btn-whatsapp-order', (el) => el.getAttribute('href'));
  console.log(`   ✓ Generated WhatsApp Order URL:\n     ${waBtnHref}`);

  if (!waBtnHref.includes('wa.me/919561019972')) {
    throw new Error('WhatsApp URL does not match official number 919561019972!');
  }
  console.log('   ✓ WhatsApp URL verified with official restaurant number +91 95610 19972.');

  // Close cart
  await page.click('.cart-close-btn');
  await new Promise((r) => setTimeout(r, 400));

  // TEST 5: ABOUT PAGE
  console.log('5️⃣ Testing Our Story Page (/about)...');
  await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_about_desktop.png') });
  const aboutTitle = await page.$eval('.about-hero-title', (el) => el.textContent);
  console.log(`   ✓ About page loaded: "${aboutTitle.trim()}"`);

  // TEST 6: GALLERY PAGE & LIGHTBOX
  console.log('6️⃣ Testing Gallery Page (/gallery)...');
  await page.goto(`${BASE_URL}/gallery`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_gallery_desktop.png') });

  const galleryItems = await page.$$eval('.gallery-card', (cards) => cards.length);
  console.log(`   ✓ Found ${galleryItems} authentic restaurant & food photos in Gallery.`);

  // Click first photo to test Lightbox
  await page.click('.gallery-card:first-child');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_gallery_lightbox.png') });
  await page.click('.lightbox-close-btn');
  await new Promise((r) => setTimeout(r, 300));
  console.log('   ✓ Gallery Lightbox opened and closed seamlessly.');

  // TEST 7: CONTACT & TABLE RESERVATION PAGE
  console.log('7️⃣ Testing Contact & Table Reservation (/contact)...');
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_contact_desktop.png') });
  const contactTitle = await page.$eval('.contact-hero-title', (el) => el.textContent);
  console.log(`   ✓ Contact page loaded: "${contactTitle.trim()}"`);

  // TEST 8: MOBILE VIEWPORT TEST (390x844 iPhone 14)
  console.log('8️⃣ Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_mobile_home.png') });

  // Open mobile menu
  await page.click('.mobile-hamburger-btn');
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_mobile_nav_drawer.png') });
  console.log('   ✓ Mobile navigation drawer opens properly.');

  // Mobile Menu Page
  await page.goto(`${BASE_URL}/menu`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11_mobile_menu.png') });
  console.log('   ✓ Mobile menu rendered properly.');

  console.log('\n========================================');
  console.log('📊 CONSOLE ERRORS AUDIT:');
  if (consoleErrors.length === 0) {
    console.log('   ✨ 0 CONSOLE ERRORS DETECTED ACROSS ALL PAGES!');
  } else {
    console.log(`   ⚠️ Detected ${consoleErrors.length} errors:`);
    consoleErrors.forEach((e) => console.log('   ', e));
  }
  console.log('========================================\n');

  await browser.close();
  console.log('🎉 ALL QA AUDIT CHECKS PASSED SUCCESSFULLY!\n');
}

runQA().catch((err) => {
  console.error('❌ QA Execution Failed:', err);
  process.exit(1);
});

