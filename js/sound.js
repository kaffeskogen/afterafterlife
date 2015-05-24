var bufferLoader;

sounds = {
    plupp: function () {},
    nextLevel: function () {},
    nextLevelUp: function () {},
    dead: function () {},
    touch: function () {},
    ambient1: function () {},
    multiply: function () {}
};

activeSounds = {};


function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }
  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}













//Fix audioContext for all the browsers
  var contextClass = (window.AudioContext || 
  window.dbkitAudioContext || 
  window.mozAudioContext || 
  window.oAudioContext || 
  window.msAudioContext) ||
  window.webkitAudioContext;
  if (contextClass) {
    // Web Audio API is available.
    var context = new contextClass();
  } 
  else {
      // Web Audio API is not available. Ask the user to use a supported browser.
      var context = new webkitAudioContext();
  }

  // newAudioContext();




function newAudioContext() {
  
  // //Creates a audioContext
  // context = new AudioContext();
  

  // Calls the BufferLoader and loads sound
  bufferLoader = new BufferLoader(
    context,
    [
      './audio/plupp1.mp3',
      './audio/plupp2.mp3',
      './audio/plupp3.mp3',
      './audio/plupp4.mp3',
      './audio/plupp5.mp3',       //5
      './audio/plupp6.mp3',
      './audio/plupp7.mp3',
      './audio/ambient1.mp3',
      './audio/ambient2.mp3',
      './audio/ambient3.mp3',     //10
      './audio/kontrolljud.mp3',
      './audio/nextLevelDown.mp3',
      './audio/nextLevelUp.mp3',
      './audio/dead.mp3',
      './audio/multiply.mp3',      //15
      './audio/click.mp3'
    ],
    finishedLoading  
  );

  bufferLoader.load();
 
}


function finishedLoading(bufferList) {

    sounds.clickSound = function(){
      var gain = context.createGain();
      gain.gain.value = 0.3;
      var click = context.createBufferSource();
      click.buffer = bufferList[15];
      click.connect(gain);
      gain.connect(context.destination);
      click.start(0);
    }

    sounds.plupp = function(){
      var gain = context.createGain();
      gain.gain.value = 0.05;
      var touchSound = context.createBufferSource();
      touchSound.buffer = bufferList[Math.floor((Math.random() * 6) + 1)];
      touchSound.connect(gain);
      gain.connect(context.destination);
      touchSound.start(0);
    }

    sounds.nextLevel = function(){
      var gain = context.createGain();
      gain.gain.value = 0.3;
      var nextLevel = context.createBufferSource();
      nextLevel.buffer = bufferList[11];
      nextLevel.connect(gain);
      gain.connect(context.destination);
      nextLevel.start(0);
      activeSounds.nextLevel = nextLevel;
    }

    sounds.nextLevelUp = function(){
      var gain = context.createGain();
      gain.gain.value = 0.3;
      var nextLevelUp = context.createBufferSource();
      nextLevelUp.buffer = bufferList[12];
      nextLevelUp.connect(gain);
      gain.connect(context.destination);
      nextLevelUp.start(0);
    }

    sounds.dead = function(){
      var gain = context.createGain();
      gain.gain.value = 0.6;
      var dead = context.createBufferSource();
      dead.buffer = bufferList[13];
      dead.connect(gain);
      gain.connect(context.destination);
      dead.start(0);
    }

    
    sounds.touch = function(){
      var gain = context.createGain();
      gain.gain.value = 0.3;
      
      var touchSound = context.createBufferSource();
      touchSound.buffer = bufferList[10];
      touchSound.connect(gain);
      gain.connect(context.destination);
      touchSound.start(0);
    }

    sounds.ambient1 = function(){

      var gain = context.createGain();
      gain.gain.value = 0.3;
      var ambient1;
      var ambient2; 
      var ambient3;
      
      if(Game.gameStage==1){
        ambient1 = context.createBufferSource();
        ambient1.buffer = bufferList[7];
        ambient1.connect(gain);
        ambient1.connect(context.destination);
        ambient1.start(0);
        ambient1.loop = true;
        activeSounds.ambient1 = ambient1;
        
      }
      else if(Game.gameStage==2){
        if(typeof(activeSounds.ambient1) !== "undefined"){
          activeSounds.ambient1.stop();
        }
        ambient2= context.createBufferSource();
        ambient2.buffer = bufferList[8];
        ambient2.connect(gain);
        gain.connect(context.destination);
        ambient2.start(0)
        ambient2.loop = true;
        activeSounds.ambient2 = ambient2;
      }
      else if(Game.gameStage==3){
        if(typeof(activeSounds.ambient2) !== "undefined"){
          activeSounds.ambient2.stop();
        }
        ambient3= context.createBufferSource();
        ambient3.buffer = bufferList[9];
        ambient3.connect(gain);
        gain.connect(context.destination);
        ambient3.start(0)
        ambient3.loop = true;
        activeSounds.ambient3 = ambient3;
      }
      
    }

    sounds.ambient2 = function(){
      var gain = context.createGain();
      gain.gain.value = 0.3;
      var startSound = context.createBufferSource();
      
        startSound.buffer = bufferList[8];
        startSound.connect(gain);
        gain.connect(context.destination);
        startSound.start(0);
        startSound.loop = true;
   
    }

    sounds.multiply = function(){
      var gain = context.createGain();
      gain.gain.value = 0.1;
      var multiply = context.createBufferSource();
      multiply.buffer = bufferList[14];
      multiply.connect(gain);
      gain.connect(context.destination);
      multiply.start(0);
    }

    sounds.ambient1();
  
  console.log('finnished loading');

}








