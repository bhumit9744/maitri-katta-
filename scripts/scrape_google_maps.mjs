import puppeteer from 'puppeteer-core';
import fs from 'fs';

(async () => {
  console.log('Launching Chrome to inspect Google Maps reviews...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US,en']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const queryUrl = 'https://www.google.com/maps/search/Maitri+Katta+Family+Garden+Restaurant+Ambernath';
  console.log('Navigating to:', queryUrl);
  await page.goto(queryUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));

  // Extract titles and ratings
  const pageData = await page.evaluate(() => {
    const title = document.querySelector('h1')?.innerText || document.title;
    const ratingText = document.querySelector('div.F7nice')?.innerText || '';
    
    // Find all review text elements if already on place page
    const reviewElements = Array.from(document.querySelectorAll('.jftiEf, .wiI7pd'));
    const reviews = reviewElements.map(el => el.innerText.trim()).filter(Boolean);

    return {
      title,
      ratingText,
      reviewsCount: reviews.length,
      sampleReviews: reviews.slice(0, 10),
      bodyTextSnippet: document.body.innerText.slice(0, 1500)
    };
  });

  console.log('Extracted Data:', JSON.stringify(pageData, null, 2));

  // If there are place search results, click on the first result
  const firstResult = await page.$('a[href*="/maps/place/"]');
  if (firstResult) {
    console.log('Clicking first place result...');
    await firstResult.click();
    await new Promise(r => setTimeout(r, 4000));

    // Click on Reviews tab if present
    const reviewsTab = await page.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('button[role="tab"]'));
      const rTab = tabs.find(t => t.innerText.toLowerCase().includes('reviews'));
      if (rTab) {
        rTab.click();
        return true;
      }
      return false;
    });
    console.log('Clicked reviews tab:', reviewsTab);
    await new Promise(r => setTimeout(r, 3000));

    const reviewsData = await page.evaluate(() => {
      const rating = document.querySelector('div.F7nice span')?.innerText || '';
      const totalReviews = document.querySelector('div.F7nice span:nth-child(2)')?.innerText || '';
      
      const cards = Array.from(document.querySelectorAll('.jftiEf'));
      return {
        rating,
        totalReviews,
        extractedReviews: cards.map(c => {
          const author = c.querySelector('.d4r55')?.innerText || '';
          const authorMeta = c.querySelector('.RfnDt')?.innerText || '';
          const stars = c.querySelector('.kvMYJc')?.getAttribute('aria-label') || '';
          const time = c.querySelector('.rsqaWe')?.innerText || '';
          const text = c.querySelector('.wiI7pd')?.innerText || '';
          return { author, authorMeta, stars, time, text };
        })
      };
    });

    console.log('Detailed Reviews Data:', JSON.stringify(reviewsData, null, 2));
    fs.writeFileSync('scripts/google_reviews_scraped.json', JSON.stringify(reviewsData, null, 2));
  } else {
    fs.writeFileSync('scripts/google_reviews_page.txt', pageData.bodyTextSnippet);
  }

  await browser.close();
  console.log('Done!');
})().catch(err => {
  console.error('Error running scraper:', err);
  process.exit(1);
});

