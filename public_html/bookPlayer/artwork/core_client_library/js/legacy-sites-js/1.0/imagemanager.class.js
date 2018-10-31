/* IMAGE MANAGER */
function imageManager(parent, baseURL){
	this.parent = parent;
	var debug = this.parent.debug;
	this.debug = debug;
	this.baseURL = baseURL;
	this.stack = new Array();
	this.preloads = new Array();
	this.status = 'idle';
	this.imagesLoaded = 0;
	this.imagesLeftToLoad = 0;
	if(debug){
		this.log = this.parent.log;
		this.parent.addLog('IMAGE Manager Ready');
	}
}

imageManager.prototype.clear = function(){
	this.stack = null;
	this.stack = new Array();
}

imageManager.prototype.processImages = function(objid){
	var objref = this;
	
	if(this.debug){ this.parent.addLog('Processing Images For animation ['+objid+']'); }
	
	var animation = this.parent.stack[objid];
	var animationImages = animation.images;

	var i = 0;
	for(var imageURL in animationImages){
		if(imageURL!='indexOf'){
			var obj = new Image();
			animationImages[imageURL] = obj;
			
			addListener(obj,'load',function(e){
				animation.imagesLeftToLoad--;
				if(animation.imagesLeftToLoad == 0){
					if(objref.debug){
						objref.parent.addLog('Finished Preloading Images.');
					}
					objref.parent.stack[objid].images = null;
					objref.parent.dispatch(objid, 'IMAGES LOADED');
					objref.parent.buildPlayer(objid);
				}
			});
			obj.src = imageURL;
			i++;
		}		
	}
	if(i == 0){
		if(objref.debug){
			objref.parent.addLog('No images to preload.');
		}
		this.parent.stack[objid].images = null;
		this.parent.dispatch(objid, 'IMAGES LOADED');
		this.parent.buildPlayer(objid);
		return;
	}
}

imageManager.prototype.processPreloadImages = function(obj){
	var objref = this;
	
	if(this.debug){ this.parent.addLog('Processing Preload Images For animation ['+obj.animationid+']'); }
	
	var animation = obj;
	var animationImages = animation.images;
	var i = 0;
	for(var imageURL in animationImages){
		if(imageURL!='indexOf'){

			var obj = new Image();
			this.preloads.push(obj);
			with(obj.style)
			{
				position = 'absolute';
				left = '0px';
				top = '0px';
				width = '1px';
				height = '1px';
			}
			
			
			animationImages[imageURL] = obj;
			addListener(obj,'load',function(e){
				var _target = getEventTarget(e);
				
				animation.imagesLeftToLoad--;
				if(animation.imagesLeftToLoad == 0){
					if(objref.debug){
						objref.parent.addLog('Finished Preloading Images');
					}
					objref.parent.dispatch(null,'IMAGES PRELOADED', {animationid:animation.animationid});
					animation.images = null;
					animation = null;
				}
			});
			obj.src = imageURL;
			document.body.appendChild(obj);
		} 	
		i++;
	}
	if(i == 0){
		if(objref.debug){
			objref.parent.addLog('No images to preload.');
		}
			objref.parent.dispatch(null,'IMAGES PRELOADED', {animationid:animation.animationid})
			animation = null;
		return;
	}
}

// No listeners for this portion of Code either  - MG 03/04/14
// ASSET ONLY LOADING
imageManager.prototype.addImageAlone = function(URL){
	var stack = this.stack;
	var imagesLeftToLoad = this.imagesLeftToLoad;
	if(stack[this.baseURL+URL] === void 0){
		stack[this.baseURL+URL] = new Object();
		stack[this.baseURL+URL].ready = false;
		this.imagesLeftToLoad++;
	}
}
imageManager.prototype.processSoloAssets = function(){
	var stack = this.stack;
	var objref = this;
	for(var index in stack){
		var imageInStack = stack[index];
		var obj = new Image();
			
		imageInStack.obj = obj;
		addListener(obj,'load',function(e){
				objref.imageReady(this);
		});
		addListener(obj,'error',function(e){
			if(objref.debug){
				objref.parent.addLog('Tell Corey Rosamond to implement support for missing images');
			}
		});
		obj.src = index;
	}
}
imageManager.prototype.imageReady = function(obj){
	var stack = this.stack;
	var parent = this.parent;
	
	stack[obj.src].ready = true;
	this.imagesLoaded++;
	this.imagesLeftToLoad--;
	if(this.imagesLeftToLoad == 0){
		parent.dispatch(null,'ASSET ONLY LOAD COMPLETE');
	}
}
