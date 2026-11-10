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

  const searchUrl = 'https://www.google.com/search?q=Maitri+Katta+Family+Garden+Restaurant+Ambernath+reviews';
  console.log('Navigating to Google Search:', searchUrl);
  await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  await page.screenshot({ path: 'scripts/google_search_screenshot.png' });

  const data = await page.evaluate(() => {
    // Knowledge panel data
    const kpTitle = document.querySelector('div[data-attrid="title"]')?.innerText || '';
    const kpRating = document.querySelector('span[aria-hidden="true"]')?.innerText || '';
    
    // Look for review snippets
    const reviewSnippets = Array.from(document.querySelectorAll('div[data-review-id], div.review-snippet, div.Jtu6Td, div.OA1nbd, div.kno-rdesc, div[data-attrid*="review"]')).map(el => el.innerText);

    return {
      title: document.title,
      kpTitle,
      reviewSnippets: reviewSnippets.slice(0, 15),
      fullTextSnippet: document.body.innerText.slice(0, 2500)
    };
  });

  console.log('Extracted search data:', data);
  fs.writeFileSync('scripts/google_search_data.json', JSON.stringify(data, null, 2));

  await browser.close();
})();

