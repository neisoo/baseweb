function BPGlossaryPopUp()
{
    this.glossaryInterval     = null;
    this.glossaryPopUp        = null;
    this.onClosePopUpCallBack = null;
    this.isOpen               = false;
    var context               = this;

    this.glossaryMask         = document.getElementById('glossaryMask');
    this.glossaryMask.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        context.forceCloseGlossary();
    };

    this.onClosePopUp         = function(){ context.closeGlossary(); };
    this.onUpdateInterval     = function(){ context.getGlossaryId(); };
}

BPGlossaryPopUp.prototype.openGlossary = function()
{
    closeSettingsBox();
    showPopup('glossary.php?cid='+ bookCID );                         // when "showPopUp" is call, this method creates a div and displays
    this.glossaryInterval = setInterval(this.onUpdateInterval, 300); // a pop up using Ajax, for that reason we need to create an interval
};                                                                   // because we need to get the popup's id and we don't know
                                                                     // when the pop up will be ready.
BPGlossaryPopUp.prototype.getGlossaryId = function()
{
    this.glossaryPopUp = document.getElementById('glossary.php');   // When the pop up is ready, we'll obtain the element and
                                                                    // attach on it the listener event for close button.
    if(this.glossaryPopUp!=null &&  this.glossaryPopUp!=undefined)
    {
        addListener(this.glossaryPopUp,'closepopup',this.onClosePopUp);
        this.isOpen = true;
        this.glossaryPopUp.parentNode.appendChild(this.glossaryMask);
        this.glossaryMask.style.display  = "inherit";
        this.glossaryPopUp.style.zIndex  = 2;

        hud.spinnerLoader.stop();

        clearInterval(this.glossaryInterval);
        this.glossaryInterval = null;
        pause();
        
    }
};

BPGlossaryPopUp.prototype.closeGlossary = function()
{
    this.glossaryMask.style.display  = "none";
    removeListener(this.glossaryPopUp, 'closepopup', this.onClosePopUp);
    this.glossaryPopUp = null;
    this.isOpen = false;
    if(this.onClosePopUpCallBack!=null)
        this.onClosePopUpCallBack();
};

BPGlossaryPopUp.prototype.forceCloseGlossary = function()
{
    closeBlockScreen();
};