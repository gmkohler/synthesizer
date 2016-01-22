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
          <span className='recording-label left'>{recording.name}</span>
          <i className='right glyphicon glyphicon-remove'/>
          <i className='right glyphicon glyphicon-pencil'/>
        </div>
      </div>
    );
  }
});

module.exports = Recording;
