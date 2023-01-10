module.exports = (API_KEY) => {
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
    }, "ws://localhost:3000?api_key=" + API_KEY);
    Browser.launch = async (options) => {
        const compiledOptions = _compileOptions(options);
        const browser = new Browser(compiledOptions);
        console.log("HERE");
        await browser._spawn();
        return browser;
    }
    return Browser;
};