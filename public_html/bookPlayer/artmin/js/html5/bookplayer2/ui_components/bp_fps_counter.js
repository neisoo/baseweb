function BPFPSCounter(element)
{
    this.element = element;

    this.animationFrames   	     = 0;
    this.lastAnimationFrameTime  = Date.now();
    this.animationFPS			 = 0;

	this.intervalFrames   		 = 0;
	this.lastIntervalFrameTime 	 = Date.now();
	this.intervalFPS			 = 0;

    var context   				 = this;
    this.onAnimationFrameMethod  = function(timestamp) { context.onAnimationFrame(); };

    window.requestAnimationFrame(this.onAnimationFrameMethod);

	this.interval = setInterval( function() { context.onInterval(); }, 1000/60);
}

BPFPSCounter.prototype.onAnimationFrame = function()
{
	var now = Date.now();

	this.animationFrames++;

	if(now - this.lastAnimationFrameTime >= 1000)//One second
	{
		this.lastAnimationFrameTime = now;
		this.animationFPS 			= this.animationFrames;
		this.animationFrames   		= 0;

		this.updateText();
	}

    window.requestAnimationFrame(this.onAnimationFrameMethod);
};

BPFPSCounter.prototype.onInterval = function()
{
	var now = Date.now();

	this.intervalFrames++;

	if(now - this.lastIntervalFrameTime >= 1000)//One second
	{
		this.lastIntervalFrameTime  = now;
		this.intervalFPS			= this.intervalFrames;
		this.intervalFrames   		= 0;

		this.updateText();
	}
};

BPFPSCounter.prototype.updateText = function()
{
	this.element.innerHTML = "Animation FPS:" + this.animationFPS + " Interval FPS:" + this.intervalFPS;
};
