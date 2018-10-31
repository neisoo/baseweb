var itemseq = 0;
var itemlist = new Array();
var LayerInfo = {};

LayerInfo.SCENE 		= 100;
LayerInfo.SKIN 			= 150;
LayerInfo.EYES 			= 200;
LayerInfo.MOUTH 		= 250;
LayerInfo.NOSE 			= 300;
LayerInfo.HAIR 			= 350;
LayerInfo.GLASSES 		= 400;
LayerInfo.LEGGINGS	 	= 500;
LayerInfo.SOCKS 		= 550;
LayerInfo.SHOES 		= 600;
LayerInfo.PANTS 		= 650;
LayerInfo.SHIRT 		= 700;
LayerInfo.DRESS 		= 725;
LayerInfo.JACKET 		= 750;
LayerInfo.SWEATER 		= 775;
LayerInfo.COSTUME 		= 800;
LayerInfo.GOWN 			= 825;
LayerInfo.PET 			= 850;

LayerInfo.isClothing = function(layer) { return (layer >= this.SHIRT && layer <= this.COSTUME); }
LayerInfo.blockCostume = function(layer) { return (layer > this.HAIR && layer < this.COSTUME); }
LayerInfo.blockGown = function(layer) { return (layer >= this.PANTS && layer < this.GOWN && layer != this.SHOES && layer != this.SOCKS); }
LayerInfo.canRemove = function(layer) { return (layer == this.SCENE || layer >= this.HAIR); }

//////////////////////////////////////////////////////////
//	AVATAR ITEM OBJECT
//////////////////////////////////////////////////////////

function AvatarItem(info) {
	this.tryout = false;
	for(var prop in info) this[prop] = info[prop];

	//this.id = 'item_'+itemseq++;
	this.id = 'item_'+info.sku;
	this.info = info;
	this.specialhair = 0;
	if(info.properties && info.properties.specialhair)
		this.specialhair = info.properties.specialhair;

	this.onHanger = 0;
	this.ready = false;
	this.remove = false;
	this.failed = false;
	this.owned = false;
	if(!this.info.owned)this.owned = true;
	if(this.info.owned){
		for(var i=0;i<this.info.owned.length;i++){
			if(this.info.owned[i] == this.info.variant_desc[this.info.variant].variant)
				this.owned = true;
		}
	}
	this.linecolor = 0;
	this.imageWidth = 0;
	this.imageHeight = 0;
	this.img = document.createElement('canvas');
	this.img.style.position = 'absolute';
	this.img.itemobj = this;

	this.pngimg = new Image();
	this.pngimg.setAttribute('itemobj', this.id);
	this.pngimg.id = this.id;
	this.pngimg.style.backgroundColor	=   'rgba(255,255,255,0)';
	//this.pngimg.setAttribute('onload', "IE8loadImage('"+this.id+"')"); //using setAttribute instead of event, because IE 8 had problem targeting the source
	//Added by MS, this is needed for IE8
	var self = this;
	this.pngimg.onload = function() { self.loaded();};



	this.pngimg.setAttribute('onerror', "IE8loadImage('"+this.id+"')");
	this.pngimg.src = info.image; //+"?v="+((new Date()).getTime());
	if(this.pngimg.complete) { this.loaded(); }
	this.storeimg = new Image();
	this.storeimg.setAttribute('itemobj', this.id);
	// using info.image if info.storeimage is not available. Because for graduation the gown does not have storeimage
	if (info.storeimage) {
		this.storeimg.src = info.storeimage;
	} else {
		this.storeimg.src = info.image;
	}
	addListener(this.pngimg, 'click', this.avatarClicked);



//////////////////////////////////////////////////////////////////////////////////////

	itemlist.push(this);
}

function avatarItemById(id) {
	for(var i=0;i<itemlist.length;i++) {
		if(itemlist[i].id == id) return itemlist[i];
	}
}

function IE8loadImage(itemid) {
	var item = avatarItemById(itemid);

	if(item) {
		item.loaded();
	}
}


AvatarItem.prototype.getTryout = function() { return this.tryout; }
AvatarItem.prototype.setTryout = function(b) { this.tryout = b; }

AvatarItem.prototype.loaded = function() {
	this.imageWidth = this.pngimg.width;
	this.imageHeight = this.pngimg.height;

	this.img.width = this.imageWidth;
	this.img.height = this.imageHeight;

	//this.div = document.getElementById("imageHolder_div");
	//this.div.appendChild(this.pngimg);
	if(this.img.getContext) {
		this.img.getContext('2d').drawImage(this.pngimg, 0, 0, this.imageWidth, this.imageHeight);
	}

	this.ready = true;
	this.dispatchEvent('loaded');
}

AvatarItem.prototype.setOutline = function(color){
	if(this.linecolor != color){
		this.ready = false;
		this.pngimg.src = this.info.image.replace('.png','_'+color+'.png');
		this.linecolor = color;
	}
	else {
		this.loaded();
	}
}

AvatarItem.prototype.hitTest = function(x,y) {

	var top = parseInt(this.pngimg.style.top.replace('px',''));
	var left = parseInt(this.pngimg.style.left.replace('px',''));
	var width = parseInt(this.pngimg.style.width.replace('px',''));
	var height = parseInt(this.pngimg.style.height.replace('px',''));

	x = Math.round((x - left)*this.pngimg.width/width);
	y = Math.round((y - top)*this.pngimg.height/height);
	cnvs_width = 1;
	cnvs_height = 1;

	var ctx = this.img.getContext('2d');
	var imgd = ctx.getImageData(x, y, cnvs_width, cnvs_height);
	var pix = imgd.data;
	if (pix[3] != 0){
		return true;
	} else {
		return false;
	}
}

enableEventHandling(AvatarItem);

//////////////////////////////////////////////////////////
//	AVATAR OBJECT
//////////////////////////////////////////////////////////

function Avatar(div, items) {
	if(typeof(div) == 'string') div = document.getElementById(div);
	this.div = div;
	div.objref = this;
	this.items = new Array();
	this.info = new Object();

	this.myRoomStart = false;
	this.partstoload = 0;
	this.olditems = new Array();
	this.skinline = "#BD875D";
	this.skintone = "#BD875D";
	this.changes = false;
	this.changeSinceLastSave = false;
	this.showacc = true;
	this.showPet = false;
	this.showAvatar = false;
	this.autoSave = true;
	this.fillhair = false;
	this.usehair = false;
	this.avgender = '';
	this.buildlist = new Array();
	this.allowClickClothes = true;
	this.myRoomDefaultOutfit = new Array();
	this.inAvatarPicker = false;
	this.inStore = false;
	this.inStoreDefaultClothing = new Array();
	this.inStoreNotDefaultClothing = new Array();
	this.inStoreDefaultAvatar = false;
	this.originalClothing = new Array();
	this.costumeIsOnAvatar = false;

	this.defaultskintone = new Image();
	this.defaultskintone.id = 'defaultskintone';
	this.defaultskintone.style.position = 'absolute';
	this.defaultskintone.src = '/artwork/items/avatar/skin/default_skintone.png';
	this.defaultskintone.style.visibility = 'hidden';
	this.defaultskintone.style.backgroundColor = 'rgba(255,255,255,0)';
	addListener(this.defaultskintone, 'click', this.avatarClicked);
	div.appendChild(this.defaultskintone);

	this.defaultpants = new Image();
	this.defaultpants.id = 'defaultpants';
	this.defaultpants.style.position = 'absolute';
	this.defaultpants.src = '/artwork/items/avatar/pants/reg_shorts_s92203.png';
	this.defaultpants.style.visibility = 'hidden';
	this.defaultpants.style.backgroundColor = 'rgba(255,255,255,0)';
	addListener(this.defaultpants, 'click', this.avatarClicked);
	div.appendChild(this.defaultpants);

	this.defaultshirt = new Image();
	this.defaultshirt.id = 'defaultshirt';
	this.defaultshirt.style.position = 'absolute';
	this.defaultshirt.src = '/artwork/items/avatar/shirt/reg_crew_neck_shirt_s93506.png';
	this.defaultshirt.style.visibility = 'hidden';
	this.defaultshirt.style.backgroundColor = 'rgba(255,255,255,0)';
	addListener(this.defaultshirt, 'click', this.avatarClicked);
	div.appendChild(this.defaultshirt);


	this.scale = .5;
	this.scalePercent = 0;
	this.roomItem = this;
	this.div.roomItem = this;
	this.div.style.marginLeft = Math.round(-(this.div.offsetWidth -this.div.offsetWidth*this.scale)/2) + 'px';
	this.div.style.marginTop = Math.round(-(this.div.offsetHeight -this.div.offsetHeight*this.scale)/2) + 'px';
	this.div.style.backgroundColor = 'rgba(255,255,255,0)';

	if(items.length == 0){
		this.defaultpants.style.visibility = 'inherit';
		this.defaultshirt.style.visibility = 'inherit';
		this.defaultskintone.style.visibility = 'inherit';
	}

	if(items && items.length > 0) {
		this.partstoload = items.length;
		for(var i=0;i<items.length;i++) {
			var item = new AvatarItem(items[i]);
			item.avobj = this;
			item.tryout = true;
			this.items.push(item);
			addListener(item, 'loaded', this.partLoaded);
		}
		this.arrangeLayers();
	}

	addListener(this.div, 'click', this.avatarClicked);
}

//////////////////////////////////////////////////////////

Avatar.prototype.setScale = function(newscale) {
	if(isFinite(newscale)) {
		var oldscale = this.scale;
		this.scale = newscale;
		this.div.style.webkitTransform = 'scale('+this.scale+')';
		this.div.style.MozTransform = 'scale('+this.scale+')';
		this.div.style.msTransform = 'scale('+this.scale+')';

		//added by MS 2013-04-12, needed for IE8 and browsers that don't support "transform"
		if(nohtml5) {
			var current_layers = this.div.getElementsByTagName("img");

			for(var x=0; x < current_layers.length; x++) {

				if(current_layers[x].width == 0){
					addListener(current_layers[x], "load", function(img) {
						return function() {
							img.width = img.width * newscale;
							img.height = img.height * newscale;
						};
					}(current_layers[x]));
				} else {
					current_layers[x].width = current_layers[x].width * this.scale;
					current_layers[x].height = current_layers[x].height * this.scale;
				}

			}
		}
	}

	this.div.style.marginLeft = Math.round(-(this.div.offsetWidth -this.div.offsetWidth*newscale)/2) + 'px';
	this.div.style.marginTop = Math.round(- (this.div.offsetHeight -this.div.offsetHeight*newscale)/2) + 'px';
}

Avatar.prototype.getSize = function() {
	var maxSize = new Object();
	maxSize.width = 0;
	maxSize.height = 0;
	for(var i=0;i<this.items.length;i++) {
		if(!this.items[i].ready) {
			maxSize = new Object();
			maxSize.width = 0;
			maxSize.Height = 0;
			return maxSize;
		}

		if(maxSize.width < this.items[i].imageWidth) {
			maxSize.width = this.items[i].imageWidth;
		}
		if(maxSize.height < this.items[i].imageHeight) {
			maxSize.height = this.items[i].imageHeight;
		}
	}

	return maxSize;
}


//////////////////////////////////////////////////////////
// Keep the default cloths from the original avatar to put back on when user remove the new cloths in the store. Rl 1/28/2014
Avatar.prototype.saveDefaultOutfits = function(defaultCloth){
	this.inStoreDefaultClothing = defaultCloth;
}
Avatar.prototype.saveNotDefaultOutfits = function(defaultCloth){
	this.inStoreNotDefaultClothing = defaultCloth;
}

Avatar.prototype.saveOriginalOutfits = function(outfit){
	for (var i=0; i<outfit.length; i++)
		this.originalClothing.push(outfit[i]);
}

Avatar.prototype.saveMyRoomOutfits = function(outfit){
	for (var i=0; i<outfit.length; i++)
		this.myRoomDefaultOutfit.push(outfit[i]);
}

//////////////////////////////////////////////////////////
// Get item state
// An original outfit information will be saved in the state.outfitBeforeCostume
// By going through the user inventory and finding out the information of outfitBeforeCostume and return as a list.
Avatar.prototype.getItemState = function(userInventory) {
	var resultList = new Array();
	for (key in userInventory) {
        if (userInventory.hasOwnProperty(key)) {
			for (var i=0; i<userInventory[key].length; i++) {
				if (userInventory[key][i].instances[0].state.outfitBeforeCostume){
					var itemobj = new AvatarItem(userInventory[key][i]);
					resultList.push(itemobj);
				}
			}
		}
    }

	return resultList;
}

//////////////////////////////////////////////////////////
Avatar.prototype.avatarClicked = function(event) {

	var target = getEventTarget(event);

	if (! target.objref) return;
	var obj = target.objref;

	if(obj.allowClickClothes == false) return;
	var pagePos = pagePosition(event);
	var offsets = nodeOffsets(this);
	// var x = mouseXpos/pageScale - offsets.x;
	// var y = mouseYpos/pageScale - offsets.y;
	var x = mouseXpos - offsets.x;
	var y = mouseYpos - offsets.y;

	var marginTop = 2*Math.floor(parseFloat(this.style.marginTop.replace('px','')));
	var marginLeft = 2*Math.floor(parseFloat(this.style.marginLeft.replace('px','')));

	x += marginLeft;
	y += marginTop;

	x /= obj.scale;
	y /= obj.scale;
	// Get the DIV ID when clicking on the avatar in the store.
	// A page number is attached to the ID and use the ID to adjust x position
	var divID = target.id;
	var avatarPageNumber = parseInt(divID.substring(7,8));
	if(avatarPageNumber>0){
		x += avatarPageNumber*300;
	}

	for(var i=obj.buildlist.length-1;i>=0;i--) {
		// For the following if-condition:
		// The following will use this function -> 'AvatarItem.prototype.hitTest = function(x,y)'
		// obj.buildlist[i]: Check and see if the object is available
		// obj.buildlist[i].hitTest: Check and see if the function is available
		// obj.buildlist[i].hitTest(x,y): Run the function 'hitTest'
		if(obj.buildlist[i] && obj.buildlist[i].hitTest && obj.buildlist[i].hitTest(x,y)) {
			//this.changeSinceLastSave = true;
			obj.changeSinceLastSave = true;
			//var hangupItemLayer = obj.buildlist[i].layer;
			obj.hangupItem(obj.buildlist[i]);
			// For in Store avatar check if it is the first(default) avatar, if yes the default cloths will put on if a new cloth remove. RL 1/28/2014
			if(obj.inStore){
				//alert(obj.div.id);
				if (obj.div.id == 'avatar_0') {
					//if(obj.buildlist[i].layer == 800){
					//alert(obj.buildlist[i].layer);
						obj.avatarItemStoreRestoreDefaultCloth();
					//}
				} else {
					//if(obj.buildlist[i].layer == 800){
						obj.avatarItemStoreRestoreNotDefaultCloth();
					//}
				}
			} else if (obj.inAvatarPicker){
				if (obj.buildlist[i].layer == 800){
					//putOnClothesBeforeCostume();
					cancelChanges();
				}
			} else {
				if (obj.buildlist[i].layer == 800){
					for (var j=0; j<obj.inStoreDefaultClothing.length; j++){
						obj.setItem(obj.inStoreDefaultClothing[j]);
					}
				} else {
					for (var j=0; j<obj.inStoreDefaultClothing.length; j++){
						if (obj.inStoreDefaultClothing[j].layer == obj.buildlist[i].layer){
							obj.setItem(obj.inStoreDefaultClothing[j]);
						}
					}
				}
			}
			obj.arrangeLayers();
			obj.save();
			return;
		}
	}
	return;
}

//////////////////////////////////////////////////////////
Avatar.prototype.avatarItemStoreRestoreDefaultCloth = function() {
	for (var j=0; j<this.inStoreDefaultClothing.length; j++){
		this.tryItem(this.inStoreDefaultClothing[j]);
	}
}

Avatar.prototype.avatarItemStoreRestoreNotDefaultCloth = function() {
	for (var j=0; j<this.inStoreNotDefaultClothing.length; j++){
		this.tryItem(this.inStoreNotDefaultClothing[j]);
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.avatarClickAllClothes = function() {
	var av = this;

	for(var i=av.buildlist.length-1;i>=0;i--) {
		if(av.buildlist[i]) {
			av.hangupItem(av.buildlist[i]);
		}
	}

	if(av.autoSave) {
		av.save();
	}

	return;
}

//////////////////////////////////////////////////////////

Avatar.prototype.hitTest = function(xpos, ypos) {
	var marginTop = Math.floor(parseFloat(this.div.style.marginTop.replace('px','')));
	var marginLeft = Math.floor(parseFloat(this.div.style.marginLeft.replace('px','')));
	xpos = xpos - this.div.offsetLeft + marginLeft;
	ypos = ypos - this.div.offsetTop + marginTop;

	ypos /= this.scale;
	xpos /= this.scale;

	for(var i=this.buildlist.length-1;i>=0;i--) {
		if(this.buildlist[i] && this.buildlist[i].hitTest && this.buildlist[i].hitTest(xpos,ypos)) {
			return true;
		}
	}
	return false;
}

//////////////////////////////////////////////////////////
//created by TJ on 8/2/2012, hit test response from flash component
Avatar.prototype.avatarClickedFromFlash = function(event){
	if(clickarea) {
		var av = clickarea.target.objref;
		if(clickarea.target.objref.allowClickClothes==false) return;
		for(var i=av.buildlist.length-1;i>=0;i--) {
			if(av.buildlist[i] && av.buildlist[i].sku == clickarea.returnid) {
				av.hangupItem(av.buildlist[i]);
				if(av.autoSave) {
					av.save();
				}
				return;
			}
		}
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.partLoaded = function(event) {
	this.avobj.partstoload--;
	if(this.avobj.partstoload <= 0) {
		this.avobj.div.style.visibility = 'inherit';
		this.avobj.arrangeLayers();
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.getItem = function(objectid, varid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].onHanger == false) {
			if(this.items[i].objectId == objectid && (varid == undefined || this.items[i].variant == varid)) return this.items[i];
		}
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.hasItem = function(objectid, varid) {
	return (this.getItem(objectid, varid) != null);
}

//////////////////////////////////////////////////////////

Avatar.prototype.hasLayer = function(layerid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].layer == layerid)
			return true;
	}
	return false;
}

//////////////////////////////////////////////////////////

Avatar.prototype.save = function(area) {
	if(this.changeSinceLastSave) {
		// Save the new avatar if not in the store
		if(!this.inStore){
			var list = new Array();
			if(area == undefined)
				area = '';
			for(var i=0;i<this.items.length;i++) {
				//if(this.items[i].tryout) return;
				if(this.items[i].onHanger == 1) continue;
				if(this.items[i].remove) continue;
				list.push(this.items[i].sku);
			}

			var data = new Object();
			data.action = 'save2';
			data.area = area;
			data.skus = list.join(',');
			ajax('/xml/avatar.php?&userid='+this.avuserid, data, this.saveDone.bind(this));
			//this.changeSinceLastSave = false;
		}
		return true;
	}
	return false;
}

Avatar.prototype.saveDone = function(data) {
	this.dispatchEvent('avatar_saved');
}

//////////////////////////////////////////////////////////

Avatar.prototype.getChanged = function() { return this.changes; }
Avatar.prototype.setChanged = function(b) { this.changes = b; }

Avatar.prototype.getUserid = function() { return this.avuserid; }
Avatar.prototype.setUserid = function(b) {
	if(b != this.avuserid)
		this.changes = this.changeSinceLastSave = true;
	this.avuserid = b;
}

Avatar.prototype.getShowAccesories = function() { return this.showacc; }
Avatar.prototype.setShowAccesories = function(b) {
	this.showacc = b;
	this.arrangeLayers();
}

Avatar.prototype.getGender = function() { return this.avgender; }
Avatar.prototype.setGender = function(g) {
	this.avgender = g;
	switch(g){
		case 'F':
			this.defaultshirt.src = '/artwork/items/avatar/shirt/girl_crew_tshirt_s98402.png';
			this.defaultpants.src = '/artwork/items/avatar/pants/short_shorts_s95603.png';
			break;
		default:
			this.defaultshirt.src = '/artwork/items/avatar/shirt/reg_crew_neck_shirt_s93506.png';
			this.defaultpants.src = '/artwork/items/avatar/pants/reg_shorts_s92203.png';
			break;
	}
/*
	if(g == 'F') {
		this.defaultshirt.src = '/artwork/items/avatar/shirt/girl_crew_tshirt_s98402.png';
		this.defaultpants.src = '/artwork/items/avatar/pants/short_shorts_s95603.png';
	}
	else {
		this.defaultshirt.src = '/artwork/items/avatar/shirt/reg_crew_neck_shirt_s93506.png';
		this.defaultpants.src = '/artwork/items/avatar/pants/reg_shorts_s92203.png';
	}
*/
}

//////////////////////////////////////////////////////////

// Added to prevent some layer get removed from avatar. RL 12/18/2013
Avatar.prototype.preventItemGetRemove = function(layerID) {
	var counter = 0;
	for(var i=0; i<this.items.length; i++){
		if(this.items[i].layer == layerID)
			counter++;
	}
	if (counter==1){
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].layer == layerID)
				this.items[i].remove = false;
		}
	} else {
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].layer == layerID){
				this.items[i].remove = true;
				return;
			}
		}
	}
}

Avatar.prototype.arrangeLayers = function(latestlayer) {
	if(latestlayer == undefined) latestlayer = 0;
	var haspants = false;
	var hasshirt = false;
	var incostume = false;
	var indress = false;
	var ingown = false;
	var tryoutlayers = new Array();
	var costume = null;
	//var tryArray = new Array();
	this.buildlist = new Array();
	this.fillhair = false;
	this.usehair = false;

	// abort if not all items are loaded
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].failed)
			this.items[i].remove = true;
		if(!this.items[i].ready && !this.items[i].remove) { return; }
	}

	// prevent item get remove. RL 12/18/2013
	this.preventItemGetRemove(LayerInfo.SKIN);
	this.preventItemGetRemove(LayerInfo.EYES);
	this.preventItemGetRemove(LayerInfo.MOUTH);
	this.preventItemGetRemove(LayerInfo.NOSE);

	// remove unused elements from list
	this.removeItemsFromItemList();
	//if(!this.inStore){
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].onHanger == 1){
				if (this.items[i].pngimg.parentNode)
					this.div.removeChild(this.items[i].pngimg);
				//this.items.splice(i, 1);
				//i--;
			}
		}
	//}
	// check if there are pants and shirt in list
	for(var i=0;i<this.items.length;i++) {
		if(!this.items[i].ready) continue;
		if(this.items[i].onHanger == 1) continue;
		if(this.items[i].isBlank) continue;
		if(this.items[i].remove) continue; //added by TJ on 8/6/2012

		switch(this.items[i].layer){
			case LayerInfo.PANTS:
				haspants = true;
				break;
			case LayerInfo.LEGGINGS:
				haspants = true;
				break;
			case LayerInfo.SHIRT:
				hasshirt = true;
				break;
			case LayerInfo.COSTUME:
				incostume = true;
				costume = this.items[i];
				break;
			case LayerInfo.DRESS:
				indress = true;
				break;
			case LayerInfo.GOWN:
				ingown = true;
				break;
			default:
				break;
		}

		if (this.items[i].specialhair && this.items[i].specialhair > 0 && incostume) {
			if (this.items[i].specialhair == 1) this.fillhair = true;
			else if (this.items[i].specialhair == 2) this.usehair = true;
		}
		if(this.items[i].tryout) tryoutlayers.push(this.items[i].layer);
	}

	if(ingown) indress = incostume = false;
	if(incostume && LayerInfo.blockCostume(latestlayer)) incostume = false;
	if (latestlayer == LayerInfo.HAIR && (this.usehair || this.fillhair))
		incostume = true;
	else if(incostume)
		indress = false;

	if(latestlayer == LayerInfo.SHIRT || latestlayer == LayerInfo.PANTS) indress = false;
	if(ingown || indress || incostume) hasshirt = haspants = true;

	this.defaultpants.style.visibility = haspants ? 'hidden' : 'inherit';
	this.defaultshirt.style.visibility = hasshirt ? 'hidden' : 'inherit';

	// bits o' logic
	this.items.sort(this.sortByLayer);

	for(var i=0;i<this.items.length;i++) {
		var item = this.items[i];
		var anticostume = (item.layer == LayerInfo.HAIR && costume && costume.properties.specialhair == 2) ? false : LayerInfo.blockCostume(item.layer);
		if(item.layer == LayerInfo.SKIN) {
			if(item.skinline && this.skinline != item.skinline) {
				this.setSkinLine(item.skinline);
				return;
			}
		}
		var tryitem = false;
		for(var j=0;j<tryoutlayers.length;j++) {
			if(tryoutlayers[j] == item.layer)
				tryitem = true;
		}

		// costume hides other clothing layers
		if(incostume && anticostume && !item.onHanger) item.onHanger = 1;
		if(!incostume && item.layer == LayerInfo.COSTUME && !item.onHanger)
		item.onHanger = 1;

		// gown hides other clothes except shoes and socks
		if(ingown && LayerInfo.blockGown(item.layer) && !item.onHanger) item.onHanger = 1;

		// dress hides shirt and pants
		if(indress && (item.layer == LayerInfo.SHIRT || item.layer == LayerInfo.PANTS) && !item.onHanger) item.onHanger = 1;

		// final check to restore items put on hangers
		if(item.onHanger == 1) {
			if(item.tryout) {
				if(incostume) {
					if(!anticostume) {
						item.onHanger = 0;
					}
				} else {  // !incostume
					if(!tryitem) {
						if(anticostume) {
							item.onHanger = 0;
						} else {
							if(item.layer != LayerInfo.COSTUME) item.onHanger = 0;
						}
					}
				}
			} else {  // !tryout
				if(tryitem) {
					item.onHanger = 1;
				} else if(ingown) {
					if(LayerInfo.blockGown(item.layer)) item.onHanger = 1;
					else item.onHanger = 0;
				} else if(incostume) {
					if(anticostume) {
						item.onHanger = 1;
					} else {
						item.onHanger = 0;
					}
				} else {  // !incostume
					if(anticostume) {
						if(indress && item.layer == LayerInfo.SHIRT) item.onHanger = 0;
						else if(indress && item.layer == LayerInfo.PANTS) item.onHanger = 1;
						else if(!indress && item.layer == LayerInfo.DRESS) item.onHanger = 1;
						else item.onHanger = 1;
					} else {
						if(item.layer != LayerInfo.COSTUME && item.layer != LayerInfo.PET) item.onHanger = 0;
						if (!incostume || (costume && costume.properties.specialhair == 2) && item.layer == LayerInfo.HAIR) {
							item.onHanger = 0;
						}
					}
				}
			}
		}

		// mutually exclusive layers
		if(item.onHanger == 0) {
			if(latestlayer == LayerInfo.JACKET && item.layer == LayerInfo.SWEATER) item.onHanger = 1;
			else if(latestlayer == LayerInfo.SWEATER && item.layer == LayerInfo.JACKET) item.onHanger = 1;
			else if(latestlayer == LayerInfo.DRESS && item.layer == LayerInfo.SHIRT) item.onHanger = 1;
			else if(latestlayer == LayerInfo.SHIRT && item.layer == LayerInfo.DRESS) item.onHanger = 1;
			else if(latestlayer == LayerInfo.DRESS && item.layer == LayerInfo.PANTS) item.onHanger = 1;
			else if(latestlayer == LayerInfo.PANTS && item.layer == LayerInfo.DRESS) item.onHanger = 1;
		}

		/*SF-3862
		if (item.layer == LayerInfo.HAIR && (!incostume)) {
			item.onHanger = 0;
			this.usehair = true;
			this.changeSinceLastSave = true;
		}*/
/*
		if (item.layer == LayerInfo.SOCKS && (!incostume)) {
			item.onHanger = 0;
			this.changeSinceLastSave = true;
		}

		if (item.layer == LayerInfo.SHOES && (!incostume)) {
			item.onHanger = 0;
			this.changeSinceLastSave = true;
		}
*/

		item.pngimg.style.visibility = (item.onHanger || item.remove) ? 'hidden' : 'inherit'; //modified by TJ on 8/6/2012, item.remove added on the condition

		if (item.layer == LayerInfo.HAIR && this.fillhair && !item.onHanger) {
			item.pngimg.style.visibility = 'hidden';
		}
		if (item.layer == LayerInfo.HAIR && this.usehair && (!item.onHanger || !item.remove)){
			item.pngimg.style.visibility = 'inherit';
			item.pngimg.style.left = (-31*((item.imageWidth-300)%10)) + 'px';
			item.pngimg.style.top = (-31*((item.imageHeight-580)%10)) + 'px';
			this.buildlist.push(item);
		}

		if(item.onHanger || item.remove) continue; //modified by TJ on 8/6/2012, item.remove added on the condition
		if(item.pngimg) {
			item.pngimg.style.left = (-31*((item.imageWidth-300)%10)) + 'px';
			item.pngimg.style.top = (-31*((item.imageHeight-580)%10)) + 'px';

			if(nohtml5) {
				item.pngimg.style.height = (item.imageHeight * this.scale)+'px';
				item.pngimg.style.width = (item.imageWidth * this.scale)+'px';
			} else {
				item.pngimg.style.height = (item.imageHeight)+'px';
				item.pngimg.style.width = (item.imageWidth)+'px';
			}
			if(item.pngimg.style.visibility == 'inherit'){
				this.buildlist.push(item);
			}
		}
		if(!this.showacc && (item.layer == LayerInfo.SCENE || item.layer == LayerInfo.PET)){
			item.pngimg.style.visibility = 'hidden';
		}
		tryitem = null;
		delete tryitem;
	}
	// Clean up variables
	haspants = null;
	delete haspants;
	hasshirt = null;
	delete hasshirt;
	indress = null;
	delete indress;
	ingown = null;
	delete ingown;
	incostume = null;
	delete incostume;
	for(var i=0; i<tryoutlayers.length; i++) {
		tryoutlayers[i] = null;
		tryoutlayers.splice(i, 1);
		delete tryoutlayers[i];
	}
	tryoutlayers = [];
	delete tryoutlayers;

/*
	for(p=0;p< this.buildlist.length;p++){
		tryArray.push(this.buildlist[p].info.objectid);
	}
*/
	//modified by TJ on 8/3/2012, default shirt and pants have fixed width (300) and height (580) with default offset (0,0)
	var added = false;
	if(this.defaultpants.style.visibility == 'inherit' && !nohtml5) {
		this.defaultpants.style.left = '0px';
		this.defaultpants.style.top = '0px';
		this.defaultpants.style.width = (300)+'px';
		this.defaultpants.style.height = (580)+'px';

		for(var i = 0; i < this.buildlist.length; i++) {
			if(this.buildlist[i].layer != undefined && this.buildlist[i].layer >= LayerInfo.PANTS) {
				this.buildlist.splice(i, 0, this.defaultpants);
				added = true;
				break;
			}
		}

		if(added == false)
			this.buildlist.push(this.defaultpants);
	}
	if(this.defaultshirt.style.visibility == 'inherit' && !nohtml5) {
		added = false;
		this.defaultshirt.style.left = '0px';
		this.defaultshirt.style.top = '0px';
		this.defaultshirt.style.width = (300)+'px';
		this.defaultshirt.style.height = (580)+'px';

		for(var i = 0; i < this.buildlist.length; i++) {
			if(this.buildlist[i].layer != undefined && this.buildlist[i].layer >= LayerInfo.SHIRT) {
				this.buildlist.splice(i, 0, this.defaultshirt);
				added = true;
				break;
			}
		}

		if(added == false)
			this.buildlist.push(this.defaultshirt);
	}
	added = null;
	delete added;

	// convert stack of canvas elements into png
	// some browsers have trouble with these canvases
	if(this.buildlist.length) {

		// This block may not being used by anything. commended out on 3/5/2014 - RL
		/*
		var top, left, width, height;
		for(var i=0;i<this.buildlist.length;i++) {
			if(this.buildlist[i].pngimg) {
				var t1 = Math.floor(parseFloat(this.buildlist[i].pngimg.style.top.replace('px','')));
				var l1 = Math.floor(parseFloat(this.buildlist[i].pngimg.style.left.replace('px','')));
				var w1 = Math.ceil(parseFloat(this.buildlist[i].pngimg.style.width.replace('px','')));
				var h1 = Math.ceil(parseFloat(this.buildlist[i].pngimg.style.height.replace('px','')));

				top = (top == undefined) ? t1 : Math.min(top, t1);
				left = (left == undefined) ? l1 : Math.min(left, l1);
				width = (width == undefined) ? w1 : Math.max(width, w1);
				height = (height == undefined) ? h1 : Math.max(height, h1);
			}
		}
		*/
		for(var i=0;i<this.buildlist.length;i++) {
			if(this.buildlist[i].pngimg) {
				this.buildlist[i].pngimg.style.position = 'absolute';
				if((this.buildlist[i].layer < LayerInfo.PANTS) && (this.buildlist[i].type != 'glasses'))
					//This checks if defaultpants exists. Seems to only cause an error in IE. DAG 5.15.14
					if(document.getElementById(this.defaultpants.id)){
						this.div.insertBefore(this.buildlist[i].pngimg, this.defaultpants);
					}else{
						this.div.appendChild(this.buildlist[i].pngimg);
					}
				else
					this.div.appendChild(this.buildlist[i].pngimg);
			} else {
				this.div.appendChild(this.buildlist[i]);
			}
			if(this.showPet == true && this.buildlist[i].layer == LayerInfo.PET){
				this.buildlist[i].pngimg.style.visibility = 'inherit';
				this.div.style.width = item.pngimg.offsetWidth + 'px';
			}

			// The following can only apply to MyRoom when it start. RL 12/27/2013
			// Can also be fixed by just changing the opacity of avatar div in myroom instead of doing this
			if (this.myRoomStart){
				if(this.showAvatar == false && this.buildlist[i].pngimg && (!USINGAPP || MOBILE=='iphone' || MOBILE=='ipad') ){
					this.buildlist[i].pngimg.style.visibility = 'hidden';
					this.div.style.width = item.pngimg.offsetWidth + 'px';
					this.defaultpants.style.visibility = 'hidden';
					this.defaultshirt.style.visibility = 'hidden';
				}
			}
			if (this.buildlist[i].layer == LayerInfo.COSTUME){
				this.costumeIsOnAvatar = true;
			}
		}
		//this.myRoomStart = false;
		this.dispatchEvent('change');
	}
	if (this.removeItemsDirty) { //items removed, run again - this prevents multiple calls
		this.removeItemsDirty = false;
		this.arrangeLayers();
	}

	this.dispatchEvent('arrange_done');
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeItemsFromItemList = function() {
	for(var i=0; i<this.items.length; i++){
		if(this.items[i].remove){
			if (this.items[i].pngimg.parentNode)
				this.div.removeChild(this.items[i].pngimg);
			this.items.splice(i, 1);
			i--;
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.drawCanvas = function(ctx, xpos, ypos) {
	// Loop through the buildlist image to look for the minimum left and minimum top
	var t1, l1, w1, h1, top, left;
	for(var i=0;i<this.buildlist.length;i++) {
		if(this.buildlist[i].pngimg) {
			t1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.top.replace('px','')));
			l1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.left.replace('px','')));

			top = (top == undefined) ? t1 : Math.min(top, t1);
			left = (left == undefined) ? l1 : Math.min(left, l1);
		}
	}

	for(var i=0;i<this.buildlist.length;i++) {
		if(this.buildlist[i].pngimg) {
			t1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.top.replace('px','')));
			l1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.left.replace('px','')));
			w1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].pngimg.style.width.replace('px','')));
			h1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].pngimg.style.height.replace('px','')));
			ctx.drawImage(this.buildlist[i].pngimg, xpos + l1-left, ypos + t1-top, w1, h1);
		}

		else if((this.defaultshirt.style.visibility == 'inherit' && this.buildlist[i] == this.defaultshirt) ||
				(this.defaultpants.style.visibility == 'inherit' && this.buildlist[i] == this.defaultpants)) {
			t1 = Math.floor(this.scale*parseFloat(this.buildlist[i].style.top.replace('px','')));
			l1 = Math.floor(this.scale*parseFloat(this.buildlist[i].style.left.replace('px','')));
			w1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].style.width.replace('px','')));
			h1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].style.height.replace('px','')));
			ctx.drawImage(this.buildlist[i], xpos + l1-left, ypos + t1-top, w1, h1);
		}
	}
	t1 = null;
	delete t1;
	l1 = null;
	delete l1;
	w1 = null;
	delete w1;
	h1 = null;
	delete h1;
	top = null;
	delete top;
	left = null;
	delete left;
}

//////////////////////////////////////////////////////////

Avatar.prototype.sortByLayer = function(a, b) {
	return (a.layer - b.layer);
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangupAllItems = function(){
	var item;
	for (var i=0; i<this.items.length; i++){
		item = this.items[i];
		this.hangupItem(item);
	}
	if(this.autoSave) {
		this.save();
	}
	item = null;
	delete item;
	this.dispatchEvent('hangupFinished');
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangup = function(layerid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].layer == layerid) {
			if(this.items[i].tryout) {
				this.items[i].remove = true;
			}
			if(this.items[i].onHanger == 0 && !this.items[i].tryout) this.items[i].onHanger = 1;
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangupThis = function(e) {
	if(this.initializing)
		this.removeItem(e.currentTarget);
	else
		this.hangupItem(e.currentTarget);

	if(this.autoSave && e.currentTarget.tryout) {
		this.save();
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangupItem = function(item) {
	if(!this.showacc && (item.layer == LayerInfo.SCENE)) return;
	if(LayerInfo.canRemove(item.layer)) {
		if(item.tryout)
			item.remove = true;
		item.onHanger = 1;
		// If is in the Avatar Builder, whenever user click on the avatar to remove cloth, also need to update the avatarpicker. RL 1/21/2014
		//if(currentHash == 'abc/avatarpicker'){
		if(this.inAvatarPicker){
			removeClothing(item);
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.getItemOnLayer = function(layerid, temponly) {
	if(temponly == undefined)
		temponly = false;
	var item;
	for(var i=0;i<this.items.length;i++) {
		item = this.items[i];
		if(item.layer == layerid && (!temponly || item.tryout)) {
			return item;
		}
	}
	item = null;
	delete item;
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeAllLayer = function() {
	var item;
	for (var i=0; i<this.items.length; i++){
		item = this.items[i];
		if(LayerInfo.canRemove(item.layer))
			this.removeItem(item);
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeItem = function(item) {
	item.remove = true;
	this.changeSinceLastSave = true;
	this.removeItemsDirty = true;
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeLayer = function(layerid, temponly) {
	if(temponly == undefined)
		temponly = false;
	var item;
	for(var i=0;i<this.items.length;i++) {
		item = this.items[i];
		if(item.layer == layerid && (!temponly || item.tryout)) {
			item.remove = true;
		}
		if(item.layer == 0)
			item.remove = true;
	}
	item = null;
	delete item;
	return;
}

//////////////////////////////////////////////////////////
Avatar.prototype.tryItem = function(newitem) {

	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].onHanger && this.items[i].sku == newitem.sku) {
			this.items[i].onHanger = false;
			this.arrangeLayers();
			this.unTryItem(this.items[i].layer);
			return true;
		}
	}

	newitem.tryout = true;
	this.addItem(newitem,false);
	return false;

}

//////////////////////////////////////////////////////////
Avatar.prototype.untrythis = function(e) {
	this.unTryItem(e.currentTarget.layer);
}

//////////////////////////////////////////////////////////
Avatar.prototype.boughtItem = function(sku) {
	var item;
	for(var i=0;i<this.items.length;i++) {
		item = this.items[i];
		if(item.sku == sku && item.tryout) {
			item.tryout = true;
			this.changes = this.changeSinceLastSave = true;
			for(var j=0;j<this.items.length;j++) {
				if(item.layer == this.items[j].layer && item != this.items[j]) {
					this.items[j].remove = true;
				}
			}
			if(this.autoSave) {
				this.save();
			}
			return item.info;
		}
	}
	item = null;
	delete item;
	return;
}

//////////////////////////////////////////////////////////
Avatar.prototype.unTryItem = function(layerid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout && this.items[i].layer == layerid) {
			this.items[i].remove = true;
		}
	}
	this.arrangeLayers();
}

//////////////////////////////////////////////////////////
Avatar.prototype.getCartList = function() {

	var list = new Array();

	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout && !this.items[i].remove &&this.items[i].info.canbuy) {
			list.push(this.items[i].info);
		}

	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getTryList = function() {

	var list = new Array();

	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout && !this.items[i].remove &&this.items[i].info.canbuy) {
			list.push(this.items[i].info);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getFullItemList = function() {

	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout) {
			list.push(this.items[i]);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getItemList = function() {

	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout) {
			list.push(this.items[i].info);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getRemoveList = function() {
	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && (this.items[i].remove && this.items[i].tryout)) {
			list.push(this.items[i].info);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getHungList = function() {

	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].onHanger && (!this.items[i].remove && !this.items[i].tryout) ) {
			list.push(this.items[i]);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeTempItems = function() {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i]) {
			if(this.items[i].tryout) {
				this.items[i].remove = true;
			} else {
				if(this.items[i].onHanger == 1)
					this.items[i].onHanger = 0;
			}
		}
	}

	this.arrangeLayers();
	if(this.autoSave) {
		this.save();
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.setItemOnly = function(item) {
//	if(!dontRemoveItemsOnClick)
//		item.addEventListener(SiteItem.CLICK, hangupThis);
	this.changes = this.changeSinceLastSave = true;
	this.addItem(item);
	return this.getItemList();
}

//////////////////////////////////////////////////////////
Avatar.prototype.setItem = function(item) {
//	if(!dontRemoveItemsOnClick)
//		item.addEventListener(SiteItem.CLICK, hangupThis);
	this.changes = this.changeSinceLastSave = true;

	// Check if there is any layer conflict, if yes, take off the old layer.
	// This also prevent duplicate layer of the same item
	switch(item.layer){
		case LayerInfo.SCENE:
			this.removeLayer(LayerInfo.SCENE);
			break;
		case LayerInfo.SKIN:
			this.removeLayer(LayerInfo.SKIN);
			break;
		case LayerInfo.EYES:
			this.removeLayer(LayerInfo.EYES);
			break;
		case LayerInfo.MOUTH:
			this.removeLayer(LayerInfo.MOUTH);
			break;
		case LayerInfo.NOSE:
			this.removeLayer(LayerInfo.NOSE);
			break;
		case LayerInfo.SWEATER:
			this.removeLayer(LayerInfo.JACKET);
			this.removeLayer(LayerInfo.SWEATER);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.JACKET:
			this.removeLayer(LayerInfo.JACKET);
			this.removeLayer(LayerInfo.SWEATER);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.PANTS:
			this.removeLayer(LayerInfo.PANTS);
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.SHIRT:
			this.removeLayer(LayerInfo.SHIRT);
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.DRESS:
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.SHIRT);
			this.removeLayer(LayerInfo.PANTS);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.GLASSES:
			this.removeLayer(LayerInfo.GLASSES);
			break;
		case LayerInfo.LEGGINGS:
			this.removeLayer(LayerInfo.LEGGINGS);
			break;
		case LayerInfo.SOCKS:
			this.removeLayer(LayerInfo.SOCKS);
			break;
		case LayerInfo.SHOES:
			this.removeLayer(LayerInfo.SHOES);
			break;
		case LayerInfo.COSTUME:
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.SHIRT);
			this.removeLayer(LayerInfo.PANTS);
			this.removeLayer(LayerInfo.JACKET);
			this.removeLayer(LayerInfo.SWEATER);
			this.removeLayer(LayerInfo.COSTUME);
			this.removeLayer(LayerInfo.GLASSES);
			this.removeLayer(LayerInfo.LEGGINGS);
			//this.removeLayer(LayerInfo.SOCKS);
			//this.removeLayer(LayerInfo.SHOES);
			break;
		case LayerInfo.PET:
			this.removeLayer(LayerInfo.PET);
			break;
		default:
			break;
	}

	//this.removeLayer(item.layer);
	this.addItem(item);
	return this.getItemList();
}

//////////////////////////////////////////////////////////
Avatar.prototype.setVariant = function(objid, varid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].objectId == objid) {
			this.items[i].variant = varid;
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.addItem = function(item, savenow) {

	//if(item == null || !item.ready || item.layer == 0 || isNaN(item.layer)) return false;
	if(savenow == undefined) savenow = true;
	if(item.isBlank) {
		//this.removeLayer(item.layer);
	} else if(!item.tryout) {
		this.removeLayer(item.layer);
		if(LayerInfo.blockCostume(item.layer)){
			if(!(item.layer == LayerInfo.HAIR && (this.usehair || this.fillhair))){
				this.removeLayer(LayerInfo.COSTUME);
			}
		}
		switch(item.layer){
			case LayerInfo.SWEATER:
				this.removeLayer(LayerInfo.JACKET);
				break;
			case LayerInfo.JACKET:
				this.removeLayer(LayerInfo.SWEATER);
				break;
			case LayerInfo.SHIRT:
				this.removeLayer(LayerInfo.DRESS);
				break;
			case LayerInfo.DRESS:
				this.removeLayer(LayerInfo.SHIRT);
				this.removeLayer(LayerInfo.PANTS);
				break;
			default:
				break;
		}
	} else {
		//this.removeLayer(item.layer, true);
		this.hangup(item.layer);
		if(LayerInfo.blockCostume(item.layer)){
			if(!(item.layer == LayerInfo.HAIR && (this.usehair || this.fillhair))){
				this.hangup(LayerInfo.COSTUME);
			}
		}
		switch(item.layer){
			case LayerInfo.SWEATER:
				this.removeLayer(LayerInfo.JACKET);
				break;
			case LayerInfo.JACKET:
				this.removeLayer(LayerInfo.SWEATER);
				break;
			case LayerInfo.SHIRT:
				this.removeLayer(LayerInfo.DRESS);
				break;
			case LayerInfo.DRESS:
				this.removeLayer(LayerInfo.SHIRT);
				this.removeLayer(LayerInfo.PANTS);
				break;
			case LayerInfo.COSTUME:
				this.removeLayer(LayerInfo.DRESS);
				this.removeLayer(LayerInfo.SHIRT);
				this.removeLayer(LayerInfo.PANTS);
				this.removeLayer(LayerInfo.JACKET);
				this.removeLayer(LayerInfo.SWEATER);
				this.removeLayer(LayerInfo.COSTUME);
				this.removeLayer(LayerInfo.GLASSES);
				this.removeLayer(LayerInfo.LEGGINGS);
				break;
			default:
				break;
		}
	}

	//added by TJ on 8/6/2012
	//if(nohtml5)
	//{
		//check if the item is loaded already, if not, load it
		var found = false;
		for(var i = 0; i < this.items.length; i++) {
			//RL 12/27/2013
			//Using "savenow" to check if the user is in the store or inside "MyAvatar".
			//If inside store it will not save and not allow take off cloth by click on the item, only allow take off by click on avatar.
			//If inside "MyAvatar" allow click on avatar or the inventory to remove cloths
			if ((this.items[i].sku == item.sku) && savenow) {
				this.items[i].remove = true;
				this.items[i].onHanger = 0;
				this.items[i].tryout = true;
				found = true;
			}
			/*
			//remove any same type hung item
			else if(this.items[i].type == item.type)
			{
				this.items[i].remove = true;
				this.items[i].onHanger = 0;
			}
			*/
		}

		if(found) {
			item.remove = false;
			item.onHanger = 0;
			//this.arrangeLayers();
		} else {
			itemobj = new AvatarItem(item);
			item.tryout = true;
			itemobj.tryout = item.tryout;
			itemobj.avobj = this;
			this.items.push(itemobj);

			//Added by MS 2013-04-12, needed for IE8 the "loaded" event was firing before we could add the listener
			if(itemobj.ready) {
				this.itemLoaded.call(itemobj);
			} else {
				addListener(itemobj, 'loaded', this.itemLoaded);
			}
		}
		found = null;
		delete found;
/*
		var info = new Object();
		if(item.info)
			info = item.info;
		else
			info = item;
*/
		//if(clickarea) clickarea.addImage(info);

	if(savenow && this.autoSave) {
		this.save();
	}

	return true;
}

Avatar.prototype.itemLoaded = function(event) {
	this.ready = true;
	this.avobj.arrangeLayers(this.layer);
}

//////////////////////////////////////////////////////////

Avatar.prototype.getSkinLine = function() { return this.skinline; }

Avatar.prototype.setSkinLine = function(c) {
	this.skinline = c;
	for(var i=0;i<this.items.length;i++){
		if(this.items[i].type == 'nose' || this.items[i].type == 'mouth')
			this.items[i].setOutline(this.skinline);
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.getSkinTone = function() { return this.skintone; }

Avatar.prototype.setSkinTone = function(c) {
	this.skintone = c;
	for(var i=0;i<this.items.length;i++)
		if(this.items[i])
			this.items[i].setSkintone(this.skintone);
}

//////////////////////////////////////////////////////////
Avatar.prototype.setPremades = function(premadelist){

	this.avatarBusy = true;
	if(premadelist == undefined)
		return;
	for(var j=0;j<this.items.length;j++){
		this.items[j].remove = true;
	}
	this.removeItemsFromItemList();
	this.items = [];
	if(premadelist && premadelist.length > 0) {
		this.partstoload = premadelist.length;
		var item;
		for(var i=0; i<premadelist.length; i++) {
			item = new AvatarItem(premadelist[i]);
			item.avobj = this;
			item.tryout = true;
			this.items.push(item);

			//Added by MS 2013-04-12, needed for IE8 the "loaded" event was firing before we could add the listener
			if(item.ready) {
				this.partLoaded.call(item);
			} else {
				addListener(item, 'loaded', this.partLoaded);
			}
		}
		this.arrangeLayers();
	}
	if(this.items.length == 0){
		this.defaultpants.style.visibility = 'inherit';
		this.defaultshirt.style.visibility = 'inherit';
		this.defaultskintone.style.visibility = 'inherit';
	}

}

// [Caigoy,101315,SF-8888] hide or show pet image
Avatar.prototype.setPetDisplay = function (bool) {
	var petImg = [].filter.call(document.querySelectorAll('#tm_avatar img'), function (a) {
			return /\/pets\//gi.test(a.src);
		})[0],
		bool = !!bool;
	if (!!petImg) petImg.style.display = bool ? 'inherit' : 'none';
	return bool;
};

//////////////////////////////////////////////////////////

enableEventHandling(Avatar);
