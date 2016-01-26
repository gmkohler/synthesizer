'use strict';
var KeyActions = require('../actions/key_actions');

var Track = function(ctx, options) {
  options = options || {};
  this.ctx = ctx;
  this.name = options.name || '';
  this.roll = options.roll || [];
  this.rollIdx = NaN;
};

Track.prototype.startRecording = function() {
  this.roll = [];
  this.startTime = this.ctx.currentTime;
};

Track.prototype.addNotes = function(notes) {
  var currentTime = (this.ctx.currentTime - this.startTime);
  // create duplicate of input because this.roll seemed to close over this notes
  // input.
  var newNotes = Object.assign({}, notes);
  this.roll.push({timeSlice: currentTime, notes: newNotes});
  return this;
};

Track.prototype.stopRecording = function() {
  this.addNotes([]);
};

Track.prototype.play = function (endOfTrackCallback, shouldRepeat) {
  if (this.intervalID) {return;}
  this.interval = 1;
  var playbackStartTime = this.ctx.currentTime,
  /* if the track should repeat, this modding will prevent the rollIdx
     from leaving the range of this.roll. Otherwise it will allow it to
     exceed the range by one, thereby escaping the first logic clause in the
     interval function.
  */
      modNumber = shouldRepeat ? this.roll.length : (this.roll.length + 1);
  if (!this.rollIdx) {this.rollIdx = 0;}

  this.intervalID = setInterval(function () {
    var currentTime = (this.ctx.currentTime - playbackStartTime);

    if (this.roll[this.rollIdx]) {
      var rollRunTime = this.roll[this.rollIdx].timeSlice;
      if (currentTime > rollRunTime) {
        KeyActions.resetKeys(this.roll[this.rollIdx].notes);
        this.rollIdx = (this.rollIdx + 1) % modNumber;
        if (this.rollIdx === 0) {playbackStartTime = this.ctx.currentTime;}
      }
    } else {
        clearInterval(this.intervalID);
        this.intervalID = null;
        this.rollIdx = NaN;
        endOfTrackCallback();
    }
  }.bind(this), this.interval);
};

Track.prototype.pause = function () {
  if (!this.intervalID) {return;}
  clearInterval(this.intervalID);
  this.intervalID = null;

  KeyActions.resetKeys({});
};

module.exports = Track;
