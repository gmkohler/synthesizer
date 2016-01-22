'use strict';
var React = require('react');

var WaveformButton = React.createClass({
  getInitialState: function () {
    return {isClicking: false};
  },

  _handleMouseDown: function (e) {
    e.preventDefault();
    this.setState({isClicking: true});
  },

  _handleMouseUp: function () {
    this.setState({isClicking: false});
  },

  _handleMouseLeave: function () {
    if (!this.state.isClicking) {return;}
    this.setState({isClicking: false});
  },

  _changeWaveform: function () {
    this.props.changeWaveform(this.props.waveform);
  },

  render: function () {
    var className = this.props.isActive ? 'active' : '';
    var buttonStyle;
    if (this.state.isClicking) {
      buttonStyle = {borderStyle: 'inset'};
    } else {
      buttonStyle = {borderStyle: 'outset'};
    }

    return (<div onMouseDown={this._handleMouseDown}
                 onMouseUp={this._handleMouseUp}
                 onMouseLeave={this._handleMouseLeave}
                 onClick={this._changeWaveform}
                 className={"waveform-button " + className}
                 style={buttonStyle}
                 id={this.props.waveform}
                 />);
  }
});

module.exports = WaveformButton;
