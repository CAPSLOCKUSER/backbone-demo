/* eslint-disable */
var webpack = require('webpack');
var version = require('./package.json').version;
var PROD = !!JSON.parse(process.env.PRODUCTION || '0');


var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
  entry: {
    main: './js/app/app.js',
    vendor: ['jquery', 'backbone', 'mustache']
  },
  output: {
    path: './build',
    filename: '[name].[chunkhash].js',
    publicPath: 'build/'
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
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: "'" + version + "'",
      __BUILD_DATE__: "'" + new Date() + "'"
    })
  ].concat(PROD ? [new webpack.optimize.UglifyJsPlugin({ minimize: true })] : [])
};
