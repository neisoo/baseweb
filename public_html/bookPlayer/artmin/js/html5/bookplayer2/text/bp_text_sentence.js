function BPTextSentence(textLineInfo, previousSentenceLastBox, nextSentenceFirstBox) //QAV-2768 added nextSentenceFirstBox
{
    this.textLineInfo            = textLineInfo;
    this.sndpos                  = this.textLineInfo['sound_position'];
    this.sndlen                  = this.textLineInfo['sound_length'];
    this.previousSentenceLastBox = previousSentenceLastBox;
    this.nextSentenceFirstBox    = nextSentenceFirstBox;
    this.lastBox                 = null;
    this.lastAudioPosition       = null;
    this.lastProgess             = null;
    this.loadBoxes();
}

BPTextSentence.prototype.updateBoxesSize = function () {
    var lastBox_ = null;
    for(var i = 0; i < this.textLineInfo.boxes.length; i++)//Calculating boxes
    {
        var currentBoxInfo = this.textLineInfo.boxes[i];
        var nextBox = this.textLineInfo.boxes[i+1];

        var xModifier = 0;
        var widthModifier = 0;

        //magic numbers added to fix BE-552
        currentBoxInfo.x = currentBoxInfo.x - 2;
        currentBoxInfo.y = currentBoxInfo.y -1;
        currentBoxInfo.width = currentBoxInfo.width + 4;
        currentBoxInfo.height = currentBoxInfo.height + 5;


        this.textLineInfo.boxes[i] = currentBoxInfo; //update the content on textLineInfo.
        lastBox_ = currentBoxInfo;
    }
};

BPTextSentence.prototype.loadBoxes = function()
{
    //we need to update the boxes position before joining them.
    this.updateBoxesSize();

    this.boxes         = new Array();
    var lastSentenceX  = this.getLastSentenceX();
    var highlightStyle = BookSetting.getInstance().getHighlightStyle();
    var box            = null;
    var divBox = null;

    var lastBoxIsTooFar = true;

    for(var i = 0; i < this.textLineInfo.boxes.length; i++)//Calculating boxes
    {
        var currentBoxInfo = this.textLineInfo.boxes[i];
        lastBoxIsTooFar = false;

        if(box)
        {
            if( Math.abs( (box.x + box.width) - currentBoxInfo.x) > 80)
            {
                if(box.y == currentBoxInfo.y)
                {
                        lastBoxIsTooFar = true;
                }
            }
        }

        if(highlightStyle == BookConstants.TEXT_HIGHLIGHT_STYLE_CONTINUOUS && box != null && currentBoxInfo.y == box.y && !lastBoxIsTooFar)
        {

            //Merging boxes that are in the same 'y' to handle them as a single box for 'continuous' highlight style
            box.width = ( currentBoxInfo.x- box.x ) + currentBoxInfo.width +  Math.abs((box.x+box.width) - (currentBoxInfo.x));
        }
        else
        {
            /* create a div element to display the highlight  */
            divBox = document.createElement("DIV");
            divBox.style.position = 'absolute';
            BookUtils.instance.applytransformOrigin(divBox, "left");

            box        = new Object();
            box.x      = currentBoxInfo.x;
            box.y      = currentBoxInfo.y;
            box.width  = currentBoxInfo.width;
            box.height = currentBoxInfo.height;
            box.div    = divBox;

            //Thanks whoever made this. Solved my problem ;) //sorry, removing this for now. ;x //no problem bro
            if(i >= this.textLineInfo.boxes.length-2){
                box.width += 2; //more pixels on the final box?  //you were using 7.
            }

            if(i == 0 && lastSentenceX != 0)//Start the first box from the last position of the previous sentence for 'continuous' highlight style
            {
                box.x           = lastSentenceX;
                var xDifference = currentBoxInfo.x - lastSentenceX;
                box.width       = currentBoxInfo.width + xDifference;
            }

            if(this.previousSentenceLastBox){
                if(this.previousSentenceLastBox.y == currentBoxInfo.y){
                    box.x -= 4;
                    box.width += 4; //maybe... only one pixel more
                }
            }

            this.boxes.push(box);
        }
    }

    this.lastBox      = box;
    var sentenceWidth = 0;

    for(var i = 0; i < this.boxes.length; i++)//Calculating sentence with
        sentenceWidth += this.boxes[i].width;

    var currentSentenceXPosition = 0;

    for(var i = 0; i < this.boxes.length; i++)//Calculating sound position and length
    {
        var currentContinuousBox        = this.boxes[i];
        currentContinuousBox.sndpos     = this.sndpos + this.getCurrentSndLength(currentSentenceXPosition, sentenceWidth);
        currentSentenceXPosition        += currentContinuousBox.width;
        currentContinuousBox.lastSndPos = this.sndpos + this.getCurrentSndLength(currentSentenceXPosition, sentenceWidth);
    }
};

BPTextSentence.prototype.getCurrentSndLength = function(progressOfSentence, sentenceWidth)
{
    return this.sndlen * (progressOfSentence / sentenceWidth);
};

BPTextSentence.prototype.getLastSentenceX = function()
{
    if(BookSetting.getInstance().getHighlightStyle() == BookConstants.TEXT_HIGHLIGHT_STYLE_CONTINUOUS && this.previousSentenceLastBox != null)//The first box of the sentence must start from the last box of the previous sentence
    {
        var firstBox    = this.textLineInfo.boxes[0];
        var lastBoxMaxX = this.previousSentenceLastBox.x + this.previousSentenceLastBox.width;

        if (firstBox) {
            if (this.previousSentenceLastBox.y == firstBox.y && firstBox.x >= lastBoxMaxX) {
                return lastBoxMaxX;
            }
        }
    }

    return 0;
};

BPTextSentence.prototype.renderToCanvas = function(divContainer, audioPosition, position, container, hightlightColor)
{
    if(hightlightColor != 'rgba(0,0,0,1)' && !isPageDragging){
        container.style.opacity = BookSetting.getInstance().getHighlightBrightness();
    } else {
        container.style.opacity = 0;
    }
    for(var j = 0; j < this.boxes.length; j++)
    {
        var currentBox = this.boxes[j];

        if(currentBox.sndpos < audioPosition)
        {
            var progress;
            progress = audioPosition < currentBox.lastSndPos ? BookUtils.instance.inverseLinearBezier(audioPosition, currentBox.sndpos, currentBox.lastSndPos) : 1;

            currentBox.div.style.left   = currentBox.x + position.x + 'px';
            currentBox.div.style.top    = currentBox.y + position.y + 'px';
            currentBox.div.style.width  = (currentBox.width) + 'px';
            currentBox.div.style.height = currentBox.height + 'px';
            currentBox.div.style.backgroundColor = hightlightColor;


            //QAV-2768: if the next box is in a different line, we extend the last word.
            var widthModifier = 0;
            var nextBox = this.boxes[j+1];
            if(!nextBox){
                if(this.nextSentenceFirstBox != null){
                    nextBox = this.nextSentenceFirstBox;
                } else {
                    nextBox = {"y":"null", "x":"null"};
                }
            }

            if(currentBox.y != nextBox.y){
                widthModifier = 0;
                if(currentBox.width < 50){ //QAV-2768 if the box is too small, just 0.03 isn't enough
                    widthModifier += 0.3;
                }
            }

            currentBox.div.style.width  = (currentBox.width+widthModifier) + 'px';
            BookUtils.instance.applyScaleToElement(currentBox.div, progress, 1);

            container.appendChild(currentBox.div);
        }
        else
        {
            /* when try to remove some element, but the container does not have that element, this action will fail,
            * for that reason I append the element inside the container and then I remove it from the container, because
            * is faster append and remove instead find the child element in the container
            */
            container.appendChild(currentBox.div);
            container.removeChild(currentBox.div);
        }
    }
};
