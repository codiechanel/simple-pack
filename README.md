# simple-pack

simple-pack is my personal build tool for react apps, pretty much similar to create-react-app but less bloated.

While this build tool is working (I use this everyday), I don't recommend using it in production though. You can use this for learning purposes, or for kickstarting pet or prototype projects. If you want to deploy to production, I still recommend using create-react-app, parcel, nwb and rollup . You can simply copy your source files. 

## Features

- Webpack 4
- multi build options (react app, library, and node js backend via Netlify Lambda)
- library output is umd
- supports proxy. Redirect requests to your node api server. 
- Uses the latest Babel 7 that allows you to target specific browser versions. If you target only the latest browser, this means less babel plugins will need to be installed
- Built-in post css
- *one time global install (makes your project folder leaner) 
- Netlify lambda support. Now you have one build tool to compile react and node js scripts. 
- 84 mb install size. 
- support for assets/images in css via file-loader
- supports url rewrite in dev't mode via `historyApiFallback`
- supports externals when building a library
- watch mode when building a library

## Why I created this?

*the problem I have with create-react-app is that it installs react-scripts everytime I create a new project, taking up more hard drive space, and time to install. If you work on multiple projects, this could become a hassle. This is why I decided to create my own build tool.

## To use

install globally (recommended):

`npm i -g @codiechanel/simple-pack`

then go to your project folder and simply run:

`simple-pack`

It assumes the following:

- Your src folder is located at ./src
- your build folder is located at ./dist

to install locally (not recommended):

`npm i @codiechanel/simple-pack`

However, if you have multiple projects, then npm installing this everytime would eat up a lot of space, which defeats the purpose of this build tool which was designed to be installed globally. 

## Building a library

- you can add `"externals":[]` in your package json to exempt modules
from being compiled

## Plugins

- @babel/plugin-proposal-class-properties
- @babel/plugin-proposal-object-rest-spread
- @babel/plugin-proposal-decorators

## Roadmap

- Test
- Css are currently inside the bundle
- need to separate this later perhaps
- Support Typescript
- Streamline dependencies
