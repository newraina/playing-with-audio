
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'source-map',

  entry: ['webpack-hot-middleware/client?reload=true', './src/index.js'],

  output: {
    path: path.resolve('./build'),
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'playing-with-audio',
      template: './src/index.html'
    }),
    new webpack.NoErrorsPlugin()
  ]
}
