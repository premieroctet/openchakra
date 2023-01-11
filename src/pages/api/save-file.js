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
    if (req.body.codeBody[0] !== '/') {
      await fs.writeFile(
        `src/custom-components/customOcTsx/${fileName}.oc.tsx`,
        req.body.ocTsxBody,
      )
    }
    const writeCode = fs.writeFile(
      `${req.body.path}/${fileName}.oc.tsx`,
      req.body.codeBody,
    )
    const writeJson = fs.writeFile(
      `${req.body.path}/${fileName}.oc.json`,
      JSON.stringify(req.body.jsonBody, null, 2),
    )
    const writePreview = fs.writeFile(
      `src/custom-components/editor/previews/${pascalName}Preview.oc.tsx`,
      req.body.previewBody,
    )
    const writePanel = fs.writeFile(
      `src/custom-components/inspector/panels/components/${pascalName}Panel.oc.tsx`,
      req.body.panelBody,
    )
    let fileContent = await fs.readFile(
      `${req.body.path}/${fileName}/index.tsx`,
      {
        encoding: 'utf-8',
      },
    )
    fileContent = fileContent.replace(
      `// 🚨 Your props contains invalid code\n`,
      '',
    )
    let mainArray = fileContent.split(
      '// Refs are declared in here do not edit content and comments\n',
    )
    mainArray[1] = `${req.body.refsBody}\n`
    let appArray = mainArray[2].split(
      `// ${pascalName}OC's props are updated automatically do not edit content and comments\n`,
    )
    appArray[1] = `${req.body.appBody}\n`
    mainArray[2] = appArray.join(
      `// ${pascalName}OC's props are updated automatically do not edit content and comments\n`,
    )
    fileContent = mainArray.join(
      '// Refs are declared in here do not edit content and comments\n',
    )
    fileContent = await formatCode(fileContent)
    const writeTSX = fs.writeFile(
      `${req.body.path}/${fileName}/index.tsx`,
      fileContent,
    )
    await Promise.all([
      writeCode,
      writeJson,
      writePreview,
      writePanel,
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
