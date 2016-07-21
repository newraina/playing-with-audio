
'use strict'

const config = require('./webpack.hot')
const express = require('express')
const webpack = require('webpack')
const path = require('path')

const compiler = webpack(config)
const app = express()

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(path.join(__dirname)))

app.listen(4000, err => {
  if (err) {
    return console.error(err)
  }

  console.info('Listening at localhost:4000')
})
