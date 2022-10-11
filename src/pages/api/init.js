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
      `src/custom-components/editor/previews/${pascalName}Preview.oc.tsx`,
      req.body.previewBody,
      err => {
        if (err) throw err
      },
    )
    fs.writeFileSync(
      `src/custom-components/inspector/panels/components/${pascalName}Panel.oc.tsx`,
      req.body.panelBody,
      err => {
        if (err) throw err
      },
    )
    res.status(200)
  } catch (err) {
    console.log(err)
    res.status(400)
  }
}
