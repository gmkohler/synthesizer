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

  _getOffsetTop: function (element) {
    var offsetTop = element.offsetTop;
    if (element.offsetParent) {
      return offsetTop + this._getOffsetTop(element.offsetParent);
    } else {
      return offsetTop;
    }
  },

  _handleMouseDown: function (e) {
    if (e.button !== 0) {return;}

    var track = e.currentTarget,
        relY = this.state.trackHeight + this._getOffsetTop(track);
    this._changeValue(relY - e.pageY);
    this.setState({isDragging: true,
                   rel: relY
                 });
  },

  _handleMouseMove: function (e) {
    e.preventDefault();
    if (!this.state.isDragging) {return;}
    this._changeValue(this.state.rel - e.pageY);
  },

  _handleMouseUp: function (e) {
    this.setState({isDragging: false,
                   rel: null
                   });
    e.stopPropagation();
    e.preventDefault();
  },

  _changeValue(pxFromBottom) {
    var maxValue = this.props.maxValue,
        minValue = this.props.minValue,
        // How many pixels from the bottom are we ?
        mouseValue = this._valueFromPx(pxFromBottom),
        currentValue = this.props.value;

    if (minValue <= mouseValue && mouseValue <= maxValue) {
      this.props.changeCallback(mouseValue);
    } else if (mouseValue <= minValue && currentValue > minValue) {
      this.props.changeCallback(minValue);
    } else if (mouseValue >= maxValue && currentValue < maxValue) {
      this.props.changeCallback(maxValue);
    }
  },

  _valueFromPx: function (px) {
    var valueRange = this.props.maxValue - this.props.minValue,
        scaleFactor = valueRange / this.state.trackHeight,
        pxOffset = this.props.isOffset ? (this.state.trackHeight / 2) : 0;
    return (Math.round(px - pxOffset) * scaleFactor);
  },

  _pxFromValue: function (value) {
    var valueRange = this.props.maxValue - this.props.minValue,
        scaleFactor = this.state.trackHeight ? (valueRange / this.state.trackHeight) : 1,
        pxOffset = this.props.isOffset ? (this.state.trackHeight / 2) : 0;

    return Math.round(this.state.trackHeight - pxOffset - (value / scaleFactor));
  },

  render: function () {
    var topOffset = this._pxFromValue(this.props.value) || 1,
        cursorType = this.state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
        verticalSliderTrackStyle = {cursor: cursorType},
        verticalSliderThumbStyle = {top: topOffset},
        verticalSliderRangeStyle = {height: topOffset};

    return (
      <div className="vertical-slider">
        <div className="vertical-slider-track"
             style={verticalSliderTrackStyle}
             onMouseDown={this._handleMouseDown}>
        <div className="vertical-slider-thumb"
             style={verticalSliderThumbStyle}></div>
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
