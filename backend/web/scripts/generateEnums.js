const lodash=require('lodash')
const {normalize}=require('../utils/text')

const typeName=normalize(process.argv[2]).replace(/ /g, '_').toUpperCase()
const values=process.argv.slice(3)
const constants=values.map(v => `${typeName}_${normalize(v).replace(/ /g, '_').toUpperCase()}`)

const pairs=lodash.zip(constants, values)

pairs.map(([constant]) => console.log(`const ${constant}="${constant}"`))

console.log(`\nconst ${typeName}={`)
pairs.map(([constant, value]) => console.log(`\  [${constant}]:"${value}",`))
console.log('}')
