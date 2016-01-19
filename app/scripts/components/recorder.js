'use strict';
var React = require('react');

var KeyStore = require('../stores/key_store');
var RecordingIndex = require('./recording_index');
var Track = require('../util/track');

var Recorder = React.createClass({
  getInitialState: function() {
    return( { isRecording: false, track: (new Track({name: 'Gizmo'}))});
  },

  componentDidMount: function () {
    KeyStore.addChangeListener(function() {
      var currentNotes = KeyStore.all();
      this.setState({track: this.state.track.addNotes(currentNotes)});
    }.bind(this));
  },

  toggleRecord: function() {
    if (this.state.isRecording) {
      this.state.track.stopRecording();
    } else {
      this.state.track.startRecording();
    }
    this.setState({isRecording: !this.state.isRecording});
  },

  playRecording: function () {
    this.state.track.play();
  },

  render: function () {
    var recordButtonText = this.state.isRecording ? 'Stop Recording' : 'Record';
    // var playButtonText = 'PLAY';
    return(
      <div>
        <div id='recorder-buttons'>
          <div className='record-button stop'></div>
          <button onClick={this.toggleRecord}>{recordButtonText}</button>
        </div>
        <RecordingIndex />
      </div>
    );
  }
});

module.exports = Recorder;
