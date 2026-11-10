const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:\\Users\\gupta\\.gemini\\antigravity\\brain\\f1a3423e-d24f-4c45-9a97-2854e9596c40';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const failedRequests = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', (req) => {
    // ignore favicon or analytics if any
    failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });

  const testResults = {
    pages: {},
    interactions: {},
    consoleErrors: [],
    failedRequests: [],
    metrics: {}
  };

  const pagesToTest = [
    { name: 'Home', url: 'http://localhost:5174/' },
    { name: 'Menu', url: 'http://localhost:5174/menu' },
    { name: 'About', url: 'http://localhost:5174/about' },
    { name: 'Gallery', url: 'http://localhost:5174/gallery' },
    { name: 'Contact', url: 'http://localhost:5174/contact' },
  ];

  // 1. Test each route
  for (const p of pagesToTest) {
    console.log(`Testing ${p.name} at ${p.url}...`);
    await page.setViewport({ width: 1440, height: 900 });
    
    const startTime = Date.now();
    const response = await page.goto(p.url, { waitUntil: 'networkidle0' });
    const loadTime = Date.now() - startTime;

    const status = response ? response.status() : 0;
    
    // Performance metrics
    const perfTiming = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : 0,
        loadEvent: nav ? Math.round(nav.loadEventEnd - nav.startTime) : 0,
        domInteractive: nav ? Math.round(nav.domInteractive - nav.startTime) : 0
      };
    });

    testResults.pages[p.name] = {
      status,
      loadTimeMs: loadTime,
      perfTiming
    };

    // Capture desktop screenshot
    const screenshotPath = path.join(ARTIFACTS_DIR, `final_verify_${p.name.toLowerCase()}_desktop.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    // Capture mobile screenshot
    await page.setViewport({ width: 390, height: 844 });
    const mobScreenshotPath = path.join(ARTIFACTS_DIR, `final_verify_${p.name.toLowerCase()}_mobile.png`);
    await page.screenshot({ path: mobScreenshotPath, fullPage: false });
  }

  // 2. Test Menu Search & Filter Interaction
  console.log('Testing Menu Search & Filters...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5174/menu', { waitUntil: 'networkidle0' });

  const searchInput = await page.$('input[type="text"]');
  if (searchInput) {
    await searchInput.type('Lapeta');
    await new Promise(r => setTimeout(r, 300));
    const searchMatchCount = await page.evaluate(() => {
      return document.querySelectorAll('.living-stage-content, .living-category-section, article').length;
    });
    testResults.interactions.menuSearch = { query: 'Lapeta', matchedSections: searchMatchCount };
    await searchInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
  }

  // 3. Test Add-to-Cart & Quantity Change
  console.log('Testing Cart Interactions...');
  const addBtn = await page.$('.btn-dish-add, .living-add-btn, button[class*="add"]');
  if (addBtn) {
    await addBtn.click();
    await new Promise(r => setTimeout(r, 400));
    testResults.interactions.addToCartClicked = true;
  }

  // Open Cart Drawer
  const cartTrigger = await page.$('.navbar-cart-trigger');
  if (cartTrigger) {
    await cartTrigger.click();
    await new Promise(r => setTimeout(r, 500));
    const isDrawerVisible = await page.evaluate(() => {
      return !!document.querySelector('.cart-drawer-panel');
    });
    testResults.interactions.cartDrawerOpened = isDrawerVisible;

    // Capture drawer screenshot
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'final_verify_cart_drawer.png')
    });
  }

  // 4. Test Gallery Lightbox
  console.log('Testing Gallery Lightbox...');
  await page.goto('http://localhost:5174/gallery', { waitUntil: 'networkidle0' });
  const galleryFrame = await page.$('.gallery-editorial-frame');
  if (galleryFrame) {
    await galleryFrame.click();
    await new Promise(r => setTimeout(r, 400));
    const isLightboxVisible = await page.evaluate(() => {
      return !!document.querySelector('.editorial-lightbox-backdrop');
    });
    testResults.interactions.galleryLightboxOpened = isLightboxVisible;

    // Capture Lightbox screenshot
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'final_verify_gallery_lightbox.png')
    });

    // Close lightbox with Escape
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 300));
  }

  // 5. Test Contact Page FAQ Accordion
  console.log('Testing Contact FAQ Accordion...');
  await page.goto('http://localhost:5174/contact', { waitUntil: 'networkidle0' });
  const faqItem = await page.$('.faq-accordion-item, .contact-faq-item, button[class*="faq"]');
  if (faqItem) {
    await faqItem.click();
    await new Promise(r => setTimeout(r, 300));
    testResults.interactions.contactFaqToggled = true;
  }

  testResults.consoleErrors = consoleErrors;
  testResults.failedRequests = failedRequests;

  console.log('\n--- FINAL TEST RESULTS ---');
  console.log(JSON.stringify(testResults, null, 2));

  fs.writeFileSync(
    path.join(ARTIFACTS_DIR, 'FINAL_E2E_TEST_RESULTS.json'),
    JSON.stringify(testResults, null, 2)
  );

  await browser.close();
  console.log('E2E testing completed successfully!');
})();

