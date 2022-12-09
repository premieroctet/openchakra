import shell from 'shelljs'
import { promises as fs } from 'fs'
import { convertToPascal } from '~components/editor/Editor'

export default async function handler(req, res) {
  const fileName = req.body.path.split('.').slice(-1)[0]
  const componentName = convertToPascal(fileName)
  try {
    const deletePreview = fs.unlink(
      `src/installed-components/${componentName}Preview.ic.tsx`,
    )
    await Promise.all([deletePreview])

    // shell.exec(`bit uninstall ${req.body.path}`)
    res.status(200).json(componentName)
  } catch (err) {
    console.log(err)
  }
}
