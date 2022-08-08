const fs=require('fs').promises
const {validate: validateCss} = require('csstree-validator')
const lodash = require('lodash')
const {getDataModel}=require('../../config/config')

const CSS_PATH='static/assets/css/custom.css'
const CSS_PATH_ERR='/tmp/custom.css'

const I18N_PATH=`static/locales/fr/${getDataModel()}_custom.json`
const I18N_PATH_ERR='/tmp/custom.json'

const THEME_PATH='lib/theme.json'
const THEME_PATH_ERR='/tmp/theme.json'

const CONST_CSS = {
  'a': {
    color: 'inherit',
  },
}
/**
  Creates CSS from configurations
  config : {classname, attributes:{name,value}}
*/
const createCSSConfiguration = items => {
  console.log(`Generating ${items.length} CSS items`)
  // Couleur trait de lien <a>
  let cssClasses={}
  // Transklate classes : menu, search bar, etc...
  items.forEach(config => {
    config.attributes.forEach(attribute => {
      let className=config.classname
      let name=attribute.name
      let value=attribute.value
      let extra_attr=null
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
      if (config.type=='button') {
        className=`${className}:enabled`
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
  let output=Object.entries(cssClasses).map(([k, v]) => {
    const atts=Object.entries(v).map(([k, v]) => `\t${k}: ${v} !important;`).join('\n')
    return `.${k} {\n${atts}\n}`
  })

  output.push(Object.entries(CONST_CSS).map(([k, v]) => {
    const atts=Object.entries(v).map(([k, v]) => `\t${k}: ${v} !important;`).join('\n')
    return `${k} {\n${atts}\n}`
  }))
  output=output.join('\n')

  const result=validateCss(output)
  const error=result && result.length>0 ? result : null
  if (error) {
    console.error(`CSS generation error, output in ${CSS_PATH_ERR}\nError:${error}`)
  }
  else {
    console.log(`CSS generation OK, output in ${CSS_PATH}`)
  }
  fs.writeFile(error ? CSS_PATH_ERR : CSS_PATH, output)
    .then(() => {
      console.log(`CSS saved in ${CSS_PATH}`)
    })
    .catch(err => {
      console.error(`CSS write error:${err}`)
    })
}

const createI18NConfiguration = items => {
  console.log(`Generating ${items.length} I18N items`)
  items = items.filter(i => i.attributes?.length>0)
  items=lodash.sortBy(items, i => i.classname.toLowerCase())
  const formattedItems=items.map(it => `\t"${it.classname}": "${it.attributes[0].value.replace(/"/g, '\\"')}"`).join(',\n')
  const output=`{\n${formattedItems}\n}`
  Promise.resolve(output)
    .then(JSON.parse)
    .then(() => {
      console.log('JSON I18N is ok, saving')
      return fs.writeFile(I18N_PATH, output)
        .then(() => console.log(`I18N saved to ${I18N_PATH}`))
    })
    .catch(err => {
      console.error(`I18N error:${err}\nSaving to ${I18N_PATH_ERR}`)
      return fs.writeFile(I18N_PATH_ERR, output)
        .then(() => console.log(`I18N saved to ${I18N_PATH_ERR}`))
        .catch(err => (`I18N save error:${err}`))
    })
}

const createThemeConfiguration = items => {
  console.log(`Generating ${items.length} THEME items`)
  items = items.filter(i => i.attributes && i.attributes.length)
  items = Object.fromEntries(items.map(i => [i.classname, i.attributes[0].value]))
  fs.writeFile(THEME_PATH, JSON.stringify(items, null, 2))
    .then(() => console.log(`THEME saved under ${THEME_PATH}`))
    .catch(err => (`I18N save error:${err}`))
}

const createUIConfiguration = items => {
  console.log(`Generating ${items.length} custom items`)
  const i18n_grouped=lodash.groupBy(items, it => (['text', 'sample'].includes(it.type) ? 'I18N': it.type=='palette' ? 'THEME' : 'CSS'))
  createCSSConfiguration(i18n_grouped.CSS || [])
  createI18NConfiguration(i18n_grouped.I18N || [])
  createThemeConfiguration(i18n_grouped.THEME || [])
}

module.exports = {
  createUIConfiguration,
}
