
import Audio from '../audio'

const audio = new Audio()

const button = document.querySelector('button')

audio.load('../../music/xiaoxingxing.mp3')
  .then(() => {
    button.innerHTML = '再试试刚才的那首歌'

    button.addEventListener('click', () => {
      audio.toggle()
      audio.render({mode: 'freq'})
    })
  })
