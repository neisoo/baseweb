//plugin to create new sidepanels  - arsen
var side_panels = [];
var current_sidepanel_index = -1;
var last_sidepanel_index = -1;

function closeCurrentSidePanel() {
	if (current_sidepanel_index != -1) 
		side_panels[current_sidepanel_index].hide();
}

function RemoveNotPersistantSidepanels() {
	for(var i=0; i<side_panels.length; i++) {
		if (! side_panels[i].persist) {
			side_panels[i].wrapper.parentNode.removeChild(side_panels[i].wrapper);
			side_panels.splice(i, 1);
		}
	}
}

function GetSidePanelsCount(position) {
	var count = 0;
	for(var i=0; i<side_panels.length; i++) {
		if (side_panels[i].position == position)
			count++;
	}
	return count;
}

function sortSidePanels(a,b) {
  if (a.order < b.order)
     return -1;
  if (a.order > b.order)
    return 1;
  return 0;
}

function AdjustSidePanelIconPositions() {
	for(var i=0; i<side_panels.length; i++) {
		var iconpos = side_panels[i].getIconPosition(side_panels[i].position);
		side_panels[i].icon.style.top = iconpos + 'px';
		if (iconpos > 0)
			addClass(side_panels[i].wrapper.id, 'sidepanel-wrapper-toprounded-'+side_panels[i].position);
	}
}

function showSidepanelById(id,options) {
	if(id===void 0) {
		return;
	}

	for(var i=0; i<side_panels.length; i++) {
		if(side_panels[i].id == id) {
			side_panels[i].show(undefined,options);
		}
	}
}


function SidePanel(id, position, persist, custom_order, speed) {
	this.id = id;
	this.speed = speed;
	this.persist = persist;
	this.order = custom_order;

	this.wrapper = document.getElementById('sidepanel_wrapper_'+id);
	if (this.wrapper.parentNode.id == 'content_area') {
		var tmp_wrapper = this.wrapper.cloneNode(true);
		this.wrapper.parentNode.removeChild(this.wrapper);
		this.wrapper = tmp_wrapper;
		document.getElementById('sidepaneldiv').appendChild(this.wrapper);
	}

	this.icon = document.getElementById('sidepanel_icon_'+id);
	this.content_container = document.getElementById('sidepanel_content_'+id);
	
	this.state = 'hidden'; //hidden, visible, hiding, showing
	
	this.position = position;
	this.width = parseInt(this.wrapper.style.width.toString().replace('px', ''));

	//events
	this.onInit = this.createEvent('onSidePanelInit');
	this.onShow = this.createEvent('onSidePanelShow');
	this.onShown = this.createEvent('onSidePanelShown');
	this.onHide = this.createEvent('onSidePanelHide');
	this.onHidden = this.createEvent('onSidePanelHidden');
	this.onTouchSlide = this.createEvent('onTouchSlide');

	//for internal calculations...
	this.touch_last_x = null;
	this.touch_start_x = null;
	this.touch_end_x = null;
	this.touch_last_direction = null;
	
	this.js_timer = null;
	this.js_end_x = null;
	this.js_current_x = null;
	this.js_step = null;

	this.browser = null;
}

SidePanel.prototype.getIconPosition = function() {
	var vpos = 0;
	var count = 0;
	var tmp_sidepanels = [];
	// for(var i=0; i<side_panels.length; i++) {
	// 	if (side_panels[i].position == this.position)
	// 		tmp_sidepanels.push(side_panels[i]);
	// }

	for(var i=0; i<this.getIndex(); i++) {
		if (side_panels[i].position == this.position && side_panels[i].id != this.id) {
			var icon_h = parseInt(side_panels[i].icon.style.width.toString().replace('px', ''));
			count = count + 1;
			vpos += icon_h + 20;
		}
	}
	return vpos;
}

SidePanel.prototype.getIndex = function() {
	return side_panels.indexOf(this);
}

SidePanel.prototype.init = function() {

	var objref = this;

	addListener(this.wrapper, "transitionend", function(event) { objref.onAnimateEnd(event); } )
	addListener(this.wrapper, "webkitTransitionEnd", function(event) { objref.onAnimateEnd(event); } )

	// this.wrapper.style.WebkitTransition = 'all 5ms ease-in-out';
	// this.wrapper.style.transition = 'all 5ms ease-in-out';
	// this.wrapper.style.MsTransition = 'all 5ms ease-in-out';
		
	addListener(this.icon, "click", function(event) { objref.toggle(event); });
	addListener(this.wrapper, "click", function(event) { cancelEvent(event); });

	if (! this.isStupidIE()) {
		addListener(this.icon, "touchmove", function(event) { objref.touchmove(event); });
		addListener(this.icon, "touchstart", function(event) { objref.touchstart(event); });
		addListener(this.icon, "touchend", function(event) { objref.touchend(event); });
	}

	this.wrapper.dispatchEvent(this.onInit);

	side_panels.push(this);
	side_panels.sort(sortSidePanels);

	//this.icon.style.top = this.getIconPosition(this.position)+'px';
	AdjustSidePanelIconPositions();
	// alert(this.isStupidIE());
}

SidePanel.prototype.getBrowser = function() {
	if (this.browser != null)
		return this.browser;

	var ua= navigator.userAgent, 
    N= navigator.appName, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
    M= M[2]? [M[1], M[2]]:[N, navigator.appVersion, '-?'];
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    this.browser = M.join(' ');
    return this.browser;
}

SidePanel.prototype.isStupidIE = function() {
	if (this.getBrowser().search('MSIE 9') != -1 || this.getBrowser().search('MSIE 8') != -1 || this.getBrowser().search('MSIE 7') != -1)
	 	return true;
	 else
	 	return false;
}

SidePanel.prototype.createEvent = function(event_name) {
	
	var event;

  	if (document.createEvent) {
    	event = document.createEvent("HTMLEvents");
    	event.initEvent(event_name, true, true);
  	} else {
    	event = document.createEventObject();
    	event.eventType = event_name;
  	}

  	event.eventName = event_name;
  	return event;
}


SidePanel.prototype.touchend = function(e) {
	cancelEvent(e);
	var pos = pagePosition(e);
	
	this.touch_end_x = pos.x;

	var x_diff = this.touch_end_x - this.touch_start_x;
	
	if (this.touch_last_direction == 'left' && this.position == 'right') {
		this.show(undefined);
	}
	else if (this.touch_last_direction == 'left' && this.position == 'left') {
		this.hide();
	}
	else if (this.touch_last_direction == 'right' && this.position == 'right'){
		this.hide();
	}
	else if (this.touch_last_direction == 'right' && this.position == 'left') {
		this.show(undefined);
	}
	else
		this.toggle();
}

SidePanel.prototype.touchstart = function(e) {
	var pos = pagePosition(e);
	
	this.touch_last_x = pos.x;
	this.touch_start_x = pos.x;
	this.touch_last_direction = null;

	cancelEvent(e);
}

SidePanel.prototype.touchmove = function(e) {
	var pos = pagePosition(e);

	this.wrapper.style.zIndex = '1';
	//close new sidepanels
	if (current_sidepanel_index != -1 && current_sidepanel_index != this.getIndex())
		side_panels[current_sidepanel_index].hide();

	//close old sidepanels
	if(typeof closeSidepanels == 'function') {
		closeSidepanels();
		currentSidepanel = '';
	}

	var x_diff = pos.x - this.touch_start_x;

	var x_direction = pos.x - this.touch_last_x;

	if (x_direction < 0)
		this.touch_last_direction = 'left';
	else if (x_direction > 0)
		this.touch_last_direction = 'right';
	else
		this.touch_last_direction = null;

	this.touch_last_x = pos.x;

	if (Math.abs(x_diff) >= this.width) {
		return;
		cancelEvent(e);
	}

	if (this.position == 'right' && this.state == 'hidden' && x_diff < 0) {
		this.wrapper.style.webkitTransform = "translateX(-"+Math.abs(x_diff).toString()+"px)";
		this.wrapper.style.transform = "translateX(-"+Math.abs(x_diff).toString()+"px)";
	}
	else if (this.position == 'right' && this.state == 'visible' && x_diff > 0) {
		var x = this.width - x_diff;
		this.wrapper.style.webkitTransform = "translateX(-"+x+"px)";
		this.wrapper.style.transform = "translateX(-"+x+"px)";
	}

	if (this.position == 'left' && this.state == 'hidden' && x_diff > 0) {
		this.wrapper.style.webkitTransform = "translateX("+Math.abs(x_diff).toString()+"px)";
		this.wrapper.style.transform = "translateX("+Math.abs(x_diff).toString()+"px)";
	}
	else if (this.position == 'left' && this.state == 'visible' && x_diff < 0) {
		var x = this.width - Math.abs(x_diff);
		this.wrapper.style.webkitTransform = "translateX("+x+"px)";
		this.wrapper.style.transform = "translateX("+x+"px)";
	}


	this.wrapper.dispatchEvent(this.onTouchSlide);
	cancelEvent(e);
}

SidePanel.prototype.onAnimateEnd = function() {
	this.wrapper.style.WebkitTransition = '';
	this.wrapper.style.transition = '';
	// this.wrapper.style.WebkitTransition = 'all 5ms ease-in-out';
	// this.wrapper.style.transition = 'all 5ms ease-in-out';
	// this.wrapper.style.MsTransition = 'all 5ms ease-in-out';
	if (this.state == 'showing')
		this.shown();
	else if (this.state == 'hiding')
		this.hidden();
}

SidePanel.prototype.toggle = function() {
	this.wrapper.style.zIndex = '1';
		
	objref = this;
	setTimeout( function() {

		if (objref.state == 'visible') {
			objref.hide();
		}
		else if(objref.state == 'hidden') {
			objref.show();
		}

	}, 1);
	

}

SidePanel.prototype.show = function(speed,options) {
	/* [Caigoy,012616,ABCMG-128] Per request: disabled in favor of custom tracking event in TM */
	// track('sidePanelOpen', "panel_id="+this.id);

	this.wrapper.style.zIndex = '1';
	objref = this;
	setTimeout( function() {
		objref.showAnimate(undefined,options);
	},1);
}
// Edit BT 12/1/14 - added new param to scale sidepanel to new template size for BTTemplate 10.1
SidePanel.prototype.showAnimate = function(speed,options) {
	this.state = 'showing';
	//close old sidepanels
	if(typeof closeSidepanels == 'function') {
		closeSidepanels();
		currentSidepanel = '';
	}
	
	//close new sidepanels
	if (current_sidepanel_index != -1 && current_sidepanel_index != this.getIndex())
		side_panels[current_sidepanel_index].hide();

	current_sidepanel_index = this.getIndex();

	if (this.getIndex() == last_sidepanel_index)
		last_sidepanel_index = -1;

	this.wrapper.dispatchEvent(this.onShow);

	if (this.isStupidIE()) {
		// if (this.id == "ticketmachine_sp") {
		if (this.id == "ticketmachine") {
			this.jsAnimateTicketMachine();
			return;
		} else {
			this.jsAnimate('show');
			return;
		}
	}

	if (typeof speed == 'undefined') {
		this.wrapper.style.WebkitTransition = 'all '+this.speed+'ms ease-in';
		this.wrapper.style.transition 		= 'all '+this.speed+'ms ease-in';
		this.wrapper.style.MsTransition 	= 'all '+this.speed+'ms ease-in';
		this.wrapper.style.MozTransition 	= 'all '+this.speed+'ms ease-in';
		this.wrapper.style.OTransition 		= 'all '+this.speed+'ms ease-in';
	}
	else {
		this.wrapper.style.WebkitTransition = 'all '+speed+'ms ease-in';
		this.wrapper.style.transition 		= 'all '+speed+'ms ease-in';	
		this.wrapper.style.MsTransition 	= 'all '+speed+'ms ease-in';
		this.wrapper.style.MozTransition 	= 'all '+this.speed+'ms ease-in';
		this.wrapper.style.OTransition 		= 'all '+this.speed+'ms ease-in';
	}

	// BTurner handling for new template. Beware, dirty hack ahead. Better than generating new assets and redoing the html/css
	if (this.id == 'ticketmachine_sp') {
		this.scale_factor = 1;
		this.transformAndShowAnimate(options);
		return;
	}

	if (this.position == 'left') {
		this.wrapper.style.transform 		= "translateX("+this.width+"px)";
		this.wrapper.style.WebkitTransform 	= "translateX("+this.width+"px)";
		this.wrapper.style.MsTransform 		= "translateX("+this.width+"px)";
		this.wrapper.style.MozTransform 	= "translateX(-"+this.width+"px)";
		this.wrapper.style.OTransform 		= "translateX(-"+this.width+"px)";
	}
	else if (this.position == 'right') {
		this.wrapper.style.transform 		= "translateX(-"+this.width+"px)";
		this.wrapper.style.WebkitTransform 	= "translateX(-"+this.width+"px)";
		this.wrapper.style.MsTransform 		= "translateX(-"+this.width+"px)";
		this.wrapper.style.MozTransform 	= "translateX(-"+this.width+"px)";
		this.wrapper.style.OTransform 		= "translateX(-"+this.width+"px)";
	}
}

// This function applies two transformations sequentially (scale and transform). I was like, yo dawg, I heard you like (w*)rappers in your 
// (w*)rappers, and applied each transformation to each wrapper. Also, the timeout is being set because
// applying a transition to a newly appended DOM element is no bueno because the element will always be in its final state.
// Thanks to: http://stackoverflow.com/questions/16655024/css3-two-transitions-with-different-timing-functions-css3
// And: http://stackoverflow.com/questions/22882755/css3-transform-not-working-when-code-is-sequential
SidePanel.prototype.transformAndShowAnimate = function(options) {
	var meta_wrapper;

	if (!document.getElementById('meta-wrapper')) {
		this.wrapper.style.top 	= (typeof options != 'undefined' && options.hasOwnProperty('top')) ? options.top : '0';
		this.wrapper.style.left = (typeof options != 'undefined' && options.hasOwnProperty('left')) ? options.left : '1094px';

		var parent_node = this.wrapper.parentNode;
		meta_wrapper = document.createElement('div');

//		var mob_device = MOBILE || '';
		meta_wrapper.id = 'meta-wrapper';
/*
		if (mob_device.search('iphone') > -1 || mob_device.search('ipad') > -1) {
			meta_wrapper.style.position = 'absolute';
			meta_wrapper.style.top = '0px';
			meta_wrapper.style.right = '828px';
			
			var sp_div = document.getElementById('sidepaneldiv');
			sp_div.style.position = 'absolute';
			sp_div.style.top = '0px';
			sp_div.style.right = '0px';
			sp_div.style.zIndex = 9999999;
		}
*/
		parent_node.replaceChild(meta_wrapper, this.wrapper);
		meta_wrapper.appendChild(this.wrapper);

		setTimeout((function() {
			meta_wrapper.style.WebkitTransform  = "scale(" + this.scale_factor + ")";
			meta_wrapper.style.transform 		= "scale(" + this.scale_factor + ")";
			meta_wrapper.style.MsTransform	 	= "scale(" + this.scale_factor + ")";
			meta_wrapper.style.MozTransform 	= "scale(" + this.scale_factor + ")";
			meta_wrapper.style.OTransform 		= "scale(" + this.scale_factor + ")";
		}.bind(this)), 50)
	}

	setTimeout((function() {
		this.wrapper.style.WebkitTransform  = "translateX(-"+this.width+"px)";
		this.wrapper.style.transform 		= "translateX(-"+this.width+"px)";
		this.wrapper.style.MsTransform 		= "translateX(-"+this.width+"px)";
		this.wrapper.style.MozTransform 	= "translateX(-"+this.width+"px)";
		this.wrapper.style.OTransform 		= "translateX(-"+this.width+"px)";
	}.bind(this)),450)
}

SidePanel.prototype.shown = function() {
	this.state = 'visible';
	this.wrapper.dispatchEvent(this.onShown);
}

SidePanel.prototype.tempHide = function(speed) {
	last_sidepanel_index = current_sidepanel_index;
	this.hide(speed);
}

SidePanel.prototype.hide = function(speed) {

	this.state = 'hiding';


	current_sidepanel_index = -1;

	this.wrapper.dispatchEvent(this.onHide);

	if (this.isStupidIE()) {
		this.jsAnimate('hide');
		return;
	}

	if (typeof speed == 'undefined') {
		this.wrapper.style.WebkitTransition = 'all '+this.speed+'ms ease-in';
		this.wrapper.style.MsTransition = 'all '+this.speed+'ms ease-in';
		this.wrapper.style.transition = 'all '+this.speed+'ms ease-in';
	}
	else {
		this.wrapper.style.WebkitTransition = 'all '+speed+'ms ease-in';
		this.wrapper.style.MsTransition = 'all '+speed+'ms ease-in';
		this.wrapper.style.transition = 'all '+speed+'ms ease-in';	
	}

	
	if (this.position == 'left') {
		this.wrapper.style.webkitTransform = "translateX(0px)";
		this.wrapper.style.MsTransform = "translateX(0px)";
		this.wrapper.style.transform = "translateX(0px)";
	}
	else if (this.position == 'right') {
		var closePos = "0px";
		if(USINGAPP) {
			closePos = "-5px";
		}
		this.wrapper.style.webkitTransform = "translateX("+closePos+")";
		this.wrapper.style.MsTransform = "translateX("+closePos+")";
		this.wrapper.style.transform = "translateX("+closePos+")";
	}
}

SidePanel.prototype.hidden = function() {
	this.state = 'hidden';
	this.wrapper.style.zIndex = '';
	this.wrapper.dispatchEvent(this.onHidden);
}

SidePanel.prototype.jsAnimate = function(action) {
	this.js_current_x = parseInt(this.wrapper.style.left.replace('px', ''));

	if (this.position == 'left' && action == 'show') {
		this.js_end_x = 0;
		this.js_step = 1;
	}
	else if(this.position == 'left' && action == 'hide') {
		this.js_end_x = Math.parseInt('-'+this.width);
		this.js_step = -1;
	}

	if (this.position == 'right' && action == 'show') {
		this.js_end_x = 1025 - this.width;
		this.js_step = -1;
	}
	else if(this.position == 'right' && action == 'hide') {
		this.js_end_x = 1025;
		if (this.isStupidIE() && this.id === 'ticketmachine') this.js_end_x = 1010; //*** WIP35: IE9 TM SP tab closed position
		this.js_step = 1;
	}

	var objref = this;
	var animate_direction = action;
	
	// return;

	this.js_step = this.js_step * 15;

	this.js_timer = setInterval(function(){

		objref.js_current_x = objref.js_current_x + objref.js_step;

		if (objref.js_step > 0 && objref.js_current_x > objref.js_end_x) {
			objref.js_current_x = objref.js_end_x;
		}
		if (objref.js_step < 0 && objref.js_current_x < objref.js_end_x) {
			objref.js_current_x = objref.js_end_x;
		}
		objref.wrapper.style.left = objref.js_current_x+'px';

		if ( (objref.js_current_x >= objref.js_end_x && objref.js_step > 0) || (objref.js_current_x <= objref.js_end_x && objref.js_step < 0) ) {
			if (animate_direction == 'show')
				objref.shown();
			else if (animate_direction == 'hide')
				objref.hidden();

			clearInterval(objref.js_timer);
		}
	}, 10);
}

/*
 * @function jsAnimateTicketMachine
 * Because IE 9 sucks. 
 */
SidePanel.prototype.jsAnimateTicketMachine = function() {
	var meta_wrapper;
	if (!document.getElementById('meta-wrapper')) {
		this.wrapper.style.top = '0';
		this.wrapper.style.left = '1094px';

		var parent_node = this.wrapper.parentNode;
		meta_wrapper = document.createElement('div');
		meta_wrapper.id = 'meta-wrapper';


		parent_node.replaceChild(meta_wrapper, this.wrapper);
		meta_wrapper.appendChild(this.wrapper);

		this.wrapper.style.top = '0';
		this.wrapper.style.left = '1045px';
	}

	this.js_current_x = 1010; //*** WIP35: IE9 TM SP tab closed position
	this.js_end_x = 605; //*** WIP35: IE9 TM SP tab closed position
	this.js_step = -1;

	var objref = this;
	
	this.js_step = this.js_step * 15;

	this.js_timer = setInterval(function(){

		objref.js_current_x = objref.js_current_x + objref.js_step;

		if (objref.js_step > 0 && objref.js_current_x > objref.js_end_x) {
			objref.js_current_x = objref.js_end_x;
		}
		if (objref.js_step < 0 && objref.js_current_x < objref.js_end_x) {
			objref.js_current_x = objref.js_end_x;
		}
		objref.wrapper.style.left = objref.js_current_x+'px';

		if ( (objref.js_current_x >= objref.js_end_x && objref.js_step > 0) || (objref.js_current_x <= objref.js_end_x && objref.js_step < 0) ) {
				objref.shown();
			clearInterval(objref.js_timer);
		}
	}, 10);
}

