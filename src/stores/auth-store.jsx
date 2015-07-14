var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  listenables: [Actions],
  login: function (email, password) {
    console.log(email, password);
    if (localStorage.token) {
      this.loggedIn = true;
      this.triggerChange();
    } else {
      Api.pretendRequest(email, password, function(res) {
        if (res.authenticated) {
          localStorage.token = res.token;
          this.loggedIn = true;
          this.triggerChange();
        } else {
          this.loggedIn = false;
          this.triggerChange();
        }
      }.bind(this));
    }
  },
  getToken: function() {
    return localStorage.token;
  },
  logout: function(){
    delete localStorage.token;
    this.loggedIn = false;
    this.triggerChange();
  },
  checkIfLoggedIn: function(){
    console.log(!!localStorage.token);
    return !!localStorage.token;
  },
  triggerChange: function(){
  this.trigger('change', this.loggedIn);
  }
})