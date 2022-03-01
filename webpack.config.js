const webpack = require('webpack')

const path = require('path')
const glob = require('glob')

const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

require('dotenv').config()

// this is like setting baseUrl in tsconfig.json to './src'
const alias = glob.sync('./src/*').reduce((a, name) => {
	const paths = name.split('/')
	const pathWithoutExtension = paths[paths.length - 1].split('.')[0]
	a[pathWithoutExtension] = path.join(__dirname, name)
	return a
}, {})

module.exports = {
	entry: './src/index.tsx',
	devtool: 'source-map',
	devServer: {
		port: 3000,
		host: 'localhost',
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		allowedHosts: 'all',
		historyApiFallback: true
	},
	stats: {
		all: false,
		errors: true,
		warnings: true,
		builtAt: true
	},
	resolve: {
		alias,
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: { name: 'img/[hash]-[name].[ext]' }
					}
				],
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.EnvironmentPlugin({ SERVER_URL: process.env.SERVER_URL }),
		new HtmlWebPackPlugin({ template: './src/index.html' }),
		new MiniCssExtractPlugin({ filename: '[name].css' })
	]
}
