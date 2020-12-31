/* eslint-env node */

const path = require('path')

const prod = 'production' === process.env.NODE_ENV

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: ['@babel/polyfill', './demo/index.js'],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'material-ui-popup-state': path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-flow-strip-types',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
            ],
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-react',
              '@babel/preset-flow',
            ],
          },
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'demo'),
  },
}
