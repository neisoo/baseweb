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
          loadedAssets: null
       };
       this.container = container;
       this.autoPlay = autoPlay;
       this.loop = loop;
       this.id = id;

       if(basePath == void 0){
          basePath = this.defaults.basePath;
       }
       if(this.autoPlay === void 0){
         this.autoPlay = this.defaults.autoPlay;
       }
       if(this.loop === void 0){
         this.loop = this.defaults.autoPlay;
       }
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
       var jsonString = this.basePath + this.id + '.json';
       ajax(jsonString,{},this.loadData.bind(this));
    };

    /**
    * Load asset images before load objects
    *
    * @param object data The data object with single asset json (data.json object)
    */
    GraphicPlayer.prototype.loadData = function(data){
       this.data = data.json;
       var obj = this;
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
       this.dispatchEvent('animationStarted',{frame:this.currentFrame});
       this.checkFrameEvents(this.currentFrame);
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
          var audioLength = Math.floor((this.player.getDuration())*this.frameRate)+1;
          this.spkEndFrame = this.appearFrame + audioLength;
       };
       var spkFileLoaded = function(data){
          var dataResult = data;
          var dataSpk = dataResult.split('|')[2].split(',');
          for(var i = 0; i < this.spkList.length; i++){
             var spriteName = this.spkList[i];
             var sprite = this.sprites[spriteName];
             sprite.spk = dataSpk;
             sprite.player = SoundControl.addContentSound(audio,{removeSrc:false});
             addListener(sprite.player,'loaded',changeSpkLoaded.bind(sprite));
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

        /**
    * Sprite Object
    *
    * @category cms
    * @package Graphic Player
    * @subpackage BusinessObject
    * @version $Id$
    * @param string urlStack
    * @param string type The sprite type
    * @param integer boxwidth The box width
    * @param ingeger boxheight The box height
    */
    function Sprite(data, basePath, frameRate){
       this.data = data;
       this.basePath = basePath;
       var urlStack = [];
       for(var j=0;j<data.images.length;j++) {
          var URL =  this.basePath + this.data.images[j];
          urlStack.push(URL);
       }
       this.urlStack = urlStack;
       this.type = this.data.type;
       this.swapStack = [];
       this.ready = false;
       this.frames = [];
       this.currentFrame = -1;
       this.shown = false;
       this.stackIndex = -1;
       this.forceHide = false;
       this.width = this.data.width;
       this.height = this.data.height;
       this.events = this.data.events;
       this.name = this.data.name;
       this.frameRate = this.data.frameRate;
       this.appearFrame = this.data.appearFrame;
       this.hideFrame = this.data.hideFrame;
       this.frames = this.data.frames;
       if(this.type == 'spk'){
         this.spkArray = this.data.spkArray;
         this.spkStartFrame = this.data.appearFrame;
         this.spkEndFrame = this.data.appearFrame + this.data.spkAudioLength;
         this.spk = this.data.spk;
         if(this.data.spkAudio !== void 0 && this.data.spkAudio !== '' && this.data.spkAudio !== null){
            this.spkAudio = this.data.spkAudio;

            var playerLoaded = function(event){
              var audioLength = Math.floor((this.player.getDuration())*this.frameRate)+1;
              this.spkEndFrame = this.appearFrame + audioLength;
              this.ready = true;
            };
            this.player = SoundControl.addContentSound(this.basePath + this.spkAudio,{removeSrc:false});
            addListener(this.player,'loaded',playerLoaded.bind(this));
          }else{
            this.ready = true;
          }
       }else{
        this.ready = true;
       }
       this.stackImage = this.urlStack[0];
       this.transformMatrix = '';
       this.div = this.createSpriteElement();
       this.playing = false;
       this.hasEvents = false;
       this.addEvents(this.data.events);
    }
    /**
    * Makes the physical sprite element
    *
    * @param object events The events to add
    */
    Sprite.prototype.createSpriteElement = function(){
       var div = new Image();
       div.objref = this;
       div.style.visibility = 'hidden';
       div.style.position = 'absolute';
       div.setAttribute('draggable','false');
       div.setAttribute('unselectable','on');
       div.setAttribute('name',this.data.name);
       div.style.position = 'absolute';
       div.style.backgroundPosition = 'left top';
       div.src = this.stackImage;
       return div;
    };

    /**
    * Sprite add events
    *
    * @param object events The events to add
    */
    Sprite.prototype.addEvents = function(events){

       var divEventCallback = function(event){
          var eventType = event.type;
          if(event.type == 'myclick'){
             eventType = 'click';
          }
          this.dispatchEvent(events[eventType]);
       }.bind(this);

       var spriteEventCallback = function(event){
          this.dispatchEvent(events[event.type]);
       }.bind(this);

       for(var i in events){
         this.hasEvents = true;
          if(i !== 'appear' && i !== 'hide'){
            addListener(this.div, i, divEventCallback);
          }else{
            addListener(this, i, spriteEventCallback);
          }
       }
    };

    /**
    * Send in assets you want to swap
    *
    * @param array of images. You can include image sequences.
    */
    Sprite.prototype.addSwapStack = function(stackArray){

       this.swapStack = stackArray;
       this.stackImage = this.swapStack[this.stackIndex];
       this.div.src = this.stackImage;
       var loadedAssets = [];
       var obj = this;
        var onLoadSwapStack = function(){
          loadedAssets.push(this);
          if(loadedAssets.length === stackArray.length){
             obj.dispatchEvent('spriteAssetSwapped');
          }
       };
       for(var i=0;i<stackArray.length;i++){
          var image = new Image();
          image.src = stackArray[i];
          image.onload = onLoadSwapStack;
       }
    };


    /**
    * Removes swapped out assets
    */
    Sprite.prototype.removeSwapStack = function(){

       this.swapStack = [];
      this.stackImage = this.urlStack[this.stackIndex];
       this.div.src = this.stackImage;//style.backgroundImage = 'url("'+this.urlStack[this.stackIndex]+'")';
       this.dispatchEvent('spriteAssetReverted');
    };

    /**
    * Focres a sprite to hide
    *
    * @param boolean to hide or not to hide
    */
    Sprite.prototype.hideSprite = function(bool){
       this.forceHide = bool;
       if(!this.forceHide && this.div.style.visibility == 'hidden'){
          this.div.style.visibility = 'inherit';
          this.dispatchEvent('appear');
       }
       if(this.forceHide && this.div.style.visibility == 'inherit'){
          this.div.style.visibility = 'hidden';
          this.dispatchEvent('hide');
       }
    };

    Sprite.prototype.setSpriteVisiblity = function(frame){
       this.shown = false;
       if(frame >= this.appearFrame){
          this.shown = true;
       }
       if(this.hideFrame !== null && frame > this.hideFrame){
          this.shown = false;
       }
       if(this.forceHide){
          this.shown = false;
       }
      if(this.shown && this.div.style.visibility == 'hidden'){
          this.div.style.visibility = 'inherit';
          this.dispatchEvent('appear');
       }
       if(!this.shown && this.div.style.visibility == 'inherit'){
          this.div.style.visibility = 'hidden';
          this.dispatchEvent('hide');
       }
    };

    /**
    * Set time, show current tween frame
    *
    * @param integer frame The frame number
    */
    Sprite.prototype.setFrame = function(frame,isPlaying){
       this.currentFrame = frame;
       switch(this.type){
          case 'graphic':
             this.setTweenFrame(frame);
          break;
          case 'spk':
             if(this.player !== void 0 && this.player !== null){
                if(this.playing === false && isPlaying && frame >= this.appearFrame && frame <= this.spkEndFrame){
                   var spkPlayTime = ((frame - this.appearFrame)/this.frameRate);
                   this.player.play();
                   this.player.setPosition(spkPlayTime);
                   this.playing = true;
                }
                if(frame > this.spkEndFrame){
                   this.player.pause();
                   this.playing = false;
                }
             }
             if(this.spk == void 0 || this.spk.length === 0){
                this.setTweenFrame(frame);
             }else{
                var aFrame;
                if(isPlaying && this.player !== void 0 && this.player.playing){
                   aFrame = Math.floor(this.player.getPosition()*12);
                }else{
                   aFrame = Math.ceil(frame/this.frameRate * 12) - this.appearFrame;
                }
                var index = this.spk[aFrame];

                if(index !== void 0){
                   this.setPropertyValue('index',index);
                   this.setPropertyValue('height',this.spkArray[index].height);
                   this.setPropertyValue('width',this.spkArray[index].width);
                   this.setTweenFrame(frame,['index','height','width']);
                }else{
                   this.setTweenFrame(frame);
                }
             }
          break;
       }
       this.setSpriteVisiblity(frame);
    };

    /**
    * Set value of all tweens of given frame with possible exceptions
    *
    * @param string frame The frame that we want to set the tweens
    * @param array exceptions List of exceptions
    */
    Sprite.prototype.setTweenFrame = function(frame,exceptions){
       if(exceptions == void 0){
          exceptions = [];
       }
       for(var prop in this.frames[frame-1]) {
          if(exceptions.indexOf(prop) > -1){
             continue;
          }
          this.setPropertyValue(prop, this.frames[frame-1][prop]);
       }
       this.renderSprite();
    };
   Sprite.prototype.noClick = function () {
       this.div.setAttribute('draggable', false);
       this.div.setAttribute('unselectable', 'on');
       this.div.style.pointerEvents = 'none';
   };

    Sprite.prototype.renderSprite = function(){
      if(!this.hasEvents){
         this.noClick();
      }
      this.div.style.left = this.x + 'px';
      this.div.style.top = this.y + 'px';
      this.div.style.width = this.width + 'px';
      this.div.style.height = this.height + 'px';
      this.div.style.opacity = this.opacity;
      this.div.style.transform = this.transformMatrix;
      this.div.style.webkitTransform =  this.transformMatrix;
      this.div.style.MozTransform = this.transformMatrix;
      this.div.style.msTransform = this.transformMatrix;
      this.div.style.transformOrigin = this.width/2 + 'px ' + this.height/2 + 'px';
      this.div.style.webkitTransformOrigin =  this.width/2 + 'px ' + this.height/2 + 'px';
      this.div.style.msTransformOrigin =  this.width/2 + 'px ' + this.height/2 + 'px';
      this.div.src = this.stackImage;
    };
    /**
    * Set value to property
    *
    * @param string property The propery to change: x, y, widht, height, opacity, volume, index or matrix
    * @param string value The property value
    */
    Sprite.prototype.setPropertyValue = function(property, value){

       switch(property){
          case 'x':
             if(this.x == value) return;
             this.x = value;
          break;
          case 'y':
             if(this.y == value) return;
             this.y = value;
          break;
           case 'width':
              if(this.width == value) return;
              this.width = value;
           break;
           case 'height':
              if(this.height == value) return;
              this.height = value;
           break;
           case 'opacity':
              if(this.opacity == value) return;
              this.opacity = value;
           break;
          case 'index':
          if(this.urlStack[value] === void 0 || this.stackIndex == value)return;
             this.stackIndex = value;
             if(this.swapStack.length > 0){
                this.stackImage = this.swapStack[value];
             }else{
                this.stackImage = this.urlStack[value];
             }
          break;
          case 'matrix':
            if(this.transformMatrix == value) return;
            this.transformMatrix = value;
          break;
        }
    };
   enableEventHandling(Sprite);

   function Audio(data, basePath, frameRate){
       this.data = data;
       this.basePath = basePath;
       this.audioPath = this.basePath + this.data.file;
       this.ready = false;
       this.frameRate = frameRate;
       this.basePath = basePath;
       this.loop = this.data.loop;
       this.playing = false;
       this.player = null;
       this.type = this.data.type;
       this.name = this.data.name;
       this.volume = this.data.volume;
       this.appearFrame = this.data.frame;
       this.hideFrame = this.data.frame + this.data.audioLength;
       if(this.audioPath === ''){
          this.ready = true;
          return;
       }
        var objref = this;
        var playerLoaded = function(event){
          this.ready = true;
        }.bind(this);
        var loopPlayer = function(event){
          if(this.loop){
            this.player.play();
            this.player.setPosition(0);
          }
        }.bind(this);

       switch(this.type){
          default:
          case 'content':
             this.player = SoundControl.addContentSound(this.audioPath,{removeSrc:false});
             break;
          case 'background':
             this.player = SoundControl.addBackgroundSound(this.audioPath);
             break;
          case 'effect':
             this.player = SoundControl.addEffectSound(this.audioPath);
             break;
       }
       if(this.loop){
         this.player.loop();
       }

       addListener(this.player, 'loaded', playerLoaded.bind(this));
       return this;
    }
    Audio.prototype.setFrame = function(frame,isPlaying){
       if(this.playing === false && isPlaying && frame >= this.appearFrame && frame <= this.hideFrame){
          var audioPlayTime = ((frame - this.appearFrame)/this.frameRate);
          this.player.play();
          this.player.setPosition(audioPlayTime);
          this.playing = true;
       }
    };
