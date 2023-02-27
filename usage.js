const isLocal = false;
let URL = "https://us-central1-chromesedge.cloudfunctions.net/api"

if(isLocal) {
    const express = require("express");
    const app = express();
    app.get("/api", (req, res) => {
        // return json
        res.json({
            "externalIP": "127.0.0.1",
        });
    });
    app.listen(3005);
    URL = "http://127.0.0.1:3005/api"
}

(async () => {
    const doLogWebSocket = false;
    const Browser = require("./index.js")("5a5baa80-cb50-4faa-9494-e907fd22ef08", URL, doLogWebSocket);

    const browser = await Browser.launch({
        doLog: true,
    });
    await browser.goto("google");
    console.log("Connected!");

    console.log("portal_url", await browser.getPortalURL());
    await browser.waitForPortal(); // waits for someone to connect to the portal, then continues

    await browser.goto("yahoo");
    await browser.log("Went to Yahoo!");
})();