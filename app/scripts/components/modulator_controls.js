'use strict';
var React = require('react');

var AudioActions = require('../actions/audio_actions');
var AudioConstants = require('../constants/audio_constants');
var HorizontalSlider = require('./horizontal_slider');
var WaveformSelector = require('./waveform_selector');

var ModulatorControls = React.createClass({
  render: function () {
    return (
      <div className='waveform-controls'>
        <WaveformSelector waveform={this.props.waveform}
                          changeWaveform={AudioActions.changeAMWaveform}
                          />
        <HorizontalSlider name='frequency'
                          value={this.props.frequency}
                          maxValue={AudioConstants.MAX_AM_FREQUENCY}
                          minValue={AudioConstants.MIN_AM_FREQUENCY}
                          changeCallback={AudioActions.changeAMFrequency}
                          isOffset={false}
                          />
        <div className='waveform-control-label'>amp. modulator</div>
      </div>
    );
  }
});

module.exports = ModulatorControls;
