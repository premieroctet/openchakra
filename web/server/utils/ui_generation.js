const fs=require('fs').promises
const validateCss = require('css-validator')
const _=require('lodash')
/**
  Creates CSS from configurations
  config : {classname, attributes:{name,value}}
*/
createCSSConfiguration = items => {
  console.log(`Generating ${items.length} CSS items`)
  let cssClasses={}
  // Transklate classes : menu, search bar, etc...
  items.forEach(config => {
    config.attributes.forEach(attribute => {
      let className=config.classname
      let name=attribute.name
      let value=attribute.value
      let extra_attr=null
      console.log(`Generating ${className} ${name} ${value}`)
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
      if (name=='magnify-background-color') {
        className=`${className}Magnify`
        name='background-color'
      }
      if (name=='background-image') {
        value=`url("/${value}")`
        extra_attr={name: 'background-repeat', value: 'no-repeat'}
      }
      if (name=='info-color') {
        className=`${className} label`
        name='color'
      }
      if (name=='example-color') {
        className=`${className}, input::placeholder`
        name='color'
      }
      if (name=='input-color') {
        className=`${className}, input`
        name='color'
      }
      if (name=='border-radius') {
        value = `${value}px`
      }
      if (!(className in cssClasses)) {
        cssClasses[className]={}
      }
      if (!(name=='display' && value=='block')) {
        cssClasses[className][name]= value
        if (extra_attr) {
          cssClasses[className][extra_attr.name]=extra_attr.value
        }
      }
    })
  })
  const output=Object.entries(cssClasses).map(([k, v]) => {
    const atts=Object.entries(v).map(([k, v]) => `\t${k}: ${v} !important;`).join('\n')
    return `.${k} {\n${atts}\n}`
  }).join('\n')

  validateCss(output, (err, data) => {
    const error = err || !data.validity
    if (error) {
      console.error(`CSS generation error, output in /tmp/custom.css\nError:${error}`)
    }
    else {
      console.log('CSS generation OK, output in static/assets/css/custom.css')
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

createI18NConfiguration = items => {
  console.log(`Generating ${items.length} I18N items`)
  items = items.filter(i => i.attributes && i.attributes.length)
  const formattedItems=items.map(it => `\t"${it.classname}": "${it.attributes[0].value.replace(/"/g, '\\"')}"`).join(',\n')
  const output=`{\n${formattedItems}\n}`
  Promise.resolve(output)
    .then(JSON.parse)
    .then(() => {
      console.log('JSON I18N is ok, saving')
      fs.writeFile('translations/fr/custom.json', output)
        .then(() => console.log('I18N saved'))
        .catch(err => (`I18N save error:${err}`))
    })
    .catch(err => {
      console.error(`JSON error:${err}\nSaving to tmp`)
      fs.writeFile('/tmp/custom.json', output)
        .then(() => console.log('I18N saved'))
        .catch(err => (`I18N save error:${err}`))
    })
}

createUIConfiguration = items => {
  console.log(`Generating ${items.length} custom items`)
  const i18n_grouped=_.groupBy(items, it => (it.type=='content' ? 'I18N': 'CSS'))
  createCSSConfiguration(i18n_grouped.CSS || [])
  createI18NConfiguration(i18n_grouped.I18N || [])
}

module.exports = {
  createUIConfiguration,
}
