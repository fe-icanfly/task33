define(function() {
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
});
