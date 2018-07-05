'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   mode: 'production',
   entry: {
      'dotnetify-elements': './client/dotnetify-elements/index.js'
   },
   output: {
      path: __dirname + '/dist',
      filename: 'lib/[name].bundle.js',
      library: 'dotNetifyElements',
      libraryTarget: 'umd'
   },
   resolve: {
      modules: [ 'client', 'node_modules' ],
      extensions: [ '.js', '.jsx', '.tsx' ]
   },
   module: {
      rules: [
         { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
         { test: /\.tsx?$/, use: 'awesome-typescript-loader?silent=true' },
         { test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader?minimize' ] },
         { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
         { test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url-loader' }
      ]
   },
   externals: [ 'dotnetify', 'react', 'react-dom', 'styled-components' ],
   plugins: [ new MiniCssExtractPlugin() ]
};
