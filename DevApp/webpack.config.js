'use strict';

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
   mode: 'development',
   entry: {
      app: './client/main.js',
      'dotnetify-elements': './src/dotnetify-elements/index.js'
   },
   output: {
      filename: '[name].js',
      path: __dirname + '/wwwroot/dist',
      publicPath: '/dist/'
   },
   devtool: 'source-map',
   resolve: {
      modules: [ 'src', 'client', 'node_modules' ],
      extensions: [ '.js', '.jsx', '.tsx' ]
   },
   module: {
      rules: [
         { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
         { test: /\.tsx?$/, use: 'awesome-typescript-loader?silent=true' },
         { test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader?minimize' ] },
         { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader' },
         { test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url-loader' }
      ]
   },
   externals: {
      dotnetify: 'dotnetify',
      'dotnetify-elements': 'dotNetifyElements',
      react: 'React',
      'react-dom': 'ReactDOM',
      'styled-components': 'styled'
   },
   plugins: [ new MiniCssExtractPlugin(), new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/), new BundleAnalyzerPlugin() ]
};
