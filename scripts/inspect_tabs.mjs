import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US,en']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  const queryUrl = 'https://www.google.com/maps/place/Maitri+katta+Family+Garden+Restaurant/@19.18872,73.20815,17z';
  console.log('Navigating to direct place URL...');
  await page.goto(queryUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const tabs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button[role="tab"]')).map(t => ({
      text: t.innerText,
      ariaSelected: t.getAttribute('aria-selected')
    }));
  });
  console.log('Tabs:', tabs);

  // Click on Reviews tab
  await page.evaluate(() => {
    const rTab = Array.from(document.querySelectorAll('button[role="tab"]')).find(t => t.innerText.toLowerCase().includes('reviews'));
    if (rTab) rTab.click();
  });

  await new Promise(r => setTimeout(r, 4000));

  const reviews = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('div.jftiEf').forEach(card => {
      const name = card.querySelector('.d4r55')?.innerText?.trim();
      const text = card.querySelector('.wiI7pd')?.innerText?.trim();
      const stars = card.querySelector('.kvMYJc')?.getAttribute('aria-label');
      const time = card.querySelector('.rsqaWe')?.innerText?.trim();
      if (name) list.push({ name, text, stars, time });
    });
    return list;
  });

  console.log('Extracted reviews:', reviews);
  await browser.close();
})();

