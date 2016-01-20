'use strict';
var KeyActions = require('../actions/key_actions');

var Track = function(options) {
  options = options || {};
  this.name = options.name || '';
  this.roll = options.roll || [];
};

Track.prototype.startRecording = function() {
  this.roll = [];
  this.startTime = new Date();
};

Track.prototype.addNotes = function(notes) {
  var currentTime = (new Date()) - this.startTime;
  this.roll.push({ timeSlice: currentTime, notes: notes });
  return this;
};

Track.prototype.stopRecording = function() {
  this.addNotes([]);
};

Track.prototype.play = function () {
  if (this.interval) { return;}
  var playbackStartTime = Date.now();
  var currentNote = 0;

  this.interval = setInterval(function () {
    if (currentNote < this.roll.length) {
      if ((Date.now() - playbackStartTime) > this.roll[currentNote].timeSlice) {
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
