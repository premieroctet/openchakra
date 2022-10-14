import { promises as fs } from 'fs'

export default async function handler(req, res) {
  const fileName = req.body.path.split('/').slice(-1)[0]
  let fileArray = fileName.split('-')
  fileArray = fileArray.map(word => {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
  })
  const pascalName = fileArray.join('')
  try {
    console.log('Deleting files...')
    const deletePreview = fs.unlink(
      `src/custom-components/editor/previews/${pascalName}Preview.oc.tsx`,
    )
    const deletePanel = fs.unlink(
      `src/custom-components/inspector/panels/components/${pascalName}Panel.oc.tsx`,
    )
    const deleteTsx = fs.unlink(`src/custom-components/test/${fileName}.tsx`)
    const deleteOcTsx = fs.unlink(
      `src/custom-components/test/${fileName}.oc.tsx`,
    )

    await Promise.all([deletePreview, deletePanel, deleteTsx, deleteOcTsx])
    res.statusCode = 200
    res.json({ message: 'success' })
  } catch (err) {
    console.log(err)
    res.statusCode = 400
    res.json({ message: 'bad request' })
  }
}
