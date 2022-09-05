const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['browser-nativefs'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_VISUALIZE == 1,
})

module.exports = async phase => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  }

  const defaultConfig = {}
  return withPlugins([[withBundleAnalyzer], [withTM]], nextConfig)(phase, {
    defaultConfig,
  })
}
