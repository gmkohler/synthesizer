'use strict';
var xtend = require('xtend');
var EventEmitter = require('events').EventEmitter;

var AudioConstants = require('../constants/audio_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var AudioStore = xtend(EventEmitter.prototype, {
  getConfigs: function () {
    return _configs;
  },
  getWaveform: function () {
    return _configs.waveform;
  },

  getGain: function () {
    return _configs.gain;
  },

  addChangeListener: function (callback) {
    AudioStore.on(AudioConstants.AUDIO_CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    AudioStore.removeListener(AudioConstants.AUDIO_CHANGE_EVENT, callback);
  },

  _hasChanged: function () {
    AudioStore.emit(AudioConstants.AUDIO_CHANGE_EVENT);
  },

  DispatcherID: AppDispatcher.register(function (action) {
    switch(action.actionType) {
      case AudioConstants.CHANGE_WAVEFORM:
        changeWaveform(action.payload);
        break;
      case AudioConstants.CHANGE_AM_WAVEFORM:
        changeAMWaveform(action.payload);
        break;
      case AudioConstants.CHANGE_AM_FREQUENCY:
        changeAMFrequency(action.payload);
        break;
      case AudioConstants.CHANGE_GAIN:
        changeGain(action.payload);
        break;
      case AudioConstants.CHANGE_SUSTAIN:
        changeSustain(action.payload);
        break;
      case AudioConstants.CHANGE_DETUNE:
        changeDetune(action.payload);
        break;
      case AudioConstants.CHANGE_ATTACK:
        changeAttack(action.payload);
        break;
      case AudioConstants.CHANGE_DECAY:
        changeDecay(action.payload);
        break;
      case AudioConstants.CHANGE_RELEASE:
        changeRelease(action.payload);
        break;
      case AudioConstants.CHANGE_DEPTH:
        changeDepth(action.payload);
        break;
    }
  })
});

var _configs = {waveform: AudioConstants.INITIAL_WAVEFORM,
              AMWaveform: AudioConstants.INITIAL_AM_WAVEFORM,
             AMFrequency: AudioConstants.INITIAL_AM_FREQUENCY,
                    gain: AudioConstants.INITIAL_GAIN_VALUE,
                 sustain: AudioConstants.INITIAL_SUSTAIN,
                  attack: AudioConstants.INITIAL_ATTACK,
                   decay: AudioConstants.INITIAL_DECAY,
                 release: AudioConstants.INITIAL_RELEASE,
                 depth: AudioConstants.INITIAL_DEPTH,
                  detune: AudioConstants.INITIAL_DETUNE
                };

function changeWaveform (waveType) {
  _configs.waveform = waveType;
  AudioStore._hasChanged();
}

function changeAMWaveform (waveType) {
  _configs.AMWaveform = waveType;
  AudioStore._hasChanged();
}

function changeAMFrequency (frequency) {
  _configs.AMFrequency = frequency;
  AudioStore._hasChanged();
}

function changeGain (gain) {
  _configs.gain = gain;
  AudioStore._hasChanged();
}

function changeSustain (sustain) {
  _configs.sustain = sustain;
  AudioStore._hasChanged();
}

function changeAttack (attack) {
  _configs.attack = attack;
  AudioStore._hasChanged();
}

function changeDecay (decay) {
  _configs.decay = decay;
  AudioStore._hasChanged();
}

function changeRelease (release) {
  _configs.release = release;
  AudioStore._hasChanged();
}

function changeDepth (depth) {
  _configs.depth = depth;
  AudioStore._hasChanged();
}

function changeDetune (detune) {
  _configs.detune = detune;
  AudioStore._hasChanged();
}

module.exports = AudioStore;
