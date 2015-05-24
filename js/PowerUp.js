var PowerUp = function(data) {
    this.initialize(data);
}

PowerUp.prototype = {
    initialize: function(data) {

        this.hidePosition = {
            x: -500,
            y: -500
        }

        this.onStart = data.onStart;
        this.onEnd = data.onEnd;
        this.timing = data.timing;

        this.width = 40;
        this.height = 40;
        this.halfWidth = this.width/2;
        this.halfHeight = this.height/2;
        this.x = Game.options.width / 2;
        this.y = 200;
        this.ySpeed = 4;

        this.falling = false;
    },    

    getLeft:    function () { return this.x },
    getTop:     function () { return this.y },
    getRight:   function () { return this.x + this.width },
    getBottom:  function () { return this.y + this.height },

    update: function() {
        if (this.falling) this.y += this.ySpeed;
    },

    startFalling: function() {
        this.falling = true;
    },

    stopFalling: function() {
        this.falling = false;
    },

    draw: function(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    setOut: function() {
        this.y = -this.height;
        this.x = Math.floor(Math.random() * Game.options.width) - 10;
        console.log(this.x);
        this.startFalling();
    },

    hide: function() {
        this.x = this.hidePosition.x;
        this.y = this.hidePosition.y;
    },

    pickUp: function() {
        console.log('picked up!');
        this.onStart();
        this.stopFalling();
        this.hide();
        setTimeout(this.onEnd, this.timing)
    }
}