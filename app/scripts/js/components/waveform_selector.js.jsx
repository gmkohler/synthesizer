(function(root) {
  'use strict';
  var WAVEFORM_NAMES = {  square: "square",
                            sine: "sine",
                        sawtooth: "sawtooth",
                        triangle: "triangle"};

  root.WaveformSelector = React.createClass({
    isActive: function (waveType) {
      return waveType === this.props.waveform;
    },

    render: function () {
      var buttons = Object.keys(WAVEFORM_NAMES).map(function(name){
      var isActive = this.isActive(name);

        return <WaveformButton isActive={isActive}
                               changeWaveform={this.props.changeWaveform}
                               key={name}
                               waveform={name}/>
      }.bind(this));

      return (<div className="waveform-selector cf">
                <div className="waveform-button-wrapper cf">
                  {buttons}
                </div>
              </div>);
    }
  });
}(this));
