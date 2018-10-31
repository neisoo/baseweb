var BookUtils =
(
	function()
	{
    var _instance;

    if (typeof _instance == 'undefined') {
      _instance = new BPBookUtils();
    }

	  return {
      instance: _instance
    };
	}
)();

function BPBookUtils(){}
BPBookUtils.prototype.initialize = function(cid, bookAssetsRootPath)
{
	this.cid				= cid;
	this.bookAssetsRootPath = bookAssetsRootPath;

	this.initializeRequestAnimationFrame();
};

BPBookUtils.prototype.initializeRequestAnimationFrame = function()
{
	if(!window.requestAnimationFrame)
	{
    	if(window.mozRequestAnimationFrame)
    		window.requestAnimationFrame = window.mozRequestAnimationFrame;
   		else if(window.webkitRequestAnimationFrame)
    		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    	else if(window.msRequestAnimationFrame)
    		window.requestAnimationFrame = window.msRequestAnimationFrame;
   	 	else if(window.oRequestAnimationFrame)
    		window.requestAnimationFrame = window.oRequestAnimationFrame;
	}
};

BPBookUtils.prototype.getBookAssetPath = function(relativePath)
{
	if(isPreview)
		return this.bookAssetsRootPath + "/books_preview/" + this.cid + relativePath;
	return isDev ? this.bookAssetsRootPath + "/books_dev/" + this.cid + relativePath : this.bookAssetsRootPath + relativePath;
};

BPBookUtils.prototype.getGeneralBookAssetPath = function(relativePath)
{
	if(isPreview)
		return this.bookAssetsRootPath + "/html5/books_preview/" + relativePath ;

	return isDev ? this.bookAssetsRootPath + "/html5/books_dev/" + relativePath : this.bookAssetsRootPath + relativePath;
};

BPBookUtils.prototype.convertHexToRGBA = function(hex,brightness)
{
	var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);

    return "rgba("+r+","+g+","+b+","+brightness+")";
};

//Interpolates from "p0" to "p1" in "t" while "t" is a value from 0 to 1
BPBookUtils.prototype.linearBezier = function(p0, p1, t)
{
	return p0 + t  * ( p1 - p0 );
};

//Determinates the interpolation time (t) for "n" while "n" is a value between "p0" to "p1", return value will be between 0 to 1
BPBookUtils.prototype.inverseLinearBezier = function(n, p0,  p1)
{
	return (n - p0) / (p1 - p0);
};

BPBookUtils.prototype.applyScaleToElement = function(element, scaleX, scaleY)
{

	element.style.webkitTransform = " scale("+ scaleX +", "+ scaleY +")";// Compatibility with Chrome, Safari
	element.style.MozTransform    = " scale("+ scaleX +", "+ scaleY + ")";// Compatibility with Firefox
	element.style.msTransform 	  = " scale("+ scaleX +", "+ scaleY +")";// Compatibility with Opera
	element.style.transform       = " scale("+ scaleX +", "+ scaleY +")";// Standard
};


BPBookUtils.prototype.applyTrasformCoverElement = function(element, scaleX, scaleY,direction,close,progress)
{
	var skew = 0;
	var closedOrOpen;
	if(close){
	    closedOrOpen = 1 - progress;
	}else{
		closedOrOpen = progress;
	}

	if(direction == "Left"){
     	if(!close){
     	if(progress > 0.5)
	 	skew = (closedOrOpen * 2) * -1;
	 	}
	 	else{
	 	if(progress < 0.5)
	 	skew = closedOrOpen * 2;
		}
	}else{
	 	if(close){
	 		if(progress < 0.5)
	 		skew = (closedOrOpen * 2) * -1;
	 	}
	 	else{
	 		if(progress > 0.5)
	 		skew = closedOrOpen * 2;
	 	}
	}

	element.style.webkitTransform = " scale("+ scaleX +", "+ scaleY +") skew(0deg," + skew + "deg)";// Compatibility with Chrome, Safari
	element.style.MozTransform    = " scale("+ scaleX +", "+ scaleY +") skew(0deg," + skew + "deg)";// Compatibility with Chrome, Safari
	element.style.msTransform 	  = " scale("+ scaleX +", "+ scaleY +") skew(0deg," + skew + "deg)";// Compatibility with Chrome, Safari
	element.style.transform       = " scale("+ scaleX +", "+ scaleY +") skew(0deg," + skew + "deg)";// Compatibility with Chrome, Safari

};

BPBookUtils.prototype.applyTrasformFinishCoverElement = function(element,_skew)
{
	if(!element)
		return;
	element.style.webkitTransform = "skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.MozTransform    = "skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.msTransform 	  = "skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.transform       = "skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
};



BPBookUtils.prototype.applyTrasformBeforeCoverElement = function(element,Skew)
{
	if(!element)
		return;

	element.style.webkitTransform = "skew(0deg," + Skew + "deg)";// Compatibility with Chrome, Safari
	element.style.MozTransform    = "skew(0deg," + Skew + "deg)";// Compatibility with Chrome, Safari
	element.style.msTransform 	  = "skew(0deg," + Skew + "deg)";// Compatibility with Chrome, Safari
	element.style.transform       = "skew(0deg," + Skew + "deg)";// Compatibility with Chrome, Safari


};

BPBookUtils.prototype.applyTrasformCoverCenterElement = function(element,direction,progress,skew)
{
	if(!element)
		return;

	var closedOrOpen;
	closedOrOpen = progress;

	var _skew = 0;
	if(direction == "FirstBeforeCover"){
		_skew = closedOrOpen * skew;
	}else{
	 	_skew = (closedOrOpen * skew) * -1;
	}


	element.style.webkitTransform = " skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.MozTransform    = " skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.msTransform 	  = " skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.transform       = " skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari

};

BPBookUtils.prototype.applytransformOrigin = function(element, position) //position: "left" or "right"
{
	element.style.webkitTransformOrigin =  position;// Compatibility with Chrome, Safari
	element.style.MozTransformOrigin    =  position;// Compatibility with Firefox
	element.style.msTtansformOrigin   	=  position;// Compatibility with Opera
	element.style.transformOrigin       =  position;// Standard
};

BPBookUtils.prototype.applyOverflowToParents = function(element, overflowProperty) // overflowProperty: hidden, visible, scroll
{
	var parent = element.parentElement;

	while(parent!=null)
	{
		parent.style.overflow = overflowProperty;
		parent = parent.parentElement;
	}
};

BPBookUtils.prototype.getChildByClass = function(parent, childName)
{
	var children = parent.children;

	for(var i = 0; i < children.length; i++)
	{
		var currentChild = children[i];

		if(currentChild.getAttribute("class") == childName)
			return currentChild;
	}

	return null;
};


BPBookUtils.prototype.removeChildByClass = function(container, childClass)
{

	var child = this.getChildByClass(container, childClass) ;

	if(child!=null)
		container.removeChild(child);
};


BPBookUtils.prototype.renderRoundRectFill = function(canvas, rect, radius, strokeStyle, fillStyle)
{
	var ctx 	    = canvas.getContext("2d");
	ctx.strokeStyle = strokeStyle;
	ctx.fillStyle   = fillStyle;

	ctx.beginPath();
	ctx.moveTo(rect.x + radius, rect.y);
	ctx.lineTo(rect.x + rect.w - radius, rect.y);
	ctx.quadraticCurveTo(rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + radius);
	ctx.lineTo(rect.x + rect.w, rect.y + rect.h - radius);
	ctx.quadraticCurveTo(rect.x + rect.w, rect.y + rect.h, rect.x + rect.w - radius, rect.y + rect.h);
	ctx.lineTo(rect.x + radius, rect.y + rect.h);
	ctx.quadraticCurveTo(rect.x, rect.y + rect.h, rect.x, rect.y + rect.h - radius);
	ctx.lineTo(rect.x, rect.y + radius);
	ctx.quadraticCurveTo(rect.x, rect.y, rect.x + radius, rect.y);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
};


BPBookUtils.prototype.getTintedImage = function(_targetImage, _targetColor, _forceAlpha) { //image and HEX color
    var x; //drawing context
    var fg;
    var buffer;
    if(_targetColor.indexOf("#") == -1) //the book doesn"t save the # on book color
    	_targetColor = "#"+_targetColor;
    var drawingCanvas = document.createElement("canvas");
    var fg = _targetImage;
    drawingCanvas.width = fg.width;
    drawingCanvas.height = fg.height;
    // Check the element is in the DOM and the browser supports canvas
    if(drawingCanvas && drawingCanvas.getContext) {
        x = drawingCanvas.getContext("2d");
        width = x.canvas.width;
        height = x.canvas.height;
        // create offscreen buffer,
        buffer = document.createElement("canvas");
        buffer.width = fg.width;
        buffer.height = fg.height;
        bx = buffer.getContext("2d");

        // tint buffer with tint color
        bx.fillStyle = _targetColor;
        bx.fillRect(0,0,buffer.width,buffer.height);
        bx.globalCompositeOperation = "destination-atop";
        bx.drawImage(fg,0,0);
        // to tint the image, draw it first
        x.drawImage(fg,0,0);
        //then set the global alpha to the amound that you want to tint it, and draw the buffer directly on top of it.
        if(!_forceAlpha)
        	_forceAlpha = 1;
        x.drawImage(buffer,0,0, fg.width, fg.height);
    }
    var returnImage = new Image();
    returnImage.src = drawingCanvas.toDataURL();
    return returnImage; //returns canvas for you to draw.
};

BPBookUtils.prototype.paintShadow = function (_originalImage, _targetShadow) {
	var buffer = document.createElement("canvas");

	buffer.width = _originalImage.width;
	buffer.height = _originalImage.height;
	ctx = buffer.getContext("2d");
	ctx.drawImage(_originalImage, 0,0);
	ctx.drawImage(_targetShadow, 0,0);

	var returnImage = new Image();
    returnImage.src = buffer.toDataURL();

    return returnImage; //returns canvas for you to draw.
};

BPBookUtils.prototype.generateTintImage = function( img, rgbks, red, green, blue ) {
    var buff = document.createElement("canvas");
    buff.width  = img.width;
    buff.height = img.height;

    var ctx  = buff.getContext("2d");

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage( rgbks[3], 0, 0 );

    ctx.globalCompositeOperation = "lighter";
    if ( red > 0 ) {
        ctx.globalAlpha = red   / 255.0;
        ctx.drawImage( rgbks[0], 0, 0 );
    }
    if ( green > 0 ) {
        ctx.globalAlpha = green / 255.0;
        ctx.drawImage( rgbks[1], 0, 0 );
    }
    if ( blue > 0 ) {
        ctx.globalAlpha = blue  / 255.0;
        ctx.drawImage( rgbks[2], 0, 0 );
    }

    return buff;
};

BPBookUtils.prototype.generateRGBKs = function ( img ) {
	var w = img.width;
	var h = img.height;
	var rgbks = [];

	var canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;

	var ctx = canvas.getContext("2d");
	ctx.drawImage( img, 0, 0 );

	var pixels = ctx.getImageData( 0, 0, w, h ).data;

	for ( var rgbI = 0; rgbI < 4; rgbI++ ) {
	    var canvas = document.createElement("canvas");
	    canvas.width  = w;
	    canvas.height = h;

	    var ctx = canvas.getContext("2d");
	    ctx.drawImage( img, 0, 0 );
	    var to = ctx.getImageData( 0, 0, w, h );
	    var toData = to.data;

	    for (
	            var i = 0, len = pixels.length;
	            i < len;
	            i += 4
	    ) {
	        toData[i  ] = (rgbI === 0) ? pixels[i  ] : 0;
	        toData[i+1] = (rgbI === 1) ? pixels[i+1] : 0;
	        toData[i+2] = (rgbI === 2) ? pixels[i+2] : 0;
	        toData[i+3] =                pixels[i+3]    ;
	    }

	    ctx.putImageData( to, 0, 0 );

	    var imgComp = new Image();
	    imgComp.src = canvas.toDataURL();

	    rgbks.push( imgComp );
	}

	return rgbks;
};

//Determinates if a value is approximately another value using a tolerance
BPBookUtils.prototype.approximately = function(value1, value2, tolerance)
{
	var difference    = value1 - value2;
	return Math.abs(difference) <= tolerance;
};

BPBookUtils.prototype.isIOS = function()
{
	return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
};

BPBookUtils.prototype.isAndroid = function()
{
	return navigator.userAgent.match(/(Android)/g);
};

BPBookUtils.prototype.truncateDecimals = function (number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

    return truncatedNum / multiplier;
};
