/** 
 * @description  跟 markdown 中 1.3 开启多线程的代码
 *  happypack  插件
 */
const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPoll = HappyPack.ThreadPool({ size: os.cpus().length })
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                // 把js文件处理交给id=happyBabel的HappyPack的实例执行
                use: [{
                    loader: 'happypack/loader?id=happyBabel'
                }]
            }
        ],
        exclude: /node_modules/
    },
    plugins: [
        new HappyPack({
            id: 'happyBabel', // 与loader对应的id标识
            // 用法和loader的配置一样 注意这里是loaders
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ],
                        cacheDirectory: true
                    }
                }
            ]
        })
    ],
    ThreadPool: happyThreadPoll //共享进程池
}


/** 
 * @description  1.4 markdown
 *  webpack-parallel-uglify-plugin 压缩代码 
 */
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
module.exports = {
    // ...省略其他配置
    optimization: {
        minimizer: [
            // new UglifyJsPlugin({ // 压缩js
            //     cache: true,
            //     parallel: true,
            //     sourceMap: true
            // }),
            new ParallelUglifyPlugin({
                cacheDir: './cache/',
                uglifyJS: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true
                    }
                }
            })
        ]
    }
}


/** 
 * @description 1.5  
 *  webpack.dll.config.js
 */

module.exports = {
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./vendor-manifest.json')
      }),
      new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
        {from: 'static', to:'static'}
      ]),
    ]
};

/** 
 * @description 1.6 
 *  自己配置缓存
 */
const path = require('path');
module.exports = {
    module: {
        rules: [
            {
                test: /\.ext$/,
                use: [
                    'cache-loader',
                    ...loaders
                ],
                include: path.resolve(__dirname, 'src')
            }
        ]
    }
}

/**------------------------------------------------------------------- */

/** 
 * @description 2.1
 *  分析压缩后的文件体积
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: 8889
        })
    ]
}
