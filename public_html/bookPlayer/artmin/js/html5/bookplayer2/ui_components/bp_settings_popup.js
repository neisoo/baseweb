function BPSettingsPopUp(divElement)
{
    this.settingPopUpMask        = divElement.parentNode;
    this.colorHex                = "";
    this.isNormalSpeedChecked    = true;
    this.isUIColorPopUpHiddden   = true;
    this.isSettingsPopUpShown    = false;

    this.favoriteAPI             = new BPFavoriteAPI();

    this.colorHex   = BookSetting.getInstance().getHighlightColor();
    this.defaultBrightness = BookSetting.getInstance().getHighlightBrightness();

    this.closeSettingPopUpButton       = document.getElementById('closeSettingsPopUpButton');
    this.highlightContainer            = document.getElementById('highlightContainer');
    this.colorHighlightPanel           = new BPSelectColorPanel(document.getElementById('colorHighlightPanel'), this.colorHex);
    this.sampleTextBackGround          = document.getElementById('sampleTextBackGround');

    this.playSpeedContainer            = document.getElementById('slowerButtonContainer');
    this.playSpeedCheckBoxElement      = document.getElementById('playSpeedCheckBox');
    this.pauseAfterPageCheckBoxElement = new BPCheckBoxComponent(document.getElementById('pauseAfterPageCheckBox'));
    this.favoriteCheckBoxElement       = document.getElementById('favoriteCheckBox');
    this.translationButton             = document.getElementById('translationButton');
    this.UIColorButton                 = document.getElementById('UIColorButton');
    this.UIColorPopUp                  = new BPUIColorPopUp(document.getElementById('UIColorPopUp'));

    this.currentHighlight              = null;
}


BPSettingsPopUp.prototype.onPreventDefaultEvent = function(event)
{
    if(event!=null)
    {
        event.stopPropagation();
        event.preventDefault();
    }
};

BPSettingsPopUp.prototype.onSelectHighlightColor = function(event)
{
    // We're checking if black(000000) cause black is mapped on the div as the collor to Off button.
    // This if can be modificated in the method onHighlightColorSelected().
    if(!event)
        return;

    if(this.currentHighlight != null){
        this.currentHighlight.className += " noDelay";
        this.currentHighlight.className =  this.currentHighlight.className.replace(" selected", "");

    }

    this.currentHighlight = null;
    event.target.className += " noDelay";
    event.target.className += " selected";
    this.currentHighlight = event.target;
    this.colorHighlightPanel.onClickColor(event);
    window.setTimeout(function () {
        var arr = document.getElementsByClassName("link");
        for(var i =0; i<arr.length; i++){
            arr[i].className = arr[i].className.replace(" noDelay", "");
        }
    }, 10);

};

BPSettingsPopUp.prototype.initialize = function()
{
    var context = this;

    this.onCloseSettingPopUpCallBack     = null;

    this.colorHighlightPanel.onColorSelectedCallBack = function(sender) { context.onHighlightColorSelected(sender) };

    this.updateHighlightColor();

    this.onPlaySpeedStateChangeEvent = null;

    this.UIColorPopUp.onCloseUIColorPopUpCallBack =  function() { context.onCloseUIColorPopUp() };

    this.onClosePopUp(null);
};

BPSettingsPopUp.prototype.onHighlightColorSelected = function(sender)
{
    this.colorHex = sender.colorHex;
    // We're checking if black cause black is mapped on the div as the collor to Off button.
    if(this.colorHex == 000000){
        this.brightness = 0.0;
    }else{
        this.brightness = this.defaultBrightness;
    }

    this.updateHighlightColor();
};

BPSettingsPopUp.prototype.onBrightnessSliderProgressChange = function(sender)
{
    var minBrightness = 0.25;
    this.updateHighlightColor();
};

BPSettingsPopUp.prototype.updateHighlightColor = function()
{
    BookSetting.getInstance().setHighlightColor(this.colorHex);
};

BPSettingsPopUp.prototype.removePlaySpeedContainer = function(remove)
{
   if(remove)
{
       this.playSpeedContainer.style.display = "none";
       this.highlightContainer.style.top = "50px";
       console.log(document.getElementById("pauseToread").offsetLeft);
      document.getElementById("pauseToread").style.left = document.getElementById("pauseToread").offsetLeft - 60 + "px";
      console.log(document.getElementById("glossaryButton").offsetLeft);
      document.getElementById("glossaryButton").style.left = document.getElementById("glossaryButton").offsetLeft - 60 + "px";
      console.log(document.getElementById("settingButton").offsetLeft);
      document.getElementById("settingButton").style.left = document.getElementById("settingButton").offsetLeft - 60 + "px";
      console.log(document.getElementById("settingsBox").offsetLeft);
      document.getElementById("settingsBox").style.left = document.getElementById("settingsBox").offsetLeft - 60 + "px";
      var shadows = document.getElementsByClassName('hoverShadow');
      //console.log(shadows);
      //for(var i = 0; i<shadows.length; i++){
      //  console.log(shadows[i].style.left);
      //  shadows[i].style.left = shadows[i].style.left - 40 + "px";
      //}
   }
};

BPSettingsPopUp.prototype.selectPlaySpeed = function(event)
{
    this.onPreventDefaultEvent(event);

    var isNormal = event.target.getAttributeNode("isNormal").value;
    var isNormal = isNormal == "true";
    event.target.appendChild(this.playSpeedCheckBoxElement);

    if(this.isNormalSpeedChecked != isNormal)
    {
        this.isNormalSpeedChecked = isNormal;

        if(this.onPlaySpeedStateChangeEvent!=null)
            this.onPlaySpeedStateChangeEvent(!isNormal);
    }
};

BPSettingsPopUp.prototype.onAddToFavoriteButton = function(event)
{
    this.onPreventDefaultEvent(event);
    this.favoriteAPI.addToFavorites();
    console.log("implement favorite api...");
};

BPSettingsPopUp.prototype.onTranslationButton = function(event)
{
    this.onPreventDefaultEvent(event);
    console.log("implement translation...");
};

BPSettingsPopUp.prototype.onOpenUIColorPopUp = function(event)
{
    this.onPreventDefaultEvent(event);
    this.isUIColorPopUpHiddden = false;
    this.onClosePopUp(null);
    this.UIColorPopUp.onOpenUIColorPopUp();
};

BPSettingsPopUp.prototype.onCloseUIColorPopUp = function(event)
{
    this.onPreventDefaultEvent(event);
    this.isUIColorPopUpHiddden = true;
    this.onOpenSettingsPopUp();
};

BPSettingsPopUp.prototype.onOpenSettingsPopUp = function()
{
    this.settingPopUpMask.style.top = "0px";
    this.settingPopUpMask.style.visibility = 'visible';
    this.settingPopUpMask.style.display = "inherit";
    this.isSettingsPopUpShown = true;
};

BPSettingsPopUp.prototype.onClosePopUp = function(event)
{
    this.onPreventDefaultEvent(event);

    this.settingPopUpMask.style.visibility = 'hidden';
    this.settingPopUpMask.style.display = "none";

    if(this.onCloseSettingPopUpCallBack!=null && this.isSettingsPopUpShown && this.isUIColorPopUpHiddden)
    {
        this.isSettingsPopUpShown =  false;
        this.onCloseSettingPopUpCallBack();
    }
};
