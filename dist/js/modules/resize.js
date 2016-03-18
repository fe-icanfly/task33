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
/***/ function(module, exports) {

	//屏幕适配
	(function() {
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
	    var winWidths = $(window).width();
	    if (winWidths == 980) {
	        winWidths = 360;
	    }
	    //alert(winWidths)
	    viewport.setAttribute('content', 'width=' + winWidths +
	        ',initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
		return $("body,html").css("display", "block");
	})()


/***/ }
/******/ ]);