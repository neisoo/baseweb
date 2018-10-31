define([],function(){
    'use strict';
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
       this.backgroundPosition = this.data.backgroundPosition;
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
              this.ready = true;
            };
            this.player = SoundControl.addContentSound(this.basePath + this.spkAudio);
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
       this.setFrame(this.appearFrame);
    }
    /**
    * Makes the physical sprite element
    *
    * @param object events The events to add
    */
    Sprite.prototype.createSpriteElement = function(){
       var div = document.createElement('div');
       div.objref = this;
       div.style.visibility = 'hidden';
       div.style.position = 'absolute';
       div.setAttribute('draggable','false');
       div.setAttribute('unselectable','on');
       div.setAttribute('name',this.data.name);
       div.style.position = 'absolute';
       div.style.backgroundRepeat = 'no-repeat';
       div.style.backgroundPosition = this.backgroundPosition;
       div.style.backfaceVisibility = 'hidden';
       div.style.backgroundImage = 'url('+this.stackImage+')';
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
       this.div.style.backgroundImage = 'url("'+this.stackImage+'")';
       this.div.style.backgroundPosition = '0 0';
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
       this.div.style.backgroundImage = 'url("'+this.stackImage+'")';
       this.div.style.backgroundPosition = this.backgroundPosition;
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
                   this.player.setPosition(spkPlayTime);
                   this.player.play();    
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
                   aFrame = Math.floor(frame/this.frameRate * 12) - this.appearFrame;
                }
                var index = this.spk[aFrame];

                if(index !== void 0){
                  if(this.spkArray[index].backgroundPosition !== void 0){
                      this.setPropertyValue('index',0);
                      this.setPropertyValue('backgroundPosition',this.spkArray[index].backgroundPosition);
                  }else{
                      this.setPropertyValue('index',index);
                  }
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
      this.div.style.overflow = 'hidden';
      this.div.style.backgroundImage = 'url('+this.stackImage+') ';
      this.div.style.backgroundPosition = this.backgroundPosition;
      this.div.style.backgroundRepeat = 'no-repeat';
      this.div.style.opacity = this.opacity;
      this.div.style.transform = this.transformMatrix;
      this.div.style.webkitTransform =  this.transformMatrix;
      this.div.style.MozTransform = this.transformMatrix;
      this.div.style.msTransform = this.transformMatrix;
      this.div.style.transformOrigin = this.width/2 + 'px ' + this.height/2 + 'px';
      this.div.style.webkitTransformOrigin =  this.width/2 + 'px ' + this.height/2 + 'px';
      this.div.style.msTransformOrigin =  this.width/2 + 'px ' + this.height/2 + 'px';
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
          case 'backgroundPosition':
          if(this.backgroundPosition == value || this.type !== 'spk')return;
            this.backgroundPosition = value;
          break;   
          case 'matrix':
            if(this.transformMatrix == value) return;
            this.transformMatrix = value;
          break;  
        }
    };
    enableEventHandling(Sprite);
    return Sprite;
});