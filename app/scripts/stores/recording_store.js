'use strict';

var xtend = require('xtend');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/dispatcher');

var RecordingConstants = require('../constants/recording_constants');

var RecordingStore = xtend(EventEmitter.prototype, {
    all: function () {
      return _recordings;
    },

    _hasChanged: function () {
      this.emit(RecordingConstants.RECORDING_CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
      this.on(RecordingConstants.RECORDING_CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(
        RecordingConstants.RECORDING_CHANGE_EVENT,
        callback
      );
    },

    DispatcherID: AppDispatcher.register(function (action) {
      switch (action.actionType) {
        case RecordingConstants.ADD_RECORDING:
          addRecording(action.payload);
          break;
        case RecordingConstants.DELETE_RECORDING:
          deleteRecording(action.payload);
          break;
      }
    })
});

var _recordings = [];

var nextID = _recordings.length + 1;

function findRecordingIndex (recordingID) {
    return _recordings.findIndex(function (recording) {
      return recording.id === recordingID;
    });
}

function addRecording (recording) {
  recording.id = nextID;
  if (!recording.name) {
    recording.name = 'recording ' + (recording.id).toString();
  }

  nextID += 1;
  _recordings.push(recording);
  RecordingStore._hasChanged();
}

function deleteRecording (recordingID) {
  var idx = findRecordingIndex(recordingID);
  _recordings.splice(idx, 1);
  nextID -= 1;
  RecordingStore._hasChanged();
}

function editRecording (recording) {
  var idx = findRecordingIndex(recording.id);
  _recordings.splice(idx, 1, recording);
  RecordingStore._hasChanged();
}

module.exports = RecordingStore;
