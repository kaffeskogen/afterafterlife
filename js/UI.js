var UI = function() {
    this.initialize();
};

UI.prototype = {

    initialize: function() {
        this.scoreHolder = null;
        this.middleView = null;
        this.homeView = null;
        this.lives = null;
        this.playButton = null;
        this.gameOver = null;

        this.middleView = this.createMiddleView();
        this.createScoreBox();
        this.addLivesToMiddleview();
        this.createPlayerIcon();
        this.setGameOver = null;
    },

    onWindowResize: function() {
        var lives = this.lives.getElementsByClassName('life');
        for (var i = 0, l; l = lives[i++];) {
            l.style.top = ((Game.options.height - 300) / 2 + ((i-1) * 80)) + 'px';
        }
    },

    createScoreBox: function() {
        this.scoreHolder = document.createElement('div');
        this.scoreHolder.className = 'score-counter';
        this.scoreHolder.innerHTML = '0000000';
        document.body.appendChild(this.scoreHolder);
    },

    createStartScreen: function() {
        this.homeView = document.createElement('div');
        this.homeView.setAttribute('id', 'home-view')

        document.body.appendChild('home-view');
    },

    createMiddleView: function() {
        var middleView = document.createElement('div');
        middleView.setAttribute('id', 'middle-view');

        // middleView.className = 'show';
        middleView.innerHTML = '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>';

        document.getElementById('container').appendChild(middleView);


        return middleView;
    },

    createPlayerIcon: function() {
        var i = new Image(80, 80);
        i.src = '/img/pluppvit.jpg';
        i.width = "80";
        i.height = "80";
        i.setAttribute('id', 'play-button');
        i.addEventListener("touchstart", Game.newRound, false);
        this.playButton = i;
        this.lives.appendChild(i);
    },

    showPlayButton: function() {
        this.playButton.className = 'show';
        return this.playButton;
    },

    hidePlayButton: function() {
        this.playButton.className = 'hide';
        // sounds.clickSound();
        return this.playButton;
    },

    showMiddleView: function() {
        this.middleView.className = 'show';
        sounds.dead();
        sounds.nextLevel();
        sounds.pauseAmbient();
        return this.middleView;
    },

    hideMiddleView: function() {
        this.middleView.className = 'hide';
        sounds.nextLevelUp();
        return this.middleView;
    },

    addLivesToMiddleview: function() {
        this.lives = document.createElement('div');
        this.lives.className = 'lives';

        var c = 3;
        var l;
        while (c--) {
            l = document.createElement('div');
            l.className = 'life';
            l.innerHTML = 'o'
            this.lives.appendChild(l);
        }

        this.middleView.appendChild(this.lives);
    },

    updateScoreBox: function() {
        var write = '';
        for (var i = (Game.currentScore + '').length; i < 7; i++) {
            write += '0';
        }
        this.scoreHolder.innerHTML = write + Math.floor(Game.currentScore);
    },

    hideScoreBox: function() {
        if (this.scoreHolder !== null)
            this.scoreHolder.style.display = 'none';
    },

    removeLife: function() {
        var lives = this.lives.getElementsByClassName('life');
        for (var i = 0, l; l = lives[i++];) {
            if (l.innerHTML === 'o') {
                l.innerHTML = 'x';
                break;
            }
        }
    }

}