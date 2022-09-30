import { uploadFile } from './s3'
import fs from 'fs'

describe('S3 test', () => {
  it('should send a file', () => {
    console.log(`Before call`)
    return fs.promises
      .readFile('/home/myalfred/Téléchargements/print.svg')
      .then(contents => {
        return uploadFile('print.svg', contents)
      })
      .then(res => {
        console.log(res)
        expect(1).toBe(1)
      })
  })
})
