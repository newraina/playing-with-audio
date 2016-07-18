
import Audio from './audio'

const audio = new Audio()

audio.load('../music/xiaoxingxing.mp3')
  .then(() => audio.play())
  .then(() => setTimeout(() => audio.stop(), 2000))
