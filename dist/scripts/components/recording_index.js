'use strict';
var React = require('react');

var Recording = require('./recording');

var RecordingIndex = React.createClass({
  render: function () {
    return (
      <div className="recording-index">
        <Recording name="hi"/>
        <Recording name="hello"/>
        <Recording name="howdy"/>
      </div>
    );
  }
});

module.exports = RecordingIndex;
