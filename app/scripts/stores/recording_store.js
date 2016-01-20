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

var _recordings = [
    {id: 1, name: 'hi'},
    {id: 2, name: 'hello'},
    {id: 3, name: 'howdy'},
    {id: 4, name: 'yet again'},
    {id: 5, name: 'this is goodbye'},
    {id: 6, name: 'or is it'},
    {id: 7, name: 'we may never know'},
    {id: 8, name: 'just a couple more'},
    {id: 9, name: 'is this name too long? let\'s see'},
];

var nextID = _recordings.length;

function findRecordingIndex (recordingID) {
    return _recordings.findIndex(function (recording) {
      return recording.id === recordingID;
    });
}

function addRecording (recording) {
  recording.id = nextID;
  nextID += 1;
  _recordings.push(recording);
  RecordingStore._hasChanged();
}

function deleteRecording (recordingID) {
  var idx = findRecordingIndex(recordingID);
  _recordings.splice(idx, 1);
  RecordingStore._hasChanged();
}

module.exports = RecordingStore;
