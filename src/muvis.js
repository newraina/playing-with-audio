
function Muvis(path, options = {}) {
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  const context = new AudioContext()
  const dataMax = options.dataMax || 10
  let bufferSource, analyzer, frequency, fileData
  const self = this

  self.isPlaying = false

  function loadFile() {
    const request = new XMLHttpRequest()
    request.open('GET', path, true)
    request.responseType = 'arraybuffer'
    request.onload = fileLoaded
    request.onerror = fileError
    request.send()
  }

  function fileLoaded(e) {
    fileData = e.target.response
    if (options.onLoad) {
      options.onLoad(fileData)
    }
  }

  function fileError() {
    if (options.onError) {
      options.onError('Unable to load file.')
    }
  }

  function onAudioDecode(buffer) {
    bufferSource = context.createBufferSource()
    analyzer = context.createAnalyser()
    frequency = new Uint8Array(analyzer.frequencyBinCount)

    bufferSource.buffer = buffer
    bufferSource.connect(context.destination)
    bufferSource.connect(analyzer)
    bufferSource.onended = function() {
      self.stop()

      if (options.onEnded) {
        options.onEnded(self)
      }
    }
    bufferSource.start(0)
    if (options.onReady) options.onReady(self)
    render()
  }

  function onAudioDecodeError() {
    if (options.onError) options.onError('Unable to decode audio.')
  }

  function render() {
    if (self.isPlaying) {
      requestAnimationFrame(render)
      analyzer.getByteFrequencyData(frequency)
      if (options.onData) options.onData(frequency.slice(0, dataMax))
    }
  }

  self.play = function() {
    if (!self.isPlaying) {
      context.decodeAudioData(fileData, onAudioDecode, onAudioDecodeError)

      self.isPlaying = true
    }
  }

  self.stop = function() {
    if (self.isPlaying) {
      bufferSource.stop()
      self.isPlaying = false
    }
  }

  loadFile()
}

export default Muvis
