define(function() {
    var $ = require('./common');
    var block = function() {
        this.position = {
            x: 0,
            y: 0,
        };
        this.direction = "top";
        this.dom = $("#block");
        this._rotate = 0;
    };
    block.prototype = {
        setPostion: function() {
            this.dom = $("#block");
            this.dom.css({
                "left": this.position.x*30 + "px",
                "top": this.position.y*30 + "px",
            })
        },
        setRotate: function() {
            this.dom = $("#block");
            switch(this._rotate){
                case 0 : this.direction = "top";break;
                case 90 : this.direction = "right";break;
                case -90 : this.direction = "left";break;
                case 180 : this.direction = "bottom";break;
                case -180 : this.direction = "bottom";break;
                case 270 : this.direction = "left";break;
                case -270 : this.direction = "right";break;
            }
            var _thisRotate = 0;
            this.dom.css({
                "transform": "rotate(" + this._rotate + "deg)"
            })
        }
    }
    block.prototype.move = function() {
        var _this = this;
        return {
            to: function(x, y) {
                _this.position.x += parseInt(x);
                _this.position.y += parseInt(y);
                _this.setPostion();
            },
            top: function(px) {
                var _px = px || 1;
                this.to(0, -_px);
            },
            left: function(px) {
                var _px = px || 1;
                this.to(-_px, 0);
            },
            bottom: function(px) {
                var _px = px || 1;
                this.to(0, _px);
            },
            right: function(px) {
                var _px = px || 1;
                this.to(_px, 0);
            },
            next : function(px){
                var _px = px || 1;
                switch (_this.direction) {
                    case "top":
                        return [0,-_px];
                        break;
                    case "left":
                        return [-_px,0];
                        break;
                    case "right":
                        return [_px,0];
                        break;
                    case "bottom":
                        return [0,_px];
                        break;
                }
            },
            go: function(px) {
                var _px = px || 1;
                switch (_this.direction) {
                    case "top":
                        this.top(_px);
                        break;
                    case "left":
                        this.left(_px);
                        break;
                    case "right":
                        this.right(_px);
                        break;
                    case "bottom":
                        this.bottom(_px);
                        break;
                }

            }
        }
    };
    block.prototype.rotate = function() {
        var _this = this;
        return {
            addRotate : function(rot){
                _this._rotate += rot;
                if(_this._rotate == 360 || _this._rotate == -360){
                    _this._rotate = 0;
                }
                _this.setRotate();
            },
            top: function(px) {
                _this._rotate = 0;
                _this.setRotate();
            },
            left: function(px) {
                _this._rotate = -90;
                _this.setRotate();
            },
            bottom: function(px) {
                _this._rotate = 180;
                _this.setRotate();
            },
            right: function(px) {
                _this._rotate = 90;
                _this.setRotate();
            },
            turnRight : function(){
                this.addRotate(90);
            },
            turnLeft : function(){
                this.addRotate(-90);
            },
             turnBack : function(){
                this.turnRight();
                this.turnRight();
            }
        }
    }
    return block;
})
