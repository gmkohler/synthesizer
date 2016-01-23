'use strict';
var AppDispatcher = require('../dispatcher/dispatcher');
var RecordingConstants = require('../constants/recording_constants');

module.exports = {
  addRecording: function (recording) {
    AppDispatcher.dispatch({
      actionType: RecordingConstants.ADD_RECORDING,
      payload: recording
    });
  },

  deleteRecording: function (recordingID) {
    AppDispatcher.dispatch({
      actionType: RecordingConstants.DELETE_RECORDING,
      payload: recordingID
    });
  }
  // for when you want to implement editing of names:
  //
  // updateRecording: function (recording) {
  //   AppDispatcher.dispatch({
  //     actionType: RecordingConstants.UPDATE_RECORDING,
  //     payload: recording
  //   });
  // }

};
