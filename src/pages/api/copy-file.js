import { promises as fs } from 'fs'

export default async function handler(req, res) {
  const customComponents = req.body
  try {
    const promises = Object.keys(customComponents).map(component => {
      return fs.copyFile(
        `${customComponents[component]}/${component}.tsx`,
        `src/custom-components/customOcTsx/${component}.tsx`,
      )
    })
    await Promise.all(promises)
    res.status(200).json({})
  } catch (err) {
    console.log(err)
  }
}
