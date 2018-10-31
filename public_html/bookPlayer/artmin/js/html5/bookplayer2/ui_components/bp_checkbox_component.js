function BPCheckBoxComponent(parentDiv, callback)
{
	this.parentDiv		    = parentDiv;
	this.elementChecked 	= parentDiv.getElementsByClassName('checked')[0];
	this.elementUnChecked 	=  parentDiv.getElementsByClassName('unchecked')[0];
	this.onStateChangeEvent = null;
	this.isChecked 			= false;
	this.elapseTime = 0;
	this.difference = 0.5;

	if(callback != null){
		this.callback = callback;
	}
	
	this.initialize();
}

BPCheckBoxComponent.prototype.initialize = function() 
{
	this.setIsChecked(false);

};

BPCheckBoxComponent.prototype.onElementClick = function(event)
{
	closeSettingsBox();
	event.stopPropagation();
	event.preventDefault();
	
	var time = Date.now();
	if ((time - this.elapseTime)/1000 > this.difference)
	{
		this.elapseTime = Date.now();
		this.setIsChecked(!this.isChecked);
		
		if (this.onStateChangeEvent != null)
			this.onStateChangeEvent(this);
	}
};

BPCheckBoxComponent.prototype.setIsChecked = function(isChecked) 
{
	if(isChecked)
	{
		this.elementChecked.style.visibility   = 'visible';
		this.elementUnChecked.style.visibility = 'hidden';
	}
	else
	{
		this.elementChecked.style.visibility   = 'hidden';
		this.elementUnChecked.style.visibility = 'visible';	
	}

	this.isChecked = isChecked;
	if(this.callback != null){
		this.callback(isChecked);
	}
};
