const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.WEBSITE_URL;
  
  if (!url) {
    console.error('No URL provided');
    process.exit(1);
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    console.log(`Visited ${url}`);
    
    // Take a screenshot and save it as screenshot.png
    await page.screenshot({ path: 'screenshot.png' });
    
    await browser.close();
  } catch (error) {
    console.error(`Error visiting ${url}:`, error);
    process.exit(1);
  }
})();
