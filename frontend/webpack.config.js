const fs = require('fs');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin, DefinePlugin } = require('webpack');

if (fs.existsSync('.env'))
	require('dotenv').config();

let environmentVars = {};

for (const key in process.env) {
	if (typeof key === 'string' && key.startsWith('REACT_APP_')) {
		environmentVars[`process.env.${key}`] = JSON.stringify(process.env[key]);
	}
}

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
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.woff2?$/,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new DefinePlugin(environmentVars),
		new ProvidePlugin({
			React: 'react'
		}),
		new HTMLWebpackPlugin({
			template: path.join(__dirname, 'app', 'index.html'),
			favicon: path.join(__dirname, 'app', 'favicon.ico')
		})
	]
};