(function(root) {
  'use strict';
  root.HorizontalSlider = React.createClass({
    getInitialState: function () {
      return ({isDragging: false,
               rel: null,
               trackWidth: 0
               });
    },

    componentDidMount: function () {
      document.addEventListener('keydown', this.props.handleKeyDown);
      var trackWidth = ReactDOM.findDOMNode(this).children[0].offsetWidth;
      this.setState({trackWidth: trackWidth});
    },

    componentDidUpdate: function (prevProps, prevState) {
      if (this.state.isDragging && !prevState.isDragging) {
        document.addEventListener('mousemove', this._handleMouseMove);
        document.addEventListener('mouseup', this._handleMouseUp);
      } else if (!this.state.isDragging && prevState.isDragging) {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this._handleMouseUp);
      }
    },

    componentWillUnmount: function () {
      document.removeEventListener('keydown', this.props.handleKeyDown);
    },

    _handleMouseDown: function (e) {
      if (e.button !== 0) {return;}
      // relX denotes where the minimum value of the track is in units of e.pageX
      //
      // need to know mouseDown here because mouseMoves are detected on the document,
      // not the slider itself.  WE could pass to the slider?
      var thumb = e.currentTarget,
          trackWidth = thumb.parentElement.offsetWidth,
          relX = e.pageX - (thumb.offsetLeft + thumb.offsetWidth/2);
      this.setState({isDragging: true,
                     rel: relX,
                     trackWidth: trackWidth
                     });
    },

   _handleMouseMove: function (e) {
     e.preventDefault();
     if (!this.state.isDragging) {return;}
     var mouseValue = this._valueFromPx(e.pageX - this.state.rel),
         minValue = this.props.minValue,
         maxValue = this.props.maxValue,
         currentValue = this.props.value;

     if (minValue <= mouseValue && mouseValue <= maxValue) {
       this.props.changeCallback(mouseValue);
     } else if (mouseValue <= minValue && currentValue > minValue) {
       this.props.changeCallback(minValue) ;
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
          pxOffset = this.props.isOffset ? (this.state.trackWidth / 2) : 0,
          scaleFactor = valueRange / this.state.trackWidth,
          mouseValue = Math.round(px - pxOffset) * scaleFactor;
      return mouseValue;
    },

    _pxFromValue: function (value) {
      var valueRange = this.props.maxValue - this.props.minValue,
          scaleFactor = valueRange / this.state.trackWidth,
          pxOffset = this.props.isOffset ? this.state.trackWidth / 2 : 0;

      return (Math.round((value / scaleFactor) + pxOffset));
    },

    render: function () {
      var leftOffset = this._pxFromValue(this.props.value) || 0,
          horizontalSliderThumbStyle = {left: leftOffset},
          horizontalSliderRangeStyle = {width: leftOffset};

      return (
        <div className="horizontal-slider">
          <div className="horizontal-slider-track">
            <div className="horizontal-slider-range"
                 style={horizontalSliderRangeStyle}></div>
            <div className="horizontal-slider-thumb"
                 onMouseDown={this._handleMouseDown}
                 style={horizontalSliderThumbStyle}></div>
          </div>
          <div className="horizontal-slider-label">
            {this.props.name}
          </div>
        </div>

      )
    }
  });
}(this));
