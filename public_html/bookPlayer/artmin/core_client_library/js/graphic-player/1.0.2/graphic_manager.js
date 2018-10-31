/**
* GraphicManager, GraphicPlayer controller 
*
* @category cms
* @package GraphicManager
* @subpackage DataAccessLayer
* @version $Id$
* @param string baseUrl The current page url
*/
function GraphicManager(baseURL){
    'use strict';
    this.stackIndex = 0;
    this.enterFrame = null;
    this.batchStack = [];
    this.stack = {};
    if(baseURL === void 0){
        baseURL = '/adminart/converted_animations/';
    }
    this.baseURL = baseURL;
}

/**
* Destroy each stack in stack list
*/
GraphicManager.prototype.clearAll = function(){
    'use strict';
    for(var i in this.stack){
        this.stack[i].destroy();
    }
    this.stack = {};
};

/**
* Destroy animation by the stackid
*
* @param integer stackid The stackid of stack, that will be destroyed
*/
GraphicManager.prototype.destroyAnimation = function(stackid){
    'use strict';
    this.stack[stackid].destroy();
};

/**
* Stop animation action
*/
GraphicManager.prototype.stopEnterFrame = function(){
    'use strict';
    if(this.enterFrame){
        this.enterFrame.stop();
        this.enterFrame = null;
    }
};

/**
* Start animation action
*
* @uses \admin\core_client_library\js\legacy-sites-js\1.0\EnterFrame
*/
GraphicManager.prototype.startEnterFrame = function(){
    'use strict';
    if(!this.enterFrame){
        this.enterFrame = new EnterFrame(this,this.processEnterFrame);
    }
};

/**
* Process animation action
*
* Recursive function. Check animation status dunamicly. Check does animation playing and make some action.
*/
GraphicManager.prototype.processEnterFrame = function(){
    'use strict';
    var now = (new Date()).getTime();
    var graphicRunning = false;
    for(var i in this.stack){
        var graphic = this.stack[i];        
        if(graphic != void 0){
            if(graphic.ready){
                if(graphic.isPlaying){
                    graphic.runTimeline(now);
                }else{

                }
            }
        }
    }
};

/**
* Check if we should start the enter frame
*
*/
GraphicManager.prototype.checkEnterFrame = function(){
    'use strict';
    //check if we should start the enterFrame
    var startEngine = false;
    for(var i in this.stack){
        if(this.stack[i].isPlaying){
            startEngine = true;
        }
    }
    if(startEngine && !this.enterFrame){
        this.startEnterFrame();
    }
    if(!startEngine){
        this.stopEnterFrame();
    }
};

/**
* Load animation from server by animation asset id and show it by using GraphicPlayer
*
* @param string container The animation display container id
* @param string id The animation asset id
* @param bool autoPlay The auto play start flag
* @param bool loop The play loop flag
*
* @return The new GraphicPlayer object
*
* @uses GraphicPlayer
*/
GraphicManager.prototype.loadAnimation = function(container, id, autoPlay, loop, PlayerObject){
    'use strict';
    var graphic;
    if(PlayerObject == void 0){
        graphic = new GraphicPlayer(container, id, autoPlay, loop, this.baseURL);
    }else{
        graphic = new PlayerObject(container, id, autoPlay, loop, this.baseURL);
    }
    //var graphic = new GraphicPlayer(container, id, autoPlay, loop, this.baseURL);
    addListener(graphic,'animationStarted',this.checkEnterFrame.bind(this));
    addListener(graphic,'animationStopped',this.checkEnterFrame.bind(this));
    this.stack[this.stackIndex] = graphic;
    this.stackIndex++;

    return graphic;
};

/**
* Get Animation by stack id
*
* @param int is the stackid
*
* @return The GraphicPlayer object
*/
GraphicManager.prototype.getAnimation = function(stackid){
    'use strict';
    var player = null;
    player = this.stack[stackid];
    if(player == void 0){
        player = null;
    }   
    return player;
};

/**
* Load batch of animation asset ids
*
* @param object batchStack The batch with stacks [{container:container,id:id,loop:loop},{...}]
*/
GraphicManager.prototype.loadBatch = function(batchStack){
    'use strict';
    //autoPlay forced false, [{container:container,id:id,loop:loop},{...}]
    this.batchStack = batchStack;
    for(var i = 0; i < batchStack.length;i++){
        var batchItem = batchStack[i];
        var graphic = this.loadAnimation(batchItem.container,batchItem.id,false,batchItem.loop,this.baseURL);
            addListener(graphic,'animationReady',this.checkBatchReady.bind(this));
    }
};

/**
* Check batch ready
*/
GraphicManager.prototype.checkBatchReady = function(){
    'use strict';
    var stackReady = 0;
    for(var i in this.stack){
        if(this.stack[i].ready){
            stackReady++;
        }
    }
    if(this.batchStack.length == stackReady){
        this.dispatchEvent('batchReady');
    }
};

enableEventHandling(GraphicManager);
