var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('lodash');
var promise = require('bluebird');

module.exports = Reflux.createStore({
  listenables: [Actions],
  saveImage: function(obj){
    Api.save(obj, function(res){
      console.log(obj);
      this.favorites = res;
      this.triggerChange();
    }.bind(this));
  },
  getFavorites: function() {
    return Api.getFavs(function (res) {
      this.favorites = res;
      console.log(res)
      this.triggerChange();
    }.bind(this));
  },
  getFavImages: function(){
    console.log('called');
    return Api.getFavImages(function (res) {
      console.log(res[0], res[1]);
      this.favImages = [];
        _.forEach(res,function(res){
          this.favImages.push(res.data);
        }.bind(this));
      console.log(this.favImages);
      this.triggerChange();
    }.bind(this));
  },
  triggerChange: function(){
    this.trigger('change', this.favorites);
    this.trigger('change', this.favImages);
  }
});