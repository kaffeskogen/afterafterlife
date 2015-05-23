var Loop = function() {
    this.running = false;
}

Loop.prototype = {
    start: function() {
        requestAnimationFrame(function loop() {
            Game.update();
            requestAnimationFrame(loop);
        });
    },

    stop: function () {
        this.running = false;
        cancelAnimationFrame(_this.frameID);
    },

    mainLoop: function() {
        var _this = this;
        _this.frameID = requestAnimationFrame(_this.mainLoop);
    }
}
