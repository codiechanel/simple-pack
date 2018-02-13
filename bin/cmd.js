#!/usr/bin/env node

("use strict");
console.log(__dirname, "process.cwd()", process.cwd());

var buildReact = require("../lib/buildReact");
var program = require("commander");
var fs = require("fs");
var path = require("path");
var pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json"))
);

program.version(pkg.version);

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
