const webpack = require('webpack');
const path = require('path');
const { merge } = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.base.config.js');

module.exports = merge(config, {
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      ...config.module.rules,
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path]__[local]-[hash:base64:5]!autoprefixer-loader',
        ],
      },
    ],
  },
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      filename: './index.html',
      cache: true,
    }),
  ],
  devServer: {
    contentBase: [path.join(__dirname, './')],
    // port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/ssr': {
        target: 'http://192.168.20.66',
        // pathRewrite: { '^/mpphp': '' },
        secure: false,
        changeOrigin: true,
      },
    },
    open: true,
  },
});
