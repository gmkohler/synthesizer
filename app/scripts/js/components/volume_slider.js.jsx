(function(root) {
  'use strict';

  root.VolumeSlider = React.createClass({
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

}(this));
