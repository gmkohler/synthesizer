(function(root) {
  'use strict';
  root.ReleaseSlider = React.createClass({
    _handleKeyDown: function () {},

    render: function () {
      return (
        <VerticalSlider name="rel"
                        value={this.props.release}
                        maxValue={AudioConstants.MAX_RELEASE_DURATION}
                        minValue={AudioConstants.MIN_RELEASE_DURATION}
                        changeCallback={AudioActions.changeRelease}
                        handleKeyDown={this._handleKeyDown}
                        isOffset={false}
                        />
      );
    }
  });

}(this));
