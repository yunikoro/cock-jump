const path = require('path')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const base = require('./webpack.base.conf')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
    mode: 'production',
    output: {
        publicPath: './'
    },
    plugins: [
        new CompressionPlugin(),
        new HtmlWebpackPlugin({
            title: '疯狂跳跳鸡',
            filename: 'index.html',
            template: 'index.html',
            chunks: ['vendor', 'index'],
            inject: true
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                    comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    devtool: 'source-map'
})