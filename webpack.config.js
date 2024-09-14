const path = require("path")
const { output, devServer } = require("../学习webpack/webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode:"development",
    entry: "./src/study.js",
    output: {
        filename: "2048.js",
        path: path.resolve(__dirname, "build")
    },
    devServer: {
      port:"8888",
      // host:"0.0.0.0"
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", "postcss-loader"],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
            title:"2048"
        })
    ]
}