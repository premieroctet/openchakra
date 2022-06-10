const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const {IMAGE_EXTENSIONS, TEXT_EXTENSIONS, XL_EXTENSIONS} = require('../../utils/consts')

const ensureDirectoryExists = dirName => {
  const rootDir = path.join(path.dirname(require.main.filename), '..')
  const fullDirName = path.join(rootDir, dirName)
  if (!fs.existsSync(fullDirName)) {
    console.log(`Creating nonexistent directory ${fullDirName}`)
    fs.mkdirSync(fullDirName, {recursive: true})
  }
}

const IMAGE_FILTER = {
  filter: filename => {
    const ext = path.extname(filename).toLowerCase()
    return IMAGE_EXTENSIONS.includes(ext)
  },
  message: `Image attendue (${IMAGE_EXTENSIONS.join(',')})`,
}

const TEXT_FILTER = {
  filter: filename => {
    const ext = path.extname(filename).toLowerCase()
    return TEXT_EXTENSIONS.includes(ext)
  },
  message: `Texte attendu (${TEXT_EXTENSIONS.join(',')})`,
}

const XL_FILTER = {
  filter: filename => {
    const ext = path.extname(filename).toLowerCase()
    return XL_EXTENSIONS.includes(ext)
  },
  message: `Fichier Excel attendu (${XL_EXTENSIONS.join(',')})`,
}

const createDiskMulter = (directory, fileFilter) => {
  ensureDirectoryExists(directory)
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, directory)
    },
    filename: (req, file, cb) => {
      let datetimestamp = Date.now()
      let key = crypto.randomBytes(5).toString('hex')
      cb(null, `${datetimestamp}_${key}_${file.originalname}`)
    },
  })
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      if (fileFilter && !fileFilter.filter(file.originalname)) {
        // TODO Remonter l'erreur en JSON plutôt qu'en page HTML erreur
        return callback(new Error(fileFilter.message))
      }
      callback(null, true)
    },
  })
  return upload
}

const createMemoryMulter = fileFilter => {
  const storage = multer.memoryStorage()
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      if (fileFilter && !fileFilter.filter(file.originalname)) {
        // TODO Remonter l'erreur en JSON plutôt qu'en page HTML erreur
        return callback(new Error(fileFilter.message))
      }
      callback(null, true)
    },
  })
  return upload
}

module.exports = {
  createDiskMulter,
  createMemoryMulter,
  IMAGE_FILTER,
  TEXT_FILTER,
  XL_FILTER,
}
