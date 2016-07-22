
import Audio from '../audio'

const audio = new Audio()

const tones = ['E5', 'E5']

audio.render({mode: 'freq', expand: false})

window.play = () => {
  audio.tone({
    type: 'square',
    bpm: 400,
    frequency: tones
  })

  audio.render({mode: 'time'})
}
