const _                 = require('lodash');
const autoprefixer      = require('autoprefixer');
const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

const ExtractTextPluginConfig = new ExtractTextPlugin('styles.css');

const useProductionBuild = _.includes(['production', 'development'], process.env.NODE_ENV);

const webpackConfig = {
  entry: [
    './app/main.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'index_bundle.js'
  },
  devtool: 'source-map',  module: {
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
        loader: ExtractTextPluginConfig.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPluginConfig.extract('style-loader', 'css?modules&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader!sass'),
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    root: path.resolve('./app')
  },
  postcss: [autoprefixer({browsers: ['> 1%', 'last 5 versions', 'Firefox ESR', 'safari >= 4']})],
  plugins: [HTMLWebpackPluginConfig, ExtractTextPluginConfig, new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/])]
};

if (useProductionBuild) {
  console.log('useProductionBuild --> ', useProductionBuild);
  webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: {
      warnings: false,
      drop_console: false
    }
  }));
  webpackConfig.plugins.push(new webpack.DefinePlugin({ // This will make it so that webpack will use minified production files from some libraries (like React)
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));

  webpackConfig.devtool = 'cheap-source-map';

  webpackConfig.output = {
    path: __dirname + '/server/public',
    publicPath: '/',
    filename: 'index_bundle.js'
  };
} else {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackConfig.entry.unshift('webpack-hot-middleware/client?reload=true');
}

module.exports = webpackConfig;
