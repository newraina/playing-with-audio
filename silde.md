title: playing-with-audio
speaker: newraina
url: https://github.com/newraina/playing-with-audio
highlightStyle: tomorrow
transition: move
theme: light

[slide data-on-leave="removeVoice"]

# Web Audio API

<iframe scrolling="no" seamless="no" style="background:none;height:180px;" data-src="/src/page/1.html" src="about:blank;"></iframe>

[slide]

# 不少人喜欢做 HTML5 音乐播放器

---

v2ex 分享创造板块 {:&.moveIn}

[slide]

# Aplayer  @DIYGod

![](../image/aplayer.jpg)

[slide]

# Cplayer  @Corps

![](../image/cplayer.png)

[slide]

# SKplayer  @scott15975

![](../image/skplayer.gif)

[slide]

# mePlayer  @me

![](../image/meplayer.png)

[slide]

# `<audio>`

[slide]

## `audio.src`
## `audio.play()`

[slide]

# 想控制更多东西怎么办？

---

audio api {:&.moveIn}

[slide]

# 需要一个容器

---

`context = new AudioContext()` {:&.moveIn}

[slide]

# 声音的源头怎么弄

---

比如一首歌？ {:&.moveIn}

[slide]

```javascript
fetch(musicURL)
  .then(res => res.arrayBuffer())
  .then(buffer => {
    return new Promise((resolve, reject) => {
      context.decodeAudioData(buffer, resolve, reject)
    })
  }
```

---

`ArrayBuffer`  >>  `decodeAudioData`  >>  `AudioBuffer` {:&.moveIn}

得到了声音的源头 {:&.moveIn}

[slide]

# 怎么把声音送给扬声器？

---

`AudioBuffer` >> `source` >> `destination` {:&.moveIn}

[slide]

`AudioBuffer` >> `source` >> `destination`

---

```javascript
source = context.createBufferSource()
source.buffer = AudioBuffer
source.connect(context.destination)
```

<iframe scrolling="no" seamless="no" style="background:none;height:180px;" data-src="/src/page/2.html" src="about:blank;"></iframe>

[slide]

# 好麻烦

用 `<audio>` 一行就搞定了

---

有意义  {:&.moveIn}

[slide]

# source >> destination

---

中间可以插入各种节点来获取和修改流过的音频数据 {:&.moveIn}

[slide]

# 可视化

---

## source >> analyser >> destination

[slide]

```javascript
analyser = context.createAnalyser()

source.connect(analyser)
analyser.connect(context.destination)
```

---

`analyser.getByteTimeDomainData` {:&.moveIn}

`analyser.getByteFrequencyData` {:&.moveIn}

[slide]

<iframe scrolling="no" seamless="no" style="background:none;height:180px;" data-src="/src/page/3.html" src="about:blank;"></iframe>

[slide]

# 可以自己生成声音吗？

---

既然声音在进入扬声器之前都是数组

[slide]

# 自己随便填个数组试试？

```javascript
const data = new Float32Array(44100)
  .map(() => Math.random())
```

`context.createBuffer`
`buffer.getChannelData`

[slide]

<iframe scrolling="no" seamless="no" style="background:none;height:180px;" data-src="/src/page/4.html" src="about:blank;"></iframe>

[slide]

# 能出声音，肯定就能出音乐

音乐就是不同频率的声音

[slide]

# 不需要手动建数组了

```javascript
oscillator = context.createOscillator()
oscillator.connect(this.context.destination)

oscillator.frequency.value = 200
```

[slide]

<iframe scrolling="no" seamless="no" style="background:none;height:180px;" data-src="/src/page/5.html" src="about:blank;"></iframe>

[slide]

# 不好听...

---

- 模拟自然界 {:&.moveIn}
- 数字音乐

[slide]

# 大自然没有突变

所有的改变都需要时间

[slide]

![](../image/xiangya.jpg)

## 60G

[slide]

<iframe scrolling="no" seamless="no" style="background:none;height:180px;" data-src="/src/page/6.html" src="about:blank;"></iframe>

[slide]

# 谢谢!
