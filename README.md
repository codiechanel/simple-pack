# simple-pack

simple-pack is my personal build tool for react apps, pretty much similar to create-react-app but less bloated.

## Features

- Webpack 4
- Uses the latest Babel that allows you to target specific browser versions.
- Built-in post css
- *one time global install (makes your project folder leaner) 

## Why I created this?

*the problem I have with create-react-app is that it installs react-scripts in my new project directory everytime I create a new project. This package alone takes a lot of space, and time to install. If you work on multiple projects, this could become a hassle. This is why I decided to create my own build tool.

## To use

install globally (recommended):

`npm i -g @codiechanel/simple-pack`

then go to your project folder and run:

`npx simple-pack`

It assumes the following:

- Your src folder is located at ./src
- your build folder is located at ./dist

to install locally, simply run:

`npm i @codiechanel/simple-pack`

However, if you have multiple projects, then npm installing this would eat up a lot of space, which defeats of the purpose of this build tool. 

## Roadmap

Test

