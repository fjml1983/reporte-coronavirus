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
          { //configurar el loader de babel
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react']
              }
            }
          }
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