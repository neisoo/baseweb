/* JSON MANAGER */
function jsonManager(parent, baseURL){
	this.parent = parent;
	var debug = this.parent.debug;
	this.baseURL = baseURL;
	this.animationStack = this.parent.stack;
	this.mode = this.parent.mode;
	
	if(debug){
		this.debug = this.parent.debug;
		this.log = this.parent.log;
		this.parent.addLog('JSON Manager Ready');
	}
}

jsonManager.prototype.clear = function(){
}

// Request the json and add the index
jsonManager.prototype.addJson = function(id, objid){
	var objref = this;
	
	if(this.mode == 'tool' || this.mode == 'preview'){ 
		if(!id) return; //added by TJ on 4/3/2014
		var URL  = this.baseURL+'animation_ajax.php?action=preview&id='+id;
	} else {
		if(!id || !this.parent.assetPath(id)) return; //added by TJ on 4/3/2014
		
		var URL = this.baseURL+this.parent.assetPath(id)+'animation_'+id+'.json';
	}
	
	ajax(URL, null, function(data) { objref.appendJson(data, objid); },this);
}

// Add the json
jsonManager.prototype.appendJson = function(data, objid){
	var animation = this.parent.stack[objid];
	if(typeof data == 'string'){ var data =JSON.parse(data); }
	animation.data = data.json;
	
	this.parent.buildImageList(objid);
}

//preload json
jsonManager.prototype.preloadJson = function(id, obj){
	var objref = this;
	
	if(this.mode == 'tool' || this.mode == 'preview'){ 
		if(!id) return; //added by TJ on 4/3/2014
		var URL  = this.baseURL+'animation_ajax.php?action=preview&id='+id;
	} else {
		if(!id || !this.parent.assetPath(id)) return; //added by TJ on 4/3/2014
		var URL = this.baseURL+this.parent.assetPath(id)+'animation_'+id+'.json';
	}
	ajax(URL, null, function(data) { objref.appendPreloadJson(data, obj); },this);
}

jsonManager.prototype.appendPreloadJson = function(data, obj){
	var animation = obj;
	if(typeof data == 'string'){ var data =JSON.parse(data); }
	animation.data = data.json;
	
	this.parent.buildPreloadImageList(animation);
}

// PREVIEW CODE
jsonManager.prototype.loadPreview = function(id){
	var objref = this;
	var baseURL  = 'animation_ajax.php?action=preview&id='+id;
	ajax(baseURL, null, function(data, index) { objref.appendPreviewJson(data,id); },this);
}

jsonManager.prototype.appendPreviewJson = function(data, id){
	if(typeof data == 'string'){ var data =JSON.parse(data); }
	this.stack[id] = data.json;
	this.parent.stack[id][0].data = data.json;
	this.parent.stack[id][0].images = new Array();
	this.parent.buildImageList(id, 0);
}