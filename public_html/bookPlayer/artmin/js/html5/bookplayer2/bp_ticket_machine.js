function BPTicketMachine()
{
    this.bookCID = 0;
    this.gameID = 0;
    this.tracker = null;
    var context = this;
    this.replayMethod = function(evt){ context.replayGame(evt);}
    this.hasCalledTM = false;
}

BPTicketMachine.prototype.initializeTicketMachine = function(bookCID, gameID, callback)
{
    this.bookCID = bookCID; //deprecated
    this.gameID = gameID;
    this.tracker = null;
    this.tracker = new GameTracker(this.bookCID, this.gameID);
    addListener( this.tracker, 'doReplay', this.replayMethod);
    this.tracker.start();
    var self = this;
    addListener(this.tracker, 'gt_info_ready', function() {
      if (callback) {
        callback(self.tracker);
      }
    });
};

BPTicketMachine.prototype.replayGame = function(evt)
{
    location.reload();
    return;
};

BPTicketMachine.prototype.openTicketMachine = function(trackerProgress)
{
  if(this.tracker != null && this.tracker != '' && !this.hasCalledTM){
    if(trackerProgress < .8){
      this.tracker.custompoint = 1;
    }

    this.hasCalledTM = true;
    this.tracker.ticketMachine();
  }
};
