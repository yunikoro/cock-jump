
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '../'),
    entry: {
       index: resolve('./src/index.js'),
    },
    output: {
        filename: '[name].[hash].js',
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: resolve('node_modules'),
                query: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
            },
            {
                test: /\.(mp4|eot|svg|ttf|woff|woff2|json|png|jpeg|jpg|gltf|bin|babylon|fbx)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                    },
                  }
                ]
            }
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        disableHostCheck: true,
        contentBase: false,
        host: '0.0.0.0',
        port: 80, 
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Runner',
          filename: 'index.html',
          template: 'index.html',
          chunks: ['index'],
          inject: true
        })
    ]
}