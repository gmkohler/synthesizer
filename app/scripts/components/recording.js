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
  // _handleEdit: function () {
  //   this.setState({isEditing: true,
  //                  currentName: this.props.recording.name});
  // },

  getInitialState: function (){
    return ({
      isPlaying: false,
      repeat: false
    });
  },

  _toggleRepeat: function () {
    this.setState({repeat: !this.state.repeat});
  },

  _togglePlay: function () {
    if (this.state.isPlaying) {
      this.props.recording.pause();
    } else {
      this.props.recording.play(this._togglePlay, this.state.repeat);
    }
    this.setState({isPlaying: !this.state.isPlaying});
  },


  _handleChange: function (newValue) {
   this.setState({currentName: newValue});
  },

  _deleteRecording: function () {
    if (this.state.isPlaying) {this._togglePlay();}
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
    var icons = [],
        playPauseClassName,
        repeatClassName;
    if (typeof recording.id === 'number') {
      playPauseClassName = 'glyphicon ' +
        (this.state.isPlaying ? 'glyphicon-pause' : 'glyphicon-play');

      repeatClassName = 'glyphicon glyphicon-repeat ' +
        (this.state.repeat ? 'active' : '');

      icons = [
        <i className={repeatClassName}
           onClick={this._toggleRepeat}/>,
        <i className={playPauseClassName}
           onClick={this._togglePlay}/>,
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
