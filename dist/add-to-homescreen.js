/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 66:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./en.json": 174,
	"./fr.json": 605
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 66;

/***/ }),

/***/ 174:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"Add to Home Screen":"Add to Home Screen","Add To Dock":"Add To Dock","An icon will be added to your Dock so you can quickly access this website.":"An icon will be added to your Dock so you can quickly access this website.","An icon will be added to your home screen so you can quickly access this website.":"An icon will be added to your home screen so you can quickly access this website.","An icon will be added to your Taskbar so you can quickly access this website.":"An icon will be added to your Taskbar so you can quickly access this website.","Install":"Install","Install %s":"Install %s","Install app":"Install app","Later":"Later","More":"More","Open in browser":"Open in browser","Select %s from the menu that pops up.":"Select %s from the menu that pops up.","Select %s from the menu.":"Select %s from the menu.","Share":"Share","Tap %s":"Tap %s","Tap %s in the browser bar.":"Tap %s in the browser bar.","Tap %s in the menu.":"Tap %s in the menu.","Tap %s in the toolbar.":"Tap %s in the toolbar.","Tap the %s button above.":"Tap the %s button above.","Tap the %s button below to open your system browser.":"Tap the %s button below to open your system browser.","Tap the %s button in the toolbar.":"Tap the %s button in the toolbar.","Tap the %s button in the upper right corner.":"Tap the %s button in the upper right corner.","You may need to scroll down to find this menu item.":"You may need to scroll down to find this menu item."}');

/***/ }),

/***/ 321:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
let config;
let directory;
const PLACEHOLDER = "%s";
const SimpleI18n = {
    configure: (configInput) => {
        config = configInput;
    },
    _getLanguageFromLocale: (locale) => {
        if (!locale) {
            return "";
        }
        if (locale.indexOf("-") >= 0) {
            return locale.split("-")[0];
        }
        if (locale.indexOf("_") >= 0) {
            return locale.split("_")[0];
        }
        return locale;
    },
    _getLanguageFromBrowserSettings: () => {
        // check url for a 'locale' param
        const url_params = new URLSearchParams(window.location.search);
        const url_locale = url_params.get('locale');
        if (url_locale) {
            return SimpleI18n._getLanguageFromLocale(url_locale);
        }
        // check browser setting
        if (navigator.languages && navigator.languages.length) {
            return SimpleI18n._getLanguageFromLocale(navigator.languages[0]);
        }
        return "";
    },
    setLocale: (locale) => {
        if (false) // removed by dead control flow
{}
        directory = config.staticCatalog[locale];
    },
    _translateKey(key) {
        if (directory == null || directory[key] == null) {
            return key;
        }
        return directory[key];
    },
    __: (key, input) => {
        if (key.indexOf(PLACEHOLDER) < 0) {
            return SimpleI18n._translateKey(key);
        }
        // Need to do a string replacement
        if (false) // removed by dead control flow
{}
        const translated_key = SimpleI18n._translateKey(key);
        const parts = translated_key.split(PLACEHOLDER);
        return parts[0] + input + parts[1];
    },
};
exports["default"] = SimpleI18n;


/***/ }),

/***/ 384:
/***/ ((module) => {

module.exports = {
  LOCALES: [
    "en",
    "fr",
  ],
  DEFAULT_LOCALE: "fr",
};


/***/ }),

/***/ 435:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddToHomeScreen = AddToHomeScreen;
__webpack_require__(858);
const types_1 = __webpack_require__(982);
const config = __webpack_require__(384);
const LOCALES = config.LOCALES;
// Configure I18n
const simpleI18n_1 = __importDefault(__webpack_require__(321));
const localeCatalog = {};
LOCALES.forEach((locale) => {
    localeCatalog[locale] = __webpack_require__(66)("./" + locale + ".json");
});
simpleI18n_1.default.configure({
    locales: LOCALES,
    staticCatalog: localeCatalog,
    directory: ".",
});
function AddToHomeScreen(options) {
    let { appIconUrl, appName, appNameDisplay, assetUrl, maxModalDisplayCount, displayOptions, allowClose, showArrow } = options;
    let closeEventListener = null;
    const userAgent = window.navigator.userAgent;
    _assertArg("appName", typeof appName === "string" && appName.length > 0);
    appIconUrl = appIconUrl;
    _assertArg("appIconUrl", typeof appIconUrl === "string" && appIconUrl.length > 0);
    assetUrl = assetUrl;
    _assertArg("assetUrl", typeof assetUrl === "string" && assetUrl.length > 0);
    maxModalDisplayCount =
        maxModalDisplayCount === undefined ? -1 : maxModalDisplayCount;
    _assertArg("maxModalDisplayCount", Number.isInteger(maxModalDisplayCount));
    displayOptions =
        displayOptions === undefined ? types_1.DISPLAY_OPTIONS_DEFAULT : displayOptions;
    _assertArg("displayOptions", (0, types_1.isDisplayOptions)(displayOptions));
    allowClose = allowClose === undefined ? true : allowClose;
    _assertArg("allowClose", typeof allowClose === "boolean");
    showArrow = showArrow === undefined ? true : showArrow;
    _assertArg("showArrow", typeof showArrow === "boolean");
    closeEventListener = null;
    // handles the case where the chrome prompt is not immediately shown on page load,
    // such as an onclick handler
    if (shouldShowDesktopInstallPromptBasedOnDevice()) {
        _registerDesktopInstallPromptEvent();
    }
    function isStandAlone() {
        // test if web app is already installed to home screen
        return (!!("standalone" in window.navigator && window.navigator.standalone) || // IOS (TODO: detect iPad 13)
            !!window.matchMedia("(display-mode: standalone)").matches); // Android and Desktop Chrome/Safari/Edge
    }
    function show(locale) {
        if (locale && !localeCatalog[locale]) {
            console.log("add-to-homescreen: WARNING: locale selected not available:", locale);
            locale = "";
        }
        if (!locale) {
            const language_from_browser_settings = simpleI18n_1.default._getLanguageFromBrowserSettings();
            // if no locale indicated
            // check url param "locale" and browser settings
            if (language_from_browser_settings && localeCatalog[language_from_browser_settings]) {
                locale = language_from_browser_settings;
                // if "en" intl file is available, default to "en"
            }
            else if (localeCatalog["en"]) {
                locale = "en";
                // else default to first language available
            }
            else {
                locale = Object.keys(localeCatalog)[0];
            }
        }
        debugMessage("LOCALE: " + locale);
        simpleI18n_1.default.setLocale(locale);
        var ret;
        var _device;
        let _isStandAlone;
        let _canBeStandAlone;
        if (isDeviceIOS()) {
            _device = types_1.DeviceType.IOS;
        }
        else if (isDeviceAndroid()) {
            _device = types_1.DeviceType.ANDROID;
        }
        else {
            _device = types_1.DeviceType.DESKTOP;
        }
        if (isStandAlone()) {
            debugMessage("ALREADY STANDALONE");
            ret = new types_1.DeviceInfo((_isStandAlone = true), (_canBeStandAlone = true), (_device = _device));
        }
        else if (_hasReachedMaxModalDisplayCount()) {
            ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
        }
        else if (displayOptions.showMobile &&
            (isDeviceIOS() || isDeviceAndroid())) {
            debugMessage("NOT STANDALONE - IOS OR ANDROID");
            var shouldShowModal = true;
            _incrModalDisplayCount();
            var container = _createContainer(false // include_modal
            );
            if (isDeviceIOS()) {
                // ios
                if (isBrowserIOSSafari26() && !isBrowserIOSIPadSafari()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    _genIOSSafariIOS26(container);
                }
                else if (isBrowserIOSSafari26() && isBrowserIOSIPadSafari()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    _genIOSIPadSafariIOS26(container);
                }
                else if (isBrowserIOSSafari()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    _genIOSSafari(container);
                }
                else if (isBrowserIOSChrome()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    _genIOSChrome(container);
                }
                else if (isBrowserIOSFirefox()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    // Until better option
                    _genIOSSafari(container);
                }
                else if (isBrowserIOSInAppFacebook()
                    || isBrowserIOSInAppLinkedin()
                    || isBrowserIOSInAppInstagram()) {
                    // IOS INSTAGRAM: https://github.com/user-attachments/assets/0d3ab224-1ac7-454e-b75d-21f6c52ffa87
                    // IOS FACEBOOK: https://github.com/user-attachments/assets/4c8121a2-3c62-402f-be05-0c54bf108ddc
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    _genIOSInAppBrowserUpperRightButtonOpenInSystemBrowser(container);
                }
                else if (isBrowserIOSInAppTwitter()) {
                    // IOS TWITTER/X: https://github.com/user-attachments/assets/ed01b58e-5aab-48b9-8c42-d21d24cd2c03
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    _genIOSInAppBrowserLowerRightButtonOpenInSafariBrowser(container);
                }
                else {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    shouldShowModal = false;
                }
            }
            else {
                // android
                if (isBrowserAndroidChrome()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    _genAndroidChrome(container);
                }
                else if (isBrowserAndroidEdge()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    _genAndroidEdge(container);
                    // Firefox: note only Android Firefox supports adding to homescreen, ios Firefox does not
                }
                else if (isBrowserAndroidFirefox()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    _genAndroidFirefox(container);
                }
                else if (isBrowserAndroidFacebook() || isBrowserAndroidInstagram()) {
                    // ANDROID FACEBOOK: https://github.com/user-attachments/assets/45701ac3-d337-4fc4-8e82-3d03236bf3a5
                    // ANDROID INSTAGRAM: https://github.com/user-attachments/assets/7e1d11fd-31ba-4b27-a13d-6beb079b4204
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    _genIOSInAppBrowserUpperRightButtonOpenInSystemBrowser(container);
                }
                else {
                    // ANDROID X/TWITTER JUST OPENS SYSTEM BROWSER
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    shouldShowModal = false;
                }
            }
            if (shouldShowModal) {
                _addContainerToBody(container);
            }
        }
        else {
            debugMessage("DESKTOP");
            ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
            if (displayOptions.showDesktop) {
                if (isDesktopChrome() || isDesktopEdge()) {
                    debugMessage("DESKTOP CHROME");
                    _incrModalDisplayCount();
                    showDesktopInstallPrompt();
                }
                else if (isDesktopSafari()) {
                    debugMessage("DESKTOP SAFARI");
                    _incrModalDisplayCount();
                    _showDesktopSafariPrompt();
                }
            }
        }
        return ret;
    }
    function closeModal() {
        // close the modal if the user clicks outside of the modal contents
        const container = document.querySelector(".adhs-container");
        if (container) {
            container.classList.remove("visible");
            setTimeout(() => {
                container.remove();
                _modalIsShowing = false;
                if (closeEventListener) {
                    window.removeEventListener("touchstart", closeEventListener);
                    window.removeEventListener("click", closeEventListener);
                    closeEventListener = null;
                    if (_desktopInstallPromptWasShown) {
                        _desktopInstallPromptWasShown = false;
                    }
                }
            }, 
            // If the dialog is hidden in 300ms in Safari, the browser reports a second
            // click event on an underlying DOM node. If you wait a bit longer this
            // does not happen
            isDeviceIOS() ? 500 : 300);
        }
    }
    function modalIsShowing() {
        return _modalIsShowing;
    }
    /**** Device Detection Functions ****/
    function _matchesUserAgent(regex) {
        return !!userAgent.match(regex);
    }
    function isDeviceAndroid() {
        return !!_matchesUserAgent(/Android/);
    }
    function isDeviceIOS() {
        return _matchesUserAgent(/iPhone|iPad|iPod/) || isBrowserIOSIPadSafari();
    }
    function isBrowserIOSIPadSafari() {
        return !!(_matchesUserAgent(/iPad/) || // iPad Mini
            // iPad Air, iPad Pro
            (_matchesUserAgent(/Macintosh/) &&
                navigator.maxTouchPoints &&
                navigator.maxTouchPoints > 1));
    }
    /* Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)
     AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0
     Mobile/14E5239e Safari/602.1 */
    function isBrowserIOSSafari() {
        return (isDeviceIOS() &&
            _matchesUserAgent(/Safari/) &&
            !isBrowserIOSChrome() &&
            !isBrowserIOSFirefox() &&
            !isBrowserIOSInAppFacebook() &&
            !isBrowserIOSInAppLinkedin() &&
            !isBrowserIOSInAppInstagram() &&
            !isBrowserIOSInAppThreads() &&
            !isBrowserIOSInAppTwitter());
    }
    /* iOS 26 Detection - UPDATED for Apple's User-Agent changes
     NOTE: iOS 26 Safari reports fixed OS version (18_6) instead of actual version
     We use Safari version detection instead of OS version for reliability */
    function isIOSVersion26OrHigher() {
        if (!isDeviceIOS())
            return false;
        // CRITICAL: iOS 26 Safari reports fixed iOS version (18_6) for privacy
        // Use Safari version detection instead
        const safariVersionMatch = userAgent.match(/Version\/(\d+)/);
        if (safariVersionMatch) {
            const safariVersion = parseInt(safariVersionMatch[1]);
            // Safari 26+ indicates iOS 26+ (even if OS version shows 18_6)
            return safariVersion >= 26;
        }
        // Fallback: Check for actual iOS version (works for Chrome/Firefox on iOS)
        const osVersionMatch = userAgent.match(/OS (\d+)_/);
        if (osVersionMatch) {
            const majorVersion = parseInt(osVersionMatch[1]);
            return majorVersion >= 26;
        }
        return false;
    }
    /* iOS 26 Safari specific detection */
    function isBrowserIOSSafari26() {
        if (!isBrowserIOSSafari())
            return false;
        // Use Safari version detection for iOS 26+ Safari
        const safariVersionMatch = userAgent.match(/Version\/(\d+)/);
        if (safariVersionMatch) {
            const safariVersion = parseInt(safariVersionMatch[1]);
            return safariVersion >= 26;
        }
        return false;
    }
    /* Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)
       AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75
       Mobile/14E5239e Safari/602.1 */
    function isBrowserIOSChrome() {
        return isDeviceIOS() && _matchesUserAgent(/CriOS/);
    }
    /* Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X)
    AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/114.1 Mobile/15E148 Safari/605.1.15 */
    function isBrowserIOSFirefox() {
        return isDeviceIOS() && _matchesUserAgent(/FxiOS/);
    }
    function isBrowserIOSInAppFacebook() {
        if (!isDeviceIOS()) {
            return false;
        }
        return _matchesUserAgent(/FBAN|FBAV/);
    }
    function isBrowserIOSInAppLinkedin() {
        if (!isDeviceIOS()) {
            return false;
        }
        return _matchesUserAgent(/LinkedInApp/);
    }
    function isBrowserIOSInAppInstagram() {
        if (!isDeviceIOS()) {
            return false;
        }
        // TODO: this is incompatible with Instagram/Threads mobile website links.
        // TODO: this solution only works with first-level links
        if (!!window.document.referrer.match("//l.instagram.com/")) {
            return true;
        }
        return false;
    }
    function isBrowserIOSInAppThreads() {
        return isBrowserIOSInAppInstagram();
    }
    function isBrowserIOSInAppTwitter() {
        if (!isDeviceIOS()) {
            return false;
        }
        // TODO: this solution is incompatible with Twitter mobile website links
        // TODO: this solution only works with first-level links
        return !!window.document.referrer.match("//t.co/");
    }
    /* Mozilla/5.0 (Linux; Android 10)
       AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.92 Mobile Safari/537.36 */
    function isBrowserAndroidChrome() {
        return (isDeviceAndroid() &&
            !!_matchesUserAgent(/Chrome/) &&
            !isBrowserAndroidFacebook() &&
            !isBrowserAndroidInstagram() &&
            !isBrowserAndroidSamsung() &&
            !isBrowserAndroidFirefox() &&
            !isBrowserAndroidEdge() &&
            !isBrowserAndroidOpera());
    }
    /*Mozilla/5.0 (Linux; Android 12; SM-S908U1 Build/SP1A.210812.016; wv)
      AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.88
      Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/377.0.0.22.107;]*/
    function isBrowserAndroidFacebook() {
        return isDeviceAndroid() && _matchesUserAgent(/FBAN|FBAV/);
    }
    function isBrowserAndroidInstagram() {
        return isDeviceAndroid() && _matchesUserAgent(/Instagram/);
    }
    /* Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-S918B) AppleWebKit/537.36
    (KHTML, like Gecko) SamsungBrowser/21.0 Chrome/110.0.5481.154 Mobile Safari/537.36 */
    function isBrowserAndroidSamsung() {
        return isDeviceAndroid() && _matchesUserAgent(/SamsungBrowser/);
    }
    /* Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/114.0 Firefox/114.0 */
    function isBrowserAndroidFirefox() {
        return isDeviceAndroid() && _matchesUserAgent(/Firefox/);
    }
    function isBrowserAndroidOpera() {
        return isDeviceAndroid() && _matchesUserAgent(/OPR/);
    }
    function isBrowserAndroidEdge() {
        return isDeviceAndroid() && _matchesUserAgent(/Edg/);
    }
    function isDesktopWindows() {
        return userAgent.includes("Windows");
    }
    function isDesktopMac() {
        return userAgent.includes("Macintosh");
    }
    function isDesktopChrome() {
        const isChrome = userAgent.includes("Chrome") && !userAgent.includes("Edg"); // Exclude Edge browser
        const isDesktop = userAgent.includes("Windows") ||
            userAgent.includes("Macintosh") ||
            userAgent.includes("Linux");
        return isChrome && isDesktop;
    }
    function isDesktopSafari() {
        const isSafari = userAgent.includes("Safari") &&
            !userAgent.includes("Chrome") &&
            !userAgent.includes("Edg");
        const isDesktop = userAgent.includes("Macintosh") || userAgent.includes("Windows");
        return isSafari && isDesktop;
    }
    function isDesktopEdge() {
        return userAgent.includes("Edg/");
    }
    /**** Internal Functions ****/
    function _getAppDisplayUrl() {
        // return 'https://aardvark.app';
        const currentUrl = new URL(window.location.href);
        return currentUrl.href.replace(/\/$/, "");
    }
    function _assertArg(variableName, booleanExp) {
        if (!booleanExp) {
            throw new Error("AddToHomeScreen: variable '" + variableName + "' has an invalid value.");
        }
    }
    function _createContainer(include_modal = false) {
        const container = document.createElement("div");
        container.classList.add("adhs-container");
        if (include_modal) {
            var containerInnerHTML = _genModalStart() + _genModalEnd();
            container.innerHTML = containerInnerHTML;
        }
        return container;
    }
    function _addContainerToBody(container) {
        _modalIsShowing = true;
        document.body.appendChild(container);
        _registerCloseListener();
        setTimeout(() => {
            container.classList.add("visible");
        }, 50);
    }
    function _genLogo() {
        return (`
      ${div("logo")}
        <img src="` +
            appIconUrl +
            `" alt="logo" />
      </div>
      `);
    }
    function _genModalStart() {
        return div("modal") + _genLogo();
    }
    function _genModalEnd() {
        return `</div>`;
    }
    function _genListStart() {
        return div("list");
    }
    function _genListEnd() {
        return `</div>`;
    }
    function _genListItem(numberString, instructionHTML) {
        return `
      ${div("list-item")}
      ${div("number-container")}
      ${div("circle")}
       ${div("number")}
       ${numberString}
       </div>
        </div>
      </div>
      ${div("instruction")}
      ${instructionHTML}
      </div>
    </div>`;
    }
    function _genListButtonWithImage(imageUrl, text = "", image_side = "none") {
        if (!text) {
            // -translate-y-1 for tailwindcss compensation
            return (`
        ${div("list-button")}
          <img class="adhs-list-button-image-only -translate-y-1" src="` +
                imageUrl +
                `" />
      </div>`);
        }
        else if (image_side === "right") {
            // -translate-y-1 for tailwindcss compensation
            return (`
        ${div("list-button")}
        ${div("list-button-text")}
        ${text}
        </div>
        <img class="adhs-list-button-image-right -translate-y-1" src="` +
                imageUrl +
                `" />
      </div>`);
        }
        else if (image_side === "left") {
            // -translate-y-1 for tailwindcss compensation
            return (`
        ${div("list-button")}
        <img class="adhs-list-button-image-left -translate-y-1" src="` +
                imageUrl +
                `" />
        ${div("list-button-text")}
        ${text}
        </div>
      </div>`);
        }
        else {
            throw new Error("_genListButtonWithImage: invalid arguments");
        }
    }
    function _genAssetUrl(fileName) {
        return assetUrl + fileName;
    }
    function _genIOSSafari(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap the %s button in the toolbar.", _genListButtonWithImage(_genAssetUrl("ios-safari-sharing-api-button-2.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Select %s from the menu.", _genListButtonWithImage(_genAssetUrl("ios-safari-add-to-home-screen-button-2.svg"), simpleI18n_1.default.__("Add to Home Screen"), "right")) +
                ` <span class="adhs-emphasis">${simpleI18n_1.default.__("You may need to scroll down to find this menu item.")}</span>`) +
            // _genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${appIconUrl}"/>`)) +
            _genListEnd() +
            _genBlurbMobile() +
            _genModalEnd() +
            (showArrow ? divBouncingArrow(isBrowserIOSIPadSafari()
                ? "ios-ipad-safari-bouncing-arrow-container"
                : "ios-safari-bouncing-arrow-container") +
                `<img src="` +
                _genAssetUrl("ios-safari-bouncing-arrow.svg") +
                `" alt="arrow" />
    </div>` : '');
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-ios", "adhs-safari");
    }
    function _genIOSSafariIOS26(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap %s in the toolbar.", _genListButtonWithImage(_genAssetUrl("ios-safari-ios26-more-white-button.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Tap %s in the menu.", _genListButtonWithImage(_genAssetUrl("ios-safari-ios26-share-button.svg"), simpleI18n_1.default.__("Share"), "left"))) +
            _genListItem(`3`, simpleI18n_1.default.__("Tap %s", _genListButtonWithImage(_genAssetUrl("ios-safari-ios26-more-grey-button.svg"), simpleI18n_1.default.__("More"), "left"))) +
            _genListItem(`4`, simpleI18n_1.default.__("Select %s from the menu.", _genListButtonWithImage(_genAssetUrl("ios-safari-add-to-home-screen-button-2.svg"), simpleI18n_1.default.__("Add to Home Screen"), "left"))) +
            _genListEnd() +
            _genBlurbMobile() +
            _genModalEnd() +
            (showArrow ? divBouncingArrow("ios-safari-bouncing-arrow-container") +
                `<img src="` +
                _genAssetUrl("ios-safari-bouncing-arrow.svg") +
                `" alt="arrow" />
    </div>` : '');
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-ios", "adhs-safari", "adhs-ios26");
    }
    function _genIOSIPadSafariIOS26(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap %s in the toolbar.", _genListButtonWithImage(_genAssetUrl("ios-safari-ios26-share-button.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Tap %s", _genListButtonWithImage(_genAssetUrl("ios-safari-ios26-more-grey-button.svg"), simpleI18n_1.default.__("More"), "left"))) +
            _genListItem(`4`, simpleI18n_1.default.__("Select %s from the menu.", _genListButtonWithImage(_genAssetUrl("ios-safari-add-to-home-screen-button-2.svg"), simpleI18n_1.default.__("Add to Home Screen"), "left"))) +
            _genListEnd() +
            _genBlurbMobile() +
            _genModalEnd() +
            (showArrow ? divBouncingArrow("ios-ipad-safari-bouncing-arrow-container") +
                `<img src="` +
                _genAssetUrl("ios-safari-bouncing-arrow.svg") +
                `" alt="arrow" />
    </div>` : '');
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-ios", "adhs-safari", "adhs-ios26");
    }
    function _genIOSChrome(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap the %s button in the upper right corner.", _genListButtonWithImage(_genAssetUrl("ios-chrome-more-button-2.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Select %s from the menu that pops up.", _genListButtonWithImage(_genAssetUrl("ios-safari-add-to-home-screen-button-2.svg"), simpleI18n_1.default.__("Add to Home Screen"), "right")) +
                ` ` +
                `<span class="adhs-emphasis">${simpleI18n_1.default.__("You may need to scroll down to find this menu item.")}</span>`) +
            // _genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${appIconUrl}"/>`)) +
            _genListEnd() +
            _genBlurbMobile() +
            _genModalEnd() +
            (showArrow ? divBouncingArrow("ios-chrome-bouncing-arrow-container") +
                `<img src="` +
                _genAssetUrl("ios-chrome-bouncing-arrow.svg") +
                `" alt="arrow" />
    </div>` : '');
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-ios", "adhs-chrome");
    }
    function _genIOSInAppBrowserUpperRightButtonOpenInSystemBrowser(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap the %s button above.", `<img class="adhs-more-button" src="${_genAssetUrl("generic-more-button.svg")}"/>`)) +
            _genListItem(`2`, `${simpleI18n_1.default.__("Tap")} <span class="adhs-emphasis">${simpleI18n_1.default.__("Open in browser")}</span>`) +
            _genListEnd() +
            _genModalEnd() +
            (showArrow ? divBouncingArrow("inappbrowser-openinsystembrowser-bouncing-arrow-container") +
                `<img src="` +
                _genAssetUrl("generic-vertical-up-bouncing-arrow.svg") +
                `" alt="arrow" />
    </div>` : '');
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-ios", "adhs-inappbrowser-openinsystembrowser");
    }
    function _genIOSInAppBrowserLowerRightButtonOpenInSafariBrowser(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap the %s button below to open your system browser.", `<img class="adhs-more-button" src="${_genAssetUrl("openinsafari-button.png")}"/>`)) +
            _genListEnd() +
            _genModalEnd() +
            (showArrow ? divBouncingArrow("inappbrowser-openinsafari-bouncing-arrow-container") +
                `<img src="` +
                _genAssetUrl("generic-vertical-down-bouncing-arrow.svg") +
                `" alt="arrow" />
    </div>` : '');
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-ios", "adhs-inappbrowser-openinsafari");
    }
    function _genAndroidChrome(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap %s in the browser bar.", _genListButtonWithImage(_genAssetUrl("android-chrome-more-button-2.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Tap %s", _genListButtonWithImage(_genAssetUrl("android-chrome-add-to-home-screen-button-2.svg"), simpleI18n_1.default.__("Add to Home Screen"), "left"))) +
            // _genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${appIconUrl}"/>`)) +
            _genListEnd() +
            _genBlurbMobile() +
            _genModalEnd() +
            (showArrow ? divBouncingArrow("android-chrome-bouncing-arrow-container") +
                `<img src="` +
                _genAssetUrl("android-chrome-bouncing-arrow.svg") +
                `" alt="arrow" />
    </div>` : '');
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-android", "adhs-chrome");
    }
    function _genAndroidFirefox(container) {
        return _genAndroidChrome(container);
    }
    function _genAndroidEdge(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap %s in the browser bar.", _genListButtonWithImage(_genAssetUrl("android-edge-more-button.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Tap %s", _genListButtonWithImage(_genAssetUrl("android-edge-add-to-home-screen-button.svg"), simpleI18n_1.default.__("Add to Home Screen"), "left"))) +
            // _genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${appIconUrl}"/>`)) +
            _genListEnd() +
            _genBlurbMobile() +
            _genModalEnd() +
            (showArrow ? divBouncingArrow("android-edge-bouncing-arrow-container") +
                `<picture>
        <!-- Landscape image -->
        <source srcset="${_genAssetUrl("generic-vertical-up-bouncing-arrow.svg")}" media="(orientation: landscape)">
        <!-- Portrait image -->
        <source srcset="${_genAssetUrl("generic-vertical-down-bouncing-arrow.svg")}" media="(orientation: portrait)">
        <!-- Fallback image -->
        <img src="${_genAssetUrl("generic-vertical-down-bouncing-arrow.svg")}" alt="arrow">
      </picture></div>` : '');
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-android", "adhs-edge");
    }
    function _genInstallAppHeader() {
        const text = appNameDisplay === "inline"
            ? simpleI18n_1.default.__("Install %s", appName)
            : simpleI18n_1.default.__("Install app");
        return `<h1 class="adhs-install-app">` + text + `</h1>`;
    }
    function _genAppNameHeader() {
        if (appNameDisplay === "inline") {
            return "";
        }
        return div("app-name") + appName + `</div>`;
    }
    function _genAppUrlHeader() {
        return div("app-url") + _getAppDisplayUrl() + `</div>`;
    }
    function _genBlurbWithMessage(message) {
        return div("blurb") + message + `</div>`;
    }
    function _genBlurbMobile() {
        return _genBlurbWithMessage(simpleI18n_1.default.__("An icon will be added to your home screen so you can quickly access this website."));
    }
    function _genBlurbDesktopWindows() {
        return _genBlurbWithMessage(simpleI18n_1.default.__("An icon will be added to your Taskbar so you can quickly access this website."));
    }
    function _genBlurbDesktopMac() {
        return _genBlurbWithMessage(simpleI18n_1.default.__("An icon will be added to your Dock so you can quickly access this website."));
    }
    function _genDesktopChrome(container) {
        var blurb = isDesktopMac()
            ? _genBlurbDesktopMac()
            : _genBlurbDesktopWindows();
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            _genAppUrlHeader() +
            blurb +
            div("button-container") +
            `<button class="adhs-button adhs-button-cancel">
        ` +
            simpleI18n_1.default.__("Later") +
            `
      </button>
      <button class="adhs-button adhs-button-install">
        ` +
            simpleI18n_1.default.__("Install") +
            `
      </button>
    </div>` +
            _genModalEnd();
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-desktop", "adhs-desktop-chrome");
        var cancelButton = container.getElementsByClassName("adhs-button-cancel")[0];
        cancelButton.addEventListener("click", () => {
            closeModal();
        });
        var installButton = container.getElementsByClassName("adhs-button-install")[0];
        installButton.addEventListener("click", () => {
            if (!_desktopInstallPromptEvent) {
                return;
            }
            _desktopInstallPromptEvent.prompt();
            closeModal();
            _desktopInstallPromptEvent.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    debugMessage("User accepted the install prompt");
                }
                else {
                    debugMessage("User dismissed the install prompt");
                }
                _desktopInstallPromptEvent = null;
            });
        });
    }
    function _genDesktopSafari(container) {
        var blurb = isDesktopMac()
            ? _genBlurbDesktopMac()
            : _genBlurbDesktopWindows();
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap %s in the toolbar.", _genListButtonWithImage(_genAssetUrl("desktop-safari-menu.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Tap %s", _genListButtonWithImage(_genAssetUrl("desktop-safari-dock.svg"), simpleI18n_1.default.__("Add To Dock"), "left"))) +
            _genListEnd() +
            blurb +
            _genModalEnd() +
            (showArrow ? divBouncingArrow("desktop-safari-bouncing-arrow-container") +
                `<img src="` +
                _genAssetUrl("desktop-safari-bouncing-arrow.svg") +
                `" alt="arrow" />
    </div>` : '');
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-desktop", "adhs-desktop-safari");
    }
    function _registerCloseListener() {
        closeEventListener = (e) => {
            var modal = document
                .getElementsByClassName("adhs-container")[0]
                .getElementsByClassName("adhs-modal")[0];
            if (!modal.contains(e.target) && allowClose) {
                closeModal();
            }
        };
        // enclose in setTimeout to prevent firing when this class used with an onclick
        setTimeout(() => {
            window.addEventListener("touchstart", closeEventListener);
            window.addEventListener("click", closeEventListener);
        }, 50);
    }
    function clearModalDisplayCount() {
        if (_isEnabledModalDisplayCount()) {
            window.localStorage.removeItem(_getModalDisplayCountKey());
        }
    }
    function _isEnabledModalDisplayCount() {
        return (typeof maxModalDisplayCount === "number" &&
            maxModalDisplayCount >= 0 &&
            window.localStorage !== undefined);
    }
    function _hasReachedMaxModalDisplayCount() {
        if (!_isEnabledModalDisplayCount()) {
            return false;
        }
        return _getModalDisplayCount() >= maxModalDisplayCount;
    }
    function _incrModalDisplayCount() {
        if (!_isEnabledModalDisplayCount()) {
            return false;
        }
        var count = _getModalDisplayCount();
        count++;
        window.localStorage.setItem(_getModalDisplayCountKey(), count.toString());
        return true;
    }
    function _getModalDisplayCountKey() {
        return "adhs-modal-display-count";
    }
    function _getModalDisplayCount() {
        var countStr = window.localStorage.getItem(_getModalDisplayCountKey());
        var count;
        if (countStr === null) {
            count = 0;
            window.localStorage.setItem(_getModalDisplayCountKey(), count.toString());
        }
        else {
            count = parseInt(countStr);
        }
        return count;
    }
    function debugMessage(message) {
        // alert(message);
        // console.log(message);
    }
    let _modalIsShowing = false;
    let _desktopInstallPromptEvent = null;
    let _desktopInstallPromptWasShown = false;
    let _desktopInstallPromptStartTimeMS = null;
    let DESKTOP_INSTALL_POLL_MS = 500;
    let DESKTOP_INSTALL_MAX_WAIT_TIME_MS = 2000;
    function _desktopInstallPromptEventListener(e) {
        debugMessage("DESKTOP CHROME LISTENER");
        e.preventDefault();
        _desktopInstallPromptEvent = e;
    }
    function _registerDesktopInstallPromptEvent() {
        window.addEventListener("beforeinstallprompt", _desktopInstallPromptEventListener);
    }
    function shouldShowDesktopInstallPromptBasedOnDevice() {
        return (!isStandAlone() &&
            !_hasReachedMaxModalDisplayCount() &&
            !isDeviceIOS() &&
            !isDeviceAndroid() &&
            (isDesktopChrome() || isDesktopEdge()));
    }
    // show the desktop chrome promotion
    function showDesktopInstallPrompt() {
        debugMessage("SHOW DESKTOP CHROME / EDGE PROMOTION");
        if (_desktopInstallPromptWasShown) {
            return;
        }
        // - if the prompt has not fired, wait for it the be fired, then show the promotion
        // - Don't bother showing promotion if wait time > DESKTOP_INSTALL_MAX_WAIT_TIME_MS,
        //   this means the event will never fire, like in Incognito mode
        if (_desktopInstallPromptEvent === null &&
            !(_desktopInstallPromptStartTimeMS &&
                ((Date.now() - _desktopInstallPromptStartTimeMS) > DESKTOP_INSTALL_MAX_WAIT_TIME_MS))) {
            // debugMessage("SHOW DESKTOP CHROME PROMOTION: PROMPT NOT FIRED");
            if (_desktopInstallPromptStartTimeMS === null) {
                _desktopInstallPromptStartTimeMS = Date.now();
            }
            setTimeout(() => {
                showDesktopInstallPrompt();
            }, DESKTOP_INSTALL_POLL_MS);
            return;
        }
        // debugMessage("SHOW DESKTOP CHROME PROMOTION: PROMPT FIRED");
        _desktopInstallPromptWasShown = true;
        var container = _createContainer(true // include_modal
        );
        _genDesktopChrome(container);
        _addContainerToBody(container);
    }
    function _showDesktopSafariPrompt() {
        debugMessage("SHOW SAFARI DESKTOP PROMPT");
        var container = _createContainer(true // include_modal
        );
        _genDesktopSafari(container);
        _addContainerToBody(container);
    }
    function div(className) {
        return `<div class="adhs-${className}">`;
    }
    function divBouncingArrow(className) {
        return `<div class="adhs-bouncing-arrow adhs-${className}">`;
    }
    return {
        appName,
        appIconUrl,
        assetUrl,
        maxModalDisplayCount,
        displayOptions,
        allowClose,
        showArrow,
        clearModalDisplayCount,
        isStandAlone,
        show,
        closeModal,
        modalIsShowing,
        isDeviceIOS,
        isDeviceAndroid,
        isBrowserAndroidChrome,
        isBrowserAndroidFacebook,
        isBrowserAndroidFirefox,
        isBrowserAndroidSamsung,
        isBrowserIOSChrome,
        isBrowserIOSFirefox,
        isBrowserIOSInAppFacebook,
        isBrowserIOSInAppInstagram,
        isBrowserIOSInAppLinkedin,
        isBrowserIOSInAppThreads,
        isBrowserIOSInAppTwitter,
        isBrowserIOSSafari,
        isBrowserIOSSafari26,
        isIOSVersion26OrHigher,
        isDesktopChrome,
        isDesktopEdge,
        isDesktopMac,
        isDesktopSafari,
        isDesktopWindows,
    };
}


/***/ }),

/***/ 605:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"Add to Home Screen":"Sur l\'écran d\'accueil","Add To Dock":"Ajouter au Dock","An icon will be added to your Dock so you can quickly access this website.":"Une icône sera ajoutée à votre Dock pour accéder rapidement à ce site web.","An icon will be added to your home screen so you can quickly access this website.":"Une icône sera ajoutée à votre écran d\'accueil pour accéder rapidement à ce site web.","An icon will be added to your Taskbar so you can quickly access this website.":"Une icône sera ajoutée à votre barre des tâches pour accéder rapidement à ce site web.","Install":"Installer","Install %s":"Installer %s","Install app":"Installer l\'application","Later":"Plus tard","More":"Plus","Open in browser":"Ouvrir dans le navigateur","Select %s from the menu that pops up.":"Sélectionnez %s dans le menu qui apparaît.","Select %s from the menu.":"Sélectionner %s dans le menu.","Share":"Partager","Tap %s":"Appuyez sur %s","Tap %s in the browser bar.":"Appuyez sur %s dans la barre du navigateur.","Tap %s in the menu.":"Toucher %s dans le menu.","Tap %s in the toolbar.":"Appuyez sur %s dans la barre d\'outils.","Tap the %s button above.":"Appuyez sur le bouton %s ci-dessus.","Tap the %s button below to open your system browser.":"Appuyez sur le bouton %s ci-dessous pour ouvrir votre navigateur système.","Tap the %s button in the toolbar.":"Appuyez sur le bouton %s dans la barre d\'outils.","Tap the %s button in the upper right corner.":"Appuyez sur le bouton %s dans le coin supérieur droit.","You may need to scroll down to find this menu item.":"Vous devrez peut-être faire défiler vers le bas pour trouver cet élément du menu."}');

/***/ }),

/***/ 858:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 982:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DISPLAY_OPTIONS_DEFAULT = exports.DeviceInfo = exports.DeviceType = void 0;
exports.isDisplayOptions = isDisplayOptions;
var DeviceType;
(function (DeviceType) {
    DeviceType["IOS"] = "IOS";
    DeviceType["ANDROID"] = "ANDROID";
    DeviceType["DESKTOP"] = "DESKTOP";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
class DeviceInfo {
    constructor(isStandAlone, canBeStandAlone, device) {
        this.isStandAlone = isStandAlone;
        this.canBeStandAlone = canBeStandAlone;
        this.device = device;
    }
}
exports.DeviceInfo = DeviceInfo;
exports.DISPLAY_OPTIONS_DEFAULT = {
    showMobile: true,
    showDesktop: true
};
function isDisplayOptions(obj) {
    return obj
        && typeof obj.showMobile === 'boolean'
        && typeof obj.showDesktop === 'boolean';
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const { AddToHomeScreen } = __webpack_require__(435);
window.AddToHomeScreen = AddToHomeScreen;

})();

/******/ })()
;