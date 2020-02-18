// webpack.config.js
// 入门第一步
// const path = require('path');
// module.exports = {
//     mode: 'development',
//     entry: path.resolve(__dirname, '../src/main.js'), // 入口文件
//     output: {
//         filename: 'output.js', // 打包后的js文件
//         path: path.resolve(__dirname, '../dist') // 打包后的目录
//     }
// }

// copy 腹写代码
// const path  = require('path');
// module.exports = {
//     mode: 'development',
//     entry: path.resolve(__dirname, '../src/main.js'),
//     output: {
//         filename: 'output.js',
//         path: path.resolve(__dirname, '../dist')
//     }
// }


/*------------------------------------------------------------------------------------*/
// 入门 第二步
// 生成的随机js自动载入的html中，使用html-webpack-plugin,也一块打包到dist目录
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
//     mode: 'development', // 开发模式
//     entry: path.resolve(__dirname, '../src/main.js'),
//     output: {
//         filename: '[name].[hash:8].js', // 打包后的文件名称
//         path: path.resolve(__dirname, '../dist')
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html')
//         })
//     ]
// }

// copy 代码
// path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
//     mode: 'development',
//     entry: path.resolve(__dirname, '../src/main.js'),
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html')
//         })
//     ]
// }


/* --------------------------------------------------------------------------- */

// 入门 第三步 --多文件入口
// 多文件入口配置多文件的html,在每个HTML中要chunks对应的入口文件名称，引入对应的js文件
// path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
//     mode: 'development',
//     entry: {
//         main: path.resolve(__dirname, '../src/main.js'),
//         header: path.resolve(__dirname, '../src/header.js')
//     },
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html',
//             chunks: ['main'] // 与入口文件对应的模块名
//         }),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/header.html'),
//             filename: 'header.html',
//             chunks: ['header'] // 与入口文件对应的模块名
//         })
//     ]
// }

// copy 代码
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
//     mode: 'development',
//     entry: {
//         header: path.resolve(__dirname, '../src/header.js'),
//         main: path.resolve(__dirname, '../src/main.js')
//     },
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/header.html'),
//             filename: 'header.html',
//             chunks: ['header']
//         }),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html',
//             chunks: '[main]'
//         })
//     ]
// }

/* --------------------------------------------------------------------------------- */

// 入门 第四步 
/**
 * 每次执行npm run build 会发现dist文件夹里会残留上次打包的文件
 * clean-webpack-plugin插件
 * 帮我们在打包输出前清空文件夹clean-webpack-plugin
 */
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// module.exports = {
//     mode: 'development',
//     entry: {
//         header: path.resolve(__dirname, '../src/header.js'),
//         main: path.resolve(__dirname, '../src/main.js')
//     },
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/header.html'),
//             filename: 'header.html',
//             chunks: ['header']
//         }),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html',
//             chunks: '[main]'
//         }),
//         new CleanWebpackPlugin()
//     ]
// }

/* ---------------------------------------------------------------------------------- */

// 入门 第5步 --引用css 
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// module.exports = {
//     mode: 'development',
//     entry: {
//         main: path.resolve(__dirname, '../src/main.js')
//     },
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html',
//             chunks: '[main]'
//         }),
//         new CleanWebpackPlugin()
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader'] // 从右向左解析原则
//             },
//             {
//                 test: /\.less$/,
//                 use: ['style-loader','css-loader','less-loader'] //从右向左解析原则
//             }
//         ]
//     }
// }
// ok, 打开浏览器显示head中style样式

/*-------------------------------------------------------------------------------------------------------------------------*/


// 入门 第6步 --css添加浏览器前缀

/**
 * 引入autoprefixer使其生效,这里有两种方式
 * 1，在项目根目录下创建一个postcss.config.js文件
 * 2.直接在webpack.config.js里配置
 */
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// module.exports = {
//     mode: 'development',
//     entry: {
//         main: path.resolve(__dirname, '../src/main.js')
//     },
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html',
//             chunks: '[main]'
//         }),
//         new CleanWebpackPlugin()
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader'] // 从右向左解析原则
//             },
//             {
//                 test: /\.less$/,
//                 use: ['style-loader','css-loader',{
//                     loader: 'postcss-loader', // 第2种方式
//                     options: {
//                         plugins: [require('autoprefixer')]
//                     }
//                 },'less-loader'] //从右向左解析原则
//             }
//         ]
//     }
// }

/*-------------------------------------------------------------------------------------------------------------------------*/

//  入门 第7步 --css拆分

/**
 * @description css通过style标签的方式添加到了html文件中，但是如果样式文件很多，全部添加到html中，难免显得混乱。
 *  我们想用把css拆分出来用外链的形式引入css文件,该实例是把less抽出来引用样式表
 *  mini-css-extract-plugin会将所有的css样式合并为一个css文件。
 */
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// module.exports = {
//     mode: 'development',
//     entry: {
//         main: path.resolve(__dirname, '../src/main.js')
//     },
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader'] // 从右向左解析原则
//             },
//             {
//                 test: /\.less$/,
//                 use: [
//                     MiniCssExtractPlugin.loader,
//                     'css-loader',
//                     'less-loader'
//                 ]
//             }
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html',
//             chunks: '[main]'
//         }),
//         new CleanWebpackPlugin(),
//         new MiniCssExtractPlugin({
//             filename: '[name].[hash].css',
//             chunkFilename: '[id].css'
//         })
//     ]
// }



/*-------------------------------------------------------------------------------------------------------------------------*/

//  入门 第8步 --拆分多个css
/** 
 * @description 如果你想拆分为一一对应的多个css文件,我们需要使用到extract-text-webpack-plugin，
 *  我们需要安装@next版本的extract-text-webpack-plugin
 *  index.css || index.less  分别打包成2个单独的文件，但是index.html只单独引入.css文件
 */

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// let indexLess = new ExtractTextWebpackPlugin('index.less');
// let indexCss = new ExtractTextWebpackPlugin('index.css');
// module.exports = {
//     mode: 'development',
//     entry: {
//         main: path.resolve(__dirname, '../src/main.js')
//     },
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     module: {
//         rules: [
//             {
//                 test:/\.css$/,
//                 use: indexCss.extract({
//                   use: ['css-loader']
//                 })
//             },
//             {
//                 test:/\.less$/,
//                 use: indexLess.extract({
//                   use: ['css-loader','less-loader']
//                 })
//             }
//         ]
//     },
//     plugins: [
//         new CleanWebpackPlugin(),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html',
//             chunks: '[main]'
//         }),
//         indexLess,
//         indexCss
//     ]
// }


/*-------------------------------------------------------------------------------------------------------------------------*/

//  入门 第9步 --打包 图片、字体、媒体、等文件

/** 
 * @description file-loader就是将文件在进行一些处理后（主要是处理文件名和路径、解析文件url），并将文件移动到输出的目录中
 *  url-loader 一般与file-loader搭配使用，功能与 file-loader 类似，如果文件小于限制的大小,则会返回 base64 编码，
 *  否则使用 file-loader 将文件移动到输出的目录中
 * 
 *  使用： 在main.js中加入图片，媒体， 字体
 */

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// let indexLess = new ExtractTextWebpackPlugin('index.less');
// let indexCss = new ExtractTextWebpackPlugin('index.css');
// module.exports = {
//     mode: 'development',
//     entry: {
//         main: path.resolve(__dirname, '../src/main.js')
//     },
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     module: {
//         rules: [
//             {
//                 test:/\.css$/,
//                 use: indexCss.extract({
//                     use: ['css-loader']
//                 })
//             },
//             {
//                 test:/\.less$/,
//                 use: indexLess.extract({
//                     use: ['css-loader','less-loader']
//                 })
//             },
//             {
//                 test: /\.(jpe?g|png|gif)$/i, // 图片文件
//                 use: [
//                     {
//                         loader: 'url-loader',
//                         options: {
//                             limit: 10240,
//                             fallback: {
//                                 loader: 'file-loader',
//                                 options: {
//                                     name: 'img/[name].[hash:8].[ext]'
//                                 }
//                             }
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体文件
//                 use: [
//                     {
//                         loader: 'url-loader',
//                         options: {
//                             limit: 10240,
//                             fallback: {
//                                 loader: 'file-loader',
//                                 options: {
//                                     name: 'media/[name].[hash:8].[ext]'
//                                 }
//                             }
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
//                 use: [
//                     {
//                         loader: 'url-loader',
//                         options: {
//                             limit: 10204,
//                             fallback: {
//                                 loader: 'file-loader',
//                                 options: {
//                                     name: 'fonts/[name].[hash:8].[ext]'
//                                 }
//                             }
//                         }
//                     }
//                 ]
//             }
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html',
//             chunks: '[main]'
//         }),
//         new CleanWebpackPlugin(),
//         indexLess,
//         indexCss
//     ]
// }

/*-------------------------------------------------------------------------------------------------------------------------*/

//  入门 第10步 --用babel转义js文件

/** 
 * @description  babel-loader只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换
 *  (promise、Generator、Set、Maps、Proxy等)
 *  此时我们需要借助babel-polyfill来帮助我们转换
 * 
 *  注意 babel-loader与babel-core的版本对应关系
 *  babel-loader 8.x 对应babel-core 7.x
 *  babel-loader 7.x 对应babel-core 6.x
 */

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// module.exports = {
//     mode: 'development',
//     entry: {
//         main: path.resolve(__dirname, '../src/main.js')
//     },
//     // 如果存在新api的实例对象类型，使用babel-polyfill
//     // entry: ["@babel/polyfill",path.resolve(__dirname,'../src/index.js')],    // 入口文件
//     output: {
//         filename: '[name].[hash:8].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env']
//                     }
//                 },
//                 exclude: /node_modules/
//             },
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html',
//             chunks: '[main]'
//         }),
//         new CleanWebpackPlugin(),
//     ]
// }


// this test demo is over;