'use strict';

var tabletDivDragger = new Array();

function ScrollTabletDiv(id, disableDesktopMouseDown) {
    this.area = (typeof(id) == 'string') ? document.getElementById(id) : id;
    this.scrollPos = {x:0,y:0};
    this.vScrollBar = null;
    this.hScrollBar = null;
    this.vScrollTracker = null;
    this.vSnap = 0;
    this.hSnap = 0;
    this.dotHolder;
    this.offDot;
    this.onDot;
    this.chevronLeft;
    this.chevronRight;
    this.chevronTop;
    this.chevronBottom;
    this.mouseWheelPaging = false; // [Caigoy,062615,QA-759]
    this.maxDots = 0;
    this.currDotPos = -1; //2.26.13 dh
    this.vItemPos = 0;
    this.hItemPos = 0;
    this.swipeScale = 1;
    this.scrollStartTime = null;
    this.scrollStartPos = null;
    this.allowHorizontalDragging = true;
    this.allowVerticalDragging = true;
    this.dragAndDrop = false;
    this.stopPropagationWheel = false;

    /* Added 3/20/2013 by Len */
    this.navSpacing = 2;

    //added by jake
    if (typeof touchCapable === 'undefined')//its not defined for outside pay wall
        touchCapable = false;
    if(this.area) {
        this.area.style.marginTop = '0px';
        this.area.objref = this;

        /*
        addListener(this.area, 'touchstart', this.scrollStart);
        if(MOBILE) { addListener(this.area, 'mousedown', this.scrollStart);} // MAG testing
        */
        //MAG 05/05/2014: We are now using the touchCapable global variable through the isTouchdevice() function in utils.js
        if ((typeof isUnity) == 'undefined') {
            var isUnity = false;
        }
        if(isUnity || touchCapable) {
            addListener(this.area, 'touchstart', this.scrollStart);
        }
        else {
            if (! disableDesktopMouseDown) {
                addListener(this.area, 'mousedown', this.scrollStart);
            }
        }

        addListener(this.area, 'resize', this.resizeArea);
        addListener(this.area, 'mousewheel',this.scrollWheel);
        addListener(this.area, 'DOMMouseScroll', this.scrollWheel);
		addListener(document, 'dragleave',this.dragleave.bind(this));
		addListener(document, 'dragstart',this.dragleave.bind(this));

	}
    this.removeCookie(this.area.id);
}

ScrollTabletDiv.prototype.addRemoveTouchstart = function(bool){
    /*
    if(bool == true){
        addListener(this.area, 'touchstart', this.scrollStart);
        if(MOBILE) { addListener(this.area, 'mousedown', this.scrollStart);}
    }else{
        removeListener(this.area, 'touchstart', this.scrollStart);
        if(MOBILE) { removeListener(this.area, 'mousedown', this.scrollStart);}
    }
    */
    //MAG 05/05/2014: We are now using the touchCapable global variable through the isTouchdevice() function in utils.js
    if(bool == true){
        if(isUnity || touchCapable) addListener(this.area, 'touchstart', this.scrollStart);
        else addListener(this.area, 'mousedown', this.scrollStart);
    }else{
        if(isUnity || touchCapable) removeListener(this.area, 'touchstart', this.scrollStart);
        else removeListener(this.area, 'mousedown', this.scrollStart);
    }

}
/////////////////////////////

ScrollTabletDiv.prototype.scrollStart = function(event) {
    //arsen: this is a hack fix, scrolltablet should't block the mouse events on input elements
    //       this whole file is "a little" messy, needs to be refactored
    if (event.target && event.target.tagName && event.target.tagName === 'INPUT') {
        return;
    }
    //var obj = event.currentTarget.objref;

    var obj = getEventTarget(event);
    obj = obj.objref;
    obj.scrollPos = pagePosition(event);
    obj.scrollStartTime = new Date().getTime();
    obj.scrollStartPos = obj.scrollPos;
    //added cordova to fix scrolling in Android. 2.14.13 <3
    if(MOBILE == 'iphone'||MOBILE == 'cordova') addListener(document, 'touchmove', stopIPhoneScroll);
    //event.preventDefault();

    //MAG 05/05/2014: We are now using the touchCapable global variable through the isTouchdevice() function in utils.js
    //if(MOBILE){
    if(isUnity || touchCapable){
        addListener(document.body,'touchmove',obj.scrollMove);
        addListener(document.body,'touchend',obj.scrollEnd);
    }else{
        if(!obj.dragAndDrop){
            event.preventDefault();//not sure why this is in here as I can't see this doing anything since we dont do mouse move to scroll. Left it in just incase. DAG 2.17.14
        }
        addListener(document.body,'mousemove',obj.scrollMove);
        addListener(document.body,'mouseup',obj.scrollEnd);
    }

    tabletDivDragger.push(obj);
    obj.dispatchEvent('start');
}
function stopIPhoneScroll(event){
    event.preventDefault();
}
/////////////////////////////

ScrollTabletDiv.prototype.scrollMove = function(event) {
    //MAG 05/05/2014: the following two lines prevent browsers from scrolling the page on touch actions (default action)
    event.preventDefault();
    this.style.msTouchAction = 'none';

    var direction        =    '';
    for(var i=0;i<tabletDivDragger.length;i++) {
        var obj = tabletDivDragger[i];
        var pos = pagePosition(event);

        if(obj.vScrollBar) {
            if(direction == 'v')
                continue;
            else
                direction = 'v';
        }
        if(obj.hScrollBar) {
            if(direction == 'h')
                continue;
            else
                direction = 'h';
        }

        // if (obj.vScrollBar) {
        //     var sTop = obj.area.style.marginTop;
        //     sTop = sTop.replace('px', '');
        // }

        if(obj.allowVerticalDragging) obj.area.scrollTop = Math.max(0, Math.min(obj.area.scrollTop + obj.swipeScale*(obj.scrollPos.y - pos.y), obj.area.scrollHeight - obj.area.offsetHeight));
        if(obj.allowHorizontalDragging) obj.area.scrollLeft = Math.max(0, Math.min(obj.area.scrollLeft + obj.swipeScale*(obj.scrollPos.x - pos.x), obj.area.scrollWidth - obj.area.offsetWidth));
        obj.scrollPos = pos;

        //trace(obj.swipeScale, obj.scrollPos.x, pos.x);
        if(!obj.vScrollBar && !obj.vScrollTracker && !obj.hScrollBar) {
            obj.dispatchEvent('move');
        }

        if(obj.vScrollBar) obj.vScrollBar.setPosition(obj.area.scrollTop);
        if(obj.vScrollTracker) obj.vScrollTracker.setPosition(obj.area.scrollTop);
        if(obj.hScrollBar) obj.hScrollBar.setPosition(obj.area.scrollLeft);
        if (obj.vSnap >0) {
            obj.whatPageVertical();
        } else {
            obj.whatPage();
        }

    }
}

/////////////////////////////

ScrollTabletDiv.prototype.scrollEnd = function(event) {
    for(var i=0;i<tabletDivDragger.length;i++) {
        var obj = tabletDivDragger[i];

        if (obj.scrollStartTime) {
            var pos = pagePosition(event);
            var scrollEndTime = new Date().getTime();
            var scrollDuration = scrollEndTime - obj.scrollStartTime;

            var scrollDistance = 0;
            if (obj.vScrollBar) {
                scrollDistance = pos.y - obj.scrollStartPos.y;
            }
            else {
                scrollDistance = pos.x - obj.scrollStartPos.x;    //corrected a syntax error 1.16.14 DAG
            }

            //trace('duration:'+scrollDuration+'; distance:'+scrollDistance);
            //obj.area.style.transition = "all 1s ease"
            //obj.area.style.marginTop = "0px";
        }

        /*
        removeListener(document.body,'touchmove',obj.scrollMove);
        removeListener(document.body,'touchend',obj.scrollEnd);
        removeListener(document.body,'mousemove',obj.scrollMove);
        removeListener(document.body,'mouseup',obj.scrollEnd);

        */
        //MAG 05/05/2014: We are now using the touchCapable global variable through the isTouchdevice() function in utils.js
        if(isUnity || touchCapable) {
            removeListener(document.body,'touchmove',obj.scrollMove);
            removeListener(document.body,'touchend',obj.scrollEnd);
        }
        else {
            removeListener(document.body,'mousemove',obj.scrollMove);
            removeListener(document.body,'mouseup',obj.scrollEnd);
        }

        obj.dispatchEvent('finish');

        if(obj.vScrollBar) {
            obj.vScrollBar.setPosition(obj.area.scrollTop);
        }
        if(obj.vScrollTracker) obj.vScrollTracker.setPosition(obj.area.scrollTop);
        if(obj.hScrollBar) obj.hScrollBar.setPosition(obj.area.scrollLeft);

        obj.changePaging();
    }
    //if(tabletDivDragger.length) event.preventDefault();
    if(MOBILE == 'iphone')removeListener(document, 'touchmove', stopIPhoneScroll);

    tabletDivDragger = new Array();
}

/////////////////////////////

ScrollTabletDiv.prototype.scrollWheel = function (event) {
    var area = getEventTarget(event);

    if (area) {
        var obj = area.objref;
        var wheelData = event.detail ? event.detail * -1 : event.wheelDelta / 40;
        obj.area.scrollTop = Math.max(0, Math.min(obj.area.scrollTop - wheelData * 3, obj.area.scrollHeight - obj.area.offsetHeight));
        obj.scrollPos.y = obj.area.scrollTop;

        // [Caigoy,062615,QA-759] Call chevron functions with scroll wheel
        if (obj.mouseWheelPaging) {
            var wheelDirection = getScrollWheelDirection(event),
                hPagingLeft = obj.chevronLeft && obj.chevronLeft.style.visibility !== 'hidden',
                hPagingRight = obj.chevronRight && obj.chevronRight.style.visibility !== 'hidden',
                vPagingTop = obj.chevronTop && obj.chevronTop.style.visibility !== 'hidden',
                vPagingBottom = obj.chevronDown && obj.chevronDown.style.visibility !== 'hidden';
            // calls functions for available chevrons
            // follows up:left/down:right convention; intuitive when only horizontal paging allowed
            switch (wheelDirection) {
            case 'u':
            case 'l':
                vPagingTop && obj.TopChevronClicked(obj.chevronTop);
                hPagingLeft && obj.leftChevronClicked(obj.chevronLeft);
                break;
            case 'd':
            case 'r':
                vPagingBottom && obj.bottomChevronClicked(obj.chevronBottom);
                hPagingRight && obj.rightChevronClicked(obj.chevronRight);
                break;
            }
        }
        //////////////////////////////////////

        if (obj.vScrollBar) obj.vScrollBar.setPosition(obj.area.scrollTop);
        if (obj.vScrollTracker) obj.vScrollTracker.setPosition(obj.area.scrollTop);
        if (obj.hScrollBar) obj.hScrollBar.setPosition(obj.area.scrollLeft);
        if (obj.chevronTop) {
            if (obj.scrollPos.y > 0) {
                obj.chevronTop.style.visibility = 'inherit';
            } else {
                obj.chevronTop.style.visibility = 'hidden';
            }
        }
        if (obj.chevronBottom) {
            if (obj.scrollPos.y == (obj.area.scrollHeight - obj.area.offsetHeight)) {
                obj.chevronBottom.style.visibility = 'hidden';
            } else {
                obj.chevronBottom.style.visibility = 'inherit';
            }
        }
    }
    // Arian- 7/30/14 - cannot stop event propegation here
    // if the scroller contains another scroller inside e.g. Hamster Store Items
    // scrolling over the inside scroller will not scroll the parent.
    //    cancelEvent(event);
    if(obj.stopPropagationWheel) {
        event.stopPropagation();
    }
};

ScrollTabletDiv.prototype.dragleave = function(e){

	this.scrollEnd();
}
/////////////////////////////

/**
 * Get direction of last mouse wheel event [Caigoy,062615,QA-759]
 * @param  {event} e Mouse wheel event object
 * @return {string}  Direction of scroll ['d'|'u'|'l'|'r']
 */
function getScrollWheelDirection(e) {
    var e = window.event || e; // IE legacy

    Math.sign = Math.sign || function (x) { // IE/Safari polyfill for whether number is pos/neg
        return +x === 0 ? x : (x > 0 ? 1 : -1);
    };

    if (wheelThrottle.check(false, false)) { // prevent rapid fire calls
        return false;
    };

    // mousewheel event variations between browsers
    var dY = (function () {
            switch (false) {
            case e.deltaY === (0 || undefined):
                return e.deltaY; // Chrome
            case e.wheelDelta === (0 || undefined):
                return e.wheelDelta; // Chrome, Safari, IE
            case e.detail === (0 || undefined):
                return e.detail; // Firefox
            default:
                return 0;
            }
        })(),
        dX = (function () {
            switch (false) {
            case e.deltaX === (0 || undefined):
                return e.deltaX; // Chrome
            case e.wheelDelta === (0 || undefined):
                return e.wheelDelta; // Chrome, Safari, IE
            case e.detail === (0 || undefined):
                return e.detail; // Firefox
            default:
                return 0;
            }
        })();

    var wheelDirectionX = (function () {
        if (Math.sign(dX) === 0) return false; // no delta
        return Math.sign(dX) > -1 ? 'r' : 'l';
    })();
    var wheelDirectionY = (function () {
        if (Math.sign(dY) === 0) return false; // no delta
        return Math.sign(dY) > -1 ? 'd' : 'u';
    })();

    return wheelDirectionX || wheelDirectionY;
}
var wheelThrottle = new Throttle(250); // Throttle instance for mousewheel/trackpad scroll events

/**
 * Prevent multiple calls within wait period [Caigoy,062615,QA-759]
 * @param {int} wait Milliseconds between calls before allowed again.
 */
function Throttle(wait) {
    this.waiting = true;
    this.wait = wait || 250;
    this.mark = Date.now() + this.wait;
    /**
     * Returns true if called twice within wait period
     * @param  {boolean} cancel    Reset this.waiting, force return false
     * @param  {boolean} mustPause Start wait period on each call
     * @return {boolean}           Return false if wait period passed
     */
    this.check = function (cancel, mustPause) {
        this.mustPause = mustPause || false;
        this.waiting = Date.now() <= this.mark;
        if (cancel) {
            this.mark = Date.now();
            this.waiting = false;
        }
        if (this.mustPause) {
            this.mark = Date.now() + this.wait;
        } else if (!this.mustPause && !this.waiting) {
            this.mark = Date.now() + this.wait;
            return this.waiting;
        }
        return this.waiting;
    };
}

ScrollTabletDiv.prototype.setVPosition = function(p) {

    var newpos = Math.min(this.area.scrollHeight - this.area.offsetHeight, Math.max(0, p));

    this.area.scrollTop = Math.max(0, Math.min(newpos, this.area.scrollHeight - this.area.offsetHeight));
    this.scrollPos.y = this.area.scrollTop;
    if(this.vScrollBar) this.vScrollBar.setPosition(this.area.scrollTop);
}
/////////////////////////////

ScrollTabletDiv.prototype.setVPostionForIE = function()
{
    if(BROWSER.indexOf('Chrome') != -1){
        var curr_pos = getCookie('current_scroll_position');
        newpos = curr_pos;
        this.objref.area.scrollTop = Math.max(0, newpos);
    }
}

ScrollTabletDiv.prototype.setVerticalScroll = function(bar, autohide) {
    if(this.vScrollBar) {
        removeListener(this.vScrollBar, 'change', this.vScrollChange);
        this.vScrollBar = null;
    }

    if(bar) {
        this.vScrollBar = bar;
        if(autohide != undefined) bar.autoHide = autohide;
        bar.objref = this;
        bar.setScrollRange(this.area.scrollHeight);
        bar.setPosition(this.area.scrollTop);
        addListener(bar, 'change', this.vScrollChange);
    }
}

ScrollTabletDiv.prototype.vScrollChange = function(event) {
//trace("vScrollChange");
//trace("value:" + Math.max(0, Math.min(this.position, this.objref.area.scrollHeight - this.objref.area.offsetHeight)));
    //this.objref.area.scrollHeight //not sure why this is here but commented it out incase it was an unfinished thought. DAG 8.8.13
    this.objref.area.scrollTop = Math.max(0, Math.min(this.position, this.objref.area.scrollHeight - this.objref.area.offsetHeight));
    this.objref.dispatchEvent('move');
}

ScrollTabletDiv.prototype.setScrollTracker = function(bar, autohide) {
    if(this.vScrollTracker) {
        removeListener(this.vScrollBar, 'change', this.vScrollChange);
        this.vScrollBar = null;
    }

    if(bar) {
        this.vScrollTracker = bar;
        if(autohide != undefined) bar.autoHide = autohide;
        bar.objref = this;
        bar.setScrollRange(this.area.scrollHeight);
        bar.setPosition(this.area.scrollTop);
        addListener(bar, 'change', this.vScrollTrackerChange);
    }
}

ScrollTabletDiv.prototype.vScrollTrackerChange = function(event) {
    //this.objref.area.scrollHeight //not sure why this is here but commented it out incase it was an unfinished thought. DAG 8.8.13
    this.objref.area.scrollTop = Math.max(0, Math.min(this.position, this.objref.area.scrollHeight - this.objref.area.offsetHeight));
    this.objref.dispatchEvent('move');
}

/////////////////////////////

ScrollTabletDiv.prototype.setHorizontalScroll = function(bar) {
    if(bar) {
        this.hScrollBar = bar;
        bar.objref = this;
        bar.setScrollRange(this.area.scrollWidth);
        bar.setPosition(this.area.scrollLeft);
        addListener(bar, 'change', this.hScrollChange);
    }
    else if(this.hScrollBar) {
        removeListener(this.hScrollBar, 'change', this.hScrollChange);
        this.hScrollBar = null;
    }
}

ScrollTabletDiv.prototype.setHorizontalScrollNoBar = function() {
        bar.objref = this;
        bar.setScrollRange(this.area.scrollWidth);
        bar.setPosition(this.area.scrollLeft);
        //addListener(bar, 'change', this.hScrollChange);
}

ScrollTabletDiv.prototype.refreshPosition = function(){
        if(this.vScrollBar) this.vScrollBar.setPosition(this.area.scrollTop);
        if(this.vScrollTracker) this.vScrollTracker.setPosition(this.area.scrollTop);
        if(this.hScrollBar) this.hScrollBar.setPosition(this.area.scrollLeft);
}

ScrollTabletDiv.prototype.hScrollChange = function(event) {
    this.objref.area.scrollLeft = Math.max(0, Math.min(this.position, this.objref.area.scrollWidth - this.objref.area.offsetWidth));
    this.changePaging();
    this.objref.dispatchEvent('move');
}

/////////////////////////////

ScrollTabletDiv.prototype.resizeArea = function(event) {
    var innit = this instanceof ScrollTabletDiv;
    if (innit) {
        if(this.vScrollBar) this.vScrollBar.setScrollRange(this.area.scrollHeight);
        if(this.hScrollBar) this.hScrollBar.setScrollRange(this.area.scrollWidth);
        this.resetPaging();
        this.changePaging();
    }
}

/////////////////////////////
ScrollTabletDiv.prototype.setPagingElements = function(holderdiv, offbtn, onbtn, leftchev, rightchev) {

    if(typeof(holderdiv) == 'string') holderdiv = document.getElementById(holderdiv);
    if(typeof(leftchev) == 'string') leftchev = document.getElementById(leftchev);
    if(typeof(rightchev) == 'string') rightchev = document.getElementById(rightchev);

    this.dotHolder = holderdiv;
    this.offDot = offbtn;
    this.onDot = onbtn;

    //Makes it so an object is not selectable. DAG 12.16.13
    if(this.dotHolder) {
        this.dotHolder.style.WebkitUserSelect = 'none';
        this.dotHolder.style.KhtmlUserSelect = 'none';
        this.dotHolder.style.MozUserSelect = 'none';
        this.dotHolder.style.OUserSelect = 'none';
        this.dotHolder.style.UserSelect = 'none';
        //this.dotHolder.style.visibility = 'inherit';
        this.dotHolder.setAttribute('unselectable', 'on');
    }

    this.chevronLeft = leftchev;
    this.chevronRight = rightchev;
    if(this.chevronLeft) this.chevronLeft.objref = this;
    if(this.chevronRight) this.chevronRight.objref = this;

    // [Caigoy,022217,QA-14858] 
    if (isUnity || (touchCapable && MOBILE)) {
        if(this.chevronLeft) this.chevronLeft.setAttribute('ontouchstart', 'this.objref.leftChevronClicked(this)');
        if(this.chevronRight) this.chevronRight.setAttribute('ontouchstart', 'this.objref.rightChevronClicked(this)');
    } else {
        if(this.chevronLeft) this.chevronLeft.setAttribute('onclick', 'this.objref.leftChevronClicked(this)');
        if(this.chevronRight) this.chevronRight.setAttribute('onclick', 'this.objref.rightChevronClicked(this)');
    }

    if(this.chevronLeft) this.chevronLeft.style.visibility = 'hidden';
    if(this.chevronRight) this.chevronRight.style.visibility = 'hidden';

    //Makes it so an object is not selectable. DAG 12.16.13
    if(this.chevronRight) {
        this.chevronRight.style.WebkitUserSelect = 'none';
        this.chevronRight.style.KhtmlUserSelect = 'none';
        this.chevronRight.style.MozUserSelect = 'none';
        this.chevronRight.style.OUserSelect = 'none';
        this.chevronRight.style.UserSelect = 'none';
        this.chevronRight.setAttribute('unselectable', 'on');
    }

    if(this.chevronLeft) {
        this.chevronLeft.style.WebkitUserSelect = 'none';
        this.chevronLeft.style.KhtmlUserSelect = 'none';
        this.chevronLeft.style.MozUserSelect = 'none';
        this.chevronLeft.style.OUserSelect = 'none';
        this.chevronLeft.style.UserSelect = 'none';
        this.chevronLeft.setAttribute('unselectable', 'on');
    }

    this.resetPaging();
    this.changePaging();
}

/////////////////////////////
ScrollTabletDiv.prototype.setPagingElementsVertical = function(holderdiv, offbtn, onbtn, topchev, bottomchev) {

    if(typeof(holderdiv) == 'string') holderdiv = document.getElementById(holderdiv);
    if(typeof(topchev) == 'string') topchev = document.getElementById(topchev);
    if(typeof(bottomchev) == 'string') bottomchev = document.getElementById(bottomchev);

    this.dotHolder = holderdiv;
    this.offDot = offbtn;
    this.onDot = onbtn;

    //Makes it so an object is not selectable. DAG 12.16.13
    if(this.dotHolder) {
        this.dotHolder.style.WebkitUserSelect = 'none';
        this.dotHolder.style.KhtmlUserSelect = 'none';
        this.dotHolder.style.MozUserSelect = 'none';
        this.dotHolder.style.OUserSelect = 'none';
        this.dotHolder.style.UserSelect = 'none';
        this.dotHolder.setAttribute('unselectable', 'on');
    }

    this.chevronTop = topchev;
    this.chevronBottom = bottomchev;
    if(this.chevronTop) this.chevronTop.objref = this;
    if(this.chevronBottom) this.chevronBottom.objref = this;

    if(this.chevronTop) this.chevronTop.setAttribute('onclick', 'this.objref.topChevronClicked(this)');
    if(this.chevronBottom) this.chevronBottom.setAttribute('onclick', 'this.objref.bottomChevronClicked(this)');

    if(this.chevronTop) this.chevronTop.style.visibility = 'hidden';
    if(this.chevronBottom) this.chevronBottom.style.visibility = 'hidden';

    //Makes it so an object is not selectable. DAG 12.16.13
    if(this.chevronBottom) {
        this.chevronBottom.style.WebkitUserSelect = 'none';
        this.chevronBottom.style.KhtmlUserSelect = 'none';
        this.chevronBottom.style.MozUserSelect = 'none';
        this.chevronBottom.style.OUserSelect = 'none';
        this.chevronBottom.style.UserSelect = 'none';
        this.chevronBottom.setAttribute('unselectable', 'on');
    }

    if(this.chevronTop) {
        this.chevronTop.style.WebkitUserSelect = 'none';
        this.chevronTop.style.KhtmlUserSelect = 'none';
        this.chevronTop.style.MozUserSelect = 'none';
        this.chevronTop.style.OUserSelect = 'none';
        this.chevronTop.style.UserSelect = 'none';
        this.chevronTop.setAttribute('unselectable', 'on');
    }

    this.resetPagingVertical();
    this.changePaging();
}

/////////////////////////////
/* Added 3/20/2013 by Len */
ScrollTabletDiv.prototype.dotSpacing = function(navSpacing) {
    this.navSpacing = navSpacing;
    this.resetPaging();
    this.changePaging();
}

/////////////////////////////

ScrollTabletDiv.prototype.resetPaging = function() {

    if(this.dotHolder && this.area) {
        this.dotHolder.innerHTML = '';
        var pages = Math.ceil((this.area.scrollWidth - this.hSnap/2)/this.area.offsetWidth);
        if(pages > 1) {
            var dotcnt = (this.maxDots == 0) ? pages : Math.min(this.maxDots, pages);
            for(var pos = 0;pos<dotcnt;pos++) {
                var dot = new Image();
                dot.src = this.offDot;
                dot.objref = this;
                dot.style.margin = '2px';
                /* Added 3/20/2013 by Len */
                dot.style.marginLeft = this.navSpacing + 'px';
                dot.style.marginRight = this.navSpacing + 'px';

                dot.style.cursor = 'pointer';
                dot.setAttribute('onclick','this.objref.dotClicked(this)');
                this.dotHolder.appendChild(dot);
            }
        }
    }
}

ScrollTabletDiv.prototype.resetPagingVertical = function() {

    if(this.dotHolder && this.area) {
        this.dotHolder.innerHTML = '';
        var pages = Math.ceil((this.area.scrollHeight - this.vSnap/2)/this.area.offsetHeight);
        if(pages > 1) {
            var dotcnt = (this.maxDots == 0) ? pages : Math.min(this.maxDots, pages);
            for(var pos=0;pos<dotcnt;pos++) {
                var dot = new Image();
                dot.src = this.offDot;
                dot.objref = this;
                dot.style.margin = '2px';
                /* Added 3/20/2013 by Len */
                dot.style.marginLeft = this.navSpacing + 'px';
                dot.style.marginRight = this.navSpacing + 'px';

                dot.style.cursor = 'pointer';
                dot.setAttribute('onclick','this.objref.dotClicked(this)');
                this.dotHolder.appendChild(dot);
            }
        }
    }
}

/////////////////////////////

ScrollTabletDiv.prototype.gotoPage = function(pagenum) {
    if(pagenum >= 0 && pagenum < this.dotHolder.children.length) {
        var pages = Math.ceil(this.area.scrollWidth/this.area.offsetWidth);
        var dotcnt = (this.maxDots == 0) ? pages : Math.min(this.maxDots, pages);
        if(dotcnt != pages && pagenum == this.dotHolder.children.length - 1)
            this.area.scrollLeft = this.area.scrollWidth - this.area.offsetWidth;
        else
            this.area.scrollLeft = pagenum*this.area.offsetWidth*pages/dotcnt;
        this.changePaging(false);
    }
}

ScrollTabletDiv.prototype.dotClicked = function(dot) {
    var obj = dot.objref;
    for(var i=0;i<obj.dotHolder.children.length;i++) {
        if(dot == obj.dotHolder.children[i]) {
            var pages = Math.ceil(obj.area.scrollWidth/obj.area.offsetWidth);
            var dotcnt = (obj.maxDots == 0) ? pages : Math.min(obj.maxDots, pages);
            // last dot
            if(dotcnt != pages && i == obj.dotHolder.children.length - 1)
                obj.area.scrollLeft = obj.area.scrollWidth - obj.area.offsetWidth;
            else
                obj.area.scrollLeft = i*obj.area.offsetWidth*pages/dotcnt;
            obj.changePaging(false);
            this.setCookie(this.area.id,this.returnPage(),1);
            return;
        }
    }
}

var preventDoubleFireLeft = false;
ScrollTabletDiv.prototype.leftChevronClicked = function(img) {
    if (!preventDoubleFireLeft) {
        var obj = img.objref;
        if (obj.area.scrollLeft == obj.area.scrollWidth - obj.area.offsetWidth) {
            var endOffset = obj.area.scrollWidth;
            while (endOffset > obj.area.offsetWidth) {
                endOffset -= obj.area.offsetWidth;
            }
            obj.area.scrollLeft = obj.area.scrollLeft - endOffset;
        } else {
            obj.area.scrollLeft = Math.max(0, obj.area.scrollLeft - obj.area.offsetWidth);
        }
        obj.changePaging(false);

        preventDoubleFireLeft = true;
        window.setTimeout(function(){preventDoubleFireLeft = false}, 500);
        this.setCookie(this.area.id,this.returnPage(),1);
    }
}

var preventDoubleFireRight = false;
ScrollTabletDiv.prototype.rightChevronClicked = function(img) {
    if (!preventDoubleFireRight) {
        var obj = img.objref;
        obj.area.scrollLeft = Math.min(obj.area.scrollWidth - obj.area.offsetWidth, obj.area.scrollLeft + obj.area.offsetWidth);
        obj.changePaging(false);

        preventDoubleFireRight = true;
        window.setTimeout(function(){preventDoubleFireRight = false}, 500);
        this.setCookie(this.area.id,this.returnPage(),1);
    }
}

ScrollTabletDiv.prototype.topChevronClicked = function(img) {

    var obj = img.objref;
    if(obj.area.scrollTop == obj.area.scrollHeight - obj.area.offsetHeight){
        var endOffset = obj.area.scrollHeight;
            while(endOffset > obj.area.offsetHeight){
                endOffset -= obj.area.offsetHeight;
            }
        obj.area.scrollTop = obj.area.scrollTop - endOffset;
    }else{
        obj.area.scrollTop = Math.max(0, obj.area.scrollTop - obj.area.offsetHeight);
    }
    obj.changePaging(false);
}

ScrollTabletDiv.prototype.bottomChevronClicked = function(img) {

    var obj = img.objref;
    obj.area.scrollTop = Math.min(obj.area.scrollHeight - obj.area.offsetHeight, obj.area.scrollTop + obj.area.offsetHeight);
    obj.changePaging(false);
}
/////////////////////////////
ScrollTabletDiv.prototype.returnPage         =    function(){
    if(this.currDotPos)
        return this.currDotPos;
}


ScrollTabletDiv.prototype.whatPage = function(force) {

    if(force == undefined) force = false;
    var callChange = false;

    if(this.dotHolder) {
                var pages = Math.ceil((this.area.scrollWidth - this.hSnap/2)/this.area.offsetWidth);
        var cpage = Math.round(this.area.scrollLeft/this.area.offsetWidth);
        var dotcnt = (this.maxDots == 0) ? pages : Math.min(this.maxDots, pages);

        var dotpos = Math.max(0, Math.min(Math.ceil(cpage*dotcnt/pages),this.dotHolder.children.length-1));
        if(this.area.scrollLeft == this.area.scrollWidth - this.area.offsetWidth){
            cpage = pages-1;
            dotpos = pages-1;
        }

        if(force || (dotpos != this.currDotPos)) {
            for(var i=0;i<this.dotHolder.children.length;i++) {
                if(i == dotpos) this.dotHolder.children[i].src = this.onDot;
                else this.dotHolder.children[i].src = this.offDot;
            }
            if(this.chevronLeft) this.chevronLeft.style.visibility = (this.area.scrollLeft > this.hSnap/2) ? 'inherit' : 'hidden';
            if(this.chevronRight) this.chevronRight.style.visibility = (this.area.scrollLeft < this.area.scrollWidth - this.area.offsetWidth - this.hSnap/2) ? 'inherit' : 'hidden';
            this.currDotPos = dotpos;
            callChange = true;
        }
    } else {
        //    added ajf 5/21/2013
        if(this.chevronLeft) this.chevronLeft.style.visibility = (this.area.scrollLeft > 0) ? 'inherit' : 'hidden';
        if(this.chevronRight) this.chevronRight.style.visibility = (this.area.scrollLeft < this.area.scrollWidth - this.area.offsetWidth - this.hSnap/2) ? 'inherit' : 'hidden';
    }

    if(this.hSnap > 0) {
        var items = Math.round(this.area.scrollWidth/this.hSnap);
        var pos = Math.round(items*(1 - this.area.scrollLeft/this.area.offsetWidth));
        if(pos != this.hItemPos) callChange = true;
        this.hItemPos = pos;
    }

    if(this.vSnap > 0) {
        var items = Math.round(this.area.scrollHeight/this.vSnap);
        var pos = Math.round(items*(1 - this.area.scrollTop/this.area.offsetHeight));
        trace("pos:" + pos);
        if(pos != this.vItemPos) callChange = true;
        this.vItemPos = pos;
    }

    if(dotpos > dotcnt) {
                this.currDotPos = dotcnt-1;
        } else if(dotpos < 0) {
                this.currDotPos = 0;
        }

    if(callChange) this.dispatchEvent('change');
}

ScrollTabletDiv.prototype.whatPageVertical = function(force) {

    if(force == undefined) force = false;
    var callChange = false;

    if(this.dotHolder) {
        var pages = Math.ceil(this.area.scrollHeight/this.area.offsetHeight);
        var cpage = Math.round(this.area.scrollTop/this.area.offsetHeight);
        var dotcnt = (this.maxDots == 0) ? pages : Math.min(this.maxDots, pages);
        var dotpos = Math.max(0, Math.min(Math.ceil(cpage*dotcnt/pages),this.dotHolder.children.length-1));
        if(this.area.scrollTop == this.area.scrollHeight - this.area.offsetHeight){
            cpage = pages-1;
            dotpos = pages-1;
        }

        if(force || (dotpos != this.currDotPos)) {
            for(var i=0;i<this.dotHolder.children.length;i++) {
                if(i == dotpos) this.dotHolder.children[i].src = this.onDot;
                else this.dotHolder.children[i].src = this.offDot;
            }
            if(this.chevronTop) this.chevronTop.style.visibility = (this.area.scrollTop > this.vSnap/2) ? 'inherit' : 'hidden';
            if(this.chevronBottom) this.chevronBottom.style.visibility = (this.area.scrollTop < this.area.scrollHeight - this.area.offsetHeight - this.vSnap/2) ? 'inherit' : 'hidden';
            this.currDotPos = dotpos;
            callChange = true;
        }
    } else {
        //    added ajf 5/21/2013
        if(this.chevronTop) this.chevronTop.style.visibility = (this.area.scrollTop > 0) ? 'inherit' : 'hidden';
        if(this.chevronBottom) this.chevronBottom.style.visibility = (this.area.scrollTop < this.area.scrollHeight - this.area.offsetHeight - this.vSnap/2) ? 'inherit' : 'hidden';
    }

    if(this.hSnap > 0) {
        var items = Math.round(this.area.scrollWidth/this.hSnap);
        var pos = Math.round(items*(1 - this.area.scrollLeft/this.area.offsetWidth));
        if(pos != this.hItemPos) callChange = true;
        this.hItemPos = pos;
    }

    if(this.vSnap > 0) {
        var items = Math.round(this.area.scrollHeight/this.vSnap);
        var pos = Math.round(items*(1 - this.area.scrollTop/this.area.offsetHeight));
        trace("pos:" + pos);
        if(pos != this.vItemPos) callChange = true;
        this.vItemPos = pos;
    }

    if(callChange) this.dispatchEvent('change');
}

/////////////////////////////

ScrollTabletDiv.prototype.changePaging = function(useTween) {

    if(useTween == undefined) useTween = true;

    if(this.vSnap > 0) {
        var newTop = Math.round(this.area.scrollTop/this.vSnap)*this.vSnap;
        if(this.area.scrollTop != newTop) {
            if(useTween) {
                var vScrollTween = new Tween(this.area, 'scrollTop', this.area.scrollTop, newTop, 300);
                addListener(vScrollTween, 'finish', function(){
                    if (vScrollTween.position == 0) {
                         vScrollTween.obj.objref.chevronTop.style.visibility = 'hidden';
                     }
                });
            } else {
                this.area.scrollTop = newTop;
            }
        }
        this.whatPageVertical(true);
        this.hideOrShowTopChevron();
        return;
    }

    if(this.hSnap > 0) {
        var newLeft = Math.round(this.area.scrollLeft/this.hSnap)*this.hSnap;
         if(this.area.scrollLeft != newLeft) {
             if(useTween) {
                 var hScrollTween = new Tween(this.area, 'scrollLeft', this.area.scrollLeft, newLeft, 300);
                 addListener(hScrollTween, 'finish', function(){
                     if (hScrollTween.position == 0) {
                         hScrollTween.obj.objref.chevronLeft.style.visibility = 'hidden';
                     }
                 });
             } else {
                 this.area.scrollLeft = newLeft;
             }
         }
        this.hideOrShowLeftChevron();
     }
    if(this.vSnap<=0){
        this.whatPage(true);
    }
}

///////////////////////////////////////////////////////////////////
// function to check the current position of the element and base on the position to show or hide the chevrons
ScrollTabletDiv.prototype.hideOrShowTopChevron = function() {
    if (this.chevronTop) {
        var newTop = Math.round(this.area.scrollTop/this.vSnap)*this.vSnap;
        if (newTop === 0) {
            this.chevronTop.style.visibility = 'hidden';
        } else {
            this.chevronTop.style.visibility = 'inherit';
        }
    }
}

ScrollTabletDiv.prototype.hideOrShowLeftChevron = function() {
    if (this.chevronLeft) {
        var newLeft = Math.round(this.area.scrollLeft/this.hSnap)*this.hSnap;
        if (newLeft === 0) {
            this.chevronLeft.style.visibility = 'hidden';
        } else {
            this.chevronLeft.style.visibility = 'inherit';
        }
    }
}
///////////////////////////////////////////////////////////////////
// Cookie Setting
ScrollTabletDiv.prototype.setCookie = function(cname,value,exdays) {
    var exdate = new Date();
    if(isNaN(exdays)) exdays = 365;
    exdate.setDate(exdate.getDate() + exdays);
    var domain = '.'+document.domain.split('.').slice(-2).join('.');
    document.cookie = cname+"="+encodeURI(value)+"; expires="+exdate.toUTCString()+"; domain="+domain+"; path=/";
}

ScrollTabletDiv.prototype.removeCookie = function(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}
/////////////////////////////

enableEventHandling(ScrollTabletDiv);
