import { promises as fs } from 'fs'

export default async function handler(req, res) {
  const fileName = req.body.path.split('/').slice(-1)[0]
  let fileArray = fileName.split('-')
  fileArray = fileArray.map(word => {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
  })
  const pascalName = fileArray.join('')
  try {
    const writePreview = fs.writeFile(
      `src/custom-components/editor/previews/${pascalName}Preview.oc.tsx`,
      req.body.previewBody,
    )
    const writePanel = fs.writeFile(
      `src/custom-components/inspector/panels/components/${pascalName}Panel.oc.tsx`,
      req.body.panelBody,
    )
    await Promise.all([writePreview, writePanel])
    res.statusCode = 200
    res.json({ message: 'success' })
  } catch (err) {
    console.log(err)
    res.statusCode = 400
    res.json({ message: 'bad request' })
  }
}
