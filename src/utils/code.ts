import camelCase from 'lodash/camelCase'
import filter from 'lodash/filter'
import isBoolean from 'lodash/isBoolean'
import lodash from 'lodash'
import icons from '~iconsList'

import { ProjectState, PageState } from '../core/models/project'
import config from '../../env.json'

//const HIDDEN_ATTRIBUTES=['dataSource', 'attribute']
const HIDDEN_ATTRIBUTES: string[] = []
export const CONTAINER_TYPE: ComponentType[] = [
  'Box',
  'Grid',
  'SimpleGrid',
  'Flex',
  'List',
  'Accordion',
  'Container',
]
const TEXT_TYPE: ComponentType[] = ['Text', 'Heading', 'Badge', 'ListItem']
const ACTION_TYPE: ComponentType[] = ['Button']
const IMAGE_TYPE: ComponentType[] = ['Image', 'Avatar']
const PROGRESS_TYPE: ComponentType[] = ['Progress', 'CircularProgress']

export const normalizePageName = (pageName: string) => {
  return capitalize(camelCase(pageName))
}

export const getPageFileName = (
  pageId: string,
  pages: { [key: string]: PageState },
) => {
  return normalizePageName(pages[pageId].pageName)
}

export const getPageUrl = (
  pageId: string,
  pages: { [key: string]: PageState },
) => {
  console.log(`PageId:${pageId}, pages:${Object.keys(pages)}`)
  return pages[pageId].pageName.toLowerCase().replace(/ /i, '-')
}

export const getPageComponentName = (
  pageId: string,
  pages: { [key: string]: PageState },
) => {
  return normalizePageName(pages[pageId].pageName)
}

const isDynamicComponent = (comp: IComponent) => {
  return !!comp.props.dataSource
}

const getDynamicType = (comp: IComponent) => {
  if (CONTAINER_TYPE.includes(comp.type)) {
    return 'Container'
  }
  if (TEXT_TYPE.includes(comp.type)) {
    return 'Text'
  }
  if (IMAGE_TYPE.includes(comp.type)) {
    return 'Image'
  }
  if (ACTION_TYPE.includes(comp.type)) {
    return 'Button'
  }
  if (PROGRESS_TYPE.includes(comp.type)) {
    return 'Value'
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
  pages: { [key: string]: PageState }
}

const buildBlock = ({
  component,
  components,
  forceBuildBlock = false,
  pages,
}: BuildBlockParams) => {
  let content = ''
  component.children.forEach((key: string) => {
    let childComponent = components[key]
    if (childComponent.type == 'DataProvider') {
      return
    }
    if (!childComponent) {
      console.error(`invalid component ${key}`)
    } else if (forceBuildBlock || !childComponent.componentName) {
      const dataProvider = components[childComponent.props.dataSource]
      const paramProvider = dataProvider?.id.replace(/comp-/, '')
      const componentName = isDynamicComponent(childComponent)
        ? `Dynamic${capitalize(childComponent.type)}`
        : capitalize(childComponent.type)
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
                return `${prop}: '${value}'`
              })
              .join(', ')

            propsContent += `${propName}={{${gatheredProperties}}}`
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
        const destPageUrl = getPageUrl(childComponent.props.page, pages)
        propsContent += ` pageName={'${destPageUrl}'} `
        propsContent += `onClick={() => window.location='/${destPageUrl}'}`
      }

      if (
        typeof childComponent.props.children === 'string' &&
        childComponent.children.length === 0
      ) {
        content += `<${componentName} ${propsContent}>${childComponent.props.children}</${componentName}>`
      } else if (childComponent.type === 'Icon') {
        content += `<${childComponent.props.icon} ${propsContent} />`
      } else if (childComponent.children.length) {
        content += `<${componentName} ${propsContent}>
      ${buildBlock({
        component: childComponent,
        components,
        forceBuildBlock,
        pages,
      })}
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

const buildComponents = (
  components: IComponents,
  pages: { [key: string]: PageState },
) => {
  const codes = filter(components, comp => !!comp.componentName).map(comp => {
    return generateComponentCode({
      component: { ...components[comp.parent], children: [comp.id] },
      components,
      forceBuildBlock: true,
      componentName: comp.componentName,
      pages,
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
  pages: { [key: string]: PageState }
}

export const generateComponentCode = ({
  component,
  components,
  componentName,
  forceBuildBlock,
  pages,
}: GenerateComponentCode) => {
  let code = buildBlock({
    component,
    components,
    forceBuildBlock,
    pages,
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

const buildHooks = (components: IComponent[]) => {
  // Returns attributes names used in this dataProvider for 'dataProvider'
  const getDataProviderFields = (dataProvider: IComponent) => {
    return lodash(components)
      .filter(
        c => c.props?.dataSource == dataProvider.id && !!c.props?.attribute,
      )
      .map(c => c.props.attribute)
      .uniq()
  }
  const dataProviders: IComponent[] = components.filter(
    c => c.type == 'DataProvider',
  )
  if (dataProviders.length == 0) {
    return ''
  }
  let code = `const {get}=useFetch('${config.targetDomain}')`
  code +=
    '\n' +
    dataProviders
      .map(dp => {
        const dataId = dp.id.replace(/comp-/, '')
        return `const [${dataId}, set${capitalize(dataId)}]=useState([])`
      })
      .join(`\n`)
  code += `\n
  useEffect(() => {
    ${dataProviders
      .map(dp => {
        const dataId = dp.id.replace(/comp-/, '')
        const dpFields = getDataProviderFields(dp)
        const apiUrl = `/myAlfred/api/studio/${dp.props.model}${
          dpFields ? `?fields=${dpFields.join(',')}` : ''
        }`
        return `get('${apiUrl}').then(res => set${capitalize(dataId)}(res))`
      })
      .join('\n')}
  }, [get])\n`
  return code
}

const buildDynamics = (components: IComponents) => {
  const dynamicComps = lodash.uniqBy(
    Object.values(components).filter(c => isDynamicComponent(c)),
    c => c.type,
  )
  if (dynamicComps.length == 0) {
    return null
  }
  const groups = lodash.groupBy(dynamicComps, c => getDynamicType(c))
  let code = `${Object.keys(groups)
    .map(
      g => `import withDynamic${g} from './custom-components/withDynamic${g}'`,
    )
    .join('\n')}

  ${Object.keys(groups)
    .map(g => {
      return groups[g]
        .map(comp => `const Dynamic${comp.type}=withDynamic${g}(${comp.type})`)
        .join('\n')
    })
    .join('\n')}
  `
  return code
}

export const generateCode = async (
  pageId: string,
  pages: {
    [key: string]: PageState
  },
) => {
  const {
    pageName,
    components,
    metaTitle,
    metaDescription,
    metaImageUrl,
  } = pages[pageId]

  let hooksCode = buildHooks(Object.values(components))
  let dynamics = buildDynamics(components)
  let code = buildBlock({ component: components.root, components, pages })
  let componentsCodes = buildComponents(components, pages)
  const iconImports = [...new Set(getIconsImports(components))]

  const imports = [
    ...new Set(
      Object.keys(components)
        .filter(name => name !== 'root')
        .filter(name => components[name].type != 'DataProvider')
        .map(name => components[name].type),
    ),
  ]

  const componentName = getPageComponentName(pageId, pages)
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
  import Metadata from './custom-components/Metadata';
  ${hooksCode ? `import useFetch from 'use-http'` : ''}
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

${dynamics || ''}
${componentsCodes}

const ${componentName} = () => {
  ${hooksCode}
  return (
  <ChakraProvider resetCSS>
    <Metadata
      metaTitle={'${metaTitle}'}
      metaDescription={'${metaDescription}'}
      metaImageUrl={'${metaImageUrl}'}
    />
    ${code}
  </ChakraProvider>
)};

export default ${componentName};`

  return await formatCode(code)
}

export const generateApp = async (state: ProjectState) => {
  /**
  <ul>
${pageNames.map(name => `<li><a href='/${name}'>${name}</a></li>`).join('\n')}
</ul>
*/
  const { pages, rootPage } = state
  let code = `import {BrowserRouter, Routes, Route} from 'react-router-dom'
  ${Object.values(pages)
    .map(
      page =>
        `import ${getPageComponentName(
          page.pageId,
          pages,
        )} from './${getPageFileName(page.pageId, pages)}'`,
    )
    .join('\n')}

  const App = () => (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<${getPageComponentName(rootPage, pages)}/>} />
      ${Object.values(pages)
        .map(
          page =>
            `<Route path='/${getPageUrl(
              page.pageId,
              pages,
            )}' element={<${getPageComponentName(page.pageId, pages)}/>} />`,
        )
        .join('\n')}
    </Routes>
    </BrowserRouter>
    </>
  )

  export default App
  `
  code = await formatCode(code)
  return code
}
