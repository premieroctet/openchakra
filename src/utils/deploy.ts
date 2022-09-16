import {ComponentsState} from '~/core/models/components'
import lodash from 'lodash'
import { build, copyFile, install, start } from './http'
import { generateCode, generateApp } from './code'
import { validate } from './validation'

const copyCode = (pageName: string, contents: Buffer) => {
  return copyFile({ contents: contents, filePath: `${pageName}.js`})
}

export const deploy = (state: ComponentsState) => {
  const namedComponents:[{name: string, components: IComponents}]=
    Object.entries(state.pages).map(([pageName, page]) => ({pageName: pageName, components: page.components}))
  return Promise.all(namedComponents.map(({pageName, components}) =>validate(components)))
    .then(() => {
      return Promise.all(namedComponents.map(({pageName, components}) => generateCode(pageName, components)))
    })
    .then(codes => {
      const namedCodes=lodash.zip(namedComponents.map(nc => nc.pageName), codes)
      return Promise.all(namedCodes.map(([pageName, code]) => copyCode(pageName, code)))
    })
    .then(() => {
      return generateApp(Object.keys(state.pages))
    })
    .then(code => {
      return copyCode('App', code)
    })
    .then(() => {
      return install()
    })
    .then(() => {
      return build()
    })
    .then(() => {
      return start()
    })
}
