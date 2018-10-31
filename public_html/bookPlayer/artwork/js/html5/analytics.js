var Analytics = {
    trackableElement: false,

    init: function (digitalData) {
        this.setDigitalData(digitalData);
    },

    setDigitalData: function (digitalData) {
        if(typeof digitalData !== 'undefined')
            window.digitalData = digitalData;
    },

    start: function () {
        this.startClickTracking(document.body);
    },

    trackPageView: function () {
        console.log('Tracking page view');
        if(typeof window.digitalData != 'undefined' && window.digitalData['valid'] && !window.deferPageTracking) {
            this._dtmTrack('page view');
        }
        else
            window.deferPageTracking = false;
    },

    /**
     * Start tracking for clicks.
     * @param {HTMLElement} container DOM container where this should track for click events.
     */
    startClickTracking: function (container) {
        if (typeof touchCapable != 'undefined') {
            var mouseClickDown = (touchCapable) ? 'touchstart' : 'mousedown';
            var mouseClickUp = (touchCapable) ? 'touchend' : 'mouseup';
        } else {
            var mouseClickDown = 'mousedown';
            var mouseClickUp = 'mouseup';
        }
        container.addEventListener(mouseClickDown, this._elementClickStart.bind(this));
        container.addEventListener(mouseClickUp, this._elementClickEnd.bind(this));
    },

    /**
     * Set vars to digitalData.
     * @param value To be pair with keys
     * @param key1 root elements of object - page, transaction or user
     * @param key2 child
     * @param key3 child of child
     */
    dtmSetDigitalDataValue: function(value, key1, key2, key3)
    {
        if (typeof digitalData != 'undefined') {
            if(typeof key3 != 'undefined')
            {
                if (typeof digitalData[key1][key2] != 'undefined') {
                    if (value)
                        value = value.toString().replace(/([A-Z])/g, " $1").toLowerCase();
                    digitalData[key1][key2][key3] = value;
                }
            }
            else if(typeof key2 != 'undefined')
            {
                if (typeof digitalData[key1] != 'undefined') {
                    if (value)
                        value = value.toString().replace(/([A-Z])/g, " $1").toLowerCase();
                    digitalData[key1][key2] = value;
                }
            }
            else
            {
                if (value)
                    value = value.toString().replace(/([A-Z])/g, " $1").toLowerCase();
                digitalData[key1] = value;
            }
        }
    },

    /**
     * Set vars to track.
     * @param  keyPair ObjArray of data var pairs
     * @param  event
     */
    trackVars: function (keyPair, event) {
        for(var i = 0; i < keyPair.length;i++){
            this._dtmVars(keyPair[i].key, keyPair[i].val);
        }
        this._dtmTrack(event);
    },

    trackClick: function (linkData) {
        this.trackEvent('@linkClick', {'linkName': linkData});
    },
    
    trackPageEvent: function (eventName) {
        if (eventName) {
            this._dtmTrack(eventName);
        } else {
            // console.log('trackPageEvent: eventName is FALSE');
        }
    },

    trackEvent: function (eventName, kvp, params) {
        if (eventName && typeof digitalData != 'undefined') {
            if(!kvp)
                kvp = {};

            var args = {
                'master_account_member_id': digitalData.user.profile.memberId,
                'member_id': digitalData.user.profile.userId,
                'track_cookie': getCookie('track'),
                'url': eventName,
                'page_info_key': digitalData.page.pageInfo.urlPath,
                'kvp': kvp,
                'referer': window.location.href, 
                'code_base': 'html5'
            };

            if(!params)
                params = {};

            for (var attrname in params) {
                args[attrname] = params[attrname];
            }

            if(typeof language != 'undefined' && language)
                args['displayed_language'] = language;

            var area = getCookie('pageArea');
            if(area)
                args['area'] = area.replace(/\+/g, " ");

            if(typeof digitalData.page.pageInfo.pageDetail != 'undefined')
                args['page_detail'] = digitalData.page.pageInfo.pageDetail;

            args = [args];
            args = [args];
            this._apiEventLog(eventName, args);
        }
    },

    trackVideo: function (event, kvp) {
        var isExample = window.location.search.indexOf('example=true') != -1;

        if(isExample) {
            //don't track videos if theyre invoked as examples
            return;
        }
        // Set correct eventName
        var eventName = '@videoStart';
        if(event === 'complete')
            eventName = '@videoComplete';

        if(typeof kvp === 'undefined') kvp = {};

        // If there is no kvp.videoLocation passed in, default to the digitalData.page.pageInfo.pageDetail if set and is not blank
        if(typeof kvp.videoLocation === 'undefined' && typeof digitalData !== 'undefined' && typeof digitalData.page !== 'undefined' && typeof digitalData.page.pageInfo !== 'undefined' && typeof digitalData.page.pageInfo.pageDetail !== 'undefined' && digitalData.page.pageInfo.pageDetail)
            kvp.videoLocation = digitalData.page.pageInfo.pageDetail;

        this.trackEvent(eventName, kvp);
    },

    trackVideoComplete: function (kvp) {
        this.trackVideo('complete', kvp);
    },

    trackVideoStart: function (kvp) {
        this.trackVideo('start', kvp);
    },

    setDtmArgs: function (key1, key2, key3, value) {
        if (key1 && key2 && key3 && value) {
            this._dtmArgs(key1, key2, key3, value);
        }
    },

    setDtmVars: function (key, value) {
        if (key && value) {
            this._dtmVars(key, value);
        } else {
            // console.log('setDtmVars: Either one or both key and value are FALSE');
        }
    },

    setPageDetail: function(pageDetail) {
        if (pageDetail) {
            this._dtmArgs('page','pageInfo','pageDetail', pageDetail);
        } else {
            // console.log('setPageDetail: pageDetail is FALSE');
        }
    },

    setSatelliteCookie: function(cookieName, cookieValue, cookieExpirationDay) {
        if (typeof _satellite != 'undefined') {
            if (cookieName && cookieValue) {
                if (cookieExpirationDay && Number.isInteger(cookieExpirationDay)) {
                    _satellite.setCookie(cookieName, cookieValue, cookieExpirationDay);
                } else {
                    _satellite.setCookie(cookieName, cookieValue, 1);
                }
                // console.log('setSatelliteCookie: Analystics cookie set cookieName: "' + cookieName + '" cookieValue: "' + cookieValue + '"');
            } else {
                // console.log('setSatelliteCookie: Analystics cookie not set cookieName: "' + cookieName + '" cookieValue: "' + cookieValue + '"');
            }
        }
    },

    getSatelliteCookie: function(cookieName) {
        if (typeof _satellite != 'undefined') {
            if (cookieName) {
                var cookieValue = _satellite.readCookie(cookieName)
                // console.log('getSatelliteCookie: reading Analystics Cookie cookieName: "' + cookieName + '" cookieValue: "' + cookieValue + '"');
                return cookieValue;
            } else {
                // console.log('getSatelliteCookie: cookieName is FALSE');
            }
        }
    },

    removeSatelliteCookie: function(cookieName) {
        if (typeof _satellite != 'undefined') {
            if (cookieName) {
                _satellite.removeCookie(cookieName);
                // console.log('removeSatelliteCookie: cookie "' + cookieName + '" removed');
            } else {
                // console.log('removeSatelliteCookie: cookieName is FALSE');
            }
        }
    },

    /**
     * From this line below are all private function used by the analytics
     */

    _apiEventLog: function (eventName, arguments) {
        arguments = JSON.stringify(arguments);
        var params = {};
        params.arguments = arguments;
        ApiService.call('event_log', params);
    },

    _elementClickStart: function (event) {
        if (event.target.getAttribute('data-tracking')) {
            this.trackableElement = event.target;
        }
    },

    _elementClickEnd: function (event) {
        if (this.trackableElement) {
            this.trackClick(event.target.getAttribute('data-tracking'));
            this.trackableElement = false;
        }
    },

    /**
     * @private
     */
    _dtmTrack: function (eventName) {
        console.log('in dtm track');
        if (typeof _satellite != 'undefined') {
            _satellite.track(eventName);
        }
    },

    /**
     * @private
     */
    _dtmArgs: function (key1, key2, key3, value) {
        if (typeof digitalData != 'undefined') {
            if (typeof digitalData[key1][key2] != 'undefined') {
                if (value) {
                    value = value.toString().replace(/([A-Z])/g, " $1").toLowerCase();
                }
                digitalData[key1][key2][key3] = value;
            }
        }
    },

    /**
     * @private
     */
    _dtmVars: function (key, value) {
        if (typeof digitalData != 'undefined') {
            if (typeof _satellite != 'undefined') {
                value = value.toString().replace(/([A-Z])/g, " $1").toLowerCase();
                _satellite.setVar(key, value);
            }
        }
    },
}
