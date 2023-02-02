// let URL = "https://us-central1-chromesedge.cloudfunctions.net/api";
// URL = "ws://127.0.0.1:3000";

module.exports = (API_KEY, URL) => {
    if(!URL) throw new Error("URL is required");

    const _compileOptions = (options) => {
        const OTHER_KEY_NAMES = {
            executablePath: ["executable", "exec", "path"],
            headless: ["headless", "head", "visible"],
            userDataDir: ["userDataDir", "userData", "user", "data", "dir"],
        }
        const DEFAULT_VALUES = {
            headless: false,
        }
        const compiledOptions = {};
        for(let key in OTHER_KEY_NAMES) {
            if(options[key]) {
                compiledOptions[key] = options[key];
            }
        }
        for(let key in options) {
            for(let otherKey in OTHER_KEY_NAMES) {
                if(OTHER_KEY_NAMES[otherKey].includes(key)) {
                    compiledOptions[otherKey] = options[key];
                }
            }
        }
        for(let key in DEFAULT_VALUES) {
            if(!compiledOptions[key]) {
                compiledOptions[key] = DEFAULT_VALUES[key];
            }
        }
        compiledOptions.args = options.args || [];
        delete compiledOptions.remote;
        return compiledOptions;
    }
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
        "_spawn": {
            args: [],
        }
    }, URL);
    Browser.launch = async (options) => {
        const compiledOptions = _compileOptions(options);
        const browser = new Browser(compiledOptions);
        await browser._spawn();
        return browser;
    }
    return Browser;
};