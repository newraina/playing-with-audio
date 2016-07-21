!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.i=function(value){return value},__webpack_require__.p="/build/",__webpack_require__(__webpack_require__.s=8)}({8:function(module,exports){var tempo=180,conductor=new BandJS;conductor.setTimeSignature(2,2),conductor.setTempo(tempo);var rightHand=conductor.createInstrument("square","oscillators"),leftHand=conductor.createInstrument("triangle","oscillators"),drum=conductor.createInstrument("white","noises");drum.setVolume(50),rightHand.note("quarter","E5, F#4").note("quarter","E5, F#4").rest("quarter").note("quarter","E5, F#4"),leftHand.note("quarter","D3").note("quarter","D3").rest("quarter").note("quarter","D3"),drum.rest("whole"),rightHand.rest("quarter").note("quarter","C5, F#4").note("quarter","E5, F#4").rest("quarter"),leftHand.rest("quarter").note("quarter","D3").note("quarter","D3").rest("quarter"),drum.rest("whole"),rightHand.note("quarter","G5, B4, G4").rest("quarter").rest("half"),leftHand.rest("whole"),drum.rest("whole"),rightHand.note("quarter","G4").rest("quarter").rest("half"),leftHand.note("quarter","G3").rest("quarter").rest("half"),drum.rest("whole"),rightHand.repeatStart().note("quarter","C5, E4").rest("quarter").rest("quarter").note("quarter","G4, C4"),leftHand.repeatStart().note("quarter","G3").rest("quarter").rest("quarter").note("quarter","E3"),drum.repeatStart().note("eighth","A4").rest("eighth").rest("quarter").note("tripletQuarter","A4").rest("tripletQuarter").note("tripletQuarter","A4"),rightHand.rest("half").note("quarter","E4, G3").rest("quarter"),leftHand.rest("half").note("quarter","C3").rest("quarter"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("quarter").note("quarter","A4, C4").rest("quarter").note("quarter","B4, D4"),leftHand.rest("quarter").note("quarter","F3").rest("quarter").note("quarter","G3"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("quarter").note("quarter","Bb4, Db4").note("quarter","A4, C4").rest("quarter"),leftHand.rest("quarter").note("quarter","Gb3").note("quarter","F3").rest("quarter"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.note("tripletHalf","G4, C4").note("tripletHalf","E5, G4").note("tripletHalf","G5, B4"),leftHand.note("tripletHalf","E3").note("tripletHalf","C4").note("tripletHalf","E4"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.note("quarter","A5, C5").rest("quarter").note("quarter","F5, A4").note("quarter","G5, B4"),leftHand.note("quarter","F4").rest("quarter").note("quarter","D4").note("quarter","E4"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("quarter").note("quarter","E5, G4").rest("quarter").note("quarter","C5, E4"),leftHand.rest("quarter").note("quarter","C4").rest("quarter").note("quarter","A3"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.note("quarter","D5, F4").note("quarter","B4, D4").rest("half"),rightHand.repeat(1),leftHand.note("quarter","B3").note("quarter","G3").rest("half"),leftHand.repeat(1),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),drum.repeat(1),rightHand.rest("half").note("quarter","G5, E5").note("quarter","Gb5, Eb5"),leftHand.note("quarter","C3").rest("quarter").rest("quarter").note("quarter","G3"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.note("quarter","F5, D5").note("quarter","D#5, B4").rest("quarter").note("quarter","E5, C5"),leftHand.rest("half").note("quarter","C4").rest("quarter"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("quarter").note("quarter","G#4, E4").note("quarter","A4, F4").note("quarter","C5, A4"),leftHand.note("quarter","F3").rest("quarter").rest("quarter").note("quarter","C4"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("quarter").note("quarter","A4, C4").note("quarter","C5, E4").note("quarter","D5, F4"),leftHand.note("quarter","C4").rest("quarter").note("quarter","F3").rest("quarter"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("half").note("quarter","G5, E5").note("quarter","Gb5, Eb5"),leftHand.note("quarter","C3").rest("quarter").rest("quarter").note("quarter","E3"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.note("quarter","F5, D5").note("quarter","D#5, B4").rest("quarter").note("quarter","E5, C5"),leftHand.rest("half").note("quarter","G3").note("quarter","C4"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("quarter").note("quarter","C6, G6, F6").rest("quarter").note("quarter","C6, G6, F6"),leftHand.rest("whole"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.note("quarter","C6, G6, F6").rest("quarter").rest("half"),leftHand.rest("half").note("quarter","G3").rest("quarter"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("half").note("quarter","G5, E5").note("quarter","Gb5, Eb5"),leftHand.note("quarter","C3").rest("quarter").rest("quarter").note("quarter","G3"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.note("quarter","F5, D5").note("quarter","D#5, B4").rest("quarter").note("quarter","E5, C5"),leftHand.rest("half").note("quarter","C4").rest("quarter"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("quarter").note("quarter","G#4, E4").note("quarter","A4, F4").note("quarter","C5, A4"),leftHand.note("quarter","F3").rest("quarter").rest("quarter").note("quarter","C4"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("quarter").note("quarter","A4, C4").note("quarter","C5, E4").note("quarter","D5, F4"),leftHand.note("quarter","C4").rest("quarter").note("quarter","F3").rest("quarter"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("half").note("quarter","Eb5, Ab4").rest("quarter"),leftHand.note("quarter","C3").rest("quarter").note("quarter","Ab3").rest("quarter"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("quarter").note("quarter","D5, F4").rest("half"),leftHand.rest("quarter").note("quarter","Bb3").rest("half"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.note("quarter","C5, E4").rest("quarter").rest("half"),leftHand.note("quarter","C4").rest("quarter").rest("quarter").note("quarter","G3"),drum.note("eighth").rest("eighth").rest("quarter").note("tripletQuarter").rest("tripletQuarter").note("tripletQuarter"),rightHand.rest("whole"),leftHand.note("quarter","G3").rest("quarter").note("quarter","C3").rest("quarter"),drum.rest("whole"),rightHand.repeatFromBeginning(500),leftHand.repeatFromBeginning(500),drum.repeatFromBeginning(500);var player=conductor.finish();window.play=function(){return player.play()}}});
//# sourceMappingURL=6.js.map