(function(root) {
  'use strict';
  root.DecaySlider = React.createClass({
    render: function () {
      return (
        <VerticalSlider name="dec"
                        value={this.props.decay}
                        maxValue={AudioConstants.MAX_DECAY_DURATION}
                        minValue={AudioConstants.MIN_DECAY_DURATION}
                        changeCallback={AudioActions.changeDecay}
                        isOffset={false}
                        />
      );
    }
  });

}(this));
