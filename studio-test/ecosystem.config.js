const path=require('path')
myEnv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)

const processName=`FRONT-${process.env.NEXT_PUBLIC_PROJECT_NAME || 'NO_NEXT_PUBLIC_PROJECT_NAME'}-${process.env.FRONTEND_APP_PORT}`.toUpperCase()

module.exports = {
  apps: [{
    name: processName,
    script: 'src/server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '2G',
    env: {
      NODE_ENV: 'production',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
}
