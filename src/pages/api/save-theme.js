import fs from 'fs'

export default async function handler(req, res) {
  try {
    fs.writeFileSync(
      req.body.themePath,
      JSON.stringify(req.body.themeState, null, 2),
    )
    res.statusCode = 200
    res.json({ message: 'success' })
  } catch (err) {
    console.log(err)
    res.statusCode = 400
    res.json({ message: 'bad request' })
  }
}
