(function(root) {
  'use strict';
  root.ModulatorFrequencySlider = React.createClass({
    render: function () {
      return (
        <HorizontalSlider name="frequency"
                          value={this.props.frequency}
                          maxValue={AudioConstants.MAX_AM_FREQUENCY}
                          minValue={AudioConstants.MIN_AM_FREQUENCY}
                          changeCallback={AudioActions.changeAMFrequency}
                          isOffset={false}
                          />
      );
    }
  });
}(this));
