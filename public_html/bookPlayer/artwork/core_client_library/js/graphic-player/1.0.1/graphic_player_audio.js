define([],function(){
  'use strict';
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
            this.player.setPosition(0);
            this.player.play();
          }
        }.bind(this);

       switch(this.type){
          default:
          case 'content':
             this.player = SoundControl.addContentSound(this.audioPath);
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
          this.player.setPosition(audioPlayTime)    
          this.player.play();    
          this.playing = true;
       }
       if(frame > this.hideFrame && !this.loop){
          this.player.pause();
          this.playing = false;
       }
    };
    return Audio;
});