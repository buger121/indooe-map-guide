const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: __dirname + '/server.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    node: {
        __dirname: true,
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
        ]
    },

};