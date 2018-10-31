var BookSetting =
(
	function()
	{
	    var _instance = null;

	    return {
			        getInstance : function ()
			        {
			            if(_instance == null)
			                _instance = new BPBookSettings();

			            return _instance;
			        }
			    };
	}
)();

function BPBookSettings()
{
	this.hightlightStyle 	  = BookJSON.getInstance().getHighlightStyle();
	this.hightlightColor      = BookJSON.getInstance().getHighlight();
	this.hightlightBrightness = BookJSON.getInstance().getBrightness();
	this.HUDColor             = BookJSON.getInstance().getHUDColor();
	this.userName 			  = "";

	if(this.hightlightStyle != BookConstants.TEXT_HIGHLIGHT_STYLE_WORD_BY_WORD)
		this.hightlightStyle = BookConstants.TEXT_HIGHLIGHT_STYLE_CONTINUOUS;

}

BPBookSettings.prototype.getHUDColor = function()
{
	return this.HUDColor;
};

BPBookSettings.prototype.setHUDColor = function(HUDColor)
{
	this.HUDColor = HUDColor;
};

BPBookSettings.prototype.getHighlightStyle = function()
{
	return this.hightlightStyle;
};

BPBookSettings.prototype.getHighlightColor = function()
{
	return this.hightlightColor;
};

BPBookSettings.prototype.setHighlightColor = function(highlightColor)
{
	this.hightlightColor = highlightColor;
    for(var i = 0; i < book.pages.length; i++){
        var __page = book.pages[i];
        if(__page.textHighlight){
	        var __divs = __page.textHighlight.divBoxesContainer.getElementsByTagName('div');
	        var colorCss = highlightColor == '000000' ? 'transparent' : '#' + highlightColor;
					if(highlightColor == 000000){
								 __page.textHighlight.divBoxesContainer.style.opacity = '0';
					}else{
							__page.textHighlight.divBoxesContainer.style.opacity = '0.5';
					}

					for(var j = 0; j < __divs.length; j++){
	          __divs[j].style.backgroundColor = colorCss;

	        }
        }
    }
};

BPBookSettings.prototype.getHighlightBrightness = function()
{
	return this.hightlightBrightness;
};

BPBookSettings.prototype.setHighlightBrightness = function(highlightBrightness)
{
	this.hightlightBrightness = highlightBrightness;
};

BPBookSettings.prototype.getUserName = function()
{
	return this.userName;
};

BPBookSettings.prototype.setUserName = function(name)
{
	this.userName = name;
};
