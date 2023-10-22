"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 930:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(247);
;// CONCATENATED MODULE: ./lib/sakura.js
/*!
 * Sakura.js 1.1.1
 * Vanilla JS version of jQuery-Sakura: Make it rain sakura petals.
 * https://github.com/jhammann/sakura
 *
 * Copyright 2019-2019 Jeroen Hammann
 *
 * Released under the MIT License
 *
 * Released on: September 4, 2019
 */ 
function Sakura(selector, options) {
    var _this = this;
    if (typeof selector === "undefined") {
        throw new Error("No selector present. Define an element.");
    }
    this.el = document.getElementById(selector) // Defaults for the option object, which gets extended below.
    ;
    var defaults = {
        className: "sakura",
        // Classname of the petal. This corresponds with the css.
        fallSpeed: 3,
        // Speed factor in which the petal falls (higher is slower).
        maxSize: 14,
        // The maximum size of the petal.
        minSize: 10,
        // The minimum size of the petal.
        delay: 300,
        // Delay between petals.
        colors: [
            {
                // You can add multiple colors (chosen randomly) by adding elements to the array.
                gradientColorStart: "rgba(255, 183, 197, 0.9)",
                // Gradient color start (rgba).
                gradientColorEnd: "rgba(255, 197, 208, 0.9)",
                // Gradient color end (rgba).
                gradientColorDegree: 120
            }, 
        ]
    } // Merge defaults with user options.
    ;
    var extend = function extend(originalObj, newObj) {
        Object.keys(originalObj).forEach(function(key) {
            if (newObj && Object.prototype.hasOwnProperty.call(newObj, key)) {
                var origin = originalObj;
                origin[key] = newObj[key];
            }
        });
        return originalObj;
    };
    this.settings = extend(defaults, options) // Hide horizontal scrollbars on the target element.
    ;
    this.el.style.overflowX = "hidden" // Random array element
    ;
    function randomArrayElem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    } // Random integer
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } // Check for animation events.
    var prefixes = [
        "webkit",
        "moz",
        "MS",
        "o",
        ""
    ];
    function PrefixedEvent(element, type, callback) {
        for(var p = 0; p < prefixes.length; p += 1){
            var animType = type;
            if (!prefixes[p]) {
                animType = type.toLowerCase();
            }
            element.addEventListener(prefixes[p] + animType, callback, false);
        }
    } // Check if the element is in the viewport.
    function elementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= "50%" && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= "50%";
    }
    this.createPetal = function() {
        if (_this.el.dataset.sakuraAnimId) {
            setTimeout(function() {
                window.requestAnimationFrame(_this.createPetal);
            }, _this.settings.delay);
        } // Name the animations. These have to match the animations in the CSS file.
        var animationNames = {
            blowAnimations: [
                "blow-soft-left",
                "blow-medium-left",
                "blow-soft-right",
                "blow-medium-right", 
            ],
            swayAnimations: [
                "sway-0",
                "sway-1",
                "sway-2",
                "sway-3",
                "sway-4",
                "sway-5",
                "sway-6",
                "sway-7",
                "sway-8", 
            ]
        } // Get one random animation of each type and randomize fall time of the petals
        ;
        var blowAnimation = randomArrayElem(animationNames.blowAnimations);
        var swayAnimation = randomArrayElem(animationNames.swayAnimations);
        var fallTime = (document.documentElement.clientHeight * 0.007 + Math.round(Math.random() * 5)) * _this.settings.fallSpeed // Create animations
        ;
        var animationsArr = [
            "fall ".concat(fallTime, "s linear 0s 1"),
            "".concat(blowAnimation, " ").concat((fallTime > 30 ? fallTime : 30) - 20 + randomInt(0, 20), "s linear 0s infinite"),
            "".concat(swayAnimation, " ").concat(randomInt(2, 4), "s linear 0s infinite"), 
        ];
        var animations = animationsArr.join(", ") // Create petal and give it a random size.
        ;
        var petal = document.createElement("div");
        petal.classList.add(_this.settings.className);
        var height = randomInt(_this.settings.minSize, _this.settings.maxSize);
        var width = height - Math.floor(randomInt(0, _this.settings.minSize) / 3);
        var color = randomArrayElem(_this.settings.colors) // Get a random color.
        ;
        petal.style.background = "linear-gradient(".concat(color.gradientColorDegree, "deg, ").concat(color.gradientColorStart, ", ").concat(color.gradientColorEnd, ")");
        petal.style.webkitAnimation = animations;
        petal.style.animation = animations;
        petal.style.borderRadius = "".concat(randomInt(_this.settings.maxSize, _this.settings.maxSize + Math.floor(Math.random() * 10)), "px ").concat(randomInt(1, Math.floor(width / 4)), "px");
        petal.style.height = "".concat(height, "px");
        petal.style.left = "".concat(Math.random() * 100, "%");
        petal.style.marginTop = "".concat(-(Math.floor(Math.random() * 20) + 15), "px");
        petal.style.width = "".concat(width, "px");
        // Remove petals of which the animation ended.
        PrefixedEvent(petal, "AnimationEnd", function() {
            if (!elementInViewport(petal)) {
                petal.remove();
            }
        }) // Remove petals that float out of the viewport.
        ;
        PrefixedEvent(petal, "AnimationIteration", function() {
            if (!elementInViewport(petal)) {
                petal.remove();
            }
        }) // Add the petal to the target element.
        ;
        _this.el.appendChild(petal);
    };
    this.el.setAttribute("data-sakura-anim-id", window.requestAnimationFrame(this.createPetal));
};
Sakura.prototype.start = function() {
    var animId = this.el.dataset.sakuraAnimId;
    if (!animId) {
        this.el.setAttribute("data-sakura-anim-id", window.requestAnimationFrame(this.createPetal));
    } else {
        throw new Error("Sakura is already running.");
    }
};
Sakura.prototype.stop = function() {
    var _this2 = this;
    var graceful = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var animId = this.el.dataset.sakuraAnimId;
    if (animId) {
        window.cancelAnimationFrame(animId);
        this.el.setAttribute("data-sakura-anim-id", "");
    } // Remove all current blossoms at once.
    // You can also set 'graceful' to true to stop new petals from being created.
    // This way the petals won't be removed abruptly.
    if (!graceful) {
        setTimeout(function() {
            var petals = document.getElementsByClassName(_this2.settings.className);
            while(petals.length > 0){
                petals[0].parentNode.removeChild(petals[0]);
            }
        }, this.settings.delay + 50);
    }
};

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: ./styles/GlobalStyles.tsx


function GlobalStyles() {
    return /*#__PURE__*/ jsx_runtime_.jsx(core_.Global, {
        styles: (theme)=>({
                "*, *::before, *::after": {
                    boxSizing: "border-box"
                },
                html: {
                    overflowX: "hidden",
                    /* Prevent font scaling in landscape */ WebkitTextSizeAdjust: "none" /*Chrome, Safari, newer versions of Opera*/ ,
                    MozTextSizeAdjust: "none" /*Firefox*/ ,
                    msTextSizeAdjust: "none" /*Ie*/ ,
                    OTextSizeAdjust: "none" /*old versions of Opera*/ 
                },
                body: {
                    overflowX: "hidden",
                    ...theme.fn.fontStyles(),
                    fontSize: theme.fontSizes.sm,
                    lineHeight: theme.lineHeight,
                    color: theme.colors.gray[4]
                },
                a: {
                    all: "unset"
                }
            })
    });
};

// EXTERNAL MODULE: external "react-query"
var external_react_query_ = __webpack_require__(175);
;// CONCATENATED MODULE: ./pages/_app.tsx








(__webpack_require__(142).config)();
const client = new external_react_query_.QueryClient();
function MyApp({ Component , pageProps  }) {
    const { 0: loading , 1: setLoading  } = (0,external_react_.useState)(true);
    // mount loading
    (0,external_react_.useEffect)(()=>{
        setLoading(false);
    }, []);
    //flower
    (0,external_react_.useEffect)(()=>{
        if (false) {}
    }, [
        loading
    ]);
    // Kakao share init
    (0,external_react_.useEffect)(()=>{
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(`${"4b041a51fcb47c846098272b7412dd9e"}`);
        }
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_query_.QueryClientProvider, {
        client: client,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                    children: "창솔루션❤️시니천사"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(core_.MantineProvider, {
                withGlobalStyles: true,
                withNormalizeCSS: true,
                theme: {
                    breakpoints: {
                        xs: 400,
                        sm: 500,
                        md: 800,
                        lg: 1000,
                        xl: 1200
                    },
                    fontFamily: "Noto Sans KR"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(GlobalStyles, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        id: "main",
                        style: {
                            overflow: "hidden",
                            position: "relative"
                        },
                        children: loading ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                            children: "Loading..."
                        }) : /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                            ...pageProps
                        })
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 247:
/***/ ((module) => {

module.exports = require("@mantine/core");

/***/ }),

/***/ 142:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 175:
/***/ ((module) => {

module.exports = require("react-query");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(930));
module.exports = __webpack_exports__;

})();