var UI = function() {
    this.initialize();
};

UI.prototype = {
    initialize: function() {
        this.scoreBoard = null;

        this.createScoreBox();
    },

    createScoreBox: function() {
        this.scoreBoard = document.createElement('div');
        this.scoreBoard.className = 'score-counter';
        this.scoreBoard.innerHTML = '0000000';
        document.body.appendChild(this.scoreBoard);
    },

    updateScoreBox: function() {
        var write = '';
        for (var i = (Game.currentScore + '').length; i < 7; i++) {
            write += '0';
        }
        this.scoreBoard.innerHTML = write + Game.currentScore;
    },

    hideScoreBox: function() {
        if (this.scoreBoard !== null)
            this.scoreBoard.style.display = 'none';
    }
}