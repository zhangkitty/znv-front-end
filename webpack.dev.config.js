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
      "Access-Control-Allow-Headers":'*'
    },
    proxy: {
      '/rqs-dftc':{
        target: 'http://10.45.156.186:9009',
        // target: 'http://127.0.0.1:9001',
        // pathRewrite: { '^/rqs': '' },
        secure: false,
        changeOrigin: true
      },

      '/rqsonline': {
        target: 'http://47.107.237.125:8012',
        pathRewrite:{'/rqsonline':''},
        secure: false,
        changeOrigin: true
      },

      // '/rqs': {
      //   target: 'http://10.45.156.186:9008',
      //   // target: 'http://127.0.0.1:9001',
      //   // pathRewrite: { '^/rqs': '' },
      //   secure: false,
      //   changeOrigin: true
      // },

      '/rqs': {
        target: 'http://10.45.148.82:9001',
        // target: 'http://127.0.0.1:9001',
        // pathRewrite: { '^/rqs': '' },
        secure: false,
        changeOrigin: true
      },

      '/icloud.web': {
        target: 'http://10.45.148.173:8089',
        // pathRewrite: { '^/rqs': '' },
        secure: false,
        changeOrigin: true
      },

      '/aps':{
        target: 'http://120.78.21.57:9114',
        secure: false,
        changeOrigin: true
      },

      '/omc.znv.com/':{
        target: 'http://omc.znv.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '/omc.znv.com': '' },
      },
      '/oss':{
        target: 'http://10.45.156.171:9898',
        secure: false,
        changeOrigin: true
      },
      //线上地址
      // '/vue':{
      //   target:'http://120.77.245.161:8081',
      //   secure: false,
      //   changeOrigin: true,
      //   pathRewrite: { '/vue': '' },
      // },
      //测试站地址
      '/vue':{
        target:'http://10.45.156.165:8081',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '/vue': '' },
      }
    },
    open: true
  }
});
