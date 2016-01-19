  'use strict';

var xtend = require('xtend');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/dispatcher');

var KeyConstants = require ('../constants/key_constants');

var KeyStore = xtend(EventEmitter.prototype, {
  all: function () {
    return _keys;
  },

  addChangeListener: function (handler) {
    this.on(KeyConstants.KEY_CHANGE_EVENT, handler);
  },

  removeChangeHandler: function (handler) {
    this.removeListener(KeyConstants.KEY_CHANGE_EVENT, handler);
  },

  changed: function () {
    this.emit(KeyConstants.KEY_CHANGE_EVENT);
  },

  DispatcherID: AppDispatcher.register(null, function (action) {
    switch (action.actionType) {
      case KeyConstants.ADD_KEY:
        addKey(action.payload);
        break;
      case KeyConstants.REMOVE_KEY:
        removeKey(action.payload);
        break;
      case KeyConstants.RESET_KEYS:
        resetKeys(action.payload);
        break;
    }
  })
});

var _keys = {};

function addKey (key) {
  if (!_keys[key]) {
    _keys[key] = true;
    KeyStore.changed();
  }
}

function removeKey (key) {
  delete _keys[key];
  KeyStore.changed();
}

function resetKeys (keys) {
  _keys = {};
  keys.forEach(function (key) {
    _keys[key] = true;
  });

  KeyStore.changed();
}

module.exports = KeyStore;
