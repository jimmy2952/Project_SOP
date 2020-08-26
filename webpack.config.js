const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[hash].js'
  }, 
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],

  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
          test: /\.css$/i,
          use: ['MiniCssExtractPlugin.loader', 'css-loader']
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['MiniCssExtractPlugin.loader', 'css-loader', 'sass-loader']
        }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
          terserOptions: {
              output: {
                  comments: false
              }
          },
          extractComments: false
      })
    ]
  }


};
