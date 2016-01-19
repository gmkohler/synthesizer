(function(root) {
  'use strict';
  root.AudioActions = {
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
}(this));
