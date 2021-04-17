const path = require("path")
const isDevelopment = process.env.NODE_ENV === "development"
const getFileNameByEnv = (ext = "[ext]", name = "[name]") => {
  return isDevelopment ? `${name}.${ext}` : `${name}.[contenthash].${ext}`
}
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    app: "./index.jsx",
  },
  context: path.resolve(__dirname, "src"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: getFileNameByEnv("js"),
    publicPath: "/",
  },
  optimization: isDevelopment
    ? {}
    : {
        minimize: true,
        minimizer: [new OptimizeCssAssetWebpackPlugin()],
      },
  plugins: [
    new HtmlWebpackPlugin({
      title: "hello webpack",
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      inject: true,
      minify: {
        collapseWhitespace: !isDevelopment,
        removeComments: !isDevelopment,
        removeAttributeQuotes: !isDevelopment,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "service-worker.js"),
          to: path.resolve(__dirname, "build/service-worker.js"),
        },
        {
          from: path.resolve(__dirname, "manifest"),
          to: path.resolve(__dirname, "build/manifest"),
        },
        {
          from: path.resolve(__dirname, "notifications.js"),
          to: path.resolve(__dirname, "build/notifications.js"),
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: `./css/${getFileNameByEnv("css")}`,
      chunkFilename: getFileNameByEnv("css", "[id]"),
      ignoreOrder: false,
    }),
    isDevelopment
      ? () => ({})
      : new ImageMinimizerPlugin({
          minimizerOptions: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      removeViewBox: false,
                    },
                  ],
                },
              ],
            ],
          },
        }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/node_modules/, /\.module\.css$/],
        use: [
          isDevelopment
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: path.resolve(__dirname, "build/css"),
                },
              },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        exclude: /node_modules/,
        use: [
          isDevelopment
            ? // Creates `style` nodes from JS strings
              "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: path.resolve(__dirname, "build/css"),
                },
              },
          {
            // Translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
              modules: true,
            },
          },
        ],
      },

      {
        test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `./img/${getFileNameByEnv()}`,
            },
          },
        ],
      },
      {
        test: /\.(?:|woff2)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `./fonts/${getFileNameByEnv()}`,
            },
          },
        ],
      },
      {
        test: /\.js(x?)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/react"],
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: `${__dirname}/src`,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/env", "@babel/react"],
          plugins: [
            [
              "@babel/plugin-proposal-class-properties",
              {
                loose: true,
              },
            ],
          ],
        },
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx"],
    alias: {
      "@app": path.resolve(__dirname, "src"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  devServer: {
    open: true,
    hot: true,
    port: 3000,
    contentBase: path.resolve(__dirname, "build"),
    historyApiFallback: true,
  },
  devtool: !isDevelopment ? false : "source-map",
  stats: "errors-only",
}
