function BPImageLayer(imageJSONInfo)
{
    this.imageJSONInfo  = imageJSONInfo;
    this.image          = null;
    this.imageURL       = BookUtils.instance.getBookAssetPath(this.imageJSONInfo["imgurl"]);
    this.imagePositionX = this.imageJSONInfo["x"];
    this.imagePositionY = this.imageJSONInfo["y"];
    this.width          = this.imageJSONInfo["width"];
    this.height         = this.imageJSONInfo["height"];
    this.isImageLoaded  = false;
    this.onLoadingCompleteCallback = null;

    this.currentParent = null;
}

BPImageLayer.prototype.onImageLoaded = function()
{
    this.image.style.position = 'absolute';
    this.image.style.width  = this.width + 'px';
    this.image.style.height = this.height + 'px';
    this.image.style.zIndex = 2;

    this.isImageLoaded = true;
    if(this.onLoadingCompleteCallback != null)
        this.onLoadingCompleteCallback(this);
};

BPImageLayer.prototype.onImageLoadingFailed = function()
{
    console.log("image at path = '" + this.image.src + "'' could not be loaded");
    this.onImageLoaded();
};

BPImageLayer.prototype.load = function(onLoadingCompleteCallback)
{
    this.onLoadingCompleteCallback = onLoadingCompleteCallback;

    if(this.imageJSONInfo != null)
    {
        var context 	   = this;
        this.image         = new Image();
        this.image.onload  = function() { context.onImageLoaded(); };
        this.image.onerror = function() { context.onImageLoadingFailed(); };
        this.image.src     = this.imageURL;
    }
    else
    {
        this.isImageLoaded = true;

        if(this.onLoadingCompleteCallback != null)
            this.onLoadingCompleteCallback(this);
    }
};

BPImageLayer.prototype.renderToCanvas = function(divContainer, isRightPageCanvas)
{
    var offset = isRightPageCanvas ? BookConstants.IMAGE_LAYER_RIGHT_OFFSET : BookConstants.IMAGE_LAYER_LEFT_OFFSET;
    this.image.style.left   = this.imagePositionX + offset.x + 'px';
    this.image.style.top    = this.imagePositionY + offset.y + 'px';

    this.currentParent = divContainer;
    this.currentParent.appendChild(this.image);
};


BPImageLayer.prototype.hideImage = function()
{
    if(this.image && this.currentParent){
        this.currentParent.appendChild(this.image);
        this.currentParent.removeChild(this.image);
    }
};




