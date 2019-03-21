'use strict';

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs');

const baseExport = {
   module: {
      rules: [
         { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
         { test: /\.tsx?$/, use: 'awesome-typescript-loader?silent=true' },
         { test: /\.css$/, loader: 'raw-loader' },
         { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
         { test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url-loader' }
      ]
   },
   plugins: [ new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/) ]
};

let components = {};
let componentsFolder = './src/dotnetify-elements/bootstrap/_components/';
fs.readdirSync(componentsFolder).forEach(file => {
   const name = file.slice(0, -3);
   components[name] = componentsFolder + file;
   if (name === 'Core') components['index'] = componentsFolder + file;
});

const moduleConfig = {
   mode: 'production',
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
   module: baseExport.module,
   plugins: baseExport.plugins,
   optimization: {
      minimizer: [
         new UglifyJSPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
               compress: true,
               keep_classnames: true,
               keep_fnames: true
            },
            sourceMap: true
         })
      ]
   }
};

module.exports = [
   { ...moduleConfig, entry: { 'dotnetify-elements': './src/dotnetify-elements/index.js' } },
   {
      ...moduleConfig,
      entry: components,
      output: { ...moduleConfig.output, path: __dirname + '/dist/components', library: '[name]' },
      externals: {
         bootstrap: 'bootstrap',
         dotnetify: 'dotnetify',
         react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
         },
         'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM'
         },
         'styled-components': {
            commonjs: 'styled-components',
            commonjs2: 'styled-components',
            amd: 'styled-components',
            root: 'styled'
         }
      }
   },
   {
      mode: 'production',
      entry: {
         'dotnetify-elements': './src/dotnetify-elements/index.js'
      },
      output: {
         path: __dirname + '/dist',
         filename: 'lib/[name].bundle.js',
         library: 'dotNetifyElements',
         libraryTarget: 'umd'
      },
      resolve: {
         modules: [ 'src', 'node_modules' ],
         extensions: [ '.js', '.jsx', '.tsx' ]
      },
      externals: {
         dotnetify: 'dotnetify',
         react: 'React',
         'react-dom': 'ReactDOM',
         'styled-components': 'styled'
      },
      module: baseExport.module,
      plugins: baseExport.plugins
   }
];
