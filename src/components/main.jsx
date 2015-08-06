var React = require('react');
//var Player = require('react-youtube');

module.exports = React.createClass({
  getInitialState: function(){
    return {title: "our video",
            url: "https://www.youtube.com/watch?v=xjS6SftYQaQ"};
  },
  componentWillMount: function(){
  },
  componentDidMount: function(){
    return this.videoSetup();
  },
  videoSetup: function(){
    // initialize video.js
    var player = videojs('attachmentVideo');
    // setup plugin
    player.markers({
      markers: [
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
        }
      ],
      markerStyle: {
        'width':'7px',
        'border-radius': '30%',
        'background-color': 'red'
      },
      markerTip:{
        display: true,
        text: function(marker) {
          return "Break: "+ marker.text;
        },
        time: function(marker) {
          return marker.time;
        }
      },
      breakOverlay:{
        display: false,
        displayTime: 3,
        style:{
          'width':'100%',
          'height': '20%',
          'background-color': 'rgba(0,0,0,0.7)',
          'color': 'white',
          'font-size': '17px'
        },
        text: function(marker) {
          return "Break overlay: " + marker.overlayText;
        }
      },
      onMarkerClick: function(marker) {},
      onMarkerReached: function(marker) {}
    });
    return player;
 },
  render: function(){
    return (
        <div id="attachmentViewer">
          <h2>{this.state.title}</h2>
          <video id='attachmentVideo' className='video-js vjs-default-skin' width='640'
                 height='264' controls preload='auto'
         data-setup={'{ "techOrder": ["youtube"], "src": "' + this.state.url + '" }'}></video>
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