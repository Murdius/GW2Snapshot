var path = require('path');
var webpack = require("webpack");
var BUILD_DIR = path.resolve(__dirname, 'app/static');
var APP_DIR = path.resolve(__dirname, 'app/static');

var config = {
  entry: APP_DIR + '/index2.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel", query: {presets:['react','es2015']}}
      ]
  },
plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};

module.exports = config;
