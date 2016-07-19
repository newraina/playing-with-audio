
import Audio from './audio'

const audio = new Audio()

window.audio = audio

audio.load('../music/xiaoxingxing.mp3')
  .then(() => audio.play())
  .then(() => {
    audio.render({mode: 'time'})
    audio.render({mode: 'freq'})
  })
  // .then(() => setTimeout(() => audio.stop(), 5000))
