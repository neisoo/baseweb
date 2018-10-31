function BPTextHighlight(textJSONInfo, page)
{
	this.textJSONInfo 	   = textJSONInfo;
	this.textImage         = null;
	this.isTextLoaded 	   = false;
	this.isTextImageLoaded = false;
	this.highlightJSONInfo = this.textJSONInfo["highlight"];
	this.sentences   	   = new Array();
	this.audioPosition	   = 0;
	this.lastAudioPosition = null;
	this.pageParent        = page;
	this.createHighlightContainer();
	this.loadSentences();
}

BPTextHighlight.prototype.createHighlightContainer = function()
{
	this.divBoxesContainer = document.createElement("DIV");
	var classAttibute 	   = document.createAttribute("class");
  classAttibute.value 	   = BookConstants.PAGE_CHILDREN_NAMES.highlight;
	this.divBoxesContainer.setAttributeNode(classAttibute);
	this.divBoxesContainer.style.position = 'absolute';
	this.divBoxesContainer.style.width    = BookConstants.PAGE_CANVAS_SIZE.w +'px';
	this.divBoxesContainer.style.height   = BookConstants.PAGE_CANVAS_SIZE.h + 'px';
	this.divBoxesContainer.style.zIndex   = 2;
};

BPTextHighlight.prototype.loadSentences = function()
{
  if(this.highlightJSONInfo.length > 0) {
		var lastBox = null;
		var nextSentence = null; //QAV-2768
		var nextSentenceFirstBox = null;
		for(var i = 0; i < this.highlightJSONInfo.length; i++)
		{
      var textSentence = this.highlightJSONInfo[i];

      //QAV-2768
      nextSentence = this.highlightJSONInfo[i+1];
      if(nextSentence){
        nextSentenceFirstBox = nextSentence.boxes[0];
      } else {
        nextSentenceFirstBox = null;
      }

      var sentence = new BPTextSentence(textSentence, lastBox, nextSentenceFirstBox);
      lastBox      = sentence.lastBox;
      this.sentences.push(sentence);
    }
	}
};

BPTextHighlight.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback = onLoadingCompleteCallback;
	var textImageURL 		  	   = this.textJSONInfo["image_text_path"];

	if(textImageURL != "")
	{
		this.textImage         	= new Image();
		var context            	= this;
		this.textImage.onload  	= function() { context.onImageLoaded(); };
		this.textImage.src 		= BookUtils.instance.getBookAssetPath(textImageURL);
	}
	else
	{
		this.isTextLoaded = true;
		onLoadingCompleteCallback(this);
	}
};

BPTextHighlight.prototype.renderToCanvas = function(divContainer, clearCanvas)
{
  var child = divContainer.getElementsByClassName(BookConstants.PAGE_CHILDREN_NAMES.highlight)[0];
  var textChild = divContainer.getElementsByClassName(BookConstants.PAGE_CHILDREN_NAMES.text)[0];

  if (child){
    divContainer.removeChild(child);
  }

	divContainer.appendChild(this.divBoxesContainer);
	if(this.isTextImageLoaded)
	{
		this.drawHighlight(divContainer, this.audioPosition, this.getHighlightColor());
		var pageImagePosition = this.pageParent.isRightPageCanvas ? BookConstants.PAGE_IMAGE_RIGHT_POSITION : BookConstants.PAGE_IMAGE_LEFT_POSITION;

		this.textImage.style.left   = pageImagePosition.x + 'px';
		this.textImage.style.top    = pageImagePosition.y + 'px';
		divContainer.appendChild(this.textImage);
	}
  if (textChild) {
    divContainer.removeChild(textChild);
	}

};

BPTextHighlight.prototype.updateHighLight = function(divContainer)
{
	if(this.lastAudioPosition == this.audioPosition){ // i the audio position is the same, we don't do anything.
		return;
	}
	this.lastAudioPosition = this.audioPosition;

	if(!this.pageParent.parentBook.isPlaying && !this.pageParent.parentBook.isDraggingSlider)
	{
		return;
	}

	if(this.isTextImageLoaded)
	{
		var container = document.getElementById(BookConstants.PAGE_CHILDREN_NAMES.highlight);

		if(container == null)
			divContainer.appendChild(this.divBoxesContainer);

		var modifier = 0; //var to solve issues of highlight-audio sync

		if(book.audioProgress.isUsingSlowAudio)
			modifier = 0.18;
		else
			//modifier = 0.083;
			modifier = 0.16;

		this.drawHighlight(divContainer, this.audioPosition+modifier, this.getHighlightColor());
	}
};

BPTextHighlight.prototype.onImageLoaded = function()
{
	this.initializeTextImage();

	this.isTextLoaded 	   = true;
	this.isTextImageLoaded = true;
	this.onLoadingCompleteCallback(this);
};

BPTextHighlight.prototype.initializeTextImage = function()
{
	this.textImage.draggable = false;
	this.textImage.unselectable = "on";

	this.textImage.style.position = 'absolute';
	this.textImage.width          = BookConstants.PAGE_IMAGE_SIZE.w;
	this.textImage.height   	  = BookConstants.PAGE_IMAGE_SIZE.h;
	this.textImage.style.zIndex   = 3;
	this.textImage.ondragstart = function() { return false; }; //QAV-3482 prevent user from draggin text image instead of page.
	var classAttibute 	   = document.createAttribute("class");
  classAttibute.value 	   = BookConstants.PAGE_CHILDREN_NAMES.text;
	this.textImage.setAttributeNode(classAttibute);

};

BPTextHighlight.prototype.getHighlightColor = function()
{
	var colorHex   = BookSetting.getInstance().getHighlightColor();
	var brightness = 1;
	return BookUtils.instance.convertHexToRGBA(colorHex, brightness);
};

BPTextHighlight.prototype.drawHighlight = function(divContainer, audioPosition, highlightColor)
{
	var pagePosition   		= this.pageParent.isRightPageCanvas ? BookConstants.PAGE_IMAGE_RIGHT_POSITION : BookConstants.PAGE_IMAGE_LEFT_POSITION;
	for(var i = 0; i < this.sentences.length; i++){
		this.sentences[i].renderToCanvas(divContainer, audioPosition, pagePosition, this.divBoxesContainer, highlightColor);
	}
};
