/* global window */
/* global document */
'use strict';
var React = window.React = require('react');
var ReactDOM = require('react-dom');
var Organ = require('./components/organ');

ReactDOM.render(<Organ />, document.getElementById('app'));
