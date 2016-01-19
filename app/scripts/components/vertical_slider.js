/* global document */
'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var VerticalSlider = React.createClass({
  getInitialState: function () {
    return ({isDragging: false,
              rel: null,
              trackHeight: 0
            });
  },

  componentDidMount: function () {
    if (this.props.handleKeyDown) {
      document.addEventListener('keydown', this.props.handleKeyDown);
    }
    var trackHeight = ReactDOM.findDOMNode(this).children[0].offsetHeight;
    this.setState({trackHeight: trackHeight});
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.isDragging && !prevState.isDragging) {
      document.addEventListener('mousemove', this._handleMouseMove);
      document.addEventListener('mouseup', this._handleMouseUp);
    } else if (!this.state.isDragging && prevState.isDragging) {
      document.removeEventListener('mousemove', this._handleMouseMove);
      document.removeEventListener('mouseup', this._handleMouseUp);
    }
  },

  componentWillUnmount: function () {
    if (this.props.handleKeyDown) {
      document.removeEventListener('keydown', this.props.handleKeyDown);
    }
  },

  _handleMouseDown: function (e) {
    if (e.button !== 0) {return;}
    // var relX = e.currentTarget.parentElement.offsetLeft
    var thumb = e.currentTarget,
        relY = e.pageY - (thumb.offsetTop + thumb.offsetHeight/2);
    this.setState({isDragging: true,
                   rel: relY
                 });
  },

  _handleMouseMove: function (e) {
    e.preventDefault();
    if (!this.state.isDragging) {return;}

    var maxValue = this.props.maxValue,
        minValue = this.props.minValue,
        mouseValue = this._valueFromPx(e.pageY - this.state.rel),
        currentValue = this.props.value;

    if (minValue <= mouseValue && mouseValue <= maxValue) {
      this.props.changeCallback(mouseValue);
    } else if (mouseValue <= minValue && currentValue > minValue) {
      this.props.changeCallback(minValue);
    } else if (mouseValue >= maxValue && currentValue < maxValue) {
      this.props.changeCallback(maxValue);
    }
  },

  _handleMouseUp: function (e) {
    this.setState({isDragging: false,
                   rel: null
                   });
    e.stopPropagation();
    e.preventDefault();
  },

  _valueFromPx: function (px) {
    var valueRange = this.props.maxValue - this.props.minValue,
        scaleFactor = valueRange / this.state.trackHeight,
        pxOffset = this.props.isOffset ? (this.state.trackHeight / 2) : 0;

    return (Math.round(this.state.trackHeight - px - pxOffset) * scaleFactor);
  },

  _pxFromValue: function (value) {
    var valueRange = this.props.maxValue - this.props.minValue,
        scaleFactor = this.state.trackHeight ? (valueRange / this.state.trackHeight) : 1,
        pxOffset = this.props.isOffset ? (this.state.trackHeight / 2) : 0;

    return Math.round(this.state.trackHeight - pxOffset - (value / scaleFactor));
  },

  render: function () {
    var topOffset = this._pxFromValue(this.props.value) || 1,
        verticalSliderThumbStyle = {top: topOffset},
        verticalSliderRangeStyle = {height: topOffset};

    return (
      <div className="vertical-slider">
        <div className="vertical-slider-track">
        <div className="vertical-slider-thumb"
             style={verticalSliderThumbStyle}
             onMouseDown={this._handleMouseDown}></div>
        <div className="vertical-slider-range"
             style={verticalSliderRangeStyle}></div>
        </div>
        <div className="vertical-slider-label">
          {this.props.name}
        </div>
      </div>
    );
  }
});

module.exports = VerticalSlider;
