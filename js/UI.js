var UI = function() {
    this.initialize();
};

UI.prototype = {
    initialize: function() {
        this.scoreHolder = null;
        this.middleView = null;
        this.homeView = null;
        this.lives = null;

        this.middleView = this.createMiddleView();
        this.createScoreBox();
        this.addLivesToMiddleview();
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
        // this.middleView.className = 'show';
        middleView.innerHTML = '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>';

        document.getElementById('container').appendChild(middleView);


        return middleView;
    },

    showMiddleView: function() {
        this.middleView.className = 'show';
        sounds.dead();
        sounds.nextLevel();
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
        this.scoreHolder.innerHTML = write + Game.currentScore;
    },

    hideScoreBox: function() {
        if (this.scoreHolder !== null)
            this.scoreHolder.style.display = 'none';
    },

}