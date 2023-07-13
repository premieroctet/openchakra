const fs = require('fs').promises

const originalFile=process.argv[2]
const toMergeFile=process.argv[3]
if (!originalFile || !toMergeFile) {
  console.error(`Usage: ${process.argv.slice(0,2).join(' ')} <original_project.json> <merge_project.json`)
  process.exit(1)
}

const original=require(originalFile)
const toMerge=require(toMergeFile)


const result={
  ...original,
  pages: {
    ...original.pages,
    ...toMerge.pages,
  }
}

console.log(JSON.stringify(result, null, 2))
