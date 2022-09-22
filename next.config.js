/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true, 
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // const rule = config.module.rules[0];
    // const originalExcludeMethod = rule.exclude;
    // config.module.rules[0].exclude = (moduleName, ...otherArgs) => {
    //   // we want to explicitly allow our plugin
    //   if (moduleName.indexOf("node_modules/@trilogy-group/tu2k22-openchakra") >= 0) {
    //     return false;
    //   }

    //   // otherwise, use the original rule
    //   return originalExcludeMethod(moduleName, ...otherArgs);
    // };
    // config.resolve.fallback = {   
    //   ...config.resolve.fallback,
    //   fs: false 
    // };
    // config.module.rules.push({
    //   test: /\.(ts|js)x?$/,
    //   loader: "raw-loader",
    // });
    config.module.rules.push({
      test: /\.(ts)x?$/, // Just `tsx?` file only
      use: [
        // options.defaultLoaders.babel, I don't think it's necessary to have this loader too
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    });

    return config;
  },
}

module.exports = nextConfig
