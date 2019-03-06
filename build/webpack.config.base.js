const path = require('path')
const creatVueLoaderOptions = require('./vue-loader.config')

const  isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode: isDev ? 'development' : 'production',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.[hash:8].js' 
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: creatVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/
      // },
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
            name: 'resources/[path][name]-[hash].[ext]'
          }
        }
      }
    ]
  }
}

module.exports = config
