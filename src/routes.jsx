var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/hashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require('./components/main');
var Topic = require('./components/topic');
var ImageDetail = require('./components/image-detail');
var Favorites = require('./components/favorites');
var Register = require('./components/register');

module.exports = (
    <Router history={new HashHistory}>
        <Route path="/" component={Main}>
          <Route path="topics/:id" component={Topic}/>
          <Route path="images/:id" component={ImageDetail}/>
          <Route path="favorites" component={Favorites}/>
          <Route path="register" component={Register}/>
        </Route>
    </Router>
);