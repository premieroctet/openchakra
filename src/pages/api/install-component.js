import shell from 'shelljs'
import fs from 'fs'
import { convertToPascal } from '~components/editor/Editor'
import { generateICPreview } from '../../utils/code'

export default async function handler(req, res) {
  const componentPath = req.body.path
  const componentName = convertToPascal(componentPath.split('.').slice(-1)[0])

  try {
    // 1. Bit Install component
    shell.exec(`cd .. && bit install ${req.body.path}`)

    // 2.1 Generate preview code

    const previewCode = await generateICPreview(componentName, componentPath)
    console.log(previewCode)

    // 2.2 Write the generated file
    fs.writeFileSync(
      `src/installed-components/${componentName}Preview.ic.tsx`,
      previewCode,
    )

    // 2.3 Write to installedList.json file
    let installedList = fs.readFileSync(
      'src/installed-components/installedList.json',
      'utf-8',
    )
    installedList = JSON.parse(installedList)
    installedList[componentName] = componentPath
    fs.writeFileSync(
      'src/installed-components/installedList.json',
      JSON.stringify(installedList, null, 2),
      'utf-8',
    )

    shell.exec(`rm pnpm-lock.yaml`)
    shell.exec(`pnpm i ${req.body.path}`)

    res.status(200).json(componentName)
  } catch (err) {
    console.log(err)
    res.status(400).json({ err })
  }
}
