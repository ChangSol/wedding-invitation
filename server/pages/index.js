"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 299:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/main.266c05f2.jpg","height":2100,"width":1500,"blurDataURL":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAgABgMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAAnB//xAAcEAACAgIDAAAAAAAAAAAAAAACEQEDAAQFISL/2gAIAQEAAT8AjnrS27mS1xhD4fef/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwB//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwB//9k=","blurWidth":6,"blurHeight":8});

/***/ }),

/***/ 434:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ api)
/* harmony export */ });
/* unused harmony export commonApi */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(924);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const api = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: "http://192.168.0.7:8080"
});
const commonApi = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: "http://192.168.0.7:8080"
});
api.common = commonApi;
api.setToken = function setToken(tokenType, accessToken) {
    if (accessToken) {
        api.defaults.headers.common.authorization = `${tokenType} ${accessToken}`;
    } else {
        delete api.defaults.headers.common.authorization;
    }
};
api.interceptors.request.use(async (config)=>{
    if (config.headers) {
        const tokens = JSON.parse(localStorage.getItem("token") || "{}");
        if (tokens?.tokenType && tokens?.accessToken) {
            config.headers.authorization = `${tokens.tokenType} ${tokens.accessToken}`;
        }
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 838:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ KakaoMap)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LocationModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(134);




function KakaoMap() {
    const { 0: opened , 1: setOpened  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const mapScript = document.createElement("script");
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${"4b041a51fcb47c846098272b7412dd9e"}&autoload=false&libr/aries=services`;
        document.head.appendChild(mapScript);
        const onLoadKakaoMap = ()=>{
            window.kakao.maps.load(()=>{
                const mapContainer = document.getElementById("map");
                if (!mapContainer) return;
                const mapOptions = {
                    center: new window.kakao.maps.LatLng(37.484695, 126.781874),
                    level: 3
                };
                const map = new window.kakao.maps.Map(mapContainer, mapOptions);
                const markerPosition = new window.kakao.maps.LatLng(37.484695, 126.781874);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition
                });
                marker.setMap(map);
                window.kakao.maps.event.addListener(marker, "click", function() {
                    // 마커 위에 인포윈도우를 표시합니다
                    setOpened(true);
                });
                const zoomControl = new window.kakao.maps.ZoomControl();
                map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
            });
        };
        mapScript.addEventListener("load", onLoadKakaoMap);
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                id: "map",
                style: {
                    width: "100%",
                    height: 300,
                    backgroundColor: "gray"
                }
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                title: "채림웨딩홀 오시는 길",
                opened: opened,
                onClose: ()=>setOpened(false),
                size: "sm",
                overflow: "inside",
                styles: {
                    title: {
                        margin: "0 auto"
                    }
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LocationModal__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {})
            })
        ]
    });
};


/***/ }),

/***/ 134:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ LocationModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);


function LocationModal() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Box, {
        sx: (theme)=>({
                fontSize: theme.fontSizes.sm
            }),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                children: [
                    "\uD83C\uDFE0 경기 부천시 부천로 3-1 ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                    "(지번) 경기도 부천시 원미구 심곡동 173-1"
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Anchor, {
                href: "tel:032-228-8000",
                children: "\uD83D\uDCDE 032-228-8000"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Anchor, {
                href: "https://www.chaerimwedding.com",
                target: "_blank",
                children: "https://www.chaerimwedding.com/"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Image, {
                src: "https://www.chaerimwedding.com/modules/page/skins/sub/img/about/about_location_info_item_map.jpg",
                width: "100%",
                alt: "map",
                my: 20
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dl", {
                className: "mapUse",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("dt", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                            children: "지하철 이용시"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dd", {
                        className: "color",
                        children: [
                            "▶ 지하철 1호선 부천역 (북부역광장 방면)",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: "3번, 4번, 7번출구 이용"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("dt", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                            children: "버스 이용시"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dd", {
                        children: [
                            "▶ 부천북부역 하차",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                children: [
                                    "3, 5, 5-3, 5-4, 5-5, 8, 11, 12-1, 23-1, 50, 66, 70-2, 75, 606, 661",
                                    " ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {})
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("dt", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                            children: "자가용 이용시"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dd", {
                        className: "color",
                        children: [
                            "▶ 네비게이션 이용시 : 채림웨딩홀 또는 부천시 원미구 심곡동 173-1",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: "경인고속도로 부천 IC에서 약 15분 소요"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: "서울 외곽순환도로 시흥 IC에서 약 15분 소요"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: "주차 : 전용주차장 3시간 무료"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};


/***/ }),

/***/ 914:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ kakaoShare)
/* harmony export */ });
function kakaoShare() {
    window.Kakao.Share.sendDefault({
        objectType: "location",
        address: "경기 부천시 부천로 3-1 채림웨딩홀",
        addressTitle: "채림웨딩홀",
        content: {
            title: `${"이창주"}` + " ❤️ " + `${"박신희"}` + " 우리 결혼합니다!",
            description: "24년 02월 24일 (토) 오후 1시 \n채림웨딩홀 6층 컨벤션홀",
            imageUrl: "https://github.com/changsol/pictures/a10.jpg",
            link: {
                mobileWebUrl: "https://github.com/changsol/",
                webUrl: "https://github.com/changsol/"
            }
        },
        social: {
            likeCount: 1112,
            commentCount: 629,
            sharedCount: 604
        },
        buttons: [
            {
                title: "청첩장 보기",
                link: {
                    mobileWebUrl: "https://github.com/changsol/",
                    webUrl: "https://github.com/changsol/"
                }
            }, 
        ],
        installTalk: true
    });
}


/***/ }),

/***/ 461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ getRandomEmoji)
/* harmony export */ });
const emojis = [
    "\uD83D\uDE04",
    "\uD83D\uDE03",
    "\uD83D\uDE00",
    "\uD83D\uDE0A",
    "☺",
    "\uD83D\uDE09",
    "\uD83D\uDE0D",
    "\uD83D\uDE18",
    "\uD83D\uDE1A",
    "\uD83D\uDE17",
    "\uD83D\uDE19",
    "\uD83D\uDE1C",
    "\uD83D\uDE1D",
    "\uD83D\uDE1B",
    "\uD83D\uDE33",
    "\uD83D\uDE01",
    "\uD83D\uDE14",
    "\uD83D\uDE0C",
    "\uD83D\uDE12",
    "\uD83D\uDE1E",
    "\uD83D\uDE23",
    "\uD83D\uDE22",
    "\uD83D\uDE02",
    "\uD83D\uDE2D",
    "\uD83D\uDE2A",
    "\uD83D\uDE25",
    "\uD83D\uDE30",
    "\uD83D\uDE05",
    "\uD83D\uDE13",
    "\uD83D\uDE29",
    "\uD83D\uDE2B",
    "\uD83D\uDE28",
    "\uD83D\uDE31",
    "\uD83D\uDE20",
    "\uD83D\uDE21",
    "\uD83D\uDE24",
    "\uD83D\uDE16",
    "\uD83D\uDE06",
    "\uD83D\uDE0B",
    "\uD83D\uDE37",
    "\uD83D\uDE0E",
    "\uD83D\uDE34",
    "\uD83D\uDE35",
    "\uD83D\uDE32",
    "\uD83D\uDE1F",
    "\uD83D\uDE26",
    "\uD83D\uDE27",
    "\uD83D\uDE08",
    "\uD83D\uDE2E",
    "\uD83D\uDE2C",
    "\uD83D\uDE10",
    "\uD83D\uDE15",
    "\uD83D\uDE2F",
    "\uD83D\uDE36",
    "\uD83D\uDE07",
    "\uD83D\uDE0F",
    "\uD83D\uDE11",
    "\uD83D\uDC72",
    "\uD83D\uDC73",
    "\uD83D\uDC6E",
    "\uD83D\uDC77",
    "\uD83D\uDC82",
    "\uD83D\uDC76",
    "\uD83D\uDC66",
    "\uD83D\uDC67",
    "\uD83D\uDC68",
    "\uD83D\uDC69",
    "\uD83D\uDC74",
    "\uD83D\uDC75",
    "\uD83D\uDC71",
    "\uD83D\uDC7C",
    "\uD83D\uDC78",
    "\uD83D\uDE3A",
    "\uD83D\uDE38",
    "\uD83D\uDE3B",
    "\uD83D\uDE3D",
    "\uD83D\uDE3C",
    "\uD83D\uDE40",
    "\uD83D\uDE3F",
    "\uD83D\uDE39",
    "\uD83D\uDE3E",
    "\uD83D\uDC79",
    "\uD83D\uDC7A",
    "\uD83D\uDE48",
    "\uD83D\uDE49",
    "\uD83D\uDE4A",
    "\uD83D\uDC7D", 
];
function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
};


/***/ }),

/***/ 75:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tabler_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(116);
/* harmony import */ var _tabler_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_KakaoMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(838);
/* harmony import */ var _public_images_main_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(299);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(32);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mantine_hooks__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_LocationModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(134);
/* harmony import */ var _mantine_next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(664);
/* harmony import */ var _mantine_next__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_mantine_next__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _lib_KakaoShare__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(914);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(445);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_mantine_form__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _lib_randomEmojis__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(461);
/* harmony import */ var _mantine_carousel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(766);
/* harmony import */ var _mantine_carousel__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_mantine_carousel__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(180);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_queries__WEBPACK_IMPORTED_MODULE_14__]);
_queries__WEBPACK_IMPORTED_MODULE_14__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

















const getStaticProps = ()=>{
    const images = fs__WEBPACK_IMPORTED_MODULE_5___default().readdirSync(path__WEBPACK_IMPORTED_MODULE_6___default().join(process.cwd(), "public/pictures"));
    return {
        props: {
            images
        }
    };
};
const isMatchCommentPassword = (password, comment)=>{
    if (comment.password === password) {
        return true;
    }
    return false;
};
const COMMENT = "comment";
const Home = ({ images  })=>{
    const theme = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_1__.useMantineTheme)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();
    const { scrollIntoView , targetRef  } = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_8__.useScrollIntoView)();
    const { 0: photoModalOpened , 1: setPhotoModalOpened  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const { 0: navigation , 1: setNavigation  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const { 0: locationInfo , 1: setLocationInfo  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const { 0: share , 1: setShare  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const { 0: commentInputOpened , 1: setCommentInputOpened  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(true);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const { 0: commentsArray , 1: setCommentsArray  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(null);
    const { 0: selectedComment , 1: setSelectedComment  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(null);
    const { 0: commentPasswordError , 1: setCommentPasswordError  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const { 0: commentPwModalOpened , 1: setCommentPwModalOpened  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const { 0: commentEditModalOpened , 1: setCommentEditModalOpened  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const { 0: imagesArray , 1: setImagesArray  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(images);
    const [params, setParams] = react__WEBPACK_IMPORTED_MODULE_7___default().useState({
        sortType: "NEW",
        limit: 10
    });
    const getCongratulationsInfinityQuery = (0,_queries__WEBPACK_IMPORTED_MODULE_14__/* .useGetCongratulationsInfinityQuery */ .gO)(params);
    // const queryClient = useQueryClient();
    // queryClient.invalidateQueries([CONGRATULATION_QUERY_KEY]);
    const selectImage = (image)=>{
        const copiedImages = [
            ...images
        ];
        const index = copiedImages.findIndex((item)=>item === image);
        const previousImages = copiedImages.splice(0, index);
        const sortedImages = [
            ...copiedImages,
            ...previousImages
        ];
        setImagesArray(sortedImages);
        setPhotoModalOpened(true);
    };
    const slides = imagesArray.map((image, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_carousel__WEBPACK_IMPORTED_MODULE_13__.Carousel.Slide, {
            sx: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Image, {
                src: `/pictures/${image}`,
                alt: "wedding",
                width: 600,
                sx: {
                    objectFit: "cover"
                }
            })
        }, i));
    const imagesGrid = images.map((image, i)=>{
        const IMAGE = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Image, {
            src: `/pictures/${image}`,
            alt: "wedding",
            sx: {
                width: "100%",
                cursor: "pointer"
            },
            radius: "sm",
            onClick: ()=>{
                selectImage(image);
            }
        });
        if (i === 0) {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Grid.Col, {
                span: 12,
                children: IMAGE
            }, i);
        }
        if (image.includes("wide")) {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Grid.Col, {
                span: 6,
                sx: {
                    display: "flex",
                    alignItems: "center"
                },
                children: IMAGE
            }, i);
        }
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Grid.Col, {
            span: 4,
            children: IMAGE
        }, i);
    });
    const form = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_12__.useForm)({
        initialValues: {
            name: "",
            password: "",
            payload: ""
        },
        validate: {
            name: (value)=>{
                if (!value) {
                    return "이름을 입력해주세요.";
                }
                if (value.length < 2) {
                    return "이름을 2자 이상 입력해주세요.";
                }
                if (value.length > 10) {
                    return "이름은 10자 이하만 가능합니다.";
                }
                return null;
            },
            password: (value)=>{
                if (!value) {
                    return "비밀번호를 입력해주세요. ";
                }
                if (value.length < 4) {
                    return "비밀번호는 4자 이상 입력해주세요.";
                }
                if (value.length > 8) {
                    return "비밀번호는 8자 이하로 입력해주세요.";
                }
                return null;
            },
            payload: (value)=>{
                if (!value) {
                    return "내용을 입력해주세요.";
                }
                if (value.length > 100) {
                    return "100자 이하까지 작성 가능합니다.";
                }
                return null;
            }
        }
    });
    const commentOnSubmit = async (data)=>{
        const currentDate = Date.now();
        const commentData = {
            ...data,
            createdAt: currentDate,
            avatar: (0,_lib_randomEmojis__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z)()
        };
        setLoading(true);
        // await addDoc(collection(db, COMMENT), commentData)
        setLoading(false);
        setCommentInputOpened(false);
    };
    const editPwForm = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_12__.useForm)({
        initialValues: {
            password: ""
        }
    });
    const editPwFormOnSubmit = ({ password  })=>{
        if (!commentsArray || !selectedComment) return;
        if (!isMatchCommentPassword(password, selectedComment)) {
            setCommentPasswordError(true);
            return;
        }
        setCommentPwModalOpened(false);
        setCommentEditModalOpened(true);
        editForm.setValues({
            ...selectedComment
        });
    };
    const editForm = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_12__.useForm)({
        initialValues: {
            name: selectedComment?.name || "",
            password: selectedComment?.password || "",
            payload: selectedComment?.payload || ""
        },
        validate: {
            name: (value)=>{
                if (!value) {
                    return "이름을 입력해주세요.";
                }
                if (value.length < 2) {
                    return "이름을 2자 이상 입력해주세요.";
                }
                if (value.length > 10) {
                    return "이름은 10자 이하만 가능합니다.";
                }
                return null;
            },
            password: (value)=>{
                if (!value) {
                    return "비밀번호를 입력해주세요. ";
                }
                if (value.length < 4) {
                    return "비밀번호는 4자 이상 입력해주세요.";
                }
                if (value.length > 8) {
                    return "비밀번호는 8자 이하로 입력해주세요.";
                }
                return null;
            },
            payload: (value)=>{
                if (!value) {
                    return "내용을 입력해주세요.";
                }
                if (value.length > 100) {
                    return "100자 이하까지 작성 가능합니다.";
                }
                return null;
            }
        }
    });
    const editFormOnSubmit = async (data)=>{
        if (!selectedComment) return;
        setLoading(true);
        // await updateDoc(doc(db, COMMENT, selectedComment.id), {
        //   selectedComment,
        //   ...data,
        //   avatar: getRandomEmoji(),
        // })
        setLoading(false);
        setCommentEditModalOpened(false);
    };
    const onDeleteComment = async (id)=>{
        if (!id) return;
        const ok = window.confirm("정말 삭제하시겠습니까? ");
        if (ok) {
            setLoading(true);
            // await deleteDoc(doc(db, COMMENT, id))
            setLoading(false);
            setCommentEditModalOpened(false);
            setCommentInputOpened(true);
        }
    };
    react__WEBPACK_IMPORTED_MODULE_7___default().useEffect(()=>{
        function listener(event) {
            if (Math.ceil(window.scrollY + window.innerHeight + 30) > document.body.offsetHeight) {
                getCongratulationsInfinityQuery.fetchNextPage();
            }
        }
        document.addEventListener("scroll", listener);
        return ()=>{
            document.removeEventListener("scroll", listener);
        };
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
        p: 0,
        justify: "center",
        spacing: "sm",
        sx: {
            margin: "0 auto",
            maxWidth: theme.breakpoints.xs,
            width: "100%",
            overflowY: "scroll",
            overflowX: "hidden"
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    zIndex: 5000,
                    position: "fixed",
                    top: 0,
                    left: 0
                },
                onClick: ()=>{
                    getCongratulationsInfinityQuery.fetchNextPage();
                }
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.BackgroundImage, {
                src: _public_images_main_jpg__WEBPACK_IMPORTED_MODULE_4__/* ["default"].src */ .Z.src,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                    id: "hero",
                    m: 0,
                    p: 0,
                    align: "center",
                    justify: "space-between",
                    sx: {
                        width: "100%",
                        height: "100vh",
                        maxHeight: 700,
                        color: theme.colors.gray[0]
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                        justify: "space-between",
                        sx: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                align: "center",
                                py: 10,
                                sx: {
                                    fontSize: theme.fontSizes.md,
                                    letterSpacing: 8,
                                    fontWeight: 600,
                                    background: "linear-gradient(to bottom,rgba(0,0,0,.5) 10%,rgba(0,0,0,0.01))"
                                },
                                children: "결혼한다람쥐\uD83D\uDC3F️"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                align: "center",
                                py: 1,
                                sx: {
                                    fontSize: theme.fontSizes.md,
                                    letterSpacing: 8,
                                    marginTop: 80,
                                    paddingRight: 65,
                                    fontWeight: 600,
                                    background: "black"
                                },
                                children: "뱃살가려"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                id: "heroBottom",
                                align: "center",
                                spacing: "xs",
                                pb: 5,
                                sx: {
                                    width: theme.breakpoints.xs,
                                    background: "linear-gradient(to top,rgba(0,0,0,.5) 10%,rgba(0,0,0,0.01))"
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                        align: "center",
                                        sx: {
                                            fontSize: theme.fontSizes.sm,
                                            fontWeight: 400,
                                            letterSpacing: 10
                                        },
                                        children: "창솔루션 ❤️ 시니천사"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                        align: "center",
                                        sx: {
                                            fontSize: theme.fontSizes.xl,
                                            fontWeight: 700,
                                            letterSpacing: 12
                                        },
                                        children: "결혼합니다"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                        align: "center",
                                        sx: {
                                            fontSize: theme.fontSizes.sm,
                                            fontWeight: 300,
                                            letterSpacing: 3
                                        },
                                        children: "2024 . 02 . 24 . 오후 01 : 00"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                        mt: -8,
                                        align: "center",
                                        sx: {
                                            fontSize: theme.fontSizes.xs,
                                            fontWeight: 300,
                                            letterSpacing: 9
                                        },
                                        children: "채림 웨딩홀"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.UnstyledButton, {
                                        sx: {
                                            color: theme.colors.gray[0]
                                        },
                                        onClick: ()=>scrollIntoView({
                                                alignment: "start"
                                            }),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconArrowDownCircle, {
                                            size: 30,
                                            opacity: 0.8
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Divider, {
                variant: "dotted",
                mx: 10,
                ref: targetRef
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Paper, {
                shadow: "sm",
                px: "sm",
                mx: 5,
                py: 5,
                radius: "md",
                withBorder: true,
                sx: {
                    height: "100%",
                    backgroundColor: theme.colors.gray[0],
                    color: theme.colors.dark[4]
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Image, {
                        src: "/flower.svg",
                        alt: "flower",
                        width: 250,
                        mx: "auto",
                        mb: "xl"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                        align: "center",
                        sx: (theme)=>({
                                fontSize: theme.fontSizes.sm
                            }),
                        children: [
                            "평생을 함께 할 사람을 만났습니다. ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            "지금까지 살아온 모습도 걸어온 길도 달랐지만 ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            " 이제 같은 곳을 바라보며 함께 걸아가고 싶습니다. ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            "손을 맞잡은 이 순간부터 ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            "아름답고 소중한 기쁨으로 채워나갈 ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            " 저희의 여정을 지켜봐주세요.",
                            " ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            "언젠가 '서로 사랑하며 살아도 너무 짧은 삶이었다'고 ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            "말할 수 있도록 함께 노력하며 살겠습니다."
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Space, {
                        h: "md"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Divider, {
                        variant: "dashed"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Space, {
                        h: "md"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                        id: "avatarWrapper",
                        position: "center",
                        spacing: 8,
                        sx: {
                            flexWrap: "nowrap"
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                align: "center",
                                spacing: "xs",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Avatar, {
                                        // src={geonyAvatar.src}
                                        size: "lg",
                                        sx: {
                                            borderRadius: "50%"
                                        },
                                        alt: "geony"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                        id: "name",
                                        spacing: 5,
                                        align: "flex-end",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                size: "xs",
                                                children: "장남"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                size: "sm",
                                                children: "이창주"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                        spacing: 7,
                                        sx: {
                                            flexWrap: "nowrap"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                component: _mantine_next__WEBPACK_IMPORTED_MODULE_11__.NextLink,
                                                href: "tel:" + `${"010-2818-2040"}`,
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconPhone, {
                                                    size: 20
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                component: "a",
                                                href: `${"http://qr.kakao.com/talk/5WgK.d3zXRGuYYqEwhWmbSOnO1U-"}`,
                                                target: "_blank",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconBrandMessenger, {
                                                    size: 20
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Popover, {
                                                width: 140,
                                                position: "bottom",
                                                withArrow: true,
                                                shadow: "md",
                                                radius: "md",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Popover.Target, {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconCurrencyWon, {
                                                                size: 20
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Popover.Dropdown, {
                                                        p: 5,
                                                        px: 10,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                                spacing: 2,
                                                                sx: {
                                                                    position: "relative"
                                                                },
                                                                align: "flex-end",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                        size: theme.fontSizes.xs,
                                                                        children: "3333034673028"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                        size: theme.fontSizes.xs,
                                                                        children: [
                                                                            "카카오뱅크",
                                                                            " ",
                                                                            "이창주"
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                                                sx: {
                                                                    position: "absolute",
                                                                    top: 10,
                                                                    left: 5
                                                                },
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.CopyButton, {
                                                                    value: `${"3333034673028"}` + " " + `${"카카오뱅크"}`,
                                                                    children: ({ copied , copy  })=>copied ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                                            onClick: copy,
                                                                            color: "teal",
                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconClipboardCheck, {
                                                                                size: 20
                                                                            })
                                                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                                            onClick: copy,
                                                                            color: "blue",
                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconClipboard, {
                                                                                size: 20
                                                                            })
                                                                        })
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                        spacing: 0,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                                spacing: 5,
                                                sx: {
                                                    flexWrap: "nowrap"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                        size: "xs",
                                                        children: [
                                                            "아버지 : ",
                                                            "이정훈"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                        component: _mantine_next__WEBPACK_IMPORTED_MODULE_11__.NextLink,
                                                        href: "tel:010-1234-1234",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconPhone, {
                                                            size: 15
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                                spacing: 5,
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                        size: "xs",
                                                        children: [
                                                            "어머니 : ",
                                                            "윤석이"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                        component: _mantine_next__WEBPACK_IMPORTED_MODULE_11__.NextLink,
                                                        href: "tel:010-1234-1234",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconPhone, {
                                                            size: 15
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconHeart, {
                                    size: 25,
                                    opacity: 0.3
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                align: "center",
                                spacing: "xs",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Avatar, {
                                        // src={boraAvatar.src}
                                        size: "lg",
                                        sx: {
                                            borderRadius: "50%"
                                        },
                                        alt: "geony"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                        id: "name",
                                        spacing: 5,
                                        align: "flex-end",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                size: "xs",
                                                children: "장녀"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                size: "sm",
                                                children: "박신희"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                        spacing: 7,
                                        sx: {
                                            flexWrap: "nowrap"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                component: _mantine_next__WEBPACK_IMPORTED_MODULE_11__.NextLink,
                                                href: "tel:" + `${"010-9118-9855"}`,
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconPhone, {
                                                    size: 20
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                component: "a",
                                                href: `${"http://qr.kakao.com/talk/123123"}`,
                                                target: "_blank",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconBrandMessenger, {
                                                    size: 20
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Popover, {
                                                width: 140,
                                                position: "bottom",
                                                withArrow: true,
                                                shadow: "md",
                                                radius: "md",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Popover.Target, {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconCurrencyWon, {
                                                                size: 20
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Popover.Dropdown, {
                                                        p: 5,
                                                        px: 10,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                                spacing: 2,
                                                                sx: {
                                                                    position: "relative"
                                                                },
                                                                align: "flex-end",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                        size: theme.fontSizes.xs,
                                                                        children: "3333034673028"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                        size: theme.fontSizes.xs,
                                                                        children: [
                                                                            "카카오뱅크",
                                                                            " ",
                                                                            "박신희"
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                                                sx: {
                                                                    position: "absolute",
                                                                    top: 10,
                                                                    left: 5
                                                                },
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.CopyButton, {
                                                                    value: `${"3333034673028"}` + " " + `${"카카오뱅크"}`,
                                                                    children: ({ copied , copy  })=>copied ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                                            onClick: copy,
                                                                            color: "teal",
                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconClipboardCheck, {
                                                                                size: 20
                                                                            })
                                                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                                            onClick: copy,
                                                                            color: "blue",
                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconClipboard, {
                                                                                size: 20
                                                                            })
                                                                        })
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                        spacing: 0,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                                spacing: 5,
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                        size: "xs",
                                                        children: [
                                                            "아버지 : ",
                                                            "박기용"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                        component: _mantine_next__WEBPACK_IMPORTED_MODULE_11__.NextLink,
                                                        href: "tel:010-1234-1234",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconPhone, {
                                                            size: 15
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                                spacing: 5,
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                        size: "xs",
                                                        children: [
                                                            "어머니 : ",
                                                            "신혜정"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                        component: _mantine_next__WEBPACK_IMPORTED_MODULE_11__.NextLink,
                                                        href: "tel:010-1234-1234",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconPhone, {
                                                            size: 15
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Image, {
                        src: "/flower2.svg",
                        alt: "flower",
                        width: 250,
                        mx: "auto",
                        mt: 9
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Divider, {
                variant: "dotted",
                mx: 10
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Paper, {
                shadow: "sm",
                mx: 5,
                p: "sm",
                py: "md",
                radius: "md",
                withBorder: true,
                sx: {
                    backgroundColor: theme.colors.gray[0],
                    color: theme.colors.dark[4]
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Grid, {
                    grow: true,
                    gutter: 3,
                    children: imagesGrid
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Divider, {
                variant: "dotted",
                mx: 10
            }),
            photoModalOpened && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 990,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.CloseButton, {
                        size: 35,
                        p: 5,
                        sx: {
                            position: "absolute",
                            top: 30,
                            right: 30,
                            zIndex: 999,
                            backgroundColor: theme.fn.rgba(theme.white, 0.5),
                            borderRadius: "50%",
                            cursor: "pointer"
                        },
                        onClick: ()=>setPhotoModalOpened(false)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_carousel__WEBPACK_IMPORTED_MODULE_13__.Carousel, {
                        loop: true,
                        sx: {
                            width: "100%",
                            zIndex: 998
                        },
                        styles: {
                            control: {
                                width: 35,
                                height: 35
                            }
                        },
                        children: slides
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Overlay, {
                        color: "black",
                        onClick: ()=>{
                            setPhotoModalOpened(false);
                        }
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Paper, {
                mx: 5,
                shadow: "sm",
                p: "sm",
                py: "md",
                mb: 10,
                radius: "md",
                withBorder: true,
                sx: {
                    backgroundColor: theme.colors.gray[0],
                    color: theme.colors.dark[4]
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                    align: "center",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                            sx: {
                                fontSize: theme.fontSizes.md,
                                fontWeight: 400
                            },
                            children: "2023 . 02 . 24 (토) PM 01 : 00"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                            align: "center",
                            id: "location",
                            sx: {
                                fontSize: theme.fontSizes.md,
                                fontWeight: 400
                            },
                            children: [
                                "부천채림웨딩홀",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                    sx: {
                                        fontSize: theme.fontSizes.sm,
                                        fontWeight: 300
                                    },
                                    children: "(경기 부천시 부천로 3-1)"
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_KakaoMap__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Alert, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconAlertCircle, {
                                size: 16
                            }),
                            px: 15,
                            py: 7,
                            title: "주차 안내",
                            sx: {
                                width: "90%"
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                sx: (theme)=>({
                                        fontSize: theme.fontSizes.xs
                                    }),
                                children: [
                                    "전용 주차장에 주차 가능 (무료 3시간) ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                    "만차 시 이마트 주차 가능 (5000원 제공) ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                    "안내원의 유도에 따라주시면 감사하겠습니다."
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                            sx: {
                                width: "100%"
                            },
                            position: "center",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                    color: "blue.5",
                                    sx: {
                                        width: "40%"
                                    },
                                    onClick: ()=>setLocationInfo(true),
                                    children: "\uD83D\uDE8D 오시는길"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                    color: "green.5",
                                    sx: {
                                        width: "40%"
                                    },
                                    onClick: ()=>setNavigation(true),
                                    children: "\uD83D\uDE98 네비게이션"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                            color: "yellow.5",
                            sx: {
                                width: "84%"
                            },
                            onClick: ()=>setShare(true),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconShare, {
                                    size: 15
                                }),
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                    ml: 5,
                                    children: "공유하기"
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Paper, {
                shadow: "sm",
                px: "sm",
                mx: 5,
                py: 5,
                radius: "md",
                withBorder: true,
                sx: {
                    height: "100%",
                    backgroundColor: theme.colors.gray[0],
                    color: theme.colors.dark[4],
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                        hidden: commentInputOpened,
                        color: "blue",
                        sx: {
                            position: "absolute",
                            top: 10,
                            right: 20
                        },
                        onClick: ()=>setCommentInputOpened(true),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconWriting, {
                            size: 30
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                        my: 10,
                        size: "md",
                        align: "center",
                        sx: {
                            fontWeight: 300
                        },
                        children: [
                            "\uD83D\uDE0A Celebrations \uD83D\uDE0A ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            "축하글을 남기면 추첨을 통해 기프티콘을 드립니다. ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            "(로그인 필수)"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                        spacing: 10,
                        mb: 5,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Transition, {
                                mounted: commentInputOpened,
                                transition: "fade",
                                duration: 500,
                                timingFunction: "ease",
                                children: (styles)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                        style: styles,
                                        p: 5,
                                        py: 20,
                                        sx: {
                                            backgroundColor: theme.colors.gray[2],
                                            borderRadius: theme.radius.md,
                                            position: "relative"
                                        },
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                                            onSubmit: form.onSubmit(commentOnSubmit),
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                spacing: 10,
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                                        spacing: 0,
                                                        position: "center",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.TextInput, {
                                                                placeholder: "성함을 입력해주세요.",
                                                                label: "성함",
                                                                minLength: 2,
                                                                maxLength: 10,
                                                                withAsterisk: true,
                                                                ...form.getInputProps("name"),
                                                                sx: {
                                                                    width: 180
                                                                }
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.PasswordInput, {
                                                                label: "비밀번호",
                                                                withAsterisk: true,
                                                                ml: 10,
                                                                minLength: 4,
                                                                maxLength: 8,
                                                                sx: {
                                                                    width: 98
                                                                },
                                                                ...form.getInputProps("password")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.CloseButton, {
                                                                size: "lg",
                                                                sx: {
                                                                    position: "absolute",
                                                                    top: 5,
                                                                    right: 5
                                                                },
                                                                onClick: ()=>setCommentInputOpened(false)
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                                        spacing: 0,
                                                        position: "center",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.TextInput, {
                                                            placeholder: "휴대폰번호(전화번호)를 입력해주세요.",
                                                            label: "전화번호",
                                                            minLength: 6,
                                                            maxLength: 10,
                                                            ...form.getInputProps("name"),
                                                            sx: {
                                                                width: 290
                                                            }
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                        align: "center",
                                                        spacing: 10,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Textarea, {
                                                                placeholder: "축하 인사말을 작성해주세요.",
                                                                label: "인사말",
                                                                withAsterisk: true,
                                                                ...form.getInputProps("payload"),
                                                                sx: {
                                                                    width: 290
                                                                },
                                                                m: 0
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                                                disabled: loading,
                                                                type: "submit",
                                                                mr: 20,
                                                                sx: {
                                                                    alignSelf: "flex-end",
                                                                    width: 90,
                                                                    height: 35
                                                                },
                                                                children: "입력"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    })
                            }),
                            [
                                ...getCongratulationsInfinityQuery.data?.pages.flat() ?? []
                            ].map((comment, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                    id: "aComment",
                                    p: 5,
                                    style: {
                                        height: "100%",
                                        position: "relative",
                                        backgroundColor: theme.colors.gray[2],
                                        borderRadius: theme.radius.md
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                            noWrap: true,
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                spacing: 0,
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                size: "sm",
                                                                sx: {
                                                                    fontWeight: 500
                                                                },
                                                                children: comment.name
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                size: 10,
                                                                color: "dimmed",
                                                                children: new Date(comment.createdAt).toLocaleDateString("ko")
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                        size: "sm",
                                                        mt: 5,
                                                        sx: {
                                                            lineBreak: "anywhere"
                                                        },
                                                        children: comment.contents
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                            sx: {
                                                position: "absolute",
                                                top: 5,
                                                right: 5
                                            },
                                            spacing: "xs",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                color: "blue",
                                                onClick: ()=>{
                                                    // setSelectedComment(comment);
                                                    setCommentPwModalOpened(true);
                                                },
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconEdit, {
                                                    size: 20
                                                })
                                            })
                                        })
                                    ]
                                }, i))
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                opened: navigation,
                onClose: ()=>setNavigation(false),
                centered: true,
                size: 200,
                withCloseButton: false,
                styles: {
                    modal: {
                        background: theme.fn.rgba(theme.white, 0.5)
                    },
                    close: {
                        backgroundColor: theme.fn.rgba(theme.white, 0.5),
                        color: theme.colors.dark[4],
                        borderRadius: "50%"
                    },
                    title: {
                        margin: "0 auto"
                    }
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                    position: "center",
                    spacing: "xl",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                            sx: {
                                width: 50
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Image, {
                                src: "/kakaomap.png",
                                width: 50,
                                alt: "kakaomap",
                                onClick: ()=>router.push("https://map.kakao.com/link/to/부천채림웨딩홀,37.484695,126.781874")
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                            sx: {
                                width: 50
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Image, {
                                src: "/navermap.png",
                                width: 50,
                                alt: "navermap",
                                onClick: ()=>router.push("nmap://navigation?dlat=37.484695,126.781874&dname=부천채림웨딩홀&appname=http://localhost:3000")
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                title: "채림웨딩홀 오시는 길",
                opened: locationInfo,
                onClose: ()=>setLocationInfo(false),
                size: "sm",
                overflow: "inside",
                styles: {
                    title: {
                        margin: "0 auto"
                    }
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_LocationModal__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {})
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                opened: share,
                onClose: ()=>setShare(false),
                centered: true,
                withCloseButton: false,
                styles: {
                    modal: {
                        background: theme.fn.rgba(theme.white, 0.5)
                    },
                    close: {
                        backgroundColor: theme.fn.rgba(theme.white, 0.5),
                        color: theme.colors.dark[4],
                        borderRadius: "50%"
                    },
                    title: {
                        margin: "0 auto"
                    }
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                    position: "center",
                    spacing: "xl",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                            sx: {
                                width: 50
                            },
                            onClick: ()=>(0,_lib_KakaoShare__WEBPACK_IMPORTED_MODULE_16__/* .kakaoShare */ .E)(),
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Image, {
                                src: "/kakaotalk.png",
                                width: 50,
                                alt: "kakaotalk",
                                onClick: ()=>router.push("/")
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.CopyButton, {
                            value: "https://github.com/changsol/",
                            children: ({ copied , copy  })=>{
                                if (copied) {
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Notification, {
                                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconCheck, {
                                                    size: 18
                                                }),
                                                color: "teal",
                                                sx: {
                                                    width: 200,
                                                    position: "absolute",
                                                    top: -60,
                                                    left: 0,
                                                    right: 0,
                                                    margin: "0 auto",
                                                    zIndex: 999
                                                },
                                                children: "주소 복사 완료"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                sx: {
                                                    width: 50,
                                                    height: 50,
                                                    backgroundColor: theme.colors.red[5]
                                                },
                                                onClick: copy,
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconLink, {
                                                    size: 40,
                                                    color: "white"
                                                })
                                            })
                                        ]
                                    });
                                } else {
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Notification, {
                                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconCheck, {
                                                    size: 18
                                                }),
                                                color: "teal",
                                                sx: {
                                                    width: 200,
                                                    position: "absolute",
                                                    top: -60,
                                                    left: 0,
                                                    right: 0,
                                                    margin: "0 auto",
                                                    zIndex: 999
                                                },
                                                children: "주소 복사 미완료"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                                sx: {
                                                    width: 50,
                                                    height: 50,
                                                    backgroundColor: theme.colors.green[5]
                                                },
                                                onClick: copy,
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconLink, {
                                                    size: 40,
                                                    color: "white"
                                                })
                                            })
                                        ]
                                    });
                                }
                            }
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                opened: commentPwModalOpened,
                centered: true,
                withCloseButton: false,
                onClose: ()=>setCommentPwModalOpened(false),
                size: 240,
                styles: {
                    modal: {
                        background: theme.fn.rgba(theme.white, 0.8)
                    }
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                        onSubmit: editPwForm.onSubmit(editPwFormOnSubmit),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                            spacing: 5,
                            align: "flex-end",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.PasswordInput, {
                                    "data-autofocus": true,
                                    label: "비밀번호",
                                    withAsterisk: true,
                                    minLength: 4,
                                    maxLength: 8,
                                    sx: {
                                        width: 160
                                    },
                                    ...editPwForm.getInputProps("password")
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                    type: "submit",
                                    p: 0,
                                    sx: {
                                        width: 35,
                                        height: 35
                                    },
                                    children: "입력"
                                })
                            ]
                        })
                    }),
                    commentPasswordError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Notification, {
                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons__WEBPACK_IMPORTED_MODULE_2__.IconX, {
                            size: 18
                        }),
                        color: "red",
                        onClose: ()=>setCommentPasswordError(false),
                        children: "비밀번호가 틀렸습니다."
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                centered: true,
                size: 340,
                opened: commentEditModalOpened,
                onClose: ()=>{
                    setCommentEditModalOpened(false);
                    setSelectedComment(null);
                },
                styles: {
                    header: {
                        height: 0
                    }
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                    onSubmit: editForm.onSubmit(editFormOnSubmit),
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                        spacing: 0,
                        align: "center",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                sx: {
                                    width: 350,
                                    height: 80
                                },
                                spacing: 0,
                                position: "center",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.TextInput, {
                                        placeholder: "성함을 입력해주세요.",
                                        label: "성함",
                                        minLength: 2,
                                        maxLength: 10,
                                        withAsterisk: true,
                                        ...editForm.getInputProps("name"),
                                        sx: {
                                            width: 140
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.PasswordInput, {
                                        label: "비밀번호",
                                        withAsterisk: true,
                                        ml: 10,
                                        minLength: 4,
                                        maxLength: 8,
                                        sx: {
                                            width: 98
                                        },
                                        ...editForm.getInputProps("password")
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                spacing: 10,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Textarea, {
                                        placeholder: "축하 인사말을 작성해주세요.",
                                        withAsterisk: true,
                                        ...editForm.getInputProps("payload"),
                                        sx: {
                                            width: 250
                                        },
                                        m: 0
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                        position: "apart",
                                        px: 20,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                                color: "red",
                                                disabled: loading,
                                                p: 0,
                                                sx: {
                                                    width: 90,
                                                    height: 35
                                                },
                                                onClick: ()=>onDeleteComment(selectedComment?.id),
                                                children: "삭제 하기"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                                disabled: loading,
                                                type: "submit",
                                                p: 0,
                                                sx: {
                                                    width: 90,
                                                    height: 35
                                                },
                                                children: "수정 완료"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Anchor, {
                align: "center",
                href: "https://github.com/changsol",
                mb: 30,
                color: "gray",
                children: "Made by ChangSol"
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 180:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gO": () => (/* binding */ useGetCongratulationsInfinityQuery)
/* harmony export */ });
/* unused harmony exports CONGRATULATION_QUERY_KEY, useGetCongratulationsQuery */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(434);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_apis__WEBPACK_IMPORTED_MODULE_2__]);
_apis__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const CONGRATULATION_QUERY_KEY = "congratulation";
// 축하글 조회
const useGetCongratulationsQuery = (params)=>{
    return useQuery([
        CONGRATULATION_QUERY_KEY,
        params
    ], ()=>api.get(`/v1/congratulation/no-offset`, {
            params
        }).then(({ data: responseData  })=>responseData), {
        enabled: !!params
    });
};
const useGetCongratulationsInfinityQuery = (params)=>{
    return (0,react_query__WEBPACK_IMPORTED_MODULE_1__.useInfiniteQuery)([
        CONGRATULATION_QUERY_KEY,
        params
    ], ({ pageParam: lastId  })=>{
        return _apis__WEBPACK_IMPORTED_MODULE_2__/* .api.get */ .h.get(`/v1/congratulation/no-offset`, {
            params: {
                ...params,
                lastId
            }
        }).then(({ data: responseData  })=>responseData);
    }, {
        enabled: !!params,
        getNextPageParam: (lastPage)=>{
            return lastPage[lastPage.length - 1]?.id;
        }
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 766:
/***/ ((module) => {

module.exports = require("@mantine/carousel");

/***/ }),

/***/ 247:
/***/ ((module) => {

module.exports = require("@mantine/core");

/***/ }),

/***/ 445:
/***/ ((module) => {

module.exports = require("@mantine/form");

/***/ }),

/***/ 32:
/***/ ((module) => {

module.exports = require("@mantine/hooks");

/***/ }),

/***/ 664:
/***/ ((module) => {

module.exports = require("@mantine/next");

/***/ }),

/***/ 116:
/***/ ((module) => {

module.exports = require("@tabler/icons");

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

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

/***/ }),

/***/ 924:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(75));
module.exports = __webpack_exports__;

})();