import shell from 'shelljs'
import fs from 'fs'
import { convertToPascal } from '~components/editor/Editor'
import { generateOcTsxCode, generatePanel, generatePreview } from '~utils/code'

export default async function handler(req, res) {
  const component = req.body.path
  const repoName = shell.exec('REPO=${PWD%/*} && echo -n ${REPO##*/}').stdout
  const componentPath = `${repoName}/${component}`

  try {
    // 1. Create bit component
    shell.exec(`cd .. && bit create tiui-react-oc ${componentPath}`)

    // 2. Read json
    const fileContent = fs.readFileSync(
      `../remote/${componentPath}/${component}.oc.json`,
      { encoding: 'utf-8' },
    )
    const json = JSON.parse(fileContent)

    // 2.3 Generate preview, panel and ocTsxCode
    const componentName = convertToPascal(component)
    const [previewCode, panelCode, ocTsxCode] = await Promise.all([
      generatePreview(json, componentName, component),
      generatePanel(json, componentName),
      generateOcTsxCode(json),
    ])

    // 2.4 Create symlink
    shell.ln(
      '-sf',
      `../../../../remote/${componentPath}/${component}`,
      `src/custom-components/customOcTsx/${component}`,
    )

    // 2.5 Write the generated files
    const writePreview = fs.promises.writeFile(
      `src/custom-components/editor/previews/${componentName}Preview.oc.tsx`,
      previewCode,
    )
    const writePanel = fs.promises.writeFile(
      `src/custom-components/inspector/panels/components/${componentName}Panel.oc.tsx`,
      panelCode,
    )
    const writeOcTsx = fs.promises.writeFile(
      `src/custom-components/customOcTsx/${component}.oc.tsx`,
      ocTsxCode,
    )
    await Promise.all([writePreview, writePanel, writeOcTsx])

    res.status(200).json(componentPath)
  } catch (err) {
    console.log(err)
    res.status(400).json({ err })
  }
}
