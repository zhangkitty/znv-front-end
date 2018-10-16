/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.base.config.js');

module.exports = Object.assign({},config, {
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      ...config.module.rules,
      {
        test: /\.css$/,
        loaders: ['happypack/loader?id=styles']
      }
    ]
  },
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        // BASE_URI: JSON.stringify('http://127.0.0.1:8081'),
        BASE_URI: JSON.stringify('http://127.0.0.1:8081'),

      }
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      filename: './index.html',
      cache: true
    })
  ],
  devServer: {
    host: '127.0.0.1',
    contentBase: [path.join(__dirname, './')],
    port: 8081,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept"
    },
    proxy: {
      '/rqs': {
        target: 'http://10.45.156.186:9008',
        // target: 'http://127.0.0.1:9001',
        // pathRewrite: { '^/rqs': '' },
        secure: false,
        changeOrigin: true
      },
      '/icloud.web': {
        target: 'http://10.45.146.69:8080',
        // pathRewrite: { '^/rqs': '' },
        secure: false,
        changeOrigin: true
      }
    },
    open: true
  }
});
