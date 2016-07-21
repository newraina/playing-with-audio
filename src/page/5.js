
import Audio from '../audio'

const audio = new Audio()

const tones = ['E5, F#4', 'E5, F#4']

audio.render({mode: 'freq', expand: false})

window.play = () => {
  audio.tone({
    type: 'square',
    bpm: 400,
    frequency: tones
  })
}
