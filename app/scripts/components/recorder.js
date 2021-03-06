'use strict';
var React = require('react');

var KeyStore = require('../stores/key_store');
var RecordingActions = require('../actions/recording_actions');
var RecordingIndex = require('./recording_index');
var RecordingStore = require('../stores/recording_store');
var Track = require('../util/track');

var Recorder = React.createClass({
  getInitialState: function() {
    return({ isRecording: false,
              isPlaying: false,
              playingID: null,
              track: new Track(this.props.ctx),
              recordings: []
            });
  },

  componentDidMount: function () {
    RecordingStore.addChangeListener(this._setRecordings);
    this._setRecordings();
  },

  componentWillUnmount: function () {
    RecordingStore.removeChangeListener(this._setRecordings);
  },

  _setRecordings: function () {
    this.setState({recordings: RecordingStore.all()});
  },

  toggleRecord: function() {
    if (this.state.isRecording) {
      this.saveRecording();
    } else {
      this.startRecording();
    }
    this.setState({isRecording: !this.state.isRecording});
  },

  togglePlay: function () {
    if (this.state.isPlaying) {
      this.pausePlayback();
    } else {
      this.startPlayback();
    }
  },

  pausePlayback: function () {},
  startPlayback: function () {},

  startRecording: function () {
    KeyStore.addChangeListener(this.updateTrack);
    this.state.track.startRecording();
  },

  updateTrack: function () {
    var currentNotes = KeyStore.all();
    this.setState({track: this.state.track.addNotes(currentNotes)});
  },

  saveRecording: function () {
    KeyStore.removeChangeListener(this.updateTrack);
    this.state.track.stopRecording();
    RecordingActions.addRecording(this.state.track);
    this.setState({track: new Track(this.props.ctx)});
  },

  render: function () {

    var recordButtonClassName = 'record-button',
        recordButtonStyle;
    if (this.state.isRecording) {
      recordButtonClassName += ' stop';
      recordButtonStyle = {borderStyle: 'inset'};
    } else {
      recordButtonClassName += ' record';
      recordButtonStyle = {borderStyle: 'outset'};
    }

    // var playButtonClassName = 'record-button',
    //     playButtonStyle;
    // if (this.state.isPlaying) {
    //   playButtonClassName += ' pause';
    //   playButtonStyle = {borderStyle: 'inset'};
    // } else {
    //   playButtonClassName += ' play';
    //   playButtonStyle = {borderStyle: 'outset'};
    // }
    // 
    // <div className={playButtonClassName}
    //      style={playButtonStyle}
    //      onClick={this.togglePlay}></div>

    return(
      <div className='recorder'>
        <div id='recorder-buttons' className='cf'>
          <div className='button-wrapper cf'>
            <div className={recordButtonClassName}
                 style={recordButtonStyle}
                 onClick={this.toggleRecord}></div>
          </div>
        </div>
        <RecordingIndex togglePlay={this.togglePlay}
                        recordings={this.state.recordings}/>
        <div className='label'>recordings</div>
      </div>
    );
  }
});

module.exports = Recorder;
