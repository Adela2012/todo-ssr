const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')


const devServer = {
  host: '0.0.0.0',
  port: '8980',
  overlay: {errors: true},
  hot: true
}

const defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV:'"development"'
    }
  }),
  new HtmlPlugin({
    template: path.resolve(__dirname, 'template.html')
  })
]

let config

  console.warn('dev')
  config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    devServer,
    resolve: {
      alias: {
        'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js') // runtime-only方式不支持template的写法，所以要制定vue的版本
      }
    },
    plugins:  defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })


module.exports = config
