'use strict';
var React = require('react');
var Constants = require('../util/tones'),
    TONES = Constants.TONES,
    TONE_LETTERS = Constants.TONE_LETTERS;
var Note = require('../util/note');


var Key = React.createClass({
  componentDidMount: function() {
    this.note = new Note(this.props.ctx, TONES[this.props.noteName]);
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.isActive && !this.props.isActive) {
      this.note.start();
    } else if (!newProps.isActive && this.props.isActive) {
      this.note.stop();
    }
    // Don't want to change can I do this via metaprogramming?
    // Object.keys.newProps.forEach((key) => {
    //   if (newProps[key] !== this.props[key]) {
    //
    //    }
    // });
    if (newProps.waveform !== this.props.waveform) {
      this.note.setType(newProps.waveform);
    }
    if (newProps.gain !== this.props.gain) {
      this.note.setGain(newProps.gain);
    }
    if (newProps.sustain !== this.props.sustain) {
      this.note.setSustain(newProps.sustain);
    }
    if (newProps.attack !== this.props.attack) {
      this.note.setAttack(newProps.attack);
    }
    if (newProps.decay !== this.props.decay) {
      this.note.setDecay(newProps.decay);
    }
    if (newProps.release !== this.props.release) {
      this.note.setRelease(newProps.release);
    }
    if (newProps.AMWaveform !== this.props.AMWaveform) {
      this.note.setModType(newProps.AMWaveform);
    }
    if (newProps.AMFrequency !== this.props.AMFrequency) {
      this.note.setModFrequency(newProps.AMFrequency);
    }
    if (newProps.detune !== this.props.detune) {
      this.note.setDetune(newProps.detune);
    }
  },

  render: function () {
    var active = this.props.isActive ? ' active' : '',
        flat = this.props.noteName.match('b') ? ' black': '',
        keyLetter = TONE_LETTERS[this.props.noteName],
        gainVal;
        if (this.note) {
            gainVal = this.note.gainNode.gain.value.toString();
        }

    return (<div id={this.props.noteName}
                 className={"key" + active + flat}
                 onMouseEnter={this.props.handleMouseEnter}
                 onMouseLeave={this.props.handleMouseLeave}
                 onMouseDown={this.props.handleMouseDown}
                 onMouseUp={this.props.handleMouseUp}>
              <span>
                {keyLetter}
              </span>
            </div>);
  }
});
module.exports = Key;
