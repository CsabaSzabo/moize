'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve(__dirname, '..');
const PORT = 3000;

module.exports = {
    cache: true,

    devServer: {
        host: 'localhost',
        port: PORT,
    },

    devtool: 'source-map',

    entry: [path.resolve(ROOT, 'DEV_ONLY', 'index.ts')],

    mode: 'development',

    module: {
        rules: [
            {
                enforce: 'pre',
                include: [path.resolve(ROOT, 'src')],
                loader: 'eslint-loader',
                options: {
                    configFile: '.eslintrc',
                    failOnError: true,
                    failOnWarning: false,
                    fix: true,
                    formatter: require('eslint-friendly-formatter'),
                },
                test: /\.(js|ts)$/,
            },
            {
                include: [
                    path.resolve(ROOT, 'src'),
                    path.resolve(ROOT, 'DEV_ONLY'),
                ],
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    plugins: ['@babel/plugin-proposal-class-properties'],
                    presets: ['@babel/preset-react'],
                },
                test: /\.(js|ts|tsx)$/,
            },
        ],
    },

    output: {
        filename: 'moize.js',
        library: 'moize',
        libraryTarget: 'umd',
        path: path.resolve(ROOT, 'dist'),
        publicPath: `http://localhost:${PORT}/`,
        umdNamedDefine: true,
    },

    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new HtmlWebpackPlugin(),
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
