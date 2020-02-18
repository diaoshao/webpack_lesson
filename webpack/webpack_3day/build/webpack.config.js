/**
 * 解析.vue文件
 */

// const path = require('path');
// const vueLoaderPlugin = require('vue-loader/lib/plugin');
// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.vue$/,
//                 use: ['vue-loader']
//             }
//         ]
//     },
//     resolve: {
//         alias: {
//             'vue$': 'vue/dist/vue.runtime.esm.js',
//             '@': path.resolve(__dirname, '../src')
//         },
//         extensions: ['*','.js','.json','.vue']
//     },
//     plugins: [
//         new vueLoaderPlugin()
//     ]
// }





/** 
 * 配置webpack-dev-server进行热更新 
 */
// const Webpack = require('webpack');
// module.exports = {
//     mode: 'development',
//     devServer: {
//         port: 3000,
//         hot: true,
//         contentBase: '../dist'
//     },
//     plugins: [
//         new Webpack.HotModuleReplacementPlugin()
//     ]
// }

/** 
 * 初期 vue的webpack.config.js 文件
 */
// const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// const vueLoaderPlugin = require('vue-loader/lib/plugin');
// const Webpack = require('webpack');
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
//                 test: /\.vue$/,
//                 use: ['vue-loader']
//             },
//             {
//                 test: /\.js$/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: [
//                             ['@babel/preset-env']
//                         ]
//                     }
//                 }
//             },
//             {
//                 test: /\.css$/,
//                 use: ['vue-style-loader', 'css-loader', {
//                     loader: 'postcss-loader',
//                     options: {
//                         plugins: [require('autoprefixer')]
//                     }
//                 }]
//             },
//             {
//                 test: /\.less$/,
//                 use: ['vue-style-loader', 'css-loader', {
//                     loader: 'postcss-loader',
//                     options: {
//                         plugins: [require('autoprefixer')]
//                     }
//                 }, 'less-loader']
//             }
//         ]
//     },
//     resolve: {
//         alias: {
//             'vue$': 'vue/dist/vue.runtime.esm.js',
//             '@': path.resolve(__dirname, '../src')
//         },
//         extensions: ['*','.js','.json','.vue']
//     },
//     devServer: {
//         port: 3000,
//         hot: true,
//         contentBase: '../dist'
//     },
//     plugins: [
//         new CleanWebpackPlugin(),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html'
//         }),
//         new vueLoaderPlugin(),
//         new Webpack.HotModuleReplacementPlugin()
//     ]
// }





/** 
 * 实际应用到项目中，我们需要区分开发环境与生产环境，我们在原来webpack.config.js的基础上再 新增 两个文件 
 * 
 *  webpack.dev.js 开发环境配置文件  【开发环境主要实现的是热更新,不要压缩代码，完整的sourceMap】
 *  webpack.prod.js 生产环境配置文件  【生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码】
 *  npm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
 *  
 *  webpack-merge 合并配置
 *  copy-webpack-plugin 拷贝静态资源
 *  optimize-css-assets-webpack-plugin 压缩css
 *  uglifyjs-webpack-plugin 压缩js
 * 
 *  webpack mode设置production的时候会自动压缩js代码。原则上不需要引入uglifyjs-webpack-plugin进行重复工作。
 *  但是optimize-css-assets-webpack-plugin压缩css的同时会破坏原有的js压缩，所以这里我们引入uglifyjs进行压缩
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.argv.indexOf('--mode=production') === -1;
module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'label-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../dist/css',
                        hmr: devMode
                    }
                }, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../dist/css',
                        hmr: devMode
                    }
                }, 'css-loader', 'less-loader', {
                    loader:'postcss-loader',
                    options:{
                      plugins:[require('autoprefixer')]
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: {
                    loader: 'url-laoder',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            },
            {
                test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new vueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].js' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        })
    ]
}