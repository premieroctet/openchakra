const fs=require('fs/promises')

/**
  Creates CSS from configurations
  config : {classname, attributes:{name,value}}
*/
createUIConfiguration = configuration => {
  console.log(`Configuration:${JSON.stringify(configuration)}`)
  fs.open('static/assets/css/custom.css', 'w')
    .then(handle => {
      configuration.forEach(config => {
        handle.write(`.${config.className} {\n`)
        config.attributes.forEach(attribute => {
          handle.write(`\t${attribute.name}: ${attribute.value};\n`)
        })
        handle.write('}\n')
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
