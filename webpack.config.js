const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/script/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: [/\.(scss|css)$/, /\.s[ac]ss$/i],
        use: ["style-loader", { options: { esModule: false } }, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
};
