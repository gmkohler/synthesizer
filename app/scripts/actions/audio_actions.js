
'use strict';
var AppDispatcher = require ('../dispatcher/dispatcher');
var AudioConstants = require('../constants/audio_constants');

module.exports = {
  changeWaveform: function (waveType) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.CHANGE_WAVEFORM,
      payload: waveType
    });
  },

  changeAMWaveform: function (waveType) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.CHANGE_AM_WAVEFORM,
      payload: waveType
    });
  },

  changeAMFrequency: function (frequency) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.CHANGE_AM_FREQUENCY,
      payload: frequency
    });
  },

  changeGain: function (gain) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.CHANGE_GAIN,
      payload: gain
    });
  },

  changeSustain: function (sustain) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.CHANGE_SUSTAIN,
      payload: sustain
    });
  },
  
  changeDepth: function (depth) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.CHANGE_DEPTH,
      payload: depth
    });
  },

  changeAttack: function (attack) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.CHANGE_ATTACK,
      payload: attack
    });
  },

  changeDecay: function (decay) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.CHANGE_DECAY,
      payload: decay
    });
  },

  changeRelease: function (release) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.CHANGE_RELEASE,
      payload: release
    });
  },

  changeDetune: function (detune) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.CHANGE_DETUNE,
      payload: detune
    });
  }
}
