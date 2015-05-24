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
        this.image = document.getElementById(data.image);
        this.name = data.name;

        this.width = 40;
        this.height = 40;
        this.halfWidth = this.width/2;
        this.halfHeight = this.height/2;
        this.x = Game.options.width / 2;
        this.y = -this.height;
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
        // ctx.beginPath();
        // ctx.fillStyle = "#fff";
        // ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        ctx.beginPath();
        ctx.fillStyle = "rgb(0,200,0)";

        // ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.fill()
    },

    setOut: function() {
        this.y = -this.height;
        this.x = randomIntFromInterval(0, 400);
        this.startFalling();
    },

    hide: function() {
        this.x = this.hidePosition.x;
        this.y = this.hidePosition.y;
    },

    pickUp: function() {
        Game.addToPowerUpCount(this.name);
        this.stopFalling();
        sounds.multiply();
        this.hide();
    }
}