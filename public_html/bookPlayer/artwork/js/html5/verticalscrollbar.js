
var activeScroll = null;

function VerticalScrollBar(barid, setW, setH) {
    this.autoHide = false;
    this.scrolly = 0;
    this.scrolling = false;
    this.position = -1;
    this.showScrollBar = true;


    this.shell = (typeof(barid) == 'string') ? document.getElementById(barid) : barid;

    var w = (typeof(setW) !== 'undefined') ? setW : this.shell.offsetWidth;
    var h = (typeof(setH) !== 'undefined') ? setH : this.shell.offsetHeight;

    this.viewpane = h;
    this.scrollRange = h;

    this.toparrow = new Image();
    this.toparrow.src = IMGHOST+'/html5/scroll_top.png';
    this.toparrow.width = w;
    this.toparrow.height = Math.round(w*46/25);
    this.toparrow.style.position = 'absolute';
    this.toparrow.objref = this;
    this.toparrow.style.cursor = 'pointer';
    this.holdArrowScroll(this, this.toparrow, 100);
    this.shell.appendChild(this.toparrow);

    this.backimg = new Image();
    this.backimg.src = IMGHOST+'/html5/scroll_slice.png';
    this.backimg.width = w;
    this.backimg.height = h - 2*Math.round(w*46/25) + 2; // QAV-4531 extending scrollbar background 1 pixel top and one bottom
    this.backimg.style.position = 'absolute';
    this.backimg.style.top = Math.round(w*46/25) - 1 + 'px'; // QAV-4531 moving scrollbar background 1 pixel on top
    this.shell.appendChild(this.backimg);

    this.btmarrow = new Image();
    this.btmarrow.src = IMGHOST+'/html5/scroll_btm.png';
    this.btmarrow.width = w;
    this.btmarrow.height = Math.round(w*46/25);
    this.btmarrow.style.position = 'absolute';
    this.btmarrow.style.top = (h - this.btmarrow.height) + 'px';
    this.btmarrow.objref = this;
    this.btmarrow.style.cursor = 'pointer';
    this.holdArrowScroll(this, this.btmarrow, 100);
    this.shell.appendChild(this.btmarrow);

    this.backdiv = document.createElement('div');
    this.backdiv.style.width = w + 'px';
    this.backdiv.style.height = Math.round(h - w*27*2/25) + 'px';
    this.backdiv.style.position = 'absolute';
    this.backdiv.style.top = Math.round(w*27/25) + 'px';
     this.backdiv.objref = this;
    this.shell.appendChild(this.backdiv);

    this.bardiv = document.createElement('div');
    this.bardiv.style.position = 'absolute';
    this.bardiv.style.width = (this.shell.offsetWidth <= 0) ?  w + 'px' : this.backdiv.offsetWidth + 'px';
    this.bardiv.style.top = this.backdiv.offsetTop + 'px';
    this.bardiv.objref = this;
    this.backdiv.appendChild(this.bardiv);

    this.bartop = new Image();
    this.bartop.src = IMGHOST+'/html5/scrollbar_top.png';
    this.bartop.width = w;
    this.bartop.height = Math.round(w*17/25);
    this.bartop.style.position = 'absolute';
    this.bardiv.appendChild(this.bartop);

    this.barmid = new Image();
    this.barmid.src = IMGHOST+'/html5/scrollbar_slice.png';
    this.barmid.width = w;
    this.barmid.height = Math.round(Math.round(h - w*27*2/25)/2);
    this.barmid.style.position = 'absolute';
    this.barmid.style.top = Math.round(w*17/25) + 'px';
    this.bardiv.appendChild(this.barmid);

    this.barbtm = new Image();
    this.barbtm.src = IMGHOST+'/html5/scrollbar_btm.png';
    this.barbtm.width = w;
    this.barbtm.height = Math.round(w*17/25);
    this.barbtm.style.position = 'absolute';
    this.barbtm.style.top =  Math.round(w*17/25) + Math.round(Math.round(h - w*27*2/25)/2) + 'px';
    this.bardiv.appendChild(this.barbtm);

    if(this.shell.offsetHeight > 0){
        this.adjustBar();
        this.adjustPos();
    }else{
        this.backsize = Math.round(h - w*27*2/25);
        this.barsize = (Math.round(w*17/25)*2)+ Math.round(Math.round(h - w*27*2/25)/2);
        this.bardiv.style.height = (Math.round(w*17/25)*2)+ Math.round(Math.round(h - w*27*2/25)/2) + 'px';
    }

    addListener(this.bardiv, 'mousedown', this.scrollStart);
    addListener(this.bardiv, 'touchstart', this.scrollStart);
    addListener(this.backdiv, 'mousewheel',this.scrollWheel);
    addListener(this.backdiv, 'DOMMouseScroll',this.scrollWheel);
}

/////////////////////

VerticalScrollBar.prototype.setPosition = function(p) {
    this.adjustPos(p);
}

VerticalScrollBar.prototype.setShowScrollBar = function(b) {
    this.showScrollBar = b;
    this.shell.style.visibility = b ? 'inherit' : 'hidden';
}

VerticalScrollBar.prototype.setViewPane = function(p) {
    this.viewpane = p;
    if(this.shell.offsetHeight > 0){
        this.adjustBar();
        this.adjustPos();
    }
}

VerticalScrollBar.prototype.setScrollRange = function(p) {
    this.scrollRange = Math.max(p, this.viewpane);

    if(this.shell.offsetHeight > 0){
        this.adjustBar();
        this.adjustPos();
    }
}

VerticalScrollBar.prototype.setScrolledArea = function(div) {
    this.area = (typeof(div) == 'string') ? document.getElementById(div) : div;
    if(this.area) {
        this.scrollRange = Math.max(this.area.scrollHeight, this.viewpane);
        //var ef = new EnterFrame(this, this.resizeArea);
        //ef.frameRate = 1;

        if(this.shell.offsetHeight > 0){
            this.adjustBar();
            this.adjustPos();
        }
    }
}

/////////////////////

VerticalScrollBar.prototype.resizeArea = function(event) {
    if(this.scrollRange != this.area.scrollHeight) {
        this.scrollRange = Math.max(this.area.scrollHeight, this.viewpane);

        this.adjustBar();
        this.adjustPos();
    }
}

VerticalScrollBar.prototype.holdArrowScroll = function(bar,btn,start) {
    var t;
    var stopRepeat = false;
    var repeat = function () {
        if(stopRepeat){
            clearTimeout(t);
            return;
        }
        var newpos = (btn == bar.btmarrow) ? 30 : -30;
        bar.setPosition(bar.position + newpos);
        t = setTimeout(repeat, start);
    }
    addListener(btn, 'mousedown', function(){stopRepeat = true;});
    addListener(btn, 'mouseup', function(){stopRepeat = true;});
    addListener(btn, 'mouseout', function(){stopRepeat = true;});
    addListener(btn, 'touchstart', function(){stopRepeat = false;repeat();});
    addListener(btn, 'touchend', function(){stopRepeat = true;});
}

/////////////////////

VerticalScrollBar.prototype.scrollStart = function(event) {
    var bar = getEventTarget(event);
    var obj = bar.objref;

    var mousepos = pagePosition(event);
    obj.scrolly = mousepos.y;

    obj.scrolling = false;
    obj.scrollstart = obj.scrolly;

    addListener(document, 'mousemove',obj.scrollMove);
    addListener(document, 'mouseup',obj.scrollEnd);
    addListener(document, 'touchmove',obj.scrollMove);
    addListener(document, 'touchend',obj.scrollEnd);
    activeScroll = obj;

    cancelEvent(event);
}

VerticalScrollBar.prototype.scrollMove = function(event) {

    var mousepos = pagePosition(event);
    var obj = activeScroll;
    obj.scrolling = true;
    var topOffset = Math.min(obj.backsize - obj.barsize, Math.max(obj.bardiv.offsetTop - obj.scrolly + mousepos.y, 0));
    obj.bardiv.style.top = Math.min(obj.backsize - obj.barsize, Math.max(obj.bardiv.offsetTop - obj.scrolly + mousepos.y, 0))+'px';
    obj.scrolly = mousepos.y;
    obj.adjustPos((obj.scrollRange - obj.viewpane)*topOffset/(obj.backsize - obj.barsize));

    cancelEvent(event);
}

VerticalScrollBar.prototype.scrollWheel = function(event) {

    var bar = getEventTarget(event);
    var obj = bar.objref;
    var wheelData = event.detail ? event.detail * -1 : event.wheelDelta / 40;

    var p = obj.bardiv.offsetTop - wheelData*3;
    obj.bardiv.style.top = Math.min(obj.backsize - obj.barsize, Math.max(p, 0))+'px';
    obj.adjustPos((obj.scrollRange - obj.viewpane)*obj.bardiv.offsetTop/(obj.backsize - obj.barsize));
    cancelEvent(event);
}

VerticalScrollBar.prototype.scrollEnd = function(event) {
    if(activeScroll) {
        removeListener(document,'touchend',activeScroll.scrollEnd);
        removeListener(document,'touchmove',activeScroll.scrollMove);
        removeListener(document,'mousemove',activeScroll.scrollMove);
        removeListener(document,'mouseup',activeScroll.scrollEnd);
        activeScroll.scrolling = false;
    }
    activeScroll = null;
    cancelEvent(event);
}

/////////////////////

VerticalScrollBar.prototype.adjustBar = function() {
    this.backsize = this.backdiv.offsetHeight;
    this.barsize = Math.min(this.backsize, Math.max(this.bardiv.offsetWidth*34/25, this.backsize*this.viewpane/this.scrollRange));
    this.bardiv.style.height = this.barsize + 'px';
    if(this.bartop && this.barmid && this.barbtm) {
        this.barmid.style.height = Math.max(0, this.bardiv.offsetHeight - 2*Math.round(this.bardiv.offsetWidth*17/25)) + 'px';
        this.barbtm.style.top = this.barmid.offsetTop + this.barmid.offsetHeight + 'px';
    }
}

VerticalScrollBar.prototype.adjustPos = function(newpos) {

    if(isNaN(newpos)) newpos = this.position;

    var newpos = Math.min(this.scrollRange - this.viewpane, Math.max(0, newpos));

    if(this.scrollRange <= this.viewpane) this.bardiv.style.top = '0px';
    else this.bardiv.style.top = newpos*(this.backsize - this.barsize)/(this.scrollRange - this.viewpane) + 'px';

    if(this.area) this.area.scrollTop = Math.max(0, Math.min(newpos, this.area.scrollHeight - this.area.offsetHeight));

    if(newpos != this.position) {
        this.position = newpos;
        this.dispatchEvent('change');
    }
    if(this.showScrollBar == true){
        this.shell.style.visibility = ((this.autoHide == true && this.viewpane >= this.scrollRange) || this.viewpane < 100) ? 'hidden' : 'inherit';
    }

    this.dispatchEvent('adjustPos'); //ajf
}

/////////////////////

VerticalScrollBar.prototype.resizeDiv = function() {

    var w = this.shell.offsetWidth;
    var h = this.shell.offsetHeight;

    this.toparrow.width = w;
    this.toparrow.height = Math.round(w*46/25);

    this.backimg.width = w;
    this.backimg.height = h - 2*Math.round(w*46/25);
    this.backimg.style.top = Math.round(w*46/25) + 'px';

    this.btmarrow.width = w;
    this.btmarrow.height = Math.round(w*46/25);
    this.btmarrow.style.top = (h - this.btmarrow.height) + 'px';

    this.backdiv.style.width = w + 'px';
    this.backdiv.style.height = Math.round(h - w*27*2/25) + 'px';
    this.backdiv.style.top = Math.round(w*27/25) + 'px';

    this.bardiv.style.width = this.backdiv.offsetWidth + 'px';
    this.bardiv.style.top = this.backdiv.offsetTop + 'px';

    this.bartop.width = w;
    this.bartop.height = Math.round(w*17/25);

    this.barmid.width = w;
    this.barmid.height = Math.round(this.backdiv.offsetHeight/2);
    this.barmid.style.top = Math.round(w*17/25) + 'px';

    this.barbtm.width = w;
    this.barbtm.height = Math.round(w*17/25);
    this.barbtm.style.top = this.barmid.offsetTop + this.barmid.offsetHeight + 'px';
    this.adjustBar();
    this.adjustPos();
}

/////////////////////


enableEventHandling(VerticalScrollBar);
