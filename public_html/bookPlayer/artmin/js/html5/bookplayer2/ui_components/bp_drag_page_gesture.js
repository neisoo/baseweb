function BPDragPageGesture(element)
{
    this.element             = element;
    this.min 			     = 0;

    this.initialPageX        = 0;
    this.initialProgress     = 0;
    this.progress            = 0;
    this.startDrag 		     = false;
    this.isDragging 		 = false;
    this.isDraggingRightPage = false;
    this.touchIdentifier     = 0;

    this.isDisabled  = false;
    this.hitAreaClicked = false;

    this.onStartDrag	    = null;
    this.onEndDrag	        = null;
    this.onProgressChanged  = null;

    var context 			= this;
    this.mouseMoveFunction  = function(event) { context.onMouseMove(event); };
    this.touchMoveFunction  = function(event) { context.onTouchMove(event); };
    this.mouseUpFunction    = function(event) { context.onMouseUp(event); };
    this.touchEndedFunction = function(event) { context.onTouchEnd(event); };

    this.initialize();
}

BPDragPageGesture.prototype.initialize = function()
{
    var context = this;

    if(touchCapable)
        this.element.addEventListener('touchstart', function(event) { context.onTouchStart(event); });
    else
        this.element.addEventListener('mousedown',  function(event) { context.onMouseDown(event);  });
};


var isCoolDown = false;

BPDragPageGesture.prototype.onMouseDown = function(event)
{
	
	if(isCoolDown)
		return;
	
	window.setTimeout(function () {
		isCoolDown = false;
	}, 250);

	isCoolDown = true;
    book.isMouseUpEvent = false;
    if(!this.startDrag && !this.isDisabled)
        this.onStartDragging(event.pageX, event.pageY);
};

BPDragPageGesture.prototype.onTouchStart = function(event)
{
    event.preventDefault(); //Workaround to fix issues on mobile devices, https://code.google.com/p/android/issues/detail?id=5491
    event.stopPropagation();

    if(!this.startDrag && !this.isDisabled)
    {
        this.touchIdentifier = event.changedTouches[0].identifier;
        this.onStartDragging(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
    }
};

BPDragPageGesture.prototype.onStartDragging = function(pageX, pageY)
{
    if(touchCapable)
    {
        document.addEventListener('touchmove', this.touchMoveFunction);
        document.addEventListener('touchend', this.touchEndedFunction);
        document.addEventListener('touchcancel', this.touchEndedFunction);
    }
    else
    {
        document.addEventListener('mousemove', this.mouseMoveFunction);
        document.addEventListener('mouseup',  this.mouseUpFunction);
    }

    var elemRect = this.element.getBoundingClientRect();
    this.isDraggingRightPage = (pageX - elemRect.left) >= (elemRect.width/2);
    this.startDrag = true;
    this.hitAreaClicked = false;
    this.progress = 0;
    this.initialProgress = 0;
    this.initialProgress = this.calculateProgress(pageX);

    this.initialPageX = this.calculateRealPageX(pageX);

    if(this.onStartDrag != null)
        this.onStartDrag(this);

};

BPDragPageGesture.prototype.onMouseUp = function(event)
{
    book.isMouseUpEvent = true;
    window.setTimeout(function () { book.isMouseUpEvent = false }, 60);
    this.onStopDragging(event.pageX, event.pageY);
};

BPDragPageGesture.prototype.onTouchEnd = function(event)
{
    event.preventDefault(); //Workaround to fix issues on mobile devices, https://code.google.com/p/android/issues/detail?id=5491
    event.stopPropagation();

    if(this.touchIdentifier == event.changedTouches[0].identifier)
        this.onStopDragging(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
};

BPDragPageGesture.prototype.onStopDragging = function(pageX, pageY)
{
   this.removeListeners();

    if(this.startDrag)
    {
        this.startDrag = false;
        this.isHitAreaClicked(pageX);

        if(this.onEndDrag != null)
            this.onEndDrag(this);
    }
};

BPDragPageGesture.prototype.onMouseMove = function(event)
{
    this.onDragging(event.pageX, event.pageY);
};

BPDragPageGesture.prototype.onTouchMove = function(event)
{
    event.preventDefault(); //Workaround to fix issues on mobile devices, https://code.google.com/p/android/issues/detail?id=5491
    event.stopPropagation();
    if(this.touchIdentifier == event.changedTouches[0].identifier)
     this.onDragging(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
};

BPDragPageGesture.prototype.onDragging = function(pageX, pageY)
{
    if(this.startDrag)
    {
        this.isDragging = true;

        var x = this.calculateRealPageX(pageX);
        var progress = this.calculateRealProgress(x);
        progress = Math.max(0, Math.min((progress), 1));

        this.progress = progress;

        if(this.onProgressChanged != null)
            this.onProgressChanged(this);
    }
};

BPDragPageGesture.prototype.removeListeners = function()
{
    if(touchCapable)
    {
        document.removeEventListener('touchmove', this.touchMoveFunction);
        document.removeEventListener('touchend', this.touchEndedFunction);
        document.removeEventListener('touchcancel', this.touchEndedFunction);
    }
    else
    {
        document.removeEventListener('mousemove', this.mouseMoveFunction);
        document.removeEventListener('mouseup',  this.mouseUpFunction);
    }
};

BPDragPageGesture.prototype.calculateRealPageX = function(pageX)
{
    var elemRect = this.element.getBoundingClientRect();
    var x = pageX - elemRect.left;
    x = this.isDraggingRightPage ? elemRect.width - x : x;
    return x;
};

BPDragPageGesture.prototype.calculateRealProgress = function(pageX)
{
    var elemRect = this.element.getBoundingClientRect();
    var width = elemRect.width * 0.80;
    var progress = (pageX - this.initialPageX) / (width - this.initialPageX);
    return progress;
};

BPDragPageGesture.prototype.calculateProgress = function(pageX)
{
    var elemRect = this.element.getBoundingClientRect();
    var x 		 = pageX - elemRect.left;
    var progress = (x - this.min) / (elemRect.width - this.min);
    progress = this.isDraggingRightPage ?  (1 - progress) : progress;

    return progress;
};

BPDragPageGesture.prototype.isHitAreaClicked = function(pageX)
{
    var elemRect = this.element.getBoundingClientRect();
    var x 		 = Math.max(this.min, Math.min(pageX - elemRect.left, elemRect.width));

    if(x < BookConstants.HIT_AREA_OUTER_EDGE_OF_PAGE || (elemRect.width - x) < BookConstants.HIT_AREA_OUTER_EDGE_OF_PAGE)
        this.hitAreaClicked = true;
};
