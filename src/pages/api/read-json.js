import fs from 'fs'

export default function handler(req, res) {
  const fileName = req.body.path.split('/').slice(-1)[0]
  try {
    const fileContent = fs.readFileSync(
      `${req.body.path}/${fileName}.oc.json`,
      { encoding: 'utf-8' },
    )
    res.status(200).json({ content: fileContent })
  } catch (err) {
    console.log(err)
    res.statusCode = 400
    res.json({ message: 'bad request' })
  }
}
