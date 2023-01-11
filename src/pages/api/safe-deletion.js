import fs from 'fs'
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
  const files = glob.sync(`../remote/**/*.oc.json`, {})
  const themeJsonPath = glob.sync(`../remote/**/theme.json`, {})
  files?.forEach(element => {
    const { comp, dir } = getComponentWithLocation(element)
    jsons[comp] = dir
  })
  return { jsons }
}

export default async function handler(req, res) {
let listUsed = []
const componentDelete = req.body.componentDelete;
const { jsons } = await getJsons()
Object.keys(jsons).map(async component => {
    const fileContent = fs.readFileSync(
      `${jsons[component]}/${component}.oc.json`,
      { encoding: 'utf-8' },
    )
    let result = fileContent.toLowerCase().includes(componentDelete.toLowerCase());
    if(result){
        listUsed.push(component);
    }
})

  try {
    res.statusCode = 200
    res.json({ listUsed })
  } catch (err) {
    console.log(err)
    res.statusCode = 400
    res.json({ err })
  }
}
