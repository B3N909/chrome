(async () => {
    const Browser = require("./index.js")("5a5baa80-cb50-4faa-9494-e907fd22ef08", "https://us-central1-chromesedge.cloudfunctions.net/api");

    console.log("Launching...");
    const browser = await Browser.launch({
        doLog: true,
    });
    // console.log("Launched!");
    // wait 15s
    // await new Promise((resolve) => setTimeout(resolve, 15000));
    await browser.goto("google");

    // await browser.goto("youtube");
    

    // await browser.type("input[name='q']", "puppeteer");
    // await browser.click("input[name='btnK']");
    // await browser.waitForNavigation();
    console.log("Done!");
})();