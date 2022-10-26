import { promises as fs } from 'fs'
import { formatCode } from '~utils/code'

export default async function handler(req, res) {
  const fileName = req.body.path.split('/').slice(-1)[0]
  let fileArray = fileName.split('-')
  fileArray = fileArray.map(word => {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
  })
  const pascalName = fileArray.join('')

  try {
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
      `src/custom-components/customOcTsx/${fileName}.oc.tsx`,
      req.body.ocTsxBody,
    )
    let fileContent = await fs.readFile(`${req.body.path}/${fileName}.tsx`, {
      encoding: 'utf-8',
    })
    let mainArray = fileContent.split(
      '// Refs are declared in here do not edit content and comments\n',
    )
    mainArray[1] = `${req.body.refsBody}\n`
    let appArray = mainArray[2].split(
      `// ${pascalName}Oc's props are updated automatically do not edit content and comments\n`,
    )
    appArray[1] = `${req.body.appBody}\n`
    mainArray[2] = appArray.join(
      `// ${pascalName}Oc's props are updated automatically do not edit content and comments\n`,
    )
    fileContent = mainArray.join(
      '// Refs are declared in here do not edit content and comments\n',
    )
    fileContent = await formatCode(fileContent)
    const writeTSX = fs.writeFile(
      `${req.body.path}/${fileName}.tsx`,
      fileContent,
    )
    await Promise.all([
      writeCode,
      writeJson,
      writePreview,
      writePanel,
      writeOcTsx,
      writeTSX,
    ])
    res.statusCode = 200
    res.json({ message: 'success' })
  } catch (err) {
    console.log(err)
    res.statusCode = 400
    res.json({ message: 'bad request' })
  }
}
