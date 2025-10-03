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
  myMidiNotes[ch][pitch].connect(fader);
  myMidiNotes[ch][pitch].start();
  //log info
  console.log("Note on:", pitch, velocity, ch);
};

myMidiStuff.onNoteOff = (pitch, velocity, ch)) => {
  console.log("yay"); 

}

const pitchBendStuff = function (data1, data2, ch) {
  console.log(data1, data2, ch); 
  myMidiNotes[ch][pitch].stop();

}

myMidiStuff.onControllerChange = (ccNum, value, ch) => {
  while (ccNum == 71) { 
    fader.gain.value = value / 127 ; 
    console.log(value)
  };
};

myMidiStuff.onPitchBend = pitchBendStuff; 



