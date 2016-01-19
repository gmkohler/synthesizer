/* global document */
/* global window */
'use strict';
var React = window.React = require('react');

var AudioConstants = require('../constants/audio_constants');
var AudioStore = require('../stores/audio_store');
// var Key = require('../components/key');
var KeyActions = require('../actions/key_actions');
var KeyStore = require('../stores/key_store');

var KEY_CODE_NAMES = require('../util/key_codes').KEY_CODE_NAMES;
var Constants = require('../util/tones'),
    // TONES = Constants.TONES,
    KEY_MAP = Constants.KEY_MAP;

var Organ = React.createClass({
  getInitialState: function () {
    return {pressedKeys: {},
             isClicking: false,
               waveform: AudioConstants.INITIAL_WAVEFORM,
                   gain: 0,
                sustain: 0,
                 detune: 0,
                 attack: 0,
                  decay: 0,
                release: 0,
             AMWaveform: AudioConstants.INITIAL_AM_WAVEFORM,
            AMFrequency: AudioConstants.INITIAL_AM_FREQUENCY
            };
  },

  componentDidMount: function() {
    KeyStore.addChangeListener(function () {
      this.setState({pressedKeys: KeyStore.all()});
    }.bind(this));

    AudioStore.addChangeListener(function () {
      this.setState(AudioStore.getConfigs());
    }.bind(this));

    this.setState(AudioStore.getConfigs());

    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('keyup', this._handleKeyUp);
  },

  componentWillUnmount: function () {
    document.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('keyup', this._handleKeyUp);
  },

  _handleKeyDown: function (e) {
    var keyCodeName = KEY_CODE_NAMES[e.keyCode.toString()],
        noteName = KEY_MAP[keyCodeName];
    KeyActions.addKey(noteName);
  },

  _handleKeyUp: function (e) {
    var keyCodeName = KEY_CODE_NAMES[e.keyCode.toString()],
        noteName = KEY_MAP[keyCodeName];
    KeyActions.removeKey(noteName);
  },

  _handleMouseDown: function (e) {
    e.preventDefault();
    KeyActions.addKey(e.currentTarget.id);
    this.setState({isClicking: true});
  },

  _handleMouseUp: function (e) {
    KeyActions.removeKey(e.currentTarget.id);
    this.setState({isClicking: false});
  },

  _handleMouseLeave: function (e) {
    if (!this.state.isClicking) {return;}
    KeyActions.removeKey(e.currentTarget.id);
    this.setState({isClicking: false});
  },

  _handleMouseEnter: function (e) {
    if (!this.state.isClicking) {return;}
    KeyActions.addKey(e.currentTarget.id);
    this.setState({isClicking: true});
  },

  render: function () {
    // var that = this;
    // var keys = (Object.keys(TONES).map(function (noteName){
    //   var active = that.state.pressedKeys[noteName];
    //   return (<Key key={noteName}
    //                handleMouseEnter={that._handleMouseEnter}
    //                handleMouseLeave={that._handleMouseLeave}
    //                handleMouseDown={that._handleMouseDown}
    //                handleMouseUp={that._handleMouseUp}
    //                isActive={active}
    //                waveform={that.state.waveform}
    //                gain={that.state.gain}
    //                sustain={that.state.sustain}
    //                detune={that.state.detune}
    //                attack={that.state.attack}
    //                decay={that.state.decay}
    //                release={that.state.release}
    //                AMWaveform={that.state.AMWaveform}
    //                AMFrequency={that.state.AMFrequency}
    //                noteName={noteName} />);
    // }));


    //
    //
    return (<div><span>Hello World</span></div>);
    // return (
    //   <div>
    //     <div className="keytar">
    //       <div className="controls cf">
    //         <div className="controls-left">
    //           <VerticalSliderIndex gain={this.state.gain}
    //                                sustain={this.state.sustain}
    //                                attack={this.state.attack}
    //                                decay={this.state.decay}
    //                                release={this.state.release}/>
    //           <HorizontalSliderIndex detune={this.state.detune}/>
    //           <WaveformSelector waveform={this.state.waveform}
    //                             changeWaveform={AudioActions.changeWaveform}
    //                             />
    //         </div>
    //         <div className="controls-center">
    //           <ModulatorControls waveform={this.state.AMWaveform}
    //                              frequency={this.state.AMFrequency}
    //                              />
    //         </div>
    //         <div className="controls-right">
    //           <Recorder />
    //         </div>
    //       </div>
    //       <div className={"keyboard"}>{keys}</div>
    //     </div>
    //     <div className="recordings"/>
    //   </div>
    // );
  }
});

module.exports = Organ;
