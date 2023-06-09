require("dotenv").config(); 

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProd = process.env.NODE_ENV === "production"; 
const PORT = process.env.PORT || 3000;

module.exports = {
  mode: isProd ? "production" : "development",
  devtool: isProd ? "hidden-source-map" : "source-map", // development 환경에서만 source-map을 만든다.
  entry: "./src/index.tsx",
  output: {
    filename: "[name].js", 
    path: path.join(__dirname, "/dist"), 
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: isProd ? false : true, 
        },
      },
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(webp|jpg|png|jpeg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      hash: true,
    }), 
  ],
  stats: "errors-only",
devServer: {
static: {
directory: path.resolve(__dirname, "public"),
},
port: PORT,
open: true,
client: {
overlay: true,
},
hot: true,
host: "localhost",
historyApiFallback: true,
compress: true,
},
};