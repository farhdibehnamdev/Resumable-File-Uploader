const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/script/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].[contenthash].js",
    assetModuleFilename: "[name][ext]",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: "source-map",
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
    port: 5501,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(s(a|c)ss|css)$/,
        use: [
          "style-loader",
          // { options: { esModule: false } },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            // options: {
            //   presets: ["solid"],
            // },
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: "Resumable-File-Uploader",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
};
