const fs=require('fs').promises
const validateCss = require('css-validator')
const _=require('lodash')
/**
  Creates CSS from configurations
  config : {classname, attributes:{name,value}}
*/
createUIConfiguration = configuration => {
  let cssClasses={}
  // Transklate classes : menu, search bar, etc...
  configuration.forEach(config => {
    config.attributes.forEach(attribute => {
      let className=config.className
      let name=attribute.name
      let value=attribute.value
      if (name=='content') {
        if (config.type=='logo') {
          if (!value.startsWith('/')) { value=`/${value}` }
          value = `url('${value}')`
        }
        else {
          value = `'"${value}"'`
        }
      }
      if (name.includes('.') && config.type=='group') {
        const [id, property] = name.split('.')
        className=`${config.className}_${id}`
        name = property
      }
      if (!(className in cssClasses)) {
        cssClasses[className]={}
      }
      cssClasses[className][name]= value
    })
  })
  const output=Object.entries(cssClasses).map(([k, v]) => {
    const atts=Object.entries(v).map(([k, v]) => `\t${k}: ${v};`).join('\n')
    return `.${k} {\n${atts}\n}`
  }).join('\n')

  validateCss(output, (err, data) => {
    const error = err || !data.validity
    if (error) {
      console.error(`CSS generation error, output in /tmp/custom.css\nError:${JSON.stringify(data, null, 2)}`)
    }
    fs.writeFile(error ? '/tmp/custom.css' : 'static/assets/css/custom.css', output)
      .then(() => {
        console.log('CSS saved')
      })
      .catch(err => {
        console.error(`CSS write error:${err}`)
      })
  })
}

module.exports = {
  createUIConfiguration,
}
