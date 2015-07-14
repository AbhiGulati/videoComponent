var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({
  listenables: [Actions],
  login: function (email, password) {
    var em = email;
    var pd = password;
    if (localStorage.token) {
      this.loggedIn = true;
      this.triggerChange();
    } else {
      Api.getUsers()
          .then(function (res) {
            var check = _.filter(res, _.matches({email: em, password: pd}));
            if (check === undefined) {
              this.loggedIn = false;
              this.triggerChange;
            } else {
              this.loggedIn = true;
              this.triggerChange();
            }
            /* Api.pretendRequest(email, password, function(res) {
             if (res.authenticated) {
             localStorage.token = res.token;
             this.loggedIn = true;
             this.triggerChange();
             } else {
             this.loggedIn = false;
             this.triggerChange();
             }
             }.bind(this)); */
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
  fbRegister: function(userData){
    var userData = userData;
    console.log(userData);
    Api.postUser(userData)
        .then(function(res){
          console.log(res)
          this.triggerChange();
        }.bind(this));
    Api.getUsers()
        .then(function(res){
          var check = _.filter(res, _.matches({email:"th", password: "bob"}));
          if(check === undefined){
            console.log("registration failed")
            return {error: "registration failed"}
          } else {
            console.log("registration succeeded")
            return check;
          }
        }
    );
  },
  triggerChange: function(){
  this.trigger('change', this.loggedIn);
  }
})