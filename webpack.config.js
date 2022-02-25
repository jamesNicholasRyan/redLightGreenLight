const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3002,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //    title: 'Development',
  //   }),
  // ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        // query: {
        //   name: 'static/media/[name].[hash:8].[ext]'
        // }
      }
    ],
  },
}
