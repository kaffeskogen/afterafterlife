var StarMaker = function() {
    this.initialize();
}

StarMaker.prototype = {
    initialize: function() {
        this.stars = [];
        this.createInterval = null;
        this.PWinterval = null;
        this.allStarsStopped = false;
        this.lastStar = {
            x: 30,
            vx: 0,
            ax: 0
        }
    },

    startCreating: function() {
        var _this = this;
        this.allStarsStopped = false;
        this.createInterval = setInterval(function() {
            _this.addStar()
        }, 100)
        this.generatePW();
    },

    generatePW: function() {
        var _this = this;
        _this.PWinterval = setTimeout(function() {
            PUs.moreStars.setOut();
            _this.generatePW();
        }, randomIntFromInterval(4000, 6000));
    },

    addStar: function(x) {
        var s;
        if (typeof(x) !== 'undefined') {
            s = new Star({x: x});
            this.stars.push(s);
        } else {
            var t = this.lastStar.x + Math.floor(randomIntFromInterval(-100, 100));
            if (t > Game.options.width - 60) t = Game.options.width - 60;
            else if (t < 10) t = 10;
            this.stars.push(new Star({x: t}));

            this.lastStar.x = t;
        }
    },

    clearAllStars: function() {
        this.stars = [];
    },

    pauseAllStars: function() {
        window.clearInterval(this.createInterval);
        window.clearInterval(this.PWinterval);
        this.allStarsStopped = true;
        for (var i = 0, star; star = this.stars[i++];) {
            star.stop();
        }
    },

    update: function() {
        var _this = this;
        for (var i = 0, star; star = this.stars[i++];) {
            star.update();
        }

        var arr = this.stars.filter(function (star) {
            if ((star.getTop() > Game.options.height) && !_this.allStarsStopped) {
                _this.pauseAllStars();
                Game.endLife();
            }
            var ret = cd.checkCollision(star, Game.getPlayer());
            return !(ret)
        });

        var addedScore = this.stars.length - arr.length;

        if (addedScore > 0) {
            var addedScore = (this.stars.length - arr.length) + Game.extraStarValue;

            Game.currentScore += (addedScore * Game.scoreMultiplier);

            ui.updateScoreBox();

            sounds.plupp();
        }

        _this.stars = arr;

    },

    draw: function(ctx) {
        for (var i = 0, child; child = this.stars[i++];) {
            child.draw(ctx);
        }
    },
}