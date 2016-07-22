
const webpack = require('webpack')
const path = require('path')

const entrys = {
  1: './src/page/1.js',
  2: './src/page/2.js',
  3: './src/page/3.js',
  4: './src/page/4.js',
  5: './src/page/5.js',
  6: './src/page/6.js',
  7: './src/page/7.js'
}

module.exports = {
  devtool: 'source-map',

  entry: entrys,

  output: {
    path: path.resolve('./build'),
    publicPath: '/build/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      loader: 'babel'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false,
      output: {
        comments: false
      }
    }),
    new webpack.NoErrorsPlugin()
  ]
}
