var Fetch = require('whatwg-fetch');
var rootUrl = 'https://api.imgur.com/3/';
var fbUrl = 'https://craply.firebaseio.com/';
var apiKey = '92f1493569279a3';
var _ = require('lodash');
var promise = require('bluebird');

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url, {
      headers: {
        'Authorization': 'Client-ID ' + apiKey
      }
    })
    .then(function(response){
      return response.json();
    });
  },
  getFavImages: function(cb){
    this.getFavs(function(favs) {
      var images = _.map(favs, function (id) {
        return fetch(rootUrl + 'image/' + id, {
          headers: {
            'Authorization': 'Client-ID ' + apiKey
          }
        }).then(function (response) {
              console.log(response);
              return response.json();
            });
        });
        return Promise.all(images).then(function(arr) {
          cb(arr);
        });
    });
  },
  pretendRequest: function(email, password, cb){
    console.log("also in here");
    return setTimeout(function() {
      if (email === 'richard.vancamp@gmail.com' && password === 'rvc1') {
        cb({
          authenticated: true,
          token: Math.random().toString(36).substring(7)
        });
      } else {
        cb({authenticated: false});
      }
    }, 0);
  },
  save: function(obj, cb) {
    return setTimeout(function () {
      if (!localStorage.favorites){
        var favs = localStorage.favorites = [];
      } else {
        var favs = JSON.parse(localStorage.favorites);
      }
      if (favs.indexOf(obj.id) === -1){
        favs.push(obj.id);
      }
      localStorage.favorites = JSON.stringify(favs);
      var results = JSON.parse(localStorage.favorites);
      cb(results);
    }, 0);
  },
  getFavs: function(cb) {
    if (localStorage.favorites) {
      cb(JSON.parse(localStorage.favorites));
    } else {
      cb(null);
    }
  },
  postUser: function(userData, cb) {
    return fetch(fbUrl + '/users.json', {
      method: 'post',
      headers: {
        'Authorization': 'Client-ID ' + apiKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
        "access-control-allow-headers": "contentType, accept, data, Content-Type",
        "access-control-max-age": 10 // Seconds.
      },
      body: JSON.stringify(userData)
      })
      .then(function(res){
        console.log(res);
      })
    },
  getUsers: function() {
    return fetch(fbUrl + 'users.json', {
      headers: {
        'Authorization': 'Client-ID ' + apiKey
      }
    })
      .then(function(response){
        console.log(response)
        return response.json();
      });
  }
};