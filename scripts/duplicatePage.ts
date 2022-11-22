//Run : tsc scripts/duplicatePage.ts  && node scripts/duplicatePage.js

import { duplicatePageImpl } from '../src/core/models/project'

const fs = require('fs').promises
import { generateId } from '../src/utils/generateId'
const lodash = require('lodash')

const mergeProjects = (projects: any[]) => {
  console.log(`Merging projects`)
  const newProject = { activePage: null, rootPage: null, pages: {} }
  projects.forEach(p => {
    Object.values(p.pages).forEach(page => {
      const copy = duplicatePageImpl(page)
      newProject.pages[copy.id] = copy
    })
    newProject.activePage = p.activePage
    newProject.rootPage = p.rootPage
  })
  console.log(`Merged projects`)
  return newProject
}

const merge = (filenames: string[]) => {
  return Promise.all(
    filenames.map(filename =>
      fs.readFile(filename).then(contents => JSON.parse(contents)),
    ),
  )
    .then(projects => mergeProjects(projects))
    .then(mergedProject => {
      const mergedFileName = `${filenames[0]}.merge.json`
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
