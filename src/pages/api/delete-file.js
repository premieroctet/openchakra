import fs from 'fs'

export default function handler(req, res) {
  const fileName = req.body.path.split('/').slice(-1)[0]
  let fileArray = fileName.split('-')
  fileArray = fileArray.map(word => {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
  })
  const pascalName = fileArray.join('').slice(0, -8)
  try {
    fs.rm(
      `../../../../../../.oc/previews/${pascalName}Preview.oc.tsx`,
      { recursive: true },
      err => {
        if (err) throw err
        else {
          console.log('The preview file has been deleted')
        }
      },
    )
    fs.rm(
      `../../../../../../.oc/panels/${pascalName}Panel.oc.tsx`,
      { recursive: true },
      err => {
        if (err) throw err
        else {
          console.log('The panel file has been deleted')
        }
      },
    )
  } catch (err) {
    console.log(err)
  }
}
