const puppeteer = require('puppeteer');

async function extractDOMFeatures(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const domContent = await page.content();

  await browser.close();
  return domContent;
}

module.exports = { extractDOMFeatures };
