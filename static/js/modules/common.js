function commonJS() {
    var cookieEnd = {};
    return {
        /**
         * cookie操作
         * @type {Object}
         */
        cookie: {
            set: function(name, value, hours) {
                var exp = new Date();
                exp.setTime(exp.getTime() + hours  * 60 * 60 * 1000);
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
            del: function() {
                return;
            }
        },
        /**
         * 判断是否在58APP里面
         * @return {[type]} [description]
         */
        is58App: function() {
            var ua = this.cookie.get("58ua");
            var ua = ua != "" ? ua.replace(/"/g, "") : "";
            return ua === '58app' ? true : false;
        },
        /**
         * 判断当前页面浏览器环境，布尔值
         * @type {Object}
         */
        browser: {
            versions: function() {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        },
        /**
         * 跳转到指定app
         * @param  url [要跳转到APP schema 链接]
         * @return {[type]}     [description]
         */
        jumpToApp: function(url) {
            var iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = url;
            document.getElementsByTagName("body")[0].appendChild(iframe)
            setTimeout(function() {
                document.body.removeChild(iframe);
            })
        }
    }
};
