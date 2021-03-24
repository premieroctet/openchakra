const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: (config, {isServer}) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    config.module.rules.push({
      test : /\.(png|jp(e*)g|gif)$/,
      exclude: /(node_modules)/,
      loader : require.resolve('url-loader')
    })
    config.module.rules.push({
      test: /\.svg$/,
      exclude: /(node_modules)/,
      loader: require.resolve('@svgr/webpack'),
    })
    return config;
  },
})
