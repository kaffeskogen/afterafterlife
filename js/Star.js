var Star = function(data) {
    this.initialize(data);
}

Star.prototype = {

    initialize: function(data) {
        data = data || {};
        this.image = document.getElementById('star-icon');
        this.x = data.x || Game.options.width / 2;
        this.y = -10;
        this.width = 32;
        this.height = 32;
        this.value = 0;
        this.xSpeed = 0.1;
        this.ySpeed = 2;
        this.defaultYSpeed = 2;
        this.canvasWidth = 375;
    },

    getLeft:    function () { return this.x },
    getTop:     function () { return this.y },
    getRight:   function () { return this.x + this.width },
    getBottom:  function () { return this.y + this.height },

    update: function() {
        if ((this.value + this.xSpeed) >= 180) {
            this.value = this.value + this.xSpeed - 180
        } else {
            this.value += this.xSpeed;
        }

        // this.x = Math.cos(this.value) * ((this.canvasWidth - this.strokeWidth/2)/2) + (this.canvasWidth/2);
        this.y += this.ySpeed;


        // if (this.y > Game.options.height) this.y = -10;
    },

    stop: function() {
        this.ySpeed = 0;
    },

    draw: function(ctx) {
        ctx.beginPath();
        ctx.drawImage(this.image, this.x + this.width/2, this.y + this.height/2, this.width, this.height);
        ctx.fill()
    },

    getCurrentPos: function() {
        return this.xPos;
    },

    checkCollision: function() {
        var l1 = this.getLeft();
        var t1 = this.getTop();
        var r1 = this.getRight();
        var b1 = this.getBottom();
        
        var l2 = collidee.getLeft();
        var t2 = collidee.getTop();
        var r2 = collidee.getRight();
        var b2 = collidee.getBottom();

        if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
          return false;
        }
    }
}
