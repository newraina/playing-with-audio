
import Audio from '../audio'

const audio = new Audio()

audio.load('../../music/xiaoxingxing.mp3')

window.play = () => {
  audio.play()
  audio.render({mode: 'freq'})
}

