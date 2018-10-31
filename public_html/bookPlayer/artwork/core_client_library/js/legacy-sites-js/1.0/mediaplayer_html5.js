var nextSoundID = 0;
var ipad = (navigator["userAgent"].indexOf('iPad') != -1);
var recorderApproval = false;//this is used in recorder.js  but needs to be global

if (window.addEventListener) {
    window.addEventListener("load", printerInitialize, null);
    window.addEventListener("load", recordInitialize, null);
} else if (window.attachEvent) {
    window.attachEvent("onload", printerInitialize);
    window.attachEvent("onload", recordInitialize);
}

function printerInitialize(e) {
    setTimeout(function() {
        var player = document.createElement('div');
        player.id = "flashprinterholder";
        document.body.appendChild(player);
        player.innerHTML = "<object\n   id='flashprinter'\n height='1'\n    width='1'\n data='/artwork/html5/flashprinter.swf'\n allowscriptaccess='always'\n type='application/x-shockwave-flash'\n loop='false'\n name='flashprinter'><param name='FlashVars' value='webpath=" + WEBHOST + "'>\n</object>\n";
    }, 3000);
}

function recordInitialize(e) {
   if (typeof window.RecordingSystem !== 'undefined' && window.RecordingSystem.defaults.removeMediaPlayerSWF) {
     //FOUND THE removeMediaPlayerSWF FLAG TO BE TRUE
     return;
   }
    setTimeout(function() {
        var player = document.createElement('div');
        player.id = "recorderObject";
        player.innerHTML = "<object\n  wmode='transparent'\n    id='flashrecorder'\n    height='1'\n    width='1'\n data='/artwork/html5/recoder.swf'\n allowscriptaccess='always'\n type='application/x-shockwave-flash'\n loop='false'\n name='flashrecorder'><param name='FlashVars' value='webpath=" + WEBHOST + "'>\n</object>\n";
        document.body.appendChild(player);   
    }, 3000);
}

function MediaPlayer(url, type, videodiv, options) {
    this.id = nextSoundID++;
    this.playing = false;
    this.paused = false;
    this.done = false;
    this.length = 0;
    this.position = 0;
    this.duration = 0; //added by TJ on 3/10/2014
    this.volume = 1;
    this.url = url;
    this.type = type;
    this.sentStart = false;
    this.videodiv = videodiv;
    this.ready = false;
    this.autostart = false;

    //11.22.13 dh & jk
    this.closeBtn = null;

    // speech elements
    this.animation;
    this.animationPos;
    this.defaultPos = 0;
    this.speechTimer;

    if (typeof options != 'undefined' && options.forcedUrl) {
        this.forcedUrl = options.forcedUrl;
    }

    this.errorEvent = null;

    if (videodiv) {
        this.element = document.createElement('video');
        this.element.id = 'videodiv_' + nextSoundID;
        this.element.className = 'gpu-accelerate';
        this.element.width = videodiv.offsetWidth;
        this.element.height = videodiv.offsetHeight;
        this.element.style.position = 'absolute';
        this.url = this.url.replace('.mov', '.mp4');

        if (this.element.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') === 'probably')
            this.element.src = this.url.replace('.flv', '.mp4').replace('.ogv', '.mp4');
        else if (this.element.canPlayType('video/ogg; codecs="theora, vorbis"') === 'probably')
            this.element.src = this.url.replace('.mp4', '.ogv').replace('.flv', '.ogv');
        else
            this.element.src = this.url.replace('.flv', '.mp4');

        videodiv.appendChild(this.element);
    } else {
        //Added By TM and MG to fix IE9 crashing when removing the audio src 12/06/13
        if (BROWSER == 'IE 9')
        {
            var audioHolder = document.createElement('div');
            var mainDiv = document.getElementById("maindiv");
            audioHolder.innerHTML = "<audio></audio>";
            mainDiv.appendChild(audioHolder);
            this.element = audioHolder.childNodes[audioHolder.childNodes.length - 1];
            this.element.setAttribute('type', 'audio/mpeg');
        }

        else
        {
            this.element = document.createElement('audio');
        }

        if (this.element.canPlayType('audio/mpeg') === 'probably') {
            this.element.src = url.replace('.flv', '.mp3');
        } else if (this.element.canPlayType('audio/ogg;codecs="vorbis"') === 'probably') {
            this.element.src = url.replace('.mp3', '.ogg').replace('.flv', '.ogg');
        } else {
            this.element.src = url.replace('.flv', '.mp3');
        }
    }

    this.element.preload = 'metadata';
    this.element.objref = this;

    // this might be playing or something else depending on browser
    // http://www.w3.org/2010/05/video/mediaevents.html

    addListener(this.element, 'error', this.mediaError.bind());
    addListener(this.element, 'ended', this.mediadone);
    // event 'ended' fails to fire in certain occasions (chrome/ie on windows). workaround:
    addListener(this.element, 'timeupdate', function(e) {
        if (e.target.duration - e.target.currentTime < 0.2 && !e.target.loop) {
            this.mediadone(e);
        }
    }.bind(this));
    addListener(this.element, 'play', this.mediaplaying);
    addListener(this.element, 'playing', this.mediaplaying2.bind(this));


    addListener(this.element, 'loadedmetadata', this.setsize);
    addListener(this.element, 'pause', this.mediapaused);
    if (this.element.readyState > 0)
        this.setsize.call(this.element);
}

MediaPlayer.prototype.mediaError = function (event) {
    var obj = event.currentTarget.objref;

    if(obj.element.src.indexOf('mp4') !== -1) { // tried to an mp4 file and failed
        if (obj.element.canPlayType('video/ogg; codecs="theora, vorbis"') === 'probably') {
            obj.element.src = obj.element.src.replace('mp4', 'ogv');
            return;
        }
    } else if(obj.element.src.indexOf('mp3') !== -1) { // tried to an mp4 file and failed
        if (obj.element.canPlayType('audio/ogg; codecs="vorbis"') === 'probably') {
            obj.element.src = obj.element.src.replace('mp3', 'ogg');
            return;
        }
    }

    obj.errorEvent = event;
    obj.dispatchEvent('error');

    // code is taken from mediadone
    if (obj && obj.done == false) {
        obj.playing = false;
        obj.paused = false;
        obj.done = true;
        obj.element.pause();
        //added to fix problem firefox and ie has with too many audio objects - TM 11/26/2013
        obj.element.removeAttribute('src');
        obj.element.load();

        if (obj.speechTimer)
            obj.speechTimer.stop();
        if (obj.animation)
            obj.animation.goto(obj.defaultPos);
        obj.dispatchEvent('complete');
        obj.dispatchEvent('update'); //added by TJ on 8/27/2013
    }
};

MediaPlayer.prototype.load = function () {
};
MediaPlayer.prototype.initRecording = function () {
};
MediaPlayer.prototype.record = function () {
};
MediaPlayer.prototype.stopRecording = function () {
};
MediaPlayer.prototype.reload = function () {

    if (this.videodiv) {
        if (this.element.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') === 'probably')
            this.element.src = this.url.replace('.flv', '.mp4');
        else if (this.element.canPlayType('video/ogg; codecs="theora, vorbis"') === 'probably')
            this.element.src = this.url.replace('.mp4', '.ogv').replace('.flv', '.ogv');
        else
            this.element.src = this.url.replace('.flv', '.mp4');
    } else {
        if (this.element.canPlayType('audio/mpeg') === 'probably') {
            this.element.src = this.url.replace('.flv', '.mp3');
        }
        else if (this.element.canPlayType('audio/ogg;codecs="vorbis"') === 'probably') {
            this.element.src = this.url.replace('.mp3', '.ogg').replace('.flv', '.ogg');
        }
        else {
            this.element.src = this.url.replace('.flv', '.mp3');
        }
    }
    this.ready = false;
};
MediaPlayer.prototype.setProperty = function (name, value) {
    if (this.element)
        this.element.setAttribute(name, value);
};

//added by TJ on 7/19/2012
MediaPlayer.prototype.loop = function () {
    if (this.element)
        this.element.loop = true;
};

MediaPlayer.prototype.play = function (pos) {
    //MAG 07/02/2014: The following lines allows the user to slide the song and play it from any point he/she wants
    if (!pos && !this.element.currentTime || !pos && this.element.currentTime == 0)
        pos = 0;
    else
        pos = this.element.currentTime;

    if (this.element) {
        //added to fix problem firefox and ie has with too many audio objects - TM 11/26/2013
        if (this.element.src.indexOf('null') != -1 || !this.element.src) {
            this.reload();
        }

        if (!this.ready) {
            this.position = pos;
            this.autostart = true;
            return;
        } else {
            //you can set position until sound is loaded, moved from stop function - TM & MG 11/25/2013
            this.element.currentTime
        }
        this.done = false; //added by TJ on 8/27/2013
        this.paused = false; //added by TJ on 8/27/2013
        this.playing = true; //added by TJ on 8/27/2013
        this.dispatchEvent('update'); //added by TJ on 8/27/2013
        this.element.play(); //modified by TJ on 8/27/2013 // arian - html5 audio does not accept any args

        if (this.animation) {
            if (typeof this.speechTimer !== 'undefined') {
                this.speechTimer.stop();
            }

            this.speechTimer = new EnterFrame(this, this.syncMouth);
        }
    }
};

MediaPlayer.prototype.syncMouth = function (event) {
    if (this.playing && this.animationPos) {
        var frame = Math.floor(this.getPosition() * this.animation.frameRate);
        this.animation.goto(this.animationPos[frame]);
    }
};

MediaPlayer.prototype.pause = function () {
    this.autostart = false;
    if(this.element && !(this.element.src.indexOf('null') != -1 || !this.element.src)) {
        this.element.pause();
        this.paused = true;
        if(this.speechTimer) this.speechTimer.stop();
        if(this.animation) this.animation.goto(this.defaultPos);

        this.playing = false; //added by TJ on 8/27/2013
        this.dispatchEvent('update'); //added by TJ on 8/27/2013
    }
};

MediaPlayer.prototype.stop = function() {
    this.autostart = false;
    if(this.element && (!this.element.src.indexOf('null') !== -1 || this.element.src)) {
        //added by TJ on 12/18/2013, on firefox, audio doesn't stop when remaining audio is short (less than a second)
        if(this.element.readyState > 0) {
            if(this.element.currentTime) {
                this.element.currentTime = 0;
            }
            this.element.pause();
        }

        this.playing = false;
        this.paused = false;
        this.done = true;

        if (this.element.src !== null || this.element.src.indexOf('null') > -1) {
            this.element.removeAttribute('src');
        }

        if(this.speechTimer) this.speechTimer.stop();
        if(this.animation) this.animation.goto(this.defaultPos);

        this.dispatchEvent('update'); //added by TJ on 8/27/2013
    }
};

//11.20.13 dh
MediaPlayer.prototype.close = function (event) {
    if (document.webkitExitFullscreen && BROWSER.indexOf('Chrome') != -1) { //if Chrome, and the video is fullscreen, use default exit fullscreen instead of manually removing the video.
        document.webkitExitFullscreen();
        video_container.style.visibility = "hidden";
    }

    var obj = null;
    if (event) {
        obj = getEventTarget(event).objref;
    }

    if (obj) {
        obj.stop();
        if (obj.element) {
            obj.element.src = '';
            obj.videodiv.style.visibility = "hidden";
            if (obj.element.parentNode)
                obj.element.parentNode.removeChild(obj.element);
            if (obj.closeBtn.parentNode)
                obj.closeBtn.parentNode.removeChild(obj.closeBtn);
        }
    } else {
        this.stop();
        if (this.element) {
            this.element.src = '';
            this.videodiv.style.visibility = "hidden";
            if (this.element.parentNode)
                this.element.parentNode.removeChild(this.element);
            if (this.closeBtn.parentNode)
                this.closeBtn.parentNode.removeChild(this.closeBtn);
        }
    }
};

MediaPlayer.prototype.mute = function () {
};

MediaPlayer.prototype.url = function () {
    return this.url;
};
MediaPlayer.prototype.getPosition = function () {
    if (this.element && !(this.element.src.indexOf('null') != -1 || !this.element.src)) {
        return this.element.currentTime;
    }
    return 0;
};


MediaPlayer.prototype.setPosition = function (pos) {
    if (this.element && !(this.element.src.indexOf('null') != -1 || !this.element.src))
    {
        this.element.currentTime = pos;
    }
};

MediaPlayer.prototype.getDuration = function () {
    if (this.duration != 0)
        return this.duration; //added by TJ on 3/10/2014

    if (this.element && !(this.element.src.indexOf('null') != -1 || !this.element.src)) { // MAG 04/02/2014: Commented out
        if (typeof this.element.duration !== 'number' || !isFinite(this.element.duration)) {
            if (this.length > 0)
                return this.length;
            if (this.length < 0)
                return 0;
            this.length = -1; // set to -1 when waiting for ajax to return
            var objref = this;
            ajax('/html5/xml/get_mp3_length.php', {url: this.url}, function (data) {
                objref.length = data;
            });
        } else {
            return this.element.duration;
        }
    }

    return 0;
};

MediaPlayer.prototype.setVolume = function (vol) {
    if (this.element) {
        this.element.mute = false;
        this.element.volume = vol;
    }
};

MediaPlayer.prototype.mediadone = function (event) {
    var obj = event.currentTarget.objref;

    if (obj && obj.done == false) {
        obj.playing = false;
        obj.paused = false;
        obj.done = true;
        obj.element.pause();
        //added to fix problem firefox and ie has with too many audio objects - TM 11/26/2013
        obj.element.removeAttribute('src');
        obj.element.load();

        if (obj.speechTimer)
            obj.speechTimer.stop();
        if (obj.animation)
            obj.animation.goto(obj.defaultPos);
        obj.dispatchEvent('complete');
        obj.dispatchEvent('update'); //added by TJ on 8/27/2013
    }
};

MediaPlayer.prototype.mediapaused = function (event) {
    var obj = event.currentTarget.objref;
    if (obj) {
        obj.playing = false;
        obj.paused = true;
        if (obj.speechTimer)
            obj.speechTimer.stop();
        if (obj.animation)
            obj.animation.goto(obj.defaultPos);
        obj.dispatchEvent('pause');
    }
};

MediaPlayer.prototype.mediaplaying = function (event) {
    //trace('mediaplaying');
    var obj = event.currentTarget.objref;
    if (obj) {

        if (!obj.sentStart) {
            obj.sentStart = true;

            obj.dispatchEvent('start');
        }
        obj.playing = true;
        obj.paused = false;
        obj.dispatchEvent('play');
    }
};

MediaPlayer.prototype.mediaplaying2 = function (event) {
    this.playing = true;
    this.paused = false;
    this.dispatchEvent('playing');
};


MediaPlayer.prototype.setsize = function (event) {
    var obj = event.currentTarget.objref;
    if (obj && obj.videodiv) {
        obj.ready = true;
        obj.videodiv.style.backgroundColor = '#000000';

        if (obj.element.videoHeight / obj.element.videoWidth != obj.element.offsetHeight / obj.element.offsetWidth) {

            var width = obj.element.offsetHeight * obj.element.videoWidth / obj.element.videoHeight;

            var height = obj.element.offsetWidth * obj.element.videoHeight / obj.element.videoWidth;

            if (width > obj.element.offsetWidth) {
                obj.element.style.width = obj.element.offsetWidth + 'px';
            } else {
                obj.element.style.height = obj.element.offsetHeight + 'px';
            }
        }
        if (obj.autostart) {
            obj.play()
        }

        obj.dispatchEvent('loaded');
    }

    //added by TJ on 7/11/2012
    else if (obj)
    {
        obj.ready = true;
        obj.duration = obj.element.duration; //added by TJ on 3/10/2014
        if (obj.autostart)
            obj.play();
        obj.dispatchEvent('loaded');
    }
};

MediaPlayer.prototype.updatePropertiesFromApp = function () {
};


MediaPlayer.prototype.printFile = function (url) {
    if (navigator.appName.indexOf("Microsoft") != -1)
        var flashprinter = window['flashprinter'];
    else if (document['flashprinter'] && document['flashprinter'].length != undefined)
        flashprinter = document['flashprinter'][1];
    else
        flashprinter = document['flashprinter'];

    try {
        flashprinter.printerCommand('printURL', url);
    } catch (err) {
        trace(err);
    }
};

MediaPlayer.prototype.printHTML = function (html) {
    if (navigator.appName.indexOf("Microsoft") != -1)
        var flashprinter = window['flashprinter'];
    else if (document['flashprinter'] && document['flashprinter'].length != undefined)
        flashprinter = document['flashprinter'][1];
    else
        flashprinter = document['flashprinter'];

    try {
        flashprinter.printerCommand('printHTML', html);
    } catch (err) {
        trace(err);
    }
};

//11.22.13
MediaPlayer.prototype.addCloseButton = function () {
    this.closeBtn = document.createElement("div");
    this.closeBtn.id = 'mp_closeBtn';
    this.closeBtn.objref = this;

    addListener(this.closeBtn, 'click', this.close);

    if (this.videodiv)
        this.videodiv.appendChild(this.closeBtn);
};

MediaPlayer.prototype.activateCloseButton = function () {
    this.addCloseButton();
};

MediaPlayer.prototype.deactivateCloseButton = function () {
    if (this.closeBtn) {
        if (this.videodiv)
            this.videodiv.removeChild(this.closeBtn);
    }
};

enableEventHandling(MediaPlayer);
