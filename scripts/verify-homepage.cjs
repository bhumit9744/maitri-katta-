const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function verifyHomepage() {
  console.log('🚀 Starting Maitri Katta 2.0 Homepage Comprehensive QA...\n');

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

  // TEST 1: DESKTOP HOMEPAGE
  console.log('1️⃣ Testing Desktop Viewport (1440x900)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });

  // Check Page Title
  const title = await page.title();
  console.log(`   ✓ Page title: "${title}"`);

  // Section 01: Hero Checks
  const heroLines = await page.$$eval('.hero-headline-line', lines => lines.map(el => el.textContent.trim()));
  console.log(`   ✓ Hero headline lines: ${JSON.stringify(heroLines)}`);

  const heroSubcopy = await page.$eval('.hero-editorial-subcopy', el => el.textContent.trim());
  console.log(`   ✓ Hero subcopy: "${heroSubcopy}"`);

  const heroVideo = await page.$('.hero-video-element');
  console.log(`   ✓ Hero video element present: ${!!heroVideo}`);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_01_hero_desktop.png') });

  // Section 02: Bollywood Campaign
  console.log('\n2️⃣ Testing Section 02 — Bollywood Campaign...');
  const campaignHeadline = await page.$eval('.campaign-giant-headline', el => el.textContent.trim());
  const campaignSubcopy = await page.$eval('.campaign-subcopy', el => el.textContent.trim());
  console.log(`   ✓ Campaign headline: "${campaignHeadline}"`);
  console.log(`   ✓ Campaign subcopy: "${campaignSubcopy}"`);

  const cartoonWoman = await page.$('.cartoon-woman-img');
  const thaliImg = await page.$('.illustrated-thali-img');
  const muralImg = await page.$('.restaurant-mural-photo');
  console.log(`   ✓ Cartoon woman illustration present: ${!!cartoonWoman}`);
  console.log(`   ✓ Illustrated thali present: ${!!thaliImg}`);
  console.log(`   ✓ Restaurant wall mural photo present: ${!!muralImg}`);

  // Scroll to Section 02
  await page.evaluate(() => {
    document.querySelector('.bollywood-campaign-section').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_02_bollywood_campaign.png') });

  // Section 03: Food Showcase & Add to Cart
  console.log('\n3️⃣ Testing Section 03 — Food Showcase...');
  const foodHeadline = await page.$eval('.section-main-headline', el => el.textContent.trim());
  console.log(`   ✓ Food headline: "${foodHeadline}"`);

  const dishes = await page.$$eval('.editorial-dish-item', items => items.map(item => {
    const name = item.querySelector('.dish-headline-title')?.textContent.trim();
    const price = item.querySelector('.dish-exact-price')?.textContent.trim();
    return { name, price };
  }));
  console.log(`   ✓ Featured dishes displayed: ${dishes.length}`);
  dishes.forEach((d, i) => console.log(`     ${i + 1}. ${d.name} — ${d.price}`));

  // Click Add to Order on first dish (Mutton Lapeta)
  const addButtons = await page.$$('.btn-add-dish');
  if (addButtons.length > 0) {
    await addButtons[0].click();
    console.log('   ✓ Clicked "ADD TO ORDER" on dish 1');
    await new Promise(r => setTimeout(r, 400));
  }
  if (addButtons.length > 1) {
    await addButtons[1].click();
    console.log('   ✓ Clicked "ADD TO ORDER" on dish 2');
    await new Promise(r => setTimeout(r, 400));
  }

  // Check Cart Badge
  const badgeCount = await page.$eval('.cart-badge', el => el.textContent.trim());
  console.log(`   ✓ Cart badge count updated to: ${badgeCount}`);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_03_food_showcase.png') });

  // Section 04: Restaurant Experience
  console.log('\n4️⃣ Testing Section 04 — Restaurant Experience...');
  await page.evaluate(() => {
    document.querySelector('.experience-editorial-section').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  const expPanes = await page.$$('.mosaic-pane');
  console.log(`   ✓ Authentic experience mosaic panes: ${expPanes.length}`);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_04_experience.png') });

  // Section 05: Brand Story
  console.log('\n5️⃣ Testing Section 05 — Brand Story...');
  await page.evaluate(() => {
    document.querySelector('.brand-story-section').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  const storyHeadline = await page.$eval('.story-bold-headline', el => el.textContent.trim());
  console.log(`   ✓ Story headline: "${storyHeadline}"`);
  const stationImg = await page.$('.station-woodcut-img');
  console.log(`   ✓ Ambernath station artwork present: ${!!stationImg}`);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_05_brand_story.png') });

  // Section 06: Location & Contact
  console.log('\n6️⃣ Testing Section 06 — Location & Contact...');
  await page.evaluate(() => {
    document.querySelector('.location-section').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  const locHeadline = await page.$eval('.location-headline', el => el.textContent.trim().replace(/\s+/g, ' '));
  const locAddress = await page.$eval('.address-full', el => el.textContent.trim());
  const locHours = await page.$eval('.hours-highlight', el => el.textContent.trim());
  console.log(`   ✓ Location headline: "${locHeadline}"`);
  console.log(`   ✓ Address: "${locAddress}"`);
  console.log(`   ✓ Hours: "${locHours}"`);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_06_location.png') });

  // Footer Check
  console.log('\n7️⃣ Testing Footer...');
  await page.evaluate(() => {
    document.querySelector('.main-footer').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  const footerLinks = await page.$$eval('.footer-link-list a', links => links.map(l => l.textContent.trim()));
  console.log(`   ✓ Footer navigation links: ${JSON.stringify(footerLinks)}`);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_07_footer.png') });

  // Full Page Desktop Screenshot
  console.log('\n📸 Capturing full-length desktop page screenshot...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_full_desktop.png'), fullPage: true });

  // TEST 8: MOBILE VIEWPORT (390x844 - iPhone 14 / modern phone)
  console.log('\n8️⃣ Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Check mobile hamburger
  const hamburger = await page.$('.mobile-hamburger-btn');
  console.log(`   ✓ Mobile hamburger toggle present: ${!!hamburger}`);
  if (hamburger) {
    await hamburger.click();
    console.log('   ✓ Clicked mobile hamburger toggle');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_mobile_nav_open.png') });
    // Close hamburger
    await hamburger.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // Full mobile screenshot
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_full_mobile.png'), fullPage: true });
  console.log('   ✓ Captured full mobile screenshot.');

  // Check Cart Drawer
  console.log('\n9️⃣ Testing Cart Drawer Opening & Navigation...');
  const cartBtn = await page.$('.header-cart-btn');
  if (cartBtn) {
    await cartBtn.click();
    await new Promise(r => setTimeout(r, 500));
    const drawer = await page.$('.cart-drawer-container');
    console.log(`   ✓ Cart drawer open: ${!!drawer}`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hp_cart_drawer_open.png') });
  }

  await browser.close();

  console.log('\n========================================');
  console.log(`🚨 Total Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach(err => console.error(err));
  } else {
    console.log('🎉 ZERO console errors detected!');
  }
  console.log('========================================\n');
}

verifyHomepage().catch(err => {
  console.error('QA Failed:', err);
  process.exit(1);
});

