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
        _this.gameStage = 1;
        _this.extraStarValue = 0;
        _this.scoreMultiplier = 1;
        _this.options = {
            width: 375,
            height: 667,
        };

        this.powerUpCount = {
            doublePoints: 0,
            xtraLife: 0,
            multiplier: 0
        };
    },

    addToPowerUpCount: function(pw) {
        this.powerUpCount[pw]++;
    },

    updateCanvasBounds: function() {
        var _this = this;
        var w = this.options.width + 'px';
        _this.canvas.style.width = w
        _this.canvas.setAttribute('width', w)
        var h = this.options.height + 'px';
        _this.canvas.style.height = h
        _this.canvas.setAttribute('height', h)

        _this.canvas.style.marginLeft = '10px';
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

    newRound: function() {
        var _this = this;
        sm.clearAllStars();
        sm.startCreating();
        ui.hidePlayButton();
        ui.hideMiddleView();
        sounds.ambient1();
        // sounds.ambient2();
    },

    endLife: function() {
        sm.pauseAllStars();
        ui.removeLife();
        this.gameStage++;
        if (this.gameStage < 3) {            
            setTimeout(function() {
                ui.showPlayButton();
            }, 800)
        }
        ui.showMiddleView();
    },

    startThirdRound: function() {
        
    },

    addEntity: function(e) {
        this.entities.push(e);
    },

    setEventListeners: function() {
        var _this = this;
        window.addEventListener('resize', _this.onWindowResize, true);
    },

    onWindowResize: function() {
        Game.options.width = document.body.offsetWidth - 20;
        Game.options.height = document.body.offsetHeight - 10;
        Game.updateCanvasBounds();
        for (var i = 0, child; child = Game.entities[i++];) {
            if(typeof(child.onWindowResize) !== 'undefined') child.onWindowResize();
        }
        ui.onWindowResize();
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
        _this.ctx.clearRect(0, 0, Game.options.width, Game.options.height)
        for (var i = 0, child; child = _this.entities[i++];) {
            child.draw(_this.ctx);
        }
    }
}
