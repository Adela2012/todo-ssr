const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')

const  isDev = process.env.NODE_ENV === 'development'
console.log('isDev',isDev)

const devServer = {
  host: '0.0.0.0',
  port: '8989',
  overlay: {errors: true},
  hot: true
}

const defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HtmlPlugin()
]

let config

if (isDev) {
  console.warn('dev')
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [{
        test: /\.(styl|stylus)$/,
        use: [
          'style-loader', 
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
    plugins:  defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  console.warn('prod')
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.(styl|stylus)$/,
          use: ExtractPlugin.extract({
            fallback: 'style-loader', 
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
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[hash:8].css')
      // new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      // new webpack.optimize.CommonsChunkPlugin({name: 'runtime'})
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
              name: "vendor",
              chunks: "initial",
              minChunks: 2
          }
        }
      }
    }
  })

}


module.exports = config