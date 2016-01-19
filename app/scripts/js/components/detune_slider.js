'use strict';
var React = require('react');

var AudioActions = require('../actions/audio_actions');
var AudioConstants = require('../constants/audio_constants');
var HorizontalSlider = require('./horizontal_slider');
var KEY_CODES = require('../util/key_codes').KEY_CODES;

var DetuneSlider = React.createClass({
  decreaseDetune: function () {
    var newDetune = this.props.detune - AudioConstants.D_DETUNE;
    AudioActions.changeDetune(
      Math.max(newDetune, AudioConstants.MIN_DETUNE_VAL)
    );
  },

  increaseDetune: function () {
    var newDetune = this.props.detune + AudioConstants.D_DETUNE;
    AudioActions.changeDetune(
      Math.min(newDetune, AudioConstants.MAX_DETUNE_VAL)
    );
  },

  _handleKeyDown: function (e) {
    e.preventDefault();

    if (e.keyCode === KEY_CODES.LEFT_ARROW) {
      this.decreaseDetune();
    } else if (e.keyCode === KEY_CODES.RIGHT_ARROW) {
      this.increaseDetune();
    }
  },

  render: function () {
    return (
      <HorizontalSlider name="pitch"
                        value={this.props.detune}
                        minValue={AudioConstants.MIN_DETUNE_VAL}
                        maxValue={AudioConstants.MAX_DETUNE_VAL}
                        handleKeyDown={this._handleKeyDown}
                        changeCallback={AudioActions.changeDetune}
                        isOffset={true}/>
    );
  }
});

module.exports = DetuneSlider;
