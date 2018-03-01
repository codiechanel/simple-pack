var fs = require("fs");
var path = require("path");
var conf = require("./config");
var webpack = require("webpack");
var merge = require("webpack-merge");

const globalModules = require("global-modules");
const ourGlobalFolder = path.join(
  globalModules,
  "./",
  "@codiechanel/simple-pack"
);

process.env.NODE_ENV = "production"

function webpackConfig(dir, additionalConfig) {
  var config = conf.load();
  var babelOpts = {cacheDirectory: true};
  // if (!fs.existsSync(path.join(process.cwd(), '.babelrc'))) {
  //   babelOpts.presets = ["stage-0","es2015"];
  //   babelOptsplugins = [
  //     "transform-class-properties",
  //     "transform-object-assign",
  //     "transform-object-rest-spread",
  //     "transform-async-to-generator"
  //   ];
  // }

  var webpackConfig = {
    mode: "production",
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              "presets": [
                [
                  require.resolve("@babel/preset-env"),
                  {
                    "targets": {
                      "node": "6.10"
                    }
                  }
                ]
              ],     plugins: [
                // require.resolve("@babel/plugin-proposal-class-properties"), 
                // require.resolve("@babel/plugin-proposal-object-rest-spread"), 
                require.resolve("@babel/plugin-transform-regenerator"), 
                require.resolve("@babel/plugin-transform-runtime")
              ]
            }
          }
        }
      ]
    },
    context: path.join(process.cwd(), dir),
    entry: {},
    target: "node",
    plugins: [new webpack.IgnorePlugin(/vertx/)],
    output: {
      path: path.join(
        process.cwd(),
        config.build.functions || config.build.Functions
      ),
      filename: "[name].js",
      libraryTarget: "commonjs"
    },
    devtool: false, 
    resolve: {
      modules: [
        path.resolve(
          ourGlobalFolder,
          "node_modules"
        ),
        "node_modules"
      ]
    },
    resolveLoader: {
      modules: [
        path.resolve(
          ourGlobalFolder,
          "node_modules"
        )
      ]
    },
  };
  fs.readdirSync(path.join(process.cwd(), dir)).forEach(function(file) {
    if (file.match(/\.js$/)) {
      var name = file.replace(/\.js$/, "");
      webpackConfig.entry[name] = "./" + name;
    }
  });
  if (additionalConfig) {
    var webpackAdditional = require(path.join(process.cwd(), additionalConfig));

    return merge.smart(webpackConfig, webpackAdditional);
  }

  return webpackConfig;
}

exports.run = function(dir, additionalConfig) {
  return new Promise(function(resolve, reject) {
    webpack(webpackConfig(dir, additionalConfig), function(err, stats) {
      if (err) {
        return reject(err);
      }
      resolve(stats);
    });
  });
};

exports.watch = function(dir, additionalConfig, cb) {
  var compiler = webpack(webpackConfig(dir));
  compiler.watch(webpackConfig(dir), cb);
};
