define(function(){
    var $ = require('../modules/common');
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
})