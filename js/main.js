Game = new G();

var tc = new TouchController({});
var loop = new Loop();

var player = new Player();
Game.addEntity(player);

var sm = new StarMaker();
Game.addEntity(sm);

var cd = new CollisionDetector();

var ui = new UI();


// POWERUPS
var PUs = {
    doublePoints: new PowerUp( {
        onStart: function() {
            Game.scoreMultiplier += 2;
        },
        onEnd: function() {
            Game.scoreMultiplier -= 2;
        },
        timing: 5000
    })
}
for (var p in PUs) {
    Game.addEntity(PUs[p]);
}

PUs.doublePoints.setOut();

// Starts Game
loop.start();

sm.startCreating();