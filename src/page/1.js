
import Audio from '../audio'

const audio = new Audio()

const canvas = document.querySelector('canvas')

audio.voice()
  .then(() => audio.render({
    target: canvas,
    mode: 'freq',
    width: 300,
    height: 90
  }))
  .then(() => audio.render({
    mode: 'time',
    width: 300,
    height: 90
  }))

audio.gainNode.value = 0
