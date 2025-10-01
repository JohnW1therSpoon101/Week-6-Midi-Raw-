//Import Modules
import MIDIengine from "./midi.js";
//Function Definitions
const mtof = function (midiNum) {
  return 440 * 2 ** ((midiNum - 69) / 12);
};

//Create Web Audio Graph
const myAudContext = new AudioContext();

const fader = new GainNode(myAudContext);
fader.gain.value = 0.25;
fader.connect(myAudContext.destination);

//make storage array for midi notes

const myMidiNotes = new Array(16);

for (let i = 0; i < myMidiNotes.length; i++) {
  //each erray has an element (array of 128? )
  myMidiNotes[i] = new Array(128);
  console.log(i);
}
//myMidiNotes[chennel][pitch]
myMidiNotes[4][60];

console.log(myMidiNotes);

//initialize new MIDI engine
const myMidiStuff = new MIDIengine();

myMidiStuff.onNoteOn = (pitch, velocity, ch) => {
  myMidiNotes[ch][pitch] = new OscillatorNode(myAudContext);
  myMidiNotes[ch][pitch].frequency.value = mtof(pitch);
  console.log("Note on:", pitch, velocity, ch);
};
