
var activeFrameEvents = new Array();
var lastEnterFrameTime = 0;
var activeFrameTimeout = 0;
var frameRefreshCounter = 0;

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


function EnterFrame(obj, func, params) {

	if(typeof(obj) == 'string') obj = document.getElementById(obj);
	this.obj = (obj == null) ? this : obj;
	this.func = func;
	this.params = params;
	this.frameRate = 0;
	this.lastFrameNum = 0;
	lastEnterFrameTime = 0;

	activeFrameEvents.push(this);
	if(activeFrameEvents.length == 1) processEnterFrames();
}

EnterFrame.prototype.stop = function() {
	var i = activeFrameEvents.length;
	while(i--){
		var frame = activeFrameEvents[i];
		if(frame == this) {
			frame.func = null;
			return;
		}
	}
}

if(requestAnimationFrame == null) {
	requestAnimationFrame = function(callback) {
		activeFrameTimeout = setTimeout(callback, 1000/24);
	}
}

function processEnterFrames() {
	var runtime = (new Date()).getTime();

	if(lastEnterFrameTime > 0 && runtime - lastEnterFrameTime > 500) {
		var diff = runtime - lastEnterFrameTime;
		for(var i=0;i<activeTweens.length;i++) {
			activeTweens[i].startTime += diff;
		}
	}

	lastEnterFrameTime = runtime;

	for(var i=0;i<activeFrameEvents.length;i++) {
		var frame = activeFrameEvents[i];
		if(frame.func == null) {
			activeFrameEvents.splice(i,1);
			i--;
		}
		else if(frame.frameRate > 0) {
			var framenum = Math.floor(runtime*frame.frameRate/1000);
			if(framenum != frame.lastFrameNum) {
				frame.lastFrameNum = framenum;
				try {
					if(frame.params == undefined)
						frame.func.apply(frame.obj);
					else
						frame.func.apply(frame.obj, frame.params);
				} catch(err) {
					trace('ERROR from processEnterFrames() in tween.js'); //added by TJ on 8/27/2013
					trace(err);
				}
			}
		}
		else {
			try {
				if(frame.params == undefined)
					frame.func.apply(frame.obj);
				else
					frame.func.apply(frame.obj, frame.params);
			} catch(err) {
				trace('ERROR from processEnterFrames() in tween.js'); //added by TJ on 8/27/2013
				trace(err);
			}
		}
	}

	if(activeFrameEvents.length > 0) requestAnimationFrame(processEnterFrames);
	else if(activeFrameTimeout) clearTimeout(activeFrameTimeout);
}

////////////////////////////////////

function pauseAllTweens() {
	for(var i=0;i<activeTweens.length;i++) {
		var tween = activeTweens[i];
		if(tween.isPlaying) tween.pause();
	}
}

function restartAllTweens() {
	for(var i=0;i<activeTweens.length;i++) {
		var tween = activeTweens[i];
		if(tween.pauseTime) tween.start();
	}
}
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

var activeTweens = new Array();

function Tween(obj, prop, begin, finish, duration)
{
  if(typeof(obj) == 'string') obj = document.getElementById(obj);

	this.obj            = obj;
	this.prop           = prop;
	this.loop           = false;
	this.position       = 0;
	this.motionFunction = null;
	this.frameEvent     = null;
	this.startTime      = new Date().getTime();
	this.pauseTime		= 0;
	this.progress       = 0;


	if(typeof(begin) == 'object')
    {
		this.points     = begin;
		this.begin      = begin[0];
		this.finish     = begin[begin.length-1];
		this.duration   = begin.length*50;
	}
	else
    {
		this.begin      = begin;
		this.finish     = finish;
		this.duration   = duration;
	}
	if(this.obj.customDispatches && hasProperties(obj.customDispatches))
		this.customDispatches = obj.customDispatches;

	this.isPlaying      = true;
	this.done           = false;

	this.gotoPosition(begin);
	activeTweens.push(this);

	if(activeTweens.length == 1) {
		if(this.frameEvent) this.frameEvent.stop();
		this.frameEvent = new EnterFrame(null, processTweens);
	}
}

Tween.prototype.start = function()
{
	if(this.pauseTime > 0) {
		var now = new Date().getTime();
		this.startTime = now - (this.pauseTime - this.startTime);
		this.pauseTime = 0;
	}
	this.isPlaying = true;
}

Tween.prototype.pause = function()
{
	this.isPlaying = false;
	this.pauseTime = new Date().getTime();
}

Tween.prototype.stop = function()
{
	this.isPlaying = false;
	this.done = true;
}

Tween.prototype.gotoPosition = function(pos) {
	if(isNaN(pos)) return;

	if(this.obj && this.obj.nodeName) {
		if(this.prop == 'left')
			this.obj.style.left = Math.round(pos) + 'px';
		else if(this.prop == 'top')
			this.obj.style.top = Math.round(pos) + 'px';
		else if(this.prop == 'height')
			this.obj.style.height = Math.round(pos) + 'px';
		else if(this.prop == 'width')
			this.obj.style.width = Math.round(pos) + 'px';
		else if(this.prop == 'opacity' )
			setElementOpacity(this.obj, pos);
		else if(this.prop == 'max-width' )
			this.obj.style.maxWidth = Math.round(pos) + 'px';
		else if(this.prop == 'max-height' )
			this.obj.style.maxHeight = Math.round(pos) + 'px';
		//modified by TJ on 4/25/2014, append transform
		else if(this.prop == 'rotation') {
			var _transform_data;

			if(this.obj.style.transform) _transform_data = this.obj.style.transform;
			if(this.obj.style.MozTransform) _transform_data = this.obj.style.MozTransform;
			if(this.obj.style.msTransform) _transform_data = this.obj.style.msTransform;
			if(this.obj.style.OTransform) _transform_data = this.obj.style.OTransform;
			if(this.obj.style.webkitTransform) _transform_data = this.obj.style.webkitTransform;

			if(_transform_data == undefined) _transform_data = '';

			if(_transform_data.match(/rotate\([\-\.0-9]*deg\)/))
			{
				_transform_data = _transform_data.replace(/rotate\([\-\.0-9]*deg\)/, '');
			}
			_transform_data += 'rotate(' + pos + 'deg)';

			this.obj.style.transform = _transform_data;
			this.obj.style.MozTransform = _transform_data;
			this.obj.style.msTransform = _transform_data;
			this.obj.style.OTransform = _transform_data;
			this.obj.style.webkitTransform = _transform_data;
		//modified by TJ on 4/25/2014, append transform
		}else if(this.prop == 'scale') {
			var _transform_data;

			if(this.obj.style.transform) _transform_data = this.obj.style.transform;
			if(this.obj.style.MozTransform) _transform_data = this.obj.style.MozTransform;
			if(this.obj.style.msTransform) _transform_data = this.obj.style.msTransform;
			if(this.obj.style.OTransform) _transform_data = this.obj.style.OTransform;
			if(this.obj.style.webkitTransform) _transform_data = this.obj.style.webkitTransform;

			if(_transform_data == undefined) _transform_data = '';

			if(_transform_data.match(/scale\([0-9\s\-\.\,]*\)/))
			{
				_transform_data = _transform_data.replace(/scale\([0-9\s\-\.\,]*\)/, '');
			}

			_transform_data += ' scale(' + pos + ')';

			this.obj.style.transform = _transform_data;
			this.obj.style.MozTransform = _transform_data;
			this.obj.style.msTransform = _transform_data;
			this.obj.style.OTransform = _transform_data;
			this.obj.style.webkitTransform = _transform_data;
		} else if(/^scale[XY]/.test(this.prop)) { // [Caigoy,011216,SF-8888] added missing scale options
			var _transform_data;
			var scaleType = this.prop.match(/^scale[XY]/)[0];

			if(this.obj.style.transform) _transform_data = this.obj.style.transform;
			if(this.obj.style.MozTransform) _transform_data = this.obj.style.MozTransform;
			if(this.obj.style.msTransform) _transform_data = this.obj.style.msTransform;
			if(this.obj.style.OTransform) _transform_data = this.obj.style.OTransform;
			if(this.obj.style.webkitTransform) _transform_data = this.obj.style.webkitTransform;

			if(_transform_data == undefined) _transform_data = '';

			if(_transform_data.match(/scale[XY]\([0-9\s\-\.\,]*\)/))
			{
				_transform_data = _transform_data.replace(/scale[XY]\([0-9\s\-\.\,]*\)/, '');
			}

			_transform_data += ' '+ scaleType + '(' + pos + ')';

			this.obj.style.transform = _transform_data;
			this.obj.style.MozTransform = _transform_data;
			this.obj.style.msTransform = _transform_data;
			this.obj.style.OTransform = _transform_data;
			this.obj.style.webkitTransform = _transform_data;
		}
		else {
			this.obj[this.prop] = pos;
		}
	}
	else if(this.obj) {
		this.obj[this.prop] = pos;
	}
	this.position = pos;
}

Tween.prototype.reverse = function() {
}

/////////////////////

Tween.prototype.drift = function(begin, finish, runtime, duration, position) {
	var togo = duration - runtime;
	if(togo <= 0) return finish;

	var r = 1 - runtime/duration;
	return begin + (1 - r*r*r*r)*(finish - begin);
}

/////////////////////

enableEventHandling(Tween);

//////////////////////

function processTweens() {

	var now = new Date().getTime();

	for(var i=0;i<activeTweens.length;i++) {
		var tween = activeTweens[i];
		if(tween.isPlaying) {
			var runtime = Math.min(now - tween.startTime, tween.duration);
			if(runtime <= 0) continue; //added by TJ on 10/4/2013, sometime, especially when lagging, runtime appears negative number where it shouldn't be. ignore the negative runtime. 0 is added simply because 0 shouldn't move anything yet.

			tween.progress = runtime/tween.duration;

			if(tween.points) {
				var frame = Math.min(tween.points.length -1, Math.floor(tween.points.length*runtime/tween.duration));
				var pos = tween.points[frame];
			}
			else if(tween.motionFunction)
				pos = tween.motionFunction(tween.begin, tween.finish, runtime, tween.duration, tween.position);
			else {
				pos = tween.begin + (tween.finish - tween.begin)*runtime/tween.duration;
			}
			/* Custom Dispatches will be used if we want to fire events midway through an animation.
			*/if(tween.customDispatches){
				var dispatchFrameEvents = (Math.floor(tween.position) != Math.floor(pos));
				if(dispatchFrameEvents && tween.customDispatches[Math.floor(tween.position)])
					tween.dispatchEvent(tween.customDispatches[Math.floor(tween.position)]);
			}
			tween.gotoPosition(pos);
			tween.dispatchEvent('change');
			if(tween.obj && tween.obj.onTweenChange){tween.obj.onTweenChange(tween);}

			if(tween.loop == false && runtime >= tween.duration) {
				tween.gotoPosition(tween.finish);
				tween.isPlaying = false;
				tween.done = true;
/* 				var event = document.createEvent('Event');
event.initEvent("finish",true,false);
tween.dispatchEvent(event); */
				tween.dispatchEvent('finish');
			}

			else {
				if(tween.loop && runtime >= tween.duration) tween.startTime = now;
			}
		}else if (!tween.isPlaying && !tween.done){
		}else if(tween.done) {
			activeTweens.splice(i,1);
			i--;

			if(i < 0) i = 0; //added by TJ on 2/21/2013
		}
	}

	if(activeTweens.length == 0) {
		this.stop();
	}
}

////////////////////////////////////

// tweener functions

function tweenerSine(begin, finish, runtime, duration, position) {
	return begin + Math.round((Math.cos(2*Math.PI*runtime/duration) - 1)*(begin - finish)/2);
}

function tweenerEaseIn(begin, finish, runtime, duration, position) {
	return (runtime==0) ? begin : (finish-begin) * Math.pow(2, 10 * (runtime/duration - 1)) + begin;
}

////////////////////////////////////
////////////////////////////////////
// animate a png or jpg image sequence
var json_objs = new Object(); //added by TJ on 10/22/2013, prevent json to load more than one time.
function ImageSequence(obj, frames, hide)
{
	if(typeof(obj) == 'string') obj = document.getElementById(obj);

	if(hide == undefined) hide = false;
	if(frames == undefined) frames = 0; //added by TJ on 1/3/2013

	//CONSTANT (DO NOT CHANGE)
	this.frame = obj;
	this.startTime = 0;
	this.images = new Array();
	this.ready = false;
	this.toLoad = 0;
	this.json_obj = {status:"not_loaded"}; //added by TJ on 11/13/2012
	this.use_json = false; 							//added by TJ on 11/14/2012
	this.use_reg_pt = false; 						//added by TJ on 1/4/2013, if register point is same for every frame, consider object is not moving
	this.playing = false; 							//added by TJ on 3/1/2013
	this.paused = false;							//added by Len on 3/18/2013
	this.animations = new Array();			// named animation settings
	this.frameSettings = new Array();		// frame by frame size and offset
	this.sequence;											// ordered list of frames for animation
	this.frameEvents;										// frame triggers
	this.lastFrame = -1;

	//CONTROLABLE (YOU MAY CHANGE VALUE)
	this.frameHeight = this.frame.offsetHeight; // fix for chrome zoom issue - bill 10-dec-12
	this.frameWidth = this.frame.offsetWidth;
	this.frames = frames;												// max usable frame position
	this.hide = hide;
	this.startFrame = 0;
	this.endFrame = -1; //added by TJ on 11/14/2012, this variable is used only when if there is specific section to animate. if you don't set this variable, it will play until end frame.
	this.position = 0;
	this.loop = false;
	this.frameRate = 24;
	this.reverse = false;
	this.scale = 1; //added by TJ on 11/14/2012
	this.currentAnimation = '';
	this.pauseTime	= 0; //added by Len 3/18/2013

	// find img inside of div
	var startFrame = 0;
	for(var i=0;i<obj.children.length;i++) {
		if(obj.children[i].tagName == 'IMG') {
			var image = new Object();
			image.image = obj.children[i];
            image.rows = Math.floor(image.image.naturalHeight/obj.offsetHeight);
            image.cols = Math.floor(image.image.naturalWidth/obj.offsetWidth);

			image.origWidth = image.image.clientWidth; //added by TJ on 11/16/2012
			image.origHeight = image.image.clientHeight; //added by TJ on 11/16/2012

			image.startFrame = startFrame;
			image.frames = image.rows*image.cols;
			startFrame += image.frames;
			image.image.style.position = 'absolute';
			image.image.style.left = '0px';
			image.image.style.top = '0px';
			image.image.style.visibility = (this.images.length > 0) ? 'hidden' : 'inherit';
			this.images.push(image);

			if(!image.image.complete) {
				this.toLoad++;
				addListener(image.image, "load", this.imageLoaded);
			}
		}
	}

}

// create/replace named animation
// properties:
// required - name:string
// required - startFrame:int and endFrame:int or sequence:array
// optional - loop:bool
// optional - frameEvents:array of objects { frame:int, event:string }
// optional - frameRate:int
// optional - reverse:bool
// optional - scale:number
// optional - frameSettings:array of objects with transform data

ImageSequence.prototype.createAnimation = function(info) {

	if(info && info.name) {
		// check if name exists
		for(var i=this.animations.length-1;i>=0;i--) {
			if(this.animations[i].name == info.name) {
				this.animations[i] = info;
				return;
			}
		}
		this.animations.push(info);
	}
}

// run named animation
ImageSequence.prototype.runAnimation = function(name) {
	for(var i=0;i<this.animations.length;i++) {
		if(this.animations[i].name == name) {
			var anim = this.animations[i];
			if(anim.sequence && anim.sequence.length) {
				this.frameSequence = anim.sequence;
				this.startFrame = 0;
				this.endFrame = anim.sequence.length-1;
			}
			else {
				this.startFrame = anim.startFrame;
				this.endFrame = isNaN(anim.endFrame) ? -1 : anim.endFrame;
				this.frameSequence = null;
			}
			this.frames = this.endFrame - this.startFrame;
			this.loop = (anim.loop != null && anim.loop != undefined) ? anim.loop : false;
			this.frameRate = (anim.frameRate != null && anim.frameRate != undefined) ? anim.frameRate : 24;
			this.reverse = (anim.reverse != null && anim.reverse != undefined) ? anim.reverse : false;
			this.scale = (anim.scale != null && anim.scale != undefined) ? anim.scale : 1;
			this.frameEvents = (anim.frameEvents != null && anim.frameEvents != undefined) ? anim.frameEvents : null;
			this.frameSettings = (anim.frameSettings != null && anim.frameSettings != undefined) ? anim.frameSettings : null;
			this.currentAnimation = name;
			this.start();
			return;
		}
	}
}


//added by TJ on 11/14/2012
ImageSequence.prototype.JSON = function(url)
{
	var refobj = this;

	refobj.use_json = true;

	//added by TJ on 10/22/2013, prevent to load json file more than once
	if(json_objs[url])
	{
		if(json_objs[url] == 'not_ready')
		{
			setTimeout(function(){ refobj.JSON(url) }, 200);
			return;
		}

		refobj.json_obj = json_objs[url];

		//added by TJ on 1/4/2013, every frames have same width and height
		if(refobj.json_obj.frames.count != undefined)
		{
			refobj.use_json = false;
			refobj.frames = refobj.json_obj.frames.count;
			refobj.frameWidth = refobj.json_obj.frames.width;
			refobj.frameHeight = refobj.json_obj.frames.height;
			refobj.frame.style.width = refobj.frameWidth + 'px';
			refobj.frame.style.height = refobj.frameHeight + 'px';

			// find img inside of div
			var startFrame = 0;
			var obj = refobj.frame;
			refobj.images = new Array();
			refobj.toLoad = 0;

			for(var i=0;i<obj.children.length;i++) {
				if(obj.children[i].tagName == 'IMG') {
					var image = new Object();
					image.image = obj.children[i];
					image.rows = Math.floor(image.image.height/obj.offsetHeight);
					image.cols = Math.floor(image.image.width/obj.offsetWidth);

					image.origWidth = image.image.clientWidth; //added by TJ on 11/16/2012
					image.origHeight = image.image.clientHeight; //added by TJ on 11/16/2012

					image.startFrame = startFrame;
					image.frames = image.rows*image.cols;
					startFrame += image.frames;
					image.image.style.position = 'absolute';
					image.image.style.left = '0px';
					image.image.style.top = '0px';
					image.image.style.visibility = (refobj.images.length > 0) ? 'hidden' : 'inherit';
					refobj.images.push(image);

					if(!image.image.complete) {
						refobj.toLoad++;
						addListener(image.image, "load", refobj.imageLoaded);
					}
				}
			}

			if(refobj.scale != 1)
			{
				refobj.frame.style.width = Math.floor(parseInt(refobj.frame.style.width) * refobj.scale) + 'px';
				refobj.frame.style.height = Math.floor(parseInt(refobj.frame.style.height) * refobj.scale) + 'px';
			}
			return;
		}

		refobj.json_obj.status = "loaded";
		if(refobj.json_obj.animations.all)
			refobj.frames = refobj.json_obj.animations.all.frames.length;
		else if(refobj.json_obj.frames)
			refobj.frames = refobj.json_obj.frames.length;

		//check wether using register point or not.
		var regx = refobj.json_obj.frames[0][5];
		var regy = refobj.json_obj.frames[0][6];
		for(var i = 0; i < refobj.json_obj.frames.length; i++)
		{
			if(refobj.json_obj.frames[i][5] != regx || refobj.json_obj.frames[i][6] != regy)
			{
				refobj.use_reg_pt = true;
				break;
			}
		}

		if(refobj.endFrame == -1 || refobj.endFrame > refobj.frames - 1)
			refobj.endFrame = refobj.frames - 1;
		if(refobj.startFrame > refobj.endFrame || refobj.startFrame > refobj.frames)
			refobj.startFrame = 0;

		refobj.dispatchEvent('json_loaded');
	}
	else
	{
		json_objs[url] = 'not_ready';

		ajax(url, {}, function(result) {
			refobj.json_obj = (typeof(result) == 'string') ? JSON.parse(result) : result;

			json_objs[url] = refobj.json_obj; //added by TJ on 10/22/2013

			//added by TJ on 1/4/2013, every frames have same width and height
			if(refobj.json_obj.frames.count != undefined)
			{
				refobj.use_json = false;
				refobj.frames = refobj.json_obj.frames.count;
				refobj.frameWidth = refobj.json_obj.frames.width;
				refobj.frameHeight = refobj.json_obj.frames.height;
				refobj.frame.style.width = refobj.frameWidth + 'px';
				refobj.frame.style.height = refobj.frameHeight + 'px';

				// find img inside of div
				var startFrame = 0;
				var obj = refobj.frame;
				refobj.images = new Array();
				refobj.toLoad = 0;

				for(var i=0;i<obj.children.length;i++) {
					if(obj.children[i].tagName == 'IMG') {
						var image = new Object();
						image.image = obj.children[i];
						image.rows = Math.floor(image.image.height/obj.offsetHeight);
						image.cols = Math.floor(image.image.width/obj.offsetWidth);

						image.origWidth = image.image.clientWidth; //added by TJ on 11/16/2012
						image.origHeight = image.image.clientHeight; //added by TJ on 11/16/2012

						image.startFrame = startFrame;
						image.frames = image.rows*image.cols;
						startFrame += image.frames;
						image.image.style.position = 'absolute';
						image.image.style.left = '0px';
						image.image.style.top = '0px';
						image.image.style.visibility = (refobj.images.length > 0) ? 'hidden' : 'inherit';
						refobj.images.push(image);

						if(!image.image.complete) {
							refobj.toLoad++;
							addListener(image.image, "load", refobj.imageLoaded);
						}
					}
				}

				if(refobj.scale != 1)
				{
					refobj.frame.style.width = Math.floor(parseInt(refobj.frame.style.width) * refobj.scale) + 'px';
					refobj.frame.style.height = Math.floor(parseInt(refobj.frame.style.height) * refobj.scale) + 'px';
				}
				return;
			}

			refobj.json_obj.status = "loaded";
			if(refobj.json_obj.animations.all)
				refobj.frames = refobj.json_obj.animations.all.frames.length;
			else if(refobj.json_obj.frames)
				refobj.frames = refobj.json_obj.frames.length;

			//check wether using register point or not.
			var regx = refobj.json_obj.frames[0][5];
			var regy = refobj.json_obj.frames[0][6];
			for(var i = 0; i < refobj.json_obj.frames.length; i++)
			{
				if(refobj.json_obj.frames[i][5] != regx || refobj.json_obj.frames[i][6] != regy)
				{
					refobj.use_reg_pt = true;
					break;
				}
			}

			if(refobj.endFrame == -1 || refobj.endFrame > refobj.frames - 1)
				refobj.endFrame = refobj.frames - 1;
			if(refobj.startFrame > refobj.endFrame || refobj.startFrame > refobj.frames)
				refobj.startFrame = 0;

			refobj.dispatchEvent('json_loaded');
		});
	}
}

ImageSequence.prototype.imageLoaded = function(event) {
	this.toLoad--;
	if(this.toLoad <= 0) this.ready = true;
}

// move through the frames
ImageSequence.prototype.doAnimation = function() {

	var now = (new Date()).getTime();

	//added by TJ on 11/14/2012, animation with JSON handle differently
	if(this.use_json == true) {

		if(this.json_obj.status == "not_loaded") return;
		
		if(now - this.startTime >= 1000 / this.frameRate) {
			
			//modified by TJ on 2/18/2013, add reverse

			if(this.reverse)
				this.position--;
			else
				this.position++;
			this.startTime = now;
		}

		//modified by TJ on 2/18/2013, reverse mode
		if(this.reverse) {
			if(this.position < this.startFrame) {
				if(this.loop == true) {
					this.position = this.endFrame;
				}
				else {
					if(this.timer) this.timer.stop();
					if(this.hide) this.frame.style.display = 'none';
					this.position = this.startFrame;
					this.goto();
					this.playing = false; //added by TJ on 3/1/2013
					this.dispatchEvent('finish');
					return;
				}
			}
		}
		else {
			if(this.position > this.endFrame) {
				if(this.loop == true) {
					this.position = this.startFrame;
				}
				else {
					if(this.timer) this.timer.stop();
					if(this.hide) this.frame.style.display = 'none';
					this.position = this.endFrame;
					this.goto();
					this.playing = false; //added by TJ on 3/1/2013
					this.dispatchEvent('finish');
					return;
				}
			}
		}
	}

	// when does this happen?
	else if(this.frames < 0) {
		this.position = this.startFrame - Math.round((now - this.startTime)*this.frameRate/1000);
		if(this.position <= this.startFrame + this.frames) {
			if(this.loop) {
				this.position = this.startFrame;
				this.startTime = now;
			}
			else {
				if(this.timer) this.timer.stop();
				if(this.hide) this.frame.style.display = 'none';
				this.playing = false; //added by TJ on 3/1/2013
				this.dispatchEvent('finish');
				return;
			}
		}
	}


	else {

		var dir = this.frameRate/1000;
		if(this.reverse) dir = dir*-1;
		if(this.startFrame > this.endFrame && this.endFrame != -1) dir = dir*-1;

		this.position = this.startFrame + Math.round((now - this.startTime)*dir);

		var atend = false;
		if(this.endFrame != -1) {
			if(this.startFrame < this.endFrame)
				atend = (!this.reverse) ? this.position >= this.endFrame : this.position <= this.startFrame;
			else
				atend = (!this.reverse) ? this.position >= this.startFrame : this.position <= this.endFrame;
		}
		else {
			if(this.reverse)
				atend = (this.position <= this.startFrame);
			else
				atend = (this.position >= this.startFrame + this.frames);
		}

		if(atend) {
			if(this.loop) {
				this.position = this.startFrame;
				this.startTime = now;
			}
			else {
				if(this.timer) this.timer.stop();
				if(this.hide) this.frame.style.display = 'none';
				this.playing = false; //added by TJ on 3/1/2013
				this.dispatchEvent('finish');
				this.position = this.startFrame + this.frames + 1;
				this.goto();
				return;
			}
		}
	}
	this.goto();
	this.frame.style.display = 'block';
	this.dispatchEvent('change');
}


ImageSequence.prototype.goto = function(pos) {
	if(!isNaN(pos)) this.position = pos;

	if(this.frameSequence && this.frameSequence.length)
		var framepos = this.frameSequence[this.position];
	else
		var framepos = this.position;

	// apply any frame specific settings
	if(this.frameSettings && this.frameSettings[this.position]) {
		var settings = this.frameSettings[this.position];
		if(!isNaN(settings.top)) this.frame.style.top = (settings.top * this.scale) + 'px';
		if(!isNaN(settings.left)) this.frame.style.left = (settings.left * this.scale) + 'px';
		if(!isNaN(settings.width)) this.frame.style.width = (settings.width * this.scale) + 'px';
		if(!isNaN(settings.height)) this.frame.style.height = (settings.height * this.scale) + 'px';
		if(!isNaN(settings.rotation)) {
			this.frame.style.webkitTransform = 'rotate('+settings.rotation+'deg)';
			this.frame.style.MozTransform = 'rotate('+settings.rotation+'deg)';
			this.frame.style.msTransform = 'rotate('+settings.rotation+'deg)';
		}
	}

	var framecount = 0;
	//modified by TJ on 11/13/2012
	if(this.use_json == true) {
		var _json_image;
		
		if(this.json_obj.frames[this.position] == undefined) return;

		//added by TJ on 1/3/2013, used only for static animation. check 'Variable Frame' to get correct json file from zoe.
		//make sure stage size of .swf file is 900 by 650
		//modified by TJ on 4/24/2013, apply scale to register point method
		if(this.use_reg_pt == true) {
			this.frame.style.left = Math.round(this.json_obj.frames[this.position][5] * this.scale * -1) + 'px';
			this.frame.style.top = Math.round(this.json_obj.frames[this.position][6] * this.scale * -1) + 'px';
		}
		
		//prevent objects that outside of screen to animate, for saving process power
		var _pos = nodeOffsets(this.frame, 'content_area');
		if(_pos.x > 1000 || _pos.x + parseInt(this.frame.style.width) < 0 || _pos.y > 750 || _pos.y + parseInt(this.frame.style.height) < 0) return;
		
		for(var i = 0; i < this.images.length; i++) {
			if(i == this.json_obj.frames[this.position][4])
				_json_image = this.images[this.json_obj.frames[this.position][4]];

			this.images[i].image.style.visibility = 'hidden';
		}

		this.frame.style.width = Math.round(this.json_obj.frames[this.position][2] * this.scale) + 'px';
		this.frame.style.height = Math.round(this.json_obj.frames[this.position][3] * this.scale) + 'px';

		if(this.scale != 1) {
			_json_image.image.style.width = Math.round(_json_image.origWidth * this.scale) + 'px';
			_json_image.image.style.height = Math.round(_json_image.origHeight * this.scale) + 'px';
		}

		_json_image.image.style.left = Math.round(this.json_obj.frames[this.position][0] * -1 * this.scale) + 'px';
		_json_image.image.style.top = Math.round(this.json_obj.frames[this.position][1] * -1 * this.scale) + 'px';
		_json_image.image.style.visibility = 'inherit';
	}
	else {
		for(i=0;i<this.images.length;i++) {
			var img = this.images[i];
			if(framecount >= img.startFrame && framecount < img.startFrame + img.frames) {
				img.image.style.visibility = 'inherit';
				var imgpos = framepos - img.startFrame;
				img.image.style.left = Math.floor((-this.frameWidth*(imgpos%img.cols)) * this.scale) + 'px'; //modified by TJ on 2/6/2013
				img.image.style.top = Math.floor((-this.frameHeight*Math.floor(imgpos/img.cols)) * this.scale) + 'px'; //modified by TJ on 2/6/2013

				//added by TJ on 2/6/2013
				if(this.scale != 1) {
					img.image.style.width = Math.floor(img.origWidth * this.scale) + 'px';
					img.image.style.height = Math.floor(img.origHeight * this.scale) + 'px';
				}
			}
			else {
				img.image.style.visibility = 'hidden';
			}
			framecount += img.frames;
		}
	}

	// run frame triggers

	if(this.lastFrame	!= framepos) {
		this.lastFrame = framepos;
		if(this.frameEvents && this.frameEvents.length) {
			for(var i=0;i<this.frameEvents.length;i++) {
				if(this.frameEvents[i].frame == framepos )
					this.dispatchEvent(this.frameEvents[i].event);

			}
		}
	}
}

ImageSequence.prototype.start = function(pos) {
	
	if(!isNaN(pos)) this.position = pos;
	if(this.timer) this.timer.stop();
	if(this.images.length) {
		//this.frame.style.display = 'block';
		this.timer = new EnterFrame(this, this.doAnimation);
		this.startTime = (new Date()).getTime();
	}
	this.lastFrame = pos;
	this.playing = true; //added by TJ on 3/1/2013

}

ImageSequence.prototype.stop = function() {
	if(this.timer) this.timer.stop();
	if(this.hide) this.frame.style.display = 'none';

	this.playing = false; //added by TJ on 3/1/2013
	this.paused = false;
	this.pauseTime = 0;
}


ImageSequence.prototype.pause = function() {
	if(this.playing == false)return;
	if(this.timer) this.timer.stop();
	if(this.hide) this.frame.style.display = 'none';

	this.pauseTime = new Date().getTime();
	this.paused = true; //added by TJ on 3/1/2013
}
ImageSequence.prototype.unpause = function() {
	if(this.paused == true){
		if(this.timer) this.timer.stop();
		if(this.images.length) {
			//this.frame.style.display = 'block';
			if(this.pauseTime > 0) {
				var now = new Date().getTime();
				this.startTime = now - (this.pauseTime - this.startTime);
				this.pauseTime = 0;
				this.paused = false;
			}
			this.timer = new EnterFrame(this, this.doAnimation);
		}
		this.playing = true; //added by TJ on 3/1/2013
	}
}


enableEventHandling(ImageSequence);


////////////////////////////////////
////////////////////////////////////
// pulse an image bigger and smaller

function pulseButton(btn, growth, period)
{

	if(typeof(btn) == 'string') btn = document.getElementById(btn);
	this.btn = btn;

	if(growth == undefined) growth = 1.2;
	if(period == undefined) period = 1500;

	this.startLeft                  =   btn.offsetLeft;
	this.startTop                   =   btn.offsetTop;
	this.startWidth                 =   btn.offsetWidth;
	this.startHeight                 =   btn.offsetHeight;

	this.widthTween                 =   new Tween(btn, 'width', btn.offsetWidth, Math.round(btn.offsetWidth*growth), period);
	this.widthTween.loop            =   true;
	this.widthTween.motionFunction  =   tweenerSine;

	//added to scale the btn proportionally. -TM 5/20/2013
	this.heightTween                 =   new Tween(btn, 'height', btn.offsetHeight, Math.round(btn.offsetHeight*growth), period);
	this.heightTween.loop            =   true;
	this.heightTween.motionFunction  =   tweenerSine;


	this.leftTween                  =   new Tween(btn,'left',btn.offsetLeft,Math.round(btn.offsetLeft-btn.offsetWidth*(growth-1)/2),period);
	this.leftTween.loop             =   true;
	this.leftTween.motionFunction   =   tweenerSine;

	this.topTween                   =   new Tween(btn,'top',btn.offsetTop,Math.round(btn.offsetTop-btn.offsetHeight*(growth-1)/2),period);
	this.topTween.loop              =   true;
	this.topTween.motionFunction    =   tweenerSine;
}

pulseButton.prototype.stop = function() {
	if(this.widthTween) this.widthTween.stop();
	if(this.heightTween) this.heightTween.stop();
	if(this.leftTween) this.leftTween.stop();
	if(this.topTween) this.topTween.stop();

	this.btn.style.left = this.startLeft + 'px';
	this.btn.style.top = this.startTop + 'px';
	this.btn.style.width = this.startWidth + 'px';
	this.btn.style.height = this.startHeight + 'px';
}


///////////////////////////////////////
///////////////////////////////////////
// grow button bigger and smaller
// created by TJ on 2/26/2013

function growButton(btn, growth, period)
{
	if(typeof(btn) == 'string') btn = document.getElementById(btn);
	this.btn = btn;

	if(growth == undefined) growth = 1.1;
	if(period == undefined) period = 500;
	this.growth = growth;
	this.period = period;

	this.startLeft = btn.offsetLeft;
	this.startTop = btn.offsetTop;
	this.startWidth = btn.offsetWidth;
	this.startHeight = btn.offsetHeight;

	this.leftTween;
	this.topTween;
	this.widthTween;
	this.heightTween;

	this.grow();
}

growButton.prototype.grow = function()
{
	if(this.leftTween) this.leftTween.stop();
	if(this.topTween) this.topTween.stop();
	if(this.widthTween) this.widthTween.stop();
	if(this.heightTween) this.heightTween.stop();

	this.leftTween = new Tween(this.btn, 'left', this.startLeft, this.startLeft - (((this.startWidth * this.growth) - this.startWidth) / 2), this.period);
	this.topTween = new Tween(this.btn, 'top', this.startTop, this.startTop - (((this.startHeight * this.growth) - this.startHeight) / 2), this.period);
	this.widthTween = new Tween(this.btn, 'width', this.startWidth, this.startWidth * this.growth, this.period);
	this.heightTween = new Tween(this.btn, 'height', this.startHeight, this.startHeight * this.growth, this.period);
}

growButton.prototype.shrink = function()
{
	if(this.leftTween) this.leftTween.stop();
	if(this.topTween) this.topTween.stop();
	if(this.widthTween) this.widthTween.stop();
	if(this.heightTween) this.heightTween.stop();

	this.leftTween = new Tween(this.btn, 'left', parseInt(this.btn.style.left), this.startLeft, this.period);
	this.topTween = new Tween(this.btn, 'top', parseInt(this.btn.style.top), this.startTop, this.period);
	this.widthTween = new Tween(this.btn, 'width', parseInt(this.btn.style.width), this.startWidth, this.period);
	this.heightTween = new Tween(this.btn, 'height', parseInt(this.btn.style.height), this.startHeight, this.period);
}

growButton.prototype.stop = function()
{
	if(this.leftTween) this.leftTween.stop();
	if(this.topTween) this.topTween.stop();
	if(this.widthTween) this.widthTween.stop();
	if(this.heightTween) this.heightTween.stop();

	this.btn.style.left = this.startLeft + 'px';
	this.btn.style.top = this.startTop + 'px';
	this.btn.style.width = this.startWidth + 'px';
	this.btn.style.height = this.startHeight + 'px';
}
