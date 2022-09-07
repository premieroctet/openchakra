import config from '../../env.json'

import exec from 'ssh-exec'

const options = {
  user: config.targetUser,
  host: config.targetDomain,
  key: config.privKeyPath,
}

exec('ls -lh', options).pipe(process.stdout)

export const copyFile = (contents, path) => {}
