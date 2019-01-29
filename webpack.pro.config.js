const webpack = require('webpack');
const path = require('path');
const { merge } = require('lodash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('./webpack.base.config');

module.exports = merge(config, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: process.env.PUBLICPATH_BASE || 'dist/',
  },
  cache: false,
  module: {
    rules: [
      ...config.module.rules,
      {
        test: /\.css$/,
        use: ExtractPlugin.extract({
          fallback: 'style-loader',
          use:
              'css-loader?minimize&url=false&modules&importLoaders=1&localIdentName=[path]__[local]-[hash:base64:5]!postcss-loader',
        }),
      },
    ],
  },
  plugins: [
    ...config.plugins,
    new CleanWebpackPlugin(['dist']),
    new ExtractPlugin('[contenthash].css'),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('production'),
          BASE_URI: JSON.stringify('http://47.107.237.125:8012'),
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      filename: '../index.html',
    }),
    // new ParallelUglifyPlugin({
    //   uglifyJS: {
    //     output: {
    //       comments: false,
    //     },
    //     compress: {
    //       warnings: false,
    //     },
    //   },
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ].concat(process.env.NODE_ENV === 'analysis' ? new BundleAnalyzerPlugin() : []),
});
