aoflLoadPolyfills();

var object_list = [];
var openPopups = [];
var doTracing = true;
var loadedPopupScripts = [];
var loadedPageScripts = [];
var pageIntervals = [];
var badword_list = []; //added by TJ on 8/16/2013
var pageScale; // 02.27.14 JK changed to a global variable

//// MOBILE DEVICE DEFINITIONS ///// Clark 01.05.15 ////
var agent = window.navigator.userAgent.toLowerCase();
var deviceType;
var MOBILE;
var appVersion;
if(agent.match(/ela_app/gi) == 'ela_app'){
	deviceType	= 'ios';
}else if(agent.match(/native_android/gi) == 'native_android'){
	deviceType	= 'android';
}
if(agent.match(/gonative/gi) == 'gonative'){
	var MOBILE		= deviceType;
	appver_string	= agent.match(/[0-9.]+\|/i);
	app_ver			= appver_string[0].split(/\|/i);
	appVersion		= app_ver[0];
}
///////////////////////////////////////////////////////

// 5.8.14 dh - Added for flexibility to control whether to reopen or not to reopen the sidepanel when there are no
// popups.
var reopenSidepanelWhenNoOpenPopups = true;

// debug tool
function trace(txt) {
	if (!doTracing) return;
	var line = '';
	for(var i=0;i<arguments.length;i++) line += arguments[i]+' ';
	var bar = document.getElementById("tracertext");
	if(bar) {
		bar.innerHTML = line+'<br>'+bar.innerHTML;
	}
}
function clearTracer() {
	var bar = document.getElementById("tracertext");
		if(bar) bar.innerHTML = '';
}
function pauseTracer() {
	doTracing = !doTracing;
	var btn = document.getElementById("pauseTracerBtn");
	if(btn) btn.innerHTML = (doTracing) ? 'Pause' : 'Start';
}
/////////////////////////////////////////////

function openActivityGroup(cid, options) {
	if(options)
		var closeBtnUrl = "&closebtn="+options;
	else
		var closeBtnUrl = '';

	showPopup('activity_group.php?cid='+cid+''+closeBtnUrl, 'actgroup'+cid);
}

/////////////////////////////////////////////
function ie_ver(){
    var iev=0;
    var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
    var trident = !!navigator.userAgent.match(/Trident\/7.0/);
    var rv=navigator.userAgent.indexOf("rv:11.0");

    if (ieold) iev=new Number(RegExp.$1);
    if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
    if (trident&&rv!=-1) iev=11;

    return iev;
}

// resize elements in curriculum icon
function adjustIcon(icon) {


	if(icon){
		var cid = icon.id.substring(10);
		var ie = ie_ver();

		if(ie == 11){
			var timeout = 20;
    	}else{
    		var timeout = 0;
    	}

    	setTimeout(function(){

		var width = parseInt(icon.style.maxWidth.substring(0,icon.style.maxWidth.length-2));
			icon.style.left = (width - icon.width + 20)/2 + 'px';

		var iconback = document.getElementById('iconback_'+cid);
		if(iconback){

			iconback.style.marginLeft = (width - icon.width)/2 + 'px';

			iconback.style.width = (icon.width+20)+'px';
			iconback.style.visibility = '';
		}

		var iconplays = document.getElementById('iconplays_'+cid);
		if(iconplays){
			iconplays.style.marginLeft = (width - icon.width)/2 + icon.width - 20 + 'px';
			iconplays.style.visibility = '';
		}

		var spin = document.getElementById('iconspin_'+cid);
		if(spin && spin.parentNode) spin.parentNode.removeChild(spin);
		icon.style.visibility = '';

		}, timeout);


	}
}

////////////////////////////////////////////////////////////////////
function openPrintable(cid) {

	var printpop = document.getElementById('printableviewer');
	if(!printpop) showPopup('printables.php?cid='+cid, 'printableviewer');
}

/////////////////////////////////////////////////////////////////////

function trim(str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}

/////////////////////////////////////////////////////////////////////
// get x and y offsets for element to document body
function nodeOffsets(id, relativeid) {
	var node = (typeof(id) == 'string') ? document.getElementById(id) : id;
	var offsets = {x:0, y:0};

	if(node) {
		while(node) {

			offsets.x += node.offsetLeft + node.clientLeft;
			offsets.y += node.offsetTop + node.clientTop;

			var marginx = parseInt(node.style.marginLeft.substring(0,node.style.marginLeft.length-2));
			if(!isNaN(marginx)) offsets.x += marginx;
			var marginy = parseInt(node.style.marginTop.substring(0,node.style.marginTop.length-2));
			if(!isNaN(marginy)) offsets.y += marginy;

			node = node.offsetParent;
		}
	}

	if(relativeid != undefined) {
		var other = nodeOffsets(relativeid);
		offsets.x -= other.x;
		offsets.y -= other.y;
	}

	return offsets;
}
//////////////////////////////////////////////////////////
//quick way of checking if an object has elements
function hasProperties(obj) {
	   for(var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	         return true;
	   }
	   return false;
	}
}

/////////////////////////////////////////////////////////////////////
// get x and y offsets for element to document body
function contentAreaOffsets(id) {
	return nodeOffsets(id, 'content_area');
}


// convert mouse event to coordinates of element
function pagePosition(event, offset) {
	var pos = {x:0, y:0, eventX:0, eventY:0};
	event = event || window.event;
	try {
		//modifed bt TM 12/18/13 to add a pageScale for when android devices resize the site.
		//re-modified 02/27/14
		pageScale = (pageScale == null) ? 1 : pageScale;
		if((event.touches && event.touches.length) || (event.changedTouches && event.changedTouches.length)) {
			//modified by TJ on 12/12/2013, touch end doesn't have touches
			if(event.touches[0]) {
				pos.x = event.touches[0].pageX/pageScale;
				pos.y = event.touches[0].pageY/pageScale;
			} else if(event.changedTouches[0]) {
				pos.x = event.changedTouches[0].pageX/pageScale;
				pos.y = event.changedTouches[0].pageY/pageScale;
			}
		} else {
			if (event.pageX || event.pageY) {
				pos.x = event.pageX/pageScale;
				pos.y = event.pageY/pageScale;
			} else if (event.clientX || event.clientY) {
				pos.x = (event.clientX/pageScale) + document.body.scrollLeft + document.documentElement.scrollLeft;
				pos.y = (event.clientY/pageScale) + document.body.scrollTop	+ document.documentElement.scrollTop;
			}
		}

		if(offset && !isNaN(offset.x) && !isNaN(offset.y)) {
			//MAG 05/01/2014: Converted to integers since IE returns decimal values
			pos.x = parseInt(pos.x);
			pos.y = parseInt(pos.y);

			pos.x -= offset.x;
			pos.y -= offset.y;
		}
	} catch(err) {
            console.error(err);
        }

	return pos;
}

/////////////////////////////////////////////////////////////////////

function clickObjectCalled(objid) {
	var obj = getObjectById(objid);

	if(document.createEvent) {
		var event = document.createEvent('Event');
		event.initEvent('myclick', true, true);
		obj.dispatchEvent(event);

		// look for earlier onclick attributes
		var count = 1;
		while(obj && obj.priorClick && count < 20) {
			count++;
			if(obj.priorClick.search('clickObjectCalled') == -1) {
				try { eval(obj.priorClick); }
				catch(err) {
					trace('ERROR from clickObjectCalled'); //added by TJ on 8/9/2013, to make it easier to track the
														   // errors
					trace(err);
				}
				obj = null;
			}
			else {
				var newobjid = parseInt(obj.priorClick.substring(18));

				if(newobjid == objid) obj = null;
				else obj = getObjectById(objid);
			}
		}
	}
}

// MAG 04/24/2104: Created the following function that checks if the device is touch capable
function isTouchDevice() {
	return (('ontouchstart' in window)
	|| (navigator.MaxTouchPoints > 0)
	|| (navigator.msMaxTouchPoints > 0));

	/*
	Josh  replacing this complicated logic with much simplifier return

	var IE10Gesture = (window.navigator && window.navigator.msPointerEnabled && window.MSGesture); // Detects 'Gestures' functionality on IE =<10
	var IE11Gesture = (window.navigator && window.navigator.PointerEnabled && window.Gesture); // Detects 'Gestures' functionality on IE >= 11

   	var el = document.createElement('div');
   	el.setAttribute('ongesturestart', 'return;');
   	el.setAttribute('onpointerdown', 'return;');
   	el.setAttribute('ontouchstart', 'return;');

   	if(document.createTouch) {
   	   	return true;
   	}
	else if(typeof el.ongesturestart == 'function' || typeof el.onpointerdown == 'function' || typeof el.ontouchstart == 'function') {
	//else if(typeof el.ongesturestart == 'function' ||typeof el.ontouchstart == 'function') {
      	return true;
    }else if(IE10Gesture || IE11Gesture || window.DocumentTouch && document instanceof DocumentTouch){
    	return true;
   	}else if(navigator.msMaxTouchPoints > 0 || navigator.MaxTouchPoints > 0) {
   	  	return true;
   	}else {
      	return false;
   	}

	*/
}


function addListener(obj, type, callback, bubble) {

	if(bubble == undefined) bubble = false;
	if(typeof(obj) == 'string') obj = document.getElementById(obj);


	if(type == 'click' && obj && obj.setAttribute && obj.addEventListener) {
		var objid = assignObjectId(obj);

		obj.priorClick = obj.getAttribute('onclick');
		obj.setAttribute('onclick', "clickObjectCalled("+objid+")");

		obj.addEventListener('myclick', callback, bubble);
		return;
	}

	//added convertedtype because in some cases an event object is passed to the addListener and indexOf can't be used.
	// DAG 5.2.14

	var convertedType = typeof(type) == 'string' ? type : type['type'];

	//MAG 04/24/2014: Added the following conditionals to add additional event handlers to desktops/laptops with touch
	// screens JK 05.19.14 added typeof(MOBILE) condition because this variable is not defined outside the paywall and
	// was causing the javascript for the videoplayer to crash.
	if(obj && obj.setAttribute && obj.addEventListener && convertedType.indexOf('touch') > -1 && typeof(MOBILE) != 'undefined' && MOBILE.length == 0) {
		if(obj.id == 'vp_closebtn_1') alert('here3');
		var replaceEvent;
		if('MSPointerDown' in window) { // Checks for Pointer Events in IE10 / Windows 8
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'MSPointerDown'; break;
				case 'touchmove': replaceEvent = 'MSPointerMove'; break;
				case 'touchend': replaceEvent = 'MSPointerUp'; break;
			}
		}
		else if ('pointerdown' in window) { // Checks for Pointer Events in IE11 / Windows 8
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'pointerdown'; break;
				case 'touchmove': replaceEvent = 'pointermove'; break;
				case 'touchend': replaceEvent = 'pointerup'; break;
			}
		}
		else if('onmousedown' in window){
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'mousedown'; break;
				case 'touchmove': replaceEvent = 'mousemove'; break;
				case 'touchend': replaceEvent = 'mouseup'; break;
			}
		}

		obj.addEventListener(replaceEvent, callback, bubble);

	}

	if(obj && obj.addEventListener){
		obj.addEventListener(type, callback, bubble);
	} else if(obj && obj.attachEvent) {
		//added by MS 22/03/2013, this is needed for IE8
		if(!addListener.listeners) {
			addListener.listeners = {};
			addListener.nextListenerId = 0;
		}
		//wrap the callback on another function so we can set the context to be the obj
		var callbackWrapper = function(event) {
			//modified by TJ on 8/9/2013, try to catch the error if occur
			try{
				//needed for getEventTarget
				event.customTarget = obj;
				return callback.call(obj, event);
			} catch(e) {
				trace("ERROR from addListener");
				trace(callback);
			}
		};
		//store the wrapper function so we can remove it on removeListener()
		callback.listener_id = "listener_id_" + addListener.nextListenerId++;
		addListener.listeners[callback.listener_id] = {callback: callback, callbackWrapper: callbackWrapper};
		obj.attachEvent('on'+type, callbackWrapper);
	}
}

function removeListener(obj, type, callback, bubble) {
	if(bubble == undefined) bubble = false;
	if(typeof(obj) == 'string') obj = document.getElementById(obj);
	if(type == 'click' && obj.setAttribute && obj.removeEventListener) {
		obj.setAttribute('onclick', null);
		obj.removeEventListener('myclick', callback, bubble);
		return;
	}

	//added convertedtype because in some cases an event object is passed to the addListener and indexOf can't be used.
	// DAG 5.2.14
	var convertedType = typeof(type) == 'string' ? type : type['type'];

	// MAG 04/24/2014: Added the following conditions to remove additional events added on desktop/laptops with touch
	// screens
	if(obj && obj.setAttribute && obj.removeEventListener && convertedType.indexOf('touch') > -1 && MOBILE.length == 0) {
		var replaceEvent;
		if('MSPointerDown' in window) { // Checks for Pointer Events in IE10 / Windows 8
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'MSPointerDown'; break;
				case 'touchmove': replaceEvent = 'MSPointerMove'; break;
				case 'touchend': replaceEvent = 'MSPointerUp'; break;
			}
		}
		else if ('pointerdown' in window) { // Checks for Pointer Events in IE11 / Windows 8
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'pointerdown'; break;
				case 'touchmove': replaceEvent = 'pointermove'; break;
				case 'touchend': replaceEvent = 'pointerup'; break;
			}
		}
		else if('onmousedown' in window){
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'mousedown'; break;
				case 'touchmove': replaceEvent = 'mousemove'; break;
				case 'touchend': replaceEvent = 'mouseup'; break;
			}
		}

		obj.removeEventListener(replaceEvent, callback, bubble);
	}

	if(obj && obj.removeEventListener) {
		obj.removeEventListener(type, callback, bubble);

	} else if(obj && obj.detachEvent) {
		//added by MS 22/03/2013, this is needed for IE8
		var listeners = addListener.listeners;

		//if the callback has a listener_id use it to remove the listener
		if(callback && callback.listener_id && listeners && listeners[callback.listener_id]) {

			obj.detachEvent('on'+type, listeners[callback.listener_id].callbackWrapper);
			delete listeners[callback.listener_id];

		} else if(listeners && callback) {
			//if no listener_id compare the code of the two functions, this is needed for anonymous callback funtions
			for(var x in listeners) {
				if(!listeners.hasOwnProperty(x)) continue;
				if(typeof(listeners[x]) === "function") continue;

				if(listeners[x].callback && callback.toString() == listeners[x].callback.toString()) {
					obj.detachEvent('on'+type, listeners[x].callbackWrapper);
					delete listeners[x];
					break;
				}
			}

		} else {
			obj.detachEvent('on'+type, callback);
		}
	}
}

/////////////////////////////////////////////////////////////////////
// create popup window, name is php file name in popups directory.
// name is used as id if no divid is supplied
// 11.11.14 dh - added tweenProps param
var popupAjax;
function showPopup(name, divid, blockScreen, inPayWall, properties){
	//appCall('loadMMLShell:full_screen_web_view');
	// isAndroid is defined in the template func file.
	// $this->isAndroid in the main template. Len - 10/17/14

	//reference this scope for use in the scope of the ajax callback - EO 12/29/14
	var that = this;

	if(isAndroid && !isUnity){
		// The following condition selections are all the same separated for readability only
		var nameCheck = name.split('.')[0];
		if(nameCheck.indexOf('settings_popup') > -1 ||
			nameCheck.indexOf('changeuser') > -1 ||
			nameCheck.indexOf('activity_group') > -1 ||
			nameCheck.indexOf('printables') > -1 ||
			(nameCheck.indexOf('feedback') > -1 && nameCheck.indexOf('feedback_survey') < 0)) {
			Android.showPopup('url=' + WEBHOST + '/html5/popups/'+ encodeURIComponent(name));
			return;
		}
// Commented this block out until Android supports these popups natively - Clark 11.11.14
//		if ((PAGEURL.indexOf('aquarium') > -1 ||
//			PAGEURL.indexOf('hamster') > -1 ||
//			PAGEURL.indexOf('paintby') > -1) &&
//			//(nameCheck.indexOf('animalinfobox') < 0) &&
//			(nameCheck.indexOf('store_alert') < 0) &&
//			(nameCheck.indexOf('store_alert_new') < 0)) {
//			Android.showPopup('url=' + WEBHOST + '/html5/popups/'+ encodeURIComponent(name));
//			return;
//		}
	}
    inPayWall = (inPayWall !== void 0 ? inPayWall : true);
    if(openPopups.length>0){
        for(i=0;i<openPopups.length;i++){/*
            if(openPopups[i].id == divid && openPopups[i] == openPopups[0]){
            	if(!isAndroid) setTimeout(function(){ appCall('stopSpinner') }, 10);
	            return;
            }
            if(openPopups[i].id == name  && openPopups[i] == openPopups[0]){
            	if(!isAndroid) setTimeout(function(){ appCall('stopSpinner') }, 10);
            	return;
	        }*/
        }
    }

    var bScreen = blockScreen;
    if(divid == undefined){
        var parts = name.split('?');
        var divid = parts[0];
    }
    var div = document.getElementById(divid);
    if(typeof closeSidepanels == 'function'){
  	  closeSidepanels();
  	}
  	if (typeof SidePanel == 'function') {
  		if (current_sidepanel_index != -1){
  			side_panels[current_sidepanel_index].tempHide();
  		}
  	}
    if(div){
        div.parentNode.appendChild(div);


        for(i=0;i<openPopups.length;i++){
            if(openPopups[i].id==div.id){
                openPopups.splice(i,1);
                openPopups.unshift(div);
                hideOtherPops();
                return;
            }
        }
    }else{
      	cancelAjax(popupAjax);
		var NoThing = '';//null

		popupAjax = asynchronous("/html5/popups/"+name, NoThing, function(data) {
				writeCssScripts(divid , data ,bScreen, inPayWall);
				if( (typeof properties != 'undefined') && (properties.hasOwnProperty(tweenProps)) ) {
					var tweenProps = properties.tweenProps;
					var popup = document.getElementById(divid);
					if(properties.positions && properties.positions.top) popup.style.top = properties.positions.top + "px";

					var tween = new Tween(popup, tweenProps.prop,
											tweenProps.begin, tweenProps.finish,
											tweenProps.duration);
					tween.start();
				}
		});
    }
}

/*
var popupAjax;
function showPopup(name, divid, blockScreen, inPayWall){
    inPayWall = (typeof inPayWall !== 'undefined' ? inPayWall : true);
    if(openPopups.length>0){
        for(i=0;i<openPopups.length;i++){
            if(openPopups[i].id == divid && openPopups[i] == openPopups[0])return;
            if(openPopups[i].id == name  && openPopups[i] == openPopups[0])return;
        }
    }
    var bScreen = blockScreen;
    if(divid == undefined){
        var parts = name.split('?');
        var divid = parts[0];
    }
    var div = document.getElementById(divid);
    if(div){
        div.parentNode.appendChild(div);
        for(i=0;i<openPopups.length;i++){
            if(openPopups[i].id==div.id){
                openPopups.splice(i,1);
                openPopups.unshift(div);
                hideOtherPops();
                return;
            }
        }
    }else{
        cancelAjax(popupAjax);
     	popupAjax = ajax("/html5/popups/"+name, null, function(data) {
     		writeDiv(divid , data ,bScreen,inPayWall);
     	});
    }
}
*/

function writeCssScripts(name,content,blockScreen,inPayWall){
		var source = content;
		var loadcnt = 0;
		var scripts =  new Array();

	    var bScreen 		= 	blockScreen;
		var div             =   document.createElement('div');
	        div.id              =   name;
	        div.className       =   'popup';
	    if(!bScreen)bScreen =   'content_area';
	        div.blockScreen     =   bScreen;

        if(!inPayWall){
            document.body.appendChild(div);
        }else{
            if(document.getElementById('popupdiv'))	document.getElementById('popupdiv').appendChild(div);
        }

		//alert('test');

        div.style.position = 'absolute';
        div.style.visibility = 'hidden';
		if(div) {
			if(loadedPopupScripts[name] === void 0)
				loadedPopupScripts[name] = [];

		// Strip out tags
		while(source.indexOf("<link") > -1 || source.indexOf("</link") > -1) {
			var startIndex = source.indexOf("<link");
			var endIndex = source.indexOf(">", startIndex);
			var script = source.substring(startIndex+1, endIndex+1);

			if(script != '') {
				var start = script.indexOf("href=");
				if(start > -1){
					var end = script.indexOf(">", start);
					var srcfile = script.substring(start+6, end-1);
					var cbScript = document.createElement('link');
						cbScript.type= 'text/css';
						cbScript.rel = "stylesheet";
						cbScript.href = srcfile;
					loadedPopupScripts[name].push(cbScript);
					document.body.appendChild(cbScript);
				}
			}
			source = source.substring(0, startIndex) + source.substring(endIndex+1);
		}
			writeDiv(name, div, source, scripts, bScreen);
			//(name, div, content, scripts, blockScreen)
	}
}
// put contents of popup in div, loading and executing scripts as needed
function writeDiv(name, div, content, pageScript, bScreen){
	if(div) {
		var source = content;
		var scripts = pageScript;
		var loadcnt = 0;
		// Added to check if the writeDivFinal has been fire or not. RL 12/23/2013
		var divNotWroteYet = true;
		var tempLoadedScripts = [];
		// Strip out tags
		while(source.indexOf("<script") > -1 || source.indexOf("</script") > -1) {
			var s = source.indexOf("<script");
			var s_e = source.indexOf(">", s);
			var e = source.indexOf("</script", s);
			var e_e = source.indexOf(">", e);
			var script = source.substring(s_e+1, e);
			if(script == '') {
				script = source.substring(s+8, e);
				var start = script.indexOf("src=");
				if(start > -1){
					var end = script.indexOf(">", start);
					var srcfile = script.substring(start+5, end-1);
					var cbScript = document.createElement('script');
						cbScript.type= 'text/javascript';
						cbScript.src = srcfile;
					loadcnt++;
					loadedPopupScripts[name].push(cbScript);
					tempLoadedScripts.push(cbScript);
				}
			}else{
				scripts.push(script);
			}
			source = source.substring(0, s) + source.substring(e_e+1);
		}

		//IE & general fix over all to handle an issue of writeNavDivFinal getting repeatedly called rather then being
		// called once. DAG 10.30.13
		if(tempLoadedScripts.length > 0 ){
			for(var i=0;i<tempLoadedScripts.length;i++){
			var cbScript = tempLoadedScripts[i]
				document.body.appendChild(cbScript);

				//This is to fix IE not loading on 1st load issues. DAG 11.6.13
				if(typeof BROWSER == 'undefined') { BROWSER = ''; } //BROWSER is not always defined!! (scotth 20141010)
				if(BROWSER.indexOf('IE') >= 0 && BROWSER.indexOf('11') == -1){ // MAG 03/19/2014: Added this condition to fix IE11 bug ('onreadystatechange' event deprecated on IE11)
					cbScript.onreadystatechange = function(){
					//modified by TJ on 9/26/2012, count only when file is loaded

						if(this.readyState ==  undefined || this.readyState  == 'complete' || this.readyState == 'loaded'){
							loadcnt--;
						}
						if((loadcnt <= 0) && divNotWroteYet){
							writeDivFinal(name, div, source, scripts,bScreen);
							divNotWroteYet = false;
						}
					};
				}else{
					cbScript.onload = function(){
					//modified by TJ on 9/26/2012, count only when file is loaded
						if(this.readyState ==  undefined || this.readyState  == 'complete' || this.readyState == 'loaded'){
							loadcnt--;
						}
						if((loadcnt <= 0) && divNotWroteYet){
							writeDivFinal(name, div, source, scripts,bScreen);
							divNotWroteYet = false;
						}
					};
				}
			}
		}else{
			writeDivFinal(name, div, source, scripts,bScreen);
		}
	}
}

/*
function showPopup(name, divid, blockScreen, inPayWall){
    inPayWall = (inPayWall !== void 0 ? inPayWall : true);
    if(openPopups.length>0){
        for(i=0;i<openPopups.length;i++){
            if(openPopups[i].id == divid && openPopups[i] == openPopups[0])return;
            if(openPopups[i].id == name  && openPopups[i] == openPopups[0])return;
        }
    }
    var bScreen = blockScreen;
    if(divid == undefined){
        var parts = name.split('?');
        var divid = parts[0];
    }
    var div = document.getElementById(divid);
    if(typeof closeSidepanels == 'function')
  	  closeSidepanels();

    if(div){
        div.parentNode.appendChild(div);
        for(i=0;i<openPopups.length;i++){
            if(openPopups[i].id==div.id){
                openPopups.splice(i,1);
                openPopups.unshift(div);
                hideOtherPops();
                return;
            }
        }
    }else{
        cancelAjax(popupAjax);
     	popupAjax = ajax("/html5/popups/"+name, null, function(data) {
     		writeDiv(divid , data ,bScreen,inPayWall);
     	});
    }
}

// put contents of popup in div, loading and executing scripts as needed
function writeDiv(name, content,blockScreen,inPayWall){

	    var bScreen 		= 	blockScreen;
		var div             =   document.createElement('div');
        div.id              =   name;
        div.className       =   'popup';
        if(!bScreen)bScreen =   'content_area';
        div.blockScreen     =   bScreen;

        if(!inPayWall){
            document.body.appendChild(div);
        }else{
            if(document.getElementById('popupdiv'))	document.getElementById('popupdiv').appendChild(div);
        }

        div.style.position  =   'absolute';
        div.style.visibility   =   "hidden";

	if(div) {
		if(loadedPopupScripts[name] === void 0)
			loadedPopupScripts[name] = [];
		var source = content;
		var scripts = new Array();
		var includes = new Array();
		var loadcnt = 0;
		// Added to check if the writeDivFinal has been fire or not. RL 12/23/2013
		var divNotWroteYet = true;
		// Strip out tags
		while(source.indexOf("<script") > -1 || source.indexOf("</script") > -1) {

			var s = source.indexOf("<script");
			var s_e = source.indexOf(">", s);
			var e = source.indexOf("</script", s);
			var e_e = source.indexOf(">", e);

			var script = source.substring(s_e+1, e);
			if(script == '') {
				script = source.substring(s+8, e);
				var start = script.indexOf("src=");
				if(start > -1)
				{
					//someone added this and it broke the popups. Len - 9/17/13
					//var quote = script.charAt(start+4);
					//var end = script.indexOf(quote, start);
					var end = script.indexOf(">", start);
					var srcfile = script.substring(start+5, end-1);
					var cbScript = document.createElement('script');
					cbScript.type= 'text/javascript';
					loadcnt++;
					cbScript.onload = cbScript.onreadystatechange = function()
						{
							//modified by TJ on 9/26/2012, count only when file is loaded
							if(this.readyState ==  undefined || this.readyState  == 'complete' || this.readyState == 'loaded') {
								loadcnt--;
							}
							if((loadcnt <= 0) && divNotWroteYet){
								writeDivFinal(name, div, source, scripts,bScreen);
								divNotWroteYet = false;
							}
						};

					cbScript.src = srcfile;
					loadedPopupScripts[name].push(cbScript);
					document.body.appendChild(cbScript);
				}
			}
			else {
				scripts.push(script);
			}
			source = source.substring(0, s) + source.substring(e_e+1);
		}

		if(loadcnt == 0) {
			writeDivFinal(name, div, source, scripts, bScreen);
		}
	}
}
*/
// if scripts needed to be loaded finish up after they are ready
function writeDivFinal(name, div, content, scripts, blockScreen){
	//alert('test');
	var dragger_handle;
	div.innerHTML = content;
	var bScreen = document.getElementById(blockScreen);
	var offsets = nodeOffsets(blockScreen);
	for(var i=0;i<scripts.length;i++)
    {
		var s = document.createElement('script');
		try {
			//modified by TJ on 9/26/2012, innerHTML method doesn't exist in script element.
			//s.innerHTML = scripts[i];
			s.type = 'text/javascript';
			s.text = scripts[i];
			loadedPopupScripts[name].push(s);
			document.body.appendChild(s);
		} catch(err) {
			trace("ERROR from writeDivFinal"); //added by TJ on 8/9/2013, to make it easier to track the error.
			trace(err);
		}
	}

    var checked = 0;
	var maxw = 0;
	var maxh = 0;
	for(var i=0;i<div.childNodes.length;i++) {
		if(!isNaN(div.childNodes[i].offsetWidth)) maxw = Math.max(maxw, div.childNodes[i].offsetWidth);
		if(!isNaN(div.childNodes[i].offsetHeight)) maxh = Math.max(maxh, div.childNodes[i].offsetHeight);
	}

	div.style.width = maxw + 'px';
	div.style.height = maxh + 'px';
	var pos_l = bScreen.offsetLeft + Math.min(bScreen.offsetWidth - maxw,bScreen.offsetWidth/2 - maxw/2) + 2;
	div.style.left =  Math.round(pos_l) + 'px';
	var pos_t = bScreen.offsetTop + Math.min(bScreen.offsetHeight - maxh,bScreen.offsetHeight/2 - maxh/2) + 2;
	div.style.top =  Math.round(pos_t) + 'px';
	div.style.visibility = 'inherit';

	for(i=0;i<openPopups.length;i++){
        if(openPopups[i].id == div.id){
            openPopups.splice(i,1);
            openPopups.unshift(div);
            hideOtherPops();
            return;
        }
        checked++;
    }

    if(checked == openPopups.length){
       openPopups.unshift(div);
        hideOtherPops();
    }
}

function closePopup(divid)
{
	var div = document.getElementById(divid);
	var small_screen = document.getElementById('small_screen');
	if(div && div.parentNode)
    {
		div.parentNode.removeChild(div);
	}
	//small_screen.style.visibility = 'hidden';
	small_screen.style.display = 'none';
}

function resizePopup(divid, width, height) {
	var div = document.getElementById(divid);
	if(div) {
		for(var i=0;i<div.childNodes.length;i++) {
			if(div.childNodes[i].className && div.childNodes[i].className.substring(0,10) == 'popupframe')
				var frame = div.childNodes[i];
		}
		if(!isNaN(width)) {
			div.style.width = width+'px';
			if(frame) frame.style.width = width+'px';
		}
		if(!isNaN(height)) {
			div.style.height = height+'px';
			if(frame) frame.style.height = height+'px';
		}
	}
}

function hideOtherPops(recursive)
{
	//no

	for(i=0; i < openPopups.length;i++)
    {
		if(openPopups[i] == openPopups[0])
		{
			openPopups[i].style.visibility = 'inherit';
		}
		else
		{
			openPopups[i].style.visibility = 'hidden';
			if(openPopups[i].id == 'volumeslider.php')
			{

				var iframe = document.createElement("IFRAME");
				iframe.setAttribute("src", "js-call:hideVolumeSlider");
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;

			}
		}
	}

}

function showBlockScreen(color){
	var blockScreen = document.getElementById('small_screen');
	if(!blockScreen) return; // MAG 05/14/2014: Added this condition to provide the right functionality to popups
													 // inserted as pages (for iOS)

	blockScreen.style.visibility = 'inherit';
	blockScreen.style.display = 'block';
	if(color){
		blockScreen.style.backgroundColor	= color;
	}
}

function showBlockEverything()
{
	// added for pop-ups that need to block the entire template.  Clark 04/28/2014
	var main_div = document.getElementById('maindiv');
	var overlay = document.createElement('div');
	overlay.setAttribute('id','maindiv_overlay');

	main_div.insertBefore(overlay, main_div.firstChild);
}

function setTempBlockScreen()
{
	var largeScreen = document.getElementById('large_screen');
	if(largeScreen.style.visibility != 'visible'){
		largeScreen.style.visibility = 'visible';
		largeScreen.style.zIndex = '1';
	}
}

function removeTempBlockScreen()
{
	var largeScreen = document.getElementById('large_screen');
	if(largeScreen.style.visibility == 'visible')
		largeScreen.style.visibility = 'hidden';
}

// 1.6.17 - added `closeIframe` param that is simply passed through to `dispatchClosePopup`
function closeBlockScreen(closeIframe) {
//	appCall('closePopup');
     var smallScreen = document.getElementById('small_screen');
	popup_inuse = 0;
	var div;

	if(openPopups.length > 0){
		var div = openPopups[0];

		/* if(document.createEvent) {
			var closepopup = document.createEvent('Event');
				closepopup.initEvent('closepopup', true, true);
		}else if(document.createEventObject) {
			var closepopup = document.createEventObject();
				closepopup.type = 'closepopup';
		}
		var dispatchDiv = document.getElementById(div.getAttribute('popupFrameId'));
		if(dispatchDiv && dispatchDiv.dispatchEvent){
			dispatchDiv.dispatchEvent(closepopup);
		}  */


		dispatchClosePopup(div, closeIframe);

		if(div.parentNode) {
			div.parentNode.removeChild(div);
		}

		//trace("callback? ", typeof window.popupCallback, "id--", div.id);
		if(typeof window.popupCallback == 'function'){
			window.popupCallback();
			window.popupCallback = null;
			trace('no more callback ', typeof window.popupCallback);
		}

		for(i=0; i < openPopups.length;i++){
			if(openPopups[i] == div){
				if (openPopups[0].id == 'password_check_popup')
					passwordPopupVisible = false;
				openPopups.splice(i,1);
				if(loadedPopupScripts[div.id].length > 0){
					for(var j=loadedPopupScripts[div.id].length-1;j>-1;j--){
						if(loadedPopupScripts[div.id][j]){
							loadedPopupScripts[div.id][j].parentNode.removeChild(loadedPopupScripts[div.id][j]);
						}
					}
					loadedPopupScripts[div.id] = [];
				}
			}
		}
		if(openPopups.length>0){
			openPopups[0].style.visibility = 'inherit';
			if(openPopups[0].id == 'volumeslider.php')
			{
				var iframe = document.createElement("IFRAME");
				iframe.setAttribute("src", "js-call:showVolumeSlider:198:424:365:41");
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;
			}
		}
	}
	if(openPopups.length==0){
		if(smallScreen) {
            smallScreen.style.display = 'none';
		}

		if(typeof closeSidepanels == 'function' && reopenSidepanelWhenNoOpenPopups == true) {
		    reopenSidepanels();
		}

		if (typeof SidePanel == 'function') {
  			if (last_sidepanel_index != -1)
  				side_panels[last_sidepanel_index].show();
  		}
	}else {
	    smallScreen.style.display = 'block';
	}
}

// 1.6.17 - added `closeIframe` param; if true, send a message to the parent frame to tell it
// to close the iframe containing the popup
function closeAllPopups(callback, closeIframe){
    var dispatch, smallScreen = document.getElementById('small_screen');
	for(i=openPopups.length-1; i > -1;i--){
		if(loadedPopupScripts[openPopups[i].id].length > 0){
			for(var j=loadedPopupScripts[openPopups[i].id].length-1;j>-1;j--){
				if(loadedPopupScripts[openPopups[i].id][j]){
					loadedPopupScripts[openPopups[i].id][j].parentNode.removeChild(loadedPopupScripts[openPopups[i].id][j]);
				}
			}
			loadedPopupScripts[openPopups[i].id] = [];
		}
		// 4.7.14 dh - dispatch for each popup
		dispatchClosePopup(openPopups[i]);
		openPopups[i].parentNode.removeChild(openPopups[i]);

		//Added to resolve the small_screen div issue where it would not be hidden when all popups were gone in IE
		if (i === 0) {
		    openPopups = [];
            closeBlockScreen();

		    if (callback && typeof callback === 'function') {
		        if (smallScreen ) {
		            smallScreen.style.display = 'none';
		        }
                callback();
		    }
		}
	}
	if (closeIframe) {
		window.parent.postMessage({
			type: 'iframe-popup-closed',
			payload: document.location.href
		}, '*');
	}
}

// 4.7.14 dh - dispatch closepopup
// 1.6.17 - added `closeIframe` param; if true, send a message to the parent frame to tell it
// to close the iframe containing the popup
function dispatchClosePopup(div, closeIframe) {
	if(document.createEvent) {
		var closepopup = document.createEvent('Event');
			closepopup.initEvent('closepopup', true, true);
	}else if(document.createEventObject) {
		var closepopup = document.createEventObject();
			closepopup.type = 'closepopup';
	}
	var dispatchDiv = document.getElementById(div.getAttribute('popupFrameId'));
	if(dispatchDiv && dispatchDiv.dispatchEvent){
		dispatchDiv.dispatchEvent(closepopup);
	}
	if (closeIframe) {
		window.parent.postMessage({
			type: 'iframe-popup-closed',
			payload: document.location.href
		}, '*');
	}
}

//////////////////////Navigate To////////////////////////////////////////////////////////////////////
var navAjax;
function navTo(name, skipHistory) {
	if (!skipHistory) {
		currentHash = name.replace('php','');
		currentHash = currentHash.replace('/html5/','');
		window.location.hash = currentHash;
	}
	cancelAjax(navAjax);
	navAjax = ajax(name, null, function(data) { writeNavCssScripts('content_area' , data);});
}

//work around for non-hash system
function goBack(name){
  var div = document.getElementById('content_area');
  currentHash = name.replace('php','');
  	cancelAjax(navAjax);
	//navAjax = ajax(name, null, function(data) { writeCssScripts(div.id , data);});
}

function writeNavCssScripts(name,content){

		var source = content;
		var includes = new Array();
		var loadcnt = 0;
		var div = document.getElementById(name);
		var scripts =  new Array();

		if(div) {
			if(loadedPageScripts.length > 0){
			for(var i=loadedPageScripts.length-1;i>-1;i--){
				if(loadedPageScripts[i]){
					loadedPageScripts[i].parentNode.removeChild(loadedPageScripts[i]);
					loadedPageScripts[i] = null;
				}
			}
			loadedPageScripts = [];
		}

		// Strip out tags

		while(source.indexOf("<link") > -1 || source.indexOf("</link") > -1) {
			var startIndex = source.indexOf("<link");
			var endIndex = source.indexOf(">", startIndex);
			var script = source.substring(startIndex+1, endIndex+1);
			if(script != '') {
				var start = script.indexOf("href=");
				if(start > -1){
					var end = script.indexOf(">", start);
					var srcfile = script.substring(start+6, end-1);
					var cbScript = document.createElement('link');
						cbScript.type= 'text/css';
						cbScript.rel = "stylesheet";
						cbScript.href = srcfile;
					loadedPageScripts.push(cbScript);
					document.body.appendChild(cbScript);
				}
			}
			source = source.substring(0, startIndex) + source.substring(endIndex+1);
		}

			writeNavDiv(name, div, source, scripts);
	}

}

// put contents of popup in div, loading and executing scripts as needed
function writeNavDiv(name,div,content,pageScript)
{
	var div = document.getElementById(name);
		var source = content;
		var includes = new Array();
		var loadcnt = 0;
		var scripts = pageScript;
		var tempLoadedScripts = [];


	if(div) {
		// Strip out tags
		while(source.indexOf("<script") > -1 || source.indexOf("</script") > -1) {
			var s = source.indexOf("<script");
			var s_e = source.indexOf(">", s);
			var e = source.indexOf("</script", s);
			var e_e = source.indexOf(">", e);

			var script = source.substring(s_e+1, e);

			if(script == '') {
				script = source.substring(s+8, e);
				var start = script.indexOf("src=");
				if(start > -1){
					var end = script.indexOf(">", start);
					var srcfile = script.substring(start+5, end-1);
					var cbScript = document.createElement('script');
						cbScript.type= 'text/javascript';
						cbScript.src = srcfile;
					loadcnt++;
					loadedPageScripts.push(cbScript);
					tempLoadedScripts.push(cbScript);
				}
			}else{
				scripts.push(script);
			}
			//alert(source.substring(s,e_e+1))
			source = source.substring(0, s) + source.substring(e_e+1);
		}
		//IE & general fix over all to handle an issue of writeNavDivFinal getting repeatedly called rather then being
		// called once. DAG 10.30.13
		if(tempLoadedScripts.length > 0 ){
			for(var i=0;i<tempLoadedScripts.length;i++){
			var cbScript = tempLoadedScripts[i]
				document.body.appendChild(cbScript);

				//This is to fix IE not loading on 1st load issues. DAG 11.6.13
				if(typeof BROWSER == 'undefined') { BROWSER = ''; } //BROWSER is not always defined!! (scotth 20141010)
				if(BROWSER.indexOf('IE') >= 0 && BROWSER.indexOf('11') == -1){ // MAG 03/19/2014: Added this condition to fix IE11 bug ('onreadystatechange' event deprecated on IE11)

					cbScript.onreadystatechange = function(){
					//modified by TJ on 9/26/2012, count only when file is loaded
						if(this.readyState ==  undefined || this.readyState  == 'complete' || this.readyState == 'loaded'){
							loadcnt--;
						}

						if(loadcnt == 0){
							writeNavDivFinal(name, div, source, scripts);
						}
					};

				}else{

					cbScript.onload = function(){
					//modified by TJ on 9/26/2012, count only when file is loaded
						if(this.readyState ==  undefined || this.readyState  == 'complete' || this.readyState == 'loaded'){
							loadcnt--;
						}

						if(loadcnt == 0){
							writeNavDivFinal(name, div, source, scripts);
						}
					};

				}
			}
		}else{
			writeNavDivFinal(name, div, source, scripts);
		}
	}

}





// if scripts needed to be loaded finish up after they are ready
function writeNavDivFinal(name, div, content, scripts){

	if (document.getElementById("app-container") != null) {
		document.getElementById("app-container").style.visibility = 'hidden';
		addClass('preventClicks', 'mouse');
		if (document.getElementById('preventClicks') != null)
			document.getElementById('preventClicks').setAttribute('rolloverSound', IMGHOST+'/html5/abc/student_homepage/bt/snd/home.mp3');

		removeClass('home-view-wrapper', 'app-view-wrapper-visible');
		removeClass('map-view-wrapper', 'app-view-wrapper-visible');
		app.dragTut_left.style.display = 'none';
		app.dragTut_right.style.display = 'none';
	}

	//hack for low end mobiel devices to force redraw the document - arsen
	setTimeout(function() {
		var dummy = document.createElement('DIV');
		dummy.style.position = 'absolute';
		dummy.style.width = '10px';
		dummy.style.height = '10px';
		dummy.style.top = '50%';
		dummy.style.left = '50%';
		dummy.style.marginTop = '-5px';
		dummy.style.marginLeft = '-5px';
		dummy.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
		document.body.appendChild(dummy);
		setTimeout(function() {
			document.body.removeChild(dummy);
		}, 100);

	}, 1000);



	/////////////////////////

	//if (usingCordova && !isAndroid) {
	if (isUnity) {
		unityCall.hideSpinner();
	} else if(usingCordova){
			appCall('hideSpinner'); // Testing
	}
	var div = document.getElementById(name);
	div.style.backgroundImage = '';
	div.innerHTML = content;
	for(var i=0;i<scripts.length;i++){
		var s = document.createElement('script');
		try {
			s.type = 'text/javascript';
			s.text = scripts[i];

			loadedPageScripts.push(s);
			document.body.appendChild(s);
		} catch(err) {
			trace('ERROR from writeNavDivFinal'); //added by TJ on 8/9/2013, to make it easier to track the errors
			trace(err);
		}
	}
	if(window.helptopics != void 0)
		window.helptopics.dispatchEvent('reload');

}

//////////////////////////////////////////////////////////////////////
function removeIntervals(){
	for(var i=0;i<pageIntervals.length;i++){
		clearInterval(pageIntervals[i]);
	}
	pageIntervals = [];
}
/////////////////////////////////////////////////////////////////////
// show gif after click
function placeBurst() {
	pageScaleLocal = pageScale || 1;
	if(mouseXpos > 0 && mouseYpos > 0) {
		/*  isBtRot  is always true now.
		if(typeof USINGAPP != 'undefined' && USINGAPP && APP_VERSION >= 1.94 && !isBtRot)
		{
			if(APP_VERSION >= 1.97)
				appCall('showSparkle:'+(mouseXpos+88)+':'+(mouseYpos+95));
			else
				appCall('showSparkle:'+(mouseXpos)+':'+(mouseYpos));
			return null;
		}
		*/

		if (
			//THIS WHOLE FUNCTION NEEDS TO BE RE-DONE /arsen
			(MOBILE != '' && document.location.href.search('student_home') > -1)
			|| (MOBILE != '') ) {
			burst.style.left = (mouseXpos/pageScaleLocal) + 'px';
			burst.style.top = (mouseYpos/pageScaleLocal) + 'px';
		}
		else {
			//trace('option 2');
			burst.style.left = ((mouseXpos/pageScaleLocal) - 50) + 'px';//diff for android 1.15.14 DAG
			burst.style.top = ((mouseYpos/pageScaleLocal) - 50) + 'px';//diff for android 1.15.14 DAG
		}
		burst.style.zIndex = 40000;
		document.body.appendChild(burst);
		burst.style.display = '';
		var d = new ImageSequence(burst, 9, true);
		d.start();
		return d;
	}
}

/////////////////////////////////////////////////////////////////////

function hexcolor(color) {
	var hex = '000000'+color.toString(16);
	return '#' + hex.substring(hex.length-6);
}

function rgbacolor(c,a) {
	if(a == undefined) a = 1;
	return "rgba("+(c>>16&0xFF)+","+(c>>8&0xFF)+","+(c&0xFF)+","+a+")";
}

/////////////////////////////////////////////////////////////////////

function shiftColor(color,pct) {

	var r = (color >> 16) & 0xFF;
	var g = (color >> 8) & 0xFF;
	var b = color & 0xFF;

	if(pct < 0) {
		r = r + Math.round(r*pct);
		g = g + Math.round(g*pct);
		b = b + Math.round(b*pct);
	}
	else {
		r = r + Math.round((255-r)*pct);
		g = g + Math.round((255-g)*pct);
		b = b + Math.round((255-b)*pct);
	}

	r = Math.min(255, Math.max(0,r));
	g = Math.min(255, Math.max(0,g));
	b = Math.min(255, Math.max(0,b));

	return ((r << 16) & 0xFF0000) | ((g << 8) & 0xFF00) | (b & 0xFF);
}

/////////////////////////////////////////////////////////////////////

function round(x, places) {
	if(places == undefined) places = 0;
	var mult = Math.pow(10,places);
	return Math.round(x*mult)/mult;
}

/////////////////////////////////////////////////////////////////////

// return t value for highest value of curve
function bezierMax(anchor1, control, anchor2) {

	var pos = 0.5;
	var diff = 0.25;
	var midval = bezierValue(anchor1, control, anchor2, pos);
	var max = Math.max(anchor1, anchor2, midval);

	for(var i=0;i<6;i++) {
		var val1 = bezierValue(anchor1, control, anchor2, pos - diff);
		var val2 = bezierValue(anchor1, control, anchor2, pos + diff);
		if(val1 > val2) pos -= diff;
		else pos += diff;
		diff = diff/2;
		max = Math.max(max, val1, val2);
	}
	return pos;
}

/////////////////////////////////////////////////////////////////////

// return t value for lowest value of curve
function bezierMin(anchor1, control, anchor2) {

	var pos = 0.5;
	var diff = 0.25;
	var midval = bezierValue(anchor1, control, anchor2, pos);
	var min = Math.min(anchor1, anchor2, midval);

	for(var i=0;i<6;i++) {
		var val1 = bezierValue(anchor1, control, anchor2, pos - diff);
		var val2 = bezierValue(anchor1, control, anchor2, pos + diff);
		if(val1 < val2) pos -= diff;
		else pos += diff;
		diff = diff/2;
		min = Math.min(min, val1, val2);
	}
	return pos;
}

/////////////////////////////////////////////////////////////////////

// bezier t value for any position (if validly on the curve)
function bezierPosition(anchor1, control, anchor2, target) {

	if(anchor1 == target) return 0;

	var sqroot = control*control - anchor1*anchor2 + anchor2*target - 2*control*target +anchor1*target;
	if(sqroot < 0) return 0;

	sqroot = Math.sqrt(sqroot);
	var val1 = round((anchor1 - control + sqroot)/(anchor2 - 2*control + anchor1),4);
	var val2 = round((anchor1 - control - sqroot)/(anchor2 - 2*control + anchor1),4);

	if((val1 > 1 || val1 < 0) && (val2 > 1 || val2 < 0)) return 0;
	if(val1 > 1 || val1 < 0) return val2;
	if(val2 > 1 || val2 < 0) return val1;
	if(Math.abs(val1 - anchor1) < Math.abs(val2 - anchor1)) return val1;
	return val2;
}

/////////////////////////////////////////////////////////////////////

// return anchor for subsection of curve
function bezierSlice(anchor1, control, anchor2, pos) {
	return anchor1 + (control-anchor1)*pos;
}

/////////////////////////////////////////////////////////////////////

// return position for any t value
function bezierValue(anchor1, control, anchor2, pos) {
	var Ax = anchor1 + (control-anchor1)*pos;
	var Bx = control + (anchor2-control)*pos;
	return round((Ax + (Bx-Ax)*pos),2);
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
// add event listening and dispatching to an object

function enableEventHandling(obj)
{

	obj.prototype.addEventListener = function(type, func, bubbles) {
		if(typeof(func) != 'function') return;
		if(this.eventListeners == undefined) this.eventListeners = new Array();
		for(var i=0;i<this.eventListeners.length;i++) {
			if(this.eventListeners[i].type == type && this.eventListeners[i].func == func)
				return;
		}
		this.eventListeners.push({type:type, func:func});
	};

	obj.prototype.removeEventListener = function(type, func, bubbles) {
		if(this.eventListeners == undefined) this.eventListeners = new Array();
		for(var i=0;i<this.eventListeners.length;i++) {
			if(this.eventListeners[i].type == type && this.eventListeners[i].func == func) {
				this.eventListeners.splice(i,1); //modified by TJ on 2/12/2013, first parameter is index and second
												 // parameter
																				 // is number of deletes
				return;
			}
		}
	};

   // scope of listener function is obj
    obj.prototype.dispatchEvent = function(type_, kvps_) {
        var eventListType = null,
        eventList = null,
        evt = null;

        if(!this.eventListeners) this.eventListeners = [];

        if(document.createEvent) {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(type_, true, true, {});
        } else {
            evt = document.createEventObject();
            evt.type = type_;
        }

        eventList = this.eventListeners;

        evt.kvps = kvps_;
        evt.customTarget = this; //added by TJ on 2/6/2013, to prevent to lose event target, I put custom event
																 // property to holds current target

        for(var i = eventList.length-1; i >= 0; i--) {
            eventListType = eventList[i].hasOwnProperty('type') ? eventList[i].type : null;
            if(eventListType == type_){
                if(eventList[i].func) eventList[i].func.call(this, evt);
            }

        }
    };
}

// returns currentTarget for an event cross-browser
function getEventTarget(event) {
	event = event || window.event;

	//added by MS, needed for IE8
	if(window.attachEvent && event.customTarget) {
		return event.customTarget;
	}

	var obj = (event.currentTarget) ? event.currentTarget : (event.srcElement) ? event.srcElement : event.customTarget; //modified
																																																											// by TJ on 2/6/2013, if regular event target is null, use custom event target
	if((obj == null || obj == undefined) && window.event) obj = window.event.srcElement;
	if((obj == null || obj == undefined) && this != window) obj = this;
	return obj;
}

// stop event from propagating
function cancelEvent(event) {
	if(event) {
			if(event.stopPropagation){event.stopPropagation();}
			if(event.preventDefault){event.preventDefault();}
			event.cancelBubble = true;
			event.cancel = true;
			//event.returnValue = false;
	}
}

function stopPropagation(event) {
	if(event) {
			if(event.stopPropagation)
				event.stopPropagation();

			event.cancelBubble = true;
	}
}

////////////////////////////////////

function assignObjectId(obj) {
	if(obj == null || obj == undefined) return null;
	object_list.push(obj);
	//obj.id = 'object_'+object_list.length;
	return object_list.length;
}

function getObjectById(id) {
	//var id = parseInt(idstr.substring(7));
	if(id <= 0 || id > object_list.length) return null;
	return object_list[id-1];
}

function getObjectByRef(domElement, attrid) {
	if(domElement) {
		var objrefid = domElement.getAttribute(attrid);
		return getObjectById(objrefid);
	}
}

////////////////////
//Opacity function compatible with IE 8
//added by JCD 8-14-2012
function setElementOpacity(node, opacity) //opacity should be between 0 and 1
{
	if(opacity > 1){opacity = 1;}else if(opacity < 0){opacity = 0;}
	node.style.opacity = opacity;
	if(nohtml5) node.style.filter = 'alpha(opacity=' + Math.round(opacity * 100) + ')';
}

////////////////////

function getCookie(cname) {
  var cookies=document.cookie.split(";");
  for(var i=0;i<cookies.length;i++) {
    var name = cookies[i].substr(0,cookies[i].indexOf("="));
    name = name.replace(/^\s+|\s+$/g,"");
    if(name == cname) return cookies[i].substr(cookies[i].indexOf("=")+1);
	}
	return '';
}

////////////////////

function setCookie(cname,value,exdays) {
	var exdate = new Date();
	if (isNaN(exdays)) exdays = 365;
	exdate.setDate(exdate.getDate() + exdays);

	var domain = '.' + (/\babcmouse\b.*$/.exec(document.domain) || [''])[0];

  //old setCookie functions didn't have domain so now we have to make sure to cleanup old cookienames that don't specify domain.
  var limit = 5;
  while (getCookie(cname) != '' && limit > 0) {
    document.cookie = cname + "=" + encodeURI(value) + "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    limit--;
  }

	document.cookie = cname + "=" + encodeURI(value) + "; expires=" + exdate.toUTCString() + "; domain=" + domain + "; path=/";
}

/**
 * Same as setCookie, but takes expiration seconds instead of days, and if
 * expiry is undefined then cookie will expire with session.
 */
function setCookie2(cname, value, expireSecs) {
	var expiry = '';
	if (typeof expireSecs !== 'undefined') {
		var exdate = new Date();
		exdate.setSeconds(exdate.getSeconds() + expireSecs);
		expiry = exdate.toUTCString();
	}

	var domain = '.' + (/\babcmouse\b.*$/.exec(document.domain) || [''])[0];

  var limit = 5;
  while (getCookie(cname) != '' && limit > 0) {
    document.cookie = cname + "=" + encodeURI(value) + "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    limit--;
  }

	document.cookie = cname + "=" + encodeURI(value) + "; expires=" + expiry + "; domain=" + domain + "; path=/";
}

////////////////////
// Remove cookie by cookie name. 5/28/2014 RL
function removeCookie(cname) {
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
	var domain = '.' + (/\babcmouse\b.*$/.exec(document.domain) || [''])[0];
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=" + domain + "; path=/";
}

/////////////////////////////
function setNavCookie(value){
	var exdate = new Date();
	 var overideContinue = getCookie('overrideContinueTo');
	if(overideContinue != ''){
		value = overideContinue;
		setCookie('overrideContinueTo','',-1);
	}

	if (isUnity) {
		unityCall.clearCookie('continueTo');
	} else if(deviceType == 'ios'){
        //Delete cookie for IOS
        appCall('deleteCookieWithName:continueTo');
    }

	removeCookie('continueTo');// This is done because this cookie has been set to undefined and is causing users to
							   // load
														 // up a 404 page if the continue a coloring activity from a
														 // coloring activity.
	setCookie('continueTo',value,365);
}
/////////////////////////////////////////////////////////////////////
function comingSoon(cs_layout){
	showPopup('coming_soon.php?cs_layout='+cs_layout);
}
/////////////////////////////////////////////////////////////////////
function Authenticator() // constructor
{
	// used by popups/password
	// methods are defined when popup is created
}

enableEventHandling(Authenticator);

function YesNoPopup() // constructor
{
	// used by popups/password
	// methods are defined when popup is created
}

enableEventHandling(YesNoPopup);

function HelpTopics() // constructor
{
//made for helpTopic
}

enableEventHandling(HelpTopics);
////////////////////////////////////////////


// shows popup unless the cookie says pw was checked not too long ago
// added by jcd 2012-10-16
function pwVerifyPopup(url, divid)
{
	if(window.userIsParent != true && !(getCookie('pwcheck') == 'true'))
	{showPopup(url, divid);}
}


//////////////////////////////////////

// sets a cookie indicating the password has been verified.
// added by jcd
function setPwVerifyCookie()
{
	//set cookie indicating password has been verified
	var cookieLifeMinutes = 10;
	var now = new Date();
	var exdate = new Date();
	var domain = '.' + (/\babcmouse\b.*$/.exec(document.domain) || [''])[0];
	exdate.setTime(now.getTime() + 1000 * 60 * cookieLifeMinutes);
	removeCookie('pwcheck');
	document.cookie = 'pwcheck=true; expires=' + exdate.toUTCString() + '; domain=' + domain + ';path=/';
}

function setMyAccountAccessCookie(minutes)
{
	//set cookie indicating password has been verified - arsen
	var cookieLifeMinutes = minutes;
	var now = new Date();
	var exdate = new Date();
	exdate.setTime(now.getTime() + 1000 * 60 * cookieLifeMinutes);
	document.cookie = 'myaccountaccess=true; expires=' + exdate.toUTCString() + ';path=/';
}

/////////////////////////////////////////////////////////////////////////////
function buildRegSideBar(number){

document.getElementById('progress_panel').style.visibility='inherit';
switch(number){
	case 1: break;
	case 2:
		if (!isUnity) {
		appCall('mml:#green_dot_1.hidden=0');
		appCall('mml:#progress_step_2.alpha=1');
		}

		document.getElementById('green_1').style.visibility='inherit';
		document.getElementById('blue_2').style.visibility='inherit';
		document.getElementById('prog_back_2').style.visibility='inherit';
		document.getElementById('prog_2').style.opacity='1';
		document.getElementById('blue_span_2').style.opacity ='1';
	break;
	case 3:
		if (!isUnity) {
		appCall('mml:#green_dot_1.hidden=0');
		appCall('mml:#progress_step_2.alpha=1');
		appCall('mml:#green_dot_2.hidden=0');
		appCall('mml:#progress_step_3.alpha=1');
		}

		document.getElementById('green_1').style.visibility='inherit';
		document.getElementById('green_2').style.visibility='inherit';
		document.getElementById('blue_2').style.visibility='inherit';
		document.getElementById('blue_3').style.visibility='inherit';
		document.getElementById('prog_back_2').style.visibility='inherit';
		document.getElementById('prog_back_3').style.visibility='inherit';
		document.getElementById('prog_2').style.opacity='1';
		document.getElementById('prog_3').style.opacity='1';
		document.getElementById('blue_span_2').style.opacity ='1';
		document.getElementById('blue_span_3').style.opacity='1';
	break;
	case 4:
		if (!isUnity) {
		appCall('mml:#green_dot_1.hidden=0');
		appCall('mml:#progress_step_2.alpha=1');

		appCall('mml:#green_dot_2.hidden=0');
		appCall('mml:#progress_step_3.alpha=1');

		appCall('mml:#green_dot_3.hidden=0');
		appCall('mml:#progress_step_4.alpha=1');
		}


		document.getElementById('green_1').style.visibility='inherit';
		document.getElementById('green_2').style.visibility='inherit';
		document.getElementById('green_3').style.visibility='inherit';
		document.getElementById('blue_2').style.visibility='inherit';
		document.getElementById('blue_3').style.visibility='inherit';
		document.getElementById('blue_4').style.visibility='inherit';
		document.getElementById('prog_back_2').style.visibility='inherit';
		document.getElementById('prog_back_3').style.visibility='inherit';
		document.getElementById('prog_back_4').style.visibility='inherit';
		document.getElementById('prog_2').style.opacity='1';
		document.getElementById('prog_3').style.opacity='1';
		document.getElementById('prog_4').style.opacity='1';
		document.getElementById('blue_span_2').style.opacity ='1';
		document.getElementById('blue_span_3').style.opacity='1';
		document.getElementById('blue_span_4').style.opacity='1';
	break;
	case 5:
		if (!isUnity) {
		appCall('mml:#green_dot_1.hidden=0');
		appCall('mml:#progress_step_2.alpha=1');

		appCall('mml:#green_dot_2.hidden=0');
		appCall('mml:#progress_step_3.alpha=1');

		appCall('mml:#green_dot_3.hidden=0');
		appCall('mml:#progress_step_4.alpha=1');

		appCall('mml:#green_dot_4.hidden=1');
		}

		document.getElementById('green_1').style.visibility='inherit';
		document.getElementById('green_2').style.visibility='inherit';
		document.getElementById('green_3').style.visibility='inherit';
		document.getElementById('green_4').style.visibility='inherit';
		document.getElementById('blue_2').style.visibility='inherit';
		document.getElementById('blue_3').style.visibility='inherit';
		document.getElementById('blue_4').style.visibility='inherit';
		document.getElementById('prog_back_2').style.visibility='inherit';
		document.getElementById('prog_back_3').style.visibility='inherit';
		document.getElementById('prog_back_4').style.visibility='inherit';
		document.getElementById('prog_2').style.opacity='1';
		document.getElementById('prog_3').style.opacity='1';
		document.getElementById('prog_4').style.opacity='1';
		document.getElementById('blue_span_2').style.opacity ='1';
		document.getElementById('blue_span_3').style.opacity='1';
		document.getElementById('blue_span_4').style.opacity='1';
	break;
}

}

// Added by MS, this is needed for IE8
if(!Array.prototype.indexof) {
	Array.prototype.indexOf = function(obj, start) {
		 for (var i = (start || 0), j = this.length; i < j; i++) {
			 if (this[i] === obj) { return i; }
		 }
		 return -1;
	}
}

function track(tag, kvp, redirectUrl)
{
    var vars = {tag: tag, kvp: kvp};

	if (
		typeof digitalData != 'undefined' &&
		typeof digitalData.page != 'undefined' &&
		typeof digitalData.page.pageInfo != 'undefined' &&
		typeof digitalData.page.pageInfo.page_detail != 'undefined'
	) {
		vars.page_detail = digitalData.page.pageInfo.page_detail;
	}

    if(redirectUrl != null) {
		ajax('/xml/track.php', vars, function(){
				if(typeof(redirectUrl) == 'function') {
					redirectUrl.call();
				} else {
					location.href = redirectUrl;
				}
		});
	} else {
    	ajax('/xml/track.php', vars, function(){});
	}
}

function setFlashCookie(id, cookiename, cookievalue)
{
	var vars = new Object();

	if(id == undefined | id == 0 | cookiename == undefined |cookievalue == undefined )
		return;

	var key = id + "|~|" + cookiename;
	vars[key] = cookievalue;

	ajax("/xml/cookie_update.php", vars, function(){});
}

//added by TJ on 8/16/2013, if your activity uses bad word filter, be sure call this function when page is loaded to
// grab data.
function BadWordFilter(_string, _exact_match)
{
	if(_exact_match == undefined) _exact_match = true;

	if(badword_list.length == 0)
	{
		ajax('/xml/badwordslist.php', '', function(_result){
			for(var i = 0; i < _result.words.length; i++)
			{
				str = '';
				for(var j = 0; j < _result.words[i].length; j+=2)
				{
					str +=  String.fromCharCode(parseInt(_result.words[i].substr(j, 2), 16));
				}
				badword_list.push(str);
			}
		});
		return undefined;
	}
	else if(_exact_match) //quick search mode, check string matches exactly with one of bad word lists.
	{
		if(badword_list.indexOf(_string.toLowerCase()) != -1) return true;
		return false;
	}
	else //if exact match option is set to false, it will go through each list to check if string contains badword
	{
		for(var i = 0; i < badword_list.length; i++)
		{
			if(_string.toLowerCase().indexOf(badword_list[i]) != -1) return true;
		}
		return false;
	}
}

function isEmpty(obj) {

    // null and undefined are empty
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))    return false;
    }

    // Doesn't handle toString and toValue enumeration bugs in IE < 9
    return true;
}
/////////////////////////////////
//Added By MG 11/25/13 - Stops a div from being selected on doulbe click in and improve performance in IE9 & IE10
function stopDragEvent(div)
{
	var divelement = document.getElementById(div);

	for( var i=0; i< divelement.children.length; i++)
	{

		divelement.children[i].setAttribute('draggable', false);
		divelement.children[i].setAttribute('unselectable', 'on');

		if(divelement.children[i].tagName == 'DIV')
		{
			stopDragEvent(divelement.children[i].id);

		}

	}
}

/////////////////////////////////////
//Added by MG 11/25/13 - Used to detect if mousevent is being called by the Left button click
//Returns Boolean
function detectLeftButton(e)
{
	e = e || window.event;

	var gamebutton;
	if (e.which == null)
    {
        gamebutton = (e.button < 2) ? 'left' :
            ((e.button == 4) ? 'middle' : 'right');
    }
    else
    {
        gamebutton = (e.which < 2) ? 'left' :
            ((e.which == 2) ? 'middle' : 'right');
    }

	if(gamebutton == 'left')
	{
		return true;
	}
	else
	{
		return false;
	}

}




// Arsen Ghazaryan - add ".is-scrollable" to any html element to enable scrolling/touchmove event
function touchMove(event) {
	//alert('test');
	if(! hasClass(event.target.id, 'is-scrollable')) {
		event.preventDefault();
	}
	else {
		return true;
	}
}

/**
 * Shorter DOM functions
 */
function hasClass(id, name){
    var el = typeof id == 'string' ? document.getElementById(id) : id;

    if (!el){
        return;
    }

    return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
};

function addClass(id, name){
	var el = typeof id == 'string' ? document.getElementById(id) : id;
	if (el == null)
		return;

	if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
};


function removeClass(id, name){
	var el = typeof id == 'string' ? document.getElementById(id) : id;
	if (el == null)
		return;

	if (hasClass(el, name)) {
		el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
	}
};
/////////////////////////////////////
//add by TM 12/20/13 to use when listening for the touchcancel event. to fix touch movement issues on android
function touchCancelPreventDefault(event)
{
	event.preventDefault();
}

// for activity display instruction popup. RL 7/7/2014 - modded by Len - 8/27/14
function checkInstructions(cid) {
	var vars = {action:'hasdesc',cid:cid};
	ajax('/html5/xml/curriculum_description.php', vars, function(hasDesc){
		if(hasDesc && !(uinfo.settings.displayInstructions == 'no')){
				showPopup('instructions.php?cid='+cid);
		}else{
			var snd = SoundControl.addContentSound(IMGHOST+'/snd/color/page_audio/default_audio_'+cid+'.mp3');
				snd.play();
		}
	});
}

//////////////////////////////////
function keys(object) {
    var results = [];
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        results.push(property);
      }
    }
    return results;
}

/////////////////////////////////////

//added by marc martinez - 2014/02/20
//allows control of ticket machine screen outside of gametracker instance.


function hideTicketMachine(){
	try{
		document.getElementById('tm_morebtn').style.pointerEvents = 'none';
		document.getElementById('tm_playagainbtn').style.pointerEvents = 'none';
		document.getElementById('tm_playagainlbl').style.pointerEvents = 'none';
		document.getElementById('tm_favbtn').style.pointerEvents = 'none';
		document.getElementById('tm_contbtn').style.pointerEvents = 'none';
		document.getElementById('tm_contlbl').style.pointerEvents = 'none';
		document.getElementById('tm_shoppingbtn').style.pointerEvents = 'none';
		document.getElementById('tm_shoppinglbl').style.pointerEvents = 'none';
		document.getElementById('tm_learningPathbtn').style.pointerEvents = 'none';
		document.getElementById('tm_learningPathlbl').style.pointerEvents = 'none';

		if(document.getElementById('ticket_machine_top')){document.getElementById('ticket_machine_top').style.left = '-135px';}
		if(document.getElementById('ticket_machine_bottom')){document.getElementById('ticket_machine_bottom').style.left = '-135px';}
		if(document.getElementById('ticket_machine_mask')){document.getElementById('ticket_machine_mask').style.width = '0px';}
		if(document.getElementById('ticket_number_holder')){document.getElementById('ticket_number_holder').style.display = 'block';}
		if(document.getElementById('ticket_navigation')){document.getElementById('ticket_navigation').style.visibility = 'hidden'; document.getElementById('ticket_navigation').style.display= 'none';}
	}catch(a){}
}
/////////////////////////////////////

//added by ET - 2014/07/24
//allows control of tracking of more games on the ticket machine

function dtmMore(){
	dtmVars('link name', 'tickets more');
	dtmTrack('link click');
}

function dtmContinue(){
	dtmVars('link name', 'tickets continue');
	dtmTrack('link click');
}

function dtmPlayAgain(){
	dtmVars('link name', 'tickets play again');
	dtmTrack('link click');
}



/////////////////////////////Ticket Machine Tracking for More value events
function ticketMachineMoreBooks(){
	dtmMore(); loadPage('/html5/abc/bookshelf'); hideTicketMachine();
}

function ticketMachineMoreSongs(){
	dtmMore(); loadPage('/html5/abc/musicshelf'); hideTicketMachine();
}

function ticketMachineMoreArt(){
	dtmMore(); loadPage('/html5/abc/colors'); hideTicketMachine();
}

function ticketMachineMorePuzzles(){
	dtmMore(); loadPage('/html5/abc/puzzles'); hideTicketMachine();
}

function ticketMachineMoreBasics(){
	dtmMore();loadPage('/html5/abc/basics'); hideTicketMachine();
}

function ticketMachineMoreGames(){
	dtmMore();loadPage('/html5/abc/games'); hideTicketMachine();
}

function ticketMachineMorePrints(){
	dtmMore(); loadPage('/html5/abc/print'); hideTicketMachine();
}
//////// Child Setiings

function dtmGeneralSettings(){
	dtmVars('link name','child settings general settings');
	dtmTrack('link click');
}
//////////////////////////////////////////
//Fix for IE, IE doesn't have a console object

if(typeof(console) == 'undefined') {
	var console = {};
	console.log = function() {
		//fix for IE
	};
}






/**
 * Disable site shell buttons by placing semi transparent cover on top of them.
 * @param string template 		Site rotation like "round10"
 * @author Arsen Ghazaryan <arsen.ghazaryan@aofl.com>
 */
function disableShellButtons(template) {
	var coverContainer = '';
	switch (template) {
		case 'round10':
			coverContainer = 'panel-left';
			break;
		// case 'oldHtml5':
		// 	coverContainer = 'panel-left';
		// 	break;
	}

	if (coverContainer != '') {
		domCoverContainer = document.createElement('DIV');
		domCoverContainer.id = 'panel-left-cover-mask';
		domCoverContainer.style.position = 'absolute';
		domCoverContainer.onclick = doNothing;
		domCoverContainer.style.top = '0px';
		domCoverContainer.style.left = '0px';
		domCoverContainer.style.width = '100%';
		domCoverContainer.style.height = '100%';
		domCoverContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
		document.getElementById(coverContainer).appendChild(domCoverContainer);
	}
}
/**
 * Remove site shell buttons cover. Reference: disableShellButtons(template)
 * @param string template 		Site rotation like "round10"
 * @author Robert Lai <robert.lai@aofl.com>
 */
function enableShellButtons(template) {
	var coverContainer = '';
	switch (template) {
		case 'round10':
			coverContainer = 'panel-left';
			break;
		// case 'oldHtml5':
		// 	coverContainer = 'panel-left';
		// 	break;
	}

	if (coverContainer != '') {
		domCoverContainer = document.getElementById('panel-left-cover-mask');
		if (domCoverContainer) {
			domCoverContainer.parentNode.removeChild(domCoverContainer);
		}
	}
}
//---------------------------------------------------------------------------------->



/**
 * ApiService
 * @class
 * @classdesc Calls the AbcMouseWebServiceLayer api. Acts as a static class and doesn't need to be instantiated
 * @author Brandon Turner
 * @version 0.1
 */
var ApiService =
{
	/** @member {Object} */
	endpoints: {
	},

	/**
	 * @type {boolean}
	 */
	retrieved_endpoints:false,

	/**
	 * @type {boolean}
	 * Set this to true to enable debugging messages
	 */

	DEBUG:false,

	/** @constant
	  * @type {string}
	  * @default
	  */
	ENUMERATE_ENDPOINT:'/apis/abc/0.1/json/Resource/Enumerate/init',

	api_domains: {},

	// check for environment for debug flag

	/**
	  * Makes an Ajax call to the Enumerate Resource to return endpoints in AbcMouseWebServiceLayer
	  * @method
	  *	@memberof ApiService
	  * @todo How do I do this without setting async to false
	  */
	setEndpoints:function()
	{
		try {
			ajax(ApiService.ENUMERATE_ENDPOINT,'',ApiService.constructEndpoint,ApiService,false);
		} catch(e) {
			if (ApiService.DEBUG) {
				console.log('Error making AJAX call to set API endpoints');
				console.log('Error message: ' + e.message)
			}
		}
	},

	/**
	  * Callback function that takes the response(data), parses it as JSON, and populates the endpoint object
	  * with key value pairs mapping endpoint_name to endpoint_url
	  * @method
	  *	@memberof ApiService
	  * @param {string} data Ajax Response from httpRequest in setEndpoints function
	  */
	constructEndpoint:function(json)
	{
		if (json.hasOwnProperty('success') && (json.success == 'TRUE' )) {
			// Sets the api endpoints
      ApiService.api_domains = json.payload.api_domains;
			for (var endpoint in json.payload.api_endpoints) {
				ApiService.endpoints[endpoint] = json.payload.api_domains.api_root_url.slice(json.payload.api_domains.api_root_url.indexOf('apis'))
												+ json.payload.api_endpoints[endpoint];
			}
		}
		ApiService.retrieved_endpoints = true;
	},

	/**
	  * Calls the AbcMouseWebServiceLayer. If endpoint_String(optional) is not defined, get's all endpoints and defaults
	  * to the store_get endpoint
	  * @method
	  *	@memberof ApiService
	  * @param {string} endpoint_string The name of the api endpoint that you want to call.
	  * @param {object} params (optional) Post variables object where arguments -> Name of API Catalog
	  * @param {function} callback Callback function to handle the response from the API call
	  */
	call:function(endpoint_string, params, callback)
	{
		endpoint_string = endpoint_string || undefined;

        if (ApiService.retrieved_endpoints == false) {
        	ApiService.setEndpoints();
        }

		if (ApiService.endpoints.hasOwnProperty(endpoint_string)) {
			try {
				ajax(ApiService.endpoints[endpoint_string], params, callback,ApiService, true);
			} catch(e) {
				if (ApiService.DEBUG) {
					console.log('Error making AJAX call to API endpoints');
					console.log('Error message: ' + e.message);
				}
			}
		} else {
			if (ApiService.DEBUG) {
				console.log('Error: endpoint string is incorrect or has not been set');
			}
		}
	}
}

//////////////////////////////////////////
// File Download function.
// Added 4/30/2014 Robert Lai
//
// It's used to download file by passing the file path to this function
// It used '/html5/abc/file_download.php' together to perform the action
//
// sUrl:	File Path to the downloading file
//			The downloading file is set to the IMGHOST directory
//			eg: 'html5/popups/library_resources/library_printoutflyer.pdf'
// Example:
//			downloadFile('html5/popups/library_resources/library_printoutflyer.pdf');
//////////////////////////////////////////
function downloadFile(sUrl) {
	window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
	window.downloadFile.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	window.downloadFile.isIE = navigator.userAgent.toLowerCase().indexOf('ie') > -1;

	// iOS devices do not support downloading. We have to inform user about this.
	if (/(iP)/g.test(navigator.userAgent)) {
		alert('Your device does not support files downloading. Please try again in desktop browser.');
		return false;
	}

	// If in Chrome or FireFox - download via virtual link click
	/*
	if (window.downloadFile.isChrome) {
		// Creating new link node.
		var link = document.createElement('a');
		link.href = sUrl;

		if (link.download !== undefined) {
			// Set HTML5 download attribute. This will prevent file from opening if supported.
			var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
			link.download = fileName;
		}

		// Dispatching click event.
		if (document.createEvent) {
			var e = document.createEvent('MouseEvents');
			e.initEvent('click', true, true);
			link.dispatchEvent(e);
			return true;
		}
	} else {
	*/
		// Force file download (whether supported by server).
		sUrl = '/html5/abc/file_download?fileUrl='+sUrl;
		window.open(sUrl, '_self');
		return true;
	//}
}

/*
Wrapping this in a conditional to check for the "Element" object works on all Browesers, including IE 9-11
If this is not wrapped in the conditional, IE fails
*/
if(window.Element){
    Element.prototype.addClass = function(classname) {
        if (this.className.search(classname) != -1)
            return;
        else {
            this.className = this.className+' '+classname;
        }
    }

    Element.prototype.removeClass = function(classname) {
        if (this.className.search(classname) == -1)
            return;
        else {
            this.className = this.className.replace( classname , '' ).replace(/\s{2,}/g, ' ');
        }
    }

    Element.prototype.hasClass = function(classname){
        return (this.className.search(classname) != -1);
    };
}

function dtmTrack(eventName){
	if(typeof Analytics != 'undefined' && eventName === "link click" && window.linkName)
		Analytics.trackClick(window.linkName);
}

function dtmArgs(key1, key2, key3, value){
	if(typeof digitalData != 'undefined')
	{
		if(typeof digitalData[key1][key2] != 'undefined'){
			value = value.toString().replace( /([A-Z])/g, " $1" ).toLowerCase();
			digitalData[key1][key2][key3] = value;
			dtmTrace('DTM Tracking: Property Set Success "' + key1 + '.' + key2 + '.' + key3 +': ' + value + '"');
		}
		else{
			dtmTrace('DTM Tracking: Property Set Failure "' + key1 + '.' + key2 + '.' + key3 +'"');
		}
	}
}
function dtmTransaction(data){
	if(typeof digitalData != 'undefined')
	{
		if(typeof digitalData['transaction'] != 'undefined'){
			//value = value.toString().replace( /([A-Z])/g, " $1" ).toLowerCase();
			digitalData['transactionID'] = data['id'];
			items = data.items;
			for(i=0;i<items.length;i++){
				item = items[i];
				digitalData['transaction'].push(item);
				dtmTrace('DTM Transaction: Property Set Success "' + item + '"');
			}

		}
		else{
			dtmTrace('DTM Transaction: Property Set Failure "' + id + '.' + key2 + '.' + key3 +'"');
		}
	}
}
function dtmVars(key, value){
			value = value.toString().replace( /([A-Z])/g, " $1" ).toLowerCase();
	key = camelize(key);
	window[key] = value;
	}

function camelize(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
		if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	});
}

function dtmTrace(text){
	dtmTraceCookie = (typeof dtmTraceCookie != 'undefined') ? dtmTraceCookie : getCookie('dtmTrace');
	if(dtmTraceCookie == '1'){
		if(typeof USINGAPP != 'undefined' && USINGAPP){
			trace(text);
		}
		else{
			console.log(text);
		}
	}
}

// Class for Handling AJAX Calls
var httpRequest = function(url,params,method,callback,async)
{
	this.id = "id"+Math.round(Math.random()*10000000000);
	httpRequest.instance = new Array();
	httpRequest.instance[this.id] = this;
	this.async = async;
	this.params = params;
	this.getHTTPObject();
	this.url = url;
	this.method = method.toUpperCase();
	this.callback = callback;
	this.send();
}
httpRequest.prototype =
{
	init:function()
	{
		if(this.method!='POST' || this.method!='GET')
			this.method = 'POST';
	},
	getHTTPObject:function()
	{
		this.xmlhttp = false;

	    if (window.ActiveXObject)
		{
			try
			{
				req = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e)
			{
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		if (!this.xmlhttp && typeof XMLHttpRequest != 'undefined')
		{
			try
			{
				this.xmlhttp = new XMLHttpRequest();
			}
			catch (e)
		    {
		        this.xmlhttp = false;
		    }
		}
	},
	setParams : function()
	{
		if(this.params==null || this.params==undefined)
			return null;
		var aParams = new Array();
		for(a in this.params)
		{
			aParams.push(a+"="+this.params[a]);
		}
		var szParams = aParams.join('&');
		return szParams;
	},
	setEvents : function()
	{
		var id = this.id;
		if (this.xmlhttp)
		{
			this.xmlhttp.onreadystatechange=function()
			{
				if (this.xmlhttp.readyState == 4)
				{
					if (this.xmlhttp.status && this.xmlhttp.status == 200)
					{
						this.callback(this.xmlhttp.responseText);
					}
			    }
			}.bind(this);
		}
	},
	send : function()
	{
		var opener = '';
		var sender = null;
		switch(this.method)
		{
			case 'POST':
				opener = this.url;
				sender = this.setParams();
				break;
			case 'GET':
				var p = this.setParams();
				(p==null)? p = '' : p = "?"+p;
				opener = this.url+p;
				break;
			default:
				break;
		}
		if(this.async && null!=this.callback)
			this.setEvents();
		this.xmlhttp.open(this.method,opener,this.async);

		this.xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		if(this.xmlhttp.overrideMimeType)
			this.xmlhttp.overrideMimeType('text/xml; charset=UTF-8');
		this.xmlhttp.send(sender);
		if(!this.async)
			this.callback(this.xmlhttp.responseText);
	}
};

/* Added to replace the Array.prototype.forEach2 method.
 * We should never add custom members to a naitive JavaScript
 * object within a file that is used globally.
 * Doing do adds that custom member to all instances of the object and
 * could affect everyones work. Added 03/27/2015 Mike Malone.
*/
var List = {
    getItems: function (list, callback) {
        var i, len;
        if(!list || list === ""){
            throw new Error("You must pass an array to this method and add a callback function to get the value if the list indexes.");
            return;
        }

        len = list.length;
        //Itterates through list and passes the value of the indexes to the callback
        if(typeof callback === "function"){
            for(i = 0; i < len; i++){
                callback(list[i], i);
            }
        }
    }
};

// Check the object is empty or not
function isEmptyObject(obj) {
	// null and undefined are "empty"
	if (obj == null)
		return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	return true;
}

//////////////////////////////////////////////////////////////
//USED BY ANDROID
//////////////////////////////////////////////////////////////
function injectJSDebugger(sandbox)
{
	// Added this live test so that this code would not process if on the live server.  Clark 10.20.14
	if(document.location.href.indexOf('www.') != -1) return;

	if(sandbox == "" || sandbox == null){
		sandbox = "#" + location.origin.split('/')[2].split('.')[0];
	}
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = "http://test.abcmouse.com:8080/target/target-script-min.js"+sandbox;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function updateMediaPlayer(uniqueID, methodName) {
    if(SoundControl != null){
        for(var i = 0; i < SoundControl.allSounds.length; i++) {
            var snd = SoundControl.allSounds[i], sndId = SoundControl.allSounds[i].id.toString();
            if(sndId === uniqueID) {
                try {
                    if (typeof snd[methodName] === "function") {
                        snd[methodName]();
                    }
                } catch(error){
                    console.log("MediaControl.updateMediaPlayer - Error! " + uniqueID + " error at method: " + methodName);
                }
                break;
            }
        }
    }
}

function toWords(numVal) {
	var lrgNumTxt = ['','Thousand','Million', 'Billion','Trillion'];
    var simpleNumTxt = [ "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine" ];
    var teenNumTxt = [ "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" ];
    var tensNumTxt = [ "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" ];

    numVal = numVal.toString();
    numVal = numVal.replace(/[\, ]/g, "");
    if (numVal != parseFloat(numVal)) return numVal;   //Not a number

    var numLength = numVal.indexOf(".");
    if (numLength == -1) numLength = numVal.length;
    if (numLength > 15) return numVal;		//Number too big not supported

    var digitAr = numVal.split("");
    var textNumber = "";
    var h = 0;
    for (var i = 0; i < numLength; i++) {
        if ((numLength - i) % 3 == 2) {
            if ("1" == digitAr[i]) {
                textNumber += teenNumTxt[Number(digitAr[i + 1])] + " ";
                i++;
                h = 1;
            } else if (0 != digitAr[i]) {
                textNumber += tensNumTxt[digitAr[i] - 2] + " ";
                h = 1;
            }
        } else if (0 != digitAr[i]) {
            textNumber += simpleNumTxt[digitAr[i]] + " ";
            if ((numLength - i) % 3 == 0) textNumber += "hundred ";
            h = 1;
        }
        if ((numLength - i) % 3 == 1) {
            if (h) textNumber += lrgNumTxt[(numLength - i - 1) / 3] + " ";
            h = 0;
        }
    }
    if (numLength != numVal.length) {
        var j = numVal.length;
        textNumber += "point ";
        for (var i = numLength + 1; i < j; i++) textNumber += simpleNumTxt[digitAr[i]] + " ";
    }
    return textNumber.replace(/\s+/g, " ");
}

//////////////////////////////////////////////////////////////
// This is used to disable the Control key combination
function disableCtrlKeyCombination(e) {
	// list all CTRL + key combinations you want to disable
	var forbiddenKeys = new Array('a', 'n', 'c', 'x', 'j' , 'w');
	var key;
	var isCtrl;

	// To identify the Ctrl Key has been clicked
	if (window.event) {
		key = window.event.keyCode;     //IE
		if (window.event.ctrlKey) {
			isCtrl = true;
		} else {
			isCtrl = false;
		}
	} else {
		key = e.which;     //firefox
		if (e.ctrlKey) {
			isCtrl = true;
		} else {
			isCtrl = false;
		}
	}

	// if ctrl is pressed, check if other key is in forbidenKeys array
	if(isCtrl) {
		for (i=0; i<forbiddenKeys.length; i++) {
			//case-insensitive comparation
			if (forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
				//alert('Key combination CTRL + '+String.fromCharCode(key) +' has been disabled.');
				return false;
			}
		}
	}
	return true;
}

//////////////////////////////////////////////////////////////
//USED BY MOBILE DEVICES
//////////////////////////////////////////////////////////////

function triggerTicketMachine()
{
	// Once an event has completed, the mobile device calls this funtion to trigger the ticket machine.
	// Android ticket machine is native (so doesn't need to use this callback)
	if(deviceType == 'ios'){
		//console.log('triggerTicketMachine');
		showTicketMachine();
	}
}

function recordingWidgetComplete(brand)
{
	// Once the recording widget is finished recording and the user clicks 'save', it calls this function to send the
	// completed file to server
	if(deviceType == 'android'){

	}else if(deviceType == 'ios'){

	}else{
		//do nothing
	}
}

function updateRewards(type,amount)
{
	// called to update the number of tickets, stars or wall cards
	if(deviceType == 'android'){

	}else if(deviceType == 'ios'){

	}else{
		//do nothing
	}
}

//ANDROID DISPATCH EVENT
function androidDispatchEvent (eventType) {
    if (!isAndroid) {
        return;
    }else {
        var evt;

        if (document.createEvent) {
            evt = document.createEvent('Event');
            evt.initEvent(eventType, true, true);
        }else {
            evt = document.createEventObject();
            evt.type = eventType;
            document.fireEvent(eventType, evt);
        }

        if (typeof document.dispatchEvent !== 'function') {
            document.dispatchEvent = function(e){
                var F = function(){
                    //Empty consturctor
                };
                return new F();
            };
        }
        document.dispatchEvent(evt);
    }
}

//////////////////////////////////////////////////////////////
//END MOBILE DEVICE SPECIFIC CODE
//////////////////////////////////////////////////////////////

/*
 * SWRVE
 */
var SWRVE = {
    track: function (type, payload) {}
};

function aoflLoadPolyfills() {
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP    = function() {},
          fBound  = function() {
            return fToBind.apply(this instanceof fNOP
                  ? this
                  : oThis,
                  aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype;
            }
      fBound.prototype = new fNOP();
      return fBound;
    };
        }
    }

// [Caigoy,033017,QA-15911] some areas double-load the script, so code below would cause infinite loop
// QA-4615 (fix for back history not to leave current domain, Andrew Ryabinin, 13.10.2015)
var historyOld = historyOld || history.go;
history.go = function() {
    var direction = arguments[0];
    var protocol = window.location.protocol;
    var hostname = window.location.hostname;
    if (direction < 0 && document.referrer === '') {
        window.location.href = '/'
    } else if (direction < 0
    	&& window.location.href === protocol + '//' + hostname + '/html5'
    	&& document.referrer === protocol + '//' + hostname + '/home') {
        // do nothing
    } else {
        historyOld.apply(this, arguments);
    }
};
