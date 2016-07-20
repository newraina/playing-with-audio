
import Audio from './audio'

const audio1 = new Audio()
const audio2 = new Audio()
const audio3 = new Audio()

const noise = new Audio()
window.noise = noise

// audio1.load('../music/xiaoxingxing.mp3')
//   .then(() => audio1.play())
//   .then(() => audio1.render({mode: 'time'}))

// audio2.load('../music/xiaoxingxing.mp3')
//   .then(() => audio2.play())
//   .then(() => audio2.render({mode: 'freq'}))

// audio3.voice()
//   .then(() => audio3.render({mode: 'freq'}))

noise.noise()
  .then(() => noise.play())
  .then(() => noise.render({mode: 'freq'}))
