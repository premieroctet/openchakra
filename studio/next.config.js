const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['browser-nativefs'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_VISUALIZE == 1,
})

module.exports = withPlugins([[withBundleAnalyzer, {}], [withTM]])
