
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'source-map',

  entry: ['webpack-hot-middleware/client?reload=true', './src/index.js'],

  output: {
    path: path.resolve('build'),
    publicPath: '/build/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'playing-with-audio',
      template: './src/index.html'
    }),
    new webpack.NoErrorsPlugin()
  ]
}
