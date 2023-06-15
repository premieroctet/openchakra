const lodash=require('lodash')
const fs=require('fs')
// Generate new Id
const generateId = (prefix = 'comp') => {
  return `${prefix}-${(
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2, 5)
  ).toUpperCase()}`
}

// Update ids in data
const replaceId = (oldId, newId, data) => {
  const dataStr=JSON.stringify(data)
  const replacedDataStr=dataStr.replace(new RegExp(oldId, 'g'), newId)
  const replacedData=JSON.parse(replacedDataStr)
  return replacedData
}

const clonePage = page => {
  const compIds=Object.keys(lodash.omit(page.components, ['root']))
  compIds.forEach(compId => {
    page=replaceId(compId, generateId('comp'), page)
  })
  return page
}
const [compProjectPath, projectPath]=process.argv.slice(2)

if (!compProjectPath || !projectPath) {
  console.error(`Usage: ${process.argv.slice(0, 2).join(' ')} <component_project.json> <project.json>`)
  process.exit(1)
}

const [compProject, project]=process.argv.slice(2).map(p => require(p))

const pages=compProject.pages
if (Object.keys(pages).length!=1) {
  console.error(`${compProjectPath}: expecting one page only`)
  process.exit(1)
}

const onlyPage=Object.values(pages)[0]
const components=onlyPage.components
const root=components.root
if (root.children.length!=1) {
  console.error(`${compProjectPath}: root component must have exactly one child component`)
  process.exit(1)
}
// Root component to copy
const rootComponentId=root.children[0]
// All components to copy
const copyComponents=lodash.omit(components, ['root'])

// Project: iterate pages and insert copied components into each root's one
console.log(JSON.stringify(project).length)
Object.values(project.pages).forEach(p => {
  const clonedPage=clonePage(onlyPage)
  p.components={...p.components, ...lodash.omit(clonedPage.components, ['root'])}
  p.components.root.children=[clonedPage.components.root.children[0], ...p.components.root.children]
})

console.log(project)

fs.writeFileSync('result.json', JSON.stringify(project, null, 2))
