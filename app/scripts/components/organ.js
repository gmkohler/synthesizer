/* global document */
/* global window */
'use strict';
var React = window.React = require('react');

var AudioActions = require('../actions/audio_actions');
var AudioConstants = require('../constants/audio_constants');
var AudioStore = require('../stores/audio_store');
var DetuneSlider = require('./detune_slider');
// var HorizontalSliderIndex = require('./horizontal_slider_index');
var Key = require('../components/key');
var KeyActions = require('../actions/key_actions');
var KeyStore = require('../stores/key_store');
var ModulatorControls = require('./modulator_controls');
var Recorder = require('./recorder');
var WaveformSelector = require('./waveform_selector');
var VerticalSliderIndex = require('./vertical_slider_index');

var KEY_CODE_NAMES = require('../util/key_codes').KEY_CODE_NAMES;
var Constants = require('../util/tones'),
    TONES = Constants.TONES,
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

  componentWillMount: function () {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
  },

  componentDidMount: function () {

    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('keyup', this._handleKeyUp);

    KeyStore.addChangeListener(this._setPressedKeys);
    AudioStore.addChangeListener(this._setConfigs);

    this._setConfigs();
  },

  componentWillUnmount: function () {
    document.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('keyup', this._handleKeyUp);

    KeyStore.removeChangeListener(this._setPressedKeys);
    AudioStore.removeChangeListener(this._setConfigs);
  },

  _setPressedKeys: function () {
    this.setState({pressedKeys: KeyStore.all()});
  },

  _setConfigs: function () {
    this.setState(AudioStore.getConfigs());
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
    var that = this;
    var keys = (Object.keys(TONES).map(function (noteName){
      var active = that.state.pressedKeys[noteName];
      return (<Key ctx={that.ctx}
                   key={noteName}
                   handleMouseEnter={that._handleMouseEnter}
                   handleMouseLeave={that._handleMouseLeave}
                   handleMouseDown={that._handleMouseDown}
                   handleMouseUp={that._handleMouseUp}
                   isActive={active}
                   waveform={that.state.waveform}
                   gain={that.state.gain}
                   sustain={that.state.sustain}
                   detune={that.state.detune}
                   attack={that.state.attack}
                   decay={that.state.decay}
                   release={that.state.release}
                   AMWaveform={that.state.AMWaveform}
                   AMFrequency={that.state.AMFrequency}
                   noteName={noteName} />);
    }));


    //
    //
    return (
      <div className='keytar'>
        <div className='controls cf'>
          <div className='controls-left'>
            <VerticalSliderIndex gain={this.state.gain}
                                 sustain={this.state.sustain}
                                 attack={this.state.attack}
                                 decay={this.state.decay}
                                 release={this.state.release}/>

          </div>
          <div className='controls-center'>
            <ModulatorControls waveform={this.state.AMWaveform}
                               frequency={this.state.AMFrequency}
                               />
            <div className='waveform-controls'>
              <WaveformSelector waveform={this.state.waveform}
                                changeWaveform={AudioActions.changeWaveform}
                                />
              <DetuneSlider detune={this.state.detune}/>
              <div className='waveform-control-label'>carrier</div>
            </div>
          </div>
          <div className='controls-right'>
            <Recorder />
          </div>
        </div>
        <div className='keyboard'>{keys}</div>
      </div>
    );
  }
});

module.exports = Organ;
