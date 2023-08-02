const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_REGION',
})

const s3 = new AWS.S3()

exports.sendS3files = async(req, res, next) => {
  if (!req.documents) { return next() }

  const documentsToSend = req.documents.map(document => {
    return new Promise(async(resolve, reject) => {

      const params = {
        Bucket: 'YOUR_BUCKET_NAME',
        Key: `${req.file.filename}`,
        Body: document,
        ContentType: req.file.mimetype,
        ACL: 'public-read',
      }

      const result = await s3.upload(params).promise()
      resolve(result)
    })
  })

  await Promise.all(documentsToSend)

  next()
}
