'use strict';
var AppDispatcher = require('../dispatcher/dispatcher');
var KeyConstants = require('../constants/key_constants');

module.exports = {
  addKey: function(noteName) {
    var action = {
      actionType: KeyConstants.ADD_KEY,
      payload: noteName
    };

    AppDispatcher.dispatch(action);
  },

  removeKey: function (noteName) {
    var action = {
      actionType: KeyConstants.REMOVE_KEY,
      payload: noteName
    };

    AppDispatcher.dispatch(action);
  },

  resetKeys: function (noteNames) {
    var action = {
      actionType: KeyConstants.RESET_KEYS,
      payload: noteNames
    };

    AppDispatcher.dispatch(action);
  }
};
