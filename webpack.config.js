const path = require('path')
const webpack = require('webpack') // 配置热更新的第二步
// 导入到内存中 生成HTML页面的的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.join(__dirname, './src/main.js'), // 入口，表示要使用webpack打包哪一个文件
    output: { // 输出文件的配置
        path: path.join(__dirname, './dist'), // 指定打包好的文件输出到哪一个文件中去
        filename: 'boundle.js' // 输出文件的名称
    },
    // 除了在package.js中设置还可以在这里
    devServer: { // 配置热更新的第一步
        open: true,
        // host: '169.254.31.123',
        // port: 3000,
        contentBase: 'src',
        hot: true
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin() //配置热更新的第三步
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: 'url-loader'
            }, // image
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            }, //font
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    resolve: { // 由于使用 const vue = import 'vue' 功能不完整，因此需要在这里重新配置一个包给它
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}