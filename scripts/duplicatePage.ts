//Run : tsc scripts/duplicatePage.ts  && node scripts/duplicatePage.js

const fs = require('fs').promises
import { generateId } from '../src/utils/generateId'
const lodash = require('lodash')

const replaceId = (data, oldId, newId) => {
  console.log(`Replace ${oldId} with ${newId}`)
  const stringData = JSON.stringify(data).replace(new RegExp(oldId, 'g'), newId)
  return JSON.parse(stringData)
}

const duplicatePage = page => {
  console.log(Object.keys(page.components))
  return {...replaceId(page, page.pageId, generateId('page')),
    components: lodash.fromPairs(page.components.map(comp => {
      const newId=generateId('comp')
      return [newId, replaceId(comp, comp.id, newId)]
    }))
  }
}

const mergeProjects = (projects:any[]) => {
  console.log(`Merging projects`)
  const newProject={activePage:null, rootPage:null, pages:{}}
  projects.forEach( p => {
    Object.values(p.pages).forEach(page => {
      const copy=duplicatePage(page)
      newProject.pages[copy.id]=copy
    })
    newProject.activePage=p.activePage
    newProject.rootPage=p.rootPage
  })
  console.log(`Merged projects`)
  return newProject
}

const merge = (filenames:string[]) => {
  return Promise.all(filenames.map(filename => fs.readFile(filename).then(contents => JSON.parse(contents))))
    .then(projects=> mergeProjects(projects))
    .then(mergedProject => {
      const mergedFileName=`${filenames[0]}.merge.json`
      return fs.writeFile(mergedFileName, JSON.stringify(mergedProject))
    })
}

const ACTIONS = {
  merge: merge,
}

const action = process.argv[2]

const filenames = process.argv.slice(3)

if (!(action in ACTIONS)) {
  throw new Error(`Action ${action} inconnue, attendue:${Object.keys(ACTIONS)}`)
}

if (filenames.length == 0) {
  throw new Error(`No filenames in parameters`)
}

ACTIONS[action](filenames)
  .then(() => console.log('OK'))
  .catch(err => console.trace(`Erreur ${err}`))
