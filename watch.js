const chokidar = require('chokidar')
const axios = require('axios')

const API_ENDPOINT = axios.create({
  baseURL: `https://3002-apricot-dog-p2v436i8.ws.trilogy.devspaces.com/api`,
  timeout: 30000,
})

const watcher = chokidar.watch(['remote'], {
  ignored: [
    /.*.composition.tsx/,
    /.*.spec.tsx/,
    /.*.stories.tsx/,
    /.*.mdx/,
    /.*.md/,
    '*.ts',
    '*.js',
    /.*.jsx/,
    /.*.storyshot/,
    /.*.storybook*/,
    /.*.next/,
    /.*node_modules/,
    /.*public/,
    /.*.git/,
    /.env/,
    /.bitmap/,
    /.npmrc/,
    /.*.yaml/,
    /.prettier*/,
    /.*LICENSE/,
  ],
  persistent: true,
})

const log = console.log.bind(console)

log('Starting watcher...')

watcher.on('add', async path => {
  if (path.slice(-8) === '.oc.json') {
    log(`Added: ${path}`)
    try {
      const response = await API_ENDPOINT.post('/init', {
        path: path,
      })
    } catch (e) {
      console.error(e)
    }
  } // Create default panel and preview file
  else if (path.slice(-14) === 'Preview.oc.tsx') {
    log(`Added: ${path}`)
  } else if (path.slice(-12) === 'Panel.oc.tsx') {
    log(`Added: ${path}`)
  }
})
watcher.on('change', path => {
  if (path.slice(-14) === 'Preview.oc.tsx') {
    log(`Modified: ${path}`)
  } else if (path.slice(-12) === 'Panel.oc.tsx') {
    log(`Modified: ${path}`)
  } else if (path.slice(-8) === '.oc.json') {
    log(`Modified: ${path}`)
  }
})
watcher.on('unlink', async path => {
  if (path.slice(-7) === 'oc.json') {
    log(`Deleted: ${path}`)
    try {
      const response = await API_ENDPOINT.post('/delete-file', {
        path: path,
      })
    } catch (e) {
      console.error(e)
    }
  } // delete panel file and preview file
  else if (path.slice(-14) === 'Preview.oc.tsx') {
    log(`Deleted: ${path}`)
  } else if (path.slice(-12) === 'Panel.oc.tsx') {
    log(`Deleted: ${path}`)
  }
})
