import shell from 'shelljs'

export default async function handler(req, res) {
  const customComponents = req.body
  try {
    Object.keys(customComponents).map(component => {
      let response = shell.ln(
        '-sf',
        `../../../${customComponents[component]}/${component}.tsx`,
        `src/custom-components/customOcTsx/${component}.tsx`,
      )
    })

    res.status(200).json(response)
  } catch (err) {
    console.log(err)
  }
}
