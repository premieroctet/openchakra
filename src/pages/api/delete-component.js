import shellExec from 'shell-exec'
import shell from 'shelljs'

export default async function handler(req, res) {
  try {
    const response = shell.exec(`cd .. && bit remove ${req.body.path.substr(10)} -s`)
    res.status(200).json(response)
  } catch (err) {
    console.log(err)
  }
}
