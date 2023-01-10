(async () => {
    const Browser = require("@savant/chrome")("YOUR_API_KEY");

    const browser = await Browser.launch({});
    await browser.goto("google");
    await browser.type("input[name='q']", "puppeteer");
    await browser.click("input[name='btnK']");
    await browser.waitForNavigation();
    console.log("Done!");
})();