const fs=require('fs').promises
const _=require('lodash')
/**
  Creates CSS from configurations
  config : {classname, attributes:{name,value}}
*/
createUIConfiguration = configuration => {
  console.log(`Configuration:${JSON.stringify(configuration)}`)
  fs.open('static/assets/css/custom.css', 'w')
    .then(handle => {
      configuration.forEach(config => {
        const simpleAtt = config.attributes.filter(att => !(att.name.includes('.')))
        const subClasses = _.groupBy(config.attributes.filter(att => att.name.includes('.')), att => att.name.split('.')[0])
        console.log(JSON.stringify(subClasses, null, 2))
        handle.write(`.${config.className} {\n`)
        simpleAtt.forEach(attribute => {
          handle.write(`\t${attribute.name}: ${attribute.value};\n`)
        })
        handle.write('}\n')
        // Subclasses => il y a un menu
        Object.keys(subClasses).forEach(subClass => {
          const attributes=subClasses[subClass]
          handle.write(`.${config.className}_${subClass} {\n`)
          attributes.forEach(attribute => {
            handle.write(`\t${attribute.name.split('.')[1]}: ${attribute.value};\n`)
          })
          const colorAtt = simpleAtt.find(att => att.name=='color')
          const bkColorAtt = simpleAtt.find(att => att.name=='background-color')
          if (colorAtt) {
            handle.write(`\t${colorAtt.name}: ${colorAtt.value};\n`)
          }
          if (bkColorAtt) {
            handle.write(`\t${bkColorAtt.name}: ${bkColorAtt.value};\n`)
          }
          handle.write('}\n')
        })
      })
      handle.close()
    })
    .catch(err => {
      console.error(`Error:${err}`)
    })
}

module.exports = {
  createUIConfiguration,
}
