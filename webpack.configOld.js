const path = require("path");
const webpack = require('webpack');
module.exports = {
  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
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
            presets: ["@babel/preset-react", 
              [
                "@babel/preset-env",
                {
                  targets: {
                    "browsers": ["last 2 versions", "safari >= 7"]
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  context: path.join(process.cwd(),
//   context: path.join(process.cwd(), "src"),
  entry: [
    './src/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/',
  ],
  
  output: {
    filename: "bundle.js",
    publicPath: '/',
    path: path.resolve(process.cwd(), "dist")
  }, 
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
