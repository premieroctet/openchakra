const withCSS = require('@zeit/next-css');
const BabelEnginePlugin = require('babel-engine-plugin');

module.exports = withCSS({
  webpack: (config, {isServer}) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    config.module.rules.push({
      test : /\.(png|jp(e*)g|gif|svg)$/,
      exclude: /(node_modules)/,
      loader : require.resolve('url-loader')
    })
    config.plugins.push(
        new BabelEnginePlugin({
          presets: ['env']
        })

    )
    return config;
  },
})
