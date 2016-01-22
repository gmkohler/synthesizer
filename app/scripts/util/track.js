'use strict';
var KeyActions = require('../actions/key_actions');

var Track = function(ctx, options) {
  options = options || {};
  this.ctx = ctx;
  this.name = options.name || '';
  this.roll = options.roll || [];
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

Track.prototype.play = function () {
  if (this.intervalID) { return;}
  this.interval = 1;
  var playbackStartTime = this.ctx.currentTime;
  var rollIdx = 0;

  this.intervalID = setInterval(function () {
    var currentTime = (this.ctx.currentTime - playbackStartTime);

    if (this.roll[rollIdx]) {
      var rollRunTime = this.roll[rollIdx].timeSlice;
      if (currentTime > rollRunTime) {
        KeyActions.resetKeys(this.roll[rollIdx].notes);
        rollIdx += 1;
      }
    } else {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }.bind(this), this.interval);
};

module.exports = Track;
