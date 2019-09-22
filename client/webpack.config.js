const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        map1: path.join(__dirname, 'src/map1/map1.js'),
        map2: path.join(__dirname, 'src/map2/map2.js')
    },
    output: {
        publicPath: '/build/',
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
     },
    target: 'node',         //in order to ignore built-in modules like path,fs, etc
    externals: [nodeExternals()],       //in order to ignore all modules in node_modules files
    mode: 'development',
    devtool: 'eval-source-map',
    watch: true,
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'map1.html',
            chunks:['map1'],
            template: path.join(__dirname , './index.html')
        }),
        new HtmlWebpackPlugin({
            filename: 'map2.html',
            chunks:['map2'],
            template: path.join(__dirname , './index.html')
        })
    ]

};