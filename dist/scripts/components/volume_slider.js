'use strict';
var React = require('react');
var VerticalSlider = require('./vertical_slider');
var AudioConstants = require('../constants/audio_constants');
var AudioActions = require('../actions/audio_actions');
var KEY_CODES = require('../util/key_codes').KEY_CODES;

var VolumeSlider = React.createClass({
  decreaseGain: function () {
    var newGain = this.props.gain - AudioConstants.D_GAIN;
    AudioActions.changeGain(Math.max(newGain, AudioConstants.MIN_GAIN_VAL));
  },

  increaseGain: function () {
    var newGain = this.props.gain + AudioConstants.D_GAIN;
    AudioActions.changeGain(Math.min(newGain, AudioConstants.MAX_GAIN_VAL));
  },

  _handleKeyDown: function (e) {
    e.preventDefault();

    if (e.keyCode === KEY_CODES.DOWN_ARROW) {
      this.decreaseGain();
    } else if (e.keyCode === KEY_CODES.UP_ARROW) {
      this.increaseGain();
    }
  },

  render: function () {
      return (<VerticalSlider name="vol"
                              value={this.props.gain}
                              maxValue={AudioConstants.MAX_GAIN_VAL}
                              minValue={AudioConstants.MIN_GAIN_VAL}
                              isOffset={false}
                              changeCallback={AudioActions.changeGain}
                              handleKeyDown={this._handleKeyDown}/>
            );
  }
});

module.exports = VolumeSlider;
