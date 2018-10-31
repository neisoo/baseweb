function BPSelectColorPanel(divPanel, color)
{
    this.panel =  divPanel;
    this.initialColorSelected = color;
    this.colorHex = "";
    this.onColorSelectedCallBack = null;
    this.initializeColorPanel();
}

BPSelectColorPanel.prototype.initializeColorPanel = function()
{
    var context = this;
    var elements = this.panel.getElementsByClassName("colorHighLight");
    
    for(var i = 0; i < elements.length; i++)
    {
        var currentElement = elements[i];
        var elementColor = currentElement.getAttributeNode("color").value.toLowerCase();
        var initialColor = bookJSON.highlight_color.toLowerCase();
        if(initialColor == "3399ee")
            initialColor = "8eceec";
        if(elementColor == initialColor)
        {
            this.onColorSelected(currentElement);
        }
    }

    this.colorHex = BookJSON.getInstance().jsonData.highlight_color.toLowerCase();
    if(this.colorHex == "3399ee")
            this.colorHex = "8eceec";
    var elem = document.getElementsByClassName("settingsBox")[0].getElementsByClassName("list-color")[0].getElementsByTagName("li");
    for(var i = 0; i < elem.length; i++){
        var object = elem[i].getElementsByTagName("div")[0];
        if(object.className.indexOf("selected") >= 0){
            object.className = object.className.replace(" selected", "");
        }
        if(object.getAttributeNode("color").value.toLowerCase() == this.colorHex){
            object.className += " selected";
        }
    }
};

BPSelectColorPanel.prototype.onClickColor = function(event)
{
    event.stopPropagation();
    event.preventDefault();
    this.onColorSelected(event.target);

    if(book.currentLeftPage != null) book.currentLeftPage.updateHighLight(book.audioProgress.audioPosition);
    if(book.currentRightPage != null) book.currentRightPage.updateHighLight(book.audioProgress.audioPosition);
};

BPSelectColorPanel.prototype.onColorSelected = function(elementParent)
{

    this.colorHex = elementParent.getAttributeNode("color").value.toLowerCase();
    var elem = document.getElementsByClassName("settingsBox")[0].getElementsByClassName("list-color")[0].getElementsByTagName("li");
    for(var i = 0; i < elem.length; i++){
        var object = elem[i].getElementsByTagName("div")[0];
        if(object.className.indexOf("selected") >= 0){
            object.className = object.className.replace(" selected", "");
            object.className += " noDelay";
        }
        if(object.getAttributeNode("color").value.toLowerCase() == this.colorHex){
            object.className = object.className.replace(" noDelay", "");
            object.className += " selected";
        }
    }
    if(this.onColorSelectedCallBack != null)
        this.onColorSelectedCallBack(this);
    var pageLeft = book.pages[book.currentLeftPageIndex];
    if(pageLeft)
        if(pageLeft.textHighlight)
            pageLeft.textHighlight.updateHighLight(pageLeft.divContainer);
    var pageRight = book.pages[book.currentLeftPageIndex + 1];
    
    if(pageRight)
        if(pageRight.textHighlight)
            pageRight.textHighlight.updateHighLight(pageRight.divContainer);
};