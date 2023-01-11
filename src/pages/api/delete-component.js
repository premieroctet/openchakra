import shell from 'shelljs'
import { promises as fs } from 'fs'
import { convertToPascal } from '~components/editor/Editor'

export default async function handler(req, res) {
  const fileName = req.body.path.split('/').slice(-1)[0]
  const componentName = convertToPascal(req.body.path)
  try {
    const deletePreview = fs.unlink(
      `src/custom-components/editor/previews/${componentName}Preview.oc.tsx`,
    )
    const deletePanel = fs.unlink(
      `src/custom-components/inspector/panels/components/${componentName}Panel.oc.tsx`,
    )
    const deleteTsx = fs.unlink(`src/custom-components/customOcTsx/${fileName}`)
    const deleteOcTsx = fs.unlink(
      `src/custom-components/customOcTsx/${fileName}.oc.tsx`,
    )
    await Promise.all([deletePreview, deletePanel, deleteTsx, deleteOcTsx])
    const response = shell.exec(
      `cd .. && bit remove ${req.body.path.substr(10)} -fs`,
    )
    res.status(200).json(response)
  } catch (err) {
    console.log(err)
  }
}
