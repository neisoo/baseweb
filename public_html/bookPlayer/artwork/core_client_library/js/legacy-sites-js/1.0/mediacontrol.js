

function MediaControl() {
    this.rollover_volume = 1;
    this.background_volume = 1;
    this.effect_volume = 0.7; //added by TJ on 4/1/2013
    this.content_volume = 1;
    this.ticket_volume = 1;
    this.master_volume = 1;
    this.rollover_delay = .4; //default is 0.4 as of 7/2/13
    this.activeSounds = new Array();
    this.allSounds = new Array(); //added by TJ on 8/6/2013, holding all sounds.
    this.rollovertimer = 0;
    this.rolloverPlayer;
}

MediaControl.prototype.getRolloverVolume = function() {
    return this.rollover_volume;
};

MediaControl.prototype.setRolloverVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    if(!isNaN(vol)) this.rollover_volume = vol;
    this.updateAllVolumes();
};

MediaControl.prototype.getBackgroundVolume = function() {
    return this.background_volume;
};

MediaControl.prototype.setBackgroundVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    if(!isNaN(vol)) this.background_volume = vol;
    this.updateAllVolumes();
};

//added by TJ on 4/1/2013
MediaControl.prototype.getEffectVolume = function() {
    return this.effect_volume;
};
MediaControl.prototype.setEffectVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    if(!isNaN(vol)) this.effect_volume = vol;
    this.updateAllVolumes();
};

MediaControl.prototype.getContentVolume = function() {
    return this.content_volume;
};

MediaControl.prototype.setContentVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    if(!isNaN(vol)) this.content_volume = vol;
    this.updateAllVolumes();
};

MediaControl.prototype.setTicketVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    if(!isNaN(vol)) this.content_volume = vol;
    this.updateAllVolumes();
};

MediaControl.prototype.getTicketVolume = function(vol) {
    return this.ticket_volume;
};

MediaControl.prototype.getMasterVolume = function() {
    return this.master_volume;
};

MediaControl.prototype.setMasterVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    //vol = 1; //modified by MG on 11/05/14 to override old account settings for volume
    if(!isNaN(vol)) this.master_volume = vol;
    this.updateAllVolumes();
};

MediaControl.prototype.updateAllVolumes = function() {
    //modified by TJ on 8/6/2013, run for loop backward
    for(var i=this.activeSounds.length - 1;i>=0;i--) {
        var snd = this.activeSounds[i];

        //added by TJ on 8/6/2013, remove sound that not playing from active sounds.
        if(!snd || snd.playing == false)
        {
            this.activeSounds.splice(i, 1);
            continue;
        }

        if(snd.type == 'content') snd.setVolume(this.content_volume*this.master_volume);
        if(snd.type == 'background') snd.setVolume(this.background_volume*this.master_volume);
        if(snd.type == 'rollover') snd.setVolume(this.rollover_volume*this.master_volume);
        if(snd.type == 'button') snd.setVolume(this.rollover_volume*this.master_volume);
        if(snd.type == 'effect') snd.setVolume(this.effect_volume*this.master_volume); //added by  TJ on 4/1/2013
        if(snd.type == 'ticket') snd.setVolume(this.ticket_volume*this.master_volume);
    }
};

MediaControl.prototype.getRolloverDelay = function() {
    return this.rollover_delay;
}

MediaControl.prototype.setRolloverDelay = function(vol) {
    vol = Math.max(.4, Math.min(vol, 2));
    if(!isNaN(vol)) this.rollover_delay = vol;
}

MediaControl.prototype.buttonRollover = function(btn, url) {
    if(typeof(btn) == 'string') btn = document.getElementById(btn);
    if(btn) {
        if(url) btn.setAttribute('rolloverSound', url);
        if(document.createTouch) {
            //MAG 04/11/2014: Added this condition in order to fix a bug with chrome on touch screens (desktop/laptops)
            if(navigator.userAgent.indexOf('Chrome') != -1) {
                addListener(btn, 'mouseover', this.rolloverStart);
            } else {
                addListener(btn, 'touchstart', this.rolloverStart);
            }
        }
        else {addListener(btn, 'mouseover', this.rolloverStart);}
    }
}


MediaControl.prototype.removeButtonRollover = function(btn) {
    if(btn) {
        if(typeof(btn) == 'string') btn = document.getElementById(btn);
        btn.removeAttribute('rolloverSound');
        removeListener(btn, 'mouseover', this.rolloverStart);
        removeListener(btn, 'touchstart', this.rolloverStart);
    }
}


MediaControl.prototype.rolloverStart = function(event) {
    var btn = getEventTarget(event);

    clearInterval(SoundControl.rollovertimer);
    var rolloverSound = btn.getAttribute('rolloverSound');

    SoundControl.rollovertimer = setTimeout("SoundControl.playRollover('"+rolloverSound+"','"+btn.id+"')", SoundControl.rollover_delay*1000);

    if(document.createTouch)
    {
        addListener(btn, 'touchend', SoundControl.rolloverCancel);
        addListener(btn, 'touchmove', SoundControl.rolloverReset);
    }
    else
    {
        addListener(btn, 'mouseout', SoundControl.rolloverCancel);
        addListener(btn, 'mousemove', SoundControl.rolloverReset);
    }
}

MediaControl.prototype.rolloverCancel = function(event) {
    var btn = getEventTarget(event);

    clearTimeout(SoundControl.rollovertimer);
    removeListener(btn, 'mouseout', SoundControl.rolloverCancel);
    removeListener(btn, 'touchend', SoundControl.rolloverCancel);
    removeListener(btn, 'mousemove', SoundControl.rolloverReset);
    removeListener(btn, 'touchmove', SoundControl.rolloverReset);
}

MediaControl.prototype.rolloverReset = function(event) {
    var btn = getEventTarget(event);

    clearInterval(SoundControl.rollovertimer);
    var rolloverSound = btn.getAttribute('rolloverSound');
    SoundControl.rollovertimer = setTimeout("SoundControl.playRollover('"+rolloverSound+"','"+btn.id+"')", SoundControl.rollover_delay*1000);
}

MediaControl.prototype.playRollover = function(url, btnid) {
    var playRollOver = true;
    for(var i = SoundControl.activeSounds.length - 1; i >= 0; i--)
    {
        if(!SoundControl.activeSounds[i] || SoundControl.activeSounds[i].playing == false)
        {
            SoundControl.activeSounds.splice(i, 1);
            continue;

        }
        if(SoundControl.activeSounds[i].type == 'content'  ) {
            playRollOver = false;
        }
    }
    if(playRollOver){
        SoundControl.rolloverPlayer = SoundControl.addRolloverSound(url);

        addListener(SoundControl.rolloverPlayer,'loaded',function(){
            if (window.pathIframe && window.pathIframe.contentWindow) {
                pathIframe.contentWindow.postMessage(JSON.stringify({
                    action: 'cancelRolloverSounds'
                }), pathIframe.src);
            }
            this.play();
        });
        //if(SoundControl.rolloverPlayer) SoundControl.rolloverPlayer.play();
        var btn = document.getElementById(btnid);

        if(btn) {
            removeListener(btn, 'mousemove', SoundControl.rolloverReset);
            removeListener(btn, 'touchmove', SoundControl.rolloverReset);
        }
    }
}

MediaControl.prototype.stopAllSounds = function(event) {
    // added by EF as test for Ticket Counting page 09-23-2013
    for(i=this.allSounds.length-1;i>=0;i--) {
        var snd = this.allSounds[i];
        if (snd) snd.stop();
    }
}

//added by TJ on 8/23/2013, stop specific sounds, accept array or string
MediaControl.prototype.stopSounds = function(target)
{
    //if you don't pass anything, it will stop all sounds.
    if(!target)
    {
        this.stopAllSound();
        return;
    }

    //you can pass array of sound type to stop those specific sounds
    if(target.constructor === Array)
    {
        for(var i = this.allSounds.length - 1; i >= 0; i--)
        {
            if(target.indexOf(this.allSounds[i].type) != -1)
                this.allSounds[i].stop();
        }
    }
    else if(target.constructor === String)//or you can pass just one type of sound
    {
        for(var i = this.allSounds.length - 1; i >= 0; i--)
        {
            if(this.allSounds[i].type == target)
                this.allSounds[i].stop();
        }
    }
}

MediaControl.prototype.stopAndRemoveSounds = function (){
    //modified by TJ on 7/19/2013
    for(var i=this.activeSounds.length-1;i>=0;i--) {
        var snd = this.activeSounds[i];
        if(snd.playing)
            snd.stop();
    }

    // added by EF as test for Ticket Counting page 09-23-2013
    for(i=this.allSounds.length-1;i>=0;i--) {
        var snd = this.allSounds[i];
        snd.stop();
    }
    this.activeSounds = [];
    this.allSounds = [];

    try{ appCall('flushCollection'); }catch(a){}
}


MediaControl.prototype.stopAllSound = function() {
    //modified by TJ on 7/8/2013, since on stop() it removes itself from activeSounds, count for loop backward.
    for(var i = this.allSounds.length - 1;i >= 0;i--) {
        var snd = this.allSounds[i];
        if(snd) snd.stop();
    }
}

MediaControl.prototype.pauseAllSound = function() {
    //modified by TJ on 7/19/2013
    for(var i=this.activeSounds.length-1;i>=0;i--) {
        var snd = this.activeSounds[i];
        if(snd && snd.playing)
            snd.pause();
    }
}
MediaControl.prototype.addRolloverSound = function(url) {
    return this.createPlayer(url, 'rollover');
}

MediaControl.prototype.addButtonClickSound = function(url) {
    return this.createPlayer(url, 'button');
}

MediaControl.prototype.addContentSound = function(url, options) {
    return this.createPlayer(url, 'content', '',options);
};

MediaControl.prototype.addTicketSound = function(url, options) {
    return this.createPlayer(url, 'ticket', '', options);
};

MediaControl.prototype.addRecording = function() {
    return this.createPlayer('', 'recording');
};




MediaControl.prototype.addBackgroundSound = function(url) {
    return this.createPlayer(url, 'background');
};

MediaControl.prototype.addEffectSound = function(url) {
    //commented by TJ on 7/19/2013, effect sound shouldn't stop any other sounds.
    return this.createPlayer(url, 'effect');
};

MediaControl.prototype.addVideo = function(containerDiv, url, type, isOnTop, showControls, options, kvp) {
    if(typeof options == 'undefined') options = {};
    if(type == undefined) type = 'content';
    if(isOnTop == undefined) isOnTop = false;
    if(showControls == undefined) showControls = false;
    if(typeof kvp === 'undefined') kvp = {};

    containerDiv.isOnTop = isOnTop;
    containerDiv.showControls = showControls;

    var videoPlayer = this.createPlayer(url, type, containerDiv, options);

    if(typeof videoPlayer.url !== 'undefined')
        kvp.videoName = videoPlayer.url;

    addListener(videoPlayer , 'start', function(){
        Analytics.trackVideoStart(kvp);
    });

    addListener(videoPlayer , 'complete', function(){
        Analytics.trackVideoComplete(kvp);
    });

    return videoPlayer;
};

MediaControl.prototype.addSpeech = function(url, animation, offsets, type) {
    if(type == undefined) type = 'content';
    var snd = this.createPlayer(url, type);
    snd.animation = animation;
    snd.animationPos = offsets;
    return snd;
};

//Pass URL to mp3, element ID, type
//Spk file must have same name as mp3 as well as be in the same directory.
MediaControl.prototype.addSpeechNew = function(url, imageId,type) {
    var spkFile   =  url.replace(/\.[^/.]+$/, '')+'.spk';

    var nest =  this;
    var snd = this.createPlayer(url, type);
    var mouthElement = document.getElementById(imageId);
    var mouthSequence =  new ImageSequence(mouthElement);
    snd.animation = mouthSequence;
    ajax('/html5/xml/get_spk.php',{spk:spkFile},function(data){
        if(type == undefined) type = 'content';
        mouthSequence.frameRate = data.framerate;
        snd.animationPos = data.frames;
        snd.dispatchEvent('spkready');
    });
    return snd;
};


MediaControl.prototype.createPlayer = function(url, type, div, options) {
    if(typeof options === 'undefined') options = {};
    // url in format spk:<mouth id>:<sound url>

    if(url.substr(0,4).toLowerCase() == 'spk:') {
        var parts = url.split(':');
        parts.shift();
        var mouth = parts.shift();
        return this.addSpeechNew(parts.join(':'), mouth, type);
    }

    if(url.indexOf('rosound') != -1 && url.indexOf('?') == -1)
        url += '?t=' + Math.floor(Math.random()*10);

    var player;

    player = new MediaPlayer(url, type, div, options);

    if(player) {
        //added by TJ on 8/6/2013
        addListener(player, 'update', this.updateSoundStatus);

        this.allSounds.push(player); //added by TJ on 8/6/2013, allSounds array will hold all sounds that are unique.

        if(type != 'recording')
            player.load();
        else if (type == 'recording')
            player.initRecording();
        switch(type){
            case 'rollover': player.setVolume(this.rollover_volume*this.master_volume);break;
            case 'button': player.setVolume(this.rollover_volume*this.master_volume);break;
            case 'content': player.setVolume(this.content_volume*this.master_volume);break;
            case 'background': player.setVolume(this.background_volume*this.master_volume);break;
            case 'effect': player.setVolume(this.effect_volume*this.master_volume); break; //added by TJ on 4/1/2013
            case 'ticket': player.setVolume(this.ticket_volume*this.master_volume); break;
        }
    }

    return player;
};

//added by TJ on 8/6/2013, this function is called when media player updates.
MediaControl.prototype.updateSoundStatus = function(event)
{
    var _target = getEventTarget(event);
    if(!_target) return;

    /* if(SoundControl.allSounds.indexOf(_target) == -1)
     SoundControl.allSounds.push(_target); */

    //media player plays
    if(_target.playing == true && SoundControl.activeSounds.indexOf(_target) == -1)
    {
        //do sound control before push new active sounds
        switch(_target.type)
        {
            case 'background':
                for(var i = SoundControl.activeSounds.length - 1; i >= 0; i--)
                {
                    if(!SoundControl.activeSounds[i] || SoundControl.activeSounds[i].playing == false)
                    {
                        SoundControl.activeSounds.splice(i, 1);
                        continue;
                    }
                    if(SoundControl.activeSounds[i].type == 'background')
                    {
                        SoundControl.activeSounds[i].stop();
                    }
                }
                _target.setVolume(SoundControl.background_volume*SoundControl.master_volume);
                break;
            default:
            case 'content':
                for(var i = SoundControl.activeSounds.length - 1; i >= 0; i--)
                {
                    if(!SoundControl.activeSounds[i] || SoundControl.activeSounds[i].playing == false)
                    {
                        SoundControl.activeSounds.splice(i, 1);
                        continue;

                    }
                    if( SoundControl.activeSounds[i].type == 'rollover' ||
                        SoundControl.activeSounds[i].type == 'button')
                    {
                        SoundControl.activeSounds[i].stop();

                    }
                }
                _target.setVolume(SoundControl.content_volume*SoundControl.master_volume);
                break;
            case 'rollover':
            case 'button':
                for(var i = SoundControl.activeSounds.length - 1; i >= 0; i--)
                {
                    if(!SoundControl.activeSounds[i] || SoundControl.activeSounds[i].playing == false)
                    {
                        SoundControl.activeSounds.splice(i, 1);
                        continue;
                    }
                    if( SoundControl.activeSounds[i].type == 'content'  ) {
                        //modified by TJ on 2/15/2015, safari on mac had an issue that rollover sound doesn't stop by content sound.
                        if(BROWSER.match(/safari/i)) {
                            setTimeout(function(){ _target.stop(); } , 1);
                        }else {
                            _target.stop();
                        }
                        return;
                    }

                    if(SoundControl.activeSounds[i].type == 'rollover' || SoundControl.activeSounds[i].type == 'button')
                    {
                        SoundControl.activeSounds[i].stop();
                    }
                }
                _target.setVolume(SoundControl.rollover_volume*SoundControl.master_volume);
                break;
            case 'effect':
                _target.setVolume(SoundControl.effect_volume*SoundControl.master_volume);
                break;
        }
        //alert(_target);
        SoundControl.activeSounds.push(_target);
    }
    //media player stops
    else if(_target.playing == false && SoundControl.activeSounds.indexOf(_target) != -1)
        SoundControl.activeSounds.splice(SoundControl.activeSounds.indexOf(_target), 1);
};

MediaControl.prototype.playMusic = function(snd){
    var audio = this.addBackgroundSound(snd);
    if(audio){
        audio.play();
        audio.loop();
    }
};