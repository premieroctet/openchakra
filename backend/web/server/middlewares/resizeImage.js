const sharp = require('sharp')
const {IMAGES_WIDTHS_FOR_RESIZE} = require('../../utils/consts')

exports.resizeImage = async(req, res, next) => {
  if (!req.file) { return next() }

  req.body.documents = []

  const processingImages = IMAGES_WIDTHS_FOR_RESIZE.map(width => {
    return new Promise(async(resolve, reject) => {
      const image = await sharp(req.file.buffer) // or buffer ?
        .resize({width})
        .toFormat('webp')
      // .jpeg({quality: 90})
      // .toFile(`./upload/${req.file.filename}`)
        .toBuffer()
      req.body.documents.push(image)
      resolve(image)
    })
  })

  await Promise.all(processingImages)

  next()
}
