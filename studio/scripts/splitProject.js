const fs = require('fs').promises

const projectFile=process.argv[2]
if (!projectFile) {
  console.error(`Usage: ${process.argv.slice(0,2).join(' ')} <project.json>`)
  process.exit(1)
}

const project=require(projectFile)

Object.values(project.pages).forEach(page => {
  const fileName=`./${page.pageName}-${page.pageId}.json`
  console.log(fileName)
  fs.writeFile(fileName, JSON.stringify(page, null, 2))
})
