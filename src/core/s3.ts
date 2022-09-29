import AWS from 'aws-sdk'
import { s3Id, s3Secret } from '../../env.json'

AWS.config.update({ region: 'eu-west-3' })

const S3 = new AWS.S3({
  accessKeyId: s3Id,
  secretAccessKey: s3Secret,
})

console.log(`S3 is ${JSON.stringify(S3, null, 2)}`)

export const uploadFile = (filename: string, contents: any) => {
  console.log(`Will uplodad ${filename}`)
  // Setting up S3 upload parameters
  const params = {
    Bucket: 'my-alfred-data-test', // getDataModel(),
    Folder: 'test',
    Key: `pictures/${filename}`, // File name you want to save as in S3
    Body: contents,
  }

  // Uploading files to the bucket
  return S3.upload(params)
    .promise()
    .then(res => {
      console.log(`Uploaded file, got result ${JSON.stringify(res, null, 2)}`)
      return Promise.resolve(res)
    })
    .catch(err => {
      console.error(`Error during uploading ${err}`)
      return Promise.reject(err)
    })
}
