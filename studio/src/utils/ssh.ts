import exec from 'ssh-exec'

const options = {
  user: process.env.NEXT_PUBLIC_PROJECT_TARGETUSER,
  host: process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN,
  key: process.env.NEXT_PUBLIC_PROJECT_TARGETKEY,
}

// TODO : may be used to deploy with SSH
exec('ls -lh', options).pipe(process.stdout)

export const copyFile = (contents, path) => {}
