const path = require("path");
const Webpack = require("webpack");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * hard coded for now...
 */
const publicPath = "/";
const shouldUseSourceMap = false;
// const shouldUseRelativeAssetPaths = publicPath === "./";
// Note: defined here because it will be used more than once.
// const cssFilename = "static/css/[name].[contenthash:8].css";


const postCSSLoaderOptions = {
  // Necessary for external CSS imports to work
  // https://github.com/facebook/create-react-app/issues/2677
  ident: "postcss",
  plugins: () => [
    require("postcss-flexbugs-fixes"),
    autoprefixer({
      flexbox: "no-2009"
    })
  ]
};

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  mode: "production",
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
    "./src/index.js"
  ],

  // output: {
  //   filename: "static/js/[name].[chunkhash:8].js",
  //   chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
  //   publicPath: publicPath,
  //   path: path.resolve(process.cwd(), "dist")
  // },
  output: {
    filename: "bundle.js",
    publicPath: publicPath,
    path: path.resolve(process.cwd(), "dist")
  },
  plugins: [ new UglifyJsPlugin({
    uglifyOptions: {
      ecma: 8,
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebook/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebook/create-react-app/issues/2488
        ascii_only: true,
      },
    },
    // Use multi-process parallel running to improve the build speed
    // Default number of concurrent runs: os.cpus().length - 1
    parallel: true,
    // Enable file caching
    cache: true,
    sourceMap: shouldUseSourceMap,
  })]
};
