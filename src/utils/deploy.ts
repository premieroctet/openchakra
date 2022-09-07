import lodash from 'lodash'
import { generateCode, getComponentPath } from './code'

const copyComponents = (components, path) => {
  return Promise.all(
    Object.values(components).map(comp => getComponentPath(comp.type)),
  ).then(res => {
    //const paths=res.filter(p => !!p).map(p => ([p, fs.readFileSync(p)]))
    const paths = res.filter(p => !!p)
    console.log(paths)
    return Promise.resolve()
  })
}

const copyApp = contents => {
  console.log(`Code:${contents}`)
  return Promise.resolve()
}

export const deploy = (components: IComponents) => {
  console.log(`deployingCode for components:${Object.keys(components)}`)
  let code = null
  return generateCode(components)
    .then(res => {
      return copyApp(res)
    })
    .then(() => {
      return copyComponents(components)
    })
}
