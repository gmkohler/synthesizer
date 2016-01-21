'use strict';
var React = require('react');
// var RecordingActions = require('../actions/recording_actions');

var Recording = React.createClass({
  displayName: 'Recording',

  propTypes: {
    recordingID: React.PropTypes.number,
    name: React.PropTypes.string
  },

  _handleClick: function () {
    this.props.track.playRecording();
    // RecordingActions.deleteRecording(this.props.recordingID);
  },

  render: function () {
    return (
      <div className='recording'
           onClick={this._handleClick}>
        <div className='recording-label-wrapper'>
          {this.props.name}
        </div>
      </div>
    );
  }
});

module.exports = Recording;
