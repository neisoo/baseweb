/* moved require.config to its own file to resolve order of operations issue with inline usage */
/* http://requirejs.org/docs/api.html#data-main */
require.config({
    urlArgs: "bust=" + (new Date()).getTime(), /* IE9, IE10 FAIL without aggressive cache busting */
    paths: {
        'graphicManager'          : '/artwork/core_client_library/js/graphic-player/1.0.1/graphic_manager',
        'graphicPlayer'           : '/artwork/core_client_library/js/graphic-player/1.0.1/graphic_player',
        'graphicSprite'           : '/artwork/core_client_library/js/graphic-player/1.0.1/graphic_player_sprite',
        'graphicAudio'            : '/artwork/core_client_library/js/graphic-player/1.0.1/graphic_player_audio',
        'gameTracker'             : '/artwork/core_client_library/js/legacy-sites-js/3.0.0/gametracker',
        'ticketmachineanimations' : '/artwork/js/html5/sidepanels/ticketmachineanimations',
        'ticketmachine_imgdata'   : '/artwork/js/html5/sidepanels/ticketmachine_imgdata',
        'promise_polyfill'        : '/artwork/core_client_library/js/promise-polyfill/4.0.3/promise.min',
    },
    shims: {
        'ticketmachineanimations': {
            deps: ['graphicPlayer', 'graphicManager', 'gameTracker', 'ticketmachine_imgdata', 'promise_polyfill'],
            exports: 'ticketmachineanimations'
        },
    },
    waitSeconds: 0 /* disable timeout, for slow connections */
});
