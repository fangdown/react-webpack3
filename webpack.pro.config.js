var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * 遗留问题
 * 1，自动删除dist目录下文件
 * 2，输出文件带hash值（依赖1）
 */
module.exports = {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(), // 将所有模块包装在一个闭包中
    new webpack.optimize.UglifyJsPlugin({minimize: true}), // js文件压缩
    new HtmlWebpackPlugin({ // 将模板生成html
      title: 'webpack-react-demo',
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({ // 接收字符串到代码中
      "process.env": {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  entry: {
    app: path.resolve(__dirname, './src/app.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {test: /\.less/, use: ['style', 'css', 'less']},
      {test: /\.css$/, use: ['style', 'css']},
      {test: /\.(png|jpg|jpeg)$/, use: ['url']},
      {test: /\.js$/,
        exclude: /node_modules|bower_components/,
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
  }
}