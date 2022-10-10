import glob from 'glob'

function getComponentWithLocation(path) {
  let arr = path.split('/')
  let comp = arr.pop()
  comp = comp.split('.')[0]
  let dir = arr.join('/')
  return { comp, dir }
}

async function getJsons() {
  let jsons = {}
  // TODO: Change this later to the root without any dependecy on gitpod.yml, BIT or tiui-react-oc
  const repoName = process.env.GITPOD_REPO_ROOT.split('/').slice(-1)[0]
  const files = glob.sync(`../remote/${repoName}/**/*.oc.json`, {})
  files.forEach(element => {
    const { comp, dir } = getComponentWithLocation(element)
    jsons[comp] = dir
  })
  return jsons
}

export default async function handler(req, res) {
  const jsons = await getJsons()
  res.status(200).json(jsons)
}
