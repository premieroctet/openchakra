const sharp = require('sharp')
const {IMAGES_WIDTHS_FOR_RESIZE} = require('../../utils/consts')
const { sanitizeFilename } = require('../../utils/functions')


const IMAGE_FORMAT_TARGETTED = {
  extension: 'webp', // Available on all good browsers
  mime: 'image/webp'
}
const THUMBNAILS_DIR = 'thumbnails'

exports.resizeImage = async(req, res, next) => {
  if (!req.file) { return next() }
  
  /* Structure for documents (je garde req.documents, req.files, ou req.file ?) : 
  - filename including pattern dimensions, 
  - mimetype, 
  - buffer 
  */
 
  req.body.documents = []
  const ALLOWED_MIME_TYPES = { // we don't sharp .gif
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  }
  const isImage = Object.keys(ALLOWED_MIME_TYPES).includes(req.file.mimetype)
  const uploadedfilename = sanitizeFilename(req.file.originalname)
  const uploadedfilenamebase = uploadedfilename.substring(0, uploadedfilename.lastIndexOf('.'))
 
  if (isImage) {
    let availableSizes = []
    // watch out for original image width
    const {width: originalWidth} = await sharp(req.file.buffer)
      .metadata()
      .then(metadata => {
        return {
          width: metadata.width
        };
      })
      .catch(err => {
        console.error('Error while obtaining image dimensions :', err);
        res.status(500).json({ error: 'Error while obtaining image dimensions' });
      });
      
    const retainedImageSizes = IMAGES_WIDTHS_FOR_RESIZE
      .filter(size => size < originalWidth)
      .sort((a, b) => a - b)
      
    const imagesSet = new Set([...retainedImageSizes, originalWidth])

    const sharpImages = [...imagesSet].map(width => {

      return new Promise(async(resolve, reject) => {
        availableSizes.push(width)
        const image = await sharp(req.file.buffer)
          .resize({width})
          .toFormat(IMAGE_FORMAT_TARGETTED.extension)
          .toBuffer()

        const imageData = {
          filename: originalWidth === width // spread availables image dimensions on original file. Others in thumbnails dir
            ? `${uploadedfilenamebase}_srscset:${availableSizes.join('*')}).${IMAGE_FORMAT_TARGETTED.extension}`
            : `${THUMBNAILS_DIR}/${uploadedfilenamebase}_w:${width}.${IMAGE_FORMAT_TARGETTED.extension}`,
          mimetype: IMAGE_FORMAT_TARGETTED.mime,
          buffer: image,
        }
        req.body.documents.push(imageData)
        resolve(image)
      })
    })
    
    await Promise.all(sharpImages)

  } else {
    req.body.documents.push({
      filename: uploadedfilename,
      mimetype: req.file.mimetype,
      buffer: req.file.buffer,
    }) 
  }

  next()
}
