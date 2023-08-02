const multer = require('multer')

const ALLOWED_MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

const multerMemoryOptions = {
  storage: multer.memoryStorage(),
  limits: 48096, // 6Mo ?
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/')
    if(isPhoto) {
      next(null, true)
    }
    else {
      next({message: 'That filetype isn\'t allowed!'}, false)
    }
  },
}

const multerDiskOptions = {
  // storage: multer.diskStorage(),
  // fileFilter(req, file, next) {
  //   const isPhoto = file.mimetype.startsWith('image/')
  //   if(isPhoto) {
  //     next(null, true)
  //   }
  //   else {
  //     next({message: 'That filetype isn\'t allowed!'}, false)
  //   }
  // },
  // destination: (req, file, callback) => {
  //   callback(null, 'images')
  // },
  // filename: (req, file, callback) => {
  //   const name = file.originalname.split(' ').join('_')
  //   const extension = MIME_TYPES[file.mimetype]
  //   callback(null, `${name + Date.now()}.${ extension}`)
  // },
}


exports.handleUploadedFile = multer(multerMemoryOptions).single('document')
