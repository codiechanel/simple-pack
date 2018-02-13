const path = require("path");
const Webpack = require("webpack");
const autoprefixer = require("autoprefixer");
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

const globalModules = require("global-modules");
const ourGlobalFolder = path.join(
  globalModules,
  "./",
  "@codiechanel/simple-pack"
);

// const publicPath = "http://localhost:8080/"
const publicPath = "/";

module.exports = {
  devtool: "cheap-module-source-map",
  devServer: {
    // no effect
    // inline: true,
    contentBase: path.join(process.cwd(), "build"),
    hot: true,
    filename: "bundle.js",
    publicPath: publicPath,
    stats: {
      colors: true
    },
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/\\.netlify/functions": ""
        }
      }
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
            ],
            plugins: [
              require.resolve("@babel/plugin-proposal-class-properties")
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
  // "/Users/admin/AppData/Roaming/npm/node_modules/@codiechanel/simple-pack"

  resolve: {
    modules: [path.resolve(ourGlobalFolder, "node_modules"), "node_modules"]
  },
  resolveLoader: {
    modules: [path.resolve(ourGlobalFolder, "node_modules")]
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
    pathinfo: true,
    filename: "bundle.js",
    publicPath: "/",
    path: path.resolve(process.cwd(), "build"),
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};
