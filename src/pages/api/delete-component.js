import shellExec from 'shell-exec'
import shell from 'shelljs'

export default async function handler(req, res) {
  try {
    // const response = await shellExec('bit --version')
    const response2 = shell.exec(`cd .. && bit remove ${req.body.path.substr(10)} -s`)
    res.status(200).json({
      //   response,
      response2,
    })
  } catch (err) {
    console.log(err)
  }
}
