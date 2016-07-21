
import Audio from '../audio'

const audio1 = new Audio()
const audio2 = new Audio()

const canvas = document.querySelector('canvas')

window.white = () => {
  audio1.noise('white')
    .then(() => audio1.play())
    .then(() => audio1.render({target: canvas, mode: 'freq'}))
}

window.brown = () => {
  audio2.noise('brown')
    .then(() => audio2.play())
    .then(() => audio2.render({target: canvas, mode: 'freq'}))
}
