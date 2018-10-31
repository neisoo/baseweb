function BPGeneralUILoader()
{
}

BPGeneralUILoader.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback 		 	= onLoadingCompleteCallback;
	this.loadedAssetsCount 		         	= 0;
	this.totalAssets 	   				 	= 0;
	this.isGeneralUILoaded 				 	= false;

	this.coverBackgroundImage 			 	= this.loadImage("book-cover.png");
	this.coverBackgroundImageAlpha 			= this.loadImage("book-cover-alpha.png");
	this.coverBackgroundImageFlipped 	 	= this.loadImage("book-cover-left.png");
	this.coverBackgroundImageFlippedAlpha 	= this.loadImage("book-cover-left-alpha.png");
	this.coverBackgroundImageCenter		 	= this.loadImage("book-cover-middle.png");
	this.coverBackgroundImageCenterAlpha	= this.loadImage("book-cover-middle-alpha.png");

	this.pageBorderBottomImageFlipped	 	= this.loadImage("page_border_bottom_flipped.png");
	this.pageBorderSideImageFlipped		 	= this.loadImage("page_border_side_flipped.png");
	this.pageBorderBottomImage			 	= this.loadImage("page_border_bottom.png");
	this.pageBorderSideImage			 	= this.loadImage("page_border_side.png");

	this.rightBorderImage 			   	 	= this.loadImage("book_page_right.png");
	this.leftBorderImage 			     	= this.loadImage("book_page_left.png");
	this.bottomBorderImage 			     	= this.loadImage("book_long_shadow_no_transparency.png");
	this.bottomShortBorderImage 	     	= this.loadImage("book_short_shadow_botton_no_transparency.png");
};

BPGeneralUILoader.prototype.loadImage = function(imageSource)
{
	this.totalAssets++;

	var image 	 = new Image();
	var context  = this;
	image.onload = function() { context.onImageLoaded(); };
	image.src    = "../artwork/html5/bookplayer/theme/bookborder/" + imageSource;

	return image;
};

BPGeneralUILoader.prototype.onImageLoaded = function()
{
	this.loadedAssetsCount++;

	if(this.loadedAssetsCount == this.totalAssets)
	{
		tintCoverImages();
		this.isGeneralUILoaded = true; 
		this.onLoadingCompleteCallback(this);
	}
};