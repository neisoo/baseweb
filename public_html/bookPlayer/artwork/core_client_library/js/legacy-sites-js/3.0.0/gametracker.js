/**
 * GameTracker records activity data and invokes TicketMachine
 * @param {integer} cid          Activity ID
 * @param {integer} gameid       ID for current playthrough
 * @param {string}  instance     An image path (sometimes)
 * @param {integer} level        Activity difficulty
 * @param {string}  instanceName Used by tracking/analytics
 * @param {integer} groupid      Group CID (Number after comma in CID URL param)
 * @param {object}  options      Sidepanel options for TicketMachine (not used)
 * @param {string}  gotoURL      Override Continue Btn URL
 */
function GameTracker(cid, gameid, instance, level, instanceName, groupid, options, gotoURL) {
    'use strict';

    /* TOGGLE LOGGING */
    this.debug = /\.test\.|\.qtest\.|local\./.test(location.href) || 0;

    /* constructor args */
    this.cid               = cid          || 0;                                   // StartActivity:$arg_activity_id
    //*** watch for issues here, any unforeseen consequences of conflating this.gameid with this.game_result_id
    this.game_result_id    = gameid ? parseInt(gameid) : 0;                       // EndActivity:$arg_log_id, CancelActivity:$arg_game_result_id
    this.gameid            = this.game_result_id;
    this.instance          = instance ? instance.replace(WEBHOST + "/", "") : ''; // StartActivity:$arg_instance
    this.level             = level        || '';                                  // StartActivity:$arg_activity_level
    this.instanceName      = instanceName || null;                                // StartActivity:$arg_activity_name
    this.groupid           = groupid      || (function(){                         // EndActivity:$arg_group_id
        var gid = location.search.match(/cid=\d+?,(\d+)/); /* if unspecified, parse url */
        if (gid && gid.length > 1) return parseInt(gid[1]);
        return 0;
    })();
    this.sidepanel_options = options      || 0; /* not used */
    this.goToUrl           = gotoURL      || null; /* overrides tm continue */

    /* data */
    this.points                          = 0;  /* Tickets earned */
    this.total_points = this.totalpoints = 0;  /* Total, including tickets earned */
    this.meta_type                       = ''; /* Used by TM MORE btn */
    this.custompoint                     = -1; /* added by TJ on 3/22/2013, to give custom number ticket */
    this.scrubbedPenalty = false;        //Added to make the custompoint value useful when set to zero if the scrubbed percentage of a video is less than .8
    this.score                           = 0;  /* Used by some activities (sent to endActivity) */
    this.pathid                          = parseInt(getCookie('pathid')) || 0;
    this.lastarea                        = getCookie('lastactivityarea');
    this.petid                           = /petpark/.test(this.lastarea) ? parseInt(getCookie('petItemId')) : 0;
    this.lessonId                        = 0;
    this.lessonType                      = getCookie('lessonType') || ''; //*** INTEGRATES c034dfec 02dacb20
    this.teacherslessonsid               = /students_lessons|myactivities|mylessons/.test(this.lastarea) ? getCookie('teachers_lessons_id') : 0;
    this.memberlessonid                  = /students_lessons|myactivities|mylessons|schools/.test(this.lastarea) ? getCookie('member_lesson_id') : 0;
    this.continueTo                      = getCookie('continueTo');
    this.nextBasicsUrl                   = null; /* ContinueTo override for Basics; Set by GameTracker.setNextBasicsUrl */
    this.language                        = language || 'en';
    this.link                            = location.href.replace(location.origin, ''); /* Used by TM:addToFavorites */
    this.bid = (function(){
        var bid = location.search.match(/bid=(\d+)/);
        if (bid && bid.length > 1) return parseInt(bid[1]);
        return 0;
    })();
    this.platform = (function () {
        if      (!USINGAPP && !APP_VERSION)   return 'desktop';
        else if (!!IOS_VERSION && !isAndroid) return 'ios';
        else if (!!isAndroid)                 return 'android';
    })();

    /* tracking data */
    this.page_info_key = window.location.pathname.replace(/^\//, '');
    this.page_detail   = '';
    //this.page_detail = digitalData.page.pageInfo.pageDetail; //*** present, but commented out in 2.0 code
    //this.next_teacher_lesson_activity_id = 0;
    //*** KNOWN ISSUE: pageDetail/page_detail prop not being set on 2.0 or 3.0

    /* flags */
    this.posted       = false;
    this.showTM       = false;
    this.mylessonpath = false;

    /* deprecated */
    this.icon = '';

    /* international school 1.0 */
    this.activity_info = null;
    this.content_info = null;
    this.init();

    /* GLOBAL FOR DEBUGGING */
    if (this.debug) window.GAMETRACKER = this;
}

/**
 * Legacy Event Handling
 * Required by all activities that listen for doReplay event
 * Other listeners: cutout.php:'gt_canceledGame', word_pairs.js:'posted'
 */
enableEventHandling(GameTracker);

/**
 * Updated Event Dispatcher
 * Used to dispatch events to the TicketMachine
 */
GameTracker.prototype.gtEmitter = new EventEmitter2();

/* DATA & PARSING METHODS */

/* Add commas at thousand marks */
GameTracker.prototype.addCommas = function (n) {
    if (typeof parseInt(n) === 'number') {
        return n.toString().replace(/(\d(?=(?:\d{3})+(?!\d)))/g, '$1,');
    }
};

/* international school 1.0 */
GameTracker.prototype.init = function () {
    ApiService.call('activity_get_engine_info', {
        arguments: JSON.stringify([this.cid])
    }, this.callbackGetActivityInfo.bind(this));
};

/* international school 1.0 */
GameTracker.prototype.callbackGetActivityInfo = function (data) {
    if (data.payload.activity_info) this.activity_info = data.payload.activity_info;
    if (data.payload.content_info) this.content_info = data.payload.content_info;
    this.dispatchEvent('gt_info_ready');
}

/* international school 1.0 */
GameTracker.prototype.getActivityInfo = function () {
    var info = {};
    info.activityInfo = this.activity_info;
    info.contentInfo = this.content_info;
    return info;
}

/**
 * Get/parse learningActivities cookie (e.g. for getPathIdAndLessonId)
 * @param  {integer} index Only return specific segment [0-2] (otherwise returns array)
 * @return {array|string}       Array from split string, or string
 * Note: Example return data ["lessonInprogress", "2977", "0"]
 */
GameTracker.prototype.getLessonInfo = function (index) {
    var learningActivities = getCookie('learningActivities').split("ABC") || false;
    if (isNaN(index)) return learningActivities;
    if (index in learningActivities) return learningActivities[index];
    else return false;
};

/**
 * Get path int for current user's grade level
 * @return {string} Path code (e.g. "109")
 */
GameTracker.prototype.getPathID = function () {
    return getCookie('pathid') || (uinfo.pathinfo.pathid || 0);
};

/**
 * Get BID (Basics only) from URL param
 * @return {integer} BID
 */
GameTracker.prototype.getBid = function () {
    var bid = location.search.match(/bid=(\d+)/);
    if (bid && bid.length > 1) return parseInt(bid[1]);
    return 0;
};

/**
 * Set gt.bid prop via Promised AJAX response
 * @return {object|boolean} Promise|false
 * Note: Basics only; used to override TM CONTINUE btn
 */
GameTracker.prototype.setNextBasicsUrl = function () {
    this.bid = this.getBid();
    if (!this.bid) return false;
    return new Promise(function (resolve, reject) {
        ajax.call(this, '/html5/xml/gametracker.php', {
            action: 'getNextBasicsUrl',
            bid: this.bid,
            cid: this.cid,
        }, function (data) {
            if (data && data.goToUrl) { //*** INTEGRATES: 395cb6e4
                this.nextBasicsUrl = data.goToUrl.replace(/^([^/])/,'/$1');
            }
            if (data) resolve(data);
            else reject('No data returned'); //***
        }.bind(this), this);
    }.bind(this));
};

/**
 * Normalize area strings for use as object keys
 * @param  {string} str Area string to check
 * @return {string}     Expected area string
 */
GameTracker.prototype.normalizedAreaString = function (str) {
    if (!str) return false;
    var areaMap = {
        path             : 'path',
        learningpath     : 'path',
        petpark          : 'petpark',
        myactivities     : 'myactivities',
        students_lessons : 'students_lessons',
        mylessons        : 'mylessons',
        default          : 'path',
    };
    if (!str in areaMap) var str = 'default';
    if (areaMap[str]) return areaMap[str].replace(/\+/g, " ");
};

/**
 * Return obj based on lastarea value (e.g. for API)
 * @param  {string} lastarea From lastactivityarea cookie
 * @return {object}          Obj with pathid, lessonid params
 */
GameTracker.prototype.getPathIdAndLessonId = function (lastarea) {
    var lastarea  = lastarea || this.lastarea,
        returnObj = {},
        pathid    = this.getPathID(),
        lessonid  = this.getLessonInfo(1) || 0,
        lastarea  = this.normalizedAreaString(lastarea);

        /* set based on lastarea */
        switch (lastarea) {
            case 'path' :
            case 'petpark' :
            case 'learningpath' :
                returnObj.pathid   = pathid || 0;
                returnObj.lessonid = lessonid || (uinfo.pathinfo.lessonid || 0);
                break;
            case 'myactivities' :
            case 'students_lessons' :
            case 'mylessons' :
                returnObj.pathid   = pathid || 0;
                returnObj.lessonid = this.teacherslessonsid || 0; //*** 7063e75c
                break;
            default:
                returnObj.pathid   = 0;
                returnObj.lessonid = 0;
        }

        /* set based on lessonType (can override area switch above) */
        switch (this.lessonType) {
            case 'assessment':
                returnObj.lessonid = this.memberlessonid || 0;
                break;
            case 'teacher':
                returnObj.lessonid = this.teacherslessonsid || 0;
                break;
        }

        /* set gt.lessonId */
        this.lessonId = returnObj.lessonid; //***

        return returnObj;
};

/**
 * Gathers boilerplate and custom data for API requests
 * @param  {string} action Required: Specify action to get corresponding data ('start'|'end'|'cancel')
 * @return {object}        Params needed by endpoints: /User/StartActivity, /User/EndActivity, /User/CancelActivity
 */
GameTracker.prototype.getApiParams = function (action) {
    if (!action) throw new Error("No action specified");//***
    // if (!action) throw 'No action specified';//***

    var params         = {},
        analytics_info = {},
        pathLessonObj  = this.getPathIdAndLessonId(),
        argSets;

    analytics_info.track_cookie  = getCookie('track');
    analytics_info.area          = getCookie('pageArea').replace(/\+/g, ' ');
    analytics_info.referer       = window.location.href;
    analytics_info.page_info_key = this.page_info_key;
    analytics_info.page_detail   = this.page_detail; //*** naming in live version doesn't match actual prop
    analytics_info.code_base     = 'html5';

    analytics_info.kvp = {
        site     : 'html5',
        pathid   : pathLessonObj.pathid,
        lessonid : pathLessonObj.lessonid,
    };

    argSets = {

        /* StartActivity */
        start  : function () {
            var args = [
                this.cid,                                  // $arg_activity_id
                this.instanceName,                         // $arg_activity_name
                this.level,                                // $arg_activity_level
                pathLessonObj.pathid,                      // $arg_path_id
                pathLessonObj.lessonid,                    // $arg_lesson_id
                this.instance,                             // $arg_instance
                window.location.pathname,                  // $arg_url
                this.lastarea,                             // $arg_area
                Math.round((new Date()).getTime() / 1000), // $arg_timestamp
                analytics_info,                            // $arg_analytics_info
            ];

            //when a new Schools lesson instance needs to be started, we pass in teacher_path_lesson_instance_id arg to API
            //and a new classworkd_member_lesson_d and homework_member_lesson_id will be returned
            if (this.lessonType === 'assessment') {
                var argOptionalArguments = {};

                if (pathLessonObj.lessonid) argOptionalArguments.member_lesson_id = pathLessonObj.lessonid;

                var teacherPathLessonInstanceId = getCookie('teacher_path_lesson_instance_id');
                if (teacherPathLessonInstanceId) {
                    //get the value and purge the cookie
                    argOptionalArguments.teacher_path_lesson_instance_id = teacherPathLessonInstanceId;
                    setCookie('teacher_path_lesson_instance_id', '', -1);
                }
                args.push(argOptionalArguments);
            }

            return args;
        },

        /* EndActivity (post) */
        end    : function () {
            var args = [
                this.game_result_id,                       // $arg_log_id
                this.score,                                // $arg_score
                this.custompoint,                          // $arg_custom_points
                this.groupid,                              // $arg_group_id
                this.lessonId,                             // $arg_teacher_lesson_id //*** make conditional, per 02dacb20
                Math.round((new Date()).getTime() / 1000), // $arg_timestamp
                analytics_info,                            // $arg_analytics_info
            ];

            var json_obj = {};
            /* lessonid val determined by getPathIdAndLessonId; this condition
            determines if it's pushed to args; see NOTE:02dacb20 */
            if(this.lessonType === 'assessment') {
                json_obj.member_lesson_id = pathLessonObj.lessonid;
            }
            json_obj.pet_id = this.petid;

            args.push(json_obj);

            return args;
        },

        /* CancelActivity */
        cancel : function () {
            var args = [
                this.game_result_id,                       // $arg_game_result_id
                analytics_info,                            // $arg_analytics_info
            ];

            /* lessonid val determined by getPathIdAndLessonId; this condition
            determines if it's pushed to args; see NOTE:02dacb20 */
            this.lessonType === 'assessment' && args.push({
                member_lesson_id: pathLessonObj.lessonid
            });

            return args;
        },
    };

    return (function (_this) {
        if (action && action in argSets && typeof argSets[action] === 'function') {
            params.arguments = JSON.stringify(argSets[action].call(_this)); //*** WIP3: optimization
            return params;
        }
        return false;
    })(this);
};

/**
 * Update GT props with API data (e.g. on start and end callbacks)
 * @param  {object} data Response
 *
 * start:  game_result_id
 * end:    totalpoints, total_points, meta_type, next_teacher_lesson_activity_id(?)
 * cancel: null
 */
GameTracker.prototype.responseDataUpdate = function (data) {
    if (!data) throw new Error("No data"); //***

    /* If response data obj has a prop, update corresponding prop in gt */
    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            this[k] = data[k];
        }
    }

    /* in case legacy references gt.gameid */
    this.gameid = this.game_result_id;

    /* in case legacy references gt.totalpoints */
    this.totalpoints = this.total_points;
};

/**
 * Run/set arbitrary funcs/props based on area
 * @param {string} area (e.g. lastactivityarea cookie value)
 * Note: Called by start method
 */
GameTracker.prototype.setAreaProps = function (area) {
    var area = area ? area : this.lastarea;

    /* Map area props */
    var areaProps = {

        path: function () {
            var lessonInfo = this.getLessonInfo(); // from cookie: learningActivities
            this.pathid    = parseInt(getCookie('pathid'))     || 0;
            this.lessonId  = lessonInfo.length ? lessonInfo[1] :  0;
            return 'path';
        },

        petpark: function () {
            this.pathid = parseInt(getCookie('pathid')) || 0;
            this.petid = parseInt(getCookie('petItemId')) || 0;
            return 'petpark';
        },

        students_lessons: function () {
            this.mylessonpath = true;
            this.teacherslessonsid = getCookie('teachers_lessons_id') || 0;
            return 'students_lessons';
        },

        myactivities: function () {
            this.mylessonpath = true;
            this.teacherslessonsid = getCookie('teachers_lessons_id') || 0;
            return 'myactivities';
        },

        basics: function () {
            //*** for continue override in basics/sightwords
            return 'basics';
        },

        default: function () {
            return 'default';
        },
    };

    if (area in areaProps &&
        typeof areaProps[area] === 'function') {
        return areaProps[area].call(this); //*** WIP3
    }
};

/**
 * Update ticket count in shell
 * @param  {integer} points Points/tickets earned
 */
GameTracker.prototype.updateShell = function (points) {
    if (this.debug && isNaN(points) && isNaN(parseInt(this.total_points))) console.log("No valid points/ticket number available"); //***

    var points        = !isNaN(points) ? parseInt(points) : parseInt(this.total_points),
        pointsDisplay = this.addCommas(points),
        shellCounter  = null,
        updateFuncs   = {

            desktop : function () {
                shellCounter = document.querySelector('#user_points');
                if (shellCounter) shellCounter.innerHTML = pointsDisplay;
                // shellCounter.innerHTML = shellCounter.textContent = pointsDisplay;
            },

            ios     : function () {
                if (isUnity) {
                    unityCall.validateLogin();
                } else if (APP_VERSION >= 1.97) {
                    appCall('mml:#shell_user_points.text=' + pointsDisplay);
                    appCall('validateUserInfo'); //Make Sure to call so App knows to update it's internal userinfo for ticket total
                }
            },

            android : function () {
                if (isUnity) {
                    unityCall.validateLogin();
                } else if (APP_VERSION >= 1.97) { //*** is this appropriate for android? inherited from 2.0.0
                    appCall('mml:#shell_user_points.text=' + pointsDisplay);
                    appCall('validateUserInfo'); //Make Sure to call so App knows to update it's internal userinfo for ticket total
                }
            },
    };

    if (typeof updateFuncs[this.platform] === 'function') {
        updateFuncs[this.platform]();
    }

};

/* API CALLS */

/* START activity (API payload should contain game_result_id) */
GameTracker.prototype.start = function () {
    /* set arbitrary props based on area, etc. */
    this.setAreaProps();

    /* map additional start funcs by platform */
    var startFuncs = {
        /* DESKTOP:START */
        desktop : null,
        /* IOS:START */
        ios     : null,
        /* ANDROID:START */
        android : function () {
            if (!isUnity) {
                this.goToUrl = this.nextBasicsUrl; // QA-9329
                var args =  "cid="       + this.cid            +
                    ",gameid="   + this.game_result_id +
                    ",instance=" + this.instance       +
                    ",level="    + this.level          +
                    ",lastarea=" + this.lastarea       +
                    ",groupid="  + this.groupid        + // Added groupid in order to pass the group down into log_curriculum_activity() in global_func.inc- Clark 03/10/2014
                    ",goToUrl="  + this.goToUrl        +
                    ",pathid="   + this.pathid         +
                            ",lessonid=" + this.lessonId;

                if (this.lessonType === 'assessment') {
                    args += ",memberLessonId=" + this.memberlessonid;
                }

                Android.startActivity(args);
            }
            return;
        }.bind(this),
    },
    /* Mapped func called in conditional */
    runStartFuncs = function () {
        /* Send generic API call */
        var isExample = /[&\?]example=(1|true)/.test(window.location.search);
        if (!isExample) {
            ApiService.call('user_start_activity', this.getApiParams('start'), function (data) {
                var data = data.payload;
                this.callbackStartActivity(data);
            }.bind(this));
        }

        /* Run platform-specific function */
        if (this.platform in startFuncs &&
            typeof startFuncs[this.platform] === 'function') {
            startFuncs[this.platform]();
        }
    }.bind(this),

    /* Try to create Promise */
    nextBasics = this.setNextBasicsUrl();
    this.goToUrl = nextBasics; //***
    /* If setNextBasicsUrl returned Promise, resolve with runStartFuncs */
    if (nextBasics) {
        nextBasics
            .then(runStartFuncs)
            .catch(function (error) {
                throw (error);
            });
    }
    /* Else proceed immediately */
    else runStartFuncs();
};

/**
 * END/POST activity; Send endActivity data to API
 * Note: Also available as post method for legacy
 */
GameTracker.prototype.end = function () {
    this.debug && !this.game_result_id > 0 && console.log('No Game ID'); //***

    /* update petpark if appropriate */
    //this.petid && /petpark/i.test(this.lastarea) && this.postToPetPark();

    var isExample = /[&\?]example=(1|true)/.test(window.location.search);

    if (isExample) {
        this.callbackEndActivity({ points: Math.random().toString().slice(2) % 3 + 1 });
    } else {
        if (this.game_result_id) {
            ApiService.call('user_end_activity', this.getApiParams('end'), function (data) {
                var data = data.payload;
                this.callbackEndActivity(data);
            }.bind(this));
        }
    }
};
GameTracker.prototype.post = GameTracker.prototype.end;

/* post activity data specific to petpark; legacy (will remain an AJAX call) */
/* Deprecated */
GameTracker.prototype.postToPetPark = function () {
    this.petid && ajax('/xml/petpark.php', {
        action: "give_pet_exp",
        useditemid: this.petid,
    }, function (data) {
        this.giveExpCallback(data);
    }.bind(this), this);
};

/* Legacy; referenced by templates, don't change name (called by postToPetPark) */
/* Deprecated */
GameTracker.prototype.giveExpCallback = function (data) {
    //Currently not used by Analytics
};

/* CANCEL activity (API payload should contain null) */
GameTracker.prototype.cancel = function () {
    // if (!this.game_result_id > 0) throw 'No game_result_id set';//*** /* 011916: puzzle activities trip this error */
    // this.debug && !this.game_result_id > 0 && console.log('%c'+'No Game ID', 'color:red;'); //***
    if (!this.game_result_id > 0) return false;

    ApiService.call('user_cancel_activity', this.getApiParams('cancel'), function (data) {
        if (data.success !== 'TRUE') throw new Error("cancelActivity error");//***
        if (data.success === 'TRUE') {
            var data = data.payload;
            this.callbackCancelActivity(data);
        }
    }.bind(this));

    /* Send cancel to Android app */
    if (!isUnity) {
        this.platform === 'android' && Android.cancelActivity();
    }

    /* Legacy */
    this.dispatchEvent('gt_canceledGame');
};

/**
 * Runs on startActivity API response
 * @param  {object} data
 */
GameTracker.prototype.callbackStartActivity = function (data) {//***WIP22:reduce redundancy
    if (!data) throw new Error("No data");//***
    if (!this.platform) throw new Error('No platform info set');//***
    if (!!data.error) throw new Error('StartActivity returned error: '  + data.error.code);

    var funcMap = {
        desktop : function () {
                /* tracking */
                dtmArgs('page', 'pageInfo', 'cid', this.cid);
                dtmArgs('page', 'pageInfo', 'gameid', data.game_result_id);
                this.getLessonInfo()[2] === 1 && dtmTrack('level start');
                dtmTrack('activity start');

                //*** MAKE SURE data is available; should be, but ajax/api cbs were separate before
                var lessonInfo = this.getLessonInfo(); // from cookie: learningActivities
                if (/lessonStart/.test(lessonInfo[0])) {
                    dtmArgs('page', 'pageInfo', 'lessonId', this.lessonId);
                    dtmTrack('lesson start');
                    setCookie('learningActivities', 'lessonInprogressABC' + this.lessonId + 'ABC' + 0, 1);
                }
                if (/lessonInprogress/.test(lessonInfo[0])) {
                    dtmArgs('page', 'pageInfo', 'lessonId', this.lessonId);
                }
        }.bind(this),
        ios     : function () {
                /* tracking */
                dtmArgs('page', 'pageInfo', 'cid', this.cid);
                dtmArgs('page', 'pageInfo', 'gameid', data.game_result_id);
                this.getLessonInfo()[2] === 1 && dtmTrack('level start');
                dtmTrack('activity start');

                //*** MAKE SURE data is available; should be, but ajax/api cbs were separate before
                var lessonInfo = this.getLessonInfo(); // from cookie: learningActivities
                if (/lessonStart/.test(lessonInfo[0])) {
                    dtmArgs('page', 'pageInfo', 'lessonId', this.lessonId);
                    dtmTrack('lesson start');
                    setCookie('learningActivities', 'lessonInprogressABC' + this.lessonId + 'ABC' + 0, 1);
                }
                if (/lessonInprogress/.test(lessonInfo[0])) {
                    dtmArgs('page', 'pageInfo', 'lessonId', this.lessonId);
                }
        }.bind(this),
        android : null,
        /* not sure why android doesn't include tracking above, but replicated logic from gt 2.0 */
    };

    /* update props */
    this.responseDataUpdate(data);

    if (this.platform in funcMap
        && typeof funcMap[this.platform] === 'function') {
        funcMap[this.platform]();
    }

    /* handle setting member_lesson_id cookie based on startActivity data */
    /* (imported from ENTPE-158, for ENTPE-685) */
    var teacherMemberLessonType = getCookie('teacher_member_lesson_type');
    this.debug && teacherMemberLessonType && console.log('teacherMemberLessonType:', teacherMemberLessonType);
    if (teacherMemberLessonType === 'classwork' && !!data.classwork_member_lesson_id) {
        setCookie('member_lesson_id', data.classwork_member_lesson_id);
        this.memberlessonid = data.classwork_member_lesson_id;
    }
    if (teacherMemberLessonType === 'homework' && !!data.homework_member_lesson_id) {
        setCookie('member_lesson_id', data.homework_member_lesson_id);
        this.memberlessonid = data.homework_member_lesson_id;
    }

    /* set flags */
    this.posted = false;
    this.showTM = false;

    /* update tm */
    this.gtEmitter.emit('ticketMachine:update', this);
};

/* API CALLBACKS */

/**
 * Runs on endActivity API response
 * @param  {object} data
 */
GameTracker.prototype.callbackEndActivity = function (data) {//***WIP22:reduce redundancy
    if (!data) throw new Error("No data");//***
    if (!this.platform) throw new Error('No platform info set');//***
    var funcMap = {
        /* DESKTOP:CALLBACK:POST */
        desktop : function () {
            /* launch ticket machine */
            this.showTM && this.updateAndLaunchTicketMachine(this);
        },

        /* IOS:CALLBACK:POST */
        ios     : function () {
            /* launch ticket machine */
            this.showTM && this.updateAndLaunchTicketMachine(this);
        },

        /* ANDROID:CALLBACK:POST */
        android : null,
    };
        /* moved from end/post method */
        this.posted = true;

        /* update gt data */
        this.responseDataUpdate(data);

        /* re: parent users, null total_points from EndActivity */
        if (isNaN(parseInt(this.total_points))) {
            this.debug && console.log('*** no total_points value from api (will use fallback)'); //***
            this.totalpoints = this.total_points = +uinfo.points + this.points;
        };

        /* update shell */
        this.updateShell();

        /* tracking */
        dtmVars('tickets earned', this.points);
        dtmArgs('page','pageInfo','pageDetail','ticket machine');

        if (this.platform in funcMap
            && typeof funcMap[this.platform] === 'function') {
            funcMap[this.platform].call(this); //*** WIP3
        }

        this.game_result_id = 0;
        this.dispatchEvent('posted'); //added by TJ on 10/9/2013
};

/**
 * Runs on cancelActivity API response
 * @param  {object} data
 */
GameTracker.prototype.callbackCancelActivity = function (data) {
    // if (!data) throw 'No data';//***
    if (!this.platform) throw new Error('No platform info set');//***

    /* tracking */
    dtmTrack('activity cancel');

    /* reset gt props */
    this.game_result_id = 0;
    this.posted = false;
    this.showTM = false;

    /* events */
    this.dispatchEvent('gt_canceledGame');
};

/* TICKETMACHINE METHODS */

/*
    php creates tm instance
    activity calls gt.ticketMachine()
    gt.ticketMachine() sends end/post
    end/post callback updates ticketMachine & launches tm
*/

/* Called by callbackEndActivity */
// QA-9665: make error more granular, promisify gtdataupdate
GameTracker.prototype.updateAndLaunchTicketMachine = function (gtdata) {
    this.debug && console.log('GameTracker.prototype.updateAndLaunchTicketMachine'); //***
    this.debug && !ticketMachine && console.log("TICKETMACHINE OBJECT NOT FOUND"); //***;
    this.debug && !ticketMachine && Analytics.trackEvent('@ticketMachine:fail'); //***;

    /* ticketMachine instance setup in ticketmachine_sp */
    this.debug && console.log('updateAndLaunchTicketMachine:this', this); //***
    this.debug && console.log('updateAndLaunchTicketMachine:gtDataUpdate'); //***

    var gtDataUpdate = ticketMachine.gtDataUpdate(this);
    /* binds ticketMachine instance to its own method to maintain context */
    if (gtDataUpdate) {
        gtDataUpdate
            .then(ticketMachine.tmLaunch.bind(ticketMachine))
            .catch(function (error) {
                Analytics.trackEvent('@ticketMachine:fail');
                throw (error);
            });
    }
};

/* Calls end/post method (end/post callback LAUNCHES ticketmachine) */
/* Leave method name as is: individual activities call it */
GameTracker.prototype.ticketMachine = function () {
    var funcMap = {

        /* DESKTOP:TICKETMACHINE */
        desktop : function () {
            console.log('this.game_result_id:', this.game_result_id);
            if (typeof this.game_result_id !== 'undefined') {
                if (!this.posted) {
                    this.showTM = true;
                    this.end(); /* CB launches TM */
                }
            }
        },

        /* IOS:TICKETMACHINE */
        ios     : function () {
            if (this.game_result_id > 0) {
                if (!this.posted) {
                    this.showTM = true;
                    this.end(); /* CB launches TM */
                }
            }
        },

        /* ANDROID:TICKETMACHINE */
        android: function () {
            //*** from gt2.0 live, Tue Jan 05, 2016, 04:59PM
            if (isAndroid && !this.posted && !isUnity) {
                this.posted = true;
                if(this.lastarea == 'petpark'){
                    var petid = parseInt(getCookie('petItemId'));
                    Android.updatePetParkRewards("petItemId="+petid);
                }
                var testVersion = parseInt(APP_VERSION.charAt(0));
                if (testVersion >= 3) {
                    Android.endActivity("score="+this.score);
                } else {
                    Android.endActivity();
                }
                this.dispatchEvent('posted');
                return;
            }
        },
    };

    if (typeof funcMap[this.platform] === 'function') {
        funcMap[this.platform].call(this); //*** WIP3
    }

};

/* REPLAY METHODS */

/* Legacy (from doReplay) */
GameTracker.prototype.setGameButton = function (event) {
    if (this.platform === 'desktop') {
        var gamebutton;
        if (event.which == null) {
            gamebutton = (event.button < 2) ? 'left' : ((event.button == 4) ? 'middle' : 'right');
        } else {
            gamebutton = (event.which < 2) ? 'left' :
                ((event.which == 2) ? 'middle' : 'right');
        }
        if (gamebutton !== 'left') return false;
    };
}
/* Legacy (from doReplay) */
GameTracker.prototype.setMetaWrapper = function () {
    var fragment = document.createDocumentFragment(),
        elem = document.getElementById('meta-wrapper');
    if (elem) {
        while (elem.firstChild) {
            fragment.appendChild(elem.firstChild);
        }
        fragment.firstChild.style.transform = null;
        fragment.firstChild.style.WebkitTransform = null;
        fragment.firstChild.style.MsTransform = null;
        fragment.firstChild.style.MozTransform = null;
        fragment.firstChild.style.OTransform = null;
        elem.parentNode.replaceChild(fragment, elem);
    }
};

/* Dispatches event for game to listen to */
GameTracker.prototype.doReplay = function (event) {
    /* Note: Activities listen for this event */
    this.dispatchEvent('doReplay');

    /* Legacy calls */
    this.setGameButton(event);
    this.setMetaWrapper();

};

/* POPUP METHODS */

/* Called by ticketMachine:allAnimationsDone event */
GameTracker.prototype.popupGradeAdvisor = function () {
    if (this.lastarea == 'path' && isGrade1Advisor && uinfo.pathinfo.pathlevel >= 7) {
        showPopup('feedback_grade1.php?activityCID=' + this.cid);
    }
};

/* NOTE:02dacb20
This is needed so that the userdata_0.{member_lessons,
member_lesson_items, member_lesson_plays} tables can be properly
updated for activities that belong to parent assigned lessons from
the recommended lessons in the assessment center.
Robert Alatorre,02dacb20 */

/* [Caigoy,050516,QA-10303] Returning Promise Polyfill to resolve IE issue in Basics, since GT is loaded outside of RequireJS there */
!function(t){function e(){}function n(t,e){return function(){t.apply(e,arguments)}}function o(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],a(t,this)}function r(t,e){for(;3===t._state;)t=t._value;return 0===t._state?void t._deferreds.push(e):(t._handled=!0,void l(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?i:u)(e.promise,t._value);var o;try{o=n(t._value)}catch(r){return void u(e.promise,r)}i(e.promise,o)}))}function i(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof o)return t._state=3,t._value=e,void f(t);if("function"==typeof r)return void a(n(r,e),t)}t._state=1,t._value=e,f(t)}catch(i){u(t,i)}}function u(t,e){t._state=2,t._value=e,f(t)}function f(t){2===t._state&&0===t._deferreds.length&&setTimeout(function(){t._handled||o._onUnhandledRejection(t._value)},1);for(var e=0,n=t._deferreds.length;n>e;e++)r(t,t._deferreds[e]);t._deferreds=null}function c(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function a(t,e){var n=!1;try{t(function(t){n||(n=!0,i(e,t))},function(t){n||(n=!0,u(e,t))})}catch(o){if(n)return;n=!0,u(e,o)}}var s=setTimeout,l="function"==typeof setImmediate&&setImmediate||function(t){s(t,1)},d=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};o.prototype["catch"]=function(t){return this.then(null,t)},o.prototype.then=function(t,n){var i=new o(e);return r(this,new c(t,n,i)),i},o.all=function(){var t=Array.prototype.slice.call(1===arguments.length&&d(arguments[0])?arguments[0]:arguments);return new o(function(e,n){function o(i,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(t){o(i,t)},n)}t[i]=u,0===--r&&e(t)}catch(c){n(c)}}if(0===t.length)return e([]);for(var r=t.length,i=0;i<t.length;i++)o(i,t[i])})},o.resolve=function(t){return t&&"object"==typeof t&&t.constructor===o?t:new o(function(e){e(t)})},o.reject=function(t){return new o(function(e,n){n(t)})},o.race=function(t){return new o(function(e,n){for(var o=0,r=t.length;r>o;o++)t[o].then(e,n)})},o._setImmediateFn=function(t){l=t},o._onUnhandledRejection=function(t){console.warn("Possible Unhandled Promise Rejection:",t)},"undefined"!=typeof module&&module.exports?module.exports=o:t.Promise||(t.Promise=o)}(this);
