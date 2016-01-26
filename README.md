# SYNTH
Online Synthesizer written with the Web Audio API and React.js.  h/t to [these tutorials](http://www.keithmcmillen.com/category/blog/tutorials/making-music-in-the-browser/) and MDN documentations for getting me up to speed on the basics of the Web Audio API.

[live link](gmkohler.github.io/synthesizer)

## Features
Each key of this synthesizer currently includes a carrier (primary) oscillator
and an amplitude-modulating oscillator.
### Audio
Adjustable parameters for the carrier oscillator include:
- Volume (`vol` slider)
- Pitch (a.k.a. '[detune](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/detune)', via the `pitch` slider)
- Waveform (square, sawtooth, triangle, and sine)
- Each parameter of the [ADSR Envelope](https://en.wikipedia.org/wiki/Synthesizer#Attack_Decay_Sustain_Release_.28ADSR.29_envelope), represented by the `atk`, `dec`, `sus`, and `rel` sliders

The Amplitude Modulator parameters that can be adjusted are:
- Volume (a.k.a. 'depth', via the `dep` slider)
- Frequency (a.k.a. 'depth', via the `frequency` slider )

### JavaScript
- The `Organ` component holds an `AudioContext` and listens to the `KeyStore` and `AudioStore` to update its state.  The audio parameters and an object of notes that are currently active are passed into a number of `Key` components as props.
- Pressing keys adds their names to an object in the `KeyStore`.  Adjusting the sliders and Waveform Buttons updates the `AudioStore`.
- A `Note` object is held by each `Key`, and contains a number of `OscillatorNode`s and `GainNode`s wired to allow for oscillation as well as modulation.
- `Recordings` are made by a `Recorder` listening to the `KeyStore` for updates and adding the state of pressed keys to a `roll` in the `Track` object along with a timestamp as captured by `AudioContext.currentTime`.
- Playback occurs by passing the pressed keys at each index of the `roll` to the KeyStore until the time between timestamps has elapsed (checked every millisecond via `setInterval`).



## Planned Features
### UI
[ ] Create a `Knob` component for adjusting audio parameters, allowing for a more
intuitive UI.

[ ] Visualization of the ADSR envelope for the carrier signal.

[ ] Live visualization of the waveform, similar to an oscilloscope.
### Audio
[ ] Support frequency modulation with a similar interface to amplitude modulation.

[ ] Introduce a multiplier to each modulating oscillator for a wider variety of
possible sounds.

[ ] Keep track of the audio configurations during recording so they persist during
playback.

[ ] Divorce playback of recordings from the [`AudioContext`](http://developer.mozilla.org/en-US/docs/Web/API/AudioContext) of the main keyboard
facilitate recording overlaid tracks.
