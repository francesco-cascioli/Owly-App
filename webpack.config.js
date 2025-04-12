const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL || 'https://openlibrary.org'),
    }),
  ],
  mode: 'development',
};
