const sharp = require('sharp')
const {IMAGES_WIDTHS_FOR_RESIZE} = require('../../utils/consts')
const { sanitizeFilename } = require('../../utils/functions')
const { S3_ROOTPATH } = require('../../mode')


const IMAGE_FORMAT_TARGETTED = {
  extension: 'webp', // Available on all good browsers
  mime: 'image/webp',
  options: { lossless: true, quality: 90 }
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
  
  const RETAINED_QUALITY = 100
  const JPEG_SETTINGS = {
    extension: 'jpg',
    outputFormat: 'jpeg',
    options: {
      quality: RETAINED_QUALITY,
      mozjpeg: true
    }
  }
  const IMAGE_SETTINGS = { // we don't sharp .gif
    'image/jpg': JPEG_SETTINGS,
    'image/jpeg': JPEG_SETTINGS,
    'image/png': {
      extension: 'png',
      outputFormat: 'png',
      options: {
        quality: RETAINED_QUALITY,
      }
    },
    'image/webp': {
      extension: 'webp',
      outputFormat: 'webp',
      options: {
        quality: RETAINED_QUALITY,
        lossless: true,
      }
    }
  }

  const filemimetype = req.file.mimetype
  const isImage = Object.keys(IMAGE_SETTINGS).includes(filemimetype)
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
        throw Error('Error while obtaining image dimensions :', err);
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
          .toFormat(IMAGE_SETTINGS[filemimetype].outputFormat, IMAGE_SETTINGS[filemimetype].options)
          .toBuffer()

        const imageData = {
          filename: originalWidth === width // spread availables image dimensions on original file. Others in thumbnails dir
            ? `${S3_ROOTPATH}/${uploadedfilenamebase}_srcset:${availableSizes.join('*')}.${IMAGE_SETTINGS[filemimetype].extension}`
            : `${THUMBNAILS_DIR}/${S3_ROOTPATH}/${uploadedfilenamebase}_w:${width}.${IMAGE_SETTINGS[filemimetype].extension}`,
          mimetype: filemimetype,
          buffer: image,
        }
        req.body.documents.push(imageData)
        resolve(image)
      })
    })
    
    await Promise.all(sharpImages)

  } else {
    req.body.documents.push({
      filename: `${S3_ROOTPATH}/${uploadedfilename}`,
      mimetype: req.file.mimetype,
      buffer: req.file.buffer,
    }) 
  }

  next()
}


function handleImageFormat() {

}