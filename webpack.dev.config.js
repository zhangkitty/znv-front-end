/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.base.config.js');
const ExtractPlugin = require('extract-text-webpack-plugin');


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
        // exclude: /node_modules/,
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
        // target: 'http://10.45.148.82:9009',
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



      '/rqs': {
        // target: 'http://47.107.237.125:8012',
        //测试站
        target: 'http://10.45.156.186:9008',
        //朱文钧电脑
        //target: 'http://10.45.148.82:9001',
        //本地
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
        //线上
        target: 'http://172.18.113.59:9004',
        //测试站
        // target:'http://10.45.156.186:9001',
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
      },

      '/srm':{
        // target: 'http://127.0.0.1:9012',
        target:'http://10.45.156.171:9012',
        secure: false,
        changeOrigin: true
      },
      '/wgs':{
        // target:'http://127.0.0.1:9017',
        target:'http://10.45.156.221:9017',
        secure: false,
        changeOrigin: true
      },
      '/ams':{
        target:'http://10.45.156.221:9016',
        // target:'http://127.0.0.1:9016',
        secure: false,
        changeOrigin: true
      }
    },
    open: true
  }
});
