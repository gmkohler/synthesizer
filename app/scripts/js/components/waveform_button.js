'use strict';
var React = require('react');

var WaveformButton = React.createClass({

  _changeWaveform: function () {
    this.props.changeWaveform(this.props.waveform);
  },

  render: function () {
    var className = this.props.isActive ? 'active' : '';

    return (<div onClick={this._changeWaveform}
                 className={"waveform-button " + className}
                 id={this.props.waveform}
                 />);
  }
});

module.exports = WaveformButton;
