# @savant/chrome
`@savant/chrome` is a library for interacting with Chrome browsers in the cloud.

## DOM
The DOM is auto pruned to only include the following elements:
  * `buttons`
  * `inputs`
  * `links`


The DOM can be access by calling
```javascript
const pageDom = browser.page;
```

An example page DOM looks like this:
```javascript
{
    url: 'https://www.google.com/',
    links: {
        About: '...',
        Store: '...',
        Gmail: '...',
        Images: '...',
        'Google apps': '...',
        Advertising: '...',
        Business: '...',
        ' How Search works ': '...',
        'Carbon neutral since 2007': '...',
        Privacy: '...',
        Terms: '...'
    },
    buttons: {
      'Search by voice': '<div aria-label="Search by voice" role="button"></div>',
      'Search by image': '<div aria-label="Search by image" role="button"></div>',
      'Google Search': '<input value="Google Search" aria-label="Google Search" name="btnK" role="button" type="submit">',
      "I'm Feeling Lucky": `<input id="gbqfbb" value="I'm Feeling Lucky" aria-label="I'm Feeling Lucky" name="btnI" role="button" type="submit">`,
      Settings: '<div role="button"><div jsname="LgbsSe" class="ayzqOc pHiOh" aria-controls="_SuK8Y_LhD7HY5NoP-dqZ6Aw_1" aria-haspopup="true">Settings</div></div>'
    },
    inputs: {
      Search: '<input name="q" type="text" role="combobox" title="Search" value="" aria-label="Search">'
    },
}
```

### Navigation
To navigate to the page, use the `goto` method.
```javascript
await browser.goto("yahoo");
```

To implicitly wait for a page navigation to happen, use the `waitForNavigation` method.
 * Timesout after 500ms if no navigation initiates
 * Otherwise waits for the navigation to complete
```javascript
await browser.waitForNavigation();
```

All page interactions always automatically wait for a page navigation to happen before continuing. This means that you don't need to call `waitForNavigation` after every action.

### Clicking
To click a button, you can use the `click` method. This method takes a string as an argument, which is the `name` of the `button` or `input` you want to click. The target element will automatically come into view before clicking.
```javascript
await browser.click("Search Button");
```

### Typing
To type in a `<input>` you can use the `type` method. This method takes two arguments: the `name` of the `input` you want to type in, and the text you want to type. The target element will automatically come into view before typing.
```javascript
await browser.type("Search Input", "puppeteer");
```


## Usage
```javascript
(async () => {
    const Browser = require("@savant/chrome")("URL", apiKey: "", doLog: true);

    const browser = await Browser.launch({});
    await browser.goto("google");
    await browser.type("input[name='q']", "puppeteer");
    await browser.click("input[name='btnK']");
    await browser.waitForNavigation();
    console.log("Done!");
})();
```