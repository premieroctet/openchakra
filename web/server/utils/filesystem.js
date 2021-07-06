const fs = require('fs')
const path = require('path')

const ensureDirectoryExists = dirName => {
  const rootDir = path.join(path.dirname(require.main.filename), '..')
  const fullDirName = path.join(rootDir, dirName)
  if (!fs.existsSync(fullDirName)) {
    console.log(`Creating nonexistent directory ${fullDirName}`)
    fs.mkdirSync(fullDirName, {recursive: true})
  }
}

const IMAGE_EXTENSIONS='.png .jpg .gif .jpeg .pdf'.toLowerCase().split(' ')
const TEXT_EXTENSIONS='.csv .txt'.toLowerCase().split(' ')

const isImageFile = filename => {
  const ext = path.extname(filename).toLowerCase()
  return IMAGE_EXTENSIONS.includes(ext)
}

const isTxtFile = filename => {
  const ext = path.extname(filename).toLowerCase()
  return TEXT_EXTENSIONS.includes(ext)
}

module.exports = {
  ensureDirectoryExists,
  isImageFile,
  isTxtFile,
}
