(function(root) {
  'use strict';
  root.AttackSlider = React.createClass({
    _handleKeyDown: function () {},

    render: function () {
      return (
        <VerticalSlider name='atk'
                        value={this.props.attack}
                        maxValue={AudioConstants.MAX_ATTACK_DURATION}
                        minValue={AudioConstants.MIN_ATTACK_DURATION}
                        changeCallback={AudioActions.changeAttack}
                        handleKeyDown={this._handleKeyDown}
                        isOffset={false}
                        />
      );
    }

  })
}(this));
