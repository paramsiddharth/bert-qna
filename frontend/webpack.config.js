const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');

module.exports = {
	mode: 'production',
	entry: [
		"babel-polyfill",
		path.join(__dirname, 'app', 'index.js')
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',	
			},
			{
				test: /\.css$/,
				use: 'babel-loader',	
			}
		]
	},
	plugins: [
		new ProvidePlugin({
			React: 'react'
		}),
		new HTMLWebpackPlugin({
			template: path.join(__dirname, 'app', 'index.html')
		})
	]
};