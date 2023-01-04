import shell from 'shelljs'

export default async function handler(req, res) {
  try {
    shell.exec(
      `cd ../.. && bash scripts/release.sh <<< "${req.body.message}"`,
      { shell: '/bin/bash' },
    )

    res.status(200).json(req.body.message)
  } catch (err) {
    console.log(err)
    res.status(400).json({ err })
  }
}
