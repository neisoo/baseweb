function BPFavoriteAPI(){
  var context = this;
  this.favoriteCallBack = function(data){
    context.addedFavorite(data);
  };
}


BPFavoriteAPI.prototype.addToFavorites = function(){
  var bookCID = BookUtils.instance.cid;
  var arrayArguments =  [bookCID,"",""];
  var json = JSON.stringify( arrayArguments );
  ApiService.call("user_addfavoriteactivity", {arguments: json}, this.favoriteCallBack);
};

BPFavoriteAPI.prototype.addedFavorite = function(data){
  var result = data.success;
  if(result)
  {
    showPopup("addfavorite.php?cid=" + BookUtils.instance.cid);
  }
};
