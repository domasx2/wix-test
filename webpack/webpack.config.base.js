import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import path from 'path'

export default {
    entry: [
        path.join(__dirname, '..', 'frontend/src/index.js')
    ],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '..', 'frontend/dist'),
        publicPath: '/static/',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel!eslint',
            },
            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.styl$/,
                loader: 'style!css!postcss!stylus'
            },
            {
                test: /\.(mp4|webm|mp3|ogg|wav|jpeg|jpg|bmp|ico|png|gif|ttf|otf|woff|eot)$/,
                loader: 'file?name=[path][name].[ext]?[hash]'
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    target: 'web',
    plugins: []
};