# simple-pack

simple-pack is my personal build tool for react apps, pretty much similar to create-react-app but less bloated.

## Features

- Webpack 4
- Uses the latest Babel that allows you to target specific browser versions.
- Built-in post css
- *one time global install (makes your project folder leaner) 
- Netlify lambda support. Now you have one build tool to compile react and node js scripts. 
- supports proxy. Redirect requests to your node api server. 
- 68 mb install size. 

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

## Plugins

- @babel/plugin-proposal-class-properties (experimental)

## Roadmap

Test

