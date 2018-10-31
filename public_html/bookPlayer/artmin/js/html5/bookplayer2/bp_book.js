function BPBook( divLeftPage, divRightPage, centerShadow, pageFlipLeftPageCanvas, pageFlipRightPageCanvas, centerShadowFlipAnimation, borderShadowFlipAnimation, reflectionLightFlipAnimation, leftCoverDiv, rightCoverDiv){
	this.LeftPageDiv		   = divLeftPage;
	this.rightPageDiv		   = divRightPage;
	this.leftPageCanvas	  	   = document.getElementById("leftPageDivCanvas"); // leftPageCanvas;
	this.rightPageCanvas  	   = document.getElementById("rightPageDivCanvas");  //rightPageCanvas;
	this.centerShadow 		   = centerShadow;
	this.leftCoverDiv		   = leftCoverDiv; //QAV-4334
	this.rightCoverDiv		   = rightCoverDiv;
	this.leftCoverCanvas	   = document.getElementById("leftCoverDivCanvas");
	this.rightCoverCanvas	   = document.getElementById("rightCoverDivCanvas");

	this.temporalLeftIndex = 0;
	this.temporalRightIndex = 0;

	this.disablePageFlip	   = false;
	this.currentLeftPageIndex  = -1;
	this.currentLeftPage       = null;
	this.currentRightPage      = null;
	this.pages 			  	   = new Array();
	this.animations		  	   = new Array();
	this.animationsForCancel   = new Array();
	this.totalPages 		   = null;
	this.isPlaying			   = false;
	this.updateMethod          = null;

	this.coverColor			   = "#FFFFFF";
	this.pageColor			   = "#FFFFFF";

	this.pageFlipAnimator 	= new BPPageFlipAnimator(this, pageFlipLeftPageCanvas, pageFlipRightPageCanvas, centerShadowFlipAnimation, borderShadowFlipAnimation, reflectionLightFlipAnimation);
	this.audioProgress 		= new BPAudioProgress();
	this.generalUI 			= new BPGeneralUILoader();

	this.currentPageFlip	= "NONE"; //"OPEN_FRONT", "CLOSE_FRONT", "CLOSE_BACK", "OPEN_BACK";

	this.isDraggingSlider = false;

	var context = this;
	this.pageFlipAnimator.setBookPagesCallBack = function(){context.setCurrentPages();};
	this.initializePages();

	this.preRenderCenterShadowsGradients();
	this.isMouseUpEvent = false;
	this.hasCanceledPageFlip = false;
	this.progressBeforePageflip = 0.0;

	//for correctly managing animations
	this.allAnimations = [];
}

BPBook.prototype.initializePages = function()
{
	var context = this;
	var pagesJSONInfo = BookJSON.getInstance().getPages();
  if (isNaN(bookJSON.book_color) && bookJSON.book_color.toUpperCase() === 'FFFFFF') {
    this.coverColor = 'BAE9FF';
  } else if (!isNaN(bookJSON.book_color)) {
    this.coverColor = '' + bookJSON.book_color;
  } else {
    this.coverColor = bookJSON.book_color;
  }
	this.pageColor = bookJSON.book_color;

	var pageIndex = 0;

	for(var i = 0; i < pagesJSONInfo.length; i++){
		var newPage = new BPPage(pagesJSONInfo[i], this);
		newPage.pageIndex = pageIndex;
		this.pages.push(newPage);
		newPage.onPauseAnimationCallBack = function(){ context.pauseAnimations(); };
		pageIndex++;
	}
	this.totalPages = this.pages.length;
	if(!BookJSON.getInstance().getBackCoverEnabled()){
		var newPage = new BPPage(null, this);
		newPage.pageIndex = pageIndex;
		this.pages.push(newPage);
	}

	this.pages[0].isCoverPage       			  		= true;
	this.pages[this.pages.length - 1].isCoverPage 		= true;
	this.pages[this.pages.length - 2].islastBeforeCover = true;
	this.pages[1].isInsideCoverPage 			  		= true;
	this.pages[this.pages.length - 2].isInsideCoverPage = true;
	this.pages[1].renderUserName				  		= true;

	this.audioProgress.totalPages = this.pages.length;
};

BPBook.prototype.renderCover = function (isRightCover) {
  var canvas = isRightCover ? this.rightCoverCanvas : this.leftCoverCanvas;
  var ctx = canvas.getContext("2d");
  var image = isRightCover ? book.generalUI.coverBackgroundImage : book.generalUI.coverBackgroundImageFlipped;

  var xCoverDiff = isRightCover ? 2 : -7 ;
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.drawImage(image, 10+xCoverDiff, 9, 392, 540);
};

BPBook.prototype.hideBookAnimations = function () {
	if(hasCanceled)
		this.animations = this.animationsForCancel;

	for(i = 0; i<this.animations.length; i++){
		this.animations[i].hideAnimation();
	}
	this.animationsForCancel = this.animations; //store array in case of cncel
	this.animations = new Array(); //clearing array.
};

BPBook.prototype.renderCenter = function () {
	var centerImage = book.generalUI.coverBackgroundImageCenter;
	var centerImageW = 30;
	var centerImageH = 551;
	var ctxC = centerCoverBackgroundCanvas.getContext("2d");
	centerCoverBackground.style.background = "url("+book.generalUI.coverBackgroundImageCenter.src+") ";
};

BPBook.prototype.updateCoverPosition = function () {

	divLeftPageCanvas.className = "containerLeft";
	divRightPageCanvas.className = "containerRight";

	var rangeCover = 10;
	var l = this.pages.length/rangeCover;
	bookMoveLeft = 0.0+(this.temporalLeftIndex/l);
	bookMoveRight = rangeCover/2 - (this.temporalLeftIndex/l);
};



BPBook.prototype.updateCenterCover = function (_currentStatus) {

	book.rightCoverDiv.style.display = "none";
	book.leftCoverDiv.style.display = "none";

	switch(_currentStatus){
		case "CLOSE_FRONT":
			this.rightCoverDiv.style.display = "block";
			this.LeftPageDiv.style.top = "-10px";
			this.LeftPageDiv.style.left = "380px";
			this.rightPageDiv.style.top = "-10px";
			leftBottomBorder.style.display = "none";
			leftSideBorder.style.display = "none";
			this.centerShadow.style.opacity = 0;
			//if(book.isDraggingSlider) //sets cover transform correctly
				this.setCoverCenterClosedFront(0.0);
			break;
		case "CLOSE_BACK":
			this.leftCoverDiv.style.display = "block";
			this.rightPageDiv.style.left = "398px";
			this.rightPageDiv.style.top = "-10px";
			this.LeftPageDiv.style.top = "-10px";
			this.LeftPageDiv.style.zIndex = "2";
			rightBottomBorder.style.display = "none";
			rightSideBorder.style.display = "none";
			this.centerShadow.style.opacity = 0;
			//if(book.isDraggingSlider) //sets cover transform correctly
				this.setCoverCenterClosedBack(1);
			break;
		case "OPEN_FRONT":
			this.LeftPageDiv.style.top = "-10px";
			this.rightPageDiv.style.top = "-10px";
			this.leftCoverDiv.style.top = "-10px";
			this.rightCoverDiv.style.top = "0px";
			this.LeftPageDiv.style.left = "0px";
			this.rightCoverDiv.style.left = "398px";
			leftBottomBorder.style.display = "block";
			leftSideBorder.style.display = "block";
			rightBottomBorder.style.display = "block";
			rightSideBorder.style.display = "block";
			BookUtils.instance.applyTrasformFinishCoverElement(this.leftCoverDiv,-2);
			BookUtils.instance.applyTrasformFinishCoverElement(this.LeftPageDiv,-2);
			book.rightCoverDiv.style.display = "block";
			book.leftCoverDiv.style.display = "block";
			BookUtils.instance.applyTrasformCoverCenterElement(centerCoverBackgroundCanvas,"FirstBeforeCover",1,BookConstants.SKEW_FACTOR_CENTER);
			BookUtils.instance.applyTrasformCoverCenterElement(centerCoverBackgroundShadowCanvas,"FirstBeforeCover",1,BookConstants.SKEW_FACTOR_CENTER_SHADOW);
			this.centerShadow.style.opacity = 0.30;
			this.setCoverCenterOpen();
			updatePageWeight();
			book.pageFlipAnimator.bottomRightShadow.style.height = BookConstants.FACTOR_HEIGHT + 530 + "px";
			break;
		case "OPEN_BACK":
			this.LeftPageDiv.style.top = "-10px";
			this.rightPageDiv.style.top = "-10px";
			this.rightCoverDiv.style.top = "-10px";
			this.leftCoverDiv.style.top = "0px";
			this.leftCoverDiv.style.zIndex = "0";
			this.LeftPageDiv.style.left = "0px";
			this.rightCoverDiv.style.left = "398px";
			leftBottomBorder.style.display = "block";
			leftSideBorder.style.display = "block";
			rightBottomBorder.style.display = "block";
			rightSideBorder.style.display = "block";
			BookUtils.instance.applyTrasformFinishCoverElement(this.rightCoverDiv,2);
			BookUtils.instance.applyTrasformFinishCoverElement(this.rightPageDiv,2);
			book.leftCoverDiv.style.display = "block";
			book.rightCoverDiv.style.display = "block";
			BookUtils.instance.applyTrasformCoverCenterElement(centerCoverBackgroundCanvas,"LastBeforeCover",1,BookConstants.SKEW_FACTOR_CENTER);
			BookUtils.instance.applyTrasformCoverCenterElement(centerCoverBackgroundShadowCanvas,"LastBeforeCover",1,BookConstants.SKEW_FACTOR_CENTER_SHADOW);
			this.centerShadow.style.opacity = 0.30;
			this.setCoverCenterOpen();
			updatePageWeight();
			break;
		default:
			book.rightCoverDiv.style.display = "block";
			book.leftCoverDiv.style.display = "block";
			this.leftCoverDiv.style.zIndex = "0";
			this.rightCoverDiv.style.zIndex = "0";
			this.rightCoverDiv.style.left = "398px";
			this.LeftPageDiv.style.left = "0px";
			leftBottomBorder.style.display = "block";
			leftSideBorder.style.display = "block";
			rightBottomBorder.style.display = "block";
			rightSideBorder.style.display = "block";
			this.centerShadow.style.opacity = 0.30;
			this.setCoverCenterOpen();
			updatePageWeight();
			break;
	}
};



BPBook.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback = onLoadingCompleteCallback;
	this.loadedPagesCount 		   = 0;
	var context 	 	  		   = this;

	this.generalUI.load(function(sender){
    context.onGeneralUILoadingComplete(sender);
  });
	this.audioProgress.load(function(sender){
    context.onAudioLoadingComplete(sender);
  });

	for(var i = 0; i < this.pages.length; i++)
		this.pages[i].load(function(sender) {
      context.onPageLoadingComplete(sender);
    });

	this.updateMethod = function() {
    context.onInterval();
  };
	setInterval(this.updateMethod, 1000/45);//removing change to 10 FPS
};

BPBook.prototype.onAnimationFrame = function()
{
};

BPBook.prototype.onInterval = function()
{
	this.update();
};

BPBook.prototype.setBookContainerPosition = function (_pos) { //pos is an int in pixels.
	bookDiv.style.left =  _pos + "px";
};

BPBook.prototype.update = function()
{
	if(this.isPlaying)
	{
		this.audioProgress.update();
		book.hasCanceledPageFlip = false;
		//sync book position
		if(book.isDraggingSlider){
			if(currentTime < book.pages[book.pages.length-2].pageJSONInfo.breakpos && currentTime > book.pages[0].pageJSONInfo.breakpos)
				book.forceOpenedPosition();
		} else {
			var currentTime;
			if(this.audioProgress.isUsingSlowAudio){
				hud.updateProgressTime(this.audioProgress.progress * this.audioProgress.getSlowAudioDuration() , this.audioProgress.getSlowAudioDuration()- 1);
				currentTime = this.audioProgress.progress * this.audioProgress.getSlowAudioDuration();
			}else{
				hud.updateProgressTime(this.audioProgress.audioPosition, this.audioProgress.soundPlayer.getDuration() - 1);
				currentTime = this.audioProgress.audioPosition;
			}
		}

		this.updatePages(this.audioProgress.audioPosition);

		/*
		 *this is to sync the book with the audio
		 */
		var index = this.audioProgress.currentPageBreakIndex * 2;
		if(!BookUtils.instance.approximately(index, this.currentLeftPageIndex + 1, 2))
		{
			this.goToPages( index - 1, index );
		}
	}
	this.pageFlipAnimator.update();//Must be updated always

};

BPBook.prototype.onAudioLoadingComplete = function()
{
	this.checkForLoadingCompleted();
};

BPBook.prototype.onPageLoadingComplete = function()
{
	this.loadedPagesCount++;
	this.checkForLoadingCompleted();
};

BPBook.prototype.onGeneralUILoadingComplete = function()
{
	this.checkForLoadingCompleted();
};

BPBook.prototype.checkForLoadingCompleted = function()
{
	if(this.loadedPagesCount == this.pages.length && this.audioProgress.isAudioProgressLoaded && this.generalUI.isGeneralUILoaded)
	{
		this.goToPage(-1);
		this.onLoadingCompleteCallback(this);
	}
};

BPBook.prototype.play = function()
{
	if(!this.isPlaying)
	{
		book.stopEventAnimations();
		book.stopAllAnimations();

		this.audioProgress.play();

		if(this.currentRightPage != null){
			this.currentRightPage.playAnimations();
			this.currentRightPage.removeOnClickAnimation();
		}

		if(this.currentLeftPage != null){
			this.currentLeftPage.playAnimations();
			this.currentLeftPage.removeOnClickAnimation();
		}

		this.isPlaying = true;
	}
};

BPBook.prototype.leftPageHasAnimation = function () {
	if (this.currentLeftPage == null)
		return false;
	return this.currentLeftPage.hasAnimation();
};

BPBook.prototype.rightPageHasAnimation = function () {
	if (this.currentRightPage == null)
		return false;
	return this.currentRightPage.hasAnimation();
};

BPBook.prototype.pause = function()
{
	if(this.isPlaying)
	{
		this.audioProgress.pause();

		this.pauseAnimations();

		this.isPlaying = false;
	}
};

BPBook.prototype.pauseAnimations = function()
{
	if(this.currentRightPage != null){
		this.currentRightPage.pauseAnimations();
		this.currentRightPage.AddOnClickAnimation();
	}

	if(this.currentLeftPage != null){
		this.currentLeftPage.pauseAnimations();
		this.currentLeftPage.AddOnClickAnimation();
	}
};

BPBook.prototype.stopEventAnimations = function()
{
	if(this.currentRightPage != null)
		this.currentRightPage.stopEventAnimations();

	if(this.currentLeftPage != null)
		this.currentLeftPage.stopEventAnimations();
};

BPBook.prototype.goToPages = function(leftPageIndex, rightPageIndex)
{
	if(!this.disablePageFlip)
		this.startPageFlipAnimations(leftPageIndex, rightPageIndex);

	this.temporalLeftIndex = leftPageIndex;
	this.temporalRightIndex = rightPageIndex;
	updateBorders( (leftPageIndex + rightPageIndex) /2 );
	this.setCurrentPages();
};

BPBook.prototype.forceClosedPosition = function (_isFront, override) {
	var closedFrontPosition = -142;
	var backClosePosition = 220;
	if(_isFront && (book.currentLeftPageIndex <1 || override)){
		book.setBookContainerPosition(closedFrontPosition);
		book.updateCenterCover("OPEN_FRONT");
		book.updateCenterCover("CLOSE_FRONT");
			book.setClosedFrontShadow();
			book.removeAllAnimations();
			if(book.currentRightPage != null)
			book.currentRightPage.renderBordersCover(book.rightCoverCanvas,true,true);
	} else {
		if(book.currentLeftPageIndex > book.pages.length-1 || override){
			book.setBookContainerPosition(backClosePosition);
			book.updateCenterCover("OPEN_BACK");
			book.updateCenterCover("CLOSE_BACK");
				book.setClosedBackShadow();
				book.removeAllAnimations();
				if(book.currentLeftPage != null)
				 	book.currentLeftPage.renderBordersCover(book.leftCoverCanvas,false,true);
		}
	}
};

BPBook.prototype.forceOpenedPosition = function () {

		if(book.pageFlipAnimator.isAnimating)
			return;
		var openPosition = 52;
		book.setBookContainerPosition(openPosition);
		book.updateCenterCover("OPEN");
		book.setOpenedShadow();
};

BPBook.prototype.setOpenedShadow = function () {
	book.pageFlipAnimator.bottomLeftShadow.className = "bottomLeftShadow open";
	book.pageFlipAnimator.bottomRightShadow.className = "bottomRightShadow open";

};

BPBook.prototype.setClosedBackShadow  = function () {
	book.pageFlipAnimator.bottomLeftShadow.className = "bottomLeftShadow lastCover";
	book.pageFlipAnimator.bottomRightShadow.className = "bottomRightShadow lastCover";
};

BPBook.prototype.setClosedFrontShadow  = function () {
	book.pageFlipAnimator.bottomLeftShadow.className = "bottomLeftShadow front";
	book.pageFlipAnimator.bottomRightShadow.className = "bottomRightShadow front";
};


var openCenterLeft = 393;
var openCenterWidth = 18;
var openCenterHeight = 539;
//
var closedFrontLeft = 400;
var closedFrontWidth = 14;
var closedFrontHeight = 545;
var closedFrontTop = 2.5;
var closedFrontSkewValue = 16;
//back
var closedBackLeft = 393;
var closedBackWidth = 3;
var closedBackHeight = 544;
var closedBackTop = 4;
var closedBackSkewValue = -20;

var frontCoverSkewLimit = (25);
var backCoverSkewLimit = (25)*-1;


BPBook.prototype.setCoverCenterClosedFront = function (_openProgress) {
	centerCoverBackground.style.left = Math.abs(closedFrontLeft-openCenterLeft)*(_openProgress)*-1 + closedFrontLeft - 1.5 + "px";
	centerCoverBackground.style.width = Math.abs(closedFrontWidth-openCenterWidth)*(_openProgress) + closedFrontWidth + 2.5  + "px";
	centerCoverBackground.style.height = Math.abs(closedFrontHeight-openCenterHeight)*(_openProgress)*-1 + _openProgress*3 + closedFrontHeight + "px";
	BookUtils.instance.applyTrasformBeforeCoverElement(centerCoverBackground, Math.abs(closedFrontSkewValue-frontCoverSkewLimit)*(_openProgress) + closedFrontSkewValue  );
	centerCoverBackground.style.top = closedFrontTop + _openProgress*1 + "px";
	if(_openProgress>= 0.999){
		this.pageFlipAnimator.setBottomShadowOnOpenBook("front");
		this.pageFlipAnimator.bottomLeftShadow.style.opacity = ((_openProgress-0.5)*2);
	}  else {
		this.pageFlipAnimator.setBottomShadowOnCloseBook("front");
		centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas close front";
	}
};

BPBook.prototype.setCoverCenterClosedBack = function (_openProgress) {
	//if(!_openProgress) _openProgress = 1;
	centerCoverBackground.style.left = Math.abs(closedBackLeft-openCenterLeft)*(_openProgress)*-1 + closedBackLeft + "px";
	centerCoverBackground.style.width = Math.abs(closedBackWidth-openCenterWidth)*(_openProgress)*-1 + (openCenterWidth+4) + "px"; //this already works as expected
	centerCoverBackground.style.height = Math.abs(closedBackHeight-openCenterHeight)*(_openProgress) + openCenterHeight + "px";
	BookUtils.instance.applyTrasformBeforeCoverElement(centerCoverBackground, Math.abs(closedBackSkewValue-backCoverSkewLimit)*(_openProgress) + closedBackSkewValue  );
	centerCoverBackground.style.top = closedBackTop + (_openProgress)*-1 + "px";
	if(_openProgress<= 0.009){ //we can use this to control the shadow opacity, giving the transition a good looking feel.
		this.pageFlipAnimator.setBottomShadowOnOpenBook("back");
		this.pageFlipAnimator.bottomRightShadow.style.opacity = (((0.5-_openProgress))*2);
	} else {
		this.pageFlipAnimator.setBottomShadowOnCloseBook("back");
		centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas close back";
	}
};


BPBook.prototype.setCoverCenterOpen = function () {
	centerCoverBackground.style.left = openCenterLeft + "px";
    centerCoverBackground.style.width = openCenterWidth + "px";
    centerCoverBackground.style.height = openCenterHeight + "px";
    this.pageFlipAnimator.setBottomShadowOnOpenBook();
};


BPBook.prototype.updateBookPosition = function (_openProgress) { //_openProgress is the % value of the open cover.

	var closedFrontPosition = -142;
	var openPosition = 52;
	var backClosePosition = 237;
	var openToFrontDiff = Math.abs(openPosition - closedFrontPosition);
	var openToBackDiff = Math.abs(openPosition - backClosePosition);
	var shadowMaxOpacity = .3;
	var shadowMinOpacity = 0;

	bookDiv.className = bookDiv.className.replace(/bookResizeTransition/g, "").replace(/ignoreTransitions/g, "");
	bookDiv.className += " ignoreTransitions";
	switch(this.currentPageFlip){
		case "OPEN_FRONT":
		case "CLOSE_FRONT": //closed FRONT
			book.setBookContainerPosition( ((_openProgress*openToFrontDiff)+closedFrontPosition) );
			book.centerShadow.style.opacity = ((_openProgress-0.5)*shadowMaxOpacity*2);
			this.setCoverCenterClosedFront(_openProgress);

		break;
		case "OPEN_BACK": //closed BACK
		case "CLOSE_BACK":
			book.setBookContainerPosition( ((_openProgress*openToBackDiff)+openPosition) );
			book.centerShadow.style.opacity = (((0.5-_openProgress))*shadowMaxOpacity*2);
			this.setCoverCenterClosedBack(_openProgress);


		break;
		case "NONE":
		default:
			book.setBookContainerPosition(openPosition);
			book.centerShadow.style.opacity = shadowMaxOpacity;
			this.setCoverCenterOpen();
		break;
	}
	bookDiv.className = bookDiv.className.replace(/ignoreTransitions/g, "");
};

BPBook.prototype.setCurrentPages = function()
{
	var leftPageIndex = this.temporalLeftIndex;
	var rightPageIndex = this.temporalRightIndex;
	var targetLeftPage = leftPageIndex > -1 ? this.pages[leftPageIndex] : null;
	var targetRightPage = rightPageIndex < this.pages.length ? this.pages[rightPageIndex] : null;
	this.setCurrentLeftPage(targetLeftPage);
	this.setCurrentRightPage(targetRightPage);
	if(this.currentLeftPage)	this.currentLeftPage.updateAnimations(0);
	if(this.currentRightPage)	this.currentRightPage.updateAnimations(0);
	this.currentLeftPageIndex = leftPageIndex;
};

BPBook.prototype.startPageFlipAnimations = function(leftPageIndex, rightPageIndex)
{
	if(BookConstants.PAGE_FLIP_ENABLED)
	{
		book.stopAllAnimations();
		//move the book according to which page is open.
		this.currentPageFlip = "NONE"; //resets value
		if(this.currentLeftPageIndex < leftPageIndex){ //going left.
			if(leftPageIndex == 1 && rightPageIndex == 2) //Going from cover to first page
				this.currentPageFlip = "OPEN_FRONT";

			if(leftPageIndex == this.pages.length - 1 && rightPageIndex == this.pages.length) //Going from last page to cover
				this.currentPageFlip = "CLOSE_BACK";
		} else {
			if(leftPageIndex == -1 && rightPageIndex == 0) //Going from first page to cover
				this.currentPageFlip = "CLOSE_FRONT";

			if(leftPageIndex == this.pages.length - 3 && rightPageIndex == this.pages.length - 2) //Going from last page to cover
				this.currentPageFlip = "OPEN_BACK";
		}

		if(this.currentLeftPageIndex < leftPageIndex)//Going to left
		{
			if(leftPageIndex == 1 || //Going from cover to first page
		  	   leftPageIndex == this.pages.length - 1) //Going from last page to cover
			{
				this.pageFlipAnimator.lastPageModifier = false;
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Left", "Cover", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
			else if( leftPageIndex == this.pages.length - 3)
			{
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Left", "LastBeforeCover", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
			else if(leftPageIndex == 3){
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Left", "FirstBeforeCover", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
			else{
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Left", "Normal", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
		}
		else if(this.currentLeftPageIndex > leftPageIndex)//Going to right
		{
			if(this.currentLeftPageIndex == 1 || //Going from cover to inside cover page
		   	   this.currentLeftPageIndex == this.pages.length - 1) //Going from last page to cover
			{
				this.pageFlipAnimator.lastPageModifier = true;
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Right", "Cover", this.currentPageFlip,leftPageIndex, this.pages.length);
			}
			else if( this.currentLeftPageIndex == this.pages.length - 3)
			{
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Right", "LastBeforeCover", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
			else if(this.currentLeftPageIndex == 3){
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Right", "FirstBeforeCover", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
			else
			{
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Right", "Normal", this.currentPageFlip, this.currentLeftPageIndex, this.pages.length);
			}
		}
	}
};

BPBook.prototype.removeAllAnimations = function () {
	for(var i = 0; i<this.pages.length; i++){
		this.pages[i].hideAnimations();
	}
};

BPBook.prototype.stopAllAnimations = function () {
	for(var i = 0; i<this.pages.length; i++){
		this.pages[i].stopAnimations();
	}
};

BPBook.prototype.removeLeftAnimations = function () {
	for(var i = 0; i<this.pages.length; i++){
		if(!this.pages[i].isRightPageCanvas)
			this.pages[i].hideAnimations();
	}
};

BPBook.prototype.removeRightAnimations = function () {
	for(var i = 0; i<this.pages.length; i++){
		if(this.pages[i].isRightPageCanvas)
			this.pages[i].hideAnimations();
	}
};

BPBook.prototype.setCurrentLeftPage = function(leftPage)
{
	if(leftPage != null)
	{
		leftPage.renderToCanvas(this.leftPageCanvas, this.LeftPageDiv, false);
		if(leftPage.isInsideCoverPage || leftPage.isCoverPage)
			leftPage.forcedRenderToCanvas(this.leftPageCanvas, this.LeftPageDiv, false);
	}
	else
	{
		//noinspection SillyAssignmentJS
		this.leftPageCanvas.width = this.leftPageCanvas.width;
		this.leftPageCanvas.getContext("2d").clearRect(0, 0, this.leftPageCanvas.width, this.leftPageCanvas.height);

		for(var i = 0; i < this.LeftPageDiv.children.length; i++)
		{
			var currentChild = this.LeftPageDiv.children[i];
			var attibuteClass = currentChild.getAttribute("class");

			if( attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.image ||
        attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.text ||
        attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.username)
					this.LeftPageDiv.removeChild(currentChild);
		}
	}

	this.currentLeftPage = leftPage;

	if(this.currentLeftPage != null && !book.hasCanceledPageFlip)
			this.currentLeftPage.showAnimations(this.audioProgress.audioPosition);
};

BPBook.prototype.setCurrentRightPage = function(rightPage)
{
	if(rightPage != null)
	{
		rightPage.renderToCanvas(this.rightPageCanvas, this.rightPageDiv, true);
		if(rightPage.isInsideCoverPage || rightPage.isCoverPage)
			rightPage.forcedRenderToCanvas(this.rightPageCanvas, this.rightPageDiv, true);
	}
	else
	{
		//noinspection SillyAssignmentJS
		this.rightPageCanvas.width = this.rightPageCanvas.width;
		this.rightPageCanvas.getContext("2d").clearRect(0, 0, this.rightPageCanvas.width, this.rightPageCanvas.height);

		for(var i = 0; i < this.rightPageDiv.children.length; i++)
		{
			var currentChild = this.rightPageDiv.children[i];
			var attibuteClass = currentChild.getAttribute("class");

			if( attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.image ||
        attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.text ||
        attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.username)
				this.rightPageDiv.removeChild(currentChild);
		}
	}

	this.currentRightPage = rightPage;

	if(this.currentRightPage != null && !book.hasCanceledPageFlip)
		this.currentRightPage.showAnimations(this.audioProgress.audioPosition);
};

BPBook.prototype.goToPage = function(leftPageIndex)
{
	this.goToPages(leftPageIndex, leftPageIndex + 1);
};

BPBook.prototype.goToNextPages = function(forceAudioPositionUpdate)
{
	if(this.currentLeftPageIndex < this.pages.length - 2)
	{
		this.audioProgress.goToNextPages(forceAudioPositionUpdate);
		this.goToPage(this.currentLeftPageIndex + 2);
	}
};

BPBook.prototype.goToPreviousPages = function(forceAudioPositionUpdate)
{
	if(this.currentLeftPageIndex > 0)
	{
		this.audioProgress.goToPreviousPages(forceAudioPositionUpdate);
		this.goToPage(this.currentLeftPageIndex - 2);
	}
};

BPBook.prototype.updatePages = function(audioPosition)
{
	if(this.currentLeftPage != null){
		this.currentLeftPage.updatePage(audioPosition);
	}

	if(this.currentRightPage != null){
		this.currentRightPage.updatePage(audioPosition);
	}
};

BPBook.prototype.preRenderCenterShadowsGradients = function()
{
	var ctx = this.centerShadow.getContext("2d");
	var grd = ctx.createLinearGradient(0, 0, BookConstants.PAGE_FLIP_RENDER_SHADOW.w, 0);

	grd.addColorStop(0, "rgba(1,1,1,0)");
	grd.addColorStop(0.1, "rgba(1,1,1,0.3)");
	grd.addColorStop(0.4, "rgba(1,1,1,0.2)");
	grd.addColorStop(0.5, "rgba(1,1,1,0.6)");
	grd.addColorStop(0.6, "rgba(1,1,1,0.2)");
	grd.addColorStop(0.9, "rgba(1,1,1,0.3)");
	grd.addColorStop(1, "rgba(1,1,1,0)");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, BookConstants.PAGE_FLIP_RENDER_SHADOW.w, BookConstants.PAGE_FLIP_RENDER_SHADOW.h);

	this.centerShadow.style.left    = 377 + "px";
	this.centerShadow.style.top     = 13 + "px";

};
