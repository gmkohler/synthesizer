'use strict';
var React = require('react');

var WaveformButton = require('./waveform_button');

var WAVEFORM_NAMES = {  square: 'square',
                      sawtooth: 'sawtooth',
                      triangle: 'triangle',
                          sine: 'sine'};

var WaveformSelector = React.createClass({
  isActive: function (waveType) {
    return waveType === this.props.waveform;
  },

  render: function () {
    var buttons = Object.keys(WAVEFORM_NAMES).map(function(name){
    var isActive = this.isActive(name);

      return (<WaveformButton isActive={isActive}
                             changeWaveform={this.props.changeWaveform}
                             key={name}
                             waveform={name}/>);
    }.bind(this));

    return (<div className="waveform-selector cf">
              <div className="waveform-button-wrapper cf">
                {buttons}
              </div>
            </div>);
  }
});

module.exports = WaveformSelector;
