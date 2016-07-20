
import * as noiser from './util/noise'

const AudioContext = window.AudioContext || window.webkitAudioContext
const getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia).bind(navigator)

class Audio {

  constructor(opts = {}) {
    const defaultOpts = {
      fftSize: 256 // 32 ~ 32768
    }

    this.options = {...defaultOpts, ...opts}

    this.context = new AudioContext()

    this.source = this.context.createBufferSource()
    this.gainNode = this.context.createGain()
    this.analyser = this.context.createAnalyser()

    // 暂时在 render 中根据类型调整 fftSize
    // todo 同一个audio 实例中，ffisize 不共享，使支持一个实例多个 render
    // this.analyser.fftSize = this.options.fftSize
    this.analyser.minDecibels = -90
    this.analyser.maxDecibels = -10
    this.analyser.smoothingTimeConstant = 0.85

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

  voice() {
    return new Promise(function(resolve, reject) {
      getUserMedia({audio: true}, resolve, reject)
    })
    .then(steam => {
      // 流式音频，需要修改 source
      this.source = this.context.createMediaStreamSource(steam)
      this.source.connect(this.analyser)
    })
  }

  noise(type = 'brown') {
    // type: [white, pink, brown, perlin]
    const sampleRate = this.context.sampleRate
    const buffSize = 2 * sampleRate
    const noiseBuff = this.context.createBuffer(1, buffSize, sampleRate)
    const noiseData = noiseBuff.getChannelData(0) //  Float32Array
    const data = noiser[type](buffSize)

    noiseData.forEach((v, i) => {
      noiseData[i] = data[i]
    })

    this.buffer = noiseBuff

    return Promise.resolve(noiseBuff)
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
    this.gainNode.gain.value = volume

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
      this.analyser.fftSize = 256
      drawFrequencyData(ctx, width, height, this.analyser)
    }

    if (mode === 'time') {
      this.analyser.fftSize = 2048
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
  const barWidth = width / frequencyBinCount * 2.5
  const barGap = 1
  const barCount = (width / (barWidth + barGap))
  const step = (frequencyBinCount / barCount) | 0

  function loop() {
    requestAnimationFrame(loop)

    analyser.getByteFrequencyData(data)

    ctx.fillStyle = '#E1F6F4'
    ctx.globalAlpha = 1
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = 'rgb(106,193,184)'

    for (let i = 0; i < barCount; i++) {
      const value = data[i * step] / 256 * height

      ctx.globalAlpha = 0.5 + value / height * 0.5
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
