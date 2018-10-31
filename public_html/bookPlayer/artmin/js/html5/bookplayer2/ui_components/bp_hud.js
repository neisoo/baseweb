function BPHUD(divElement)
{
	this.divElement = divElement;

	var spinnerElement	     = document.getElementById('loadingSpinner');
	var bookProgressSlider   = document.getElementById('bookProgressSlider');
	var playPauseCheckboxDiv = document.getElementById('playPauseCheckbox');

	this.spinnerLoader 	     = new BPSpinner(spinnerElement);
	this.progressSlider      = new BPSlider(bookProgressSlider);
	this.playPauseCheckbox   = new BPCheckBoxComponent(playPauseCheckboxDiv, BPHUD.prototype.tintProgressBar);
	this.currentTimeContainer	= document.getElementById("progress-currentTime");
	this.totalTimeContainer 	= document.getElementById("progress-totalTime");

	/*
	***
	GetPosition methods is going inside this scope because global scope of this context is not enabled by class structure of this code.
	For this feature we need to be able to acess the progressSlider and there are no means to get this as a global acess scope on this structure, this will always have only metrhods and not properities.
	***
	*/

	this.progressSlider.element.addEventListener("click", function (e) {

		if(isRestarting || book.pageFlipAnimator.isAnimating) //prevents user from clicking on progress bar while restarting
			return;

		if (e != null) {
      		e.stopPropagation();
      		e.preventDefault();
    	}

    	if(e.target.id == "progressCircle")
			return;

		clickedOnProgressBar = true;
		hud.progressSlider.isDragging = true; //workaround for pause after page bug
		book.updatePagesImmediately = true;
		book.stopAllAnimations();
		book.stopEventAnimations();

		window.setTimeout(function () {
			hud.progressSlider.isDragging = false;
			var bookCurrentTime;
			clickedOnProgressBar = false;
			if(book.audioProgress.isUsingSlowAudio){
		      bookCurrentTime = hud.progressSlider.progress * book.audioProgress.getSlowAudioDuration();
		    }else{
		      bookCurrentTime = hud.progressSlider.progress*book.audioProgress.soundPlayer.getDuration();
		    }
		    if(book.currentLeftPage)
				book.currentLeftPage.pauseAnimations();
			if(book.currentRightPage)
				book.currentRightPage.pauseAnimations();
			book.updatePagesImmediately = false;
			book.removeAllAnimations();
			book.updatePages(book.audioProgress.audioPosition);
			//var fakeSender = {"progress" : hud.progressSlider.progress};
			hud.progressSlider.updateForeground(hud.progressSlider.progress);
		}, 10);
		book.removeAllAnimations();
		hud.moveSlider(e);
	});

}

BPHUD.prototype.moveSlider = function(e) {

	if(e){
		e.preventDefault();
		e.stopPropagation();
	}

	if(e.target.id == "progressCircle")
		return;

	var X = e.offsetX; //;
	var W = hud.progressSlider.max;
	var pos = X/W;

	if(pos < 0.002 || pos > 1.03)
		return;

	if(pos <= 0.002)
		pos = 0

	if(pos >= 1)
		pos = 1

	if(isRestarting)
		return;
	if(book.isPlaying) //prevents book from playing while user is dragging slider.
		book.pause();

	closeSettingsBox();

	book.disablePageFlip = true;
	book.removeAllAnimations();
	hud.playPauseCheckbox.setIsChecked(false);
	var fakeSender = {"progress" : pos}
	hud.progressSlider.forceSliderProgress(pos);
	onSliderProgressChange( fakeSender );

	book.removeAllAnimations();
    if(book.currentRightPage){
      book.currentRightPage.showAnimations();
    }
    if(book.currentLeftPage){
      book.currentLeftPage.showAnimations();
    }

}

BPHUD.prototype.showHud = function(event)
{
	this.divElement.className = "unselectable";
	bookDiv.className = bookDiv.className.replace(" resizedBook", "");
	BPHUD.prototype.showAnimationHud();
};

BPHUD.prototype.hideHud = function () {
	closeSettingsBox();
		BPHUD.prototype.hideAnimationHud();
	this.divElement.className = "unselectable hide"; //add class "resizedBook" to #bookContainer

setTimeout(function(){
	if(bookDiv.className.indexOf("resizedBook") == -1 )
		bookDiv.className += " resizedBook";
	},65);

}

BPHUD.prototype.hideShow = function(event)
{
	event.stopPropagation();
	event.preventDefault();

	if(bookDiv.className.indexOf("bookResizeTransition") == -1) //adds transition time to book container.
		bookDiv.className += " bookResizeTransition";
	if(this.divElement.className == "unselectable hide"){
		this.showHud();
	}else{
		this.hideHud();
	}
};

BPHUD.prototype.showAnimationHud = function()
{
	var bg0 = document.getElementById('background_fill_0');
	var bg1 = document.getElementById('background_fill_1');
	var bg2 = document.getElementById('background_fill_2');
	var currentTimeContainer	= document.getElementById("progress-currentTime");
	var totalTimeContainer 	= document.getElementById("progress-totalTime");
	setTimeout(function(){
		bg0.className = " backgroundForegroundAnimation";
		bg1.className = " backgroundForegroundAnimation";
		bg2.className = " backgroundForegroundAnimation";
		currentTimeContainer.className = "progressTime init opacityControl";
		totalTimeContainer.className = "progressTime fim opacityControl";
	}, 750);
}

BPHUD.prototype.hideAnimationHud = function()
{
		var bg0 = document.getElementById('background_fill_0');
		var bg1 = document.getElementById('background_fill_1');
		var bg2 = document.getElementById('background_fill_2');
		var currentTimeContainer	= document.getElementById("progress-currentTime");
		var totalTimeContainer 	= document.getElementById("progress-totalTime");
		setTimeout(function(){
			bg0.className = "";
			bg1.className = "";
			bg2.className = "";
			currentTimeContainer.className = "progressTime init";
			totalTimeContainer.className = "progressTime fim";
		}, 1500);
}

BPHUD.prototype.showHUD = function()
{
	this.divElement.style.display = 'inherit';
};

BPHUD.prototype.hideHUD = function()
{
	this.divElement.style.display = 'active';
};

BPHUD.prototype.updateProgressTime = function (_intCurrentTime, _intTotalTime) {

	var targetAudio = book.audioProgress.isUsingSlowAudio ? book.audioProgress.slowSoundPlayer.audioBook.element : book.audioProgress.currentSoundPlayer.audioBook.element;

	if(parseInt(_intCurrentTime, 10) > parseInt(_intTotalTime, 10))
		_intCurrentTime = _intTotalTime;

	this.currentTimeContainer.innerHTML = this.convertTime(_intCurrentTime);
	this.totalTimeContainer.innerHTML = this.convertTime(_intTotalTime);
}

BPHUD.prototype.convertTime = function (time) {
	var sec_num = parseInt(time, 10);
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);
	if (seconds < 10) {seconds = "0"+seconds;}
	var time = minutes+':'+seconds;
	return time;
}

BPHUD.prototype.tintProgressBar = function(isPaused)
{
	barForegound = document.getElementById('foreground-fill');
	barBackground = document.getElementById('background_fill_2');
	if(isPaused){
		barForegound.style.backgroundColor = '#0052a5';
		barBackground.style.backgroundColor = '#007eff';
	}else{
		barForegound.style.backgroundColor = '#007eff';
		barBackground.style.backgroundColor = '#0052a5';
	}
}
