function BPUIColorPopUp(divElement)
{
    this.colorPopUpMask = divElement.parentNode;
    this.colorPopUpElement = divElement;

    this.closeUIColorPopUpButton = document.getElementById('closeUIColorPopUpButton');
    this.HUDColor   = BookSetting.getInstance().getHUDColor();
    this.colorHUDPanel = new BPSelectColorPanel(this.colorPopUpElement, this.HUDColor);

    this.initialize();
}

BPUIColorPopUp.prototype.onPreventDefaultEvent = function(event)
{
    if(event!=null)
    {
        event.stopPropagation();
        event.preventDefault();
    }
};

BPUIColorPopUp.prototype.onSelectHUDColor = function(event)
{
    this.colorHUDPanel.onClickColor(event);
};

BPUIColorPopUp.prototype.initialize = function()
{
    var context                                = this;
    this.onCloseUIColorPopUpCallBack           = null;
    this.onUIColorSelectedCallBack             = null;
    this.colorHUDPanel.onColorSelectedCallBack = function(sender){ context.onHUDColorSelected(sender) };
    this.onCloseUIColorPopUp(null);
};

BPUIColorPopUp.prototype.onHUDColorSelected = function(sender)
{
    var colorHex = "#"+sender.colorHex;

    if(this.onUIColorSelectedCallBack!=null)
        this.onUIColorSelectedCallBack(colorHex);

};

BPUIColorPopUp.prototype.onOpenUIColorPopUp = function()
{
    this.colorPopUpMask.style.top = "0px";
    this.colorPopUpMask.style.visibility = 'visible';
    this.colorPopUpMask.style.display = "inherit";
};

BPUIColorPopUp.prototype.onCloseUIColorPopUp = function(event)
{
    this.onPreventDefaultEvent(event);
    this.colorPopUpMask.style.visibility = 'hidden';
    this.colorPopUpMask.style.display = "none";

    if(this.onCloseUIColorPopUpCallBack!=null)
        this.onCloseUIColorPopUpCallBack();
};