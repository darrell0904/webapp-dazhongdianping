var pkg = require('./package.json')
var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var precss = require('precss');
var autoprefixer = require('autoprefixer');
var rucksackCss = require('rucksack-css');


module.exports = {
  entry:{ 
    index:'./src/js/main.js',
    vendor: Object.keys(pkg.dependencies)
  },

  output:{
    path: `${__dirname}/dist`,
      filename: 'js/bundle.js',
  },

  resolveLoader:{
    moduleExtensions: ['-loader'],
  },
    //使用loader是后缀名不加loader

  module: {
      rules: [
        {
          test: /\.js$/,
          loaders: ['babel'],
          exclude: /node_modules/
        },

        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src/js'),
          use: ExtractTextPlugin.extract({
              fallback: "style",
              use: "css?modules&sourceMap=false&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss?parser=postcss-scss"
          })
          // use: [
          //   'style',
          //   'css?modules&sourceMap=false&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          //   'postcss?parser=postcss-scss'
          //   //sourseMap=false. ===>>>在css中才能用url引入图片
          // ]
        },
        // 组件样式，需要私有化，单独配置,配置css_modules.
      {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src/js'),
          loader: 'style!css!postcss'
        },

        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src/styles'),
          loader: ExtractTextPlugin.extract({
              fallback: "style",
              use: "css!postcss?parser=postcss-scss"
          })
          // loader: ExtractTextPlugin.extract('style!css!postcss?parser=postcss-scss')
        },
      // 公有样式，不需要私有化，单独配置

      {
          test: /\.css$/,
          include: path.resolve(__dirname, 'node_modules'),
          loader: ExtractTextPlugin.extract({
            fallback: "style",
            use: "css!postcss"
          }),
          // loader: ExtractTextPlugin.extract('css!postcss')

        },
        
      {
          test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
          loader: 'url?limit=10000&name=font/[name][hash:8].[ext]'
        },
        
        {
          test: /\.(gif|jpg|png|ico)$/,
          loader: 'url?limit=10000&name=img/[name][hash:8].[ext]'
        },
      ]
  },

  plugins: [

    new webpack.optimize.OccurrenceOrderPlugin(),
    // webapck 会给编译好的代码片段一个id用来区分
    // 而这个插件会让webpack在id分配上优化并保持一致性。
    // 具体是的优化是：webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块

    // webpack 内置的 banner-plugin
    new webpack.BannerPlugin("Copyright by fujiawei1994@github.com."),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
          title: '生产环境',
          filename:'index.html',
          // inject: 'body'
    }),
    
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          //supresses warnings, usually from module minification
          warnings: false
        }
    }),

    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    }),

    // 分离CSS和JS文件
    new ExtractTextPlugin('/css/[name].css'),
    
    
    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '/js/[name].js'
    }),
  ]


}