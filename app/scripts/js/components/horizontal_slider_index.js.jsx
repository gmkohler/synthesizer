(function(root) {
  'use strict';
  root.HorizontalSliderIndex = React.createClass({
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
}(this));
