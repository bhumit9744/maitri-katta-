import puppeteer from 'puppeteer-core';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US,en']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  const queryUrl = 'https://www.google.com/maps/search/Maitri+Katta+Family+Garden+Restaurant+Ambernath';
  console.log('Navigating to:', queryUrl);
  await page.goto(queryUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // Look for any button containing "Review" or tab with "Reviews"
  const clicked = await page.evaluate(() => {
    const allButtons = Array.from(document.querySelectorAll('button'));
    const reviewBtn = allButtons.find(b => b.innerText && b.innerText.toLowerCase().includes('review'));
    if (reviewBtn) {
      reviewBtn.click();
      return reviewBtn.innerText;
    }
    return null;
  });
  console.log('Clicked review button/tab:', clicked);

  await new Promise(r => setTimeout(r, 3000));

  // Scroll the review container
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => {
      const scrollable = document.querySelector('div.m6QErb.DxyBCb.kA9KIf.dS8AEf') || document.querySelector('div.m6QErb[aria-label]');
      if (scrollable) {
        scrollable.scrollTop += 1000;
      } else {
        window.scrollBy(0, 800);
      }
    });
    await new Promise(r => setTimeout(r, 1000));
  }

  // Extract all review items
  const reviews = await page.evaluate(() => {
    const result = [];
    const reviewCards = document.querySelectorAll('div.jftiEf');
    reviewCards.forEach(card => {
      const name = card.querySelector('div.d4r55')?.innerText?.trim() || '';
      const meta = card.querySelector('div.RfnDt')?.innerText?.trim() || '';
      const ratingLabel = card.querySelector('span.kvMYJc')?.getAttribute('aria-label') || '';
      const time = card.querySelector('span.rsqaWe')?.innerText?.trim() || '';
      const text = card.querySelector('span.wiI7pd')?.innerText?.trim() || '';
      
      if (name) {
        result.push({ name, meta, rating: ratingLabel, time, text });
      }
    });
    return result;
  });

  console.log(`Found ${reviews.length} reviews:`);
  console.log(JSON.stringify(reviews.slice(0, 10), null, 2));

  fs.writeFileSync('scripts/google_reviews_extracted.json', JSON.stringify(reviews, null, 2));

  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});

