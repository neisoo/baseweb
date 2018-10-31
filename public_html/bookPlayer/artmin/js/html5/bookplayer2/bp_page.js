 function BPPage(pageJSONInfo, parentBook)
{
	this.pageJSONInfo      = pageJSONInfo;
	this.parentBook 	   = parentBook;
	this.textHighlight     = null;
	this.isCoverPage	   = false;
	this.isInsideCoverPage = false;
	this.renderUserName    = false;
	this.currentCanvas     = null;
	this.highLightCanvas   = null;
	this.textCanvas		   = null;
	this.image 			   = null;
	this.isImageLoaded 	   = false;
	this.isRightPageCanvas = false;
	this.pageIndex 		   = 0;

	this.animations 			= new Array();
	this.images 			    = new Array();
	this.loadedImagesLayerCount = 0;
	this.loadedAnimationCount   = 0;

	this.divContainer = null;

	this.onPauseAnimationCallBack = null;
	this.createUserNameContainer();
	this.initializeAnimations();
	this.initializeImages();
}

BPPage.prototype.createUserNameContainer = function()
{
	var attributes 		   = BookConstants.USERNAME_ATTRIBUTES;
	this.userNameContainer = document.createElement("DIV");
	var attibuteClass 	   = document.createAttribute("class");
  attibuteClass.value 	   = BookConstants.PAGE_CHILDREN_NAMES.username;
	var name 	           = BookSetting.getInstance().getUserName();
	this.userNameContainer.innerHTML = "<h2>"+name+"</h2>";
	this.userNameContainer.setAttributeNode(attibuteClass);
	this.userNameContainer.style.position 	= "absolute";
	this.userNameContainer.style.textAlign 	= "center";
	this.userNameContainer.style.margin     = "auto";
	this.userNameContainer.style.width    	= 400 +"px";
	this.userNameContainer.style.height   	= 50 + "px";
	this.userNameContainer.style.left     	= 8 +"px";
	this.userNameContainer.style.top   	  	= 228 +"px";
	this.userNameContainer.style.zIndex   	= 2;
	this.userNameContainer.style.color 	    = attributes.color;
	this.userNameContainer.style.fontWeight = attributes.font_weight;
	this.userNameContainer.style.fontSize   =  attributes.font_size;
};

BPPage.prototype.initializeAnimations = function()
{
	if(this.pageJSONInfo != null)
	{
		var animationsJSONInfo = this.pageJSONInfo["animations"];
		var context 	       = this;

		for(var i = 0; i < animationsJSONInfo.length; i++)
		{
			var newAnimation = new BPAnimation(animationsJSONInfo[i]);
			this.animations.push(newAnimation);
			newAnimation.loadAnimation(function(sender) { context.onAnimationLoadCompleted(sender);});
			newAnimation.onForcePauseAnimationCallBack = function(){ context.onForcePauseAnimations(); };
		}
	}
};

BPPage.prototype.initializeImages = function()
{
	if(this.pageJSONInfo != null)
	{
		var imagesJSONInfo = this.pageJSONInfo["images"];
		var context 	   = this;

    if (imagesJSONInfo) {
      for(var i = 0; i < imagesJSONInfo.length; i++)
      {
        var newImage = new BPImageLayer(imagesJSONInfo[i]);
        newImage.load(function(sender) { context.onImageLayerLoadCompleted(sender);});
        this.images.push(newImage);
      }
    }
	}
};

BPPage.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback = onLoadingCompleteCallback;

	if(this.pageJSONInfo != null)
	{
		var context 	   = this;
		this.textHighlight = new BPTextHighlight(this.pageJSONInfo, this);
		this.textHighlight.load( function(sender) { context.onTextHighlightLoadCompleted(sender); });

		var imageURL 		 = BookUtils.instance.getBookAssetPath(this.pageJSONInfo["image_path"]);
		this.image           = new Image();
		this.image.onload    = function() { context.onImageLoaded(); };
		this.image.onerror	 = function() { context.onImageLoadingFailed(); };
		this.image.src       = imageURL;
	}
	else
	{
		this.isImageLoaded = true;
		this.onLoadingCompleteCallback(this);
	}
};

BPPage.prototype.checkForLoadingCompleted = function()
{
	if(this.loadedAnimationCount == this.animations.length &&
		this.loadedImagesLayerCount == this.images.length &&
		this.isImageLoaded && this.textHighlight.isTextLoaded)
	{
		this.onLoadingCompleteCallback(this);
	}
};

BPPage.prototype.hasAnimation = function () {
	if(this.animations.length>0)
		return true;
	return false;
};

BPPage.prototype.onAnimationLoadCompleted = function()
{
	this.loadedAnimationCount++;
	this.checkForLoadingCompleted();
};

BPPage.prototype.onImageLayerLoadCompleted = function()
{
	this.loadedImagesLayerCount++;
	this.checkForLoadingCompleted();
};

BPPage.prototype.onTextHighlightLoadCompleted = function()
{
	this.checkForLoadingCompleted();
};

BPPage.prototype.onImageLoaded = function()
{
	this.initializeImage();
	this.isImageLoaded = true;
	this.checkForLoadingCompleted();
};


BPPage.prototype.initializeImage = function()
{
	this.image.draggable = false;
	this.image.unselectable = "on";

	this.image.style.position = "absolute";
	this.image.width          = BookConstants.PAGE_IMAGE_SIZE.w;
	this.image.height   	  = BookConstants.PAGE_IMAGE_SIZE.h;
	this.image.style.zIndex   = 1;

	var attibuteClass 	   = document.createAttribute("class");
  attibuteClass.value 	   = BookConstants.PAGE_CHILDREN_NAMES.image;
	this.image.setAttributeNode(attibuteClass);
};

BPPage.prototype.onImageLoadingFailed = function()
{
	console.log("image at path = '" + this.image.src + "'' could not be loaded");
	this.onImageLoaded();
};

//Renders the page including the cover and shadows
BPPage.prototype.renderToCanvas = function(canvas, divContainer, isRightPageCanvas, ignoreCover)
{
	this.currentCanvas 	   = canvas;
	this.divContainer 	   = divContainer;
	this.isRightPageCanvas = isRightPageCanvas;
	this.renderCover(canvas, isRightPageCanvas);

	if(this.isCoverPage){
		this.renderCoverToCanvas(canvas, isRightPageCanvas);
	}

	if(!ignoreCover){
		this.renderBorders(canvas, isRightPageCanvas);
	}
	this.renderPageToCanvas(divContainer, isRightPageCanvas);


};

BPPage.prototype.forcedRenderToCanvas = function(canvas, divContainer, isRightPageCanvas)
{
	this.renderCoverToCanvas(canvas, isRightPageCanvas);
	this.renderBorders(canvas, isRightPageCanvas, true);
};

BPPage.prototype.flagAnimationsToHide = function () {
	for(var i = 0; i < this.animations.length; i++)
		book.animations.push(this.animations[i]); //used to hide animations on flip.
};

//Renders the page image, text and user name
BPPage.prototype.renderPageToCanvas = function(divContainer, isRightPageCanvas)
{
	this.renderPageImage(divContainer, isRightPageCanvas);

	for(var i = 0; i < this.animations.length; i++)
		this.animations[i].renderToCanvas(divContainer, isRightPageCanvas);

	for(var i = 0; i < this.images.length; i++)
		this.images[i].renderToCanvas(divContainer, isRightPageCanvas);

	if(this.textHighlight != null)
		this.textHighlight.renderToCanvas(divContainer, false);

	this.renderUserNameToCanvas(divContainer);
};

BPPage.prototype.renderPageImage = function(divContainer, isRightPageCanvas)
{
	BookUtils.instance.removeChildByClass(divContainer, BookConstants.PAGE_CHILDREN_NAMES.image);

	if(this.isCoverPage)
	{
		var coverImageRect = isRightPageCanvas ? BookConstants.PAGE_COVER_IMAGE_RIGHT : BookConstants.PAGE_COVER_IMAGE_LEFT;
		if(this.image != null)
		{
			var rightImagePixelModifier = isRightPageCanvas ? 0 : 3; //prevents page leak on back cover
			this.image.style.left 		= Math.round(coverImageRect.x) + "px";
			this.image.style.top  		= coverImageRect.y + "px";
			this.image.width      		= coverImageRect.w + rightImagePixelModifier;
			this.image.height     		= coverImageRect.h;
			divContainer.appendChild(this.image);
		}
	}
	else
	{
		var pageImagePosition 		= isRightPageCanvas ? BookConstants.PAGE_IMAGE_RIGHT_POSITION : BookConstants.PAGE_IMAGE_LEFT_POSITION;
		var rightImagePixelModifier = isRightPageCanvas ? -1 : 0; //QAV-2762 - this fixes the white line between pages
		this.image.style.left 		= pageImagePosition.x+rightImagePixelModifier + "px";
		this.image.style.top  		= pageImagePosition.y + "px";
		this.image.width      		= BookConstants.PAGE_IMAGE_SIZE.w;
		this.image.height     		= BookConstants.PAGE_IMAGE_SIZE.h;
		divContainer.appendChild(this.image);
	}

};

BPPage.prototype.firstUpdateHighLight = function( position)
{
	if(this.textHighlight != null)
	{
		this.textHighlight.audioPosition = position;
		this.textHighlight.updateHighLight(this.divContainer);
	}
};

BPPage.prototype.updateHighLight = function( position)
{

	if(this.textHighlight != null)
	{
		this.textHighlight.audioPosition = position;
		this.textHighlight.updateHighLight(this.divContainer);
	}
};

BPPage.prototype.updateAnimations = function(position)
{
	for(var i = 0; i < this.animations.length; i++)
	{
		if(this.animations[i].isHidden)
			this.animations[i].showAnimation();
		this.animations[i].updateAnimation(position);
	}
};


BPPage.prototype.showAnimations = function(position)
{
	for(var i = 0; i < this.animations.length; i++)
	{
		if(!this.animations[i].playOnHover && !this.animations[i].playOnClick){
			if(this.animations[i].playArea <=  position){
				this.animations[i].showAnimation(0);
				this.animations[i].isBookPlaying = true;
			}else{
				this.animations[i].showAnimation(position);
				this.animations[i].isBookPlaying = true;
			}
		}else{
			this.animations[i].showAnimation(0);
			this.animations[i].isBookPlaying = true;
		}
	}
};

BPPage.prototype.AddOnClickAnimation = function(){

	for(var i = 0; i < this.animations.length; i++)
	{
		if(this.animations[i].playOnClick){
			this.animations[i].setAnimationClick();
		}

		if(this.animations[i].playOnHover){
			this.animations[i].setAnimationMouseOver();
		}
	}

};

BPPage.prototype.removeOnClickAnimation = function(){

    for(var i = 0; i < this.animations.length; i++)
	{
		if(this.animations[i].playOnClick){
			this.animations[i].container.onclick = null;
		}

		if(this.animations[i].playOnHover){
			this.animations[i].container.onmousemove = null;
		}
	}
};


BPPage.prototype.stopAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
		this.animations[i].stopAnimation();
};

BPPage.prototype.hideAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
		this.animations[i].hideAnimation();

	for(var i = 0; i < this.images.length; i++)
		this.images[i].hideImage();
};

BPPage.prototype.playAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
	{
		this.animations[i].playAnimation();
		this.animations[i].isBookPlaying = true;
	}
};

BPPage.prototype.playAnimationsFromPoint = function(startPoint)
{
	for(var i = 0; i < this.animations.length; i++)
	{
		this.animations[i].playAnimationFromPoint(startPoint);
		this.animations[i].isBookPlaying = true;
	}
};

BPPage.prototype.UpdateAnimationsFromPoint = function(audioProgress)
{
	for(var i = 0; i < this.animations.length; i++)
	{
		this.animations[i].updateAnimation(audioProgress);
		//this.animations[i].isBookPlaying = true;
	}
};

BPPage.prototype.ForceResetAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
	{
		this.animations[i].animationPlayer.gotoAndStop(1);
		//this.animations[i].isBookPlaying = true;
	}
};




BPPage.prototype.onForcePauseAnimations = function()
{
	if(this.onPauseAnimationCallBack!=null)
		this.onPauseAnimationCallBack();
};

BPPage.prototype.pauseAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
	{
		this.animations[i].stopAnimation();
		this.animations[i].isBookPlaying = false;
	}
};

BPPage.prototype.stopEventAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
	{
		if(this.animations[i].playOnHover || this.animations[i].playOnClick){
			this.animations[i].animationPlayer.gotoAndStop(1);
			this.animations[i].animationPlayer.stop();
			this.animations[i].isBookPlaying = false;
		}
	}
};


BPPage.prototype.updatePage = function(position)
{
	this.updateHighLight(position);

	this.updateAnimations(position);
};

BPPage.prototype.renderBorders = function(canvas, isRightPageCanvas, dontClear)
{
	var ctx = canvas.getContext("2d");

	if(!dontClear)
		ctx.clearRect(0,0,1200,1200);
	return; //we won't be rendering borders like this anymore
	if(this.isCoverPage)
		return;

	var bottomBorder = isRightPageCanvas ? rightBottomBorderCanvas : leftBottomBorderCanvas;
	var sideBorder = isRightPageCanvas ? rightSideBorderCanvas : leftSideBorderCanvas;
	var borderPosition = isRightPageCanvas ? {"x":pageImageSize.w-1.5, "y":pageImageSize.h+23} : {"x":11.5, "y":pageImageSize.h+23};
	var bottomX = isRightPageCanvas ? -2 : 12.5;

	ctx.drawImage(bottomBorder, bottomX, borderPosition.y);
	ctx.drawImage(sideBorder,borderPosition.x, 12);
};

BPPage.prototype.renderBordersCover = function(canvas, isRightPageCanvas, dontClear)
{
	var ctx = canvas.getContext("2d");
	if(!dontClear)
		ctx.clearRect(0,0,1200,1200);
	return;

	var bottomBorder = isRightPageCanvas ? rightBottomBorderCanvas : leftBottomBorderCanvas;
	var sideBorder = isRightPageCanvas ? rightSideBorderCanvas : leftSideBorderCanvas;
	var borderPosition = isRightPageCanvas ? {"x":pageImageSize.w + 1, "y":pageImageSize.h+23} : {"x":13.0, "y":pageImageSize.h+23};
	var bottomX = isRightPageCanvas ? -2 : 12.5;
	var width = isRightPageCanvas ? rightSideBorderCanvas.width - 3.0 : leftSideBorderCanvas.width - 2.5;

	ctx.drawImage(bottomBorder, bottomX, borderPosition.y + 2);
	ctx.drawImage(sideBorder, borderPosition.x  + 1, 5, width, sideBorder.height + 2);
};


BPPage.prototype.renderCover = function (canvas, isRightCover){ //canvas, isRightCover
	book.renderCover(isRightCover);
};


BPPage.prototype.renderCoverToCanvas = function (canvas, isRightCover){ //canvas, isRightPageCanvas

  var ctx = canvas.getContext("2d");
  var image = isRightCover ? book.generalUI.coverBackgroundImage : book.generalUI.coverBackgroundImageFlipped;
  var xCoverDiff = 0;
  var wCover= 0;

  if(this.isCoverPage){
    xCoverDiff = isRightCover ? -11 : 10.5;
  }else{

  	 xCoverDiff = isRightCover ? 0 : -8 ;
  }

  wCover = 390;
  ctx.clearRect(0,0, 1200, 1200);
  ctx.drawImage(image, 10+xCoverDiff, 9, wCover, 540);
};

BPPage.prototype.renderUserNameToCanvas = function(divContainer)
{
	if(this.renderUserName)
	{
		divContainer.appendChild(this.userNameContainer);
	}
	else
	{
		BookUtils.instance.removeChildByClass(divContainer, BookConstants.PAGE_CHILDREN_NAMES.username);
	}
};
