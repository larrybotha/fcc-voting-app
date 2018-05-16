const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: [`${__dirname}/src/assets/js/index.js`],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    // required for historyFl=allback to work for requests at subpaths of /
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
    // if --hot is not passed as a flag to webpack-dev-server on CLI we need to
    // explicitly add it here
    // if this and --hot are set, then we get a maximum stack size exceeded error
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    // required for historyFl=allback to work for requests at subpaths of /
    historyApiFallback: true,
    // don't reload if HMR fails. hot: true will reload if HMR fails
    // useful for configuring client
    hotOnly: true,
    // can be set here or on CLI using --open
    // open: true,
    // contentBase: path.resolve(__dirname, 'dist'),
    stats: {
      colors: true,
      modules: false,
    },
  },
};
