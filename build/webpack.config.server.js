const path = require('path')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const vueServerPlugin = require('vue-server-renderer')

let config

  console.warn('dev')
  config = merge(baseConfig, {
    target: 'node',
    entry: path.join(__dirname, '../client/server-entry.js'),
    devtool: 'source-map',
    output: {
      libraryTarget: 'commonjs2',
      filename: 'server-entry.js',
      path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies), // 没必要把代码都打包，如果有两份，会造成内存的浪费
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins:  [
      new ExtractPlugin('styles.[hash:8].css'),
      new webpack.defaultPlugins({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"server"'
      }),
      new vueServerPlugin()
    ]
  })


module.exports = config
