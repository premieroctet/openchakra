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
  const project={
    pages:{[page.pageId]:page},
    activePage: page.pageId,
    rootPage: page.pageId,
    vesion: 2,
  }
  fs.writeFile(fileName, JSON.stringify(project, null, 2))
})
