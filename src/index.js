
import Audio from './audio'

const audio1 = new Audio()
const audio2 = new Audio()
const audio3 = new Audio()

const noise = new Audio()
const tone1 = new Audio()
const tone2 = new Audio()

// audio1.load('../music/xiaoxingxing.mp3')
//   .then(() => audio1.play())
//   .then(() => audio1.render({mode: 'time'}))

// audio2.load('../music/xiaoxingxing.mp3')
//   .then(() => audio2.play())
//   .then(() => audio2.render({mode: 'freq'}))

// audio3.voice()
//   .then(() => audio3.render({mode: 'freq'}))

// noise.noise()
//   .then(() => noise.play())
//   .then(() => noise.render({mode: 'freq'}))

tone1.render({mode: 'freq', expand: false})

const piano1 = ['E5, F#4', 'E5, F#4', 'quarter', 'E5, F#4']
const piano2 = ['D3', 'D3', 'quarter', 'D3']

piano1.push('whole')
piano2.push('whole')

piano1.push('quarter', 'C5, F#4', 'E5, F#4')
piano2.push('quarter', 'D3', 'D3', 'quarter')

piano1.push('whole')
piano2.push('whole')

piano1.push('G5, B4, G4', 'quarter', 'half')
piano2.push('whole')

const toneToggleBtn = document.querySelector('#tone_toggle')
const toneFreqInput = document.querySelector('#tone_freq')

toneToggleBtn.addEventListener('click', () => {
  tone1.tone({
    type: 'square',
    bpm: 400,
    frequency: piano1
  })

  tone2.tone({
    type: 'triangle',
    bpm: 400,
    frequency: piano2
  })
})
// toneFreqInput.addEventListener('change', e => {
//   if (tone.isPlaying) {
//     tone.stop()
//   }
//   tone.tone({frequency: e.target.value})
// })
