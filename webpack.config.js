const HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            // More information here https://webpack.js.org/guides/asset-modules/
            type: "asset",
          },
        ],
    },  
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html' 
        }),
        new WebpackObfuscator ({
            rotateStringArray: true
        }, [])  
    ]
};