define(function() {
    var $ = require('./common');
    var block = function() {
        this.position = {
            x: 0,
            y: 0.
        };
        this.direction = "top";
        this.dom = $("#block");
    };
    block.prototype = {
        setPostiton: function() {
            this.dom = $("#block");
            this.dom.css({
                "left": this.position.x*30 + "px",
                "top": this.position.y*30 + "px",
            })
        },
        setRotate: function() {
            this.dom = $("#block");
            var _thisRotate = 0
            switch (this.direction) {
                case "top":
                    _thisRotate = 0;
                    break;
                case "left":
                    _thisRotate = -90;
                    break;
                case "right":
                    _thisRotate = 90;
                    break;
                case "bottom":
                    _thisRotate = 180;
                    break;
            }
            this.dom.css({
                "transform": "rotate(" + _thisRotate + "deg)"
            })
        }
    }
    block.prototype.move = function() {
        var _this = this;
        return {
            to: function(x, y) {
                _this.position.x += x;
                _this.position.y += y;
                _this.setPostiton();
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
            top: function(px) {
                _this.direction = "top";
                _this.setRotate();
            },
            left: function(px) {
                _this.direction = "left";
                _this.setRotate();
            },
            bottom: function(px) {
                _this.direction = "bottom";
                _this.setRotate();
            },
            right: function(px) {
                _this.direction = "right";
                _this.setRotate();
            },
        }
    }
    return block;
})
