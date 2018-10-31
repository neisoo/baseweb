function BPAudioProgress()
{
  var slowFile = BookJSON.getInstance().getBookSndSlowfile();
	this.soundJSONInfo 		   = BookJSON.getInstance().getBookSnd();
	this.soundPlayer 		   = new BPSoundPlayer(BookJSON.getInstance().getBookSndFilename());
	this.hasSlowAudio 		   = slowFile != "";
	this.slowSoundPlayer       =  this.hasSlowAudio ?  new BPSoundPlayer(slowFile) : null;
	this.secondarySoundPlayer  = this.slowSoundPlayer;
	this.currentSoundPlayer    = this.soundPlayer;
	this.pagebreaks 		   = BookJSON.getInstance().getBookSndPageBreaks();
	this.totalPages 		   = 0;
	this.currentPageBreakIndex = 0;
	this.isAudioProgressLoaded = false;
	this.onProgress			   = null;
	this.onEndProgress		   = null;
	this.progress 			   = 0;
	this.audioPosition		   = 0;
	this.playbackCompleted     = false;
	this.isPlaying			   = false;
	this.isUsingSlowAudio      = false;
	this.soundDuration		   = 0;

	this.onCurrentPagesFinalPositionExceeded   = null;
	this.onCurrentPagesInitialPositionExceeded = null;
}

/* Load the normal audio*/
BPAudioProgress.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback = onLoadingCompleteCallback;

	var context = this;

	this.soundPlayer.load( function(sender) {context.onAudioLoadingComplete(sender)});
};

/* When the normal audio was loaded, the slow audio will start to load */
BPAudioProgress.prototype.onAudioLoadingComplete = function(sender)
{
	var context = this;
	var audioDuration = this.soundPlayer.getDuration();

	for(var i = 0; i<this.pagebreaks.length; i++){
		if(parseFloat(this.pagebreaks[i]) > audioDuration)
			this.pagebreaks[i] = (audioDuration -0.1).toString();
		if(parseFloat(this.pagebreaks[i]) <= 0)
			this.pagebreaks[i] = (0).toString();
	}

	if(this.hasSlowAudio)
		this.slowSoundPlayer.load( function(sender) { context.onSlowAudioLoadingComplete(sender) });
	else
		context.onSlowAudioLoadingComplete(sender);
};

BPAudioProgress.prototype.onIEAudioLoad = function()
{
	this.pagebreaks.length = 0;
	this.pagebreaks 		   = BookJSON.getInstance().getBookSndPageBreaks();

	var audioDuration = this.soundPlayer.getDuration();

	for(var i = 0; i<this.pagebreaks.length; i++){
		if(parseFloat(this.pagebreaks[i]) > audioDuration)
			this.pagebreaks[i] = (audioDuration -0.1).toString();
		if(parseFloat(this.pagebreaks[i]) <= 0)
			this.pagebreaks[i] = (0).toString();
	}
};

BPAudioProgress.prototype.resetAudioPosition = function(){
	this.soundPlayer.setPosition(0);
	setElementTime(this.soundPlayer.audioBook.element, 0);
	this.soundPlayer.updateAudioPositionCalculationVariables();
	this.slowSoundPlayer.setPosition(0);
	setElementTime(this.slowSoundPlayer.audioBook.element, 0);
	this.slowSoundPlayer.updateAudioPositionCalculationVariables();
	this.secondarySoundPlayer.setPosition(0);
	setElementTime(this.secondarySoundPlayer.audioBook.element, 0);
	this.secondarySoundPlayer.updateAudioPositionCalculationVariables();
	this.currentSoundPlayer.setPosition(0);
	setElementTime(this.currentSoundPlayer.audioBook.element, 0);
	this.currentSoundPlayer.updateAudioPositionCalculationVariables();
	this.updateProgress(0);
	this.progress	= 0;
	this.audioPosition	= 0;
	this.playbackCompleted = false;
};

/* When the slow audio was loaded, report both normal and slow audios are ready */
BPAudioProgress.prototype.onSlowAudioLoadingComplete = function(sender)
{
	this.isAudioProgressLoaded 	= true;
	this.setCurrentIndexPageBreakIndex(this.currentPageBreakIndex, false);
	this.onLoadingCompleteCallback(this);
};

BPAudioProgress.prototype.getSoundDuration = function() {
	if (this.soundDuration == 0) {
		this.soundDuration = this.soundPlayer.getDuration();
		return this.soundDuration;
	} else {
		return this.soundDuration;
	}
};

BPAudioProgress.prototype.play = function()
{
	this.currentSoundPlayer.playAudio();
	this.isPlaying = true;

};

BPAudioProgress.prototype.pause = function()
{
    this.currentSoundPlayer.pauseAudio();
    this.isPlaying = false;
};

BPAudioProgress.prototype.stop = function()
{
	this.currentSoundPlayer.stopAudio();
	this.isPlaying = false;
};

/* This method is called while the user is moving the slider*/
BPAudioProgress.prototype.updateProgress = function(progress) //value between 0 , 1
{
	this.progress      = progress;
	this.audioPosition = progress * this.getSoundDuration();

	for(var i = 0; i<book.pages.length; i++){
		this.checkForBreakPositions()
	}//Update page positions, rewind to new progress

	this.setAudioPosition(this.audioPosition);
};


BPAudioProgress.prototype.update = function()
{
	if(this.isPlaying)
	{
		this.audioPosition = this.getAudioPosition();
		this.progress      = this.audioPosition / this.getSoundDuration();

		this.checkForPlaybackCompleted();

		if(this.playbackCompleted)
			return;

		this.checkForBreakPositions();

		if(this.onProgress != null)
			this.onProgress(this);
	}

	/* When user taps Home button in his device and he restarts the app he will hear the normal audio and slow audio play at the same time.
	 Therefore, this workaround will fix that problem, because the secondary audio (normal or slow ) will pause while
	 the current audio (normal or slow) is playing.
	 */
	if(this.hasSlowAudio && this.slowSoundPlayer.isPlaying)
		this.secondarySoundPlayer.pauseAudio();
};

/* Check if the current audio finished*/
BPAudioProgress.prototype.checkForPlaybackCompleted = function()
{
	if(this.progress >= BookConstants.BOOK_AUDIO_MAX_PROGRESS)
    {
    	return;
    	if(!this.playbackCompleted)
    	{
			this.isPlaying = false;
    		if(this.onEndProgress != null){
    			this.onEndProgress(this);
    		}

    		this.playbackCompleted = true;
    	}
    }
    else
    	this.playbackCompleted = false;
};

BPAudioProgress.prototype.finishedAudio = function () {
	pause();
	if(!this.playbackCompleted)
	{
		this.isPlaying = false;
		if(this.onEndProgress != null){
			this.onEndProgress(this);
		}

		this.playbackCompleted = true;
	}
};

/* Report if the book needs to go to the next/previous page */
BPAudioProgress.prototype.checkForBreakPositions = function()
{

	if(this.audioPosition > this.finalBreakPosition)
	{
		if(this.onCurrentPagesFinalPositionExceeded)
			this.onCurrentPagesFinalPositionExceeded(this);

		return true;
	}

	if(this.audioPosition  < this.initialBreakPosition - 1)//Using approximately to fix floating precision issues
	{
		if(this.onCurrentPagesInitialPositionExceeded)
			this.onCurrentPagesInitialPositionExceeded(this);

		return true;
	}

	return false;
};

BPAudioProgress.prototype.goToNextPages = function(forceAudioPositionUpdate)
{
	var nextPageBreakIndex = this.currentPageBreakIndex + 1;

	if(nextPageBreakIndex <= (this.totalPages/2))
		this.setCurrentIndexPageBreakIndex(nextPageBreakIndex, forceAudioPositionUpdate);
};

BPAudioProgress.prototype.goToPreviousPages = function(forceAudioPositionUpdate)
{
	var previousPageBreakIndex = this.currentPageBreakIndex - 1;

	if(previousPageBreakIndex > -1)
		this.setCurrentIndexPageBreakIndex(previousPageBreakIndex, forceAudioPositionUpdate);
};

BPAudioProgress.prototype.getNextBreakPosition = function()
{
	var index    = this.currentPageBreakIndex;
	var position = index > (this.totalPages/2) - 1 ? Number.MAX_VALUE : parseFloat(this.pagebreaks[index]);
	return position;
};

BPAudioProgress.prototype.getPreviousBreakPosition = function()
{
	var index    = this.currentPageBreakIndex - 2;
	var position = index < 0 ? 0 : parseFloat(this.pagebreaks[index]);
	return position;
};

BPAudioProgress.prototype.setCurrentIndexPageBreakIndex = function(index, forceAudioPositionUpdate)
{
	var previousIndex 		   = index - 1;
	this.initialBreakPosition  = previousIndex < 0 					? 0.01 			   : parseFloat(this.pagebreaks[previousIndex]);
	this.finalBreakPosition    = index > (this.totalPages/2) - 1 ? Number.MAX_VALUE : parseFloat(this.pagebreaks[index]);
	this.currentPageBreakIndex = index;

	this.restartCurrentPagesAudioPosition(forceAudioPositionUpdate);
};

BPAudioProgress.prototype.getSpecialFinalBreak = function()
{
	var index = (this.totalPages / 2) - 1;
	return (parseFloat(this.pagebreaks[index]) + 0.2);
};

BPAudioProgress.prototype.restartCurrentPagesAudioPosition = function(force)
{
	if(force)
	{
		this.setAudioPosition(this.initialBreakPosition);
	}
};

BPAudioProgress.prototype.getAudioPosition = function()
{
	if(this.isUsingSlowAudio)
	{
		var slowAudioProgress = this.slowSoundPlayer.getPosition() / this.getSlowAudioDuration();

		return slowAudioProgress * this.getSoundDuration();
	}
	else
		return this.soundPlayer.getPosition();
};

BPAudioProgress.prototype.setAudioPosition = function(position)
{
	if(this.isUsingSlowAudio)
	{
		var audioProgress = position / this.getSoundDuration();
		this.slowSoundPlayer.setPosition(audioProgress * this.getSlowAudioDuration());
	}
	else{
		this.soundPlayer.setPosition(position);
	}
};

BPAudioProgress.prototype.getSlowAudioDuration = function()
{
	if(BookConstants.USE_SLOW_AUDIO_DURATION_PERCENTAGE_ENABLED)
		return this.getSoundDuration() * BookConstants.SLOW_AUDIO_DURATION_PERCENTAGE;
	else
		return this.slowSoundPlayer.getDuration();
};

BPAudioProgress.prototype.useSlowAudio = function(value)
{
	if(this.isUsingSlowAudio != value)
	{
		var position 		  = this.getAudioPosition();
		this.isUsingSlowAudio = value;

		if(this.isUsingSlowAudio)
		{
			this.currentSoundPlayer = this.slowSoundPlayer;
			this.secondarySoundPlayer = this.soundPlayer;

			if(this.soundPlayer.isPlaying)
				this.currentSoundPlayer.playAudio();
			else
				this.currentSoundPlayer.pauseAudio();

			this.soundPlayer.pauseAudio();
		}
		else
		{
			this.currentSoundPlayer = this.soundPlayer;
			this.secondarySoundPlayer = this.slowSoundPlayer;

			if(this.slowSoundPlayer.isPlaying)
				this.currentSoundPlayer.playAudio();
			else
				this.currentSoundPlayer.pauseAudio();

			this.slowSoundPlayer.pauseAudio();
		}

		this.setAudioPosition(position);
	}
};
