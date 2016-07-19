
class Audio {

  constructor(opts = {}) {
    const defaultOpts = {
      fftSize: 2048 // 32 ~ 32768
    }

    this.options = {...defaultOpts, ...opts}

    this.AudioContext = window.AudioContext || window.webkitAudioContext

    this.context = new this.AudioContext()

    this.source = this.context.createBufferSource()
    this.gainNode = this.context.createGain()
    this.analyser = this.context.createAnalyser()

    this.analyser.fftSize = this.options.fftSize

    this.source.connect(this.analyser)
    this.analyser.connect(this.gainNode)
    this.gainNode.connect(this.context.destination)
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

    this.source.buffer = this.buffer
    this.source.loop = loop
    this.gainNode.gain.value = 0

    this.source.start(when, offset)

    this.isPlaying = true
  }

  stop() {
    this.source.stop(0)
    this.isPlaying = false
  }

  toggle() {
    this.isPlaying ? this.stop() : this.play()
  }

  getFrequencyData() {
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount)

    this.analyser.getByteFrequencyData(dataArray)
    this.frequencyData = dataArray
    return dataArray
  }

  getTimeDomainData() {
    const dataArray = new Uint8Array(this.analyser.fftSize)

    this.analyser.getByteTimeDomainData(dataArray)
    this.timeDomainData = dataArray
    return dataArray
  }

  render({mode = 'freq'}) {
    const width = 450
    const height = 150

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = width
    canvas.height = height
    document.body.appendChild(canvas)

    if (mode === 'freq') {
      drawFrequencyData(ctx, width, height, this.analyser)
    }

    if (mode === 'time') {
      drawTimeDomainData(ctx, width, height, this.analyser)
    }
  }
}

export default Audio

/**
* private
*/

function drawFrequencyData(ctx, width, height, analyser) {
  const frequencyBinCount = analyser.frequencyBinCount
  const data = new Uint8Array(frequencyBinCount)
  const barWidth = 5
  const barGap = 4
  const barCount = (width / (barWidth + barGap)) | 0
  const step = (frequencyBinCount / barCount) | 0

  function loop() {
    requestAnimationFrame(loop)

    analyser.getByteFrequencyData(data)

    ctx.fillStyle = '#E1F6F4'
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = '#6AC1B8'

    for (let i = 0; i < barCount; i++) {
      const value = data[i * step] / 256 * height
      ctx.fillRect(i * (barWidth + barGap), height - value, barWidth, value)
    }
  }

  loop()
}

function drawTimeDomainData(ctx, width, height, analyser) {
  const fftSize = analyser.fftSize
  const data = new Uint8Array(fftSize)

  function loop() {
    requestAnimationFrame(loop)

    analyser.getByteTimeDomainData(data)

    ctx.fillStyle = '#E1F6F4'
    ctx.fillRect(0, 0, width, height)

    ctx.lineWidth = 1
    ctx.strokeStyle = '#6AC1B8'

    ctx.beginPath()

    const sliceWidth = width / fftSize
    let x = 0

    for (let i = 0; i < fftSize; i++) {
      const v = data[i] / 128
      const y = v * height / 2

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      x += sliceWidth
    }

    ctx.lineTo(width, height / 2)
    ctx.stroke()
  }

  loop()
}
