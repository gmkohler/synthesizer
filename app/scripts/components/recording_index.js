'use strict';
var React = require('react');
var Recording = require('./recording');

var RecordingIndex = React.createClass({
  displayName: 'RecordingIndex',

  propTypes: {
    recordings: React.PropTypes.array
  },

  render: function () {
    var recordings = this.props.recordings.map(function (recording) {
      return (<Recording recording={recording}/>);
    });

    if (recordings.length === 0) {
      var blankRecording = {name: '(no recordings)'};
      recordings.push(<Recording recording={blankRecording}/>);
    }

    return (
      <div className='recording-index'>
        <div className='recording-index-items'>
          {recordings}
        </div>
      </div>
    );
  }
});

module.exports = RecordingIndex;
