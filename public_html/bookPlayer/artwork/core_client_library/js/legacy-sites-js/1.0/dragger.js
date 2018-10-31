
var activeDragger = null;
var touchCapable = isTouchDevice();

function Dragger(dragger, hitarea, boundingBox, options) {
	var box = new Object();
	if(boundingBox == undefined){
		box.x = 0;
		box.y = 0;
		box.wd = 900;
		box.ht = 650;
	}else{
	//objects should pass in x,y but they aren't right now.
		box.x = boundingBox.x;
		box.y = boundingBox.y;
		box.wd = boundingBox.wd;
		box.ht = boundingBox.ht;
	}
	this.mousepos;
	this.eventPos;
	this.enable;
	this.boundingBox = box;
	this.y;
	this.x;

	// [Caigoy,021617,QA-13808] Make IE hamster item rotation hack optional
	this.options = options || {};
	this.options.ieRotationHack = typeof this.options.ieRotationHack !== 'undefined' 
		? this.options.ieRotationHack 
		: true;
	
	if(typeof(dragger) == 'string') dragger = document.getElementById(dragger);
		this.frame = dragger;
	
	if(typeof(hitarea) == 'string') hitarea = document.getElementById(hitarea);
		this.hitarea = hitarea;
	
	if(this.hitarea == undefined) {	
		for(var i=0;i<this.frame.childNodes.length;i++) {
			if(this.frame.childNodes[i].id == 'dragger_handle') this.hitarea = this.frame.childNodes[i];
		}
	}
	
	if(this.hitarea == undefined) this.hitarea = this.frame;
	var objid = assignObjectId(this);
	this.hitarea.setAttribute('objref', objid)
	this.hitarea.ref = this;
	// what is this? it is slowing down dragging and loading all over the site
	//this.mop = new Image();
	//this.mop.style.height = this.frame.offsetHeight + 10 +'px';
	//this.mop.style.width = this.frame.offsetWidth + 10 +'px';
	//this.mop.style.pointerEvents = 'none';
	//this.mop.style.display = 'none';
	//this.mop.style.position = 'absolute';
	//this.mop.style.border = '0px';
	//this.mop.style.opacity = '0';
	//document.getElementById('content_area').appendChild(this.mop);
	//modified by TJ on 4/1/2013, use proper listener

	//if(document.createTouch) {

	if(touchCapable) {//MAG 04/30/2014: We are now detecting touch devices by using isTouchDevice() function (in utils.js)
		addListener(this.hitarea, 'touchstart', this.draggerStart);
	}
	//else if (!usingCordova) //diff for android 1.15.14 DAG
	else 
	{ // MAG 05/05/2014: We don't need to test for the 'usingCordova' variable since the addListener() function (in utils.js) won't add mouse events to MOBILE devices
		addListener(this.hitarea, 'mousedown', this.draggerStart);
	}
}

//BAD added this to allow rotation in hamster on IE 5/9/14
var prvH = 0;
var prvW = 0;
var prevTimeStamp = 0;
Dragger.prototype.draggerStart = function(event, newdragger) {
	if (event && event.stopImmediatePropagation) event.stopImmediatePropagation();
	
	if(event && event.touches && event.touches.length > 1) {
		return;
	}

	//if(!document.createTouch && !detectLeftButton(event)) {
	if(!MOBILE && !detectLeftButton(event)){	//MAG & DAG 05/05/2014
		return;
	}
	
	if(newdragger) activeDragger = newdragger;
	else activeDragger = getObjectByRef(getEventTarget(event), 'objref');
	if(activeDragger) {
	//changed by TM 12/19/13 to use the utils function to find mouse/touch position
	var eventPos = pagePosition(event); //not the same diff from MP but works the same. 1.15.14 DAG
	this.eventPos = eventPos;
	activeDragger.eventPos = eventPos;
	activeDragger.scrollx = eventPos.x - activeDragger.frame.offsetLeft;
	activeDragger.scrolly = eventPos.y - activeDragger.frame.offsetTop;
	activeDragger.frame.parentNode.appendChild(activeDragger.frame);
	//BAD added this to allow rotation in hamster on IE 5/9/14
	prvH = activeDragger.frame.style.top;
	prvW = activeDragger.frame.style.left;
	prevTimeStamp = event.timeStamp;

	//if(document.createTouch) //modified by TJ on 4/1/2013, use proper listener
	if(touchCapable) //MAG 04/30/2014: We are now detecting touch devices by using isTouchDevice() function (in utils.js)
	{
		addListener(document.body, 'touchmove', activeDragger.draggerMove);
		addListener(document.body, 'touchend', activeDragger.draggerEnd);
	
	}
	//else if (!usingCordova) //diff for android 1.15.14 DAG
	else 
	{ // MAG 05/05/2014: We don't need to test for the 'usingCordova' variable since the addListener() function (in utils.js) won't add mouse events to MOBILE devices
		addListener(document.body, 'mousemove', activeDragger.draggerMove);
		addListener(document.body, 'mouseup', activeDragger.draggerEnd);
	}

	//addListener(activeDragger.hitarea, 'click', activeDragger.draggerClick);
	activeDragger.enable = true;
	activeDragger.xpos = activeDragger.frame.offsetLeft;
	activeDragger.ypos = activeDragger.frame.offsetTop;
	activeDragger.dispatchEvent('start');
	//activeDragger.mop.style.display = 'block';
	cancelEvent(event);
	}
}

Dragger.prototype.draggerMove = function(event) {
	if(event && event.touches && event.touches.length > 1 ) {
		return;
	}
	// Arian - Touch screen monitors are too sensitive. Delay drag by 50 miliseconds.
	if(Math.abs(prevTimeStamp - event.timeStamp) < 50){
		return;
	}
	if(activeDragger) {
		if(activeDragger.enable == false){
			return;
		}
	
	var p = activeDragger.frame.offsetLeft;
	var mousepos = pagePosition(event);
	this.mousepos = mousepos;
	activeDragger.mousepos = mousepos;
	var marginx = parseInt(activeDragger.frame.style.marginLeft.replace('px',''));
	var marginy = parseInt(activeDragger.frame.style.marginTop.replace('px',''));
	if(isNaN(marginx)) marginx = 0;
	if(isNaN(marginy)) marginy = 0;
	activeDragger.frame.style.left = Math.max(activeDragger.boundingBox.x, Math.min(mousepos.x - activeDragger.scrollx - marginx,
	activeDragger.boundingBox.wd - activeDragger.frame.offsetWidth - 2*marginx))+'px';
	activeDragger.frame.style.top = Math.max(activeDragger.boundingBox.y, Math.min(mousepos.y - activeDragger.scrolly - marginy,
	activeDragger.boundingBox.ht - activeDragger.frame.offsetHeight - 2*marginy))+'px';
	
	//BAD added this to allow rotation in hamster on IE 5/9/14
	// [Caigoy,021617,QA-13808] Make IE hamster item rotation hack optional
	if(activeDragger.options.ieRotationHack && prvH == activeDragger.frame.style.top && prvW == activeDragger.frame.style.left){
		cancelEvent(event);
		return;
	}	
	prvH = activeDragger.frame.style.top;
	prvW = activeDragger.frame.style.left;
	
	//trace(activeDragger.frame.style.left+' '+activeDragger.frame.style.top);
	//if(!activeDragger.frame.style.left ||!activeDragger.frame.style.top)trace('hi');
	//leave this trace statement in or it will not work properly on ipad(for now)
	//clearTracer();
	//activeDragger.mop.style.top = activeDragger.frame.offsetTop - 5 + 'px';
	//activeDragger.mop.style.left = activeDragger.frame.offsetLeft - 5 + 'px';
	activeDragger.dispatchEvent('move');
	}
	cancelEvent(event);
	return true;
}

Dragger.prototype.draggerEnd = function(event) {
	var obj = activeDragger;
	if (event && event.stopImmediatePropagation) event.stopImmediatePropagation();
	if(event && event.touches && event.touches.length > 0) {
		obj.enable = false;
		return;
	}
	/*if(this.mousepos){
	var marginx = parseInt(activeDragger.frame.style.marginLeft.replace('px',''));
	var marginy = parseInt(activeDragger.frame.style.marginTop.replace('px',''));
	if(isNaN(marginx)) marginx = 0;
	if(isNaN(marginy)) marginy = 0;
	var mouseTop = this.mousepos.y - activeDragger.scrolly - marginy;
	var mouseLeft = this.mousepos.x - activeDragger.scrollx - marginx;
	if((mouseTop > activeDragger.boundingBox.y - activeDragger.frame.offsetHeight + activeDragger.boundingBox.ht || mouseTop < activeDragger.boundingBox.y) ||
	(mouseLeft > activeDragger.boundingBox.x - activeDragger.frame.offsetWidth + activeDragger.boundingBox.wd || mouseLeft < activeDragger.boundingBox.x))
	activeDragger.dispatchEvent('oob');
	}*/
	//diff for android 1.15.14 DAG
	//if(obj) {

	//if(document.createTouch){
	if(touchCapable) {//MAG 04/30/2014: We are now detecting touch devices by using isTouchDevice() function (in utils.js)
		removeListener(document.body, 'touchmove', obj.draggerMove);
		removeListener(document.body, 'touchend', obj.draggerEnd);
	//}else if(!usingCordova){
	}else {
		// MAG 05/05/2014: We don't need to test for the 'usingCordova' variable since the addListener() function (in utils.js) won't add mouse events to MOBILE devices
		removeListener(document.body,'mousemove',obj.draggerMove);
		removeListener(document.body,'mouseup',obj.draggerEnd);
		removeListener(obj.hitarea,'click',obj.draggerClick); // MAG 05/06/2014: This event lisneter is never added. This line seems to be unnecesary.
		cancelEvent(event);
	}
	activeDragger.dispatchEvent('end');
	//activeDragger.mop.style.display = 'none';
	activeDragger = null;
}

Dragger.prototype.addDraggerEvents = function(){
	//modified by TJ on 4/1/2013, use proper listener
	//if(document.createTouch) {
	if(touchCapable) {//MAG 04/30/2014: We are now detecting touch devices by using isTouchDevice() function (in utils.js)		
		addListener(this.hitarea, 'touchstart', this.draggerStart);
	}
	
	//else if(!usingCordova) {//diff for android 1.15.14 DAG
	else { // MAG 05/05/2014: We don't need to test for the 'usingCordova' variable since the addListener() function (in utils.js) won't add mouse events to MOBILE devices
		addListener(this.hitarea, 'mousedown', this.draggerStart);
	}
}

Dragger.prototype.removeDraggerEvents = function(){
	removeListener(this.hitarea, 'touchstart', this.draggerStart);
	removeListener(this.hitarea, 'mousedown', this.draggerStart);
}

Dragger.prototype.draggerClick = function(event) {
	cancelEvent(event);
}

// val to set the dragger to be enable or disable. (val = True/False). RL 1/15/2014
Dragger.prototype.draggerEnable = function(val){
	activeDragger.enable = val;
	this.enable = activeDragger.enable;
}

enableEventHandling(Dragger);
