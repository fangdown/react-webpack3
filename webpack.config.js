var webpack = require('webpack');
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),// 将所有模块包装在一个闭包中
    new webpack.LoaderOptionsPlugin({minimize:true}), // 兼容旧loader
    new HtmlWebpackPlugin({ // 将模板生成html
      title: 'webpack-react-demo',
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
  ],
  entry: {
    main: path.resolve(__dirname, './src/app.js')
  },
  output: {
    path: path.resolve(__dirname, './dev'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test:/\.less/, use: ['style', 'css', 'less']},
      {test: /\.css$/, use: ['style', 'css']},
      {test: /\.(png|jpg|jpeg)$/, use: ['url']},
      {test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.less', '.jsonp']
  },
  devServer: {
    inline: true,
    port: 3000
  }
}