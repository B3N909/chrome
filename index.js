// let URL = "https://us-central1-chromesedge.cloudfunctions.net/api";
// URL = "ws://127.0.0.1:3000";

module.exports = (API_KEY, URL) => {
    if(!URL) throw new Error("URL is required");

    const { Client } = require("@savant/ws-middleware");
    const Browser = Client({
        "goto": {
            args: ["string"],
        },
        "click": {
            args: ["string"],
        },
        "type": {
            args: ["string", "string"],
        },
        "waitForNavigation": {
            args: [],
        },
        "launch": {
            args: [],
        }
    }, URL);
    Browser.launch = async (options) => {
        const browser = new Browser(true);
        await browser.launch(options);
        return browser;
    }
    return Browser;
};