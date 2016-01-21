'use strict';
var React = require('react');
// var RecordingActions = require('../actions/recording_actions');

var Recording = React.createClass({
  displayName: 'Recording',

  propTypes: {
    recording: React.PropTypes.object,
  },

  _handleClick: function () {
    this.props.recording.play();
    // RecordingActions.deleteRecording(this.props.recordingID);
  },

  render: function () {
    var recording = this.props.recording;
    return (
      <div className='recording'
           onClick={this._handleClick}>
        <div className='recording-label-wrapper'>
          {recording.name}
        </div>
      </div>
    );
  }
});

module.exports = Recording;
