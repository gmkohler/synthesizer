'use strict';
var React = require('react');

var Recording = React.createClass({
  render: function () {
    return (
      <div>
        <span>{this.props.name}</span>
      </div>
    );
  }
});

module.exports = Recording;
