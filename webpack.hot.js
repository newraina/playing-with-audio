
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const common = ['webpack-hot-middleware/client?reload=true']
const entrys = {
  1: [...common, './src/page/1.js'],
  2: [...common, './src/page/2.js'],
  3: [...common, './src/page/3.js'],
  4: [...common, './src/page/4.js'],
  5: [...common, './src/page/5.js'],
  6: [...common, './src/page/6.js'],
  7: [...common, './src/page/7.js']
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'playing-with-audio',
      template: './src/index.html'
    }),
    new webpack.NoErrorsPlugin()
  ]
}
