import shell from 'shelljs'

export default async function handler(req, res) {
  try {
    const response = shell.exec(`cd .. && bit create tiui-react-oc ${req.body.path}`)
    res.status(200).json(response)
  } catch (err) {
    console.log(err)
  }
}
