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

  next()
}