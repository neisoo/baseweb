/*****************************************************************************************/
/*****************************************************************************************/
/********************************	   Canvas Wrapper	   *******************************/
/*****************************************************************************************/
/*****************************************************************************************/

var canvas_stream;
function CanvasA	(id)	{
		if(typeof id == 'string')
			this.canvas							=	document.getElementById(id);
		else	
			this.canvas							=	id;
		this.stream								= this.canvas.getContext('2d');
		this.fps								= this.optimalFPS();
		
		this.gradient;
	
}
//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Drawing States		  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//just saves the properties
CanvasA.prototype.save							=	function(){
	if(this.stream) {
		this.stream.save();
	} else {
		console.log("no stream for saving canvas");
	}
}

//restores saves the properties
CanvasA.prototype.restore						=	function(){
	if(this.stream) {
		this.stream.restore();
	} else {
		console.log("no stream for saving canvas");
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Patterns			  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//first argument has to be a img, video, or canvas element
//repeat argument can be no-repeat, repeat, repeat-x, repeat-y
CanvasA.prototype.createPattern						=	function(elem, repeat){
	if(this.stream) {
		return this.stream.createPattern(elem, repeat);
		
	} else {
		console.log("no stream for saving canvas");
	}
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Drawing Paths		  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasA.prototype.moveTo						=	function(moveTo, callback){
	if(this.stream) { 
		if(moveTo && typeof moveTo == 'object') {
			this.stream.moveTo(moveTo.x, moveTo.y);
		}
	
	} else {
		console.log("no stream for move to");
	}
	

}


CanvasA.prototype.beginPath						=	function(moveTo, callback){
	if(this.stream) {
		
		if(moveTo && typeof moveTo == 'object') {
			this.moveTo(moveTo);
		}
		
		this.stream.beginPath();
		
		if(callback && typeof callback == 'function') {
			callback();
		}
		
	} else {
		console.log("no stream for begining path");
	}
}
CanvasA.prototype.closePath						=	function(callback){
	if(this.stream) {
		
		
		this.stream.closePath();
		
		
		if(callback && typeof callback == 'function') {
			callback();
		}
		
	} else {
		console.log("no stream for closing path");
	}
}


//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Text			  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
CanvasA.prototype.font							=	function(callback){
	if(this.stream) {} else {	console.log("no stream for font");	}
}
CanvasA.prototype.textAlign						=	function(callback){
	if(this.stream) {	} else {	console.log("no stream for text align"); }
}
CanvasA.prototype.textBaseline					=	function(callback){
	if(this.stream) {	} else {	console.log("no stream for text baseline");	}
}
CanvasA.prototype.fillText						=	function(callback){
	if(this.stream) {	} else {	console.log("no stream for filltext");	}
}
CanvasA.prototype.strokeText					=	function(callback){
	if(this.stream) {	} else {	console.log("no stream for strokeText");	}
}
CanvasA.prototype.measureText					=	function(callback){
	if(this.stream) {	} else {	console.log("no stream for measureText");	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Gradiants			  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasA.prototype.addColorStop			=	function(position, color, callback){
	if(this.stream) {

		this.gradient.addColorStop(position, color);
		
		if(callback && typeof callback == 'function') {
			callback();
		}
	} else {	
		console.log("no stream for add color stop");
	}

}

CanvasA.prototype.createRadialGradient			=	function(x0, y0, r0, x1, y1, r1, callback){
	if(this.stream) {	
		
		this.gradient								=	this.stream.createRadialGradient(x0, y0, r0, x1, y1, r1);
		
		if(callback && typeof callback == 'function') {
				callback();
		}
	} else {	
		
		console.log("no stream for create radial gradient");	
		
	}

}
//starts linear gradient
CanvasA.prototype.createLinearGradient				=	function(x0, y0, x1, y1, callback){
	if(this.stream) {	
		
		this.gradient								=	this.stream.createLinearGradient(x0, y0, x1, y1);
		

	if(callback && typeof callback == 'function') {
			callback();
	}

} else {	console.log("no stream for create linear gradient");	}

}
CanvasA.prototype.addGradient						=	function(){
	if(this.stream) {
		
		this.stream.fillStyle						=	this.gradient;
	
	} else {
		console.log("no stream for create add gradient");
	}
}




//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Shadow				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasA.prototype.addShadows					=	function(styleObj, callback){
	if(this.stream) {	
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.shadowColor)
				this.stream.shadowColor			=	styleObj.shadowColor;
			if(styleObj.shadowOffsetX)
				this.stream.shadowOffsetX		=	styleObj.shadowOffsetX;
			if(styleObj.shadowOffsetY)
				this.stream.shadowOffsetY		=	styleObj.shadowOffsetY;
			if(styleObj.shadowBlur)
				this.stream.shadowBlur			=	styleObj.shadowBlur;
		}
		if(callback && typeof callback == 'function') {
			callback();
		}
	} else {	console.log("no stream for shadow color");	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Lines				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/* 
	object parameters -- 
		color: color for the link
		lineWidth: width of the line
		lineCap : 
			{
				lineCap : 'butt',
				lineCap : 'round',
				lineCap : 'square'
			}
		//line join has to be added on the second line
		lineJoin 
			{
				lineJoin : 'miter',
				lineJoin : 'round',
				lineJoib : 'bevel'
			}
 */


CanvasA.prototype.addLine						=	function(lineTo, styleObj, callback){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.color)
				this.stream.strokeStyle				=	styleObj.color;
			if(styleObj.lineWidth)
				this.stream.lineWidth				=	styleObj.lineWidth;
			if(styleObj.lineCap)
				this.stream.lineCap					=	styleObj.lineCap;
			if(styleObj.lineJoin)
				this.stream.lineJoin				=	styleObj.lineJoin;
		}
		
		if(callback && typeof callback == 'function') {
			callback();
		}
		
		
		this.stream.lineTo(lineTo.x, lineTo.y);
		
	}else {
		console.log("no stream for adding line");
	}
}

CanvasA.prototype.stroke						=	function(){
	if(this.stream) {
		this.stream.stroke();
	}	else {
		console.log("no stream for adding stroke");
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Squares				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasA.prototype.fillRect						=	function(color, coordinates, callback){
	if(this.stream) {
		if(color) 
			this.stream.fillStyle			=	color;
		if(!coordinates) {
			this.stream.fillRect(0, 0, this.canvas.width, this.canvas.height);
		} else
			this.stream.fillRect(coordinates.x0, coordinates.y0, coordinates.x1, coordinates.y1);
			
		if(callback && typeof callback == 'function')	
			callback();
			
			
	} else {
		console.log("no stream for fill rect");
	}

}

CanvasA.prototype.clearRect						=	function(coordinates, callback){
	if(this.stream) {
		
		if(!coordinates) {
			this.stream.clearRect(0, 0, this.canvas.width, this.canvas.height);
		} else
			this.stream.clearRect(coordinates.x0, coordinates.y0, coordinates.x1, coordinates.y1);
		
		if(callback && typeof callback == 'function')	
			callback();
	
	} else {
		console.log("no stream for clearing rectange");
	}
}


CanvasA.prototype.strokeRect					=	function(styleObj, coordinates, callback){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.color)
				this.stream.strokeStyle				=	styleObj.color;
			if(styleObj.lineWidth)
				this.stream.lineWidth				=	styleObj.lineWidth;
		}
		if(!coordinates) {
			this.stream.strokeRect(0, 0, this.canvas.width, this.canvas.height);
		} else
			this.stream.strokeRect(coordinates.x0, coordinates.y0, coordinates.x1, coordinates.y1);
			
		if(callback && typeof callback == 'function')	
			callback();	
		
	} else {
		console.log("no stream for stroking rectangel");
	}
}

CanvasA.prototype.fill						=	function(styleObj, callback){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.fillStyle)
				this.stream.fillStyle		=	styleObj.fillStyle;
		}
		
		this.stream.fill();
		
		if(callback && typeof callback == 'function')	
			callback();
		
	}	else {
		console.log("no stream for adding stroke");
	}
}


//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Arcs 				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//x position y position r radius sA starting angle eA ending Angle aC anti-clockwise
//angles are in radians not degrees 

CanvasA.prototype.arc							=	function(styleObj, x, y, r, sA, eA, aC, callback ){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
				if(styleObj.color)
					this.stream.strokeStyle				=	styleObj.color;
				if(styleObj.fillStyle)
					this.stream.fillStyle				=	styleObj.fillStyle;
				if(styleObj.lineWidth)
					this.stream.lineWidth				=	styleObj.lineWidth;
		}
		
		this.stream.arc(x, y, r, sA, eA, aC);
		
		if(callback && typeof callback == 'function')	
			callback();
		
	}	else {
		console.log("no stream for adding arc");
	}
}
CanvasA.prototype.arcTo							=	function(x1, y1, x2, y2, r){





}
CanvasA.prototype.convertToRadians				=	function (degrees) {
	return (Math.PI / 180) * degrees;
}
CanvasA.prototype.convertToDegrees				=	function (radians) {
	return (Math.PI / 180) / radians;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Curves 				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
CanvasA.prototype.bezierCurveTo					=	function(styleObj, cx1, cy1, cx2, cy2, end1, end2, callback){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
				if(styleObj.color)
					this.stream.strokeStyle				=	styleObj.color;
				if(styleObj.lineWidth)
					this.stream.lineWidth				=	styleObj.lineWidth;
		}
		
		this.stream.bezierCurveTo(cx1, cy1, cx2, cy2, end1, end2);
		
		if(callback && typeof callback == 'function')	
			callback();	
	
	} else {
		console.log("no stream for adding bezier");
	}
}

CanvasA.prototype.quadracticCurve				=	function(styleObj, cx, cy, x, y, callback){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.color)
				this.stream.strokeStyle				=	styleObj.color;
			if(styleObj.lineWidth)
				this.stream.lineWidth				=	styleObj.lineWidth;
		}
			
		this.stream.quadraticCurveTo(cx, cy, x, y);
		
		if(callback && typeof callback == 'function')	
				callback();	
		
	} else {
		console.log("no stream for adding quadradic curve");
	}
}



//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Tools 				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasA.prototype.addStyle						= function(styleObj, callback)	{
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.color)
				this.stream.strokeStyle				=	styleObj.color;
			if(styleObj.lineWidth)
				this.stream.lineWidth				=	styleObj.lineWidth;
			if(styleObj.fillStyle)
				this.stream.fillStyle				=	styleObj.fillStyle;	
		}
		
		if(callback && typeof callback == 'function')	
				callback();	
		
	} else {
		console.log("no stream for adding style");
	}
}		
CanvasA.prototype.setGlobalAlpha				=	function(alpha){
	if(this.stream) {
		if(!isNaN(alpha)) {
			this.stream.globalAlpha   			= alpha;
		}
	} else {
		console.log("no stream for set global alpha");
	}
}
		
//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Utils				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
CanvasA.prototype.optimalFPS					= function(callback){
	
	return window.requestAnimationFrame || 
		   window.webkitRequestAnimationFrame || 
		   window.mozRequestAnimationFrame || 
		   window.oRequestAnimationFrame || 
		   window.msRequestAnimationFrame ||
		   function(callback) {
				  window.setTimeout(callback, 1000 / 60);
			};

}
//////////////////////////////////////////////////////////////////////////////////////////////////////

	
	
