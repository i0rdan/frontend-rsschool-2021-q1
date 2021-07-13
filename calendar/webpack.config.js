const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    hot: true,
    port: 8080,
    contentBase: path.join(__dirname, 'public')
  }
};


module.exports = ({develop}) =>( {
  mode: develop ? 'development' : 'production',
  devtool: develop ? 'inline-source-map' : false,
  
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
      rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          }
      ]
  },
  resolve: {
      extensions: ['.js']
  },
  plugins: [
      new HtmlWebpackPlugin({
       title: 'task-13',
       template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
       new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
       }),
       new CopyPlugin({
        patterns: [
            { from: './src/assets', to: './assets'}
        ]
    }),
  ],
  ...devServer(develop),
});