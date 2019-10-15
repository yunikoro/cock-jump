
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Px2remWebpackPlugin = require('px2rem-webpack-plugin')
const CleanCSSPlugin = require('less-plugin-clean-css')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
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
              test: /\.(le|c)ss$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    hmr: devMode
                  }
                },
                'css-loader', 'postcss-loader', 'less-loader'
              ]
            },
          //   {
          //       test: /\.css$/,
          //       use: [
          //         'style-loader',
          //         'css-loader'
          //       ],
          //   },
          //   {
          //     test: /\.less$/,
          //     use: [
          //       {
          //         loader: "style-loader" 
          //       },
          //       {
          //         loader: "css-loader" 
          //       },
          //       {
          //         loader: "less-loader",
          //         options: {
          //           plugins: [
          //             new CleanCSSPlugin({ advanced: true })
          //           ]
          //         }
          //       }
          //     ],

          // },
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
          title: '疯狂跳跳鸡',
          filename: 'index.html',
          template: 'index.html',
          chunks: ['index'],
          inject: true
        }),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: devMode ? '[name].css' : '[name].[hash].css',
          chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new Px2remWebpackPlugin({
          originScreenWidth: 750,
          maxWidth: 750
        }),
    ]
}