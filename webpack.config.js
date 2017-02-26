const autoprefixer = require('autoprefixer');
const path         = require('path');

const webpack       = require('webpack');
const webpackConfig = new webpack.HotModuleReplacementPlugin();

const HtmlWebpackPlugin       = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

const ExtractTextPlugin       = require('extract-text-webpack-plugin');
const ExtractTextPluginConfig = new ExtractTextPlugin('styles.css');

module.exports = {
  entry: [
    './app/main.jsx', 'webpack-hot-middleware/client?reload=true'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'index_bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        cacheable: true,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPluginConfig.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPluginConfig.extract("style-loader", "css?modules&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader!sass"),
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          // 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    root: path.resolve('./app')
  },
  postcss: [autoprefixer],
  plugins: [HTMLWebpackPluginConfig, ExtractTextPluginConfig, webpackConfig, new webpack.HotModuleReplacementPlugin()]
};