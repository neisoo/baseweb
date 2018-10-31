function BPPageFlipAnimator(parentBook, pageFlipLeftContainer, pageFlipRightContainer, centerShadowFlipAnimation, borderShadowFlipAnimation, reflectionLightFlipAnimation)
{
	this.parentBook = parentBook;

	this.pageFlipLeftPageCanvas = document.getElementById("leftPageDivCanvas");
	this.pageFlipRightPageCanvas = document.getElementById("rightPageDivCanvas");
	this.centerShadowFlipAnimation = centerShadowFlipAnimation;
	this.borderShadowFlipAnimation = borderShadowFlipAnimation;
	this.reflectionLightFlipAnimation = reflectionLightFlipAnimation;

	this.LeftPageDiv = this.parentBook.LeftPageDiv;
	this.rightPageDiv = this.parentBook.rightPageDiv;
	this.parentPageFlipLeft = pageFlipLeftContainer;
	this.parentPageFlipRight = pageFlipRightContainer;

	this.currentPageFlip = "";
	this.totalPages = 0;
	this.currentPage = 0;
	this.isAnimating = false;
	this.initialPageflipTime = 0;
	this.leftPage = null;
	this.rightPage = null;
	this.direction = "Unknown";//Left, Right
	this.mode = "Unknown";//Normal, Cover
	this.updateDirection = "Forward";
	this.progressFrame = 0;
	this.pageFlipCallBack = null;
	this.pageFlipTransitionStart = null;
	this.pageFlipTransitionCompleted = null;

	this.updateInitialDelay = true;
	this.updateInitialDelay = 0;
	this.isSetBookPagesAble = false;
	this.setBookPagesCallBack = null;

	this.setCanvasVisibility(false);
	this.setShadowCanvasVisibility(false);
	this.preRenderCenterShadowsGradients();
	this.skewContainerLeft = document.getElementById("skewContainerLeft");
	this.skewContainerRight = document.getElementById("skewContainerRight");
	this.bottomLeftShadow = document.getElementById("bottomLeftShadow");
	this.bottomRightShadow = document.getElementById("bottomRightShadow");
	this.correctCurrentPage		= 0;
}

var hasCanceled = false;

BPPageFlipAnimator.prototype.preRenderCenterShadowsGradients = function()
{
	var ctx = this.centerShadowFlipAnimation.getContext("2d");
	var grd = ctx.createLinearGradient(0, 0, BookConstants.PAGE_FLIP_RENDER_SHADOW.w, 0);

	grd.addColorStop(0,   "rgba(1,1,1,0)");
	grd.addColorStop(0.5, "rgba(1,1,1,1)");
	grd.addColorStop(1,   "rgba(1,1,1,0)");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, BookConstants.PAGE_FLIP_RENDER_SHADOW.w, BookConstants.PAGE_FLIP_RENDER_SHADOW.h);

	ctx = this.reflectionLightFlipAnimation.getContext("2d");
	grd = ctx.createLinearGradient(0, 0, 10, 0);

	grd.addColorStop(0,   "rgba(255,255,255,0)");
	grd.addColorStop(0.25, "rgba(255,255,255,0.3)");
	grd.addColorStop(1,   "rgba(255,255,255,0)");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 10, BookConstants.PAGE_FLIP_RENDER_SHADOW.h);

	ctx = this.borderShadowFlipAnimation.getContext("2d");
	grd = ctx.createLinearGradient(0, 0, BookConstants.PAGE_FLIP_RENDER_BORDER_SHADOW.w, 0);

	grd.addColorStop(0, "rgba(1,1,1,1)");
	grd.addColorStop(1, "rgba(1,1,1,1)");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, BookConstants.PAGE_FLIP_RENDER_BORDER_SHADOW.w, BookConstants.PAGE_FLIP_RENDER_BORDER_SHADOW.h);
};

BPPageFlipAnimator.prototype.setCanvasVisibility = function(visible)
{
	this.parentPageFlipLeft.style.display = visible ? "inherit" : "none";
	this.parentPageFlipRight.style.display = visible ? "inherit" : "none";
};

BPPageFlipAnimator.prototype.setShadowCanvasVisibility = function(visible)
{
	this.centerShadowFlipAnimation.style.display = visible ? "inherit" : "none";
	this.reflectionLightFlipAnimation.style.display = visible ? "inherit" : "none";
	this.borderShadowFlipAnimation.style.display = visible ? "inherit" : "none";
};

BPPageFlipAnimator.prototype.UpdateBottomShadow = function() {

	if(this.mode != "Cover"){
		this.bottomLeftShadow.style.opacity = 1;
		this.bottomRightShadow.style.opacity = 1;
		book.setOpenedShadow();
	}
};

BPPageFlipAnimator.prototype.beforePageFlip = function (currentPage) {

	book.hideBookAnimations();
  book.stopAllAnimations();
	book.stopEventAnimations();
	var correctCurrentPage = (book.currentLeftPageIndex + currentPage)/2;
	this.correctCurrentPage = correctCurrentPage;
	isBookCompleted = false;
	this.UpdateBottomShadow(false);
};

BPPageFlipAnimator.prototype.removeImagesFromParentDiv = function( _element) {
	var elements = _element.getElementsByTagName('img');
	for(var i = elements.length ; i>=0; i--){
		if(elements[i]){
			if(elements[i].src.indexOf("page") != -1 || elements[i].src.indexOf("text") != -1 ||
			   elements[i].src.indexOf("cover") != -1 || elements[i].src.indexOf("back") != -1  ||
			   elements[i].src.indexOf("front") != -1)
			elements[i].parentNode.removeChild(elements[i]);
		}
	}
}

BPPageFlipAnimator.prototype.startPageFlip = function(leftPage, rightPage, direction, mode, currentPageFlip, currentPage, totalPages)
{
	this.leftPage   = leftPage;
	this.rightPage  = rightPage;
	this.direction 	= direction;
	this.mode       = mode;

	if(this.pageFlipTransitionStart!=null)
		this.pageFlipTransitionStart(this);

	this.beforePageFlip(currentPage, totalPages);

	hasCanceled = false;

	if(!book.isDraggingSlider)
		this.stopPageFlip();//finish/commit any page flip animation that is currently in progress

	if(leftPage)
		leftPage.pauseAnimations();
	if(rightPage)
		rightPage.pauseAnimations();
	this.currentPageFlip = currentPageFlip;
	if(totalPages != null || totalPages != undefined){
		this.totalPages = totalPages;
	}
	if(currentPage != null || currentPage!= undefined){
		this.currentPage = currentPage;
	}

	var correctCurrentPage = (book.currentLeftPageIndex + currentPage)/2;
	var isFrontCover = (correctCurrentPage <= 1);
	var isLastCover  = correctCurrentPage >= book.totalPages-2;

	this.removeImagesFromParentDiv(this.parentPageFlipRight);
	this.removeImagesFromParentDiv(this.parentPageFlipLeft);

	this.pageFlipLeftPageCanvas.width  = this.pageFlipLeftPageCanvas.width;
	this.parentPageFlipRight.style.display = "block";
	this.pageFlipRightPageCanvas.width = this.pageFlipRightPageCanvas.width;
	this.parentPageFlipLeft.style.display  = "block";

	this.pageFlipLeftPageCanvas.getContext("2d").clearRect(0," 0", this.pageFlipLeftPageCanvas.width, this.pageFlipLeftPageCanvas.height);
	this.pageFlipRightPageCanvas.getContext("2d").clearRect(0, 0, this.pageFlipRightPageCanvas.width, this.pageFlipRightPageCanvas.height);

	if(book.currentLeftPage)
		book.currentLeftPage.hideAnimations();
	if(book.currentRightPage)
		book.currentRightPage.hideAnimations();

	switch(this.mode)
	{
		case "Normal":
		case "FirstBeforeCover":
		case "LastBeforeCover":
			book.updateBookPosition(1);
			if(leftPage != null){
				leftPage.renderToCanvas(this.pageFlipLeftPageCanvas, this.parentPageFlipLeft, false, true);
				leftPage.showAnimations(0);
				leftPage.flagAnimationsToHide();
			}

			if(rightPage != null){
				rightPage.renderToCanvas(this.pageFlipRightPageCanvas, this.parentPageFlipRight, true, true);
				rightPage.showAnimations(0);
				rightPage.flagAnimationsToHide();
			}
			break;

		case "Cover":
			if(leftPage != null)
			{

				leftPage.renderCover(this.pageFlipLeftPageCanvas, false, true);
				leftPage.renderPageToCanvas(this.parentPageFlipLeft, false);
				book.rightCoverDiv.style.display = "none";

				if(isFrontCover){
					leftPage.forcedRenderToCanvas(this.pageFlipLeftPageCanvas, this.parentPageFlipLeft, false);
				}
				if(isLastCover){
					if(rightPage)
						rightPage.forcedRenderToCanvas(this.pageFlipRightPageCanvas, this.parentPageFlipLeft, true);
					if(this.direction == "Right")
					  	leftPage.forcedRenderToCanvas(this.pageFlipLeftPageCanvas, this.parentPageFlipRight, false);
				}
			} else {
				this.LeftPageDiv.style.display  = "none";
			}

			if(rightPage != null)
			{
				rightPage.renderCover(this.pageFlipRightPageCanvas, true, true);
				rightPage.renderPageToCanvas(this.parentPageFlipRight, true);
				book.leftCoverDiv.style.display = "none";
				if(isFrontCover){
					if(this.direction == "Left")
     					rightPage.forcedRenderToCanvas(this.pageFlipRightPageCanvas, this.parentPageFlipRight, true);
    			}
				if(isLastCover){
					//book.centerShadow.style.opacity = "0";

				}
			} else {
				this.rightPageDiv.style.display = "none";
			}
			break;
	}

	this.setCanvasVisibility(true);

	this.initialPageflipTime = Date.now();
	this.isAnimating 		 = true;

};

BPPageFlipAnimator.prototype.afterPageFlip = function () {

	updatePageWeight();
	isPausedAfterPage = false; //prevent book to think it"s still paused by the pause after page
	var isFrontCover = (book.currentLeftPageIndex < 1);
	var isLastCover  = book.currentLeftPageIndex > book.totalPages-3;
	var isFrontCoverOpened = book.currentLeftPageIndex === 1;
	var isLastCoverOpened = book.currentLeftPageIndex === book.totalPages - 3;

	if(isFrontCover || isLastCover ) {
		if(isFrontCover){
			book.updateCenterCover("CLOSE_FRONT");
			book.currentRightPage.renderBordersCover(book.rightCoverCanvas,true,true);
			BookUtils.instance.applyScaleToElement(book.rightPageDiv,1,1);
		}
		if(isLastCover){
			book.updateCenterCover("CLOSE_BACK");
			book.currentLeftPage.renderBordersCover(book.leftCoverCanvas,false,true);
			BookUtils.instance.applyScaleToElement(book.LeftPageDiv,1,1);
		}
	} else {
		if(isFrontCoverOpened) {
			book.updateCenterCover("OPEN_FRONT");
		} else {
			if(isLastCoverOpened) {
				book.updateCenterCover("OPEN_BACK");
			}	else {
				//this means is not a cover.
				book.updateCenterCover();
			}
		}
		book.leftCoverDiv.style.display = "block";
		book.rightCoverDiv.style.display = "block";
		//book.centerShadow.style.opacity = "0.30";
		book.centerShadow.style.display = "block";
		book.forceOpenedPosition();
	}

	if(book.isDraggingSlider)
		return;

	//if page flip was not triggered by a slider drag
	book.audioProgress.audioPosition = book.audioProgress.getAudioPosition();
	book.audioProgress.progress      = book.audioProgress.audioPosition / book.audioProgress.soundPlayer.getDuration();

	hud.progressSlider.updateForeground(book.audioProgress.progress);
	hud.progressSlider.updateProgress(book.audioProgress.progress, true); //update position, even if audio has not been loaded

	if(book.audioProgress.isUsingSlowAudio){
		hud.updateProgressTime(book.audioProgress.progress * book.audioProgress.getSlowAudioDuration() , book.audioProgress.getSlowAudioDuration()- 1);
	}else{
		hud.updateProgressTime(book.audioProgress.audioPosition, book.audioProgress.soundPlayer.getDuration() - 1);
	}

	if(!book.isPlaying){
    	book.stopAllAnimations();
		book.stopEventAnimations();
	}

	if(book.currentRightPage != null){
		//book.currentRightPage.pauseAnimations(); //why was it here?
		book.currentRightPage.AddOnClickAnimation();
		book.currentRightPage.UpdateAnimationsFromPoint(book.audioProgress.audioPosition);
	}

	if(book.currentLeftPage != null){
		//book.currentLeftPage.pauseAnimations(); //why was it here?
		book.currentLeftPage.AddOnClickAnimation();
		book.currentLeftPage.UpdateAnimationsFromPoint(book.audioProgress.audioPosition);
	}

	hasCanceled = false;

};

BPPageFlipAnimator.prototype.cancelCurrentTransition = function(progress, onCancelTransitionCompleted)
{

	if(this.mode == "Cover"){ //11: thou shall not cancel a cover flip.
		this.finishCurrentTransition(progress, this.pageFlipTransitionCompleted);
		return;
	}

	hasCanceled = true;
	book.hasCanceledPageFlip = true;
	this.pageFlipTransitionCompleted      = onCancelTransitionCompleted;
	var secondsOffset 				      = progress * BookConstants.PAGE_FLIP_ANIMATION_SECONDS * 1000;
	this.initialPageflipTime 		      = Date.now() - secondsOffset;
	this.isAnimating 				      = true;
	this.updateDirection 			      = "Backward";
	this.backwardDirectionInitialProgress = progress;
	this.updateProgress(progress);
};

BPPageFlipAnimator.prototype.finishCurrentTransition = function(progress, onFinishTransitionCompleted)
{
	hasCanceled = false;
	book.hasCanceledPageFlip = false;
	this.pageFlipTransitionCompleted = onFinishTransitionCompleted;
	var secondsOffset 				 = progress * BookConstants.PAGE_FLIP_ANIMATION_SECONDS * 1000;
	this.initialPageflipTime 		 = Date.now() - secondsOffset;
	this.isAnimating 				 = true;
	this.updateProgress(progress);
};

BPPageFlipAnimator.prototype.update = function()
{
	if(this.isAnimating)
	{
		var progress = (Date.now() - this.initialPageflipTime) / (BookConstants.PAGE_FLIP_ANIMATION_SECONDS * 1000);

		if(this.updateDirection == "Backward")
		{
			var progressOffset = progress - this.backwardDirectionInitialProgress;
			progress 		   = this.backwardDirectionInitialProgress - progressOffset;//Move progress backward
		}

		if(progress > 1 || progress < 0){
			this.stopPageFlip();
			if(forcePause)
				pause();
		} else {
			this.updateProgress(progress);
		}
	}
};

BPPageFlipAnimator.prototype.updateProgress = function(progress)
{

	switch(this.mode)
	{
		case "Normal":
		case "LastBeforeCover" :
		case "FirstBeforeCover" :
			this.updateNormalPageFlipProgress(progress,this.mode);
		break;
		case "Cover":
			this.updateCoverPageFlipProgress(progress);
			break;
	}
};

BPPageFlipAnimator.prototype.updateNormalPageFlipProgress = function(progress,mode)
{
	var canvasWidth    = BookConstants.PAGE_CANVAS_SIZE.w - BookConstants.OFFSET_SPACE_BETWEEN_PAGES;
	var canvasHeight   = BookConstants.PAGE_CANVAS_SIZE.h;
	var offset 		   = BookConstants.PAGE_FLIP_IMAGE_OFFSET;
	var shadowOffset   = canvasWidth - BookConstants.PAGE_IMAGE_SIZE.w;

	var isSafari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;

 	var index = book.temporalLeftIndex;

	switch(this.direction)
	{
		case "Right":
		{
			if(progress < 0.5)
			{
				var rightPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0, 0.5);
				var currentX 	  		  = BookUtils.instance.linearBezier(0, canvasWidth, rightPageFlipProgress);
				var offsetX 	  		  = BookUtils.instance.linearBezier(0, (canvasWidth / 2), rightPageFlipProgress);

				this.parentPageFlipLeft.style.left = (currentX) + "px";
				this.parentPageFlipLeft.style.clip = "rect(0px,"+( canvasWidth - offsetX)+"px,"+ canvasHeight +"px,0px)";

				if(currentX < (canvasWidth - offset))
					this.parentPageFlipRight.style.clip = "auto";
				else
					this.parentPageFlipRight.style.clip = "rect(0px,"+ (canvasWidth+1) +"px,"+ canvasHeight +"px," + offset +"px)";

				this.parentPageFlipLeft.style.zIndex  = 5;//Bring to front
				this.parentPageFlipRight.style.zIndex = 4;//Bring to front
				this.rightPageDiv.style.zIndex 		  = 2;

				this.setCanvasVisibility(true);
				this.renderCenterShadow(progress, canvasWidth + offsetX);
				this.renderBorderShadow(progress, currentX+1);
				this.setShadowCanvasVisibility(true);
			}
			else
			{
				var leftPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0.5, 1);
				var currentX = BookUtils.instance.linearBezier(0, canvasWidth, leftPageFlipProgress);
				var offsetX  = BookUtils.instance.linearBezier((canvasWidth / 2), canvasWidth, leftPageFlipProgress);

				var currentLeft 					=  (currentX + offset);
				this.parentPageFlipLeft.style.left = (canvasWidth + currentX) + "px";
				this.parentPageFlipLeft.style.clip = "rect(0px,"+( canvasWidth - offsetX)+"px,"+ canvasHeight +"px,0px)";
				this.parentPageFlipRight.style.clip = "rect(0px,"+ (canvasWidth+1) +"px,"+ canvasHeight +"px," + currentLeft +"px)";

				this.setCanvasVisibility(true);
				this.renderCenterShadow(progress, canvasWidth + offsetX);
				this.renderBorderShadow(progress, canvasWidth + currentX+1);
				this.setShadowCanvasVisibility(true);

			}
		}
		break;
		case "Left":
		{
			if(progress < 0.5)
			{
				var rightPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0, 0.5);
				var currentX 	  		  = BookUtils.instance.linearBezier(0, canvasWidth, rightPageFlipProgress);
				var offsetX 	  		  = BookUtils.instance.linearBezier(0, (canvasWidth / 2), rightPageFlipProgress);

				this.parentPageFlipRight.style.left = (canvasWidth - currentX) + "px";
				this.parentPageFlipRight.style.clip = "rect(0px,"+ canvasWidth +"px,"+ canvasHeight +"px,"+ offsetX +"px)";

				if(currentX < (canvasWidth - offset))
					this.parentPageFlipLeft.style.clip = "auto";
				else
					this.parentPageFlipLeft.style.clip  = "rect(0px,"+ (canvasWidth - offset) +"px,"+ canvasHeight +"px,0px)";

				this.parentPageFlipRight.style.zIndex = 5;//Bring to front
				this.parentPageFlipLeft.style.zIndex  = 4;//Bring to front
				this.LeftPageDiv.style.zIndex 		  = 2;

				this.setCanvasVisibility(true);
				this.renderCenterShadow(progress, (canvasWidth - offsetX) );
				this.renderBorderShadow(progress, ((canvasWidth * 2) - shadowOffset - (currentX - 4)) );
				this.setShadowCanvasVisibility(true);

			}
			else
			{
				var leftPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0.5, 1);
				var currentX      		 = BookUtils.instance.linearBezier(0, canvasWidth, leftPageFlipProgress);
				var offsetX 	  		 = BookUtils.instance.linearBezier((canvasWidth / 2), canvasWidth, leftPageFlipProgress);

				var currentLeft 					=  (currentX + offset);
				this.parentPageFlipRight.style.left = (- currentX) + "px";
				this.parentPageFlipRight.style.clip = "rect(0px,"+ canvasWidth +"px,"+ canvasHeight +"px,"+ offsetX +"px)";
				this.parentPageFlipLeft.style.clip  = "rect(0px,"+ (canvasWidth - currentLeft) +"px,"+ canvasHeight +"px,0px)";

				this.setCanvasVisibility(true);
				this.renderCenterShadow(progress, (canvasWidth - offsetX) );
				this.renderBorderShadow(progress, (canvasWidth - shadowOffset - (currentX - 4)) );
				this.setShadowCanvasVisibility(true);

			}
		}
		break;
	}
};

BPPageFlipAnimator.prototype.updateCoverPageFlipProgress = function(progress)
{
	book.pageFlipAnimator.bottomLeftShadow.className = book.pageFlipAnimator.bottomLeftShadow.className.replace(" open", "");
	book.pageFlipAnimator.bottomRightShadow.className = book.pageFlipAnimator.bottomRightShadow.className.replace(" open", "");
	book.pageFlipAnimator.bottomLeftShadow.className = book.pageFlipAnimator.bottomLeftShadow.className.replace(" lastCover", "");
	book.pageFlipAnimator.bottomRightShadow.className = book.pageFlipAnimator.bottomRightShadow.className.replace(" lastCover", "");
	var close;
	if(book.currentLeftPageIndex > book.pages.length/2){
		book.pageFlipAnimator.bottomLeftShadow.className += " lastCover";
		book.pageFlipAnimator.bottomRightShadow.className += " lastCover";
		book.updateCenterCover("CLOSE_BACK");
	} else {
		book.updateCenterCover("CLOSE_FRONT");
	}
	var isFrontCoverOpened = book.currentLeftPageIndex === 1;
	var isLastCoverOpened = book.currentLeftPageIndex === book.totalPages - 3;
	if (isFrontCoverOpened || isLastCoverOpened) {
		close = false;
	}else{
		close = true;
	}

	switch(this.direction)
	{
		case "Left":
		{

			book.updateBookPosition(progress);
			if(progress < 0.5)//Hide the left page of the book that is already loaded, scale and translate the right cover page
			{

				if(dragPageGesture.isDragging)
					this.setCanvasVisibility(true);
				var rightPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0, 0.5);
				BookUtils.instance.applyTrasformCoverElement(this.parentPageFlipRight, (1 - rightPageFlipProgress), 1,this.direction,close,progress);

				this.parentPageFlipRight.style.display      = "inherit";
				this.parentPageFlipRight.style.left      	= "398px";
				this.LeftPageDiv.style.display  			= "none";

				BookUtils.instance.applyScaleToElement(this.parentPageFlipLeft, 1, 1);
			}
			else //Hide the cover page, bring to front scale and translate the left page of the book
			{
				if(dragPageGesture.isDragging)
					this.setCanvasVisibility(true);

				var leftPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0.5, 1);

				BookUtils.instance.applyTrasformCoverElement(this.LeftPageDiv, leftPageFlipProgress, 1,this.direction,close,progress);
				BookUtils.instance.applyTrasformCoverElement(this.parentPageFlipRight, leftPageFlipProgress, 1,this.direction,close,progress);
				this.LeftPageDiv.style.left      	= "2px";
				this.LeftPageDiv.style.zIndex			  = 3;//Bring to front
				this.LeftPageDiv.style.display 		   = "inherit";
				this.parentPageFlipRight.style.display = "none";
			}
		}
		break;
		case "Right":
		{
			book.updateBookPosition(1-progress);
			if(progress < 0.5)//Hide the right page of the book to display the right page flip canvas temporally, move the left page flip canvas to the right and scale down it
			{
				this.setCanvasVisibility(true);

				var rightPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0, 0.5);
				BookUtils.instance.applyTrasformCoverElement(this.parentPageFlipLeft, (1 - rightPageFlipProgress), 1,this.direction,close,progress);

				this.parentPageFlipLeft.style.display   = "inherit";
				this.parentPageFlipLeft.style.left 		= "0px";
				this.rightPageDiv.style.display 		= "none";
				this.LeftPageDiv.style.left = "-1px";

				BookUtils.instance.applyScaleToElement(this.parentPageFlipRight, 1, 1);
			}
			else //Hide the left page flip canvas, bring the right page canvas to front scale it up and translate it
			{
				this.setCanvasVisibility(true);

				var leftPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0.5, 1);
				BookUtils.instance.applyTrasformCoverElement(this.rightPageDiv, leftPageFlipProgress, 1,this.direction,close,progress);
				BookUtils.instance.applyTrasformCoverElement(this.parentPageFlipLeft, leftPageFlipProgress, 1,this.direction,close,progress);

				this.rightPageDiv.style.display 		 = "inherit";
				this.rightPageDiv.style.zIndex	 		 = 3;//Bring to front
				this.LeftPageDiv.style.left = "0px";
				this.parentPageFlipLeft.style.display    = "none";
			}
		}
		break;
	}
};

BPPageFlipAnimator.prototype.stopPageFlip = function()
{
	book.audioProgress.restartCurrentPagesAudioPosition();
	divLeftPageCanvas.className = divLeftPageCanvas.className.replace(" containerLeft","");
	divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
	divLeftPageCanvas.className += " containerLeft";
	divRightPageCanvas.className += " containerRight";

	if(this.isAnimating)
	{
		this.initialPageflipTime         = 0;
		this.updateInitialDelay          = true;
		this.updateInitialDelay			 = 0;

		//Resetting all transformations
		this.LeftPageDiv.style.left 		= "0px";
		this.parentPageFlipLeft.style.left  = "0px";
		this.rightPageDiv.style.left 	    = "399px";
		this.parentPageFlipRight.style.left = Math.round(BookConstants.PAGE_CANVAS_SIZE.w - BookConstants.OFFSET_SPACE_BETWEEN_PAGES) + "px";

		BookUtils.instance.applyScaleToElement(this.parentPageFlipLeft, 1, 1);
		BookUtils.instance.applyScaleToElement(this.parentPageFlipRight, 1, 1);

		this.LeftPageDiv.style.display = "inherit";
		this.rightPageDiv.style.display = "inherit";

		this.parentPageFlipRight.style.clip = "auto";
		this.parentPageFlipRight.style.display = "none";
		this.parentPageFlipLeft.style.clip  = "auto";
		this.parentPageFlipLeft.style.display  = "none";

		this.parentPageFlipLeft.style.zIndex  = 2;
		this.parentPageFlipRight.style.zIndex = 2;

		this.centerShadowFlipAnimation.style.zIndex  = 1;
		this.borderShadowFlipAnimation.style.zIndex  = 1;
		this.reflectionLightFlipAnimation.style.zIndex  = 1;

		this.LeftPageDiv.style.zIndex  = 1;
		this.rightPageDiv.style.zIndex = 2; //using 1 instead of 0 prevents a small flick when flipping pages.

		this.setCanvasVisibility(false);
		this.setShadowCanvasVisibility(false);

		if(this.pageFlipCallBack != null)
			this.pageFlipCallBack(this);

		if(this.pageFlipTransitionCompleted != null)
		{
			this.pageFlipTransitionCompleted(this);
			this.pageFlipTransitionCompleted = null;
		}

		if(this.mode == "LastBeforeCover")
		{
			centerCoverBackground.style.display = "block";
			divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
			divRightPageCanvas.className += " containerRight";
			book.setBookContainerPosition(52);
			if((this.direction == "Left" && !book.hasCanceledPageFlip) || (this.direction == "Right" && book.hasCanceledPageFlip)) {
				this.setBottomShadowOnOpenBook("back");
			} else {
				this.setBottomShadowOnOpenBook();
			}

		} else if(this.mode == "FirstBeforeCover"){
			divLeftPageCanvas.className = divLeftPageCanvas.className.replace(" containerLeft","");
			divLeftPageCanvas.className += " containerLeft";
			book.setBookContainerPosition(52);
			divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
			divRightPageCanvas.className += " containerRight";
			if ((this.direction == "Right" && !book.hasCanceledPageFlip) || (this.direction == "Left" && book.hasCanceledPageFlip)) {
				this.setBottomShadowOnOpenBook("front");
			} else {
				this.setBottomShadowOnOpenBook();
			}

		} else if(this.mode == "Cover"){
			if(this.currentPageFlip == "CLOSE_BACK"){
				centerCoverBackground.style.display = "block";
				divLeftPageCanvas.className = divLeftPageCanvas.className.replace(" containerLeft","");
				divLeftPageCanvas.className += " containerLeft";
				divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
				divRightPageCanvas.className += " containerRight";
				this.setBottomShadowOnCloseBook("back");
				centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas close back";

			} else if(this.currentPageFlip == "OPEN_BACK"){
				centerCoverBackground.style.display = "block";
				book.rightCoverDiv.style.display = "block";
				divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
				divRightPageCanvas.className += " containerRight";
				this.setBottomShadowOnOpenBook("back");
				book.setBookContainerPosition(52);

			} else {
				if(this.currentPageFlip == "OPEN_FRONT"){
					centerCoverBackground.style.display = "block";
					book.leftCoverDiv.style.display = "block";

				} else if(this.currentPageFlip == "CLOSE_FRONT"){
					centerCoverBackground.style.display = "block";
					//centerCoverBackgroundCanvas.className = "centerCoverBackgroundCanvas close front";

					this.setBottomShadowOnCloseBook("front");
					centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas close front";

				}
				if(this.direction == "Left"){
					centerCoverBackground.style.display = "block";
					divLeftPageCanvas.className = divLeftPageCanvas.className.replace(" containerLeft","");
					divLeftPageCanvas.className += " containerLeft";
					this.setBottomShadowOnOpenBook("front");
					book.setBookContainerPosition(52);

				} else {
					centerCoverBackground.style.display = "block";
					divLeftPageCanvas.className = divLeftPageCanvas.className.replace(" containerLeft","");
					divLeftPageCanvas.className += " containerLeft";
					divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
					divRightPageCanvas.className += " containerRight";

				}
			}
		} else {
			centerCoverBackground.style.display = "block";
			divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
			divRightPageCanvas.className += " containerRight";
		}

		this.updateDirection = "Forward";
		this.isAnimating     = false;
	}
};

BPPageFlipAnimator.prototype.renderCenterShadow = function(progress, positionX)
{
	if(BookConstants.RENDER_PAGE_FLIP_SHADOWS)
	{
		var top 	 		= BookConstants.PAGE_FLIP_RENDER_SHADOW.top;
		var width 	 		= BookConstants.PAGE_FLIP_RENDER_SHADOW.w;
		var currentProgress = progress < 0.25 ? BookUtils.instance.inverseLinearBezier(progress, 0.1, 0.25)   : BookUtils.instance.inverseLinearBezier(progress, 0.25,0.9);
		var alpha 			= progress < 0.25 ? BookUtils.instance.linearBezier(0.22, 0.3, currentProgress) : BookUtils.instance.linearBezier(0.3, 0.0, currentProgress);

		this.centerShadowFlipAnimation.style.opacity = alpha;
		this.centerShadowFlipAnimation.style.zIndex  = 6;
		this.centerShadowFlipAnimation.style.left 	 = (positionX - (width / 2)) + "px";
		// this.centerShadowFlipAnimation.style.top 	 = top + "px";

		this.renderCenterLightReflection(progress, positionX);
	}
};

BPPageFlipAnimator.prototype.renderCenterLightReflection= function(progress, positionX)
{
	if(BookConstants.RENDER_PAGE_FLIP_SHADOWS)
	{
		var top 	 		= BookConstants.PAGE_FLIP_RENDER_SHADOW.top;
		var width 	 		= 10;
		var currentProgress = progress < 0.25 ? BookUtils.instance.inverseLinearBezier(progress, 0, 0.25)   : BookUtils.instance.inverseLinearBezier(progress, 0.25,1);
		var alpha 			= progress < 0.25 ? BookUtils.instance.linearBezier(0.0, 0.8, currentProgress) : BookUtils.instance.linearBezier(0.8, 0.0, currentProgress);

		this.reflectionLightFlipAnimation.style.opacity = alpha;
		this.reflectionLightFlipAnimation.style.zIndex  = 6;

		if(this.direction == "Left"){
			this.reflectionLightFlipAnimation.style.left 	= Math.round((positionX - (width / 2) + 2)) + "px";
		}
		else{
			this.reflectionLightFlipAnimation.style.left 	= Math.round((positionX - (width / 2) - 1)) + "px";
		}
		this.reflectionLightFlipAnimation.style.top 	= top + "px";

	}
};

BPPageFlipAnimator.prototype.renderBorderShadow = function(progress, positionX)
{
	if(BookConstants.RENDER_PAGE_FLIP_SHADOWS)
	{
		var top	   			= BookConstants.PAGE_FLIP_RENDER_BORDER_SHADOW.top;
		var currentProgress = progress < 0.5 ? BookUtils.instance.inverseLinearBezier(progress, 0, 0.5) : BookUtils.instance.inverseLinearBezier(progress, 0.5,1);
		var alpha  			= progress < 0.5 ? BookUtils.instance.linearBezier(0, 0.2, currentProgress) : BookUtils.instance.linearBezier(0.2, -0.1, currentProgress);
		var modifier = -3;
		if(this.direction == "Right")
			modifier = 0;

		this.borderShadowFlipAnimation.style.opacity = alpha;
		this.borderShadowFlipAnimation.style.zIndex  = 6;
		this.borderShadowFlipAnimation.style.left    = positionX+modifier + "px";
	}
};

BPPageFlipAnimator.prototype.setBottomShadowOnOpenBook = function(cover) {
	var bottomLeftShadow = this.bottomLeftShadow;
	var bottomRightShadow = this.bottomRightShadow;
	if (cover) cover = cover.toLowerCase();
	if (cover === "front") {
		bottomLeftShadow.className = bottomLeftShadow.className.replace(" open", "");
		bottomLeftShadow.className = bottomLeftShadow.className.replace(" " + cover, "");
		bottomLeftShadow.className = bottomLeftShadow.className.replace(" closeFront", "");
		bottomRightShadow.className = bottomRightShadow.className.replace(" open", "");
		bottomRightShadow.className = bottomRightShadow.className.replace(" closeFront", "");
		bottomLeftShadow.className += " open " + cover;
		bottomRightShadow.className += " open " + cover;
		//centerCoverBackgroundCanvas.className = "centerCoverBackgroundCanvas open ";
		centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas open ";
	} else if (cover === "back") {
		bottomLeftShadow.className = bottomLeftShadow.className.replace(" open", "");
		bottomLeftShadow.className = bottomLeftShadow.className.replace(" lastCover", "");
		bottomRightShadow.className = bottomRightShadow.className.replace(" open", "");
		bottomRightShadow.className = this.bottomRightShadow.className.replace(" " + cover, "");
		bottomRightShadow.className = this.bottomRightShadow.className.replace(" lastCover", "");
		bottomLeftShadow.className += " open " + cover;
		bottomRightShadow.className += " open " + cover;
		centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas open ";
	} else {
		centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas open";
	}
};

BPPageFlipAnimator.prototype.setBottomShadowOnCloseBook = function(cover) {
	var bottomLeftShadow = this.bottomLeftShadow;
	var bottomRightShadow = this.bottomRightShadow;

	if (cover === "front") {
		bottomLeftShadow.className = "bottomLeftShadow closeFront";
		bottomRightShadow.className = "bottomRightShadow closeFront";
	} else if (cover === "back") {
		bottomRightShadow.className = "bottomRightShadow lastCover";
		bottomLeftShadow.className = "bottomLeftShadow lastCover";
	}
}
