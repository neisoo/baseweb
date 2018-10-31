function BPSlider(element)
{
    this.element            = element;
    this.progressCircle     = document.getElementById('progressCircle');
    this.min                = 0;
    this.max                = element.offsetWidth - this.progressCircle.offsetWidth - 8;
    this.slider             = new Slider(this.progressCircle, this.min, this.max);
    this.progress           = 0;
    this.isDragging         = false;
    this.onStartDrag        = null;
    this.onEndDrag          = null;
    this.onProgressChanged  = null;

    this.initialize();
}

BPSlider.prototype.initialize = function()
{
    var context = this;
    addListener(this.slider,'slideStart',function(event){context.sliderStart(event); });
    addListener(this.slider,'slideEnd',function(event){context.sliderEnd(event); });
    addListener(this.slider,'slideMove',function(event){context.sliderMove(event); });
};

BPSlider.prototype.updateProgress = function(pos, _force)
{
    if(!getAudioState() && !_force)
        return;

    var diff = Math.abs(pos - this.progress);

    if(diff<0.003) //BE-368 Workaround to solve progress circle shaking
        return;

    this.progress = pos;
    this.slider.setPosition(pos);
    sliderForeground.style.width = pos*100 + "%";

    sliderForeground.style.left = Math.round(sliderForeground.style.left.replace("px", "")) + "px";

    this.updateForeground(pos);
};

BPSlider.prototype.updateForeground = function(pos)
{
    if(pos != null)
    {
        sliderForeground.style.width = pos*100 + "%";
    }else
    {
        var progress  = book.audioProgress.getAudioPosition() / book.audioProgress.soundPlayer.getDuration();
        sliderForeground.style.width = progress*100 + "%";
    }
};

BPSlider.prototype.sliderStart = function(event)
{
    this.isDragging = true;
    this.progress = this.slider.position;
    book.audioProgress.playbackCompleted = false; //BE-448 this prevents the book from restarting if the user finishes the book and scrolls to another point.

    if(this.onStartDrag != null)
        this.onStartDrag(this);
};

BPSlider.prototype.sliderMove = function(event)
{
    if(this.onProgressChanged != null)
    {
        this.progress = this.slider.position;
        this.onProgressChanged(this);
        this.updateForeground(this.slider.position);
    }
};

BPSlider.prototype.forceSliderProgress = function (_value) {
    var diff = Math.abs(_value - this.progress);
    this.progress = _value;
    this.slider.setPosition(_value);
}

BPSlider.prototype.sliderEnd = function(event)
{
    this.isDragging = false;

    if(this.onEndDrag != null)
        this.onEndDrag(this.slider);
};
