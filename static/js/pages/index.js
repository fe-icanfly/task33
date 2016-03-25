define(function() {
    var common = require('../common');
    var $ = require('../modules/common');
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
    	var block = require('../modules/block');
    	var instructions = require('../modules/instructions');
	    $(".map-main").append("<div id='block' class='block'></div>");
	    instructions();
    })();
})