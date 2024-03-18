const {Upload} = require('@aws-sdk/lib-storage')
const {S3} = require('@aws-sdk/client-s3')
const {THUMBNAILS_DIR} = require('../../../web/utils/consts')
const fs=require('fs')
const mime=require('mime-types')
const path=require('path')

const s3 = new S3({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ID,
    secretAccessKey: process.env.S3_SECRET,
  }
})


const imageSrcSetPaths = (originalSrc, withDimension=true) => {

  /**
   * src filename example containing sizes:
   * https://******.amazonaws.com/devtest/studio/wappizy_srcset:500*1000*1920.webp
   *
   * example of filepath derived for a smaller image
   * https://******.amazonaws.com/thumbnails/devtest/studio/wappizy_w:500.webp
   *
   */

  let srcSet

  const filePathParts = originalSrc.split('_srcset:')
  const filenameextension = originalSrc.substring(originalSrc.lastIndexOf('.') + 1, originalSrc.length)

  if (filePathParts.length > 1) {
    const availableSizes = filePathParts[1].match(/\d+/g)
    const availableSizesQty = availableSizes?.length
    srcSet = availableSizes && availableSizes
      .map((size, index) => {
        if ((index + 1) === availableSizesQty) {
          return `${originalSrc}${withDimension ? ` ${size}w` : ''}`
        }
        const shortFilepathParts = filePathParts[0].split('/')
        // index to add thumbnails folder after https://******.amazonaws.com
        const indexToPushThumbnails = 3
        const thumbnailsFilepath = shortFilepathParts
          .slice(0, indexToPushThumbnails)
          .concat(THUMBNAILS_DIR, shortFilepathParts.slice(indexToPushThumbnails))
        return `${thumbnailsFilepath.join('/')}_w:${size}.${filenameextension}${withDimension ? ` ${size}w` : ''}`

      })
  }
  else {
    srcSet = [originalSrc]
  }

  return srcSet
}

exports.sendFileToAWS = async (fullpath, type) => {
  const filename=path.join(process.env.S3_PROD_ROOTPATH, type, path.basename(fullpath))
  const contents=fs.readFileSync(fullpath)
  let mimeType=mime.lookup(fullpath)
  if (!mimeType && /\.peg$/i.test(filename)) {
    mimeType=mime.lookup('jpg')
  }

  if (!contents || !mimeType) {
    console.error(`No contents or mime for`, type, fullpath)
    return null
  }

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: filename,
    Body: contents,
    ContentType: mimeType,
    // ACL: 'public-read', // What's this ACL ?
  }

  const upload=new Upload({client: s3,params})
  const res=await upload.done().catch(console.error)

  console.log('res is', res)

  return res
}

exports.sendFilesToAWS = async(req, res, next) => {
  if (!req.body.documents) { return next() }

  const documentsToSend = req.body.documents.map(document => {

    return new Promise(async(resolve, reject) => {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: document.filename,
        Body: document.buffer,
        ContentType: document.mimetype,
        // ACL: 'public-read', // What's this ACL ?
      }

      await new Upload({
        client: s3,
        params,
      }).done()
        .then(res => resolve(res))
        .catch(err => {
          console.error(err)
          return reject(err)
        })
    })
  })

  req.body.result = await Promise.all(documentsToSend)
    .catch(err => console.error(err))

  return next()
}

exports.getFilesFromAWS = async(req, res, next) => {

  const url = `https://${process.env.S3_BUCKET}.s3-${process.env.S3_REGION}.amazonaws.com`

  try {
    const data = await s3.listObjectsV2({
      Bucket: process.env.S3_BUCKET,
      Prefix: `${process.env.S3_STUDIO_ROOTPATH || 'pictures'}`,
    })

    req.body.files = data.Contents?.map(e => ({
      ...e,
      publicUrl: `${url}/${e.Key}`,
    }))

  }
  catch (err) {
    throw Error(`Error while getting images from AWS S3 : ${err}`)
  }

  next()
}

exports.deleteFileFromAWS = async(req, res, next) => {

  try {
    // does this match with filename pattern
    const filesToDelete = imageSrcSetPaths(req.body.filetodelete, false)

    const promiseDelete = filesToDelete.map(url => {
      // Setting up S3 upload parameters
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: url, // File name you want to delete as in S3
      }
      return s3.deleteObject(params)
        .then(res => {
          return Promise.resolve(res)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    })

    await Promise.allSettled(promiseDelete)

    req.body.filedeleted = true
  }
  catch(err) {
    throw new Error('Error while deleting an image from AWS S3', err)
  }

  next()
}
