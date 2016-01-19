(function(root) {
  'use strict';
  root.WaveformButton = React.createClass({
    _changeWaveform: function () {
      this.props.changeWaveform(this.props.waveform);
    },

    render: function () {
      var className = this.props.isActive ? "active" : "",
          id = this.props.waveform;
      return (<div onClick={this._changeWaveform}
                   className={"waveform-button " + className}
                   id={this.props.waveform}
                   />);
    }
  });
}(this));
