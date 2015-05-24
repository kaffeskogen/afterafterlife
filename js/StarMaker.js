var StarMaker = function() {
    this.initialize();
}

StarMaker.prototype = {
    initialize: function() {
        this.stars = [];
        this.lastStar = {
            x: 30,
            vx: 0,
            ax: 0
        }
    },

    startCreating: function() {

    },

    addStar: function(x) {
        var s;
        if (typeof(x) !== 'undefined') {
            s = new Star({x: x});
            this.stars.push(s);
        } else {
            var t = this.lastStar.x + Math.floor(Math.random() * 20) - 10;
            if (t > Game.options.width - 10) t = Game.options.width - 10;
            else if (t < 10) t = 10;
            this.stars.push(new Star({x: t}));

            this.lastStar.x = t;
        }
    },


    pauseAllStars: function() {
        clearInterval(starInt);
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
            if (star.getTop() > Game.options.height) {
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