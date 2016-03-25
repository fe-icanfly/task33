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

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var common = __webpack_require__(1);
	    var $ = __webpack_require__(6);
	    var config = {
	        width: 10,
	        height: 10,
	    };
	    (function mapinit(){
		    $(".map-main").append("<ol></ol>");
		    var $ul = $(".map-main ol");
		    $ul.append("<li></li>");
		    var $li = $("li:last-child");
		    for (var i = 1; i <= config.width; i++) {
		        $li.append("<span>" + i + "</span>");
		    }
		    $(".map-main").append("<ul></ul>");
		    $ul = $(".map-main ul:last-child");
		    for (var j = 1; j <= config.height; j++) {
			    $ul.append("<li></li>");
		    	$li = $("ul:last-child li:last-child");
		        for (var i = 1; i <= config.width; i++) {
		            $li.append("<span></span>");
		        }
		    }
	    	var block = __webpack_require__(7);
	    	var instructions = __webpack_require__(8);
		    $(".map-main").append("<div id='block' class='block'></div>");
		    instructions();
	    })();
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var common = {
	        mobileUtil: __webpack_require__(2),
	        cookie: __webpack_require__(3),
	        url: __webpack_require__(4),
	        date: __webpack_require__(5),
	    }
	    return common;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * MobileWeb 通用功能助手，包含常用的 UA 判断、页面适配、search 参数转 键值对。
	 * 该 JS 应在 head 中尽可能早的引入，减少重绘。
	 *
	 * fixScreen 方法根据两种情况适配，该方法自动执行。
	 *      1. 定宽： 对应 meta 标签写法 -- <meta name="viewport" content="target-densitydpi=device-dpi,width=750">
	 *          该方法会提取 width 值，主动添加 scale 相关属性值。
	 *          注意： 如果 meta 标签中指定了 initial-scale， 该方法将不做处理（即不执行）。
	 *      2. REM: 不用写 meta 标签，该方法根据 dpr 自动生成，并在 html 标签中加上 data-dpr 和 font-size 两个属性值。
	 *          该方法约束：IOS 系统最大 dpr = 3，其它系统 dpr = 1，页面每 dpr 最大宽度（即页面宽度/dpr） = 750，REM 换算比值为 16。
	 *          对应 css 开发，任何弹性尺寸均使用 rem 单位，rem 默认宽度为 视觉稿宽度 / 16;
	 *              scss 中 $ppr(pixel per rem) 变量写法 -- $ppr: 750px/16/1rem;
	 *                      元素尺寸写法 -- html { font-size: $ppr*1rem; } body { width: 750px/$ppr; }。
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return (function(win, doc) {
	        var UA = navigator.userAgent,
	            isAndroid = /android|adr/gi.test(UA),
	            isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid, // 据说某些国产机的UA会同时包含 android iphone 字符
	            isMobile = isAndroid || isIos; // 粗略的判断

	        return {
	            isAndroid: isAndroid,
	            isIos: isIos,
	            isMobile: isMobile,

	            isNewsApp: /NewsApp\/[\d\.]+/gi.test(UA),
	            isWeixin: /MicroMessenger/gi.test(UA),
	            isQQ: /QQ\/\d/gi.test(UA),
	            isYixin: /YiXin/gi.test(UA),
	            isWeibo: /Weibo/gi.test(UA),
	            isTXWeibo: /T(?:X|encent)MicroBlog/gi.test(UA),

	            tapEvent: isMobile ? 'tap' : 'click',

	            /**
	             * 缩放页面
	             */
	            fixScreen: function() {
	                var metaEl = doc.querySelector('meta[name="viewport"]'),
	                    metaCtt = metaEl ? metaEl.content : '',
	                    matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
	                    matchWidth = metaCtt.match(/width=([^,\s]+)/);

	                if (!metaEl) { // REM
	                    var docEl = doc.documentElement,
	                        maxwidth = docEl.dataset.mw || 750, // 每 dpr 最大页面宽度
	                        dpr = isIos ? Math.min(win.devicePixelRatio, 3) : 1,
	                        scale = 1 / dpr,
	                        tid;

	                    docEl.removeAttribute('data-mw');
	                    docEl.dataset.dpr = dpr;
	                    metaEl = doc.createElement('meta');
	                    metaEl.name = 'viewport';
	                    metaEl.content = fillScale(scale);
	                    docEl.firstElementChild.appendChild(metaEl);

	                    var refreshRem = function() {
	                        var width = docEl.getBoundingClientRect().width;
	                        if (width / dpr > maxwidth) {
	                            width = maxwidth * dpr;
	                        }
	                        var rem = width / 16;
	                        docEl.style.fontSize = rem + 'px';
	                    };

	                    win.addEventListener('resize', function() {
	                        clearTimeout(tid);
	                        tid = setTimeout(refreshRem, 300);
	                    }, false);
	                    win.addEventListener('pageshow', function(e) {
	                        if (e.persisted) {
	                            clearTimeout(tid);
	                            tid = setTimeout(refreshRem, 300);
	                        }
	                    }, false);

	                    refreshRem();
	                } else if (isMobile && !matchScale && (matchWidth && matchWidth[1] != 'device-width')) { // 定宽
	                    var width = parseInt(matchWidth[1]),
	                        iw = win.innerWidth || width,
	                        ow = win.outerWidth || iw,
	                        sw = win.screen.width || iw,
	                        saw = win.screen.availWidth || iw,
	                        ih = win.innerHeight || width,
	                        oh = win.outerHeight || ih,
	                        ish = win.screen.height || ih,
	                        sah = win.screen.availHeight || ih,
	                        w = Math.min(iw, ow, sw, saw, ih, oh, ish, sah),
	                        scale = w / width;

	                    if (scale < 1) {
	                        metaEl.content = metaCtt + ',' + fillScale(scale);
	                    }
	                }

	                function fillScale(scale) {
	                    return 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
	                }
	            },

	            /**
	             * 转href参数成键值对
	             * @param href {string} 指定的href，默认为当前页href
	             * @returns {object} 键值对
	             */
	            getSearch: function(href) {
	                href = href || win.location.search;
	                var data = {},
	                    reg = new RegExp("([^?=&]+)(=([^&]*))?", "g");
	                href && href.replace(reg, function($0, $1, $2, $3) {
	                    data[$1] = $3;
	                });
	                return data;
	            }
	        };
	    })(window, document);
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		var dateJs = {};
	    dateJs.formatDate = function(oDate, sFormation) {
	        var add0 = function(num) {
	            if (num < 10)
	                return 0 + "" + num;
	            else
	                return num;

	        }
	        var o = {
	            "yyyy": oDate.getFullYear(),
	            "yy": oDate.getFullYear() % 100,
	            "MM": add0(oDate.getMonth() + 1),
	            "M": oDate.getMonth() + 1,
	            "dd": add0(oDate.getDate()),
	            "d": oDate.getDate(),
	            "HH": add0(oDate.getHours()),
	            "H": oDate.getHours(),
	            "hh": add0(oDate.getHours() % 12),
	            "h": oDate.getHours() % 12,
	            "mm": add0(oDate.getMinutes()),
	            "m": oDate.getMinutes(),
	            "ss": add0(oDate.getSeconds()),
	            "s": oDate.getSeconds(),
	            "w": function() {
	                var day = ["日", "一", "二", "三", "四", "五", "六"];
	                return day[oDate.getDay()];
	            }(),
	        }
	        sFormation = sFormation.replace(/([a-z]+)/ig, function($1) {
	            return o[$1]
	        });
	        return sFormation;
	    };
	    return dateJs;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    function $(dom) {
	        var dom = document.querySelector(dom);
	        if (!dom)
	            return {
	                on: function() {},
	                css: function() {},
	                off: function() {},
	            }
	        return {
	            on: function(_event, callback) {
	                if (dom.addEventListener)
	                    dom.addEventListener(_event, callback, false);
	                else if (dom.attachEvent) //ie6到ie8  
	                    target.attachEvent("on" + _event, callback);
	            },
	            css: function(a) {
	                for (i in a) {
	                    dom.style[i] = a[i];
	                }
	            },
	            off: function(_event) {
	                dom.removeEventListener(_event, function() {}, false);
	            },
	            html: function(a) {
	                dom.innerHTML = a;
	            },
	            attr: function(attr, val) {
	                console.log(attr + "111" + val);
	                dom.setAttribute(attr, val);
	                return dom;
	            },
	            append : function(_dom){
	            	dom.innerHTML += _dom;
	            },
	            val : function(){
	                return dom.value;
	            }
	        }
	    }
	    return $;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var $ = __webpack_require__(6);
	    var block = function() {
	        this.position = {
	            x: 0,
	            y: 0.
	        };
	        this.direction = "top";
	        this.dom = $("#block");
	    };
	    block.prototype = {
	        setPostiton: function() {
	            this.dom = $("#block");
	            this.dom.css({
	                "left": this.position.x*30 + "px",
	                "top": this.position.y*30 + "px",
	            })
	        },
	        setRotate: function() {
	            this.dom = $("#block");
	            var _thisRotate = 0
	            switch (this.direction) {
	                case "top":
	                    _thisRotate = 0;
	                    break;
	                case "left":
	                    _thisRotate = -90;
	                    break;
	                case "right":
	                    _thisRotate = 90;
	                    break;
	                case "bottom":
	                    _thisRotate = 180;
	                    break;
	            }
	            this.dom.css({
	                "transform": "rotate(" + _thisRotate + "deg)"
	            })
	        }
	    }
	    block.prototype.move = function() {
	        var _this = this;
	        return {
	            to: function(x, y) {
	                _this.position.x += x;
	                _this.position.y += y;
	                _this.setPostiton();
	            },
	            top: function(px) {
	                var _px = px || 1;
	                this.to(0, -_px);
	            },
	            left: function(px) {
	                var _px = px || 1;
	                this.to(-_px, 0);
	            },
	            bottom: function(px) {
	                var _px = px || 1;
	                this.to(0, _px);
	            },
	            right: function(px) {
	                var _px = px || 1;
	                this.to(_px, 0);
	            },
	            next : function(px){
	                var _px = px || 1;
	                switch (_this.direction) {
	                    case "top":
	                        return [0,-_px];
	                        break;
	                    case "left":
	                        return [-_px,0];
	                        break;
	                    case "right":
	                        return [_px,0];
	                        break;
	                    case "bottom":
	                        return [0,_px];
	                        break;
	                }
	            },
	            go: function(px) {
	                var _px = px || 1;
	                switch (_this.direction) {
	                    case "top":
	                        this.top(_px);
	                        break;
	                    case "left":
	                        this.left(_px);
	                        break;
	                    case "right":
	                        this.right(_px);
	                        break;
	                    case "bottom":
	                        this.bottom(_px);
	                        break;
	                }

	            }
	        }
	    };
	    block.prototype.rotate = function() {
	        var _this = this;
	        return {
	            top: function(px) {
	                _this.direction = "top";
	                _this.setRotate();
	            },
	            left: function(px) {
	                _this.direction = "left";
	                _this.setRotate();
	            },
	            bottom: function(px) {
	                _this.direction = "bottom";
	                _this.setRotate();
	            },
	            right: function(px) {
	                _this.direction = "right";
	                _this.setRotate();
	            },
	        }
	    }
	    return block;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var $ = __webpack_require__(6);
	    var _block = __webpack_require__(7);
	    var block = new _block();
	    var _wall = __webpack_require__(9);
	    var _textarea = __webpack_require__(10);
	    var wall = new _wall();
	    var textarea = new _textarea();
	    textarea.getInstructions();
	    /*
	    把边界当成墙壁来处理
	     */
	    for(var i = 0; i < 10;i++){
	    	wall.add(-1,i);
	    	wall.add(i,-1);
	    	wall.add(i,10);
	    	wall.add(10,i);
	    }
	    var instructions = {
	        /**
	         * 检测是否碰壁
	         * @return {[布尔值]} [description] false 为碰壁
	         */
	        isWall :function(x,y) {
	            for (var i = 0; i < wall.all.length; i++) {
	                if (block.position.x + x == wall.all[i][0] && block.position.y + y == wall.all[i][1]) {
	                    console.log("碰壁");
	                    return false;
	                }
	            }
	            return true;
	        },
	        moveLeft : function(_x){
	        	var  x = _x || 1;
	        	var  y = 0;
	        	if(this.isWall(-x,y))
	        		block.move().left(x);
	        },
	        moveRight : function(_x){
	        	var  x = _x || 1;
	        	var  y = 0;
	        	if(this.isWall(x,y))
	           		block.move().right(x);
	        },
	        moveTop : function(_y){
	        	var  x = 0;
	        	var  y = _y || 1;
	        	if(this.isWall(x,-y))
	        		block.move().top(y);
	        },
	        moveBottom : function(_y){
	        	var  x = 0;
	        	var  y = _y || 1;
	        	if(this.isWall(x,y))
	        		block.move().bottom(y);
	        },
	        moveGo : function(_px){
	        	var px = _px || 1;
	        	var x = block.move().next(px)[0];
	        	var y = block.move().next(px)[1];
	        	if(this.isWall(x,y))
	        	   	block.move().go(px);
	        },
	        random : function(){
	        	return parseInt(Math.random()*10);
	        },
	        addWall : function(){
	            var x = block.move().next()[0];
	            var y = block.move().next()[1];
	            wall.add(block.position.x + x,block.position.y+y);
	        },
	        /**
	         * 文本域转换成执行命令
	         * @param  {[type]} arr [文本域（已经分割成数组）]
	         * @return {[type]}     [description]
	         */
	        transformToInsr : function(arr){
	            for(var i = 0;i < arr.length;i++){
	                switch(arr[i]){
	                    case "go": instructions.moveGo();break;
	                    case "tun lef" : block.rotate().left();break; 
	                }
	            }
	        }

	    }
	    instructions.transformToInsr(textarea.getInstructions());
	    return function() {
	        $("body").on("keydown", function(e) {
	            console.log(e.keyCode);
	            switch (e.keyCode) {
	                case 37:
	                    instructions.moveLeft();
	                    break;
	                case 38:
	                    instructions.moveTop();
	                    break;
	                case 39:
	                    instructions.moveRight();
	                    break;
	                case 40:
	                    instructions.moveBottom();
	                    break;
	                case 74:
	                    instructions.moveGo();
	                    break;
	                case 75:
	                    //建立墙体
	                    instructions.addWall();
	                    break;
	                case 87:
	                    block.rotate().top();
	                    break;
	                case 65:
	                    block.rotate().left();
	                    break;
	                case 83:
	                    block.rotate().bottom();
	                    break;
	                case 68:
	                    block.rotate().right();
	                    break;
	                case 79:
	                   	wall.add(instructions.random(),instructions.random());
	                    break;
	            }
	        })
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var $ = __webpack_require__(6);
	    var wall = function(){
	    	this.all = [
	    	]
	    }
	    $(".map-main").append("<div id='wall'></div>");
	    /**
	     * 显示墙的位置
	     */
	    wall.prototype.set = function(_left,_top){
	    	$("#wall").append("<div class='wall'></div>");
	    	$("#wall .wall:last-child").css({
	    		top : _top*30 + "px",
	    		left : _left*30 + "px",
	    	});
	    };
	    /**
	     * 添加墙
	     */
	    wall.prototype.add = function(_x,_y){
	    	for(var i = 0;i < this.all.length;i++){
	    		if(this.all[i][0] == _x && this.all[i][1] == _y){
	    			console.log("墙位置重复");
	    			return false;
	    		}
	    	}
	    	this.all.push([_x,_y]);
	    	this.set(_x,_y);
	    }
	    wall.prototype.getAll = function(){
	    	return this.all;
	    }
	    return wall;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	    var $ = __webpack_require__(6);
		var textarea = function(){
		}
		textarea.prototype.getVal = function(){
			return $("#textarea").val();
		}
		textarea.prototype.getInstructions = function(){
			var val = this.getVal();
			return val.split("\n");
		}
		return textarea;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ]);