require.config({
    paths:{
        'graphicPlayer' : '/core_client_library/js/graphic-player/1.0.1/graphic_player',
    }
});
define([
	'graphicPlayer'
	],function(GraphicPlayer){
	'use strict';
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
		this.graphicPlayerListIndex = 0;
		this.enterFrame = null;
		this.batchStack = [];
		this.graphicPlayerList = {};
		baseURL = baseURL || '/adminart/converted_animations/';
		this.baseURL = baseURL;
	}

	/**
	* Destroy each stack in stack list
	*/
	GraphicManager.prototype.clearAll = function(){
		for(var i in this.graphicPlayerList){
			this.graphicPlayerList[i].destroy();
		}
		this.graphicPlayerList = {};
	};

	/**
	* Destroy animation by the stackid
	*
	* @param integer stackid The stackid of stack, that will be destroyed
	*/
	GraphicManager.prototype.destroyAnimation = function(stackid){
		this.graphicPlayerList[stackid].destroy();
	};

	/**
	* Stop animation action
	*/
	GraphicManager.prototype.stopEnterFrame = function(){
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
		var now = (new Date()).getTime();
		var graphicRunning = false;
		for(var i in this.graphicPlayerList){
			var graphic = this.graphicPlayerList[i];		
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
		//check if we should start the enterFrame
		var startEngine = false;
		for(var i in this.graphicPlayerList){
			if(this.graphicPlayerList[i].isPlaying){
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
		var graphic;
		if(PlayerObject == void 0){
			graphic = new GraphicPlayer(container, id, autoPlay, loop, this.baseURL);
		}else{
			graphic = new PlayerObject(container, id, autoPlay, loop, this.baseURL);
		}
		//var graphic = new GraphicPlayer(container, id, autoPlay, loop, this.baseURL);
		addListener(graphic,'animationStarted',this.checkEnterFrame.bind(this));
		addListener(graphic,'animationStopped',this.checkEnterFrame.bind(this));
		this.graphicPlayerList[this.graphicPlayerListIndex] = graphic;
		this.graphicPlayerListIndex++;

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
		var player = null;
		player = this.graphicPlayerList[stackid];
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
		var stackReady = 0;
		for(var i in this.graphicPlayerList){
			if(this.graphicPlayerList[i].ready){
				stackReady++;
			}
		}
		if(this.batchStack.length == stackReady){
			this.dispatchEvent('batchReady');
		}
	};
	enableEventHandling(GraphicManager);

	return GraphicManager;
});