const lodash=require('lodash')
const fs=require('fs')

const SEPARATOR=';'
const PATTERN=/alfredplace/

const filename=process.argv[2]
if (!filename) {
  console.error(`Attendu: node ${process.argv[1]} <json_project_file>`)
  process.exit(1)
}

const contents=fs.readFileSync(process.argv[2])
const data=JSON.parse(contents)

const pages=lodash(data.pages)
  // Keep pages containing PATTERN
  .pickBy(value => PATTERN.test(JSON.stringify(value)))
  // Keep components containing PATTERN
  .mapValues(page => ({
    pageName: page.pageName,
    components:lodash(page.components)
    .pickBy(v => PATTERN.test(JSON.stringify(v))).value()}))
    .mapValues(page => ({
      ...page,
      components:lodash(page.components)
        .pickBy(comp => PATTERN.test(JSON.stringify(comp)))
        .mapValues(comp => ({props: lodash(comp.props).pickBy(v => PATTERN.test(JSON.stringify(v))).value()}))
      .value()}))
    .values()
    .value()


// Print csv
console.log('page composant propriété valeur'.split(' ').join(SEPARATOR))
pages.map(p => {
  Object.entries(p.components).map(([compName,{props}]) => {
    Object.entries(props).map(([propName, propValue]) => {
      console.log([p.pageName,compName,propName,propValue].join(SEPARATOR))
    })
  })
})
