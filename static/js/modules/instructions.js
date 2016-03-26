define(function() {
    var $ = require('../modules/common');
    var _block = require('../modules/block');
    var block = new _block();
    var _wall = require('./wall');
    var _textarea = require('./textarea');
    var wall = new _wall();
    var textarea = new _textarea();
    textarea.initNum();
    /*
    把边界当成墙壁来处理
     */
    for (var i = 0; i < 10; i++) {
        wall.add(-1, i);
        wall.add(i, -1);
        wall.add(i, 10);
        wall.add(10, i);
    }
    var instructions = {
        /**
         * 检测是否碰壁
         * @return {[布尔值]} [description] false 为碰壁
         */
        isWall: function(x, y) {
            for (var i = 0; i < wall.all.length; i++) {
                var endX = parseInt(block.position.x*1 + x*1);
                var endY = parseInt(block.position.y*1 + y*1);
                //离开地图判断
                if (Math.abs( endX - wall.all[i][0]) > 10 || Math.abs(endY - wall.all[i][1]) >10) {
                    console.log("碰壁");
                    return false;
                }
                if (block.position.x + x == wall.all[i][0] && block.position.y + y == wall.all[i][1]) {
                    console.log("碰壁");
                    return false;
                }
            }
            return true;
        },
        moveLeft: function(_x) {
            var x = _x || 1;
            var y = 0;
            if (this.isWall(-x, y))
                block.move().left(x);
        },
        moveRight: function(_x) {
            var x = _x || 1;
            var y = 0;
            if (this.isWall(x, y))
                block.move().right(x);
        },
        moveTop: function(_y) {
            var x = 0;
            var y = _y || 1;
            if (this.isWall(x, -y))
                block.move().top(y);
        },
        moveBottom: function(_y) {
            var x = 0;
            var y = _y || 1;
            if (this.isWall(x, y))
                block.move().bottom(y);
        },
        moveGo: function(_px) {
            var px = _px || 1;
            var x = block.move().next(px)[0];
            var y = block.move().next(px)[1];
            if (this.isWall(x, y))
                block.move().go(px);
        },
        random: function() {
            return parseInt(Math.random() * 10);
        },
        addWall: function() {
            var x = block.move().next()[0];
            var y = block.move().next()[1];
            wall.add(block.position.x + x, block.position.y + y);
        },
        TexEaInstructions: {
            tun: function(_instructions) {
                switch (_instructions) {
                    case "lef":
                        block.rotate().turnLeft();
                        break;
                    case "rig":
                        block.rotate().turnRight();
                        break;
                    case "bac":
                        block.rotate().turnBack();
                        break;
                }
            },
            mov: function(_instructions, px) {
                var _px = px || 1;
                switch (_instructions) {
                    case "lef":
                        block.rotate().left();
                        instructions.moveLeft(_px);
                        break;
                    case "rig":
                        block.rotate().right();
                        instructions.moveRight(_px);
                        break;
                    case "top":
                        block.rotate().top();
                        instructions.moveTop(_px);
                        break;
                    case "bot":
                        block.rotate().bottom();
                        instructions.moveBottom(_px);
                        break;
                    case "to":
                        block.position.x = px.split(",")[0] * 1 - 1;
                        block.position.y = px.split(",")[1] * 1 - 1;
                        block.setPostion();
                }
            },
            tra: function(_instructions, px) {
                var _px = px || 1;
                switch (_instructions) {
                    case "lef":
                        instructions.moveLeft(_px);
                        break;
                    case "rig":
                        instructions.moveRight(_px);
                        break;
                    case "top":
                        instructions.moveTop(_px);
                        break;
                    case "bot":
                        instructions.moveBottom(_px);
                        break;
                }
            },
        },
        /**
         * 文本域转换成执行命令 逐行执行
         * @param  {[type]} arr [文本域（已经分割成数组）]
         * @return {[type]}     [description]
         */
        transformToInsr: function(arr) {
            var _length = arr.length;
            var i = 0;
            var _this = this;
            var error = arr[_length-1].error;
            if(error.length > 0){
                for(var j = 0;j<error.length;j++){
                    var num = error[j]*1+1;
                    $(".numDiv:nth-child("+num+")").css({"background":"red"});
                }
                return false;
            }
            this.instrSingle(arr[i]);
            (function loop(){
                i++;
                var all = document.querySelectorAll(".numDiv");
                for(var k = 0;k<all.length;k++){
                    all[k].style.background = "#63bdba";
                }
                $(".numDiv:nth-child("+i+")").css({"background":"#000"})
                if(_length <= i)
                    return false;
                setTimeout(function(){
                    _this.instrSingle(arr[i]);
                    loop();
                },500)
            })();
        },
        /*
        执行单条命令
        */
        instrSingle: function(instructions) {
            if(typeof(instructions) == "object"){
                return false;
            }
            _instructions = instructions.split(" ");
            switch (_instructions[0]) {
                case "go":
                    this.moveGo();
                    break;
                case "tun":
                    this.TexEaInstructions.tun(_instructions[1]);
                    break;
                case "tra":
                    this.TexEaInstructions.tra(_instructions[1], _instructions[2]);
                    break;
                case "mov":
                    this.TexEaInstructions.mov(_instructions[1], _instructions[2]);
                    break;
                default : this.TexEaInstructions.error(_instructions[1], _instructions[2]);
                    break;
            }
        }

    }
    return function() {
        $("body").on("keydown", function(e) {
            switch (e.keyCode) {
                case 37:
                    instructions.moveLeft();
                    break;
                case 81:
                    instructions.transformToInsr(textarea.getInstructions());
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
                    wall.add(instructions.random(), instructions.random());
                    break;
            };
            return false;
        })
    }
})
