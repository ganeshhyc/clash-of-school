const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/game.js', // Entry point for JS

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Handle image files
        type: 'asset/resource', // Tells Webpack to treat this as a file and move it
        generator: {
          filename: 'assets/characters/[name][ext][query]', // Images will be saved here
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Template for index.html
    }),
  ],

  mode: 'development', // Development mode
  devtool: 'source-map', // For better debugging

  devServer: {
    static: path.join(__dirname, 'dist'), // Updated option to serve static files
    compress: true,
    port: 9000,
    open: true, // Opens the browser automatically
  },
};
