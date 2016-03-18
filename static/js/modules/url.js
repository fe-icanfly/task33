define(function() {
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
})
