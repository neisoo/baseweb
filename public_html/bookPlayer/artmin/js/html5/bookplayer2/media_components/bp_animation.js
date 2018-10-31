function BPAnimation(animationJSONInfo)
{
    this.animationId     = animationJSONInfo["id"];
    this.positionX       = animationJSONInfo["x"];
    this.positionY       = animationJSONInfo["y"];
    this.height          = animationJSONInfo["height"];
    this.width           = animationJSONInfo["width"];
    this.playOnPosition  = parseFloat(animationJSONInfo["playpos"]);
    this.duration        = parseFloat(animationJSONInfo["duration"]);
    this.playOnHover     = animationJSONInfo["playOnHover"];
    this.playOnClick     = animationJSONInfo["playOnClick"];
    this.loop            = animationJSONInfo["loop"];
    this.playArea        = this.playOnPosition + this.duration;
    this.position        = 0;
    this.isPlaying       = false;
    this.animationPlayer = null;
    this.container       = null;
    this.isBookPlaying   = false;
    this.isHidden        = true;
    this.previousFrame   = 0;

    this.onForcePauseAnimationCallBack = null;
    this.onLoadingCompleteCallback     = null;

    this.createContainer();
}

/*Create a div to contain the animation*/
BPAnimation.prototype.createContainer = function()
{
    this.container                = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.width    = this.width +'px';
    this.container.style.height   = this.height + 'px';
    this.container.className      += " forceCrispyRender";

    this.container.id             = this.animationId + "_" + Math.round(Math.random()*200);


};

/*Load the animation using the mediaManager*/
BPAnimation.prototype.loadAnimation = function(onLoadingCompleteCallback)
{
    this.onLoadingCompleteCallback = onLoadingCompleteCallback;
    var context = this;
    var shouldLoop = !(context.playOnHover || context.playOnClick);
    this.animationPlayer = graphicPlayerManager.loadAnimation(this.container, this.animationId, false, shouldLoop);
    addListener(this.animationPlayer, 'animationReady', function(){
        context.onAnimationLoaded();
    });
};

/* When the animation was loaded, the listeners events will be attached */
/* Graphic player events: animationReady, animationStarted, animationStopped, animationRunning */
BPAnimation.prototype.onAnimationLoaded = function()
{
    var context = this;
    this.scaleX = this.height/this.animationPlayer.data.height;
    this.scaleY = this.width/this.animationPlayer.data.width;

    //scales animation
    this.container.firstChild.style.transform = "scaley("+this.scaleX+") "
                                                                + "scalex("+this.scaleY+")";
    this.container.firstChild.style.webkitTransform = "scaley("+this.scaleX+") "
                                                                + "scalex("+this.scaleY+")";
    this.container.firstChild.style.mozTransform = "scale("+this.scaleX+","+this.scaleY+")";
    this.container.firstChild.style.transformOrigin = "0 0";
    this.container.firstChild.style.webkitTransformOrigin = "0 0";
    this.container.firstChild.style.mozTransformOrigin = "0 0";

    if(this.onLoadingCompleteCallback != null)
    {
        this.onLoadingCompleteCallback(this);
        this.onLoadingCompleteCallback = null;
    }
};

BPAnimation.prototype.setAnimationClick = function()
{
    var context = this;
    this.container.onclick = function () {
        if(context.playOnClick && !book.isPlaying && !isPageDragging && !book.pageFlipAnimator.isAnimating){
            context.onForcePlayAnimation();
        }
    };
};

BPAnimation.prototype.setAnimationMouseOver = function()
{
    var context = this;
    this.container.onmousemove = function () {
        if(context.playOnHover && !book.isPlaying && !isPageDragging && !book.pageFlipAnimator.isAnimating){
            context.onForcePlayAnimation();
        }
    };
};


/* Append the animation inside of element (page)*/
BPAnimation.prototype.renderToCanvas = function(divContainer, isRightPageCanvas)
{
    var offset = isRightPageCanvas ? BookConstants.ANIMATIONS_RIGHT_OFFSET : BookConstants.ANIMATIONS_LEFT_OFFSET;
    this.container.style.left     = (this.positionX + offset.x) + 'px';
    this.container.style.top      = (this.positionY + offset.y) + 'px';
    this.container.style.zIndex   = 5;
    divContainer.appendChild(this.container);
    this.animationPlayer.gotoAndStop(1);//reset animation state
};

BPAnimation.prototype.removeFromCanvas = function (divContainer) {
    //legend says it is faster to add and remove a child than searching for the child before removing.
    divContainer.appendChild( this.container );
    divContainer.removeChild( this.container );
}

/* Display the animation*/
BPAnimation.prototype.showAnimation = function(position)
{
    if(position)
        this.setAnimFrame(position);
    this.container.style.display = "block";
    this.isHidden = false;
};

/* Hide the animation*/
BPAnimation.prototype.hideAnimation = function()
{
    if(this.animationPlayer != null && this.container.style.display != "none")
    {
        this.stopAnimation();
        this.container.style.display = "none";
        this.isHidden = true;
    }
};

/* when the user taps/clicks over the animation,this method will force that the animation plays*/
BPAnimation.prototype.onForcePlayAnimation = function()
{
    if(!this.animationPlayer.isPlaying && !book.pageFlipAnimator.isAnimating)
    {
        book.stopEventAnimations();
        book.stopAllAnimations();
        if(this.animationPlayer.currentFrame != 1)
            this.animationPlayer.gotoAndStop(1);
        this.animationPlayer.play();
    }
};

BPAnimation.prototype.playAnimation = function()
{
	if(this.animationPlayer != null && !this.playOnHover && !this.playOnClick){
		if(!this.isPlaying){
			this.animationPlayer.play();
			this.isPlaying = true;
		}
	}
};

BPAnimation.prototype.playAnimationFromPoint = function(startPoint)
{
    if(this.animationPlayer != null && !this.playOnHover && !this.playOnClick){
        if(!this.isPlaying){
            if(this.animationPlayer.currentFrame != parseInt(startPoint))
                this.animationPlayer.gotoAndStop( parseInt(startPoint) );
            this.isPlaying = true;
        }
    }
};

BPAnimation.prototype.setAnimFrame = function (position)
{

  //if(book.disablePageFlip){
    //if(book.isPlaying || book.isDraggingSlider || hud.progressSlider.isDragging)
    //{
        this.gotoPosition(position);
    //}
  //}
}

BPAnimation.prototype.gotoPosition = function (position) {
  var speedModifier = 1;
  if(book.audioProgress.isUsingSlowAudio)
    speedModifier =  BookConstants.SLOW_AUDIO_DURATION_PERCENTAGE;

    if(this.playOnHover || this.playOnClick)
        return; //do not set position if animation is click or hover
    if(position > (this.playArea * speedModifier)){
        this.pauseAnimation();
        this.updateAnimation(this.playArea * speedModifier);
        return;
    }

    var targetPosition = position - (this.playOnPosition * speedModifier);
    var targetFrame = (targetPosition * this.animationPlayer.frameRate);
    var firstTargetFrame = targetFrame;
    var realTotalFrames = this.animationPlayer.totalFrames;
    var animDuration = realTotalFrames/this.animationPlayer.frameRate;


    if(parseInt(position) <= parseInt(this.playOnPosition * speedModifier)){
      this.animationPlayer.gotoAndStop(1);
      return;
    }
    while(targetFrame > realTotalFrames){
        targetFrame -= realTotalFrames;
    };

    if(targetFrame < 1){
        targetFrame += realTotalFrames;
    }
    targetFrame = parseInt(targetFrame);

    if(targetFrame != this.animationPlayer.currentFrame){ //only calls gotoAndStop if frame is in fact different from current frame.
        this.animationPlayer.gotoAndStop( targetFrame  );
    }
}

BPAnimation.prototype.updateAnimation = function(position)
{

  var speedModifier = 1;
  if(book.audioProgress.isUsingSlowAudio)
    speedModifier = BookConstants.SLOW_AUDIO_DURATION_PERCENTAGE;
    position =  position *  speedModifier;
    if(this.animationPlayer != null ){
        if( position >= (this.playOnPosition *  speedModifier) && position <= ((this.playArea * speedModifier) - 0.12)  && !this.playOnHover && !this.playOnClick){
            //if(!this.animationPlayer.isPlaying && !this.playOnHover && !this.playOnClick) {
            if(!this.playOnHover && !this.playOnClick) {

                if(!this.animationPlayer.isPlaying) {//update animation current frame accordingly to book position
                    this.setAnimFrame(position);
                }
                if(book.isPlaying) { // automatic animations only play if book is playing
                    this.animationPlayer.play();
                }
            }
          //}
        }else {

            if(book.isPlaying) {
                this.animationPlayer.stop();
            }else{
                this.stopAnimation();
            }
            //if(position < this.playOnPosition && !this.playOnHover && !this.playOnClick && !this.animationPlayer.isPlaying) //resets animation if its before its play position
            //  this.animationPlayer.gotoAndStop(1);
            if(position >= ((this.playArea * speedModifier) - 0.12) && !(this.playOnClick || this.playOnHover)){

                this.pauseAnimation();
                this.setAnimFrame(this.playArea * speedModifier); //this should make the animation stay at its last frame
            }
               //this.animationPlayer.gotoAndStop(this.animationPlayer.totalFrames-1);
        }
    }
};

BPAnimation.prototype.pauseAnimation = function()
{
    if(this.animationPlayer != null) {
        this.animationPlayer.stop();
        this.isPlaying = false;
    }
};

BPAnimation.prototype.stopAnimation = function()
{
    if(this.animationPlayer != null) {
        if((this.playOnClick || this.playOnHover) && this.animationPlayer.currentFrame != 1) { //reset position ONLY if it's an event animation
            this.animationPlayer.gotoAndStop(1);
        } else {
            this.animationPlayer.stop();
        }
        this.isPlaying = false;
    }
};
