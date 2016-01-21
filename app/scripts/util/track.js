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
  if (this.interval) { return;}
  var playbackStartTime = this.ctx.currentTime;
  var currentNote = 0;

  this.interval = setInterval(function () {
    if (currentNote < this.roll.length) {
      if ((this.ctx.currentTime - playbackStartTime) > this.roll[currentNote].timeSlice) {
        // var currentNotes = this.roll[currentNote].notes;
        currentNote++;
        KeyActions.resetKeys(this.roll[currentNote].notes);
      }
    } else {
      clearInterval(this.interval);
      this.interval = null;
    }
  }.bind(this),100 );
};

module.exports = Track;
