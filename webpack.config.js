const join = require('path').join
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const fs = require('fs')

module.exports = {
  entry: {
    frontPage: './src/main.js'
  },
  output: {
    filename: 'dev-bundle.js',
    publicPath: '/'
  },

  devServer: {
    host: process.env.HOST || '0.0.0.0',
    https: {
      key: fs.readFileSync('./0.0.0.0-key.pem'),
      cert: fs.readFileSync('./0.0.0.0.pem')
    },
    port: 443,
    historyApiFallback: true,
    contentBase: join(__dirname, 'data'),
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        secure: false
      }
    }
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: 'babel-loader',
        include: join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/
      }
    ]
  },

  node: {
    fs: 'empty'
  },

  // Optional: Enables reading mapbox token from environment variable
  plugins: [
    new Dotenv(),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      title: 'AIRM Consulting'
    })
  ]
}
