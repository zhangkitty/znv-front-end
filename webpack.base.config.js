const webpack = require('webpack');

module.exports = {
  entry: {
    index: ['./src/entry.jsx'],
    vendor: [
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux-saga',
      'object-assign',
      'classnames',
      'whatwg-fetch',
    ],
  },
  resolve: {
    modules: ['lib', 'node_modules'],
    extensions: ['.js', '.jsx', 'css', '.json'],
  },
  externals: {
    lodash: 'window._',
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    antd: 'window.antd',
    moment: 'window.moment',
    'babel-polyfill': 'undefined',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?cacheDirectory=true',
          {
            loader: 'react-redux-component-loader',
            options: {
              externals: ['nav', 'login'],
              lazy: true,
              loading: 'Loading',
              reducerName: 'reducers',
              componentDir: 'component',
            },
          },
        ],
      },
      {
        test: /component\/([^\/]+\/)*type[s]?.js$/,
        exclude: /node_modules/,
        loaders: ['react-redux-types-loader'],
      },
      {
        test: /\/me\.json$/,
        use: [
          'babel-loader',
          {
            loader: 'react-redux-component-loader',
            options: {
              bundle: true,
              reducerName: 'reducers',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.ejs$/,
        use: ['ejs-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|svg|ttf|woff)$/,
        use: ['file-loader?name=[hash:base64:7].[ext]'],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
  ],
};
