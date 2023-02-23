// let URL = "https://us-central1-chromesedge.cloudfunctions.net/api";
// URL = "ws://127.0.0.1:3000";

module.exports = (API_KEY, URL) => {
    if(!URL) throw new Error("URL is required");

    const { Client } = require("@savant/ws-middleware");
    const Browser = Client({
        "goto": {
            args: {
                url: "string",
            }
        },
        "click": {
            args: {
                elementName: "string",
                elementType: {
                    type: "string",
                    optional: true,
                }
            },
        },
        "type": {
            args: [{
                elementName: "string",
                elementType: "string",
                text: "string"
            }, {
                elementName: "string",
                text: "string"
            }]
        },
        "getElement": {
            description: "Get an element from the page",
            args: {
                elementName:"string",
                elementType: {
                    type: "string",
                    optional: true,
                }
            }
        },
        "waitForNavigation": {
            description: "! *Temporarily* waits for the next page load (or timesout within >500ms)",
            args: {}
        },
        "scrollIntoView": {
            description: "Scroll the element into view",
            args: {
                elementName: "string",
                elementType: "string"
            }
        },
        "launch": {
            args: {
                description: "?.doLog = true to enable verbose logging",
                options: {
                    type: "object",
                    optional: true,
                }
            },
        },
        "page": { args: {} },
        "url": {
            description: "Get the current url of the browser",
            args: {}
        },
        "waitForPortal": {
            description: "Wait for someone to connect to the browsers web portal",
            args: {}
        },

    }, URL);
    Browser.launch = async (options) => {
        const browser = new Browser(true);
        await browser.launch(options);
        return browser;
    }
    return Browser;
};