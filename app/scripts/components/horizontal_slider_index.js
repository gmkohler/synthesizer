'use strict';
var React = require('react');

var DetuneSlider = require('./detune_slider');

var HorizontalSliderIndex = React.createClass({
  render: function () {
    return (
      <div className="horizontal-sliders">
        <div>
          <DetuneSlider detune={this.props.detune}/>
        </div>
      </div>
    );
  }
});

module.exports = HorizontalSliderIndex;
