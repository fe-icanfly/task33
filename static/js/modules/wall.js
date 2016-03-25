define(function() {
    var $ = require('./common');
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
})
