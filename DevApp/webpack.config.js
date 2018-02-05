"use strict";

const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: "./client/main.js"
    },
    output: {
        filename: './wwwroot/dist/bundle.js',
        publicPath: 'dist/'
    },
    resolve: {
        modules: ["client", "node_modules"],
        extensions: ['.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.tsx?$/, use: 'awesome-typescript-loader?silent=true' },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader?minimize' }) },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
            { test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url-loader' }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('./wwwroot/dist/app.css')
    ]
};