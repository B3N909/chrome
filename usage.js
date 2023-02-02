(async () => {
    const Browser = require("./index.js")("5a5baa80-cb50-4faa-9494-e907fd22ef08", "ws://127.0.0.1:3000");

    console.log("Launching...");
    const browser = await Browser.launch({
        args: ["--no-sandbox", "--disable-gpu"],
    });
    console.log("Launched!");
    await browser.goto("google");
    await browser.type("input[name='q']", "puppeteer");
    await browser.click("input[name='btnK']");
    await browser.waitForNavigation();
    console.log("Done!");
})();