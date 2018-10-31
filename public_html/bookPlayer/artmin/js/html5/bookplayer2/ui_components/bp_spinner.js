function BPSpinner(element)
{
    this.spinnerElement            = element;
    this.spinCount                 = 0;
    this.spinnerInterval           = null;
    this.currentRotation           = 0;
    this.rotationIncrementPerFrame = -4;
    this.updateSpinFrameInterval   = 5;

}

BPSpinner.prototype.start = function()
{
    var context          = this;
    this.spinnerElement.style.visibility = 'visible';
    this.spinnerElement.style.display    = 'block';
    this.spinnerInterval = setInterval(function() { context.updateInterval(); }, 1000 / BookConstants.SPINNER_FPS);
};

BPSpinner.prototype.stop = function()
{
    clearInterval(this.spinnerInterval);

    this.spinnerInterval                 = null;
    this.spinnerElement.style.visibility = 'hidden';
    this.spinnerElement.style.display = 'none';
};

BPSpinner.prototype.updateInterval = function()
{
    this.spinCount++;
    this.currentRotation += this.rotationIncrementPerFrame;
};
