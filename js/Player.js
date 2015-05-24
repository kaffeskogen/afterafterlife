var Player = function() {
    this.initialize();
    this.image = document.getElementById("player-icon");
}

Player.prototype = {
    initialize: function() {
        this.width = 80;
        this.height = 80;
        this.halfWidth = this.width/2;
        this.halfHeight = this.height/2;
        this.x = Game.options.width / 2;
        this.y = Game.options.height * 0.8;
    },

    getLeft:    function () { return this.x - this.halfWidth },
    getTop:     function () { return this.y - this.halfHeight },
    getRight:   function () { return this.getLeft() + this.width },
    getBottom:  function () { return this.getTop() + this.height },

    update: function() {

    },

    draw: function(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(0,200,0)";

        // ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x - this.halfWidth, this.y - this.halfHeight, this.width, this.height);
        ctx.fill()
    },

    onWindowResize: function() {
        this.y = Game.options.height * 0.8;
    },

    setX: function(val) {
        if (val < 0 + this.width/2) {
            this.x = 0 + this.width/2;
        } else if (val > Game.options.width - this.width/2) {
            this.x = Game.options.width - this.width/2;
        } else {
            this.x = val;
        }

        return this;
    },

    getCurrentPos: function() {
        return {
            x: this.x,
            y: this.y
        }
    }

}