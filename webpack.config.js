var webpack = require('webpack')
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name) {
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
        'login': ['./src/page/login/index.js']},
    output: {
        path: 'D:\\Code\\FE\\mmall-fe\\mmall-fe\\dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    plugins: [
        new webpack.optimize.RuntimeChunkPlugin({
            name: 'common',
        }),

        new Ex("css/[name].css"),

        new HtmlWebpackPlugin(getHtmlConfig('index'))
    ],
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
                test:  /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                use: ["url-loader?limit=100&name=resource/[name].[ext]" ] 
            }
        ]
    } 
} 

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;