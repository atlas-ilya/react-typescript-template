'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const appConfig = require('./config/config');
const buildInfo = require('./config/buildInfo');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

buildInfo();

const APP_DIR = path.join(__dirname, 'src');
const NODE_MODULES = path.join(__dirname, 'node_modules');

let isDevelopment = true;
let target = 'web';

if (process.env.NODE_ENV === 'production') {
    isDevelopment = false;
    target = 'browserslist';
}


function getParserRules() {
    return [
        {
            test: /\.(s[ac]|c)ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
            include: APP_DIR,
            exclude: NODE_MODULES,
        },
        {
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            },
            include: APP_DIR,
            exclude: NODE_MODULES,
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            include: APP_DIR,
            exclude: NODE_MODULES,
        },
        {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
            use: 'url-loader?limit=10000&name=[name]-[hash].[ext]',
            include: APP_DIR,
            exclude: NODE_MODULES,
        },
        {
            test: /\.ico$/,
            use: 'file-loader?name=[name].[ext]',
            exclude: NODE_MODULES,
        },
        {
            test: /\.(html)$/,
            use: ['html-loader']
        },
        {
            test: /\.json$/,
            use: 'json-loader',
            include: APP_DIR,
            exclude: NODE_MODULES,
        },
    ]
}

function getCodeSplittingConfig() {
    return {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                },
            },
        },
        runtimeChunk: {
            name: 'manifest',
        },
        minimizer: [
            new UglifyJsPlugin(),
            new TerserPlugin({
                terserOptions: {
                    ecma: 8,
                    mangle: false,
                    keep_classnames: true,
                    keep_fnames: true,
                },
            }),
        ],
    };
}

function getPlugins() {
    let plugins =  [
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: './index.html',
            favicon: './public/favicon.ico',
            inject: 'body',
        }),

        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false }
        }),
        /**
         * Pass NODE_ENV and APP_CONFIG to the application so that
         * "ConfigService" and "NodeService" can be used within TS/TSX files.
         */
         new webpack.DefinePlugin({
             'process.env': {
                 NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                 APP_CONFIG: JSON.stringify(appConfig),
             },
         }),
    ];

    if (process.env.SERVE) {
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isDevelopment) {

        /**
         * Add additional plugin based on NODE_ENV === 'development'
         */

    } else {


    }

    return plugins;
}


const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

function getDevServerConfig() {
    return {
        client: {
            webSocketURL: {
                pathname: sockPath,
                port: sockPort,
            },
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
        },
        compress: true,
        open: true,
        https: appConfig.example.https,
        port: process.env.WDS_SOCKET_PORT,
        static: './dist',
        hot: true,

    };
}


const webpackConfig = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'scss'],
        alias: {
            '@': path.resolve(APP_DIR),
            '@api': path.resolve(APP_DIR, 'api/'),
            '@assets': path.resolve(APP_DIR, 'assets/'),
            '@images': path.resolve(APP_DIR, 'assets/images'),
            '@components': path.resolve(APP_DIR, 'components/'),
            '@hooks': path.resolve(APP_DIR, 'hooks/'),
            '@services': path.resolve(APP_DIR, 'services/'),
            '@store': path.resolve(APP_DIR, 'store/'),
            '@ui': path.resolve(APP_DIR, 'ui/'),
        },
    },

    optimization: getCodeSplittingConfig(),
    plugins: getPlugins(),

    module: {
        rules: getParserRules(),
    },


    mode: isDevelopment ? "development" : "production",
    target: target,

    devtool: 'source-map',
    entry: './src/index',

    devServer: getDevServerConfig(),
};


module.exports = webpackConfig;
