var IS_OPEN = "is_open";
var IS_CLOSED = "is_closed";
var CLOSING = "closing";
var OPENING = "opening";

var sidepanelTweens = new Array();
var sidepanels = new Array();

var isBadAndroid = (typeof isBadAndroid == 'undefined') ? false : isBadAndroid;
var disable_sp_animate = (typeof disable_sp_animate == 'undefined') ? false : disable_sp_animate;
var user_agent = navigator.userAgent;
var isAndroid = (user_agent.indexOf('NATIVE_ANDROID') != -1) ? true : false;
//var isAndroid = false;

//05.30.14 JK
var sidepanel_timefactor = 0.5;

if (typeof user_agent != 'undefined' && user_agent == 'NEW_SHELL' || isAndroid == true)
	var topMost = 25;
else {
    var topMost = 30;
}

//var closePosRight = 953;
//var closePosLeft = 0;
var frameWidth = 1024;
var tabPadding = 3;
var currentSidepanel = '';
function registerSidepanel(id, persist, side, closePos) {
	if(typeof(closePos) === "undefined") {
		if(side == "left") {
			closePos = 0;
		}
		else {
			closePos = 965;
		}
	}
	
	sidepanels.push({id:id, persist:persist, side:side, openState:IS_CLOSED, closePos:closePos});


	arrangeSidepanels();
}

function arrangeSidepanels() {
	//trace("arrangeSidepanels", sidepanels.length);
		var topRight = 70;

	topRight = typeof sidepanelIconPos != 'undefined' ? sidepanelIconPos : topRight;
	
	var topLeft = 50;

	var tempPersist = [];
	var tempNoPersist = [];

	//currentSidepanel = '';
	for(var i=0;i<sidepanels.length;i++){
		if(sidepanels[i].persist == 1)
			tempPersist.push(sidepanels[i]);
		else
			tempNoPersist.push(sidepanels[i]);
	}
	sidepanels = tempPersist.concat(tempNoPersist);
	for(var i=0; i<sidepanels.length; i++) {
		var slider = document.getElementById("sidepanel_slider"+sidepanels[i].id);
		var tab = document.getElementById("sidepanel_tab"+sidepanels[i].id);
		var mask = document.getElementById("sidepanel_mask"+sidepanels[i].id);
		var holder = document.getElementById("sidepanel_holder"+sidepanels[i].id);

		slider.style.top = topMost + 'px';
		if(sidepanels[i].side=='left') {
			tab.style.top = topLeft+"px";
			slider.style.left = sidepanels[i].closePos+"px";
			mask.style.left ='0px';
			holder.style.left = -1* holder.offsetWidth + 'px';

			topLeft += tab.offsetHeight + tabPadding;
		}
		else {
			tab.style.top = topRight+"px";
			slider.style.left =sidepanels[i].closePos+"px";
			
			topRight += tab.offsetHeight + tabPadding;
			if(sidepanels[i].persist == 1)topRight += 3;
		}
		
		if(mask) {
			mask.style.width = 0;
			mask.style.visibility = "hidden";
		}
		sidepanels[i].openState = IS_CLOSED;
	/*	var  eventName       = document.body.style.webkitBorderRadius? "webkitTransitionEnd":"transitionend";
		addListener('sidepanel_slider'+sidepanels[i].id,"webkitTransitionEnd",function(e){
			var tar = getEventTarget(e);
			sidepanel_adjustTabs(tar.id)
		});		

		addListener('sidepanel_slider'+sidepanels[i].id,"transitionend",function(e){
			var tar = getEventTarget(e);
			sidepanel_adjustTabs(tar.id)
		});*/
	}

}

function sidepanel_expand(id){
	var slider = document.getElementById("sidepanel_slider"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
	var index = getSidepanelIndex(id);
	var element_names = ["inventory_area","items_scroll"]

  if(sidepanels[index].openState == IS_OPEN || sidepanels[index].openState == OPENING) {
		// Created to handle IE bug that set scrollTop to 0. Clark 02/25/2014
		// var browser_elements = BROWSER.split(" ");
		// if (browser_elements[0].indexOf('IE') != -1 && eval(browser_elements[1]) < 10){
		// 	var slider_area = (document.getElementsByClassName(element_names[0]).length != "") ? element_names[0] : element_names[1];
		// 	scrollPositionIE(slider_area); 	
		// } 
		sidepanel_close(id);
		return;
	}else {
		for(var i=0; i<sidepanels.length; i++) {
			var panel = document.getElementById("sidepanel_slider"+sidepanels[i].id);
			if(panel && sidepanels[i].id != id && sidepanels[i].openState == IS_OPEN) { sidepanel_close(sidepanels[i].id); }
			else if(sidepanelTweens[sidepanels[i].id] && sidepanels[i].id == id) { sidepanelTweens[sidepanels[i].id].stop(); }
		}
		sidepanel_open(id);
		// Created to handle IE bug that set scrollTop to 0. Clark 02/25/2014
		// var browser_elements = BROWSER.split(" ");
		// if (browser_elements[0] == 'IE' && browser_elements[1] < 10){
		// 	var slider_area = (document.getElementsByClassName(element_names[0]).length != "") ? element_names[0] : element_names[1];
		// 	var curr_pos = setPositionIE(slider_area);
		// 	var div_element = document.documentElement || document;
		// 	var doc_element = div_element.getElementsByClassName(slider_area)[0].scrollTop = curr_pos;	
		// }
	}
}

// Created to handle IE bug that set scrollTop to 0. Clark 02/25/2014
function scrollPositionIE(class_name)
{
	var inventory_area = document.getElementsByClassName(class_name);
	var current_scroll_position = inventory_area[0].scrollTop;
	setCookie('current_scroll_position',current_scroll_position, 3600);
}

function setPositionIE(class_name)
{
	var current_position = getCookie('current_scroll_position');
	return current_position;
}
/////////////////////////////////////////////////////////////////////
// In multiple side panel situation, hidden the other side panel tab when one of tab is selected
function hideOtherSidePanelTab(id) {
	for (var i=0; i<sidepanels.length; i++) {
		if (sidepanels[i].id != id) {
			var tabToBeHide = document.getElementById('sidepanel_tab'+sidepanels[i].id);
			tabToBeHide.style.visibility = 'hidden';
		}
	}
}
// In multiple side panel situation, show all the other side panel tab when any side panel is close
function showAllSidePanelTab() {
	for (var i=0; i<sidepanels.length; i++) {
		var tabToBeHide = document.getElementById('sidepanel_tab'+sidepanels[i].id);
		tabToBeHide.style.visibility = 'visible';
	}
}

// [Caigoy,061715,QA-3652] For hiding SP tabs that would overlap progress panel in path_section
function hideAllSidePanelTab() {
	sidepanels.forEach(function (tab) {
		document.querySelector('#sidepanel_tab' + tab.id).style.visibility = 'hidden';
	});
}

var close_pos_tmp = ''; //arsen
function sidepanel_open(id) {
	if (sidepanels.length >1) {
		hideOtherSidePanelTab(id);
	}
	
	if (typeof SidePanel == 'function') {
		if (current_sidepanel_index != -1)
		side_panels[current_sidepanel_index].hide();
	}
	var slider = document.getElementById("sidepanel_slider"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
	var mask = document.getElementById("sidepanel_mask"+id);
	var index = getSidepanelIndex(id);
	var trashCan = document.getElementById('trash_can');

	if (trashCan !== null) {
		trashCan.style.right = "580px";
	}

	if (isBadAndroid && disable_sp_animate) { //arsen
		close_pos_tmp = slider.style.left;
		slider.style.left = '260px';
		mask.style.visibility = 'visible';
		dispatchOpenSidepanel(id,false);
		sidepanels[index].openState = 'is_open';
		return;
	}

	if(slider && holder) {
		//slider.parentNode.appendChild(slider);
		//05.30.14 JK changed .5 to sidepanel_timefactor
		var	time = (holder.offsetWidth + slider.offsetLeft - sidepanels[index].closePos) * sidepanel_timefactor;
		//var	time = (holder.offsetWidth + slider.offsetLeft - sidepanels[index].closePos) * .5;

		if(time > 0) {
			if(sidepanelTweens[index]) { sidepanelTweens[index].stop(); }
			
			if(sidepanels[index].side == "left") {
				/*slider.style.left = sidepanels[index].closePos + holder.offsetWidth +'px';
				mask.style.left = sidepanels[index].closePos - (sidepanels[index].closePos + holder.offsetWidth) + 'px';
				mask.style.width = (sidepanels[index].closePos + (sidepanels[index].closePos + holder.offsetWidth)) + 'px';
				holder.style.left = 0 + 'px';
				mask.style.visibility = "visible";*/

				sidepanelTweens[index] = new Tween(slider, "left", slider.offsetLeft, sidepanels[index].closePos + holder.offsetWidth, time);
			} else {
			//	slider.style.left = sidepanels[index].closePos - holder.offsetWidth +'px';
				//mask.style.visibility = "visible";
				//mask.style.width = (holder.offsetWidth) + 'px';
				//var  eventName       = document.body.style.webkitBorderRadius? "webkitTransitionEnd":"transitionend";
				//addListener(slider,eventName,function(){sidepanel_adjustTabs(slider.id)});
				sidepanelTweens[index] = new Tween(slider, "left", slider.offsetLeft, sidepanels[index].closePos - holder.offsetWidth, time);
			}
			addListener(sidepanelTweens[index], 'change', sidepanel_adjustMask);
			addListener(sidepanelTweens[index], 'finish', sidepanel_adjustTabs);
			addListener(sidepanelTweens[index], 'finish', function(){dispatchOpenSidepanel(id,false)});
			dispatchOpenSidepanel(id,true);
		}
		sidepanels[index].openState = OPENING;
	}
}

function sidepanel_close(id) {
	var slider = document.getElementById("sidepanel_slider"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
	var index = getSidepanelIndex(id);
	var mask = document.getElementById("sidepanel_mask"+id);
	var trashCan = document.getElementById('trash_can');

	if (trashCan !== null) {
		trashCan.style.right = "0";
	}

	if (isBadAndroid && disable_sp_animate) { //arsen
		slider.style.left = close_pos_tmp;
		mask.style.visibility = 'hidden';
		dispatchCloseSidepanel(id,false);
		// sidepanel_adjustTabs();
		sidepanels[index].openState = 'is_closed';
		return;
	}
	
	if(slider) {
		if(sidepanels[index].side == "left") {
			var time = (sidepanels[index].closePos + slider.offsetLeft) * .5;
		} else {
			var time = (sidepanels[index].closePos - slider.offsetLeft);
		}
		if(time > 0) {
			if(sidepanelTweens[index]) { sidepanelTweens[index].stop(); }
			

			if(sidepanels[index].side == "left") {
				/*slider.style.left = 0 + 'px';
				mask.style.left = '0px';
				mask.style.visibility = "hidden";
				mask.style.width = '0px';
				holder.style.left = -1* holder.offsetWidth + 'px';*/
				
				sidepanelTweens[index] = new Tween(slider, "left", slider.offsetLeft, sidepanels[index].closePos, time);

			}else {
				//slider.style.left = sidepanels[index].closePos + 'px';
				//mask.style.visibility = "hidden";
				//mask.style.width = '0px';
				//var  eventName       = document.body.style.webkitBorderRadius? "webkitTransitionEnd":"transitionend";
				sidepanelTweens[index] = new Tween(slider, "left", slider.offsetLeft, sidepanels[index].closePos, time);
			}
				addListener(sidepanelTweens[index], 'change', sidepanel_adjustMask);
				addListener(sidepanelTweens[index], 'finish', sidepanel_adjustTabs);
				if (sidepanels.length >1) {
					addListener(sidepanelTweens[index], 'finish', showAllSidePanelTab);
				}
				addListener(sidepanelTweens[index], 'finish', function(){dispatchCloseSidepanel(id,false);});
				dispatchCloseSidepanel(id,true);
		}
		sidepanels[index].openState = CLOSING;
	}
}

function sidepanel_closeall() {
	for(var i=0; i<sidepanels.length; i++) {
		var panel = document.getElementById("sidepanel_slider"+sidepanels[i].id);
		if(panel) {
			sidepanel_close(sidepanels[i].id);
		}
	}
}

function sidepanel_adjustMask(event) {
	
	if (!sidepanels.length) {
		cleanupSidepanels(); // [Caigoy,060815,QA-362] Fix for trace errors; remove tween 'change' listener when no sidepanels are found
	}

	var id = this.obj.id.substring(16);
	var slider = document.getElementById("sidepanel_slider"+id);
	var mask = document.getElementById("sidepanel_mask"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
	var index = getSidepanelIndex(id);
	
	if(sidepanels[index].side == "left") {
		mask.style.width = (sidepanels[index].closePos + slider.offsetLeft) + 'px';
		mask.style.left = sidepanels[index].closePos - slider.offsetLeft + 'px';
		if(this.finish > sidepanels[index].closePos) holder.style.left = slider.offsetLeft - this.finish + 'px';
		else holder.style.left = slider.offsetLeft - (holder.offsetWidth) + 'px';
	}
	else {
		mask.style.width = (sidepanels[index].closePos - slider.offsetLeft - mask.clientLeft) + 'px';
	}
	mask.style.visibility = "visible";
}

function sidepanel_adjustTabs(event) {
	if(typeof this.obj === 'undefined') {
		var id = event.substring(16);
	} else {
		var id = this.obj.id.substring(16);
	}
	var slider = document.getElementById("sidepanel_slider"+id);
	var mask = document.getElementById("sidepanel_mask"+id);
	var index = getSidepanelIndex(id);
	
	if(sidepanels[index].side == "left") {
		mask.style.width = (sidepanels[index].closePos + slider.offsetLeft) + 'px';
	} else {
		mask.style.width = (sidepanels[index].closePos - slider.offsetLeft - mask.clientLeft) + 'px';
	}
	
	if(sidepanels[index].openState == OPENING) {
		sidepanels[index].openState = IS_OPEN;
		mask.style.visibility = "visible";
	} else if(sidepanels[index].openState == CLOSING) {
		sidepanels[index].openState = IS_CLOSED;
		mask.style.visibility = "hidden";
	}
}

/*
addListener('sidepanel_slider'+id,'panel_open_start',callBack);

Events Dispatched:
	panel_open_start
	panel_open_end
	panel_close_start
	panel_close_end
*/
function dispatchOpenSidepanel(id,initialOpen){
	var slider = document.getElementById("sidepanel_slider"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
	var tab = document.getElementById("sidepanel_tab"+id);
        
		if(document.createEvent) {
			var panelOpen = document.createEvent('Event');
			if(initialOpen)
				panelOpen.initEvent('panel_open_start', true, true);
			else
				panelOpen.initEvent('panel_open_end', true, true);
		}
		else if(document.createEventObject) {
			var panelOpen = document.createEventObject();
				panelOpen.type = (initialOpen) ? 'panel_open_start' : 'panel_open_end';
		}

		if(slider) {
			if(slider && slider.dispatchEvent) 
				slider.dispatchEvent(panelOpen);
		}else if (holder) {
			if(holder && holder.dispatchEvent) 
				holder.dispatchEvent(panelOpen);
		}else if(tab){
			if(tab && holder.dispatchEvent) 
				tab.dispatchEvent(panelOpen);
		}
}

function dispatchCloseSidepanel(id,initialClose){
	
	var slider = document.getElementById("sidepanel_slider"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
    var tab = document.getElementById("sidepanel_tab"+id);

		if(document.createEvent) {
			var panelClose = document.createEvent('Event');
			if(initialClose)
				panelClose.initEvent('panel_close_start', true, true);
				else
				panelClose.initEvent('panel_close_end', true, true);
		}
		else if(document.createEventObject) {
			var panelClose = document.createEventObject();
				panelClose.type = (initialClose) ? 'panel_close_start' : 'panel_close_end';
		}

		if(slider) {
			if(slider && slider.dispatchEvent) 
				slider.dispatchEvent(panelClose);
		}else if (holder) {
			if(holder && holder.dispatchEvent) 
				holder.dispatchEvent(panelClose);
		}else if(tab){
			if(tab && holder.dispatchEvent) 
				tab.dispatchEvent(panelOpen);
		}
		
	//appCall('hideVolumeSlider');
}

// [Caigoy,060815,QA-362] Fix for trace errors; recurse through 
function cleanupSidepanels() {
	if (sidepanelTweens.length) {
		removeListener(sidepanelTweens.shift(), 'change', sidepanel_adjustMask);
		cleanupSidepanels();
	}
}

function closeSidepanels(){
	for(var i=0; i<sidepanels.length; i++) {
		if(sidepanels[i].openState == IS_OPEN || sidepanels[i].openState == OPENING){
			sidepanel_close(sidepanels[i].id);
			currentSidepanel =  sidepanels[i].id;
		}
	}
}

function reopenSidepanels(){
	if(currentSidepanel != ''){
		sidepanel_open(currentSidepanel);
		currentSidepanel = '';
	}

}
function getSidepanelIndex(id) {
	for(var i=0; i<sidepanels.length; i++) {
		if(sidepanels[i].id == id) {
			return i;
		}
	}
	return -1;
}

