define(function() {
    var $ = require('../modules/common');
    var _block = require('../modules/block');
    var block = new _block();
    var _wall = require('./wall');
    var _textarea = require('./textarea');
    var wall = new _wall();
    var textarea = new _textarea();
    textarea.getInstructions();
    /*
    把边界当成墙壁来处理
     */
    for(var i = 0; i < 10;i++){
    	wall.add(-1,i);
    	wall.add(i,-1);
    	wall.add(i,10);
    	wall.add(10,i);
    }
    var instructions = {
        /**
         * 检测是否碰壁
         * @return {[布尔值]} [description] false 为碰壁
         */
        isWall :function(x,y) {
            for (var i = 0; i < wall.all.length; i++) {
                if (block.position.x + x == wall.all[i][0] && block.position.y + y == wall.all[i][1]) {
                    console.log("碰壁");
                    return false;
                }
            }
            return true;
        },
        moveLeft : function(_x){
        	var  x = _x || 1;
        	var  y = 0;
        	if(this.isWall(-x,y))
        		block.move().left(x);
        },
        moveRight : function(_x){
        	var  x = _x || 1;
        	var  y = 0;
        	if(this.isWall(x,y))
           		block.move().right(x);
        },
        moveTop : function(_y){
        	var  x = 0;
        	var  y = _y || 1;
        	if(this.isWall(x,-y))
        		block.move().top(y);
        },
        moveBottom : function(_y){
        	var  x = 0;
        	var  y = _y || 1;
        	if(this.isWall(x,y))
        		block.move().bottom(y);
        },
        moveGo : function(_px){
        	var px = _px || 1;
        	var x = block.move().next(px)[0];
        	var y = block.move().next(px)[1];
        	if(this.isWall(x,y))
        	   	block.move().go(px);
        },
        random : function(){
        	return parseInt(Math.random()*10);
        },
        addWall : function(){
            var x = block.move().next()[0];
            var y = block.move().next()[1];
            wall.add(block.position.x + x,block.position.y+y);
        },
        /**
         * 文本域转换成执行命令
         * @param  {[type]} arr [文本域（已经分割成数组）]
         * @return {[type]}     [description]
         */
        transformToInsr : function(arr){
            for(var i = 0;i < arr.length;i++){
                switch(arr[i]){
                    case "go": instructions.moveGo();break;
                    case "tun lef" : block.rotate().left();break; 
                }
            }
        }

    }
    instructions.transformToInsr(textarea.getInstructions());
    return function() {
        $("body").on("keydown", function(e) {
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 37:
                    instructions.moveLeft();
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
                   	wall.add(instructions.random(),instructions.random());
                    break;
            }
        })
    }
})
