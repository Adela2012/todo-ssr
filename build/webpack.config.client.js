const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 以确保正确解析 .vue文件 <script>块中的js代码
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const vueClientPlugin = require('vue-server-renderer/client-plugin')

const  isDev = process.env.NODE_ENV === 'development'
console.log('isDev',isDev)

const devServer = {
  host: '0.0.0.0',
  port: '8989',
  overlay: {errors: true},
  headers: {'Access-Control-Allow-Origin': '*'},
  historyApiFallback: {
    index: '/public/index.html' // output
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
  hot: true
}

const defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HtmlPlugin({
    template: path.resolve(__dirname, 'template.html')
  }),
  new vueClientPlugin()
]

let config

if (isDev) {
  console.warn('dev')
  config = merge(baseConfig, {
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
    plugins:  defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  console.warn('prod')
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.(styl|stylus)$/,
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
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[hash:8].css'),
      new webpack.NamedChunksPlugin()
    ]),
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    }
  })

}

config.resolve = {
  alias: {
    'model': path.resolve(__dirname, '../client/model/client-model.js')
  }
}


module.exports = config
