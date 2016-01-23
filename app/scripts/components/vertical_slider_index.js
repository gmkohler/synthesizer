
'use strict';
var React = require('react');

var VerticalSlider = require('./vertical_slider');
var VolumeSlider = require('./volume_slider');
var AudioConstants = require('../constants/audio_constants');
var AudioActions = require('../actions/audio_actions');

var VerticalSliderIndex = React.createClass({
  render: function () {
    return (
      <div id="vertical-sliders" className="cf">
        <div className='vertical-slider-wrapper'>
          <VolumeSlider gain={this.props.gain}/>
          <VerticalSlider name='atk'
                          value={this.props.attack}
                          maxValue={AudioConstants.MAX_ATTACK_DURATION}
                          minValue={AudioConstants.MIN_ATTACK_DURATION}
                          changeCallback={AudioActions.changeAttack}
                          handleKeyDown={this._handleKeyDown}
                          isOffset={false}
                          />
          <VerticalSlider name="dec"
                          value={this.props.decay}
                          maxValue={AudioConstants.MAX_DECAY_DURATION}
                          minValue={AudioConstants.MIN_DECAY_DURATION}
                          changeCallback={AudioActions.changeDecay}
                          isOffset={false}
                          />
          <VerticalSlider name="sus"
                          value={this.props.sustain}
                          maxValue={AudioConstants.MAX_SUSTAIN}
                          minValue={AudioConstants.MIN_SUSTAIN}
                          changeCallback={AudioActions.changeSustain}
                          isOffset={false}
                          />
          <VerticalSlider name="rel"
                          value={this.props.release}
                          maxValue={AudioConstants.MAX_RELEASE_DURATION}
                          minValue={AudioConstants.MIN_RELEASE_DURATION}
                          changeCallback={AudioActions.changeRelease}
                          isOffset={false}
                          />
          <VerticalSlider name="dep"
                          value={this.props.depth}
                          maxValue={AudioConstants.MAX_DEPTH}
                          minValue={AudioConstants.MIN_DEPTH}
                          changeCallback={AudioActions.changeDepth}
                          isOffset={false}
                          />
        </div>
        <div className='label'>envelope</div>
      </div>
    );
  }
});

module.exports = VerticalSliderIndex;
