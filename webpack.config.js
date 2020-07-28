const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})

module.exports = {
  entry: { 
    main: './src/js/index.js',
    about: './src/js/about.js',
    analysis: './src/js/analysis.js' 
},                                           // точки входа
  output: {
    path: path.resolve(__dirname, 'dist'),   // точки выхода
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
                'file-loader?name=images/[name].[ext]',
                {
                        loader: 'image-webpack-loader',
                        options: {
                            name: '[name].[ext]',
                            esModule: false
                        }
                },
        ]
      },
      {
        test: /\.css$/i,
        use: [
                (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                    'css-loader', 
                    'postcss-loader'
            ]
      },
      {
        test: /\.css$/i,
        loader: 'postcss-loader',
        options: {                              // сюда
            plugins: [
                    autoprefixer({
                        cascade: false
                    })
                ],
                sourceMap: true
            }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      chunks: ['main'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
        inject: false,
        template: './src/about.html',
        chunks: ['about'],
        filename: 'about.html'
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/analysis.html',
        chunks: ['analysis'],
        filename: 'analysis.html'
      }),
    new WebpackMd5Hash(),
    new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
    })
  ]
};