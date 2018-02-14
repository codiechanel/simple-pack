#!/usr/bin/env node

("use strict");
console.log(__dirname, "process.cwd()", process.cwd());

var buildReact = require("../lib/buildReact");
var build = require("../lib/build");
var serve = require("../lib/serve");

var program = require("commander");
var fs = require("fs");
var path = require("path");
var pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json"))
);

program.version(pkg.version);
process.env.BABEL_ENV = "development"
program
  .option("-c --config <webpack-config>", "additional webpack configuration")

program
  .command("serve <dir>")
  .description("serve and watch functions")
  .action(function(cmd, options) {
    console.log("Starting server");
    var server = serve.listen(9000);
    build.watch(cmd, program.config, function(err, stats) {
      if (err) {
        console.error(err);
        return;
      }

      stats.compilation.chunks.forEach(function(chunk) {
        server.clearCache(chunk.name);
      });

      console.log(stats.toString({ color: true }));
    });
  });

program
  .command("build <dir>")
  .description("build functions")
  .action(function(cmd, options) {
    console.log("Building functions");
    build
      .run(cmd, program.config)
      .then(function(stats) {
        console.log(stats.toString({ color: true }));
      })
      .catch(function(err) {
        console.error(err);
        process.exit(1);
      });
  });


program
  .command("dev")
  .description("starts in dev mode")
  .action(function(cmd, options) {
    console.log("Starting server");
    buildReact.dev();
  });

program
  .command("prod")
  .description("starts in prod mode")
  .action(function(cmd, options) {
    console.log("Starting server");
    buildReact.prod();
  });

program.parse(process.argv);
