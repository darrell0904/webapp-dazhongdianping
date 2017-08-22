const path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');



var precss = require('precss');
var autoprefixer = require('autoprefixer');
var rucksackCss = require('rucksack-css');


module.exports = {

	devtool: 'cheap-module-eval-source-map', 

	entry:[ 'babel-polyfill','react-hot-loader/patch','./src/js/main.js'],
	//'babel-polyfill':Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy
	//、Reflect、Symbol、Promise等全局对象，需要使用babel-polyfill
	
	//'react-hot-loader/patch':中间这行是react-hot-loader的配置，在入口处先加上react-hot-loader/patch。

	output:{
		path: `${__dirname}/dist`,
    	filename: 'js/bundle.js',
    	publicPath: '/',
    	devtoolModuleFilenameTemplate: '[resource-path]'
	},

	plugins:[
		new HtmlWebpackPlugin({
			template: 'src/index.html',
        	title: '开发模式',
        	filename:'index.html',
        	// inject: 'body'
		}),
		//生成自动生成html的插件

    	new webpack.HotModuleReplacementPlugin(),

    	// 打开浏览器
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        }),

    	new webpack.NoEmitOnErrorsPlugin(),
    	//编译过程中出现错误还能继续运行的插件
		
		// 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        }),

    	new webpack.NamedModulesPlugin(),
    	//react-router中对模块名的引用（针对问题： Consider using the NamedModulesPlugin for module names.）

		new webpack.LoaderOptionsPlugin({
			options: {
			    context: __dirname,
				postcss: [
					precss,
		            autoprefixer,
		            rucksackCss
		        ],
			}
		}),
		//webpack2.0新配置postcss的各种插件[precss,autoprefixer,rucksackCss]，与 webpack1.0有区别,(以下为webpack1.0的配置)
		//postcss: ()=> [precss,autoprefixer,rucksackCss,px2rem(px2remOpts)]
	],

	resolve: {
	    // extensions: ['.js', 'jsx'],
	    modules: ['node_modules', path.join(__dirname, '../node_modules')],//antd_mobile & webpack2.0
	    extensions: ['.web.js', '.js', '.json'],//antd_mobile

	    // 路径别名, 懒癌福音
	    alias:{
				app:path.resolve(__dirname,'src/js'),
				// 以前你可能这样引用 import { Nav } from '../../components'
				// 现在你可以这样引用 import { Nav } from 'app/components'

				style:path.resolve(__dirname,'src/styles'),
				// style:path.resolve(__dirname,'img'),

				// 以前你可能这样引用 import "../../../styles/mixins.scss"
				// 现在你可以这样引用 import "style/mixins.scss"

				// 注意：别名只能在.js文件中使用。
	    }
	},

	resolveLoader:{
		moduleExtensions: ['-loader'],
	},
    //使用loader是后缀名不加loader


	module: {
	    rules: [
	      {
	        test: /\.(js|jsx)$/,
	        loaders: ['babel'],
	        exclude: /node_modules/
	      },

	      {
	        test: /\.scss$/,
	        include: path.resolve(__dirname, 'src/js'),
	        use: [
	          'style',
	          'css?modules&sourceMap=false&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
	          'postcss?parser=postcss-scss'
	          //sourseMap=false. ===>>>在css中才能用url引入图片
	        ]
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
	        loader: 'style!css!postcss?parser=postcss-scss'
	      },
		  // 公有样式，不需要私有化，单独配置

		  {
	        test: /\.css$/,
	        include: path.resolve(__dirname, 'node_modules'),
	        loader: 'style!css!postcss'
	      },

          { 
          	test: /\.less$/, 
          	exclude: /node_modules/, 
          	loader: 'style!css!postcss!less' 
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
	
	devServer: {
    	proxy: {
    	    // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
            // koa 代码在 ./mock 目录中，启动命令为 npm run mock
	        '/api/*': {
	          target: 'http://localhost:3000',
	          host: 'localhost:3000',
	          changeOrigin: true
	        }
        },
        contentBase: "./public", //本地服务器所加载的页面所在的目录
		hot:true,
		hotOnly:true,
    	historyApiFallback: true,
	}
}