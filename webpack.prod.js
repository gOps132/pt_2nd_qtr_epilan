/*
 *	Created By gOps132
 *	12/29/2020 12:35PM
 *
 *  TODO:
 *      DO AS MUCH AS YOU CAN TO MAKE THE WEBSITE FASTER!
 *  [ ] Minify the css
 *  [ ] Implement caching
 */


const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'), 
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
				{
					test: /\.css$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},
			],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new OptimizeCssAssetsPlugin(),
		new TerserPlugin(),
		new HtmlWebpackPlugin({
            template: './src/index.html',
			filename: 'index.html',
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			}
        }),
		new MiniCssExtractPlugin({
			filename: "[hash].css",
			chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(),
	],
	// optimization: {
	// 	runtimeChunk: 'single',
	// },
});