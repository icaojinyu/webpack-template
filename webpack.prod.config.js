const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'index':'./src/js/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash:5].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true}
          }
        ]
      },
      {
        test: /\.css$/,
        // 从右向左依次执行
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        // 从右向左依次执行
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.styl$/,
        // 从右向左依次执行
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        // 从右向左依次执行
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  optimization: { // 将第三方库单独打包
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    // 多页面时需要写多个new HtmlWebpackPlugin
    new HtmlWebPackPlugin({
      template: './src/index.html',  // 会与根目录下的index.html相关联，把根目录下index的东西都放到生成的HTML中
      filename: 'index.html', // 生成的HTML名，路径为上面output中的path，不写默认为index.html
      favicon:'./static/logo.png',
      hash: true,
      //inject: 'body', //指定链接注入在<head>标签中还是<body>标签中，为false值时表示不自动注入文件中，需要手动设置
      chunks: ['index'],  // 多页面分别引入自己的js
      minify: {
        collapseWhitespace: true, //折叠空白区域 也就是压缩代码
        removeComments: true //移除HTML中的注释
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',// 全局变量
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:5].css',
      chunkFilename: '[name]-[hash:5].css'
    }),
    new CleanWebpackPlugin()
  ]
};
