var Line = function(data) {
    var _this = this;
    for (k in Line.DEFAULT) {
        _this[k] = Line.DEFAULT[k];
    }

    for (k in data) {
        if (data.hasOwnProperty(k)) {
            _this[k] = data[k];
        }
    }

}

Line.prototype = {

    update: function() {
        if ((this.value + this.speed) >= 180) {
            this.value = this.value + this.speed - 180
        } else {
            this.value += this.speed;
        }

        this.xPos = Math.cos(this.value) * ((this.canvasWidth - this.strokeWidth/2)/2) + (this.canvasWidth/2);
    },

    draw: function(ctx) {
        ctx.clearRect(0,0,1500,1500)
        ctx.fillRect(this.xPos, 50, this.strokeWidth, this.strokeWidth);
    },

    getCurrentPos: function() {
        return this.xPos;
    }
}

Line.DEFAULT = {
    xPos: 0,
    value: 0,
    speed: 0.1,
    strokeWidth: 30,
    canvasWidth: 375,
}