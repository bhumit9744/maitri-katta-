import puppeteer from 'puppeteer-core';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  const cidUrl = 'https://maps.google.com/?cid=12027969871676666458';
  console.log('Navigating to CID URL:', cidUrl);
  await page.goto(cidUrl, { waitUntil: 'networkidle2', timeout: 35000 });
  await new Promise(r => setTimeout(r, 4000));

  await page.screenshot({ path: 'scripts/gmaps_cid_screenshot.png' });
  const title = await page.title();
  console.log('Page Title:', title);

  const placeDetails = await page.evaluate(() => {
    const heading = document.querySelector('h1')?.innerText || '';
    const rating = document.querySelector('div.F7nice')?.innerText || '';
    return { heading, rating };
  });
  console.log('Place Details:', placeDetails);

  await browser.close();
})();

