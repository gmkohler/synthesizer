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
  this.depth = AudioConstants.INITIAL_DEPTH;
  this.detuneValue = 0;

  this.attackDuration = AudioConstants.INITIAL_ATTACK;
  this.decayDuration = AudioConstants.INITIAL_DECAY;
  this.releaseDuration = AudioConstants.INITIAL_RELEASE;

  var that = this;

  this.gainNode = function (dest) {
    var gainNode = that.ctx.createGain();
    gainNode.connect(dest);
    return gainNode;
  };

  this.carrierGain = new this.gainNode(this.ctx.destination);
  this.amGain = new this.gainNode(this.carrierGain.gain);

  this.oscillatorNode = function (freq, detune, gainNode) {
    var ctx = that.ctx,
        osc = ctx.createOscillator();
    osc.type = that.waveType;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.detune.setValueAtTime(detune, ctx.currentTime);
    osc.connect(gainNode);
    return osc;
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

Note.prototype.setDepth = function (depth) {
  this.depth = depth;
  this.amGain.gain.setValueAtTime(depth, this.ctx.currentTime);
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
      carrierGain = this.carrierGain.gain,
      amGain = this.amGain.gain;

  this.osc = new this.oscillatorNode(
    this.carrierFreq,
    this.detuneValue,
    this.carrierGain
  );

  this.am = new this.oscillatorNode(
    this.modFreq,
    0, //detune value
    this.amGain
  );

  amGain.cancelScheduledValues(0);
  carrierGain.cancelScheduledValues(0);
  this.osc.start();
  this.am.start();
  amGain.setValueAtTime(this.depth, now);

  carrierGain.setValueAtTime(0, now);
  carrierGain.linearRampToValueAtTime(
    this.gainValue,
    now + this.attackDuration
  );

  // if sustain is greater than carrierGain, we do not want the volume to grow past
  //   the master carrierGain. Thus:
  if (this.sustain < this.gainValue) {
    carrierGain.linearRampToValueAtTime(
      this.sustain,
      now + this.attackDuration + this.decayDuration
    );
  }
};

Note.prototype._wane = function () {
  var now = this.ctx.currentTime,
      gain = this.carrierGain.gain;


  gain.cancelScheduledValues(0);

// with reference to the if clause in Note._wax(), we can be agnostic here:
//   whichever of this.sustain and this.gainValue was less in _wax() will be
//   this.gainNode.gain.value if the audio element was given enough time to
//   ramp upward (i.e., attack) to said value (and in some cases, decay.)
  gain.setValueAtTime(gain.value, now);
  this.osc.stop(now + this.releaseDuration);
  this.am.stop(now + this.releaseDuration);

  this.amGain.gain.linearRampToValueAtTime(0, now + this.releaseDuration);
  gain.linearRampToValueAtTime(0, now + this.releaseDuration);
};

Note.prototype.start = function() {
  this._wax();
};

Note.prototype.stop = function() {
  this._wane();
};


module.exports = Note;
