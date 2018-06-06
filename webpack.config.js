const Path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ROOT= './';
const APP_FOLDER= Path.resolve(__dirname, ROOT, 'src/view');
const APP_CONTROLLER = Path.resolve(__dirname, ROOT, 'src/controller');
const APP_STYLE_FOLDER = Path.resolve(__dirname, ROOT, 'src/styles');
const APP_ENTRY_FILE = Path.resolve(__dirname, APP_FOLDER, 'client.js');
const BUILD_FOLDER = Path.resolve(__dirname, ROOT, 'dist/public');
const PUBLIC_PATH= '/';
const BUILD_FILE= 'app.js';

var webpackConfig = {
    entry:{
        app: APP_ENTRY_FILE,
        vendor:['react', 'axios', 'lodash', 'react-router', 'prop-types', 'react-dom', 'axios-cache-adapter', 'babel-polyfill']
    },
    output:{
        path: BUILD_FOLDER,
        publicPath: PUBLIC_PATH,
        fileName: BUILD_FILE
    },
    devtool: 'inline-source-map',
    bail: true,
    module:{
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: [APP_FOLDER, APP_CONTROLLER],
                loader: 'bable-loader'
            },
            {test : /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/, loader: 'file-loader?name=[name].[ext]'},
            {
                test:/\.(css|scss)$/,
                use: ExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url:false,
                                minimize: true,
                                sourceMap:true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {test: /\.(svg)$/, loader: 'file-loader'}
        ]
    },
    resolve: {
        extensions:['.js', '.jsx', '.scss', '.css']
    },
    plugins:[
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
        new webpack.optimize.UglifyJsPlugin({test: /(vendor)\.(.js)$/}),
        new ExtractTextPlugin({
            filename: (getPath) => getPath('[name].css'),
            allChunks: true
        })
    ]
};
module.exports = webpackConfig;