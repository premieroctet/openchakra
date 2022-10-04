//Run : tsc scripts/duplicatePage.ts  && node scripts/duplicatePage.js

const fs = require('fs').promises
import { generateId } from '../src/utils/generateId'
const lodash = require('lodash')

const replaceId = (data, oldId, newId) => {
  const stringData = JSON.stringify(data).replace(new RegExp(oldId, 'g'), newId)
  return JSON.parse(stringData)
}

const duplicatePage = (page, copies) => {
  return [...Array(copies - 1)].map((_, idx) => {
    const newId = generateId('page')
    const newPage = replaceId(page, page.pageId, newId)
    newPage.pageName = `${newPage.pageName}-${idx + 1}`
    return newPage
  })
}

const duplicateProject = (fileName: string, copies: Number) => {
  fs.readFile(fileName).then((contents: Buffer) => {
    const data = JSON.parse(contents.toString())
    Object.values(data.pages).forEach(page => {
      const newPages = duplicatePage(page, copies)
      newPages.forEach(p => {
        data.pages[p.pageId] = p
      })
    })
    const outputFilename = `${fileName}.${copies}-copies.json`
    return fs.writeFile(outputFilename, JSON.stringify(data, null, 2))
  })
}

const merge = (fileNames: string[], copies: Number | null) => {
  return Promise.all(
    fileNames.map(f =>
      fs.readFile(f).then(contents => JSON.parse(contents.toString())),
    ),
  ).then(datas => {
    if (datas.some(d => Object.keys(d.pages).length > 1)) {
      throw new Error('Trop de pages')
    }
    const duplicatedDatas = lodash.flatten(
      datas.map((data, index) => {
        const oldId = Object.keys(data.pages)[0]
        const newDatas = [...Array(copies)].map(_ => {
          const newId = generateId('page')
          const newData = replaceId(data, oldId, newId)
          console.log(Object.values(newData.pages)[0])
          Object.values(newData.pages)[0]['rootPage'] = index == 0
          return newData
        })
        return newDatas
      }),
    )
    const firstPageId = Object.keys(duplicatedDatas[0].pages)[0]
    const result = { pages: {}, activePage: firstPageId, rootPage: firstPageId }
    duplicatedDatas.forEach(
      d => (result.pages[Object.keys(d.pages)[0]] = Object.values(d.pages)[0]),
    )
    const outputFilename = `${fileNames[0]}.project.json`
    return fs.writeFile(outputFilename, JSON.stringify(result, null, 2))
  })
}

const ACTIONS = {
  merge: merge,
  // Multiple merge
  mmerge: merge,
  duplicate: (filenames: string[], copies: Number) =>
    duplicateProject(filenames[0], copies),
}

const action = process.argv[2]
const copiesRequired = ['mmerge', 'duplicate'].includes(action)

const copies = copiesRequired ? parseInt(process.argv[3]) : undefined
const filenames = process.argv.slice(copiesRequired ? 4 : 3)

console.log(copies, filenames)

if (!(action in ACTIONS)) {
  throw new Error(`Action ${action} inconnue, attendue:${Object.keys(ACTIONS)}`)
}

if (filenames.length == 0) {
  throw new Error(`No filenames in parameters`)
}

ACTIONS[action](filenames, copies)
