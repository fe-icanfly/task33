define(function() {
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
})