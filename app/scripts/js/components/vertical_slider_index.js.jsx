(function(root) {
  'use strict';
  root.VerticalSliderIndex = React.createClass({
    render: function () {
      return (
        <div id="vertical-sliders" className="cf">
          <VolumeSlider gain={this.props.gain} />
          <AttackSlider attack={this.props.attack} />
          <DecaySlider decay={this.props.decay} />
          <SustainSlider sustain={this.props.sustain} />
          <ReleaseSlider release={this.props.release} />
        </div>
      );
    }
  });
}(this));
