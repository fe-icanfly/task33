/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	    var common = __webpack_require__(1);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var common = {
	        resize: __webpack_require__(2),
	        cookie: __webpack_require__(3),
	        url: __webpack_require__(4),
	    }
	    return common;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;//屏幕适配
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var supportsOrientationChange = 'onorientationchange' in window ? 'orientationchange' : 'resize';
	    var timer;

	    function setRem() {
	        var clientWidth = document.documentElement.clientWidth;
	        var nowPX = clientWidth / 320 * 20;
	        document.documentElement.style.fontSize = nowPX + 'px';
	    }

	    setRem();

	    window.addEventListener(supportsOrientationChange, function() {
	        clearTimeout(timer);
	        timer = setTimeout(function() {
	            setRem();
	        }, 300);
	    }, false);

	    var viewport = document.querySelector("meta[name=viewport]");
	    var winWidths = 980;
	    if (winWidths == 980) {
	        winWidths = 360;
	    }
	    //alert(winWidths)
	    viewport.setAttribute('content', 'width=' + winWidths +
	        ',initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return {
	        /**
	         * cookie操作
	         * @param {[string]} name  cookie key值
	         * @param {[string]} value cookie value值
	         * @param {[number]} hours cookie 存在时长
	         */
	        set: function(name, value, hours) {
	            var exp = new Date();
	            exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
	            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	        },
	        get: function(name) {
	            if (!cookieEnd.length) {
	                var cookieContent = document.cookie + ";";
	                cookieContent = cookieContent.replace(/\s/g, "");
	                var cookieArr = cookieContent.split(";");
	                var cookieLength = cookieArr.length;
	                for (var i = 0; i < cookieLength; i++) {
	                    var _this = cookieArr[i].split('=');
	                    _this[0] = _this[0].replace(/"/, "");
	                    cookieEnd[_this[0]] = _this[1];
	                }
	            }
	            return cookieEnd[name] || "";
	        },
	        del: function(name) {
	            this.set(name, "", -1);
	        }
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return {
	        getUrlParam: function(sUrl, sKey,cut) {
	            var result = {};
	            if(!cut){
	            	cut = "?"
	            }
	            var reg = new RegExp("\\"+cut+"?(\\w+)=(\\w+)&?","g");
	            sUrl.replace(reg, function(a, key, val) {
	                if (result[key] !== void 0) {
	                    var t = result[key];
	                    result[key] = [].concat(t, val);
	                } else {
	                    result[key] = val;
	                }
	            });
	            if (sKey === void 0) {
	                return result;
	            } else {
	                return result[sKey] || '';
	            }
	        }
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ }
/******/ ]);