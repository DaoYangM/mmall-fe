var webpack = require('webpack')
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function (name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
}

config = {
    mode: 'development',
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'result': ['./src/page/result/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-password-update': ['./src/page/user-password-update/index.js']
    },
    output: {
        path: 'D:\\Code\\FE\\mmall-fe\\mmall-fe\\dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    // devServer: {
    //     // contentBase: "./dist/view",
    //     historyApiFallback: true,
    //     inline: true,
    //     hot: true,
    //     port: 8088
    // },
    devServer: {
        proxy: {
            '/products': {
                target: 'http://localhost:8080', secure: false
            },
            '/users': {
                target: 'http://localhost:8080', secure: false
            },
        }
    },

    externals: {
        'jquery': 'window.jQuery'
    },
    plugins: [
        new webpack.optimize.RuntimeChunkPlugin({
            name: 'common',
        }),

        new Ex("css/[name].css"),

        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('result')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update')),
        new HtmlWebpackPlugin(getHtmlConfig('user-password-update'))
    ],

    resolve: {
        alias: {
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image',
            node_modules: __dirname + '/node_modules'
        }
    },
    module: {

        rules: [
            {
                test: /\.css$/,
                use: Ex.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },

            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                use: ["url-loader?limit=100&name=resource/[name].[ext]"]
            },
            {
                test: /\.string$/,
                use: "html-loader"
            }
        ]
    }
}

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;