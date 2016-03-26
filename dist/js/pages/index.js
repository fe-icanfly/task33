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
	    	var gitHubLog = '<svg aria-hidden="true" class="octicon octicon-mark-github" height="28" role="img" version="1.1" viewBox="0 0 16 16" width="28"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59 0.4 0.07 0.55-0.17 0.55-0.38 0-0.19-0.01-0.82-0.01-1.49-2.01 0.37-2.53-0.49-2.69-0.94-0.09-0.23-0.48-0.94-0.82-1.13-0.28-0.15-0.68-0.52-0.01-0.53 0.63-0.01 1.08 0.58 1.23 0.82 0.72 1.21 1.87 0.87 2.33 0.66 0.07-0.52 0.28-0.87 0.51-1.07-1.78-0.2-3.64-0.89-3.64-3.95 0-0.87 0.31-1.59 0.82-2.15-0.08-0.2-0.36-1.02 0.08-2.12 0 0 0.67-0.21 2.2 0.82 0.64-0.18 1.32-0.27 2-0.27 0.68 0 1.36 0.09 2 0.27 1.53-1.04 2.2-0.82 2.2-0.82 0.44 1.1 0.16 1.92 0.08 2.12 0.51 0.56 0.82 1.27 0.82 2.15 0 3.07-1.87 3.75-3.65 3.95 0.29 0.25 0.54 0.73 0.54 1.48 0 1.07-0.01 1.93-0.01 2.2 0 0.21 0.15 0.46 0.55 0.38C13.71 14.53 16 11.53 16 8 16 3.58 12.42 0 8 0z"></path></svg>';
		    $(".map-main").append("<div id='block' class='block'>"+gitHubLog+"</div>");
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
	            y: 0,
	        };
	        this.direction = "top";
	        this.dom = $("#block");
	        this._rotate = 0;
	    };
	    block.prototype = {
	        setPostion: function() {
	            this.dom = $("#block");
	            this.dom.css({
	                "left": this.position.x*30 + "px",
	                "top": this.position.y*30 + "px",
	            })
	        },
	        setRotate: function() {
	            this.dom = $("#block");
	            switch(this._rotate){
	                case 0 : this.direction = "top";break;
	                case 90 : this.direction = "right";break;
	                case -90 : this.direction = "left";break;
	                case 180 : this.direction = "bottom";break;
	                case -180 : this.direction = "bottom";break;
	                case 270 : this.direction = "left";break;
	                case -270 : this.direction = "right";break;
	            }
	            var _thisRotate = 0;
	            this.dom.css({
	                "transform": "rotate(" + this._rotate + "deg)"
	            })
	        }
	    }
	    block.prototype.move = function() {
	        var _this = this;
	        return {
	            to: function(x, y) {
	                _this.position.x += parseInt(x);
	                _this.position.y += parseInt(y);
	                _this.setPostion();
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
	            addRotate : function(rot){
	                _this._rotate += rot;
	                if(_this._rotate == 360 || _this._rotate == -360){
	                    _this._rotate = 0;
	                }
	                _this.setRotate();
	            },
	            top: function(px) {
	                _this._rotate = 0;
	                _this.setRotate();
	            },
	            left: function(px) {
	                _this._rotate = -90;
	                _this.setRotate();
	            },
	            bottom: function(px) {
	                _this._rotate = 180;
	                _this.setRotate();
	            },
	            right: function(px) {
	                _this._rotate = 90;
	                _this.setRotate();
	            },
	            turnRight : function(){
	                this.addRotate(90);
	            },
	            turnLeft : function(){
	                this.addRotate(-90);
	            },
	             turnBack : function(){
	                this.turnRight();
	                this.turnRight();
	            }
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
	    textarea.initNum();
	    /*
	    把边界当成墙壁来处理
	     */
	    for (var i = 0; i < 10; i++) {
	        wall.add(-1, i);
	        wall.add(i, -1);
	        wall.add(i, 10);
	        wall.add(10, i);
	    }
	    var instructions = {
	        /**
	         * 检测是否碰壁
	         * @return {[布尔值]} [description] false 为碰壁
	         */
	        isWall: function(x, y) {
	            for (var i = 0; i < wall.all.length; i++) {
	                var endX = parseInt(block.position.x*1 + x*1);
	                var endY = parseInt(block.position.y*1 + y*1);
	                //离开地图判断
	                if (Math.abs( endX - wall.all[i][0]) > 10 || Math.abs(endY - wall.all[i][1]) >10) {
	                    console.log("碰壁");
	                    return false;
	                }
	                if (block.position.x + x == wall.all[i][0] && block.position.y + y == wall.all[i][1]) {
	                    console.log("碰壁");
	                    return false;
	                }
	            }
	            return true;
	        },
	        moveLeft: function(_x) {
	            var x = _x || 1;
	            var y = 0;
	            if (this.isWall(-x, y))
	                block.move().left(x);
	        },
	        moveRight: function(_x) {
	            var x = _x || 1;
	            var y = 0;
	            if (this.isWall(x, y))
	                block.move().right(x);
	        },
	        moveTop: function(_y) {
	            var x = 0;
	            var y = _y || 1;
	            if (this.isWall(x, -y))
	                block.move().top(y);
	        },
	        moveBottom: function(_y) {
	            var x = 0;
	            var y = _y || 1;
	            if (this.isWall(x, y))
	                block.move().bottom(y);
	        },
	        moveGo: function(_px) {
	            var px = _px || 1;
	            var x = block.move().next(px)[0];
	            var y = block.move().next(px)[1];
	            if (this.isWall(x, y))
	                block.move().go(px);
	        },
	        random: function() {
	            return parseInt(Math.random() * 10);
	        },
	        addWall: function() {
	            var x = block.move().next()[0];
	            var y = block.move().next()[1];
	            wall.add(block.position.x + x, block.position.y + y);
	        },
	        TexEaInstructions: {
	            tun: function(_instructions) {
	                switch (_instructions) {
	                    case "lef":
	                        block.rotate().turnLeft();
	                        break;
	                    case "rig":
	                        block.rotate().turnRight();
	                        break;
	                    case "bac":
	                        block.rotate().turnBack();
	                        break;
	                }
	            },
	            mov: function(_instructions, px) {
	                var _px = px || 1;
	                switch (_instructions) {
	                    case "lef":
	                        block.rotate().left();
	                        instructions.moveLeft(_px);
	                        break;
	                    case "rig":
	                        block.rotate().right();
	                        instructions.moveRight(_px);
	                        break;
	                    case "top":
	                        block.rotate().top();
	                        instructions.moveTop(_px);
	                        break;
	                    case "bot":
	                        block.rotate().bottom();
	                        instructions.moveBottom(_px);
	                        break;
	                    case "to":
	                        block.position.x = px.split(",")[0] * 1 - 1;
	                        block.position.y = px.split(",")[1] * 1 - 1;
	                        block.setPostion();
	                }
	            },
	            tra: function(_instructions, px) {
	                var _px = px || 1;
	                switch (_instructions) {
	                    case "lef":
	                        instructions.moveLeft(_px);
	                        break;
	                    case "rig":
	                        instructions.moveRight(_px);
	                        break;
	                    case "top":
	                        instructions.moveTop(_px);
	                        break;
	                    case "bot":
	                        instructions.moveBottom(_px);
	                        break;
	                }
	            },
	        },
	        /**
	         * 文本域转换成执行命令 逐行执行
	         * @param  {[type]} arr [文本域（已经分割成数组）]
	         * @return {[type]}     [description]
	         */
	        transformToInsr: function(arr) {
	            var _length = arr.length;
	            var i = 0;
	            var _this = this;
	            var error = arr[_length-1].error;
	            if(error.length > 0){
	                for(var j = 0;j<error.length;j++){
	                    var num = error[j]*1+1;
	                    $(".numDiv:nth-child("+num+")").css({"background":"red"});
	                }
	                return false;
	            }
	            this.instrSingle(arr[i]);
	            (function loop(){
	                i++;
	                var all = document.querySelectorAll(".numDiv");
	                for(var k = 0;k<all.length;k++){
	                    all[k].style.background = "#63bdba";
	                }
	                $(".numDiv:nth-child("+i+")").css({"background":"#000"})
	                if(_length <= i)
	                    return false;
	                setTimeout(function(){
	                    _this.instrSingle(arr[i]);
	                    loop();
	                },500)
	            })();
	        },
	        /*
	        执行单条命令
	        */
	        instrSingle: function(instructions) {
	            if(typeof(instructions) == "object"){
	                return false;
	            }
	            _instructions = instructions.split(" ");
	            switch (_instructions[0]) {
	                case "go":
	                    this.moveGo();
	                    break;
	                case "tun":
	                    this.TexEaInstructions.tun(_instructions[1]);
	                    break;
	                case "tra":
	                    this.TexEaInstructions.tra(_instructions[1], _instructions[2]);
	                    break;
	                case "mov":
	                    this.TexEaInstructions.mov(_instructions[1], _instructions[2]);
	                    break;
	                default : this.TexEaInstructions.error(_instructions[1], _instructions[2]);
	                    break;
	            }
	        }

	    }
	    return function() {
	        $("body").on("keydown", function(e) {
	            switch (e.keyCode) {
	                case 37:
	                    instructions.moveLeft();
	                    break;
	                case 81:
	                    instructions.transformToInsr(textarea.getInstructions());
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
	                    wall.add(instructions.random(), instructions.random());
	                    break;
	            };
	            return false;
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
	        var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="图形" x="0px" y="0px" width="1024px" height="1024px" viewBox="0 0 1024 1024" enable-background="new 0 0 1024 1024" xml:space="preserve"><path class="svgpath" data-index="path_0" fill="#272636" d="M959.381795 213.313294c0-82.421174-66.815755-149.236929-149.236929-149.236929L213.225801 64.076364c-82.421174 0-149.236929 66.815755-149.236929 149.236929l0 596.919065c0 82.421174 66.815755 149.236929 149.236929 149.236929L810.144866 959.469288c82.421174 0 149.236929-66.815755 149.236929-149.236929L959.381795 213.313294zM884.680443 784.03879c0 56.196906-45.556569 101.753475-101.752452 101.753475L239.41937 885.792265c-56.195883 0-101.752452-45.556569-101.752452-101.753475L137.666918 240.531192c0-56.196906 45.556569-101.753475 101.752452-101.753475l543.509644 0c56.195883 0 101.752452 45.556569 101.752452 101.753475L884.681466 784.03879z"/><path class="svgpath" data-index="path_1" fill="#272636" d="M797.924543 351.166965c9.869788 0 17.869996-8.010441 17.869996-17.869996l0-17.869996c0-9.876951-8.000208-17.869996-17.869996-17.869996l-261.597997 0c1.535983-2.635013 2.478448-5.671163 2.478448-8.934486l0-62.546521c0-9.877975-8.001231-17.869996-17.871019-17.869996l-17.869996 0c-9.869788 0-17.869996 7.993045-17.869996 17.869996l0 62.546521c0 3.263323 0.942465 6.300496 2.477424 8.934486l-261.597997 0c-9.868765 0-17.869996 7.993045-17.869996 17.869996l0 17.869996c0 9.860579 8.001231 17.869996 17.869996 17.869996l80.416518 0 0 116.157533-80.416518 0c-9.868765 0-17.869996 7.993045-17.869996 17.869996l0 17.869996c0 9.859555 8.001231 17.869996 17.869996 17.869996L485.193982 520.934486l0 116.157533L226.074434 637.09202c-9.868765 0-17.869996 7.993045-17.869996 17.869996l0 17.871019c0 9.860579 8.001231 17.869996 17.869996 17.869996l80.416518 0 0 125.09202 53.611012 0L360.101963 690.703031l303.796074 0 0 125.09202 53.611012 0L717.509049 690.703031l80.416518 0c9.869788 0 17.869996-8.009418 17.869996-17.869996l0-17.871019c0-9.876951-8.000208-17.869996-17.869996-17.869996L538.804994 637.09202 538.804994 520.93551l259.119549 0c9.869788 0 17.869996-8.010441 17.869996-17.869996l0-17.869996c0-9.877975-8.000208-17.869996-17.869996-17.869996l-80.416518 0L717.508026 351.166965 797.924543 351.166965zM663.897014 467.324498 360.10094 467.324498 360.10094 351.166965l303.796074 0L663.897014 467.324498z"/></svg>';
	    	$("#wall").append("<div class='wall'>"+svg+"</div>");
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
		textarea.prototype = {
			getVal : function(){
				return $("#textarea").val();
			},
			getInstructions : function(){
				var val = this.getVal();
				//检测命令是否合法
				var instructions = val.split("\n");
				var length = instructions.length;
				//末尾添加error信息，如果没有错误返回空数组
				instructions[length] = {"error" : []};
				for(var i = 0;i<length;i++){
					_instructions = instructions[i].split(" ");
					var all = _instructions[0]+" "+_instructions[1];
					switch(all){
						case "go undefined": break;
						case "tun lef": ;break;
						case "tun rig": ;break;
						case "tun bac": ;break;
						case "tra top": ;break;
						case "tra lef": ;break;
						case "tra bot": ;break;
						case "tra rig": ;break;
						case "mov top": ;break;
						case "mov lef": ;break;
						case "mov bot": ;break;
						case "mov rig": ;break;
						case "mov to": ;break;
						default : instructions[length].error.push(i);break;
					}
				}
				return instructions;
			},
			setNum : function(){
				$div = $(".textareaNum");
				var _instructions = this.getInstructions();
				for(var i = 0;i<_instructions.length-1;i++){
					$div.append("<div class='numDiv'>"+parseInt(i+1)+"</div>")
				}
			},
			resetNum : function(){
				$(".textareaNum").html("");
				this.setNum();
			},
			initNum : function(){
				var _this = this;
				$(".textarea").append("<div class='textareaNum'></div>");
				this.setNum();
				$("textarea").on("keyup",function(){
					_this.resetNum();
					return false;
				});
				$("textarea").on("keydown",function(event){
					_this.resetNum();
		    		event.stopPropagation();
					return false;
				})
			}
		}
		return textarea;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ]);