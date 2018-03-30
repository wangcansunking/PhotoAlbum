const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const DIST_DIR = 'dist';

const plugins = [
    new ExtractTextPlugin({
        filename: "[name].[contenthash:8].css",
        allChunks: true
    }),
    new HtmlWebpackPlugin({
        chunks:['index'],
        template:'src/app/index.html',
        filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
        chunks:['404'],
        template:'src/404/index.html',
        filename: '404.html'
    })
];
if (process.env.NODE_ENV === 'production') {
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    plugins.push(new CleanWebpackPlugin([DIST_DIR]))
}

module.exports = {
    stats: {
        chunks: false,
        children: false,
        colors: true,
        entrypoints: false,
        modules: false
    },
    entry: {
        index: './src/app/index.js',
        404: './src/404/index.js'
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, DIST_DIR)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins
};