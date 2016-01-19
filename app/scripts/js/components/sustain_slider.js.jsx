(function(root) {
  'use strict';
  root.SustainSlider = React.createClass({
    render: function () {
      return (
        <VerticalSlider name="sus"
                        value={this.props.sustain}
                        maxValue={AudioConstants.MAX_SUSTAIN}
                        minValue={AudioConstants.MIN_SUSTAIN}
                        changeCallback={AudioActions.changeSustain}
                        isOffset={false}
                        />
      );
    }
  });
}(this));
