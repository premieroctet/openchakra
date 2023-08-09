const AWS = require('aws-sdk')
const {S3_ID,
  S3_SECRET,
  S3_REGION,
  S3_BUCKET,
} = require('../../mode')

AWS.config.update({
  accessKeyId: S3_ID,
  secretAccessKey: S3_SECRET,
  region: S3_REGION,
})

const s3 = new AWS.S3()

exports.sendFilesToAWS = async(req, res, next) => {
  if (!req.body.documents) { return next() }

  const documentsToSend = req.body.documents.map(document => {
    return new Promise(async(resolve, reject) => {
      const params = {
        Bucket: S3_BUCKET,
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
