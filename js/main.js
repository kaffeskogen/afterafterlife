Game = new G();
Game.setEventListeners();
var tc = new TouchController({});
var loop = new Loop();

var player = new Player();
Game.addEntity(player);

var sm = new StarMaker();
Game.addEntity(sm);

var cd = new CollisionDetector();

var ui = new UI();

Game.onWindowResize();

// POWERUPS
var PUs = {
    doublePoints: new PowerUp( {
        name: 'doublePoints',
        image: 'pw-double-icon',
        onStart: function() {
            Game.extraStarValue += 4;
        },
        onEnd: function() {
            Game.extraStarValue -= 4;
        },
        timing: 5000
    })
}

for (var p in PUs) {
    Game.addEntity(PUs[p]);
}

// Starts Game
loop.start();

sm.startCreating();
// ui.showMiddleView();