/* eslint-disable */
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var VERSION = require('./package.json').version;
var PROD = !!JSON.parse(process.env.PRODUCTION || '0');

module.exports = {
  entry: {
    main: './js/app/app.js',
    vendor: ['jquery', 'backbone', 'mustache']
  },
  output: {
    path: './build',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: ['js', 'app', 'view', 'model', 'node_modules', 'css'],
    alias: {
      'underscore': 'lodash'
    }
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
      {
        test: /\.jade$/,
        loader: 'jade'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: "'" + VERSION + "'",
      __BUILD_DATE__: "'" + new Date() + "'"
    }),
    new HtmlWebpackPlugin({
      template: './jade/index.jade',
      filename: 'index.html'
    })
  ].concat(PROD ? [new webpack.optimize.UglifyJsPlugin({ minimize: true })] : [])
};
