var bufferLoader;

sounds = {
  plupp: function() {},
  touch: function() {},
  ambient1: function() {},
};


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

  newAudioContext();




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
      './audio/dead.mp3'
    ],
    finishedLoading  
  );

  bufferLoader.load();
 
}


function finishedLoading(bufferList) {

    sounds.plupp = function(){
      var gain = context.createGain();
      gain.gain.value = 0.02;
      var touchSound = context.createBufferSource();
      touchSound.buffer = bufferList[Math.floor((Math.random() * 6) + 1)];
      touchSound.connect(gain);
      gain.connect(context.destination);
      touchSound.start(0);
    }

    sounds.nextLevel = function(){
      var gain = context.createGain();
      gain.gain.value = 0.1;
      var nextLevel = context.createBufferSource();
      nextLevel.buffer = bufferList[11];
      nextLevel.connect(gain);
      gain.connect(context.destination);
      nextLevel.start(0);
    }

    sounds.nextLevelUp = function(){
      var gain = context.createGain();
      gain.gain.value = 0.1;
      var nextLevelUp = context.createBufferSource();
      nextLevelUp.buffer = bufferList[12];
      nextLevelUp.connect(gain);
      gain.connect(context.destination);
      nextLevelUp.start(0);
    }

    sounds.dead = function(){
      var gain = context.createGain();
      gain.gain.value = 0.3;
      var dead = context.createBufferSource();
      dead.buffer = bufferList[13];
      dead.connect(gain);
      gain.connect(context.destination);
      dead.start(0);
    }

    
    
    sounds.touch = function(){
      var gain = context.createGain();
      gain.gain.value = 0.1;
      
      var touchSound = context.createBufferSource();
      touchSound.buffer = bufferList[10];
      touchSound.connect(gain);
      gain.connect(context.destination);
      touchSound.start(0);
    }

    sounds.ambient1 = function(){ 
      var gain = context.createGain();
      gain.gain.value = 0.1;
      var startSound = context.createBufferSource();
      startSound.buffer = bufferList[7];
      startSound.connect(gain);
      gain.connect(context.destination);
      startSound.start(0);
      startSound.loop = true;
    }

    sounds.ambient1();
  
  console.log('finnished loading');

}








