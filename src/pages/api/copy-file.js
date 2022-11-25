import { promises as fs } from 'fs'
import shell from 'shelljs'

export default async function handler(req, res) {
  const customComponents = req.body
  try {
    // const promises = Object.keys(customComponents).map(component => {
    //   return fs.copyFile(
    //     `${customComponents[component]}/${component}.tsx`,
    //     `src/custom-components/customOcTsx/${component}.tsx`,
    //   )
    // })
    // await Promise.all(promises)

    Object.keys(customComponents).map(component => {
      let response2 = shell.ln(
        '-sf',
        `../../../${customComponents[component]}/${component}.tsx`,
        `src/custom-components/customOcTsx/${component}.tsx`,
      )
    })

    res.status(200).json({})
  } catch (err) {
    console.log(err)
  }
}
