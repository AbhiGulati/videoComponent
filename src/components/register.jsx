var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Navigation = ReactRouter.Navigation;
var Route = ReactRouter.Route;
var Link = Router.Link;
var Actions = require('../actions');
var AuthStore = require('../stores/auth-store');

module.exports = React.createClass({
  mixins: [ Reflux.listenTo(AuthStore, 'onChange'), Navigation],
  getInitialState: function(){
    return {
      loggedIn: false
    }
  },
  componentWillMount: function(){
    Actions.checkIfLoggedIn();
  },
  render: function(){
    return <div className="container" id='signup'>
      <div className="col-md-6 col-md-offset-3">

        <h1>signup</h1>
        <form name="signupForm" onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label id="email">Email</label>
            <input ref="email" className="form-control" name="email" type='text'/>
            </div>

            <div className="form-group">
              <label id="password">Password</label>
              <input ref="password" className="form-control" name="password" type="password"/>
              </div>
              <button className="btn btn-primary">signup</button>
            </form>
          </div>
        </div>
  },
  handleSubmit: function(event){
    event.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    console.log(email, password);
    Actions.fbRegister({email: email, password: password});

    this.refs.email.getDOMNode().value = "";
    this.refs.password.getDOMNode().value = "";
    Actions.login(email, password);
    this.transitionTo('/');
  }
});