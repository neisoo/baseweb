
var GrowButtonList = new Array();

function GrowButton(div) {

	if(typeof(div) == 'string') div = document.getElementById(div);

	this.div = div;
	div.objref = this;

	// init button state to up
	div.style.transform = "scale(1,1)";
	div.style.webkitTransform = "scale(1,1)";
	div.style.msTransform = "scale(1,1)";
	
	if(MOBILE) {
		addListener(div, "touchstart", this.clickDownEvent);
		addListener(document.body, "touchend", this.clickUpEvent);
	}else{
		addListener(div, "mousedown", this.clickDownEvent);
		addListener(document.body, "mouseup", this.clickUpEvent);
	}
}

GrowButton.prototype.clickDownEvent = function(e) {
	var div = getEventTarget(e);

	// prevent dragging of images
	if(!MOBILE){
		e.preventDefault();
	}

	// push down the button
	div.style.transform = "scale(1.05,1.05)";
	div.style.webkitTransform = "scale(1.05,1.05)";
	div.style.msTransform = "scale(1.05,1.05)";

	GrowButtonList.push(div);
}

GrowButton.prototype.clickUpEvent = function(e) {

	// get click release target
	if(MOBILE) {
		var eventPos = pagePosition(e);
		var x = eventPos.x;//e.changedTouches.item(0).pageX/pageScale;//diff for android 1.15.14 DAG
		var y = eventPos.y;//e.changedTouches.item(0).pageY/pageScale;//diff for android 1.15.14 DAG
		var div = document.elementFromPoint(x,y);
	} else {
		var div = e.target;
	}

	// check if a parent of the target is this button
	// needed in case the up event is over an element within the original div
	while (GrowButtonList.indexOf(div) == -1 && div){
		div = div.parentNode;
	}

	if(div == null) div = GrowButtonList.pop();
	else GrowButtonList.splice(GrowButtonList.indexOf(div),1);

	if(div) {
		// lift button back up regardless
		div.style.transform = "scale(1,1)";
		div.style.webkitTransform = "scale(1,1)";
		div.style.msTransform = "scale(1,1)";
	}
}

