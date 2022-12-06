import fs from 'fs'
import glob from 'glob'
import shell from 'shelljs'
import { convertToPascal } from '~components/editor/Editor'
import { generateOcTsxCode, generatePanel, generatePreview } from '~utils/code'

function getComponentWithLocation(path) {
  let arr = path.split('/')
  let comp = arr.pop()
  comp = comp.split('.')[0]
  let dir = arr.join('/')
  return { comp, dir }
}

async function getJsons() {
  let jsons = {}
  const files = glob.sync(`../remote/**/*.oc.json`, {})
  const themeJsonPath = glob.sync(`../remote/**/theme.json`, {})
  files?.forEach(element => {
    const { comp, dir } = getComponentWithLocation(element)
    jsons[comp] = dir
  })
  return { jsons, themeJsonPath: themeJsonPath[0] }
}

export default async function handler(req, res) {
  // 1. load initial components with paths & themeJson Path
  const { jsons, themeJsonPath } = await getJsons()

  // 2 Write files for initial components
  try {
    Object.keys(jsons).map(async component => {
      // 2.1 Read json
      const fileContent = fs.readFileSync(
        `${jsons[component]}/${component}.oc.json`,
        { encoding: 'utf-8' },
      )
      const json = JSON.parse(fileContent)

      // 2.2 Generate preview, panel and ocTsxCode
      const componentName = convertToPascal(component)
      const [previewCode, panelCode, ocTsxCode] = await Promise.all([
        generatePreview(json, componentName, component),
        generatePanel(json, componentName),
        generateOcTsxCode(json, jsons),
      ])

      // 2.3 Create symlink
      shell.ln(
        '-sf',
        `../../../${jsons[component]}/${component}.tsx`,
        `src/custom-components/customOcTsx/${component}.tsx`,
      )

      // 2.4 Write the generated files
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
    })
    res.statusCode = 200
    res.json({ newComponentsList: jsons, themeJsonPath })
  } catch (err) {
    console.log(err)
    res.statusCode = 400
    res.json({ err })
  }
}
