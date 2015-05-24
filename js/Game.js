function G(){
    this.initialize();
}

G.prototype = {
    initialize: function() {
        var _this = this;
        _this.entities = [];
        _this.canvas = document.querySelector('#main-canvas');
        _this.ctx = _this.canvas.getContext('2d');
        _this.currentScore = 0;
        _this.extraStarValue = 0;
        _this.scoreMultiplier = 1;
        _this.options = {
            width: 375,
            height: 667,
        };
    },

    start: function() {
        var _this = this;
    },

    getLine: function() {
        return G.line;
    },

    getPlayer: function() {
        return this.entities[0];
    },

    endLife: function() {

    },

    addEntity: function(e) {
        this.entities.push(e);
    },

    setEventListeners: function() {
        var _this = this;
        window.addEventListener('resize', _this.onWindowResize, true);
    },

    onWindowResize: function() {
        var _this = this;
        for (var i = 0, child; child = _this.entities[i++];) {
            if (isUndefined(child.onWindowResize)) child.onWindowResize();
        }
    },

    update: function() {
        var _this = this;

        for (var i = 0, child; child = _this.entities[i++];) {
            child.update();
        }
        this.draw()
    },

    draw: function() {
        var _this = this;
        _this.ctx.restore();
        for (var i = 0, child; child = _this.entities[i++];) {
            child.draw(_this.ctx);
        }
    }
}
