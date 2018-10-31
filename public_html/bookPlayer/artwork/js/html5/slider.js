
var activeSlider = null;

function Slider(idstub, lowx, hix) {

	this.lowx = lowx;
	this.hix = hix;
	this.position = 0;
	this.button = (typeof(idstub) == 'string') ? document.getElementById(idstub) : idstub;
	this.button.objref = this;
	this.sliding = false;
	this.blockedPosition = 1;
	if(this.button) {
		this.position = (this.button.offsetLeft - lowx)/(hix - lowx);
	
	//MAG: 07/01/2014: enabled touch functionality by assigning the appropiate event listeners. SliderMove and Slider	
		//addListener(this.button, 'mousedown', this.sliderStart, false);
	 
		addListener(document.body, (touchCapable) ? 'touchmove' : 'mousemove', this.sliderMove, false);
		addListener(document, (touchCapable) ? 'touchend' : 'mouseup', this.sliderEnd, false);
		addListener(this.button, (touchCapable) ? 'touchstart' : 'mousedown', this.sliderStart, false);
	}
}

Slider.prototype.setBlockedPosition = function(p){ 
	this.blockedPosition = Math.max(Math.min(1, p),0);
}

Slider.prototype.getBlockedPosition = function() { 
	return this.blockedPosition; 
}

Slider.prototype.setPosition = function(pos) {
	if(!isNaN(pos)) {
		pos = Math.max(0, Math.min(pos, 1));
		this.position = pos;
		this.button.style.left = (this.lowx + pos*(this.hix - this.lowx)) + 'px';
	}
}

Slider.prototype.sliderStart = function(event) {

	isMobileDevice = ((document.createTouch != null) ? true:false); 
	if(!isMobileDevice){
	
		var gamebutton;
		if (event.which == null){
    	    gamebutton = (event.button < 2) ? 'left' :
    	        ((event.button == 4) ? 'middle' : 'right');
    	}else{
    	    gamebutton = (event.which < 2) ? 'left' :
    	        ((event.which == 2) ? 'middle' : 'right');
    	}

		if(gamebutton == 'left'){
			//do nothing
		}else{
			return false;
		}
	}

	var obj = event.currentTarget.objref;
	activeSlider = obj;
	obj.sliding = true;

	var pos = pagePosition(event);

	obj.scrollx = pos.x - obj.button.offsetLeft;
	
	if (isAndroid) {
		event.preventDefault();
	}
	if(!isAndroid){ //MAG 07/02/2014: The following listeners work fine on the browsers since they allow the user keep sliding even if the pointer leaves the click area. However, on Android devices, adding the listeners make the sliding bar run slow/erratically
		addListener(document.body, (touchCapable) ? 'touchmove': 'mousemove',obj.sliderMove,false);
		addListener(document.body, (touchCapable) ? 'touchend': 'mouseup',obj.sliderEnd,true);
	}	
	addListener(obj.button, 'click',obj.sliderClick,false);

	obj.dispatchEvent('slideStart');
	cancelEvent(event);
}


Slider.prototype.sliderMove = function(event) {
	if (isAndroid) {
		event.preventDefault();
	}
	if(activeSlider) {

		var p = activeSlider.button.offsetLeft;
		var pos = pagePosition(event);

		activeSlider.button.style.left = Math.max(activeSlider.lowx, Math.min(pos.x - activeSlider.scrollx, activeSlider.hix))+'px';

		var newPosition = Math.min(activeSlider.getBlockedPosition(), (activeSlider.button.offsetLeft - activeSlider.lowx)/(activeSlider.hix - activeSlider.lowx));
		activeSlider.setPosition(newPosition);

		activeSlider.dispatchEvent('slideMove');
	}
}


Slider.prototype.sliderEnd = function(event) {
	var obj = activeSlider;
	if(obj) {
		obj.sliding = false;

		if(!isAndroid){ //MAG 07/02/2014: These listeners are not added on Android devices. See 'sliderStart' method for an explanation
			removeListener(document.body, (touchCapable) ? 'touchmove' :'mousemove',obj.sliderMove,false);
			removeListener(document.body, (touchCapable) ? 'touchend' : 'mouseup',obj.sliderEnd,false);
		}

		removeListener(obj.button, 'click',obj.sliderClick,false);

		obj.dispatchEvent('slideEnd');

		cancelEvent(event);
		activeSlider = null;
	}
}


Slider.prototype.sliderClick = function(event) {
	cancelEvent(event);
}

enableEventHandling(Slider);
