function BPSoundPlayer(soundFileName)
{
	this.audioBook  		       = null;
	this.isAudioLoaded 		   	   = false;
	this.onLoadingCompleteCallback = null;
	this.isPlaying				   = false;
	this.isAutoplaySupported	   = true;
	this.isCompleted			   = false;
	this.onAudioCompleteCallBack   = null;
	this.soundPath 				   = BookUtils.instance.getBookAssetPath(soundFileName);
	this.currentAudioBookPosition  = 0.00;


	// QACN-4513, QACN-4684, QACN-4685: For the following CIDs, there is a problem
	// with the low-res book audio's reported length in Safari and IE 11, causing
	// a variety of  issues. As a workaround, replace with high-res audio.
	var specialCIDs = [8255, 8340, 15977];
	// Note: CID and bookAssetsRootPath are global variables.
	if (specialCIDs.indexOf(CID) > -1 && /\bartmin\b/.test(bookAssetsRootPath)) {
		this.soundPath = this.soundPath.replace(/\bartmin\b/, 'artwork');
	}
}

BPSoundPlayer.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback = onLoadingCompleteCallback;

	var context    = this;

  this.setAudioFileType({
    path: this.soundPath,
    fileType: 'm4a',
    browsers: ['safari', 'chrome', 'IE'],
		mobile: {
			isAndroid: function() {
					return navigator.userAgent.match(/Android/i);
			},
			isBlackBerry: function() {
					return navigator.userAgent.match(/BlackBerry/i);
			},
			isIos: function() {
					return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			isOpera: function() {
					return navigator.userAgent.match(/Opera Mini/i);
			},
			isWindows: function() {
					return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
			},
			isMobile: function() {
					return (this.isAndroid() || this.isBlackBerry() || this.isIos() || this.isOpera() || this.isWindows());
			}
		}
  });

	this.audioBook = SoundControl.addContentSound(this.soundPath,{autostart:false, removeSrc:true, loop:false});
	this.audioBook.element.preload = 'metadata';

	addListener(context.audioBook, 'loaded', function loadedAudioBook(){
		context.onAudioLoaded();
	});

	this.audioBook.autostart = false;
	this.overWriteMediaDone();
};

BPSoundPlayer.prototype.addCompletedListener = function addCompletedListener(){
	addListener(this.audioBook, 'complete', function(){
		var	trackerProgress = mediaProgressTracker.getCompletedPercentage() +
		slowMediaProgressTracker.getCompletedPercentage();

		if(mediaProgressTracker != null && slowMediaProgressTracker != null && trackerProgress >= .8){
			bookTicketMachine.openTicketMachine();
		}
	});
};
/*
 * In MediaPlayer class when the audio is done, the method "mediadone" removes the scr from audio element,
 * this causes problem when user is moving the slider, for that reason this method(mediadone) is overwritten
 * only for both normal and slow audios.
*/
BPSoundPlayer.prototype.overWriteMediaDone = function()
{
	var context = this;
	this.audioBook.mediadone = null;
	this.audioBook.mediadone = function (event) { //overwriting media done to prevent audio reseting.
		if(book.audioProgress.onEndProgress != null)
			book.audioProgress.onEndProgress(book.audioProgress);

		book.audioProgress.playbackCompleted = true;

		book.audioProgress.finishedAudio();
	    return;
	};
};

/*
 * @param {Object} pathConfig
 */
BPSoundPlayer.prototype.setAudioFileType = function setAudioFileType(pathConfig) {
  if (typeof pathConfig.path !== 'undefined' && typeof pathConfig.fileType !== 'undefined') {
    if (pathConfig.mobile && pathConfig.mobile.isMobile()) {
      this.soundPath = pathConfig.path.replace(/mp4/i, 'mp3');
    } else {
      function isIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');
        var edge = ua.indexOf('Edge/');
        if (msie > -1 || trident > -1 || edge > -1) {
          return true;
        }
        return false;
      }
      for (var i = 0; i < pathConfig.browsers.length; i++) {
        if (window[pathConfig.browsers[i]] || isIE()) {
          break;
        }
      }
    }
  }else {
    throw new Error('The supplied information for the setAudioFileType method of BPSoundPlayer is not valid');
  }
}

BPSoundPlayer.prototype.onAudioLoaded = function()
{
	this.isAudioLoaded = true;
	if(this.onLoadingCompleteCallback!=null)
	{
		this.onLoadingCompleteCallback(this);
		this.onLoadingCompleteCallback = null;

	}
};

BPSoundPlayer.prototype.onIEAudioLoaded = function()
{
 	this.audioBook.onIEAudioLoad();
};

BPSoundPlayer.prototype.playAudio = function()
{
	this.audioBook.play();
	this.isPlaying = true;

	if(BookConstants.CALCULATE_AUDIO_POSITION)
		this.updateAudioPositionCalculationVariables();
};

BPSoundPlayer.prototype.stopAudio = function()
{
	this.audioBook.stop();
	this.isPlaying = false;
};

BPSoundPlayer.prototype.pauseAudio = function()
{
	this.audioBook.pause();
	this.isPlaying = false;
};

BPSoundPlayer.prototype.getPosition = function()
{
	this.currentAudioBookPosition = parseFloat(this.audioBook.getPosition());
	if(BookConstants.CALCULATE_AUDIO_POSITION /*&& this.isPlaying*/)
		return this.calculateAudioPosition();

	return this.currentAudioBookPosition;
};

BPSoundPlayer.prototype.setPosition = function(position)
{
	this.audioBook.setPosition(position);

	if(BookConstants.CALCULATE_AUDIO_POSITION)
		this.updateAudioPositionCalculationVariables();

};

BPSoundPlayer.prototype.getDuration = function()
{
	// CS-1164: Change Math.round to Math.floor to avoid the calculated duration
	// exceeding the maximum audioPosition property of BPAudioProgress, but
	// not sure why it had to be rounded in the first place.
	return Math.floor(this.audioBook.getDuration());
};

BPSoundPlayer.prototype.updateAudioPositionCalculationVariables = function()
{
	this.playTime     = Date.now();
	this.currentAudioBookPosition = parseFloat(this.audioBook.getPosition());
	this.playPosition = this.currentAudioBookPosition;
};

BPSoundPlayer.prototype.calculateAudioPosition = function()
{
	var audioPosition = this.playPosition + ((Date.now() - this.playTime) / 1000);
	var realPosition  = this.currentAudioBookPosition;

	if(realPosition == 0 || !BookUtils.instance.approximately(audioPosition, realPosition, 0.01))
	{
		this.updateAudioPositionCalculationVariables();//Update the position calculation variables if necessary

		return realPosition;
	}

	return audioPosition;
};
