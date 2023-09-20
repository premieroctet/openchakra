const convert = require('heic-convert')

const RETAINED_QUALITY = 100
const JPEG_SETTINGS = {
  extension: 'jpg',
  outputFormat: 'jpeg',
  outputMime: 'image/jpeg',
  options: {
  quality: RETAINED_QUALITY,
  mozjpeg: true,
  },
}

const heicToJpeg = async buffer => {
  return await convert({
    buffer: buffer, // the HEIC file buffer
    format: 'JPEG', // output format
    quality: 1, // the jpeg compression quality, between 0 and 1
  })
}

exports.IMAGE_SIZE_SEPARATOR = '_'  
  
exports.IMAGE_SETTINGS = { // we don't sharp .gif
  'image/jpg': JPEG_SETTINGS,
  'image/jpeg': JPEG_SETTINGS,
  'image/png': {
    extension: 'png',
    outputFormat: 'png',
    outputMime: 'image/png',
    options: {
      quality: RETAINED_QUALITY,
    },
  },
  'image/heic': JPEG_SETTINGS,
  'image/heif': JPEG_SETTINGS,
  'image/webp': {
    extension: 'webp',
    outputFormat: 'webp',
    outputMime: 'image/webp',
    options: {
      quality: RETAINED_QUALITY,
      lossless: true,
    },
  },
}
  
exports.switchbuffer = async (buffer, filemimetype) => {
  if (['image/heic', 'image/heif'].includes(filemimetype)) {
    return await heicToJpeg(buffer)
  }
  return buffer
}