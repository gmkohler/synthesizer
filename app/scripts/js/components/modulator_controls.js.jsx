(function(root) {
  'use strict';
  root.ModulatorControls = React.createClass({
    render: function () {
      return (
        <div id="modulator-controls">
          <WaveformSelector waveform={this.props.waveform}
                            changeWaveform={AudioActions.changeAMWaveform}
                            />
          <ModulatorFrequencySlider frequency={this.props.frequency}/>
          <div id="modulator-control-label">modulator</div>
        </div>
      )
    }
  });
}(this));
