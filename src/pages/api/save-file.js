import fs from 'fs'

export default function handler(req, res) {
  const fileName = req.body.path.split('/').slice(-1)[0]
  let fileArray = fileName.split('-')
  fileArray = fileArray.map(word => {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
  })
  const pascalName = fileArray.join('')
  const repoRoot = process.env.GITPOD_REPO_ROOT
  const repoName = repoRoot.split('/').slice(-1)[0]
  try {
    fs.writeFileSync(
      `${req.body.path}/${fileName}.oc.tsx`,
      req.body.codeBody,
      err => {
        if (err) throw err
        else {
          console.log('The file is updated with the given data')
        }
      },
    )
    fs.writeFileSync(
      `${req.body.path}/${fileName}.oc.json`,
      JSON.stringify(req.body.jsonBody),
      err => {
        if (err) throw err
        else {
          console.log('The file is updated with the given data')
        }
      },
    )
    fs.writeFileSync(
      `src/custom-components/editor/previews/${pascalName}Preview.oc.tsx`,
      req.body.previewBody,
      err => {
        if (err) throw err
        else {
          console.log('The file is updated with the given data')
        }
      },
    )
    fs.writeFileSync(
      `src/custom-components/inspector/panels/components/${pascalName}Panel.oc.tsx`,
      req.body.panelBody,
      err => {
        if (err) throw err
        else {
          console.log('The file is updated with the given data')
        }
      },
    )
  } catch (err) {
    console.log(err)
  }
}
