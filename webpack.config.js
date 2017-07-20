var path = require('path');
var webpack = require('webpack');

var _path = __dirname + '/dist/';

module.exports = {
  entry: './app/src/js/app.jsx',
  output: {
    path: _path,
    filename: 'js/bundle.js',
    publicPath: 'http://localhost:8080/dist'
  },

  module:{
    loaders: [{
      test: /.(jsx|js)?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query:{
          presets: [ 'es2015', 'react' ]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  }
}
