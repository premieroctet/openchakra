import fs from 'fs'

export default function handler(req, res) {
  const fileName = req.body.path.split('/').slice(-1)[0]
  let fileArray = fileName.split('-')
  fileArray = fileArray.map(word => {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
  })
  const pascalName = fileArray.join('')
  try {
    console.log('Deleting files...')
    fs.rm(
      `src/custom-components/editor/previews/${pascalName}Preview.oc.tsx`,
      { recursive: true },
      err => {
        if (err) throw err
      },
    )
    fs.rm(
      `src/custom-components/inspector/panels/components/${pascalName}Panel.oc.tsx`,
      { recursive: true },
      err => {
        if (err) throw err
      },
    )
    res.statusCode = 200
    res.json({ message: 'success' })
  } catch (err) {
    console.log(err)
    res.statusCode = 400
    res.json({ message: 'bad request' })
  }
}
