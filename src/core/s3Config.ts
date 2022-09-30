export const s3Config = {
  bucketName: 'my-alfred-data-test',
  region: 'eu-west-3',
  accessKeyId: process.env.NEXT_PUBLIC_S3_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET,
}
