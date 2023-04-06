const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const JavaScriptObfuscator = require("webpack-obfuscator");


let config = [
  {
    entry: "./src/main/index.js",
    name: "electron",
    target: "electron-main",
    resolve: {
      extensions: ["*", ".js", ".json"],
    },
    output: {
      path: __dirname + "/build",
      publicPath: "/",
      filename: "app.js",
    },
    plugins: [],
    node: {
      __dirname: false,
    },
  },
  {
    entry: "./src/renderer/index.js",
    name: "react",
    target: "electron-renderer",
    node: {
      __dirname: false,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"],
        },
        {
          test: /\.wav$/,
          loader: "file-loader",
          query: {
            name: "static/media/[name].[hash:8].[ext]",
          },
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".json", ".css", ".svg", ".wav"],
    },
    output: {
      path: __dirname + "/build",
      publicPath: "./",
      filename: "bundle.js",
    },
    devServer: {
      contentBase: __dirname + "/build/",
      compress: true,
    },
    plugins: [
      new HtmlWebPackPlugin({
        filename: "index.html",
        template: "src/renderer/index.html",
      }),
    ],
  },
];

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    config.forEach((config) => {
      config.plugins.push(new JavaScriptObfuscator());
    });
  }
  return config;
};
