import { uploadFile } from './s3'
import fs from 'fs'

describe('S3 test', () => {
  it('should send a file', () => {
    console.log(`Before call`)
    return fs.promises
      .readFile('/Users/seb/Downloads/IMG_46701002.jpg')
      .then(contents => {
        return uploadFile('image.jpg', contents)
      })
      .then(res => {
        console.log(res)
        expect(1).toBe(1)
      })
  })
})
