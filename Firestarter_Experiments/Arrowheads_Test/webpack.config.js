const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/index.html', to: './' },
            { from: 'src/style.css', to: './' },
        ]),
	 ],
	 module: {
		 rules :[
			{ 
				test : /\.css$/, 
				use: [
					 { loader: 'style-loader' },
					 { loader: 'css-loader' }
				]  
		  }
		 ]
	 }
};