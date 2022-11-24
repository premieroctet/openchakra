import camelCase from 'lodash/camelCase'
import filter from 'lodash/filter'
import isBoolean from 'lodash/isBoolean'
import lodash from 'lodash'
import { isJsonString } from '../hooks/usePropsSelector'
import icons from '~iconsList'

import {
  ACTION_TYPE,
  CHECKBOX_TYPE,
  CONTAINER_TYPE,
  DATE_TYPE,
  IMAGE_TYPE,
  INPUT_TYPE,
  PROGRESS_TYPE,
  SELECT_TYPE,
  SOURCE_TYPE,
  TEXT_TYPE,
  UPLOAD_TYPE,
  getDataProviderDataType,
  getFieldsForDataProvider,
} from './dataSources'
import { ProjectState, PageState } from '../core/models/project'

//const HIDDEN_ATTRIBUTES=['dataSource', 'attribute']
const HIDDEN_ATTRIBUTES: string[] = []

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
  try {
    return pages?.[pageId]?.pageName
      .toLowerCase()
      .replace(/ /i, '-')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
  } catch (err) {
    console.error(`getPageUrl ${pageId}:${err}`)
    throw err
  }
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

const isMaskableComponent = (comp: IComponent) => {
  return !!comp.props.hiddenRoles
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
  if (DATE_TYPE.includes(comp.type)) {
    return 'Date'
  }
  if (SELECT_TYPE.includes(comp.type)) {
    return 'Select'
  }
  if (SOURCE_TYPE.includes(comp.type)) {
    return 'Source'
  }
  if (CHECKBOX_TYPE.includes(comp.type)) {
    return 'Checkbox'
  }
  if (INPUT_TYPE.includes(comp.type)) {
    return 'Input'
  }
  if (UPLOAD_TYPE.includes(comp.type)) {
    return 'UploadFile'
  }
  throw new Error(`No dynamic found for ${comp.type}`)
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
  models: any
}

const buildBlock = ({
  component,
  components,
  forceBuildBlock = false,
  pages,
  models,
}: BuildBlockParams) => {
  let content = ''
  component.children.forEach((key: string) => {
    let childComponent = components[key]
    if (childComponent.type === 'DataProvider') {
      return
    }
    if (!childComponent) {
      throw new Error(`invalid component ${key}`)
    } else if (forceBuildBlock || !childComponent.componentName) {
      const dataProvider = components[childComponent.props.dataSource]
      const paramProvider = dataProvider?.id.replace(/comp-/, '')
      const componentName = isDynamicComponent(childComponent)
        ? `Dynamic${capitalize(childComponent.type)}`
        : isMaskableComponent(childComponent)
        ? `Maskable${capitalize(childComponent.type)}`
        : capitalize(childComponent.type)
      let propsContent = ''

      // Set component id
      propsContent += ` id='${childComponent.id}' `
      // Set reload function
      propsContent += ` reload={reload} `
      // Provide page data context
      if (dataProvider) {
        propsContent += ` context={root?.[0]?._id}`
      }

      if (isDynamicComponent(childComponent)) {
        propsContent += ` backend='/'`
        try {
          let tp = getDataProviderDataType(
            components[childComponent.parent],
            components,
            childComponent.props.dataSource,
            models,
          )
          if (!tp) {
            tp = {
              type: components[childComponent.props.dataSource].props.model,
              multiple: true,
              ref: true,
            }
          }
          if (tp.type) {
            propsContent += ` dataModel='${tp.type}' `
          } else {
            console.error(
              `No data provider data type found for ${childComponent.parent}`,
            )
          }
        } catch (err) {
          console.error(err)
        }
      }
      // Set if dynamic container
      if (
        (CONTAINER_TYPE.includes(childComponent.type) ||
          SELECT_TYPE.includes(childComponent.type)) &&
        !!dataProvider
      ) {
        propsContent += ` dynamicContainer `
      }

      const propsNames = Object.keys(childComponent.props).filter(propName => {
        if (childComponent.type === 'Icon') {
          return propName !== 'icon'
        }
        return true
      })

      propsNames
        .filter(p => !HIDDEN_ATTRIBUTES.includes(p))
        .forEach((propName: string) => {
          const val = childComponent.props[propName]
          const propsValue =
            val !== null && isJsonString(val) ? JSON.parse(val) : val
          const propsValueAsObject =
            typeof propsValue === 'object' && val !== null // TODO revise this temporary fix = propsValue !== 'null' // bgGradient buggy when deleted

          // console.log('propsValue', typeof propsValue, propsValue, Object.keys(propsValue), Object.keys(propsValue).length)

          if (propName === 'actionProps' || propName === 'nextActionProps') {
            const valuesCopy = {
              ...propsValue,
              page: propsValue.page
                ? getPageUrl(propsValue.page, pages)
                : undefined,
            }
            propsContent += ` ${propName}='${JSON.stringify(valuesCopy)}'`
            return
          }

          if (propName === 'dataSource') {
            propsContent += ` dataSourceId='${propsValue}'`
          }

          if (propName === 'contextFilter') {
            if (propsValue) {
              propsContent += ` contextFilter={${propsValue.replace(
                /^comp-/,
                '',
              )}}`
            }
            return
          }

          if (propName === 'hiddenRoles') {
            propsContent += ` hiddenRoles='${JSON.stringify(propsValue)}'`
            propsContent += ` user={user} `
            return
          }

          if (propsValueAsObject && Object.keys(propsValue).length >= 1) {
            const gatheredProperties = Object.entries(propsValue)
              .map(([prop, value]) => {
                return !isNaN(parseInt(value))
                  ? ` ${prop}: '${value}' `
                  : ` ${prop}: '${value}' `
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
          } else if (
            propName !== 'children' &&
            typeof propsValue !== 'object' &&
            propsValue
          ) {
            let operand =
              propName === 'dataSource' && paramProvider
                ? `={${paramProvider}}`
                : `='${propsValue}'`

            if (propsValue === true || propsValue === 'true') {
              operand = ` `
            } else if (
              propsValue === 'false' ||
              isBoolean(propsValue) ||
              !isNaN(propsValue)
            ) {
              operand = `={${propsValue}}`
            }

            propsContent += ` ${propName}${operand}`
          }
        })

      if (childComponent.type === 'Timer') {
        propsContent += ` backend='/'`
      }

      if (childComponent.props.actionProps) {
        const { page } = isJsonString(childComponent.props.actionProps)
          ? JSON.parse(childComponent.props.actionProps)
          : childComponent.props.actionProps
        if (page) {
          const destPageUrl = getPageUrl(page, pages)
          propsContent += ` pageName={'${destPageUrl}'} `
          propsContent += `onClick={() => window.location='/${destPageUrl}'}`
        }
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
        models,
      })}
      </${componentName}>`
      } else {
        content += `<${componentName} ${propsContent}  />`
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
  models: any[]
}

export const generateComponentCode = ({
  component,
  components,
  componentName,
  forceBuildBlock,
  pages,
  models,
}: GenerateComponentCode) => {
  let code = buildBlock({
    component,
    components,
    forceBuildBlock,
    pages,
    models,
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

const buildHooks = (components: IComponents) => {
  // Returns attributes names used in this dataProvider for 'dataProvider'
  const getDataProviderFields = (dataProvider: IComponent) => {
    const fields = getFieldsForDataProvider(dataProvider.id, components)
    return fields
  }

  const dataProviders: IComponent[] = lodash(components)
    .pickBy(c => c.props?.model)
    .values()
  if (dataProviders.length === 0) {
    return ''
  }
  let code = `const {get}=useFetch(null, {cachePolicy: 'no-cache', timeout:10000})`
  code +=
    '\n' +
    dataProviders
      .map(dp => {
        const dataId = dp.id.replace(/comp-/, '')
        return `const [${dataId}, set${capitalize(dataId)}]=useState([])`
      })
      .join(`\n`)
  code += `\n
  const [refresh, setRefresh]=useState(false)

  const reload = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    ${dataProviders
      .map(dp => {
        const dataId = dp.id.replace(/comp-/, '')
        const dpFields = getDataProviderFields(dp).join(',')
        const idPart = dp.id === 'root' ? `\${id ? \`\${id}/\`: \`\`}` : ''
        const apiUrl = `/myAlfred/api/studio/${dp.props.model}/${idPart}${
          dpFields ? `?fields=${dpFields}` : ''
        }`
        return `get(\`${apiUrl}\`)
        .then(res => set${capitalize(dataId)}(res))
        .catch(err => alert(err))`
      })
      .join('\n')}
  }, [get, refresh])\n`
  return code
}

const buildDynamics = (components: IComponents, extraImports: string[]) => {
  const dynamicComps = lodash.uniqBy(
    Object.values(components).filter(c => isDynamicComponent(c)),
    c => c.type,
  )
  if (dynamicComps.length === 0) {
    return null
  }
  const groups = lodash.groupBy(dynamicComps, c => getDynamicType(c))
  Object.keys(groups).forEach(g =>
    extraImports.push(
      `import withDynamic${g} from './dependencies/hoc/withDynamic${g}'`,
    ),
  )

  let code = `${Object.keys(groups)
    .map(g => {
      return groups[g]
        .map(comp => `const Dynamic${comp.type}=withDynamic${g}(${comp.type})`)
        .join('\n')
    })
    .join('\n')}
  `
  return code
}

const buildMaskable = (components: IComponents, extraImports: string[]) => {
  const maskableComps = Object.values(components).filter(c =>
    isMaskableComponent(c),
  )

  if (maskableComps.length === 0) {
    return null
  }

  const types = lodash(maskableComps)
    .map(c => c.type)
    .uniq()

  extraImports.push(
    `import withMaskability from './dependencies/hoc/withMaskability'`,
  )
  let code = types
    .map(type => `const Maskable${type}=withMaskability(${type})`)
    .join('\n')
  return code
}

export const generateCode = async (
  pageId: string,
  pages: {
    [key: string]: PageState
  },
  models: any,
) => {
  const { components, metaTitle, metaDescription, metaImageUrl } = pages[pageId]

  const extraImports: string[] = []
  let hooksCode = buildHooks(components)
  let dynamics = buildDynamics(components, extraImports)
  let maskable = buildMaskable(components, extraImports)
  let code = buildBlock({
    component: components.root,
    components,
    pages,
    models,
  })
  let componentsCodes = buildComponents(components, pages)
  const iconImports = [...new Set(getIconsImports(components))]

  const imports = [
    ...new Set(
      Object.keys(components)
        .filter(name => name !== 'root')
        .filter(name => components[name].type !== 'DataProvider')
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
    module[c] ? '@chakra-ui/react' : `./dependencies/custom-components/${c}`,
  )

  const rootIdQuery = components['root']?.props?.model
  const rootIgnoreUrlParams =
    components['root']?.props?.ignoreUrlParams == 'true'

  code = `import React, {useState, useEffect} from 'react';
  import Metadata from './dependencies/Metadata';
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

import Fonts from './dependencies/theme/Fonts'
import {useLocation} from "react-router-dom"
import { useUserContext } from './dependencies/context/user'
${extraImports.join('\n')}

${dynamics || ''}
${maskable || ''}
${componentsCodes}

const ${componentName} = () => {
  ${hooksCode}
  const query = new URLSearchParams(useLocation().search)
  const id=${rootIgnoreUrlParams ? 'null' : `query.get('${rootIdQuery}')`}
  const {user}=useUserContext()

  return (
  <ChakraProvider resetCSS>
    <Fonts />
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
  import { UserWrapper } from './dependencies/context/user';
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
    <UserWrapper>
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
    </UserWrapper>
  )

  export default App
  `
  code = await formatCode(code)
  return code
}
