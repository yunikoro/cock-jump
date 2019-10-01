
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CleanCSSPlugin = require('less-plugin-clean-css')

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
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: resolve('node_modules'),
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
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
              test: /\.less$/,
              use: [
                {
                  loader: "style-loader" 
                },
                {
                  loader: "css-loader" 
                },
                {
                  loader: "less-loader",
                  options: {
                    plugins: [
                      new CleanCSSPlugin({ advanced: true })
                    ]
                  }
                }
              ],

          },
            {
                test: /\.(mp4|eot|svg|ttf|woff|woff2|json|png|jpeg|jpg|gltf|bin|babylon|fbx|glb)$/,
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
          title: 'Cock Jump',
          filename: 'index.html',
          template: 'index.html',
          chunks: ['index'],
          inject: true
        })
    ]
}