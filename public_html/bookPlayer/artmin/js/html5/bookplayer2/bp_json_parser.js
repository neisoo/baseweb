var BookJSON =
  (
    function()
    {
      var _instance = null;

      return {
        getInstance : function ()
        {
          if(_instance == null)
            _instance = new BPJSONParser();

          return _instance;
        }
      };
    }
  )();

function BPJSONParser()
{
}

BPJSONParser.prototype.initialize = function initialize(contentInfo, activityInfo)
{
  this.jsonData = contentInfo;

  // this is setting the highlight color to none for EFL books
  if (activityInfo && activityInfo.name.indexOf('EFL') > -1) {
    this.jsonData.highlight_color = '000000';
  }
};

BPJSONParser.prototype.getBookCID = function getBookCID()
{
  return this.jsonData["book"];
};

BPJSONParser.prototype.getBookName = function getBookName()
{
  return this.jsonData["name"];
};
BPJSONParser.prototype.getPageColor = function getPageColor()
{
  return "#"+ this.jsonData["book_color"];
};
BPJSONParser.prototype.getColor = function getColor()
{
  return "#"+ this.jsonData["color"];
};
BPJSONParser.prototype.getBookLocked = function getBookLocked()
{
  return this.jsonData["locked"];
};
BPJSONParser.prototype.getHighlight = function getHighlight()
{
  return this.jsonData["highlight_color"];
};
BPJSONParser.prototype.getBookplate = function getBookplate()
{
  return this.jsonData["bookplate"];
};
BPJSONParser.prototype.getBrightness = function getBrightness()
{
  return this.jsonData["highlight_brightness"];
};
BPJSONParser.prototype.getObjectVersion = function getObjectVersion()
{
  return this.jsonData["objectVersion"];
};
BPJSONParser.prototype.getHighlightStyle = function getHighlightStyle()
{
  return 'progressive';
};
BPJSONParser.prototype.getBackCoverEnabled = function getBackCoverEnabled()
{
  return true;
};
BPJSONParser.prototype.getBackCoverimg = function getBackCoverImg()
{
  return this.jsonData.pages[this.jsonData.pages.length -1]['image_path'];
};
BPJSONParser.prototype.getBookSnd = function()
{
  return this.jsonData["sound_path"];
};
BPJSONParser.prototype.getBookSndFilename = function getBookSndFilename()
{
  return this.getBookSnd().mp3;
};
BPJSONParser.prototype.getBookSndSlowfile = function getBookSndSlowfile()
{
  return this.jsonData['sound_slow_path']['mp3'];
};
BPJSONParser.prototype.getBookSndPageBreaks = function getBookSndPageBreaks()
{
  if (this.pageBreaks.length === 0) {
    var page;
    for (var i=0; i<this.jsonData.pages.length; i++) {
      if (this.jsonData.pages.hasOwnProperty(i)) {
        page = this.jsonData.pages[i];
        if (page['break_position'] != 0) {
          this.pageBreaks.push(page['break_position']);
        }
      }
    }
  }

  return this.pageBreaks;
};
BPJSONParser.prototype.getPages = function getPages()
{
  return this.jsonData["pages"];
};
BPJSONParser.prototype.getHUDColor = function getHUDColor()
{
  return "8ECEEC";
};

BPJSONParser.prototype.pageBreaks = [];



