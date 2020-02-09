const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use:['html-loader']
            },
            {
                test: /\.js#/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: 'assets/images/[name].[ext]'
                    }
                  },
                  {
                    loader:'image-webpack-loader',
                    options:{
                       mozpng:{
                            progressive:true,
                            quality:75
                        }
                    }
                 }
                ]
              },
            {
                  test: /\.(woff(2)?|ttf|eot|svg|woff|otf)(\?v=\d+\.\d+\.\d+)?$/,
                  loader: 'file-loader',
                 options: {
                  name: 'assets/fonts/[name].[ext]'
                }
            },
        ]

    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ]
};