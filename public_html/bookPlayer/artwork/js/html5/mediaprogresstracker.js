/* global addListener, Math, window */
/* jshint unused:false */
var MediaProgressTracker = (function () {
    "use strict";

    function MediaProgressTracker(options) {
        this.options = this.getDefaultOptions();
        this.setOptions(options);
        this.mediaObject = null;
        this.interval = null;
        this.tracking = false;
        this.heatMap = {};
        this.heatMapSize = 0;
    }


    MediaProgressTracker.prototype = {
        constructor: MediaProgressTracker,
        getDefaultOptions: function () {
            return {
                completionThreshold: 0.8,
                progressInterval: 500
            };
        },
        setOptions: function (options) {
            for (var index in options) {
                this.options[index] = options[index];
            }
        },
        setMediaObject: function (mediaObject) {
            this.mediaObject = mediaObject;
            if (!isFinite(this.mediaObject.getDuration()) || parseInt(this.mediaObject.getDuration()) === 0) {
                addListener(this.mediaObject, 'loaded', this.initHeatMap.bind(this));
            } else {
                this.initHeatMap();
            }
        },
        initHeatMap: function () {
            var duration = parseInt(this.mediaObject.getDuration()) * 1000;

            this.heatMapSize = Math.floor(duration / this.options.progressInterval);

            for (var i = 0; i < this.heatMapSize; i++) {
                this.heatMap[i * this.options.progressInterval] = 0;
            }
        },
        trackMedia: function () {
            if (this.tracking) {
                return;
            }

            this.tracking = true;

            addListener(this.mediaObject, 'complete', function () {
                window.clearInterval(this.interval);
                this.tracking = false;
            }.bind(this));

            this.interval = window.setInterval(function () {
                var currentPosition = Math.round(parseFloat(this.mediaObject.getPosition()) * 1000 / this.options.progressInterval) * this.options.progressInterval;
                if (this.mediaObject.playing) {
                    if(!isFinite(this.heatMap[currentPosition])) {
                        this.heatMap[currentPosition] = 1;
                    } else {
                        this.heatMap[currentPosition] ++;
                    }
                }
            }.bind(this), this.options.progressInterval);
        },
        getCompletedPercentage: function () {
            var nonEmptyBins = 0;
            for (var bin in this.heatMap) {
                if (this.heatMap[bin] !== 0) {
                    nonEmptyBins++;
                }
            }
            return nonEmptyBins / this.heatMapSize;
        }
    };

    return MediaProgressTracker;
}());
