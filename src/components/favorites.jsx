var React = require('react');
var Actions = require('../actions');
var Reflux = require('reflux');
var FavoritesStore = require('../stores/favorites-store');
var ImagePreview = require('./image-preview');
var _ = require('lodash');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(FavoritesStore, 'onChange')
  ],
  getInitialState: function(){
    return {
      favImages: []
    }
  },
  componentWillMount: function(){
    Actions.getFavImages();
  },
  render: function() {
    return <div className="topic">
      {this.renderImages()}
    </div>
  },
  renderImages: function(){
    return _.map(this.state.favImages, function(image){
      return <ImagePreview key={image.id} {...image} />
    })
  },
  onChange: function(event, favImages) {
    this.setState({favImages: favImages})
  }
});