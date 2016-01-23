'use strict';

var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var RecordingActions = require('../actions/recording_actions');

var Recording = React.createClass({
  displayName: 'Recording',

  propTypes: {
    recording: React.PropTypes.object,
  },

  // mixins: [LinkedStateMixin],
  //
  // getInitialState: function () {
  //   return ({isEditing: false,
  //             currentName: ''});
  // },

  _handlePlay: function () {
    this.props.recording.play();
  },

  _handleEdit: function () {
    this.setState({isEditing: true,
                   currentName: this.props.recording.name});
  },

  _handleChange: function (newValue) {
   this.setState({currentName: newValue});
  },

  _deleteRecording: function () {
    RecordingActions.deleteRecording(this.props.recording.id);
  },

  render: function () {
    var recording = this.props.recording,
    /* for when you want to implement editing of recording names.
            nameElement;,
            valueLink,
            handleChange;
        if (this.state.isEditing) {
          valueLink = this.linkState('currentName');
          handleChange = function (e) {
            debugger;
            valueLink.requestChange(e.target.value);
          };
          nameElement = (<input type='text'
                                className='recording-label left'
                                value={valueLink.value}
                                onChange={handleChange}
                                />
                         );
        } else {
    */
      nameElement = (<span className='recording-label left'>
                       {recording.name}
                     </span>);
    //}
    // debugger;
    var icons = [];
    if (typeof recording.id === 'number') {
     icons = [
       <i className='glyphicon glyphicon-play'
          onClick={this._handlePlay}/>,
       <i className='glyphicon glyphicon-remove'
          onClick={this._deleteRecording}/>
      ];
    }
    return (
      <div className='recording'
           onClick={this._handleClick}>
        <div className='recording-label-wrapper'>
          {nameElement}
          {icons}
        </div>
      </div>
    );
  }
});

module.exports = Recording;
