const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env?.S3_ID,
  secretAccessKey: process.env?.S3_SECRET,
  region: process.env?.S3_REGION,
})

const s3 = new AWS.S3()

exports.sendFilesToAWS = async(req, res, next) => {
  if (!req.body.documents) { return next() }

  const documentsToSend = req.body.documents.map(document => {
    return new Promise(async(resolve, reject) => {
      const params = {
        Bucket: process.env?.S3_BUCKET,
        Key: document.filename,
        Body: document.buffer,
        ContentType: document.mimetype,
        // ACL: 'public-read', // What's this ACL ?
      }

      await s3.upload(params).promise()
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  })

  req.body.result = await Promise.all(documentsToSend)
    .catch(err => console.error(err))

  next()
}

exports.getFilesFromAWS = async (req, res, next) => {
  
  const url = `https://${process.env.S3_BUCKET}.s3-${process.env.S3_REGION}.amazonaws.com`

  try {
    const data = await s3.listObjectsV2({
        Bucket: process.env.S3_BUCKET,
        Prefix: `${process.env.S3_ROOTPATH || 'pictures'}`,
      })
      .promise()

    req.body.files = data.Contents?.map(e => ({
      ...e,
      publicUrl: `${url}/${e.Key}`,
    }))

  } catch (err) {
    throw Error('Error while getting images from AWS S3 :', err)
  }

  next()
}

exports.deleteFileFromAWS = async (req, res, next) => {

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
        .promise()
        .then(res => {
          return Promise.resolve(res)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    })
  
    await Promise.all(promiseDelete)

    req.body.filedeleted = true
  } catch(err) {
    throw new Error('Error while deleting an image from AWS S3', err)
  }

  next()
}

const imageSrcSetPaths = (originalSrc, withDimension=true) => {

  /**
   * src filename example containing sizes: 
   * https://******.amazonaws.com/devtest/studio/wappizy_srcset:500*1000*1920.webp
   * 
   * example of filepath derived for a smaller image
   * https://******.amazonaws.com/thumbnails/devtest/studio/wappizy_w:500.webp
   * 
   */
  let srcSet = undefined

  const filePathParts = originalSrc.split("_srcset:") || originalSrc.split(encodeURIComponent("_srcset:"));
  const filenameextension = originalSrc.substring(originalSrc.lastIndexOf('.') + 1, originalSrc.length)
      
      if (filePathParts.length > 1) {
        const availableSizes = filePathParts[1].match(/\d+/g);
        const availableSizesQty = availableSizes?.length
        const rootPath = process.env.S3_ROOTPATH || ''
        srcSet = availableSizes && availableSizes
          .map((size, index) => {
            const re = filePathParts.length > 0 ? filePathParts[0].split(rootPath) : []
            const newpath = (index + 1) === availableSizesQty 
              ? `${originalSrc}${withDimension ? ` ${size}w` : ''}`
              : `${re[0]}thumbnails/${rootPath}${re[1]}_w:${size}.${filenameextension}${withDimension ? ` ${size}w` : ''}`
            
            return newpath
          })
      }
      
  return srcSet
}