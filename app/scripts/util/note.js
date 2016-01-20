'use strict';
var AudioConstants = require('../constants/audio_constants');

var Note = function(context, frequency) {
  this.ctx = context;

  this.waveType = AudioConstants.INITIAL_WAVEFORM;
  this.carrierFreq = frequency;
  this.modType = AudioConstants.INITIAL_AM_WAVEFORM;
  this.modFreq = AudioConstants.INITIAL_AM_FREQUENCY;

  this.gainValue = AudioConstants.INITIAL_GAIN_VALUE;
  this.sustain = AudioConstants.INITIAL_SUSTAIN;
  this.detuneValue = 0;

  this.attackDuration = AudioConstants.INITIAL_ATTACK;
  this.decayDuration = AudioConstants.INITIAL_DECAY;
  this.releaseDuration = AudioConstants.INITIAL_RELEASE;

  var that = this;

  this.gainNode = (function () {
    var ctx = that.ctx;
    var gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    return gainNode;
  })();

  this.oscillatorNode = function (freq, gainNode) {
    var ctx = that.ctx,
        osc = ctx.createOscillator();
    osc.type = that.waveType;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.detune.setValueAtTime(that.detuneValue, ctx.currentTime);
    osc.connect(gainNode);
    return osc;
  };

  this.modNode = function (freq, gainNode) {
    var ctx = that.ctx,
        am = ctx.createOscillator();
    am.type = that.modType;
    am.frequency.setValueAtTime(freq, ctx.currentTime);
    am.connect(gainNode.gain);
    return am;
  };
};

Note.prototype.setType = function (waveType) {
  this.waveType = waveType;
  if (this.osc) {this.osc.type = waveType;}
};
Note.prototype.setModType = function (waveType) {
  this.modType = waveType;
  if (this.am) {this.am.type = waveType;}
};

Note.prototype.setModFrequency = function (frequency) {
  this.modFreq = frequency;
  if (this.am) {this.am.frequency
                       .setValueAtTime(frequency, this.ctx.currentTime);}
};

Note.prototype.setGain = function (gain) {
  this.gainValue = gain;
};

Note.prototype.setSustain = function (sustain) {
  this.sustain = sustain;
};

Note.prototype.setDetune = function (detune) {
  this.detuneValue = detune;
  if (this.osc) {this.osc.detune
                         .setValueAtTime(detune, this.ctx.currentTime);}
};

Note.prototype.setAttack = function (duration) {
  this.attackDuration = duration;
};

Note.prototype.setDecay = function (duration) {
  this.decayDuration = duration;
};

Note.prototype.setRelease = function (duration) {
  this.releaseDuration = duration;
};

Note.prototype._wax = function () {

  var now = this.ctx.currentTime,
      gain = this.gainNode.gain;

  this.osc = new this.oscillatorNode(this.carrierFreq, this.gainNode);
  this.am = new this.modNode(this.modFreq, this.gainNode);

  gain.cancelScheduledValues(0);
  this.osc.start();
  this.am.start();
  gain.setValueAtTime(0, now);

  gain.linearRampToValueAtTime(
    this.gainValue,
    now + this.attackDuration
  );
  // if sustain is greater than gain, we do not want the volume to grow past
  //   the master gain. Thus:
  if (this.sustain < this.gainValue) {
    gain.linearRampToValueAtTime(
      this.sustain,
      now + this.attackDuration + this.decayDuration
    );
  }
};

Note.prototype._wane = function () {
  var now = this.ctx.currentTime,
      gain = this.gainNode.gain;


  gain.cancelScheduledValues(0);

// with reference to the if clause in Note._wax(), we can be agnostic here:
//   whichever of this.sustain and this.gainValue was less in _wax() will be
//   this.gainNode.gain.value if the audio element was given enough time to
//   ramp upward (i.e., attack) to said value (and in some cases, decay.)
  gain.setValueAtTime(gain.value, now);
  this.osc.stop(now + this.releaseDuration);
  this.am.stop(now + this.releaseDuration);

  gain.linearRampToValueAtTime(0, now + this.releaseDuration);
};

Note.prototype.start = function() {
  this._wax();
};

Note.prototype.stop = function() {
  this._wane();
};


module.exports = Note;
