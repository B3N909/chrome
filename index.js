// let URL = "https://us-central1-chromesedge.cloudfunctions.net/api";
// URL = "ws://127.0.0.1:3000";

module.exports = (API_KEY, URL, doLog) => {
    if(!URL) throw new Error("URL is required");

    const { Client, getIP } = require("@savant/ws-middleware")(doLog);
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
        "log": {
            description: "Log a message to the browser's web portal",
            args: {
                message: "string"
            }
        },
        "evaluate": {
            description: "Evaluate a function in the browser",
            args: [{
                func: "function",
            },
            {
                asyncFunc: "function",
            },
            {
                code: "string",
            }]
        },
        "wait": {
            description: "Wait for a specified amount of time",
            args: {
                time: "number"
            }
        }
    }, URL, API_KEY);
    Browser.launch = async (options) => {
        const browser = new Browser(true);
        await browser.launch(options);

        browser.getPortalURL = async () => {
            if(URL.includes("ws://")) {
                let fakeURL = URL.split("ws://")[1];
                if(fakeURL.includes(":")) fakeURL = fakeURL.split(":")[0];
                return "http://" + fakeURL + ":3001";
            }

            let ip = await getIP();
            if(ip.includes(":")) ip = ip.split(":")[0];

            return "http://" + ip + ":3001";
        }
        browser._evaluate = browser.evaluate;
        browser.evaluate = async (func, ...args) => {
            const code = `(${func.toString()})(${args.map(arg => JSON.stringify(arg)).join(", ")})`;
            return await browser._evaluate(code);
        }

        return browser;
    }
    return Browser;
};