const webpack = require('webpack');
const path = require('path');
const {merge} = require('lodash');
const config = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'bundle/'
  },
  module:{
    rules:[
      ...config.module.rules,
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path]__[local]-[hash:base64:5]!autoprefixer-loader'
        ]
      }
    ]
  },
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }
      }
    })
  ],
  devServer: {
    contentBase: [path.join(__dirname, './bundle')],
    //port: 8080,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/mpphp': {
        target: 'http://192.168.20.66/she-in-stable/marketing-55/marketing-platform-php/public',
        pathRewrite: { '^/mpphp': '' },
        secure: false,
        changeOrigin: true,
      }
    },
  }
});
