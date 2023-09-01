const myEnv = require('dotenv').config({ path: `${__dirname}/.env`});
const dotenvExpand = require('dotenv-expand')
const envvar = dotenvExpand.expand(myEnv)

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    ...envvar?.parsed
  },
};