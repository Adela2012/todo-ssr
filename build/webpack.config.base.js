const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const  isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode: isDev ? 'development' : 'production',
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.[hash:8].js',
    publicPath: 'http://127.0.0.1:8989/public/'
  },
  module: {
    rules: [
      // {
      //   test: /\.(vue|js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   enforce: 'pre'
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'resources/[path][name]-[hash].[ext]'
          }
        }
      }
    ]
  }
}

module.exports = config
