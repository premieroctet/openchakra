const fs = require('fs')
const path = require('path')

const ensureDirectoryExists = dirName => {
  console.log(`ensureDirectoryExists ${dirName}`)
  const rootDir = path.join(path.dirname(require.main.filename), '..')
  const fullDirName = path.join(rootDir, dirName)
  if (!fs.existsSync(fullDirName)) {
    console.log(`Creating nonexistent directory ${fullDirName}`)
    fs.mkdirSync(fullDirName, { recursive: true})
  }
}

module.exports = {
  ensureDirectoryExists,
};
