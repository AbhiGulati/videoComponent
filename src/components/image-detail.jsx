var React = require('react');
var Reflux = require('reflux');
var ImageStore = require('../stores/image-store');
var CommentStore = require('../stores/comment-store');
var Actions = require('../actions');
var CommentBox = require('./comment-box');
var AuthStore = require('../stores/auth-store');
var FavoritesStore = require('../stores/favorites-store');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange'),
    Reflux.listenTo(CommentStore, 'onChange'),
    Reflux.listenTo(AuthStore, 'onAuthChange'),
    Reflux.listenTo(FavoritesStore, 'onFavsChange'),
  ],
  getInitialState: function(){
    return {
      image: null,
      comment: null,
      loggedIn: false,
      favorites: []
    }
  },
  componentWillMount: function(){
    Actions.getImage(this.props.params.id);
    Actions.checkIfLoggedIn();
    Actions.getFavorites();
  },
  setStateOnAuth(){
    this.setState({
      loggedIn: Actions.checkIfLoggedIn()
    });
  },
  render: function() {
    return <div>
      {this.state.image ? this.renderContent() : null}
      </div>
  },
  renderContent: function(){
    return <div className="image-detail">
      <div className="panel panel-primary">
        <div className="panel-heading">
          {this.state.loggedIn ? null : <h6>Login to save to your favorites</h6> }
          {this.state.loggedIn ? this.renderFavorited() : null}
          {this.state.loggedIn ? this.renderFavoriteBtn() : null}
        </div>
          <div className="panel-body">
            <h4 className="text-center title">{this.state.image.title}</h4>
          {this.renderImage()}
          </div>
          <div className="panel-footer">
          <h5>{this.state.image.description}</h5>
          </div>
      </div>
      <h3>Comments</h3>
      {this.renderComments()}
    </div>
  },
  renderFavorited: function(){
    console.log(this.state.favorited);
    if (this.state.favorites && this.state.favorites.indexOf(this.state.image.id) > -1) {
      return <h6>This image is in your favorites collection</h6>
    }
    return false;
  },
  renderFavoriteBtn: function(){
    return <button className="btn btn-default btn-large" onClick={this.saveToFavorites}>Add to Favorites</button>
  },
  saveToFavorites: function(){
    Actions.saveImage(this.state.image);
  },
  renderComments: function(){
    if(!this.state.comments) {
      return null;
    }
    return <CommentBox comments={this.state.comments}/>
  },
  renderImage: function(){
    if(this.state.image.animated){
      return <video preload="auto" autoPlay="autoplay" loop="loop" webkit-playsinline>
        <source src={this.state.image.mp4} type="video/mp4"></source>
        </video>
    } else {
      return <img src={this.state.image.link} />
    }
  },
  onChange: function(event, image){
    this.setState({
      image: ImageStore.find(this.props.params.id),
      comments: CommentStore.comment
    })
  },
  onAuthChange: function(event, loggedIn){
    this.setState({
      loggedIn: loggedIn
    });
  },
  onFavsChange: function(event, favorites){
    this.setState({
      favorites: favorites
    });
  }
});