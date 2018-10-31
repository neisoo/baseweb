/*
	Last Edit: Corey Rosamond
	Added new version of append text that allows you to appendText without worrying about clearing the previous text area. 
	
	objType = same as createElement()
	objAttr(optional) = Object that holds all of the setAttribute types
	objStyle(optional) = string of inline styles
	appendObj(optional) = string or element that references parent node

	Use: var div = mObj.create('DIV',{'id':'test_div','src':IMGHOST+'/html5/btn.png'},'width:200px;position:absolute;','parent_div');

*/
function mObj(){
	this.obj = '';
}

mObj.prototype.create = function( objType, objAttr, objStyle, appendObj ){
	this.obj = document.createElement( objType );
	
	if(objAttr !== void 0){
		this.setAttr( objAttr );
	}

	if(objStyle  !== void 0){
		if( objStyle.length != 0 ){
			this.obj.setAttribute('style',objStyle);
		}
	}

	if(appendObj  !== void 0){
		if(typeof appendObj == 'string'){
			appendObj = document.getElementById(appendObj);
		} 
		appendObj.appendChild( this.obj );
	} 
	return this.obj;
}

mObj.prototype.setAttr = function( objAttr ){
	for(var index in objAttr) {
		var attrType = 'attr';
		if( index == 'height' || index == 'width' ){ attrType = 'style'; } 
		switch( index ){
			case 'STYLE': this.style[index] = objAttr[index]; break;
			default: this.obj.setAttribute(index, objAttr[index]); break;
		}
	}
}

mObj.prototype.append = function( objects, parent ){
	for(var i = 0; i < objects.length; i++) {
		parent.appendChild(objects[i]); // Note that this does NOT go to the DOM
	}
}

mObj.prototype.removeAllChildren = function( object ){
	if(object.hasChildNodes()){
		while (object.firstChild) { 
			object.removeChild(object.firstChild); 
		}
	}
}

mObj.prototype.appendText = function(text,parent){
	var update = false;
	if( parent.childNodes.length > 0 ){
		for (var i=0; i < parent.childNodes.length; i++) {
			if (parent.childNodes[i].nodeName === "#text") {
				var update = true;
				var updateObj = parent.childNodes[i];
			}
		}
	}
	if(update){ 
		updateObj.nodeValue = text.toString();
	} else { 
		var textNode = document.createTextNode(text.toString());
		parent.appendChild( textNode ); 
	}
}

var mObj = new mObj();