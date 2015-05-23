Game = new G();

var tc = new TouchController({});
var loop = new Loop();

var player = new Player();
Game.addEntity(player);

// var line = new Line({});
// Game.addEntity(line);

loop.start();