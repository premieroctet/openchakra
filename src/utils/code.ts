import isBoolean from 'lodash/isBoolean'
import camelCase from 'lodash/camelCase'
import filter from 'lodash/filter'
import pickBy from 'lodash/pickBy'
import icons from '~iconsList'
import { propNames } from '@chakra-ui/react'
import lodash from 'lodash'
import config from '../../env.json'

//const HIDDEN_ATTRIBUTES=['dataSource', 'attribute']
const HIDDEN_ATTRIBUTES:string[] = []
const CONTAINER_TYPE:ComponentType[]=['Box', 'Grid', 'SimpleGrid', 'Flex']
const TEXT_TYPE:ComponentType[]=['Text']
const IMAGE_TYPE:ComponentType[]=['Image']

export const normalizePageName = (pageName:string) => {
  return capitalize(camelCase(pageName))
}

const isDynamicComponent = (comp:IComponent) => {
  return !!comp.props.dataSource
}

const getDynamicType = (comp:IComponent) => {
  if (CONTAINER_TYPE.includes(comp.type)) {
    return 'Container'
  }
  if (TEXT_TYPE.includes(comp.type)) {
    return 'Text'
  }
  if (IMAGE_TYPE.includes(comp.type)) {
    return 'Image'
  }
}

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const formatCode = async (code: string) => {
  let formattedCode = `// 🚨 Your props contains invalid code`

  const prettier = await import('prettier/standalone')
  const babylonParser = await import('prettier/parser-babylon')

  try {
    formattedCode = prettier.format(code, {
      parser: 'babel',
      plugins: [babylonParser],
      semi: false,
      singleQuote: true,
    })
  } catch (e) {
    console.error(e)
  }

  return formattedCode
}

type BuildBlockParams = {
  component: IComponent
  components: IComponents
  forceBuildBlock?: boolean
}

const buildBlock = ({
  component,
  components,
  forceBuildBlock = false,
}: BuildBlockParams) => {
  let content = ''
  component.children.forEach((key: string) => {
    let childComponent = components[key]
    if (childComponent.type == 'DataProvider') {
      return
    }
    if (!childComponent) {
      console.error(`invalid component ${key}`)
    }
    else if (forceBuildBlock || !childComponent.componentName) {
      const dataProvider = components[childComponent.props.dataSource]
      const paramProvider = dataProvider?.id.replace(/comp-/, '')
      const componentName = isDynamicComponent(childComponent) ?
      `Dynamic${capitalize(childComponent.type)}`
       :capitalize(childComponent.type)
      let propsContent = ''

      const propsNames = Object.keys(childComponent.props).filter(propName => {
        if (childComponent.type === 'Icon') {
          return propName !== 'icon'
        }

        return true
      })

      propsNames
        .filter(p => !HIDDEN_ATTRIBUTES.includes(p))
        .forEach((propName: string) => {
          const propsValue = childComponent.props[propName]
          const propsValueAsObject = typeof propsValue === 'object'

          if (propsValueAsObject && propsValue) {
            const gatheredProperties = Object.entries(propsValue)
              .map(([prop, value]) => {
                console.log('valuesProp', value)
                return `${prop}: '${value}'`
              })
              .join(', ')

            propsContent += `${propName}={{${gatheredProperties}}}`
            console.log(propsContent)
          } else if (
            propName.toLowerCase().includes('icon') &&
            childComponent.type !== 'Icon'
          ) {
            if (Object.keys(icons).includes(propsValue)) {
              let operand = `={<${propsValue} />}`

              propsContent += `${propName}${operand} `
            }
          } else if (propName !== 'children' && propsValue) {
            let operand =
              propName == 'dataSource' && paramProvider
                ? `={${paramProvider}}`
                : `='${propsValue}'`

            if (propsValue === true || propsValue === 'true') {
              operand = ``
            } else if (
              propsValue === 'false' ||
              isBoolean(propsValue) ||
              !isNaN(propsValue)
            ) {
              operand = `={${propsValue}}`
            }

            propsContent += `${propName}${operand}`
          }
        })

      if (childComponent.props.page) {
        propsContent += `onClick={() => window.location='/${normalizePageName(childComponent.props.page)}'}`
      }

      if (
        typeof childComponent.props.children === 'string' &&
        childComponent.children.length === 0
      ) {
        content += `<${componentName} ${propsContent}>${childComponent.props.children
        }</${componentName}>`
      } else if (childComponent.type === 'Icon') {
        content += `<${childComponent.props.icon} ${propsContent} />`
      } else if (childComponent.children.length) {
        content += `<${componentName} ${propsContent}>
      ${buildBlock({ component: childComponent, components, forceBuildBlock })}
      </${componentName}>`
      } else {
        content += `<${componentName} ${propsContent} />`
      }
    } else {
      content += `<${childComponent.componentName} />`
    }
  })

  return content
}

const buildComponents = (components: IComponents) => {
  const codes = filter(components, comp => !!comp.componentName).map(comp => {
    return generateComponentCode({
      component: { ...components[comp.parent], children: [comp.id] },
      components,
      forceBuildBlock: true,
      componentName: comp.componentName,
    })
  })

  return codes.reduce((acc, val) => {
    return `
      ${acc}

      ${val}
    `
  }, '')
}

type GenerateComponentCode = {
  component: IComponent
  components: IComponents
  componentName?: string
  forceBuildBlock?: boolean
}

export const generateComponentCode = ({
  component,
  components,
  componentName,
  forceBuildBlock,
}: GenerateComponentCode) => {
  let code = buildBlock({
    component,
    components,
    forceBuildBlock,
  })

  code = `
const ${componentName} = () => (
  ${code}
)`

  return code
}

const getIconsImports = (components: IComponents) => {
  return Object.keys(components).flatMap(name => {
    return Object.keys(components[name].props)
      .filter(prop => prop.toLowerCase().includes('icon'))
      .filter(prop => !!components[name].props[prop])
      .map(prop => components[name].props[prop])
  })
}

const buildHooks = components => {
  if (components.length == 0) {
    return ''
  }
  let code = `const {get}=useFetch('${config.targetDomain}')`
  code +=
    '\n' +
    components
      .map(dp => {
        const dataId = dp.id.replace(/comp-/, '')
        return `const [${dataId}, set${capitalize(dataId)}]=useState([])`
      })
      .join(`\n`)
  code += `\n
  useEffect(() => {
    ${components
      .map(dp => {
        const dataId = dp.id.replace(/comp-/, '')
        return `get('/myAlfred/api/${
          dp.props.model
        }').then(res => set${capitalize(dataId)}(res))`
      })
      .join('\n')}
  }, [get])\n`
  return code
}

const buildDynamics = (components: IComponents) => {
  const dynamicComps=lodash.uniqBy(
    Object.values(components).filter(c => isDynamicComponent(c)),
    c => c.type
  )
  if (dynamicComps.length==0) {
    return null
  }
  const groups=lodash.groupBy(dynamicComps, c => getDynamicType(c))
  let code=`${Object.keys(groups).map(g => `import withDynamic${g} from './custom-components/withDynamic${g}'`).join('\n')}

  ${Object.keys(groups).map(g => {
    return groups[g].map(comp => `const Dynamic${comp.type}=withDynamic${g}(${comp.type})`)
  }).join('\n')}
  `
  return code
}

export const generateCode = async (pageName:string, components: IComponents) => {
  const dataProviders = Object.values(components).filter(
    c => c.type == 'DataProvider',
  )
  let hooksCode = buildHooks(dataProviders)
  let dynamics = buildDynamics(components)
  let code = buildBlock({ component: components.root, components })
  let componentsCodes = buildComponents(components)
  const iconImports = [...new Set(getIconsImports(components))]

  const imports = [
    ...new Set(
      Object.keys(components)
        .filter(name => name !== 'root')
        .filter(name => components[name].type != 'DataProvider')
        .map(name => components[name].type),
    ),
  ]

  const pageNameCamel = normalizePageName(pageName)

  // Distinguish between chakra/non-chakra components
  const module = await import('@chakra-ui/react')
  /**
  const groupedComponents = lodash.groupBy(imports, c =>
    module[c] ? '@chakra-ui/react' : `./custom-components/${c}/${c}`,
  )
  */
  const groupedComponents = lodash.groupBy(imports, c =>
    module[c] ? '@chakra-ui/react' : `./custom-components/${c}/${c}`,
  )

  code = `import React, {useState, useEffect} from 'react';
  ${dataProviders.length > 0 ? `import useFetch from 'use-http'` : ''}
  import {ChakraProvider} from "@chakra-ui/react";
  ${Object.entries(groupedComponents)
    .map(([modName, components]) => {
      const multiple = modName.includes('chakra-ui')
      return `import ${multiple ? '{' : ''}
      ${components.join(',')}
    ${multiple ? '}' : ''} from "${modName}";
    `
    })
    .join('\n')}
${
  iconImports.length
    ? `
import { ${iconImports.join(',')} } from "@chakra-ui/icons";`
    : ''
}

${dynamics}
${componentsCodes}

const ${pageNameCamel} = () => {
  ${hooksCode}
  return (
  <ChakraProvider resetCSS>
    ${code}
  </ChakraProvider>
)};

export default ${pageNameCamel};`

  return await formatCode(code)
}

export const generateApp = async (pageNames:[string]) => {
  /**
  <ul>
${pageNames.map(name => `<li><a href='/${name}'>${name}</a></li>`).join('\n')}
</ul>
*/
  let code=`import {BrowserRouter, Routes, Route} from 'react-router-dom'
  ${pageNames
    .map(nameToConv => normalizePageName(nameToConv))
    .map(name => `import ${name} from './${name}'`).join('\n')}

  const App = () => (
    <>
    <BrowserRouter>
    <Routes>
      ${pageNames.slice(0, 1).map(name => `<Route path='/' element={<${name}/>} />`).join('\n')}
      ${pageNames.map(normalizePageName).map(name => `<Route path='/${name}' element={<${name}/>} />`).join('\n')}
    </Routes>
    </BrowserRouter>
    </>
  )

  export default App
  `
  code= await formatCode(code)
  return code
}
