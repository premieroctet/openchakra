import AWS from 'aws-sdk'
import { s3Id, s3Secret } from '../../env.json'
import mime from 'mime-types'

AWS.config.update({ region: 'eu-west-3' })

const S3 = new AWS.S3({
  accessKeyId: s3Id,
  secretAccessKey: s3Secret,
})

//console.log(`S3 is ${JSON.stringify(S3, null, 2)}`)

export const uploadFile = (filename: string, contents: any) => {
  // Setting up S3 upload parameters
  const params = {
    Bucket: 'my-alfred-data-test', // getDataModel(),
    Key: `pictures/${filename}`, // File name you want to save as in S3
    ContentType: mime.lookup(filename),
    Body: contents,
  }

  // Uploading files to the bucket
  return S3.upload(params)
    .promise()
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}
