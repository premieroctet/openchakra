import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const basePath = '../../../../src/custom-components/editor/previews/'
  console.log(process.cwd())
  console.log(__dirname)
  console.log(__filename)
  try {
    // const files = fs.readdirSync(path.join(__dirname, basePath))
    const files = fs.readdirSync(
      'src/custom-components/inspector/panels/components/',
    )
    let jsons = {}
    files.forEach(element => {
      if (element.slice(-8) === '.oc.json') {
        console.log(element)
      }
      jsons[element] = 1
    })
    res.status(200).json(jsons)
  } catch (err) {
    console.log(err)
  }
}
