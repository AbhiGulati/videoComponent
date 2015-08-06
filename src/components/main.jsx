var React = require('react');
var CommentSubmission = require('./comment-submission.jsx');
var CommentList = require('./comment-list.jsx');
var VideoPlayer = require('./video-player.jsx');
//var Player = require('react-youtube');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      title: "our video",
      url: "https://www.youtube.com/watch?v=xjS6SftYQaQ",
      comments: [
        {
          time: 9.5,
          text: "I don't get what you are saying"
        },
        {
          time: 16,
          text: "That really helped me understand that better"
        },
        {
          time: 23.6,
          text: "I want to confirm what you said"
        },
        {
          time: 28,
          text: "What are you talking about"
        },
        {
          time: 60,
          text: "Did this work?"
        }
      ]
    };
  },
  
  onCommentSubmit: function(comment) {
    var player = videojs('attachmentVideo');
    // player.markers.add([{time:player.currentTime(), text:comment}])
    var commentObj = {
      text: comment,
      time: player.currentTime()
    };

    this.setState({
      comments: this.state.comments.concat(commentObj)
    })

    // //console.log(player);
    // player.markers.add([
    //   commentObj
    // ])
  },
  render: function(){
    console.log(this.state.comments);
    return (
        <div id="attachmentViewer">
          <h2>{this.state.title}</h2>
          <VideoPlayer 
            title={this.state.title} 
            url={this.state.url}
            comments = {this.state.comments} />

          <CommentSubmission onCommentSubmit={this.onCommentSubmit}/>
          <CommentList comments={this.state.comments} />
        </div>
    );
  },
  _onPlay: function(event){
    console.log(event);
  },
  _onPause: function(event){
    console.log(event);
  }
});
/*
 var video, wrapper;
 wrapper = document.createElement('div');
 wrapper.innerHTML = "<video id='attachmentVideo' class='video-js vjs-default-skin' controls preload='auto' width='640' height='264' poster='" + this.props.thumbnail + "'><source src='" + this.props.url + "' type='video/mp4' /><p className='vjs-no-js'>To view this video please enable JavaScript, and consider upgrading to a web browser that <a href='http://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a></p></video>";
 video = wrapper.firstChild;
 this.refs.target.getDOMNode().appendChild(video);
 return videojs(video, {});
*/