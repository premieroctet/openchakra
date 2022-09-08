import lodash from 'lodash'

import { build, copyFile, install } from './http'
import { generateCode, getComponentPath } from './code'
import config from '../../env.json'

const copyApp = contents => {
  console.log(`Code:${contents}`)
  return copyFile({
    contents: contents,
    projectName: 'studio-test',
    filePath: 'App.js',
  })
}

export const deploy = (components: IComponents) => {
  console.log(`deployingCode for components:${Object.keys(components)}`)
  let code = null
  return generateCode(components)
    .then(res => {
      return copyApp(res)
    })
    .then(res => {
      return install({ projectName: 'studio-test' })
    })
    .then(res => {
      return build({ projectName: 'studio-test' })
    })
}
