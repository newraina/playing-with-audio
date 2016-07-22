!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.i=function(value){return value},__webpack_require__.p="/build/",__webpack_require__(__webpack_require__.s=6)}([function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function drawFrequencyData(ctx,width,height,analyser,expand){function loop(){requestAnimationFrame(loop),analyser.getByteFrequencyData(data),ctx.globalAlpha=1,ctx.clearRect(0,0,width,height),ctx.fillStyle="rgb(10,10,10)";for(var i=0;i<barCount;i++){var value=data[i*step]/256*height;ctx.globalAlpha=.5+value/height*.5,ctx.fillRect(i*(barWidth+barGap),height-value,barWidth,value)}}var frequencyBinCount=analyser.frequencyBinCount,data=new Uint8Array(frequencyBinCount),barWidth=width/frequencyBinCount*(expand?2.5:1),barGap=1,barCount=width/(barWidth+barGap),step=frequencyBinCount/barCount|0;loop()}function drawTimeDomainData(ctx,width,height,analyser,expand){function loop(){requestAnimationFrame(loop),analyser.getByteTimeDomainData(data),ctx.globalAlpha=1,ctx.clearRect(0,0,width,height),ctx.lineWidth=1,ctx.strokeStyle="rgb(10,10,10)",ctx.beginPath();for(var sliceWidth=width/fftSize,x=0,i=0;i<fftSize;i++){var v=data[i]/128,y=v*height/2;0===i?ctx.moveTo(x,y):ctx.lineTo(x,y),x+=sliceWidth}ctx.lineTo(width,height/2),ctx.stroke()}var fftSize=analyser.fftSize,data=new Uint8Array(fftSize);loop()}var __WEBPACK_IMPORTED_MODULE_0__util_noise__=__webpack_require__(2),__WEBPACK_IMPORTED_MODULE_1__constant__=__webpack_require__(1),_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),AudioContext=window.AudioContext||window.webkitAudioContext,getUserMedia=(navigator.getUserMedia||navigator.webkitGetUserMedia).bind(navigator),Audio=function(){function Audio(){var opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,Audio);var defaultOpts={fftSize:256};this.mode="normal",this.options=_extends({},defaultOpts,opts),this.context=new AudioContext,this.source=this.context.createBufferSource(),this.gainNode=this.context.createGain(),this.analyser=this.context.createAnalyser(),this.oscillator=this.context.createOscillator(),this.analyser.minDecibels=-90,this.analyser.maxDecibels=-10,this.analyser.smoothingTimeConstant=.85,this.source.connect(this.analyser),this.analyser.connect(this.gainNode),this.gainNode.connect(this.context.destination)}return _createClass(Audio,[{key:"load",value:function(url){var _this=this;return fetch(url).then(function(res){return res.arrayBuffer()}).then(function(buffer){return new Promise(function(resolve,reject){_this.context.decodeAudioData(buffer,resolve,reject)})}).then(function(data){return _this.buffer=data,data})}},{key:"voice",value:function(){var _this2=this;return this.mode="voice",this.gainNode.value=0,this.analyser.disconnect(),new Promise(function(resolve,reject){getUserMedia({audio:!0},resolve,reject)}).then(function(steam){_this2.source=_this2.context.createMediaStreamSource(steam),_this2.source.connect(_this2.analyser)})}},{key:"noise",value:function(){var type=arguments.length<=0||void 0===arguments[0]?"brown":arguments[0];this.mode="noise";var sampleRate=this.context.sampleRate,buffSize=2*sampleRate,noiseBuff=this.context.createBuffer(1,buffSize,sampleRate),noiseData=noiseBuff.getChannelData(0),data=__WEBPACK_IMPORTED_MODULE_0__util_noise__[type](buffSize);return noiseData.forEach(function(v,i){noiseData[i]=data[i]}),this.buffer=noiseBuff,Promise.resolve(noiseBuff)}},{key:"tone",value:function(){var _this3=this,opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],defaultOpts={nodeLength:"quarter",frequency:2e3,type:"sine",bpm:120},options=_extends({},defaultOpts,opts);this.toneLength=1/(options.bpm/60)*__WEBPACK_IMPORTED_MODULE_1__constant__.a[options.nodeLength],options.frequency=[].concat(options.frequency),this.isPlaying=!0,this.gainNode.value=.5;var startTime=void 0,endTime=void 0;options.frequency.forEach(function(v,i){startTime=endTime?endTime+_this3.toneLength/2:_this3.context.currentTime+i*_this3.toneLength,endTime=startTime?startTime+_this3.toneLength:_this3.context.currentTime+(i+1)*_this3.toneLength,v.split(",").forEach(function(item,j){if(__WEBPACK_IMPORTED_MODULE_1__constant__.a[item]){var blank=1/(options.bpm/60)*__WEBPACK_IMPORTED_MODULE_1__constant__.a[item];return startTime+=blank,void(endTime=startTime+blank)}var oscillator=_this3.context.createOscillator();oscillator.type=options.type,oscillator.frequency.value=__WEBPACK_IMPORTED_MODULE_1__constant__.b[item.trim()]||item,oscillator.connect(_this3.analyser),oscillator.start(startTime),oscillator.stop(endTime),_this3.oscillator=oscillator})}),this.mode="tone"}},{key:"play",value:function(){var opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(this.isPlaying=!0,this.gainNode.value=1,"tone"===this.mode)return this.oscillator.start(this.context.currentTime);var defaultOpts={loop:!1,duraton:0,volume:1,offset:0,when:0},options=_extends({},defaultOpts,opts),volume=options.volume,offset=options.offset,loop=options.loop,when=options.when;this.source.buffer=this.buffer,this.source.loop=loop,this.gainNode.gain.value=volume,this.source.start(when,offset)}},{key:"stop",value:function(){return this.isPlaying=!1,this.gainNode.value=0,"tone"===this.mode?this.oscillator.stop(this.context.currentTime+this.toneLength):void this.source.stop(0)}},{key:"toggle",value:function(){this.isPlaying?this.stop():this.play()}},{key:"getFrequencyData",value:function(){var dataArray=new Uint8Array(this.analyser.frequencyBinCount);return this.analyser.getByteFrequencyData(dataArray),this.frequencyData=dataArray,dataArray}},{key:"getTimeDomainData",value:function(){var dataArray=new Uint8Array(this.analyser.fftSize);return this.analyser.getByteTimeDomainData(dataArray),this.timeDomainData=dataArray,dataArray}},{key:"render",value:function(_ref){var _ref$mode=_ref.mode,mode=void 0===_ref$mode?"freq":_ref$mode,_ref$expand=_ref.expand,expand=void 0===_ref$expand||_ref$expand,_ref$target=_ref.target,target=void 0===_ref$target?null:_ref$target,_ref$width=_ref.width,width=void 0===_ref$width?450:_ref$width,_ref$height=_ref.height,height=void 0===_ref$height?150:_ref$height,canvas=target?target:document.createElement("canvas"),ctx=canvas.getContext("2d");canvas.width=width,canvas.height=height,document.body.appendChild(canvas),"freq"===mode&&(this.analyser.fftSize=256,drawFrequencyData(ctx,width,height,this.analyser,expand)),"time"===mode&&(this.analyser.fftSize=2048,drawTimeDomainData(ctx,width,height,this.analyser,expand))}}]),Audio}();exports.a=Audio},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"b",{configurable:!1,enumerable:!0,get:function(){return NOTES}}),Object.defineProperty(exports,"a",{configurable:!1,enumerable:!0,get:function(){return NOTE_LENGTH}});var NOTES={C0:16.35,"C#0":17.32,Db0:17.32,D0:18.35,"D#0":19.45,Eb0:19.45,E0:20.6,F0:21.83,"F#0":23.12,Gb0:23.12,G0:24.5,"G#0":25.96,Ab0:25.96,A0:27.5,"A#0":29.14,Bb0:29.14,B0:30.87,C1:32.7,"C#1":34.65,Db1:34.65,D1:36.71,"D#1":38.89,Eb1:38.89,E1:41.2,F1:43.65,"F#1":46.25,Gb1:46.25,G1:49,"G#1":51.91,Ab1:51.91,A1:55,"A#1":58.27,Bb1:58.27,B1:61.74,C2:65.41,"C#2":69.3,Db2:69.3,D2:73.42,"D#2":77.78,Eb2:77.78,E2:82.41,F2:87.31,"F#2":92.5,Gb2:92.5,G2:98,"G#2":103.83,Ab2:103.83,A2:110,"A#2":116.54,Bb2:116.54,B2:123.47,C3:130.81,"C#3":138.59,Db3:138.59,D3:146.83,"D#3":155.56,Eb3:155.56,E3:164.81,F3:174.61,"F#3":185,Gb3:185,G3:196,"G#3":207.65,Ab3:207.65,A3:220,"A#3":233.08,Bb3:233.08,B3:246.94,C4:261.63,"C#4":277.18,Db4:277.18,D4:293.66,"D#4":311.13,Eb4:311.13,E4:329.63,F4:349.23,"F#4":369.99,Gb4:369.99,G4:392,"G#4":415.3,Ab4:415.3,A4:440,"A#4":466.16,Bb4:466.16,B4:493.88,C5:523.25,"C#5":554.37,Db5:554.37,D5:587.33,"D#5":622.25,Eb5:622.25,E5:659.26,F5:698.46,"F#5":739.99,Gb5:739.99,G5:783.99,"G#5":830.61,Ab5:830.61,A5:880,"A#5":932.33,Bb5:932.33,B5:987.77,C6:1046.5,"C#6":1108.73,Db6:1108.73,D6:1174.66,"D#6":1244.51,Eb6:1244.51,E6:1318.51,F6:1396.91,"F#6":1479.98,Gb6:1479.98,G6:1567.98,"G#6":1661.22,Ab6:1661.22,A6:1760,"A#6":1864.66,Bb6:1864.66,B6:1975.53,C7:2093,"C#7":2217.46,Db7:2217.46,D7:2349.32,"D#7":2489.02,Eb7:2489.02,E7:2637.02,F7:2793.83,"F#7":2959.96,Gb7:2959.96,G7:3135.96,"G#7":3322.44,Ab7:3322.44,A7:3520,"A#7":3729.31,Bb7:3729.31,B7:3951.07,C8:4186.01},NOTE_LENGTH={whole:4,half:2,quarter:1,eighth:.5,sixteenth:.25}},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"white",{configurable:!1,enumerable:!0,get:function(){return white}}),Object.defineProperty(exports,"pink",{configurable:!1,enumerable:!0,get:function(){return pink}}),Object.defineProperty(exports,"brown",{configurable:!1,enumerable:!0,get:function(){return brown}}),Object.defineProperty(exports,"perlin",{configurable:!1,enumerable:!0,get:function(){return perlin}});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i["return"]&&_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),random=function(){return 2*Math.random()-1},white=function(size){var data=new Float32Array(size).map(function(){return random()});return data},pink=function(size){var data=new Float32Array(size),_fill=new Array(7).fill(0),_fill2=_slicedToArray(_fill,7),a=_fill2[0],b=_fill2[1],c=_fill2[2],d=_fill2[3],e=_fill2[4],f=_fill2[5],g=_fill2[6];return data.map(function(v,i){var basic=random();return i&&(g=.115926*basic),a=.99886*a+.0555179*basic,b=.99332*b+.0750759*basic,c=.969*c+.153852*basic,d=.8665*d+.3104856*basic,e=.55*e+.5329522*basic,g=-.7616*g-.016898*basic,a+b+c+d+e+f+g+.5362*basic})},brown=function(size){var data=new Float32Array(size),cache=0;return data.map(function(v,i){var basic=random();return cache=(cache+.02*basic)/1.02})},perlin=function(size){}},,,,function(module,exports,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0__audio__=__webpack_require__(0),audio1=new __WEBPACK_IMPORTED_MODULE_0__audio__.a,audio2=new __WEBPACK_IMPORTED_MODULE_0__audio__.a,canvas=document.querySelector("canvas");window.white=function(){audio1.noise("white").then(function(){return audio1.play()}).then(function(){return audio1.render({target:canvas,mode:"freq"})})},window.brown=function(){audio2.noise("brown").then(function(){return audio2.play()}).then(function(){return audio2.render({target:canvas,mode:"freq"})})}}]);
//# sourceMappingURL=4.js.map