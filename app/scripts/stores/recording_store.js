(function(root) {
  'use strict';

  var _recordings = [];
  var addRecording = function (recording) {
    _recordings.push(recording)
  }
  root.RecordingStore = extend({}, EventEmitter.prototype, {

    _hasChanged: function () {
      RecordingStore.emit(RecordingConstants.RECORDING_CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
      RecordingStore.on(RecordingConstants.RECORDING_CHANGE_EVENT, callback);
    },

    removeChangeListener: function () {
      RecordingStore.removeListener(
        RecordingConstants.RECORDING_CHANGE_EVENT,
        callback
      );
    },

    DispatcherID: AppDispatcher.register('foo', null, function (action) {
      switch (action.actionType) {
        case RecordingConstants.ADD_RECORDING:
          addRecording(action.payload);
          break;
      }
    })

  });

}(this));
