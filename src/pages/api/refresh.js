import glob from 'glob'

function getPair(path) {
  let arr = path.split('/')
  let comp = arr.pop()
  comp = comp.split('.')[0]
  let dir = arr.join('/')
  return { comp, dir }
}

async function getJsons() {
  let jsons = {}
  const files = glob.sync(
    'src/custom-components/inspector/panels/components/**/*.tsx',
    {},
  )
  files.forEach(element => {
    const { comp, dir } = getPair(element)
    jsons[comp] = dir
  })
  return jsons
}

export default async function handler(req, res) {
  const jsons = await getJsons()
  res.status(200).json(jsons)
}
