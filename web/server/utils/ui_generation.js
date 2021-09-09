const fs=require('fs').promises
const validateCss = require('css-validator')

/**
  Creates CSS from configurations
  config : {classname, attributes:{name,value}}
*/
createCSSConfiguration = items => {
  let cssClasses={}
  // Transklate classes : menu, search bar, etc...
  items.forEach(config => {
    config.attributes.forEach(attribute => {
      let className=config.classname
      let name=attribute.name
      let value=attribute.value
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

createI18NConfiguration = items => {
  console.log(`Generating items ${items}`)
  items = items.filter(i => i.attributes && i.attributes.length)
  const formattedItems=items.map(it => `\t"${it.component}": "${it.attributes[0].value.replace(/"/g, '\\"')}"`).join(',\n')
  const output=`{\n${formattedItems}\n}`
  fs.writeFile('translations/fr/custom.json', output)
    .then(() => {
      console.log('CSS saved')
    })
    .catch(err => {
      console.error(`CSS write error:${err}`)
    })
}

createUIConfiguration = configuration => {
  console.log(`Got ${configuration.length} items`)
  const css_items = configuration.filter(c => c.type != 'content')
  console.log(`Got ${css_items.length} CSS items`)
  createCSSConfiguration(css_items)
  const i18n_items = configuration.filter(c => c.type == 'content')
  console.log(`Got ${i18n_items.length} I18N items`)
  createI18NConfiguration(i18n_items)
}

module.exports = {
  createUIConfiguration,
}
