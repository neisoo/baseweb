var pageCanvasSize   = { "w" : 400, "h" : 550 };
var pageCoverSize    = { "w" : 380, "h" : 520 };
var pageImageSize    = { "w" : 380, "h" : 520 };
var shadowWidth	 = 40;
var shadowPageOffset = 13;

var BookConstants =
{
     'RENDER_PAGE_FLIP_SHADOWS' : true,
     'CALCULATE_AUDIO_POSITION' : true,
     'USE_ANIMATION_FRAME' : false,
     'DRAG_PAGE_ENABLED': true,
     'PAUSE_AFTER_PAGE_ENABLED' : false,
     'USE_SEPARATE_CANVAS_FOR_TEXT_FILL_ENABLED' : true,
     'PAGE_FLIP_ENABLED' : true,
     'USE_SLOW_AUDIO_DURATION_PERCENTAGE_ENABLED' : true,
     'ALLOW_SLIDER_TOUCH' : true,

     'SKEW_FACTOR_RIGHT' : 2,
     'SKEW_FACTOR_LEFT' : 2,
     'SKEW_FACTOR_CENTER' : 34,
     'SKEW_FACTOR_CENTER_SHADOW' : 20,
     'FACTOR_TOP' : 10,
     'FACTOR_HEIGHT' : 7,
     'FACTOR_HEIGHT_SHADOW' : 13,
     'FACTOR_TOP_CENTER' : 4,

     'SLOW_AUDIO_DURATION_PERCENTAGE' : 1.25,

     'DELAY_FOR_UPDATE_PAGES_AFTER_FLIP_STARTS' : 0.007,

     'PAGE_FLIP_ANIMATION_SECONDS' : 0.65,
	'PAGE_CANVAS_SIZE' : pageCanvasSize,
     'PAGE_IMAGE_SIZE' : pageImageSize,

     'SPINNER_FPS' : 30,

     'ANIMATIONS_LEFT_OFFSET' : {"x" : pageCanvasSize.w - pageImageSize.w, "y" : ((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },
     'ANIMATIONS_RIGHT_OFFSET' : {"x" : 0, "y" : ((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },

     'IMAGE_LAYER_LEFT_OFFSET' : {"x" : pageCanvasSize.w - pageImageSize.w, "y" : ((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },
     'IMAGE_LAYER_RIGHT_OFFSET' : {"x" : 0, "y" : ((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },

     'PAGE_SHADOW_MAX_GRADIENT_COLOR' : "rgba(0,0,0,0.2)",
     'PAGE_SHADOW_MIN_GRADIENT_COLOR' : "rgba(0,0,0,0)",

     'PAGE_LEFT_SHADOW_GRADIENT'  		    : { "x"  : pageCanvasSize.w - shadowWidth, "y" : 0, "finalX" : pageCanvasSize.w, "finalY" : 0 },
     'PAGE_LEFT_SHADOW_GRADIENT_FILL_RECT'  : { "x"  : pageCanvasSize.w - shadowWidth, "y" : shadowPageOffset, "w" : shadowWidth,  "h" : pageImageSize.h },

     'PAGE_RIGHT_SHADOW_GRADIENT' 			: { "x"  : 0,   "y" : 0, "finalX" : shadowWidth,  "finalY" : 0 },
     'PAGE_RIGHT_SHADOW_GRADIENT_FILL_RECT' : { "x"  : 0,   "y" : shadowPageOffset, "w" : shadowWidth,  "h" : pageImageSize.h },

     'PAGE_COVER_LEFT_SHADOW_GRADIENT_FILL_RECT'  : { "x"  : pageCanvasSize.w - shadowWidth,   "y" : 0, "w" : shadowWidth,  "h" : pageCanvasSize.h },
     'PAGE_COVER_RIGHT_SHADOW_GRADIENT_FILL_RECT' : { "x"  : 0,                                "y" : 0, "w" : shadowWidth,  "h" : pageCanvasSize.h },

     'PAGE_IMAGE_LEFT_POSITION'  : { "x"  : pageCanvasSize.w - pageImageSize.w + 1, "y" : 6 + ((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },
     'PAGE_IMAGE_RIGHT_POSITION' : { "x"  : 2,                                  "y" : 6 +((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },

     'PAGE_LEFT_FILL_RECT'  : {"x": 0,  "y": 3, "w": pageCoverSize.w + 5, "h": pageCoverSize.h },
     'PAGE_RIGHT_FILL_RECT' : {"x": -5, "y": 3, "w": pageCoverSize.w + 5, "h": pageCoverSize.h },

     'PAGE_COVER_LEFT_FILL_RECT'  : {"x": (pageCoverSize.w - pageImageSize.w ), "y": 0, "w": pageImageSize.w, "h": pageCanvasSize.h},
     'PAGE_COVER_RIGHT_FILL_RECT' : {"x": 0,                                 "y": 0, "w": pageImageSize.w, "h": pageCanvasSize.h},

     'PAGE_COVER_FILL_RECT_ROUND_RADIOUS' : 7,

     'PAGE_COVER_IMAGE_LEFT'  : { "x"  : (pageCanvasSize.w - pageImageSize.w)+4, "y" : ((pageCanvasSize.h - pageImageSize.h) / 2)-3, "w": pageImageSize.w-10, "h": pageCanvasSize.h-18},
     'PAGE_COVER_IMAGE_RIGHT' : {"x": 2,                                     "y" : ((pageCanvasSize.h - pageImageSize.h) / 2)-5, "w": pageImageSize.w+4, "h": pageCanvasSize.h-12},

     'BACKGROUND_COVER_LEFT'  : {"x": 0,  "y": 5, "w": pageCoverSize.w + 5, "h": pageCoverSize.h },
     'BACKGROUND_COVER_RIGHT' : {"x": -5, "y": 5, "w": pageCoverSize.w + 5, "h": pageCoverSize.h },

     'BORDER_IMAGE_LEFT'  : {"x": 7,   "y": ((pageCanvasSize.h - pageImageSize.h) / 2) - 2, "w": 25, "h": pageImageSize.h + 0.4},
     'BORDER_IMAGE_RIGHT' : {"x": 369, "y": ((pageCanvasSize.h - pageImageSize.h) / 2) - 2, "w": 25, "h": pageImageSize.h + 0.4},

     'SHORT_SHADOW_LEFT'  : { "x"  : 360, "y" : 536, "w" : 80, "h" : 5 },
     'SHORT_SHADOW_RIGHT' : { "x"  : -40, "y" : 536, "w" : 80, "h" : 5 },

     'LONG_SHADOW_LEFT'  : { "x"  : 10,  "y" : 532, "w" : pageImageSize.h, "h" : 4 },
     'LONG_SHADOW_RIGHT' : { "x"  : -10, "y" : 532, "w" : pageCoverSize.w, "h" : 4 },

     'BORDER_PAGE_BOTTOM' : { "x"  : 0,  "y" : 0, "w" : pageImageSize.w + 20, "h" : 20},
     'BORDER_PAGE_SIDE'  : { "x"  : 2,  "y" : 0, "w" : 20, "h" : pageImageSize.h + 20},

     'USERNAME_ATTRIBUTES' : {"x": 137, "y": 226, "color": "rgb(150, 116, 84)", "text_align": "center", "font":" aofl_century_gothic" ,"font_size": "13px", "font_weight": "bold" },

     'PAGE_CHILDREN_NAMES' : {"image" : "imageName", "text" :  "textImageName", "username" : "username", "highlight" : "highlightContainer"},

     'TEXT_HIGHLIGHT_STYLE_CONTINUOUS'   : 'continuous',
     'TEXT_HIGHLIGHT_STYLE_WORD_BY_WORD' : 'wordbyword',
     'TEXT_HIGHLIGHT_FPS' : 60,

     'HIT_AREA_OUTER_EDGE_OF_PAGE' : 40, // using 40px, When the user clicks on the outer edge of either page the page should turn.

     'BOOK_AUDIO_MAX_PROGRESS' : 0.998, //Using "0.996" to avoid floating precision issues

     'OFFSET_SPACE_BETWEEN_PAGES' : 0.2,// there is a space between left and right pages in some iOS devices.

     'PAGE_FLIP_IMAGE_OFFSET' : pageCanvasSize.w - pageImageSize.w + 2,
     'PAGE_FLIP_RENDER_SHADOW' : {"w" : 45, "h" : 520, "top" : 19},
     'PAGE_FLIP_RENDER_BORDER_SHADOW' : {"w" : 20, "h" : 520, "top" : 13}

};
