const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: [path.resolve(__dirname, './app.js')],
    output: {
        path: path.resolve(__dirname, '../server/public'),
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "jshint-loader"
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: 'style!css!resolve-url!sass?sourceMap'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file-loader?limit=8192'
        }, {
            test: /\.html$/,
            loader: 'html'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery'
        }),
    ]
  }
// },
// sassLoader: {
//     includePaths: [ path.resolve(__dirname, './scss') ] //, './src/scss/colors'
//   }
// };
