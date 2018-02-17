exports.dev = function() {
  var path = require("path");
  const Webpack = require("webpack");
  const WebpackDevServer = require("webpack-dev-server");
  // console.log("hello world", process.cwd(), "__dirname", __dirname)
  // I replace my publicPath to be (IS_PRODUCTION ? "/" : "http://localhost:8080/")

  /**
   * iframe mode
   */
  // http://localhost:8080/webpack-dev-server/index.html

  // if (!fs.existsSync(path.join(process.cwd(), '.babelrc'))) {

  // const webpackConfig = require('./webpack.config');
  const webpackConfig = require(path.join(
    __dirname,
    "..",
    "webpack.config.dev"
  ));
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
};

exports.prod = function() {
  var path = require("path");
  const Webpack = require("webpack");
  // const WebpackDevServer = require("webpack-dev-server");
  const webpackConfig = require(path.join(
    __dirname,
    "..",
    "webpack.config.prod"
  ));
  Webpack(webpackConfig, function(err, stats) {
    if (err || stats.hasErrors()) {
      // Handle errors here
      const info = stats.toJson();
      console.error(info.errors);
    } else {
      console.log(
        "build successful",
        stats.toString({
          // ...
          // Add console colors
          colors: true
        })
      );
    }
  });

  // const compiler = Webpack(webpackConfig);
  // const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  //   stats: {
  //     colors: true
  //   }
  // });
  // const server = new WebpackDevServer(compiler, devServerOptions);

  // server.listen(8080, "127.0.0.1", () => {
  //   console.log("Starting server on http://localhost:8080");
  // });
};



exports.lib = function() {
  var path = require("path");
  const Webpack = require("webpack");
  // const WebpackDevServer = require("webpack-dev-server");
  const webpackConfig = require(path.join(
    __dirname,
    "..",
    "webpack.config.lib"
  ));
  Webpack(webpackConfig, function(err, stats) {
    if (err || stats.hasErrors()) {
      // Handle errors here
      const info = stats.toJson();
      console.error(info.errors);
    } else {
      console.log(
        "build successful",
        stats.toString({
          // ...
          // Add console colors
          colors: true
        })
      );
    }
  });

};
