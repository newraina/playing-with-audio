
const random = Math.random

export const white = size => {
  const data = new Float32Array(size)
    .map(() => random())

  return data
}

export const pink = size => {
  const data = new Float32Array(size)

  let [a, b, c, d, e, f, g] = new Array(7).fill(0.0)

  return data.map((v, i) => {
    const basic = random()

    if (i) {
      g = basic * 0.115926
    }

    a = 0.99886 * a + basic * 0.0555179
    b = 0.99332 * b + basic * 0.0750759
    c = 0.96900 * c + basic * 0.1538520
    d = 0.86650 * d + basic * 0.3104856
    e = 0.55000 * e + basic * 0.5329522
    g = -0.7616 * g - basic * 0.0168980

    return a + b + c + d + e + f + g + basic * 0.5362
  })
}

export const brown = size => {
  const data = new Float32Array(size)

  let cache = 0.0

  return data.map((v, i) => {
    const basic = random()

    return cache = (cache + (0.02 * basic)) / 1.02
  })
}

// todo 2d perlin noise
export const perlin = size => {

}
