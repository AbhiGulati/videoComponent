var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../actions');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic-store');
//var CommentStore = require('../stores/comment-store');
var AuthStore = require('../stores/auth-store');


module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange'),
 //   Reflux.listenTo(CommentStore, 'onChange'),
    Reflux.listenTo(AuthStore, 'onAuthChange')
  ],
  getInitialState: function(){
    return {
      topics: [],
      loggedIn: false
    }
  },
  componentWillMount: function(){
    Actions.getTopics();
    //AuthStore.onChange = this.setStateOnAuth();
    Actions.checkIfLoggedIn();
  },
  setStateOnAuth(){
    this.setState({
      loggedIn: Actions.checkIfLoggedIn()
    });
  },
  render: function() {
    return <nav className="navbar navbar-default head">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand">
            CRAPLY
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button">
                TOPICS <span className="caret"></span></a>
            <ul className="dropdown-menu">
            {this.renderTopics()}
            </ul>
              </li>
              <li>
                {this.state.loggedIn && <Link activeClassName="active" to="favorites">FAVORITES</Link>}
              </li>
            </ul>
          {this.state.loggedIn ? this.renderLogout() : this.renderLogin()}
        </div>
      </div>
    </nav>
  },
  renderTopics: function(){
    return this.state.topics.map(function(topic){
      return <li key={topic.id}>
        <Link activeClassName="active" to={"topics/" + topic.id}>
          {topic.name}
          </Link>
        </li>
    })
  },
  renderLogin: function(){
    return <form onSubmit={this.handleSubmit} className="navbar-form navbar-right" role="search">
      <div className="form-group">
        <input ref="email" type="text" className="form-control" placeholder="Email"/>
      </div>
      <div className="form-group">
        <input ref="password" type="text" className="form-control" placeholder="Password"/>
      </div>
      <button type="submit" className="btn btn-default">Login</button>
      {/*this.state.error && (
          <p>Bad login information</p>
      )*/}
    </form>
  },
  renderLogout: function(){
    return <form className="navbar-form navbar-right">
             <button className="btn btn-default" onClick={this.handleBtnSubmit}>Logout</button>
           </form>
  },
  handleBtnSubmit: function(event){
    event.preventDefault();
    console.log("in logout handler")
    Actions.logout();
  },
  handleSubmit: function(event){
    event.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;

    Actions.login(email, password);

    this.refs.email.getDOMNode().value = "";
    this.refs.password.getDOMNode().value = "";
  },
  onChange: function(event, topics){
    this.setState({
      topics: topics
    });
  },
  onAuthChange: function(event, loggedIn){
    this.setState({
      loggedIn: loggedIn
    });
  }
})