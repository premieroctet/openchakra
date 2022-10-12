import { promises as fs } from 'fs'

export default async function handler(req, res) {
  const fileName = req.body.path.split('/').slice(-1)[0]
  let fileArray = fileName.split('-')
  fileArray = fileArray.map(word => {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
  })
  const pascalName = fileArray.join('')

  try {
    console.log('Updating files...')
    const writeCode = fs.writeFile(
      `${req.body.path}/${fileName}.oc.tsx`,
      req.body.codeBody,
    )
    const writeJson = fs.writeFile(
      `${req.body.path}/${fileName}.oc.json`,
      JSON.stringify(req.body.jsonBody),
    )
    const writePreview = fs.writeFile(
      `src/custom-components/editor/previews/${pascalName}Preview.oc.tsx`,
      req.body.previewBody,
    )
    const writePanel = fs.writeFile(
      `src/custom-components/inspector/panels/components/${pascalName}Panel.oc.tsx`,
      req.body.panelBody,
    )
    const writeOcTsx = fs.writeFile(
      `src/custom-components/test/${fileName}.oc.tsx`,
      req.body.codeBody,
    )
    await Promise.all([
      writeCode,
      writeJson,
      writePreview,
      writePanel,
      writeOcTsx,
    ])
    console.log('Files updated')
    res.status(200).json({})
  } catch (err) {
    console.log(err)
  }
}
