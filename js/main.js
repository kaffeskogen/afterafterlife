Game = new G();

var tc = new TouchController({});
var loop = new Loop();

var player = new Player();
Game.addEntity(player);

var sm = new StarMaker();
Game.addEntity(sm);

var cd = new CollisionDetector();

var starInt = setInterval(function() {
    sm.addStar()
}, 200)

var ui = new UI();

loop.start();