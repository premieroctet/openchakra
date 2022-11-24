/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, { buildId, dev }) => {
    config.resolve.symlinks = false
    return config
  },
}

module.exports = nextConfig
