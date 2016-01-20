'use strict';
var React = require('react');

// var KeyStore = require('../stores/key_store');
var RecordingIndex = require('./recording_index');
var RecordingStore = require('../stores/recording_store');
// var Track = require('../util/track');

var Recorder = React.createClass({
  getInitialState: function() {
    return({ isRecording: false,
              isPlaying: false,
              recordings: []
            });
  },

  componentDidMount: function () {
    RecordingStore.addChangeListener(this._setRecordings);
    this._setRecordings();
    // KeyStore.addChangeListener(function() {
    //   var currentNotes = KeyStore.all();
    //   this.setState({track: this.state.track.addNotes(currentNotes)});
    // }.bind(this));
  },

  componentWillUnmount: function () {
    RecordingStore.removeChangeListener(this._setRecordings);
  },

  _setRecordings: function () {
    this.setState({recordings: RecordingStore.all()});
  },

  toggleRecord: function() {
    // if (this.state.isRecording) {
    //   this.state.track.stopRecording();
    // } else {
    //   this.state.track.startRecording();
    // }
    this.setState({isRecording: !this.state.isRecording});
  },

  togglePlay: function () {
    this.setState({isPlaying: !this.state.isPlaying});
  },

  playRecording: function () {
    this.state.track.play();
  },

  render: function () {

    var recordButtonClassName = 'record-button ' +
        (this.state.isRecording ? 'stop' : 'record');
    var playButtonClassName = 'record-button ' +
        (this.state.isPlaying ? 'pause' : 'play');
    // var playButtonText = 'PLAY';
    return(
      <div className='recorder'>
        <div id='recorder-buttons' className='cf'>
          <div className='button-wrapper cf'>
            <div className={recordButtonClassName}
                 onClick={this.toggleRecord}></div>
            <div className={playButtonClassName}
                 onClick={this.togglePlay}></div>
          </div>
        </div>
        <RecordingIndex recordings={this.state.recordings}/>
      </div>
    );
  }
});

module.exports = Recorder;
