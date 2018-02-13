#!/usr/bin/env node
("use strict");

var path = require("path");
const autoprefixer = require('autoprefixer');
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
// console.log("hello world", process.cwd(), "__dirname", __dirname)
// I replace my publicPath to be (IS_PRODUCTION ? "/" : "http://localhost:8080/")

const postCSSLoaderOptions = {
  // Necessary for external CSS imports to work
  // https://github.com/facebook/create-react-app/issues/2677
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      flexbox: 'no-2009',
    }),
  ],
};

// const publicPath = "http://localhost:8080/"
const publicPath = "/";
/**
 * not workin on ff
 */
// devtool: "source-map",
// devtool: "eval-source-map",

/**
 * copy react scripts config
 * they have great options there
 */

const webpackConfig = {
  devServer: {
    // no effect
    // inline: true,
    contentBase: path.join(process.cwd(), "dist"),
    hot: true,
    filename: "bundle.js",
    publicPath: publicPath,
    stats: {
      colors: true
    }
  },

  mode: "development",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              require.resolve("@babel/preset-react"),
              [
                require.resolve("@babel/preset-env"),
                {
                  targets: {
                    browsers: ["last 2 versions", "safari >= 7"]
                  }
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: postCSSLoaderOptions
          }
        ]
      },
      // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
      // using the extension .module.css
      {
        test: /\.module\.css$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[path]__[name]___[local]"
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: postCSSLoaderOptions
          }
        ]
      }
    ]
  },
  // this is also a good approach
  // but what is the difference?
  // theres alot of options in docs
  // just rtfm
  // resolve: {
  //   root: [
  //     path.resolve('./app/modules'),
  //     path.resolve('./vendor/modules')
  //   ]
  // },
  resolve: {
    modules: [
      path.resolve(
        "/Users/admin/AppData/Roaming/npm/node_modules/@codiechanel/simple-pack",
        "node_modules"
      ),
      "node_modules"
    ]
  },
  resolveLoader: {
    modules: [
      path.resolve(
        "/Users/admin/AppData/Roaming/npm/node_modules/@codiechanel/simple-pack",
        "node_modules"
      )
    ]
  },
  context: process.cwd(),
  //   context: path.join(process.cwd(), "src"),
  entry: [
    // polyfills if any
    "webpack/hot/dev-server",
    "webpack-dev-server/client?http://localhost:8080/",
    "./src/index.js"
  ],
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: path.resolve(process.cwd(), "dist")
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};
/**
 * iframe mode
 */
// http://localhost:8080/webpack-dev-server/index.html

// const webpackConfig = require('./webpack.config');
// webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080");
const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  }
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(8080, "127.0.0.1", () => {
  console.log("Starting server on http://localhost:8080");
});
