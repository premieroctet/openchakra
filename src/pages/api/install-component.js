import shell from 'shelljs'
import fs from 'fs'

export default async function handler(req, res) {
  const componentPath = req.body.path
  const component = req.body.path?.split('/').slice(-1)[0]
  try {
    // 1. Bit Install component
    shell.exec(`cd .. && bit install ${req.body.path}`)

    // 2. Read json
    const fileContent = fs.readFileSync(
      `../remote/${req.body.path}/${component}.oc.json`,
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
      `../../../../remote/${req.body.path}/${component}.tsx`,
      `src/custom-components/customOcTsx/${component}.tsx`,
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

    res.status(200).json('success')
  } catch (err) {
    console.log(err)
    res.status(400).json({ err })
  }
}
