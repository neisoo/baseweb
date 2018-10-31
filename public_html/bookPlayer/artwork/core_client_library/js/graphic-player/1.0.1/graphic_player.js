require.config({
    paths:{
        'graphicSprite' : '/core_client_library/js/graphic-player/1.0.1/graphic_player_sprite',
        'graphicAudio' : '/core_client_library/js/graphic-player/1.0.1/graphic_player_audio',
    }
});

define([
        'graphicSprite',
        'graphicAudio'
    ],function(Sprite,Audio){
  'use strict';
    /**
    * Graphic player
    *
    * @category cms
    * @package Graphic Player
    * @subpackage BusinessObject
    * @version $Id$
    * @param string container The container
    * @param string jsonFile The full path of the jsonfile '/folder/location/file.json'
    * @param string basePath The base path that contains the folder
    * @param bool autoPlay The autoplay flag
    * @param bool loop The play loop flag 
    */
    function GraphicPlayer(container, id, autoPlay, loop, basePath){
        this.defaults = {
            autoPlay:false,
            loop:false,
            basePath:'/adminart/converted_animations/',
            loadedAssets: null,
        };
        this.container = container;
        this.autoPlay = autoPlay;
        this.loop = loop;
        this.id = id;

        basePath = basePath || this.defaults.basePath;
        this.autoPlay = autoPlay || this.defaults.autoPlay;
        this.loop = loop || this.defaults.loop;
   
        if(typeof(this.container) === 'string'){
            this.container = document.getElementById(this.container);
        }
        this.basePath = basePath + id + '/';
        this.ready = false;
        this.isPlaying = false;
        this.startTime = 0;
        this.startPos = 0;
        this.currentFrame = 1;
        this.previousFrame = -1;
        this.frameRate = 12;
        this.currentSequence = '';
        this.sequences = [];
        this.data = {};
        this.sprites = {};
        this.depthArray = [];
        this.currentDepthArray = [];
        this.assetList = [];
        this.loadedAssets = [];
        this.spkList = [];
        this.audioList = [];
        this.mask = void 0;
        this.maskWidth = 0;
        this.maskHeight = 0;
        this.loadJSON();    
    }
    /**
    * Creates a display on which the animation will render
    */
    GraphicPlayer.prototype.buildMask = function(){
      var mask = document.createElement('div');
      mask.style.overflow = "hidden";
      mask.style.position = "absolute";
      mask.style.width = this.maskWidth + 'px';
      mask.style.height = this.maskHeight + 'px';
      this.container.appendChild(mask);
      return mask;
    };

    /**
    * Load asset json The data from server
    */
    GraphicPlayer.prototype.loadJSON = function(){
      var jsonString = this.basePath + 'publish/index.json';   
      ajax(jsonString,{},this.loadData.bind(this));
    };

    /**
    * Load asset images before load objects
    *
    * @param object data The data object with single asset json (data.json object)
    */
    GraphicPlayer.prototype.loadData = function(data){
       this.data = data.json;
       var onImageLoad = function(event){
          this.loadedAssets.push(event.target);
          if(this.loadedAssets.length === this.data.allImages.length){
             this.loadObjects();
          }
       }.bind(this);

       for(var i=0;i<this.data.allImages.length;i++){
          var image = new Image();
          image.src = this.basePath + this.data.allImages[i];
          image.onload = onImageLoad;
       }
    };

    /**
    * Reload asset json
    *
    * @param object json The single asset json
    */
    GraphicPlayer.prototype.reloadJSON = function(json){
       this.destroy();
       this.loadData(json);
    };

    /**
    * load animation objects
    */
    GraphicPlayer.prototype.loadObjects = function(){
       this.maskWidth = this.data.width;
       this.maskHeight = this.data.height;
       this.totalFrames = this.data.totalFrames;
       this.depthArray = this.data.depthArray;
       this.sequences = this.data.sequences;
       for(var i=this.data.sprites.length-1;i>=0;i--) {
          var spritedata = this.data.sprites[i];
          this.frameRate = spritedata.frameRate;
          var sprite = this.createGraphicObject('sprite', spritedata);
          this.sprites[sprite.name] = sprite;
          if(sprite.type == 'spk'){
            this.spkList.push(sprite.name);
          }
       }
        
       if(this.data.audio === void 0){
          this.data.audio = [];
       }

       for(var j=this.data.audio.length-1;j>=0;j--) {
          var audiodata = this.data.audio[j];
          var audioObj = this.createGraphicObject('audio',audiodata);
          this.audioList.push(audiodata.name);
          this.sprites[audiodata.name] = audioObj;
       }
      this.renderSriteFrame(1);   
      this.checkAnimationReady();
    };
    /**
    * Creates a sprite object from data object
    *
    * @param string type of graphic object
    * @param object sprite data object from json
    */
    GraphicPlayer.prototype.createGraphicObject = function(type,data){
        var graphicObject;
        switch(type){
          case 'audio':
            graphicObject = new Audio(data,this.basePath,this.frameRate);
          break;
          case 'sprite':
            graphicObject = new Sprite(data, this.basePath, this.frameRate);
          break;
        }
        return graphicObject;
    };

    /**
    * Check animation ready
    */
    GraphicPlayer.prototype.checkAnimationReady = function(){
       
       var ready = true;
       var runTimeout = function(){
          this.checkAnimationReady();
       }.bind(this);
       for(var i in this.sprites){
          if(!this.sprites[i]) continue;
          if(!this.sprites[i].ready){
             setTimeout(runTimeout, 1);
             ready = false;
             return;
          }
       }

       this.ready = true;
       this.dispatchEvent('animationReady');
       if(this.autoPlay){
          this.play();
       }
    };
    GraphicPlayer.prototype.renderSriteFrame = function(frame){
         this.setSpriteDepths(frame);
         this.setSpriteFrame(frame);
         this.checkFrameEvents(frame);
    };

    GraphicPlayer.prototype.setSpriteDepths = function(frame){
       if(this.mask == void 0){
        this.mask = this.buildMask();
       }
       var lastFrameDepth = frame;
       while(this.depthArray[lastFrameDepth] === void 0){
          lastFrameDepth--;
       }
       if(this.currentDepthArray.toString() !== this.depthArray[lastFrameDepth].toString()){
          this.currentDepthArray = this.depthArray[lastFrameDepth];
          while(this.mask.hasChildNodes()){
             this.mask.removeChild(this.mask.childNodes[0]);
          }
          for(var i=0;i<this.currentDepthArray.length;i++){
             var spriteName = this.currentDepthArray[i];
             this.mask.appendChild(this.sprites[spriteName].div);
          }
       }
    };
    /**
    * looks at currentDepthArray to set sprites
    *
    * @param integer frame
    */
    GraphicPlayer.prototype.setSpriteFrame = function(frame){
       
       for(var i=0;i < this.currentDepthArray.length;i++){
          var spriteName = this.currentDepthArray[i];
          var sprite = this.sprites[spriteName];
          sprite.setFrame(frame, this.isPlaying);
       }
       for(var j=0;j<this.audioList.length;j++){
          var audioName = this.audioList[j];
          var audio = this.sprites[audioName];
          audio.setFrame(frame, this.isPlaying);
       }
    };

    /**
    * run time line
    *
    * @param integer now The current animation timestamp
    */
    GraphicPlayer.prototype.runTimeline = function(now){
       
       var time = this.startPos + (now - this.startTime)/1000;
       if(time < 0){
          time = 0;
       }
       var frame = Math.floor(time*this.frameRate)+1;
       if(frame == this.currentFrame && frame > 1)return;
       var renderFrames = true;
       this.currentFrame = frame;
       this.dispatchEvent('animationRunning',{frame:this.currentFrame});
       if(this.currentSequence === ''){
          if(this.currentFrame >= this.totalFrames) {
            renderFrames = false;
             if(this.loop){
                this.gotoAndPlay(1);
             }else{
                this.currentFrame = this.totalFrames;
                this.renderSriteFrame(this.currentFrame);
                this.stop();
             }
             this.dispatchEvent('animationDone');
          }
       }else{
          if(this.currentFrame >= this.sequences[this.currentSequence].end){
            renderFrames = false;
             if(this.loop){
                this.gotoAndPlay(this.currentSequence);
                this.dispatchEvent(this.currentSequence);
             }else{
                this.currentFrame = this.sequences[this.currentSequence].end;
                this.renderSriteFrame(this.currentFrame);
                this.stop();
                this.dispatchEvent(this.currentSequence);
             }
             if(this.currentFrame >= this.totalFrames){
                this.dispatchEvent('animationDone');
             }
          }
       }

       if(renderFrames){
           this.renderSriteFrame(this.currentFrame);
       }
    };

    /**
    * Play animation
    */
    GraphicPlayer.prototype.play = function(){
       
       if(this.isPlaying)return;
       this.startTime = (new Date()).getTime();
       this.startPos = (this.currentFrame-1)/this.frameRate;
       this.isPlaying = true;
       this.dispatchEvent('animationStarted',{frame:this.currentFrame});
    };

    /**
    * Stop animation
    */
    GraphicPlayer.prototype.stop = function() {
       
       if(!this.isPlaying)return;
       this.pauseAllSounds();
       this.isPlaying = false;
       this.dispatchEvent('animationStopped',{frame:this.currentFrame,animationDone:this.currentFrame == this.totalFrames});
    };

    /**
    * Pause all sounds
    */
    GraphicPlayer.prototype.pauseAllSounds = function(){
       for(var j=0;j<this.audioList.length;j++){
          var audioName = this.audioList[j];
          var audio = this.sprites[audioName];
          if(audio.player == void 0)continue;
          audio.player.pause();
          audio.playing = false;
       }
       for(var i=0;i< this.spkList.length;i++){
          var spriteName = this.spkList[i];
          var sprite = this.sprites[spriteName];
          if(sprite.player == void 0)continue;
          sprite.player.pause();
          sprite.playing = false;
       }
    };

    /**
    * Go to the frame and play animation
    *
    * @param integer fname The frame number
    */
    GraphicPlayer.prototype.gotoAndPlay = function(frame){
       
       if(isNaN(frame)){
          if(this.sequences[frame] !== void 0){
             this.currentFrame = this.sequences[frame].start;
             this.currentSequence = frame;
          }else{
             return;
          }
       }else{
          this.currentFrame = frame;
          this.currentSequence = '';
       }
       if(this.currentFrame > this.totalFrames || this.currentFrame < 1)return;
       this.pauseAllSounds();
       this.isPlaying = true;
       this.startPos = (this.currentFrame-1)/this.frameRate;
       this.startTime = (new Date()).getTime();
       this.renderSriteFrame(this.currentFrame);
       this.dispatchEvent('animationStarted',{frame:this.currentFrame});
    };

    /**
    * Goto the frame and stop animation
    *
    * @param integer frame The frame number
    */
    GraphicPlayer.prototype.gotoAndStop = function(frame){
       
       if(this.isPlaying) return;
       if(isNaN(frame)) return;
       if(frame > this.totalFrames || frame < 1)return;
       this.currentFrame = frame;
       this.startPos = (frame-1)/this.frameRate;
       this.renderSriteFrame(this.currentFrame);
       this.stop();
       if(this.currentFrame >= this.totalFrames) {
          this.dispatchEvent('animationDone');
       }
    };

    /**
    * Get sprite by name
    *
    * @param string is The sprite name
    *
    * @return The Sprite object
    */
    GraphicPlayer.prototype.getSprite = function(name){
       
       return this.sprites[name];
    };


    /**
    * Make a new sequence
    *
    * @param string name of seuqence
    * @param int start frame
    * @param int end frame
    */
    GraphicPlayer.prototype.makeSequence = function(name,start,end){
       
       this.sequences[name] = {start:start,end:end};
    };


    /**
    * Change spk
    *
    * @param string audio The path to audio file
    * @param string spkFile The path to spk file
    */
    GraphicPlayer.prototype.changeSpk = function(audio,spkFile){
       var changeSpkLoaded = function(){
          var audioLength = Math.floor((this.getDuration())*this.frameRate)+1;
          this.spkEndFrame = this.appearFrame + audioLength;
       };
       var spkFileLoaded = function(data){
          var dataResult = data;
          var dataSpk = dataResult.split('|')[2].split(',');
          for(var i = 0; i < this.spkList.length; i++){
             var spriteName = this.spkList[i];
             var sprite = this.sprites[spriteName];
             sprite.spk = dataSpk;
             sprite.player = SoundControl.addContentSound(audio);
             addListener(sprite.player,'loaded',changeSpkLoaded.bind(sprite.player));
            //  var audioSettings = { 
            //     audioUrl: this.basePath + dataResult.spkAudio,
            //     onSoundLoaded:changeSpkLoaded,
            //     autoPlay:false
            // };              
            // sprite.player = $audioPlayer.get('content', audioSettings);
          }
       };
      ajax(spkFile, null, spkFileLoaded.bind(this));
    };


    /**
    * Check frame events
    *
    * @param integer fname The frame number
    * @param string type The frame type
    */
    GraphicPlayer.prototype.checkFrameEvents = function(frame,type){
       
       for(var i=0;i<this.data.events.length;i++){
          var eventObj = this.data.events[i];
          if(eventObj.frame == frame){
             this.dispatchEvent(eventObj.event);
          }
       }
    };

    /**
    * Destroy graphic player
    */
    GraphicPlayer.prototype.destroy = function(){
       this.pauseAllSounds();
       this.mask.parentNode.removeChild(this.mask);
       this.mask = void 0;
       this.ready = false;
       this.isPlaying = false;
       this.startTime = 0;
       this.startPos = 0;
       this.currentFrame = 1;
       this.previousFrame = -1;
       this.frameRate = 12;
       this.currentSequence = '';
       this.sequences = [];
       this.data = {};
       this.sprites = {};
       this.depthArray = [];
       this.currentDepthArray = [];
       this.assetList = [];
       this.loadedAssets = [];
       this.spkList = [];
       this.audioList = [];
    };
    enableEventHandling(GraphicPlayer);
    return GraphicPlayer;
});