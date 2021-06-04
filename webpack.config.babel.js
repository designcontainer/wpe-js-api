import path from 'path';

const resolve = (file) => path.resolve(__dirname, file);
const isProd = process.argv.indexOf('-p') !== -1;

const config = {
	mode: isProd ? 'production' : 'development',

	entry: resolve('src/index.js'),

	output: {
		filename: 'bundle.js',
		libraryTarget: 'commonjs',
		library: 'dc-wpe-js-api',

		// used to prevent window object in resulting library code
		// https://github.com/webpack/webpack/issues/6525
		globalObject: 'this',
	},

	resolve: {
		extensions: ['.js'],
		alias: {
			src: resolve('src'),
		},
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};

export default config;
