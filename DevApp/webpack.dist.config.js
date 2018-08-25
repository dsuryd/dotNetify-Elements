'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   mode: 'production',
   entry: {
      'dotnetify-elements': './src/dotnetify-elements/index.js'
   },
   output: {
      path: __dirname + '/dist',
      filename: '[name].js',
      library: 'dotNetifyElements',
      libraryTarget: 'umd'
   },
   resolve: {
      modules: [ 'src', 'node_modules' ],
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
   externals: [
      'bootstrap',
      'chart.js',
      'dotnetify',
      'marked',
      'moment',
      'prismjs',
      'prop-types',
      'react',
      'react-chartjs-2',
      'react-data-grid',
      'react-dom',
      'react-widgets',
      'react-widgets-moment',
      'reactstrap',
      'styled-components',
      'text-mask-addons',
      'text-mask-core'
   ],
   plugins: [ new MiniCssExtractPlugin() ]
};
