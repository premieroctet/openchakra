//Run : tsc scripts/duplicatePage.ts  && node scripts/duplicatePage.js

const fs = require('fs').promises
import { generateId } from '../src/utils/generateId'

const replaceId = (data, oldId, newId) => {
  const stringData = JSON.stringify(data).replace(new RegExp(oldId, 'g'), newId)
  return JSON.parse(stringData)
}

const duplicate = (fileNames: string[]) => {
  const duplicateOne = (fileName: string) =>
    fs.readFile(fileName).then((contents: Buffer) => {
      const data = JSON.parse(contents.toString())
      if (Object.keys(data.pages).length != 1) {
        return console.log('trop de pages')
      }
      const oldId = data.activePage
      const newId = generateId('page')
      const newData = replaceId(data, oldId, newId)
      const newFileName = fileName.replace('.json', `.${newId}.json`)
      return fs.writeFile(newFileName, JSON.stringify(newData))
    })
  return Promise.all(fileNames.map(duplicateOne))
}

const merge = (fileNames: string[]) => {
  return Promise.all(
    fileNames.map(f =>
      fs.readFile(f).then(contents => JSON.parse(contents.toString())),
    ),
  ).then(datas => {
    if (datas.some(d => Object.keys(d.pages).length > 1)) {
      throw new Error('Trop de pages')
    }
    const duplicatedDatas = datas.map((data, index) => {
      const oldId = Object.keys(data.pages)[0]
      const newId = generateId('page')
      const newData = replaceId(data, oldId, newId)
      console.log(Object.values(newData.pages)[0])
      Object.values(newData.pages)[0]['rootPage'] = index == 0
      return newData
    })
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
  duplicate: duplicate,
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
