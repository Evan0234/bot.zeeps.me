const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.WEBSITE_URL;
  const token = process.env.GITHUB_TOKEN;

  if (!url) {
    console.error('No URL provided');
    process.exit(1);
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    console.log(`Visited ${url}`);

    await page.screenshot({ path: 'screenshot.png' });
    await browser.close();
  } catch (error) {
    console.error(`Error visiting ${url}:`, error);
    process.exit(1);
  }
})();
