'use strict';

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
   plugins: [ new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/), new BundleAnalyzerPlugin() ],
   optimization: {
      minimizer: [
         new UglifyJSPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
               compress: true,
               ecma: 5,
               keep_classnames: true,
               keep_fnames: true
            },
            sourceMap: true
         })
      ]
   }
};

let components = {
   _test: './src/dotnetify-elements/bootstrap/_components/MultiSelectList.js'
};

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
      'chartjs-plugin-streaming',
      'dotnetify',
      'emotion',
      'html-to-react',
      'marked',
      'moment',
      'prismjs',
      'prop-types',
      'quill',
      'quill/dist/quill',
      'quill/dist/quill.snow.css',
      'quill/dist/quill.bubble.css',
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
   optimization: baseExport.optimization
};

module.exports = [
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
   }
];
