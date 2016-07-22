
import Audio from '../audio'

const audio = new Audio()

const button = document.querySelector('button')

audio.load('../../music/xiaoxingxing.mp3')
  .then(() => {
    button.innerHTML = '点我听歌'

    button.addEventListener('click', () => audio.toggle())
  })
