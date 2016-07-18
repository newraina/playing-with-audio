
class Audio {

  constructor(opts = {}) {
    const defaultOpts = {}

    this.options = {...defaultOpts, ...opts}

    this.AudioContext = window.AudioContext || window.webkitAudioContext
    this.context = new this.AudioContext()
  }

  load(url) {
    return fetch(url)
      .then(res => res.arrayBuffer())
      .then(buffer => {
        return new Promise((resolve, reject) => {
          this.context.decodeAudioData(buffer, resolve, reject)
        })
      })
      .then(data => {
        this.buffer = data
        return data
      })
  }

  play(opts = {}) {
    const defaultOpts = {
      loop: false,
      duraton: 0,
      volume: 1,
      offset: 0,
      when: 0
    }

    const options = {...defaultOpts, ...opts}

    const {
      volume,
      offset,
      loop,
      when
    } = options

    const { source, gainNode } = createSource(this.buffer, this.context, loop)

    gainNode.gain.value = volume
    source.start(when, offset)

    this.isPlaying = true
    this.source = source
    this.gainNode = gainNode
  }

  stop() {
    this.source.stop(0)
    this.isPlaying = false
  }

  toggle() {
    this.isPlaying ? this.stop() : this.play()
  }
}

export default Audio

/**
* private
*/

function createSource(buffer, context, loop = false) {
  const source = context.createBufferSource()
  const gainNode = context.createGain()

  source.buffer = buffer
  source.loop = loop
  source.connect(gainNode)
  // destination 是啥？就是扬声器
  gainNode.connect(context.destination)

  return {
    source: source,
    gainNode: gainNode
  }
}
