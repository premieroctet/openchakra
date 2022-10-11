import fs from 'fs'

export default function handler(req, res) {
  const fileName = req.body.path.split('/').slice(-1)[0]
  let fileArray = fileName.split('-')
  fileArray = fileArray.map(word => {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
  })
  const pascalName = fileArray.join('')
  try {
    fs.writeFileSync(
      `${req.body.path}/${fileName}.oc.tsx`,
      req.body.codeBody,
      err => {
        if (err) {
          res.statusCode = 400
          res.json({ message: 'bad request' })
          throw err
        }
      },
    )
    fs.writeFileSync(
      `${req.body.path}/${fileName}.oc.json`,
      JSON.stringify(req.body.jsonBody),
      err => {
        if (err) {
          res.statusCode = 400
          res.json({ message: 'bad request' })
          throw err
        }
      },
    )
    fs.writeFileSync(
      `src/custom-components/editor/previews/${pascalName}Preview.oc.tsx`,
      req.body.previewBody,
      err => {
        if (err) {
          res.statusCode = 400
          res.json({ message: 'bad request' })
          throw err
        }
      },
    )
    fs.writeFileSync(
      `src/custom-components/inspector/panels/components/${pascalName}Panel.oc.tsx`,
      req.body.panelBody,
      err => {
        if (err) {
          res.statusCode = 400
          res.json({ message: 'bad request' })
          throw err
        }
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
