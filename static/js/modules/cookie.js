define(function() {
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
})
