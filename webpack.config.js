/* eslint-disable */
var webpack = require('webpack');
var version = require('./package.json').version;
var PROD = !!JSON.parse(process.env.PRODUCTION || '0');

module.exports = {
  entry: './js/app/app.js',
  output: {
    path: './build',
    filename: 'bundle.js',
    publicPath: 'build/',
  },
  resolve: {
    // Absolute path that contains modules
    root: __dirname,

    // Directory names to be searched for modules
    modulesDirectories: ['js', 'app', 'view', 'model', 'node_modules', 'css'],

    // Replace modules with other modules or paths for compatibility or convenience
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
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: "'" + version + "'",
      __BUILD_DATE__: "'" + new Date() + "'"
    })
  ].concat(PROD ? [new webpack.optimize.UglifyJsPlugin({ minimize: true })] : [])
};
