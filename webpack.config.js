const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

const  isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode: isDev ? 'development' : 'production',
  entry: path.join(__dirname, 'src/index.js'),
  // output: {
  //   path: path.join(__dirname, 'dist'),
  //   filename: 'bundle.[hash:8].js'
  // },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HtmlPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name]-aaa.[ext]'
          }
        }
      }
    ]
  }
}

if (isDev) {
  console.warn('dev')
  config.module.rules.push({
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
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    host: '0.0.0.0',
    port: '8989',
    overlay: {errors: true},
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  console.warn('prod')
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output = {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js'
  }
  config.module.rules.push(      {
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
  })
  config.plugins.push(
    new ExtractPlugin('styles.[hash:8].css')
    // new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    // new webpack.optimize.CommonsChunkPlugin({name: 'runtime'})
  )
  config.optimization = {
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
}


module.exports = config
