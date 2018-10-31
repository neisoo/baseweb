/* TM Constructor */
function TicketMachine(options) {
    'use strict';
    /* TOGGLE LOGGING */
    this.debug = /\.test\.|\.qtest\./.test(location.href) || 0;

    this.debug && console.log('TICKETMACHINE INSTANTIATED'); //***

    /* ADD URL PARAM debugPersist=true|1 TO KEEP ANIMATIONS IN DOM AFTER FINISHED */
    this.debugPersist = (function(){
        return /debugPersist=(true|1)/i.test(location.search);
    })() || 0;

    /* DEFINE PROPERTIES */
    this.visible    = true; /* Visibility state (different from sidepanel:closed; also hides tab) */
    this.gtInstance = null; /* Current GT instance */
    this.GraphicManager = options.GraphicManager; /* Passed by RequireJS block in ticketmachine_sp */

    this.tmOptions  = { /* Some from PHP: sidepanel options, etc. */
        showAvatar: true, /* Toggle whether avatar is loaded into TM SP */
        playAnimOnOpen: false, /* Whether to play anim on openEnd */
        hideTabOnClose: false,
        language: null,
        audioPath: null,
        frameless: /frameless=/.test(location.search) && location.search.match(/frameless=([^&$]+)/)[1] === 'true', /* ENTPE-683 */
        noFrame: /no_frame=/.test(location.search) && location.search.match(/no_frame=([^&$]+)/)[1] === '1',
        audioLanguages: {
            'en'  : IMGHOST + '/ticketmachine/snd/en',
            'zhs' : IMGHOST + '/ticketmachine/snd/zhs', /* replaced combined audio with single lang, per request */
        },
        /* NOTE: lowercase ticketmachine is instance of sidepanel_new, not TicketMachine */
        animationPath: '/artwork/ticketmachine/animations/', /* default: will be adjusted by setTMAnimDir before playing */
        activityType: null, /* For tracking on favorite btn */
    };

    /* From PHP, JS: objects and return data */
    this.tmData = {
        spID        : null,
        avatarData  : null,
        /* from ticketmachine_imgdata.js, loaded in ticketmachine_sp.php by RequireJS */
        tmBgImgData : options.tmBgImgData,
    };

    /* From PHP: (translated) button labels, etc. */
    this.tmStrings = {
        continueLabel : '',
        navMoreLabels  : {},
        msgTicketsText : {},
    };

    this.tmElements = {}; /* Pointers to DOM elements */

    /* ANIMATION & TIMING METHODS */
    this.tmAnimations = {

        animPlaying: false,
      
        /* select/cycle tm bg sets */
        tmStaticLayout: 0,

        /* artwork dirs */
        tmAnimSequences: {
            introSequences: {
                mouse: 'ticketmachine_animation_abc_900x650',
                basket: 'ticketmachine_animation_basket_intro_900x650',
            },
            ticketSequences: {
                1: 'ticketmachine_animation_tickets_1_900x650',
                2: 'ticketmachine_animation_tickets_2_900x650',
                3: 'ticketmachine_animation_tickets_3_900x650',
                4: 'ticketmachine_animation_tickets_4_900x650',
                5: 'ticketmachine_animation_tickets_5_900x650',
                6: 'ticketmachine_animation_tickets_block_900x650',
            },
            /* Msg above basket (set using setTMMsg, e.g. 'tickets earned' & total tickets) */
            msgSequence: function(pointsEarned, totalPoints, seqStep) { //***WIP31
                if (typeof pointsEarned === 'undefined' || typeof totalPoints === 'undefined') return false;

                var pointsEarned = !isNaN(pointsEarned) ? pointsEarned : this.gtData.points,
                    totalPoints  = !isNaN(totalPoints)  ? totalPoints  : this.gtData.total_points,
                    countStart   = totalPoints - pointsEarned,
                    countEnd     = totalPoints,
                    msgIndex     = pointsEarned <= 15 ? pointsEarned : 15, //*** WIP32 local strings
                    ticketMsg    = this.tmStrings.msgTicketsText[msgIndex], //*** WIP32 local strings
                    //*** WIP31
                    seqSteps     = {
                        msgShow: function () {
                            this.tmTween({
                                element: this.tmElements.tmMsg,
                                type: 'opacity',
                                duration: 300,
                                twKeyframes: {
                                    begin: 0,
                                    end: 1
                                },
                                callbackNow: function () {
                                    this.tmElements.tmMsg.style.visibility = 'visible';
                                    this.tmElements.tmMsg.style.opacity = 0;
                                    this.setTMMsg(ticketMsg);
                                }.bind(this),

                            });
                        }.bind(this),
                        msgChange: function () {
                            this.setTMMsg(countStart);
                        }.bind(this),
                        msgCount: function () {
                            /* count up */
                            this.tmCountUp({
                                min: countStart,
                                max: countEnd,
                                interval: 41,
                                callbackEach: function (i) {
                                    this.setTMMsg(i);
                                }.bind(this),
                            });
                        }.bind(this),
                    };

                /* prevent display of negative numbers */
                if (countStart < 0) countStart = 0;

                if (seqStep 
                    && seqStep in seqSteps 
                    && typeof seqSteps[seqStep] === 'function') seqSteps[seqStep]();

            }.bind(this),

            /* Circular ticket counter (set using tmCountUp or setTMCounter) */
            counterSequence: function (pointsEarned) {
                if (typeof pointsEarned === 'undefined') return false;

                var pointsEarned = !isNaN(pointsEarned) ? pointsEarned : this.gtData.points,
                    countStart   = 1,
                    countEnd     = pointsEarned,
                    counterWait  = 0; /* interval before counter displayed */ //***WIP31

                /* handle zero tickets */
                /* Gametracker doesn't receive value for daily plays property; this is based solely on receiving zero tickets */
                if (pointsEarned <= 0) {
                        this.setTMCounter(0);
                    SoundControl.addContentSound(this.tmOptions.audioPath + '/5timestoday.mp3').play();
                    return;
                }
                /* handle block tickets */
                else if (pointsEarned > 5) {
                    this.setTMCounter(pointsEarned);
                    return; 
                }

                /* start at 1, count up in steps */
                this.setTMCounter(1);
                this.tmCountUp({
                    min: countStart,
                    max: countEnd,
                    interval: 457,
                    delayStart: counterWait,
                    callbackEach: function (i) {
                        this.setTMCounter(i);
                    }.bind(this),
                });

                return this;
            }.bind(this),

            /* Replay btn */
            replaySequence: function () {
                /* REPLAY btn tween */
                this.tmTween({
                    element: this.tmElements.tmBtnReplay,
                    type: 'scale',
                    duration: 125,
                    twKeyframes: {
                        begin: 0,
                        end: 1.25
                    },
                    callbackNow: function () {
                        this.tmElements.tmBtnReplay.style.visibility = 'visible';
                        this.tmElements.tmBtnReplay.style.opacity = 1;
                        // this.tmElements.tmBtnReplay.style.zIndex = 500;
                    }.bind(this),
                    callbackTweenFinish: function () {
                        this.tmTween({
                            element: this.tmElements.tmBtnReplay,
                            type: 'scale',
                            duration: 75,
                            twKeyframes: {
                                begin: 1.25,
                                end: 1
                            },
                        });
                    }.bind(this),
                });
            }.bind(this),

            continueSequence: function (){
                /* CONTINUE btn tween */
                this.tmTween({
                    element: this.tmElements.tmBtnContinue,
                    type: 'scale',
                    duration: 200,
                    twKeyframes: {
                        begin: 0,
                        end: 1.1
                    },
                    callbackNow: function () {
                        this.tmElements.tmBtnContinue.style.visibility = 'visible';
                    }.bind(this),
                    callbackTweenFinish: function () {
                        this.tmTween({
                            element: this.tmElements.tmBtnContinue,
                            type: 'scale',
                            duration: 85,
                            twKeyframes: {
                                begin: 1.1,
                                end: 1
                            },
                        });
                    }.bind(this),
                });
            }.bind(this),

            navSequence: function () {
                this.tmElements.tmNav.style.visibility = 'visible';
                /* nav btns tween */
                this.tmTween({
                    element: this.tmElements.tmNav,
                    type: 'opacity',
                    duration: 300,
                    twKeyframes: {
                        begin: 0,
                        end: 1
                    },
                });
            }.bind(this),

            avatarSequence: function () {
                /* avatar tween */
                this.tmElements.tmAvatarWrap.style.visibility = 'visible';
                this.tmElements.tmAvatarWrap.style.top = '650px';
                this.tmTween({
                    element: this.tmElements.tmAvatarWrap,
                    type: 'top',
                    duration: 200,
                    twKeyframes: {
                        begin: 650,
                        end: 514
                    },
                });
            }.bind(this),

        },

        /* Create container, play animation, clean up after it */
        playAnimation: function (options) {
            this.debug && console.log('playAnimation'); //***
            var animSeqName             = options.animSeqName,
                animObj                 = this.createAnimDiv(animSeqName.replace('-','')),
                maskDivCSS              = options.maskDivCSS || '', /* e.g. for cropping overflow of mouse anim */
                animDivCSS              = options.animDivCSS || '',
                animFadeDuration        = options.animFadeDuration || 0,
                onAnimationReady        = options.onAnimationReady,
                onAnimationDone         = options.onAnimationDone,
                frameEvents             = options.frameEvents, //***WIP31: QA-8950 custom frame events
                                                               //*** [{type:'ticketStart',callback:function () {}}]
                graphicManager          = new this.GraphicManager(this.tmOptions.animationPath), //*** WIP40: IE9 crossdomain
                graphicPlayer           = graphicManager.loadAnimation(animObj.animDiv, animSeqName, false, false);
                animObj.animPlayer      = graphicPlayer; /* reference for remove method */

            var debugPersist = options.debugPersist || this.debugPersist || 0;

            /* Apply arbitrary css to anim div */
            if (maskDivCSS || animDivCSS) {
                this.adjustAnimDiv(animObj, {
                    maskCSS: maskDivCSS,
                    animCSS: animDivCSS,
                });
            }

            /* Frame Events */
            /* *** WIP31: QA-8950 custom frame events */
            frameEvents && frameEvents.length && frameEvents.forEach(function (a) {
                this.listenOnce(graphicPlayer, a.type, function (e) {
                    if (typeof a.callback === 'function') a.callback();
                }, false);
            }, this);

            /* Anim ready */
            this.listenOnce(graphicPlayer, 'animationReady', function (e) {
                graphicPlayer.play();
                if (typeof onAnimationReady === 'function') onAnimationReady();
            }, false);

            /* Anim done */
            this.listenOnce(graphicPlayer, 'animationDone', function (e) {

                /* If unused frame events remain at this point, trigger them now (for BAD playback, e.g. IE9) */
                [].forEach.call(graphicPlayer.eventListeners, function (a) {
                    frameEvents.forEach(function (fe) {
                        if (a.type === fe.type) graphicPlayer.dispatchEvent(a.type);
                    });
                }, graphicPlayer);

                    /* debugPersist = do not remove completed animations from DOM */
                    if (debugPersist) return false;

                    /* a: remove immediately */
                    if (!animFadeDuration) {
                        graphicPlayer.destroy();
                        this.removeAnimDiv(animObj);

                    /* b: remove after tween-based fade out (soften inconsistencies between anim and static) */
                    } else {
                        var twTmp = this.tmTween({
                            element: animObj.maskDiv,
                            type: 'opacity',
                            duration: animFadeDuration,
                            twKeyframes: {
                                begin: 1,
                                end: 0 /* set to non-zero for debugging */
                            },
                            callbackTweenFinish: function () {
                                graphicPlayer.destroy();
                                this.removeAnimDiv(animObj);
                            }.bind(this),
                        });
                    }
                    if (typeof onAnimationDone === 'function') onAnimationDone();

            }.bind(this), false);

        }.bind(this),

        /* SEQUENCER TO CALL SPECIFIC ANIMATION SEQUENCES - All the ugly timing details go here */
        /* basket/avatar, mouse, tickets */
        playFullTMAnimation: function (options) {
            this.debug && console.log('playFullTMAnimation'); //***

            // [Caigoy,061616,ABCMG-2953] toggle anim dir based on global tmSound setting
            this.setTMAnimDir();

            /* reset tm sp layout */
            this.resetAnimation();

            /* set ticket data */
            var options       = options || {},
                ticketsEarned = options.ticketsEarned || 0,
                ticketsTotal  = options.ticketsTotal  || 0;
           
                /* basket anim */
                this.tmAnimations.playAnimation({
                    animSeqName: this.getIntroSequence('basket'),
                    animFadeDuration: 80,

                    onAnimationReady: function () {
                        /* avatar anim */
                        this.tmAnimations.tmAnimSequences.avatarSequence();
                    }.bind(this),

                    //*** WIP31: QA-8950 custom frame events
                    frameEvents: [
                        {
                            type: 'mouseStart', /* event queues up mouse anim */
                            callback: function () {

                                this.debug && console.log('frameEvents::mouseStart'); //***

                                /* mouse anim */
                                this.tmStaticLayouts(0);
                                this.tmAnimations.playAnimation({
                                    animSeqName: this.getIntroSequence('mouse'),
                                    maskDivCSS: 'height: 230px;', // keep mouse anim from covering ticket anim, etc.
                                    animDivCSS: 'margin-top: -1px;',
                                    animFadeDuration: 500,

                                    frameEvents: [
                                        {
                                            type: 'navStart',
                                            callback: function () {

                                                this.debug && console.log('frameEvents::navStart'); //***

                                                /* more than zero tickets */
                                                if (ticketsEarned > 0) {
                                                    /* continue anim */
                                                    this.getTweenSequence(this.tmAnimations.tmAnimSequences.continueSequence);

                                                    /* nav anim */
                                                    !this.tmOptions.frameless && this.getTweenSequence(this.tmAnimations.tmAnimSequences.navSequence); /* ENTPE-683 */
                                                    
                                                    /* msg anim */
                                                    this.tmAnimations.tmAnimSequences.msgSequence(ticketsEarned,ticketsTotal,'msgShow');
                                                }
                                            }.bind(this),
                                        }, {
                                            type: 'ticketStart',
                                            callback: function () {

                                                this.debug && console.log('frameEvents::ticketStart'); //***

                                                /* counter anim */
                                                this.getTweenSequence(this.tmAnimations.tmAnimSequences.counterSequence, [ticketsEarned]);

                                                /* more than zero tickets */
                                                if (ticketsEarned > 0) {

                                                    /* ticket anim */
                                                    this.tmAnimations.playAnimation({
                                                        animSeqName: this.getTicketSequence(ticketsEarned),
                                                        maskDivCSS: 'top: 230px;', //*** gets animations out of each other's way
                                                        animDivCSS: 'margin-top: -230px;',
                                                        animFadeDuration: 50,
                                                        /* transitions out to static bg */

                                                        frameEvents: [{
                                                            type: 'replayStart',
                                                            callback: function () {
                                                                this.debug && console.log('frameEvents::replayStart'); //***

                                                                //***WIP4
                                                                this.adjustAnimDiv(this.tmElements.animContainers[this.jsSafe(this.getTicketSequence(ticketsEarned))], {
                                                                    maskCSS: 'top:274px;',
                                                                    animCSS: 'margin-top:-274px;',
                                                                });

                                                                this.getTweenSequence(this.tmAnimations.tmAnimSequences.replaySequence);
                                                            }.bind(this),
                                                        }, {
                                                            type: 'msgChange',
                                                            callback: function () {
                                                                this.debug && console.log('frameEvents::msgChange'); //***
                                                                this.tmAnimations.tmAnimSequences.msgSequence(ticketsEarned, ticketsTotal, 'msgChange');
                                                            }.bind(this),
                                                        }, {
                                                            type: 'msgCount',
                                                            callback: function () {
                                                                this.debug && console.log('frameEvents::msgCount'); //***
                                                                this.tmAnimations.tmAnimSequences.msgSequence(ticketsEarned, ticketsTotal, 'msgCount');
                                                            }.bind(this),
                                                        }, ],


                                                        onAnimationDone: function () {
                                                            this.tmEmitter.emit('ticketMachine:allAnimationsDone'); /* allAnimationsDone for 1+ tickets */
                                                        }.bind(this),
                                                    });
                                                }
                                                /* zero tickets scenario; show btns now */
                                                else if (ticketsEarned <= 0) {

                                                    !this.tmOptions.frameless && this.getTweenSequence(this.tmAnimations.tmAnimSequences.navSequence); /* ENTPE-683 */
                                                    
                                                    this.tmAnimations.tmAnimSequences.msgSequence(ticketsEarned, ticketsTotal, 'msgShow');

                                                    this.getTweenSequence(this.tmAnimations.tmAnimSequences.continueSequence);

                                                    this.getTweenSequence(this.tmAnimations.tmAnimSequences.replaySequence);

                                                }

                                            }.bind(this),
                                        },
                                    ],

                                    onAnimationReady: function () {
                                        /* allAnimationsStart */
                                        this.tmEmitter.emit('ticketMachine:allAnimationsStart');
                                    }.bind(this),
                                    onAnimationDone: function () {
                                        this.tmStaticLayouts(2);
                                        /* if zero tickets, this was last animation */
                                        if (ticketsEarned <= 0) {
                                            /* allAnimationsDone for ZERO tickets */
                                            this.tmEmitter.emit('ticketMachine:allAnimationsDone');
                                        }
                                    }.bind(this),
                                });

                            }.bind(this),
                        },
                    ],

                    onAnimationDone: function () {
                        this.tmStaticLayouts(1);
                    }.bind(this),
                });

        }.bind(this),

    }; /* end this.tmAnimations */

    /* GT/Activity data - Props listed here will be updated by gtDataUpdate */
    this.gtData = {
        cid                 : null, /* Activity ID */
        groupid             : null, /* Activity group CID */
        pathid              : null, /* Grade */
        points              : null, /* Tickets earned */
        total_points        : null, /* From Api payload.total_points; INCLUDES tickets earned */
        custompoint         : null, /* An activity can override points earned */
        continueTo          : null, /* Continue btn action; set by cookie */
        nextBasicsUrl       : null, /* ContinueTo override for Basics; Set by GameTracker.setNextBasicsUrl */
        goToUrl             : null, /* ContinueTo override by current activity */
        lastarea            : null, /* From lastactivityarea cookie */
        meta_type           : null, /* Used by MORE btn */
        doReplay            : null, /* GT func defined by activity */
        instance            : null, /* Used by special case in setActivityType */
        link                : null, /* Current URL minus domain; for addToFavorites */
        icon                : null, /* Legacy, deprecated */
        platform            : null, /* [Caigoy,061716,QACN-5094]  */
    };

}; /* END TM CONSTRUCTOR */

/* Legacy Event Handling */
enableEventHandling(TicketMachine);

/* Event Dispatcher */
TicketMachine.prototype.tmEmitter = new EventEmitter2();

/* UTILS */

//*** WIP3
/* Listener destroys itself once tripped */
TicketMachine.prototype.listenOnce = function (obj, type, callback, bubble) {
    addListener(obj, type, function fn(e) {
        removeListener(obj, type, fn);
        callback(e);
    }, bubble);
};

/* Sets text content (workaround for ff) */
TicketMachine.prototype.setText = function (element, string) {element.textContent = element.innerText = string;};

/* Add commas to number at thousand marks */
TicketMachine.prototype.addCommas = function (n) {
    if (typeof parseInt(n) === 'number') {
        return n.toString().replace(/(\d(?=(?:\d{3})+(?!\d)))/g, '$1,');
    }
};

/* Sanitize for js, convert to camel case */
TicketMachine.prototype.jsSafe = function (str) {
    return str.replace(/[^a-zA-Z\d]+(.)/g, Function.prototype.call.bind(String.prototype.toUpperCase))
        .replace(/[^a-zA-Z\d]/g, '');
};

/* Add and/or remove multiple css classes in one step */
TicketMachine.prototype.swapClasses = function (element, options) {
    if (!options || (!options.add && !options.rem)) return false;
    var oldClasses = options.rem || [],
        newClasses = options.add || [];
    if (oldClasses.length) oldClasses.forEach(function (a) {
        removeClass(element.replace('#',''), a.replace('.',''));
    });
    if (newClasses.length) newClasses.forEach(function (a) {
        addClass(element.replace('#',''), a.replace('.',''));
    });
};

/* Static bgs to match last frames of animations */
TicketMachine.prototype.tmSwapBackgrounds = function (element, options) {
    if (!element || !options) return false;
    var tmBgs = {
            /* img data from ticketmachine_imgdata.js, loaded in ticketmachine_sp.php by RequireJS */
            tm_abcmouse_preintro_static: {
                img : this.tmData.tmBgImgData.tm_abcmouse_preintro_static,
                xy  : '127px 180px',
                wh  : 'auto',
            },
            tm_abcmouse_static: {
                img : this.tmData.tmBgImgData.tm_abcmouse_static,
                xy  : '113px 3px',
                wh  : '209px 242px',
            },
            tm_ticket_slot: {
                img : this.tmData.tmBgImgData.tm_ticket_slot,
                xy  : '156px 239px',
                wh  : '103px 18px',
            },
            tm_basket_static: {
                img : this.tmData.tmBgImgData.tm_basket_static,
                xy  : '130px 602px',
                wh  : '145px 51px',
            },
            tm_baskettickets_static: {
                img : this.tmData.tmBgImgData.tm_baskettickets_static,
                xy  : '123px 572px',
                wh  : '152px 88px',
            },
        },
        css = options.bgs.map(function (a) {
            return 'url(' + tmBgs[a]['img'] + ') ' + tmBgs[a]['xy'] + ' / ' + tmBgs[a]['wh'] + ' no-repeat';
        }).join(',\n').replace(/^/, 'background: ') + '; background-color: #fdda53;';
    element.style.cssText += css;
};

/* ANIMATION METHODS */
//*** WIP3

/* Call function after delay */
TicketMachine.prototype.wait = function (fn, ms) {
    if (!typeof fn === 'function' || isNaN(ms)) return false;
    window.setTimeout(function () {
        fn();
    }, ms);
};

/**
 * Create one-time use Tween with callbacks and timing offsets
 * @param  {object}          options                        Required: Args for Tween and setTimeout
 *         {string|object}   options.element                Required: DOM element or its ID string
 *         {object}          options.twKeyframes            Required: Begin and end values of Tween
 *         {string|integer}  options.twKeyframes.begin      Required: Begin value of Tween
 *         {string|integer}  options.twKeyframes.end        Required: End value of Tween
 *         {string}          options.type                   Type of Tween
 *         {integer}         options.duration               Duration of Tween
 *         {function}        options.callbackNow            Runs when tmTween called
 *         {integer}         options.delayStart             Delay before Tween begins
 *         {function}        options.callbackDelayStart     Runs when Tween begins
 *         {integer}         options.delayParallel          Arbitrary time from tmTween call
 *         {function}        options.callbackDelayParallel  Runs at arbitrary time from tmTween call
 *         {function}        options.callbackTweenFinish    Runs when Tween ends
 * @return {domobject}  DOM element
 * @example 
 * tM.tmTween({
 *     element: document.querySelector('#tm_nav'),
 *     type: 'opacity', duration: 1000, delayStart: 500, delayParallel: 750,
 *     twKeyframes: {begin: 0, end: 1}, callbackNow: function () {},
 *     callbackDelayStart: function () {},
 *     callbackDelayParallel: function () {},
 *     callbackTweenFinish: function () {},
 * });
 */
TicketMachine.prototype.tmTween = function (options) {
    if (!options ||
        !options.element ||
        options.twKeyframes.begin === '' ||
        options.twKeyframes.end === '') return false;

    var element               = options.element,
        duration              = options.duration              || 500,
        type                  = options.type                  || 'opacity',
        twKeyframes           = options.twKeyframes,
        callbackNow           = options.callbackNow           || 0,
        delayStart            = options.delayStart            || 0,
        callbackDelayStart    = options.callbackDelayStart    || 0,
        delayParallel         = options.delayParallel         || 0,
        callbackDelayParallel = options.callbackDelayParallel || 0,
        callbackTweenFinish   = options.callbackTweenFinish   || 0,
        config = [
            element,
            type,
            twKeyframes.begin,
            twKeyframes.end,
            duration,
        ],
        tw = null,
        createTween = function () { // create tween with config
            tw = new Tween(config[0], config[1], config[2], config[3], config[4]); // because fn.apply didn't work
            if (typeof callbackTweenFinish === 'function') {
                /* run cb after tween finish */
                this.listenOnce(tw, 'finish', function () {
                    callbackTweenFinish();
                });
            }
        }.bind(this);

    /* run cb at tw instantiation */
    if (typeof callbackNow === 'function') callbackNow();

    /* run cb on separate delay to tween start */
    if (delayParallel > 0) {
        if (typeof callbackDelayParallel === 'function') this.wait(callbackDelayParallel, delayParallel);
    }

    /* start tween after delay, or immediately */
    if (delayStart > 0) {
        if (typeof callbackDelayStart === 'function') {
            this.wait(function () {
                callbackDelayStart();
                createTween();
            }, delayStart);
        }
        else {
            createTween();
        }
    } else {
        createTween();
    }

    return element;
};

/**
 * Call a function at an arbitrary interval until i reaches max
 * @param  {object} options [description]
 * @param  {integer}  options.min           Starting number
 * @param  {integer}  options.max           Ending number
 * @param  {integer}  options.interval      Time between intervals (in milliseconds)
 * @param  {integer}  options.delayStart    Time before starting count up (in milliseconds)
 * @param  {function} options.callbackStart Run at call time
 * @param  {function} options.callbackEach  Run at each interval
 * @param  {function} options.callbackEnd   Run on last interval
 * @example
 * tM.tmCountUp({
 *     min: 1,
 *     max: 5,
 *     interval: 1000,
 *     delayStart: 3000,
 *     callbackEach: function (i) {
 *         tM.setText(tM.tmElements.tmCounter, i);
 *     },
 *     callbackStart: function () {},
 *     callbackEnd: function () {},
 * });
 */
TicketMachine.prototype.tmCountUp = function (options) {
    if (isNaN(options.min) ||
        isNaN(options.max) ||
        isNaN(options.interval) ||
        options.min >= options.max) return false;

    var min           = options.min,
        max           = options.max,
        interval      = options.interval,
        delayStart    = options.delayStart    || null,
        callbackEach  = options.callbackEach  || null,
        callbackStart = options.callbackStart || null,
        callbackEnd   = options.callbackEnd   || null,
        i = min || 0;

    function startTimer() {
        if (typeof callbackStart === 'function') callbackStart();
        var timer = window.setInterval(function () {
            if (i > max) {
                window.clearInterval(timer);
            } else {
                if (typeof callbackEach === 'function') callbackEach.call(null, i);
                if (typeof callbackEnd === 'function' && i === max) callbackEnd();
                i++;
            }
        }, interval);
    }

    if (delayStart > 0) this.wait(startTimer, delayStart);
    else startTimer();
};

/* select/cycle tm bg sets */
TicketMachine.prototype.tmStaticLayouts = function (layoutIndex) {
    var layoutIndex = layoutIndex,
        layouts = [
            /* when sidepanel opens */
            function () {
                this.tmSwapBackgrounds(this.tmElements.tmSP, {
                    bgs: [
                        'tm_abcmouse_preintro_static',
                        'tm_ticket_slot',
                    ]
                });
            },
            /* after basket anim done & before mouse anim done */
            function () {
                this.tmSwapBackgrounds(this.tmElements.tmSP, {
                    bgs: [
                        'tm_abcmouse_preintro_static',
                        'tm_ticket_slot',
                        'tm_basket_static',
                        'tm_baskettickets_static',
                    ]
                });
            },
            /* after basket & mouse anims done */
            function () {
                this.tmSwapBackgrounds(this.tmElements.tmSP, {
                    bgs: [
                        'tm_abcmouse_static',
                        'tm_ticket_slot',
                        'tm_basket_static',
                        'tm_baskettickets_static',
                    ]
                });
            },
        ];
    this.tmAnimations.tmStaticLayout = layoutIndex;
    return layouts[layoutIndex].call(this);
};

/* For non-graphic manager animations (mainly for syntax consistency when called) */
TicketMachine.prototype.getTweenSequence = function (sequence, args) { // e.g. counterSequence|replaySequence|continueSequence|navSequence|avatarSequence
    if (!sequence in this.tmAnimations.tmAnimSequences || !typeof sequence === 'function') return false;
    return sequence.apply(this, args);
};

TicketMachine.prototype.getIntroSequence = function (str) { // e.g. 'mouse'|'basket'
    if (str in this.tmAnimations.tmAnimSequences.introSequences) {
        return this.tmAnimations.tmAnimSequences.introSequences[str];
    }
    return false;
};

TicketMachine.prototype.getTicketSequence = function (ticketsEarned) { // int corresponds to list of tix seqs
    if (isNaN(ticketsEarned)) return false;
    if (ticketsEarned > 5) ticketsEarned = 6;
    return this.tmAnimations.tmAnimSequences.ticketSequences[ticketsEarned];
};

/* Create empty overlay and mask */
TicketMachine.prototype.createAnimDiv = function(id) {
    if (!id) return false;
    var animObj  = {},
        targDiv  = document.querySelector('#sidepanel_wrapper_ticketmachine'),
        maskDiv  = document.createElement('div'),
        animDiv  = document.createElement('div'),
        jsName   = this.jsSafe(id);

    /* append to dom */
    targDiv.insertBefore(maskDiv, targDiv.childNodes[0]);
    maskDiv.appendChild(animDiv);

    /* for masking animDiv */
    maskDiv.id = id + '-mask';
    maskDiv.className = 'animdiv-mask';

    /* for graphic player */
    animDiv.id = id;
    animDiv.className = 'gpu-accelerate animdiv'

    /* obj with needed references */
    animObj.maskDiv = maskDiv;
    animObj.animDiv = animDiv;

    /* add reference to container to tm obj */
    this.tmElements.animContainers = this.tmElements.animContainers || {};
    this.tmElements.animContainers[jsName] = animObj;//***

    return animObj; /* anim func targets child of this */
};

/* Use to mask animations that overflow */
TicketMachine.prototype.adjustAnimDiv = function (animObj, options) {
    if (!animObj || !options) return false;
    var maskDiv = animObj.maskDiv,
        animDiv = animObj.animDiv,
        maskCSS = options.maskCSS || '',
        animCSS = options.animCSS || '';
    maskDiv.style.cssText += maskCSS;
    animDiv.style.cssText += animCSS;
    return animObj;
};

/* Remove anim overlay */
TicketMachine.prototype.removeAnimDiv = function (animObj) {
    if (!animObj) return false;
    var jsName = this.jsSafe(animObj.animDiv.id);
    if (animObj && animObj.maskDiv) animObj.maskDiv.remove();
    /* remove container reference from tm obj */
    if (jsName in this.tmElements.animContainers) {
        this.tmElements.animContainers[jsName] = null;
        delete this.tmElements.animContainers[jsName];
    } //*** WIP2: ie9 memory leak
    return jsName;
};

/* Hide elements shown after animation, reset layout */
TicketMachine.prototype.resetAnimation = function () {
    this.debug && console.log('resetAnimation'); //***
    /* destroy any active animations */
    if (this.tmAnimations.animPlaying) {
        var activeAnimations = this.tmElements.animContainers;
        for (var i in activeAnimations) {
            try {
                activeAnimations[i] !== null && activeAnimations[i].animPlayer.destroy();
            } catch (err) {
                this.debug && console.log(err.message);
            }
        }
    }
    this.tmStaticLayouts(0);
    this.tmElements.tmBtnReplay.style.visibility = 'hidden';
    this.tmElements.tmBtnContinue.style.visibility = 'hidden';
    this.tmElements.tmMsg.style.visibility = 'hidden';
    this.tmElements.tmAvatarWrap.style.visibility = 'hidden';
    this.tmElements.tmNav.style.visibility = 'hidden';
    this.setTMCounter('');
};

/* DATA & UI METHODS */

/**
 * Map relevant props from GameTracker object
 * @param  {object} obj GT instance
 * @return {object} Copied GT data
 * Note: Called by GT before TM launched
 */
// QA-9665: update with promise to maintain order of exec
TicketMachine.prototype.gtDataUpdate = function (obj) {
    var gtInstance = this.gtInstance = obj,
        gtData = this.gtData,
        debugFlag = this.debug;

    debugFlag && console.log('TicketMachine.prototype.gtDataUpdate', obj); //***

    return new Promise(function (resolve, reject) {
        for (var k in gtData) {
            if (gtInstance.hasOwnProperty(k)) {
                gtData[k] = gtInstance[k];
            }
        }
        debugFlag && console.log('gtDataUpdate:gtInstance', gtInstance); //***
        debugFlag && console.log('gtDataUpdate:gtData', gtData); //***

        if (gtData && gtData.cid !== null) {
            resolve(gtData);
        } else reject('gtDataUpdate failed');
    }, this);
};

/* Creates new avatar instance via avatar.js and appends it to TM SP */
TicketMachine.prototype.setTMAvatar = function () {
    if (!this.tmOptions.showAvatar /* Empty tmAvatarWrap will still tween in for anim timing */
        || !this.tmData.avatarData.length) { /* Don't show faceless avatar (e.g. parent account) */
        return false;
    }
    var a = new Avatar(this.tmElements.tmAvatar.id, this.tmData.avatarData);
    a.setScale(.53); a.setPetDisplay(false);
    return this.tmElements.tmAvatarWrap; /* CSS-manipulable container */
};

/* [Caigoy,061616,ABCMG-2953] animPath can now toggle between normal and muted animations */
TicketMachine.prototype.setTMAnimDir = function () {
    this.debug && console.log('setTMAnimDir', 'tmAnimSoundEnabled:', tmAnimSoundEnabled); //***

    // [Caigoy,061716,QACN-5094] always plays anim audio on mobile, per request
    var baseDir = ticketmachine.isStupidIE() ? '/artwork' : IMGHOST,
        animPath = (typeof tmAnimSoundEnabled !== 'undefined' && !tmAnimSoundEnabled && this.gtData.platform === 'desktop') 
            ? '/ticketmachine/animations/muted/' 
            : '/ticketmachine/animations/';

    this.tmOptions.animationPath = baseDir + animPath;
    return baseDir + animPath;
};

/* Map DOM elements in TicketMachine SP PHP */
TicketMachine.prototype.getTMElements = function () {
    this.tmElements = {
        tmSP              : document.querySelector('#sidepanel_wrapper_ticketmachine'),
        tmTab             : document.querySelector('#sidepanel_icon_ticketmachine'),
        tmCounter         : document.querySelector('#tm_counter'),
        tmNav             : document.querySelector('#tm_nav'),
        tmNavMore         : document.querySelector('#tm_nav-more'),
        tmNavMoreIcon     : document.querySelector('#tm_nav-more .tm_nav-icon'),
        tmNavMoreLabel    : document.querySelector('#tm_nav-more .tm_nav-label'),
        tmNavFavorite     : document.querySelector('#tm_nav-favorite'),
        tmNavShopping     : document.querySelector('#tm_nav-shopping'),
        tmNavLearningpath : document.querySelector('#tm_nav-learningpath'),
        tmBtnContinue     : document.querySelector('#tm_btn-continue'),
        tmBtnReplay       : document.querySelector('#tm_btn-replay'),
        tmMsg             : document.querySelector('#tm_msg'),
        tmAvatar          : document.querySelector('#tm_avatar'),
        tmAvatarWrap      : document.querySelector('#tm_avatar_wrap'),
    };
};

/* TM Visibility Toggle (hides sp AND tab) */
TicketMachine.prototype.setTMVisibility = function (show) {
    var visibility = !!show ? 'visible' : 'hidden';
    this.visible = show;
    this.tmElements.tmSP.style.visibility = visibility;
    return this.tmElements.tmSP;
};

/* NAV BTNS (except MORE BTN): Set rollover sound and functionality; set tracking based on gt data */
TicketMachine.prototype.setNavBtns = function () {

    var addToFavorites = this.addToFavorites.bind(this),
        favBtn = this.tmElements.tmNavFavorite.children[0],
        shopBtn = this.tmElements.tmNavShopping.children[0],
        pathBtn = this.tmElements.tmNavLearningpath.children[0]; //*** WIP3

    /* add to favorites */
    SoundControl.buttonRollover(this.tmElements.tmNavFavorite, this.tmOptions.audioPath + '/addtofavorites.mp3');
    addListener(favBtn, 'click', addToFavorites);
    /* tracking */
    favBtn.setAttribute('data-tracking', 'ticket machine:favorite:' + this.tmOptions.activityType + ":" + this.gtData.cid);

    /* go shopping */
    SoundControl.buttonRollover(this.tmElements.tmNavShopping, this.tmOptions.audioPath + '/goshopping.mp3');
    addListener(shopBtn, 'click', function () {loadPage('/html5/abc/sitemap/shopplaza');});
    /* tracking */
    shopBtn.setAttribute('data-tracking', 'ticket machine:go to shopping');

    /* learning path */
    SoundControl.buttonRollover(this.tmElements.tmNavLearningpath, this.tmOptions.audioPath + '/stayonlearningpath.mp3');
    addListener(pathBtn, 'click', function () {loadPage('/html5/abc/path_section');});
    /* tracking */
    pathBtn.setAttribute('data-tracking', 'ticket machine:go to learning path');
};

/**
 * MORE BTN: Set icon, rollover sound, label, and functionality
 * @param {string} meta_type Corresponds to keys in metaTypes obj (e.g. from ApiService:user_end_activity data)
 */
TicketMachine.prototype.setNavMoreBtn = function (meta_type) {
    var metaType = meta_type || '',
        metaTypeDefault = 'games', // default to games
        metaTypes = {
            books      : { /* 1 */
                type  : 'books',
                url   : '/html5/abc/bookshelf',
                label : this.tmStrings.navMoreLabels[1], // tt tag
                icon  : IMGHOST + '/ticketmachine/static/tm_btn_sprite1.png',
                sound : this.tmOptions.audioPath + '/morebooks.mp3',
                tracking: 'ticket machine:more books',
            },
            songs      : { /* 2 */
                type  : 'songs',
                url   : '/html5/abc/musicshelf',
                label : this.tmStrings.navMoreLabels[2], // tt tag
                icon  : IMGHOST + '/ticketmachine/static/tm_btn_sprite1.png',
                sound : this.tmOptions.audioPath + '/moresongs.mp3',
                tracking: 'ticket machine:more songs',
            },
            games      : { /* 3 */
                type  : 'games',
                url   : '/html5/abc/games',
                label : this.tmStrings.navMoreLabels[3], // tt tag
                icon  : IMGHOST + '/ticketmachine/static/tm_btn_sprite1.png',
                sound : this.tmOptions.audioPath + '/moregames.mp3',
                tracking: 'ticket machine:more games',
            },
            art        : { /* 4 */
                type  : 'art',
                url   : '/html5/abc/colors',
                label : this.tmStrings.navMoreLabels[4], // tt tag
                icon  : IMGHOST + '/ticketmachine/static/tm_btn_sprite1.png',
                sound : this.tmOptions.audioPath + '/moreart.mp3',
                tracking: 'ticket machine:more art',
            },
            puzzles    : { /* 5 */
                type  : 'puzzles',
                url   : '/html5/abc/puzzles',
                label : this.tmStrings.navMoreLabels[5], // tt tag
                icon  : IMGHOST + '/ticketmachine/static/tm_btn_sprite1.png',
                sound : this.tmOptions.audioPath + '/morepuzzles.mp3',
                tracking: 'ticket machine:more puzzles',
            },
            /* categories below default to games for now */
            // printables : { /* 6 */ },
            // real_world : { /* 7 */ },
            // groupings  : { /* 8 */ },
            // basics     : { /* 9 */ },
            // none       : { /* 0 */ },
        },
        navMoreOptions = (function(){
            metaType = !!meta_type ? meta_type.toLowerCase().replace(' ','_') : '';
            if (metaType in metaTypes) return metaTypes[metaType];
            return metaTypes[metaTypeDefault];
        })(),
        applyNavMoreOptions = function () {
            /* Set label */
            this.setText(this.tmElements.tmNavMoreLabel, navMoreOptions.label);

            /* Set icon */
            this.tmElements.tmNavMoreIcon.style.backgroundImage = 'url(' + navMoreOptions.icon + ')';

            /* Set rollover sound */
            SoundControl.buttonRollover(this.tmElements.tmNavMore, navMoreOptions.sound);

            /* Child nodes are click target for IE10 */
            [].forEach.call(this.tmElements.tmNavMore.children, function (a) {
                /* tracking */
                a.setAttribute('data-tracking', navMoreOptions.tracking);
                addListener(a, 'click', function () {
                    loadPage(navMoreOptions.url);
                });
            }, this);

            /* [special case] Set activityType for tracking on tmNavFavorite btn */
            this.tmOptions.activityType = metaType;

        };

    navMoreOptions && applyNavMoreOptions.call(this); //*** WIP3
};

/**
 * CONTINUE BTN: rollover sound and functionality
 * @param {string} lastArea Corresponds to keys in continueTypes obj (usually GameTracker.lastarea)
 * Note: URL can by overriden in GameTracker instantiation
 */
TicketMachine.prototype.setContinueBtn = function (lastArea) {

    /* ENTPE-683 */
    if (this.tmOptions.frameless) {
        addListener(this.tmElements.tmBtnContinue.children[0], 'click', window.closeSchoolsActivityModal, false);
        return false;
    } 
    // Parent Section 
    // Looks for url parameter 'no_frame' to check if it's on an iframe inside the parent section. 
    // Continue 
    if (this.tmOptions.noFrame) {
        addListener(this.tmElements.tmBtnContinue.children[0], 'click', continueToParent, false);
        return false;
    }

    function continueToParent() {
        window.parent.postMessage('activityFakeContinue', '*');
    }

    var lastArea = lastArea ? lastArea : 'default',
        continueTypes = {
            path: {
                url      : '/html5/abc/path_section?fromtm=1',
                label    : this.tmStrings.continueLabel, // tt tag
                sound    : this.tmOptions.audioPath + '/stayonlearningpath.mp3',
                tracking : 'ticket machine:go to path',
            },
            myactivities: {
                url      : '/html5/abc/myactivities',
                label    : this.tmStrings.continueLabel, // tt tag
                sound    : this.tmOptions.audioPath + '/gotomylessons.mp3',
                tracking : 'ticket machine:go to myactivities',
            },
            efl_basics: {
                url      : this.gtData.continueTo,
                label    : this.tmStrings.continueLabel, // tt tag
                sound    : this.tmOptions.audioPath + '/continuenextactivity.mp3',
                tracking : 'ticket machine:go to efl basics',
            },
            default: {
                url: (function (_this) { //*** WIP3
                    if (_this.gtData.continueTo) return _this.gtData.continueTo;
                    else if (_this.platform === 'android') return '/'; /* Old Android apps: webview can't load home directly */
                    else return 'html5/abc/student_home';
                })(this),
                label    : this.tmStrings.continueLabel, // tt tag
                sound    : this.tmOptions.audioPath + '/continuenextactivity.mp3',
                tracking : 'ticket machine:continue',
            },
        },
        continueOptions = null;

    /* [special case] CN/EFL red doors: manual GameTracker.gotoUrl logic */
    if (!!this.gtData.gotoUrl && lastArea === 'efl_basics') {
        continueOptions = continueTypes['default'];
        continueOptions.url = this.gtData.gotoUrl;
    }
    /* [special case] Basics w/ BID get URL from ajax response */
    else if (!!this.gtData.nextBasicsUrl && !this.gtData.gotoUrl) {
        continueOptions = continueTypes['default'];
        continueOptions.url = this.gtData.nextBasicsUrl;
    }
    /* activity can override url with gt.gotoUrl */
    else if (!!this.gtData.gotoUrl) {
        continueOptions = continueTypes['default'];
        continueOptions.url = this.gtData.gotoUrl;
    }
    /* finally, check continueTypes obj for lastarea value */
    else {
        continueOptions = (function () { //*** double check that this value is updated w/ new gt instance
            if (lastArea in continueTypes) return continueTypes[lastArea];
            else return continueTypes['default'];
        })();
    }

    /* [legacy] ensure correct url to learning path (assumes no url params) */
    if (/path_section/i.test(continueOptions.url)) {
        continueOptions.url = continueOptions.url.replace('.+', '/html5/abc/path_section');
    }

    /* Child nodes are click target for IE10 */
    [].forEach.call(this.tmElements.tmBtnContinue.children, function (a) {
        /* tracking */
        a.setAttribute('data-tracking', continueOptions.tracking);
        addListener(a, 'click', function () {
            loadPage(continueOptions.url);
        });
    }, this);

    /* Set rollover sound */
    SoundControl.buttonRollover(this.tmElements.tmBtnContinue, continueOptions.sound);

    return continueOptions;
};

/* REPLAY/PLAYAGAIN BTN: Set rollover sound and functionality */
TicketMachine.prototype.setReplayBtn = function () {
    SoundControl.buttonRollover(this.tmElements.tmBtnReplay, this.tmOptions.audioPath + '/playagain.mp3');

    var tmInstance = this;
    addListener(this.tmElements.tmBtnReplay.children[0], 'click',
        function _fn (e) {
            removeListener(this, 'click', _fn);
            tmInstance.gtInstance.doReplay.call(tmInstance.gtInstance, e);
            tmInstance.hideTabOnClose = true; /* REPLAY closes TM; also hide sp tab and reset anim */
            window[tmInstance.tmData.spID].hide();
            tmInstance.tmOptions.playAnimOnOpen = true;
        }
    );
    
    /* tracking */
    this.tmElements.tmBtnReplay.children[0].setAttribute('data-tracking', 'ticket machine:play again:' + this.tmOptions.activityType + ':' + this.gtData.cid);

};
/* Replace tokens in strings */ //*** WIP34: localization (not currently used)
// example: this.parseToken('Hello %S%!', '%S%', 'M')
TicketMachine.prototype.parseToken = function (string, token, replacement) {
    if (string.match(token) !== null) return string.replace(token, replacement);
    return string;
};
/* Set display value round counter on abcmouse graphic */
TicketMachine.prototype.setTMCounter = function (n) {
    var n = !isNaN(n) ? n :  '';
    this.setText(this.tmElements.tmCounter, n);
};
/* Set display value msg text above basket */
TicketMachine.prototype.setTMMsg = function (string) {
    var string = string;
    var textClasses = {
            en: 'text-en',
            zhs: 'text-zhs',
        },
        textClass = this.tmOptions.language in textClasses ? textClasses[this.tmOptions.language] : textClasses['en'];

    /* if just numbers, remove .text class */
    if (/^[0-9]*$/i.test(string)) {
        removeClass(this.tmElements.tmMsg.id, textClass); //*** WIP34: msg css, CN localization
        string = this.addCommas(string);
    }
    /* if string contains alphabetical chars, add .text class */
    else {
        addClass(this.tmElements.tmMsg.id, textClass); //*** WIP34: msg css, CN localization
    }
    this.setText(this.tmElements.tmMsg, string);
    return this.tmElements.tmMsg;
};

/* Add favorite, show confirmation popup */
TicketMachine.prototype.addToFavorites = function () {
    if (!this.gtData.cid) throw new Error('No CID specified');
    ajax('/html5/xml/addfavorites.php', {
        cid  : this.gtData.cid, link : this.gtData.link, icon : this.gtData.icon,
    }, function (data) {
        showPopup('addfavorite.php?cid=' + this.gtData.cid);
    }.bind(this));
};

/* SP EVENT HANDLERS */
TicketMachine.prototype.onOpenStart = function () {
    /* toggle sp tab chevron */
    this.swapClasses('sidepanel_wrapper_ticketmachine', {add: ['opened'], rem: ['closed']});
    this.tmEmitter.emit('ticketMachine:openStart');
};

TicketMachine.prototype.onOpenEnd = function () {
    this.debug && console.log('TicketMachine.prototype.onOpenEnd'); //***
    this.tmEmitter.emit('ticketMachine:openEnd');
};

TicketMachine.prototype.onCloseStart = function () {
    /* toggle sp tab chevron */
    this.swapClasses('sidepanel_wrapper_ticketmachine', {add: ['closed'], rem: ['opened']});
    this.tmEmitter.emit('ticketMachine:closeStart');
};

TicketMachine.prototype.onCloseEnd = function () {
    /* reset layout for anim, if playAnimOnOpen or hideTabOnClose */
    (this.tmOptions.playAnimOnOpen || this.hideTabOnClose) && this.resetAnimation(); //***WIP26: zero tickets, replay clicked
    this.hideTabOnClose && this.setTMVisibility(false);
    this.hideTabOnClose = false;
    this.tmEmitter.emit('ticketMachine:closeEnd');
};

/* INIT - RUN ONCE, SP PHP LOAD [irrespective of gt state] */
//*** need to make sure this runs appropriately regardless of varying page load methods (e.g. efl)
TicketMachine.prototype.init = function () {
    /* Map relevant TM SP DOM elements */
    this.getTMElements();

    /* Hide TM SP */
    this.setTMVisibility(false);

    /* Set SP tab chevron */
    this.swapClasses('sidepanel_wrapper_ticketmachine', {
        rem: ['opened'],
        add: ['closed'],
    });

    /* Get audio path for current language */
    this.tmOptions.audioPath = this.tmOptions.audioLanguages[this.tmOptions.language]; //*** WIP34: localization
    // this.tmOptions.audioPath = this.tmOptions.audioLanguages[this.tmOptions.language];

    /* Create and attach avatar */
    this.setTMAvatar();

    /* If playAnimOnOpen, anim will play after openEnd */
    this.tmEmitter.on('ticketMachine:openEnd', function (e) {
        var ticketsEarned = this.gtData.custompoint > 0 ? this.gtData.custompoint : this.gtData.points,
            ticketsTotal = this.gtData.total_points; //*** seeded default; need solution for playFullTMAnimation error; 0 is valid in reality

         /* Play all animations */
        this.tmOptions.playAnimOnOpen && this.tmAnimations.playFullTMAnimation({
            ticketsEarned: ticketsEarned,
            ticketsTotal: ticketsTotal
        });
        /* Set playAnimOpen to false so anims don't play on each SP openEnd event */
        this.tmOptions.playAnimOnOpen = false;

    }.bind(this));

    //***WIP7
    var focusLost = this.focusLost.bind(this),
        playPauseActiveAnimations = this.playPauseActiveAnimations.bind(this),
        togglePlay = function () {
            if (focusLost()) playPauseActiveAnimations(true);
            else playPauseActiveAnimations();
        }.bind(this);
        
    this.tmEmitter.on('ticketMachine:allAnimationsStart', function () {
        this.tmAnimations.animPlaying = true;
        addListener(document, 'visibilitychange', togglePlay); //***WIP7
    }.bind(this));

    this.tmEmitter.on('ticketMachine:allAnimationsDone', function () {
        this.tmAnimations.animPlaying = false;
        this.gtInstance.popupGradeAdvisor();
        removeListener(document, 'visibilitychange', togglePlay); //***WIP7
    }.bind(this));

};

//***WIP7
/**
 * Toggle playback of active TM animations
 * @param  {boolean} pause Whether to call stop (true) or play (false) method of GP instance
 */
TicketMachine.prototype.playPauseActiveAnimations = function (pause) {
    for (var i in this.tmElements.animContainers) {
        if (pause && this.tmAnimations.animPlaying) {
            this.tmElements.animContainers[i].animPlayer.stop();
            this.tmElements.animContainers[i].animPlayer.pauseAllSounds();
            this.tmAnimations.animPlaying = false;
        } else if (!pause && !this.tmAnimations.animPlaying) {
            this.tmElements.animContainers[i].animPlayer.play();
            this.tmAnimations.animPlaying = true;
        }
    }
};

//*** WIP7
/**
 * Cross-browser check for whether document.hidden is true (IE10+)
 * @return {boolean} Reflects hidden prop of document obj
 */
TicketMachine.prototype.focusLost = function () {
    var documentIsHidden = document.hidden || document.mozHidden || document.msHidden || document.webkitHidden || false;
    this.debug && console.log('focusLost::documentIsHidden:', documentIsHidden); //***
    return documentIsHidden;
};

/* Call when gt gets response data from end/post method */
TicketMachine.prototype.tmLaunch = function () {
    var isExample = window.location.search.indexOf('example=true') >= 0;
    this.debug && console.log('TicketMachine.prototype.tmLaunch'); //***
    this.tmOptions.playAnimOnOpen = true;

    this.setContinueBtn(this.gtData.lastarea);
    this.setNavMoreBtn(this.gtData.meta_type);
    this.setNavBtns();
    this.setReplayBtn();

    /* make sp tab visible */
    this.setTMVisibility(true);

    /* [Caigoy,012516,QAV-4870] Disable broken SP tab dragging */
    window[this.tmData.spID].touchmove = function (e) {
        e.stopPropagation();
        return false;
    };

    /* [Caigoy,012616,ABCMG-128] Per request: replaces sidePanelOpen event from SP class */

    if(!isExample) {
        Analytics.trackEvent('@ticketMachine', {
            ticketsEarned: this.gtData.custompoint > 0 ? this.gtData.custompoint : this.gtData.points,
            cid: this.gtData.cid || 0
        });
    }

    /* After SP opened, anim will play, flow continues with openEnd event handler */
    showSidepanelById(this.tmData.spID, {});
};

/* polyfill for remove method (ie support) */
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
