define(function(){
    var $ = require('../modules/common');
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
})