import AWS from 'aws-sdk'
import { s3Config } from './s3Config'
import mime from 'mime-types'

export type ListFileResponse = {
  message: string
  data: AWS.S3.ListObjectsOutput
}

export type ListFileErrorResponse = {
  err: string
  errMessage: string
  data: any
}


const S3 = new AWS.S3(s3Config)
AWS.config.update({ region: 'eu-west-3' })



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
export const deleteFile = (url: string) => {
  // Setting up S3 upload parameters
  const params = {
    Bucket: 'my-alfred-data-test',
    Key: url, // File name you want to delete as in S3
  }

  // Uploading files to the bucket
  return S3.deleteObject(params)
    .promise()
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export const listFiles = async () => {
  const awsConfig = (({ region, accessKeyId, secretAccessKey }) => ({
    region,
    accessKeyId,
    secretAccessKey,
  }))(s3Config)
  AWS.config.update(awsConfig)

  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
      Bucket: s3Config.bucketName,
    },
  })

  const url: string = `https://${s3Config.bucketName}.s3-${s3Config.region}.amazonaws.com`

  try {
    const req = await s3
      .listObjectsV2({
        Bucket: s3Config.bucketName,
      })
      .promise()

    if (req.$response.error) {
      return Promise.reject<ListFileErrorResponse>({
        err: req.$response.error.name,
        errMessage: req.$response.error.message,
        data: req.$response.error,
      })
    }

    if (!req.$response.data) {
      return Promise.reject<ListFileErrorResponse>({
        err: 'Something went wrong!',
        errMessage: 'Unknown error occured. Please try again',
        data: null,
      })
    }

    return Promise.resolve<ListFileResponse>({
      message: 'Objects listed succesfully',
      data: {
        ...req.$response.data,
        Contents: req.$response.data.Contents?.map(e => ({
          ...e,
          publicUrl: `${url}/${e.Key}`,
        })),
      },
    })
  } catch (err) {
    return Promise.reject<ListFileErrorResponse>({
      err: 'Something went wrong!',
      errMessage: 'Unknown error occured. Please try again',
      data: err,
    })
  }
}
