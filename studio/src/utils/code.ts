import {encode} from 'html-entities'
import filter from 'lodash/filter'
import isBoolean from 'lodash/isBoolean'
import lodash from 'lodash';

import icons from '~iconsList'

import {
  ACTION_TYPE,
  CHECKBOX_TYPE,
  CONTAINER_TYPE,
  DATE_TYPE,
  ENUM_TYPE,
  IMAGE_TYPE,
  INPUT_TYPE,
  PROGRESS_TYPE,
  SELECT_TYPE,
  SOURCE_TYPE,
  TEXT_TYPE,
  UPLOAD_TYPE,
  getDataProviderDataType,
  getFieldsForDataProvider,
  isSingleDataPage,
} from './dataSources';
import { ProjectState, PageState } from '../core/models/project'
import {
  capitalize,
  getPageFileName,
  getPageUrl,
  normalizePageName
} from './misc';
import { isJsonString } from '../dependencies/utils/misc'
import { whatTheHexaColor } from '~components/editor/previews/IconPreview';

//const HIDDEN_ATTRIBUTES=['dataSource', 'attribute']
const HIDDEN_ATTRIBUTES: string[] = []

export const getPageComponentName = (
  pageId: string,
  pages: { [key: string]: PageState },
) => {
  return normalizePageName(pages[pageId].pageName)
}

const isDynamicComponent = (comp: IComponent) => {
  return !!comp.props.dataSource || !!comp.props.subDataSource
    || (!!comp.props.action && !CONTAINER_TYPE.includes(comp.type))
    || (comp.props.model && comp.props.attribute)
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
  if (ENUM_TYPE.includes(comp.type)) {
    return 'Enum'
  }
  throw new Error(`No dynamic found for ${comp.type}`)
}

export const formatCode = async (code: string) => {
  let formattedCode = `// 🚨 Your props contains invalid code`

  const prettier = await import('prettier/standalone')
  const babylonParser = await import('prettier/parser-babylon')

  formattedCode = prettier.format(code, {
    parser: 'babel',
    plugins: [babylonParser],
    semi: false,
    singleQuote: true,
  })

  return formattedCode
}

type BuildBlockParams = {
  component: IComponent
  components: IComponents
  forceBuildBlock?: boolean
  pages: { [key: string]: PageState }
  models: any,
  singleDataPage: boolean,
  noAutoSaveComponents: string[]
}

// Wether component is linked to a save action, thus must not save during onChange
const getNoAutoSaveComponents = (components: IComponents): IComponent[] => {
  let c=Object.values(components)
    .filter(c => c.props?.action=='save' && c.props?.actionProps)
    .map(c => JSON.parse(c.props.actionProps))
  c=c.map(obj => lodash.pickBy(obj, (_, k)=> /^component_/.test(k)))
  c=c.map(obj => Object.values(obj).filter(v => !!v))
  c=lodash.flattenDeep(c)
  c=lodash.uniq(c)
  return c
}

const buildBlock = ({
  component,
  components,
  forceBuildBlock = false,
  pages,
  models,
  singleDataPage,
  noAutoSaveComponents
}: BuildBlockParams) => {
  let content = ''
  const singleData=isSingleDataPage(components)
  component.children.forEach((key: string) => {
    let childComponent = components[key]
    if (childComponent.type === 'DataProvider') {
      return
    }
    if (!childComponent) {
      throw new Error(`invalid component ${key}`)
    } else if (forceBuildBlock || !childComponent.componentName) {
      const dataProvider = components[childComponent.props.dataSource]
      const isDpValid=getValidDataProviders(components).find(dp => dp.id==childComponent.props.dataSource)
      const paramProvider = dataProvider?.id.replace(/comp-/, '')
      const subDataProvider = components[childComponent.props.subDataSource]
      const paramSubProvider = subDataProvider?.id.replace(/comp-/, '')
      const componentName = isDynamicComponent(childComponent)
        ? `Dynamic${capitalize(childComponent.type)}`
        : isMaskableComponent(childComponent)
        ? `Maskable${capitalize(childComponent.type)}`
        : capitalize(childComponent.type)
      let propsContent = ''

      // DIRTY: stateValue for RAdioGroup to get value
      if ((['RadioGroup', 'Input', 'Select']).includes(childComponent.type)) {
        propsContent += ` setComponentValue={setComponentValue} `
      }
      propsContent += ` getComponentValue={getComponentValue} `

      // Set component id
      propsContent += ` id='${childComponent.id}' `
      // Set reload function
      propsContent += ` reload={reload} `
      // Provide page data context
      if (dataProvider && isDpValid) {
        if (singleDataPage) {
          propsContent += ` context={root?._id}`
        }
        else {
          propsContent += ` context={root?.[0]?._id}`
        }
      }

      if (noAutoSaveComponents.includes(childComponent.id)) {
        propsContent += ` noautosave={true} `
      }

      if (isDynamicComponent(childComponent)) {
        propsContent += ` backend='/'`
          let tp = null
            try {
              tp =getDataProviderDataType(
            components[childComponent.parent],
            components,
            childComponent.props.dataSource,
            models,
          )
        } catch (err) {
          console.error(err)
        }
          if (!tp) {
            try {
            tp = {
              type: components[childComponent.props.dataSource].props.model,
              multiple: true,
              ref: true,
            }
          } catch (err) {
            console.error(err)
          }
          }

          if (((childComponent.props.dataSource && tp?.type) || childComponent.props.model) && childComponent.props?.attribute) {
            const att=models[tp?.type || childComponent.props.model].attributes[childComponent.props?.attribute]
            if (att?.enumValues && (childComponent.type!='RadioGroup' || lodash.isEmpty(childComponent.children))) {
              propsContent += ` enum='${JSON.stringify(att.enumValues)}'`
            }
            if (att?.suggestions) {
              propsContent += ` suggestions='${JSON.stringify(att.suggestions)}'`
            }
          }
          if (tp?.type) {
            propsContent += ` dataModel='${tp.type}' `
          } else {
            console.error(
              `No data provider data type found for ${childComponent.parent}`,
            )
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

          if (propName === 'actionProps' || propName === 'nextActionProps') {
            const valuesCopy = {
              ...propsValue,
              page: propsValue.page
                ? getPageUrl(propsValue.page, pages)
                : undefined,
              redirect: propsValue.redirect
                ? getPageUrl(propsValue.redirect, pages)
                : undefined,
            }
            propsContent += ` ${propName}='${JSON.stringify(valuesCopy)}'`
            return
          }

          if (propName === 'dataSource') {
            if (!isDpValid) {
              return
            }
            propsContent += ` dataSourceId={'${propsValue}'}`
            if (propsValue) {propsContent += ` key={${propsValue.replace(/^comp-/, '')}${singleData? '': '[0]'}?._id}`}
          }

          if (propName === 'subDataSource') {
            propsContent += ` subDataSourceId={'${propsValue}'}`
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

          if (propName === 'filterValue') {
            propsContent += ` upd={componentsValues} `
          }

          if (propName === 'textFilter' && !!propsValue) {
            const compKey = propsValue.replace(/^comp-/, '')
            propsContent += ` textFilter={${compKey}}`
            return
          }

          if (/^conditions/.test(propName)) {
            propsContent += ` ${propName}={${JSON.stringify(propsValue)}}`
            return
          }

          if (propsValueAsObject && Object.keys(propsValue).length >= 1) {
            const gatheredProperties = Object.entries(propsValue)
              .map(([prop, value]) => {
                return ` '${prop}': '${value}' `
              })
              .join(', ')

            propsContent += `${propName}={{${gatheredProperties}}} `
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
              (propName === 'dataSource' && paramProvider)
                ? `={${paramProvider}}`
                :
                propName === 'subDataSource' && paramSubProvider
                  ? `={${paramSubProvider}}`
                : `='${encode(propsValue)}'`

            if (propsValue === true || propsValue === 'true') {
              operand = ` `
            } else if (
              propsValue === 'false' ||
              isBoolean(propsValue) ||
              !isNaN(propsValue)
            ) {
              operand = `={${propsValue}}`
            }

            if (propName=='href') {
              operand=`="${getPageUrl(propsValue, pages)}"`
            }
            
            if (propName=='color') {
              operand=`="${whatTheHexaColor(propsValue)}"`
            }
            
            propsContent += ` ${propName}${operand}`
          }
        })

      if (isFilterComponent(childComponent, components)) {
        const stateName = childComponent.id.replace(/^comp-/, '')
        propsContent += ` onChange={ev => set${stateName}(ev.target.value)}`
      }
      if (childComponent.type === 'Timer') {
        propsContent += ` backend='/'`
      }

      if (childComponent.type === 'Input' && childComponent.props.type=='password') {
        propsContent += ` displayEye`
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
        console.log(propsContent)
        content += `<${childComponent.props.icon} ${propsContent} />`
      } else if (childComponent.children.length) {
        content += `<${componentName} ${propsContent}>
      ${buildBlock({
        component: childComponent,
        components,
        forceBuildBlock,
        pages,
        models,
        singleDataPage,
        noAutoSaveComponents,
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
  singleDataPage: boolean,
  noAutoSaveComponents: string[]
) => {
  const codes = filter(components, comp => !!comp.componentName).map(comp => {
    return generateComponentCode({
      component: { ...components[comp.parent], children: [comp.id] },
      components,
      forceBuildBlock: true,
      componentName: comp.componentName,
      pages,
      singleDataPage,
      noAutoSaveComponents
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
  models: any[],
  singleDataPage: boolean,
  noAutoSaveComponents: string[]
}

export const generateComponentCode = ({
  component,
  components,
  componentName,
  forceBuildBlock,
  pages,
  models,
  singleDataPage,
  noAutoSaveComponents
}: GenerateComponentCode) => {
  let code = buildBlock({
    component,
    components,
    forceBuildBlock,
    pages,
    models,
    singleDataPage,
    noAutoSaveComponents,
  })

  code = `
const ${componentName} = () => (
  ${code}
)`

  return code
}

const getIconsImports = (components: IComponents, lib: string) => {
  return Object.keys(components).flatMap(name => {
    return Object.keys(components[name].props)
      .filter(prop => prop.toLowerCase().includes('icon'))
      .filter(prop => components[name].props['icon'].startsWith(lib))
      .filter(prop => !!components[name].props[prop])
      .map(prop => components[name].props[prop])
  })
}

const buildFilterStates = (components: IComponents) => {
  const filterComponents: IComponent[] = lodash(components)
    .pickBy(c =>
      Object.values(components).some(other => other?.props?.textFilter == c.id)
      ||
      Object.values(components).some(other => other?.props?.filterValue == c.id)
    )
    .values()

  return filterComponents
    .map(c => {
      const stateName: any = c.id.replace(/^comp-/, '')
      return `const [${stateName}, set${stateName}]=useState(null)`
    })
    .join('\n')
}

const getValidDataProviders = (components:IComponents): IComponent[] => {
  const result = lodash(components)
    .pickBy(c => (c.type=='DataProvider' || c.id=='root') && c.props?.model)
    .values()
  return result
}

const buildHooks = (components: IComponents) => {
  // Returns attributes names used in this dataProvider for 'dataProvider'
  const getDataProviderFields = (dataProvider: IComponent) => {
    const fields = getFieldsForDataProvider(dataProvider.id, components)
    return fields
  }

  const dataProviders=getValidDataProviders(components)
  if (dataProviders.length === 0) {
    return ''
  }

  const singlePage=isSingleDataPage(components)

  const isIdInDependencyArray = dataProviders.reduce((acc, curr, i) => {
    if (curr.id === 'root') {
      acc = true
    }
    return acc
  }, false)

  let code = `const get=axios.get`
  code +=
    '\n' +
    dataProviders
      .map(dp => {
        const dataId = dp.id.replace(/^comp-/, '')
        return `const [${dataId}, set${capitalize(dataId)}]=useState(${singlePage ? 'null':'[]'})`
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
        let thenClause=dp.id=='root' && singlePage ?
         `.then(res => set${capitalize(dataId)}(res.data[0]))`
         :
         `.then(res => set${capitalize(dataId)}(res.data))`

        let query= `get(\`${apiUrl}\`)
        ${thenClause}
        .catch(err => !(err.response?.status==401) && err.code!='ERR_NETWORK' && alert(err?.response?.data || err))`
        if (dp.id=='root' && singlePage) {
          query=`// For single data page\nif (id) {\n${query}\n}`
        }
        return query
      })
      .join('\n')}
  }, [get, ${isIdInDependencyArray ? 'id, ' : ''}refresh])\n`
  return code
}

const isFilterComponent = (component: IComponent, components: IComponents) => {
  return Object.values(components).some(
    c => c.props?.textFilter == component.id,
  )
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
  let filterStates = buildFilterStates(components)
  let dynamics = buildDynamics(components, extraImports)
  let maskable = buildMaskable(components, extraImports)
  const singleDataPage=isSingleDataPage(components)
  const noAutoSaveComponents=getNoAutoSaveComponents(components)

  let code = buildBlock({
    component: components.root,
    components,
    pages,
    models,
    singleDataPage,
    noAutoSaveComponents
  })
  let componentsCodes = buildComponents(components, pages, singleDataPage, noAutoSaveComponents)
  // const chakraIconImports = [...new Set(getIconsImports(components, 'chakra'))]
  // const lucideIconImports = [...new Set(getIconsImports(components, 'lucid'))]
  const iconImports = [...new Set(getIconsImports(components, 'chakra'))]

  

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

  const redirectPage=components?.root.props?.autoRedirectPage
  const autoRedirect =  redirectPage?
  `useEffect(()=>{
    if (user) {window.location='/${getPageUrl(redirectPage, pages)  }'}
  }, [user])`
  :
  ''
  code = `import React, {useState, useEffect} from 'react';
  import Metadata from './dependencies/Metadata';
  ${hooksCode ? `import axios from 'axios'` : ''}
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
import {ensureToken} from './dependencies/utils/token'
import {useLocation} from "react-router-dom"
import { useUserContext } from './dependencies/context/user'
import { getComponentDataValue } from './dependencies/utils/values'
import theme from './dependencies/theme/theme'
${extraImports.join('\n')}

${dynamics || ''}
${maskable || ''}
${componentsCodes}

const ${componentName} = () => {
  const query = new URLSearchParams(useLocation().search)
  const id=${rootIgnoreUrlParams ? 'null' : `query.get('${rootIdQuery}') || query.get('id')`}
  const [componentsValues, setComponentsValues]=useState({})

  const setComponentValue = (compId, value) => {
    setComponentsValues(s=> ({...s, [compId]: value}))
  }

  const getComponentValue = (compId, index) => {
    let value=componentsValues[compId]
    if (!value) {
      value=componentsValues[\`\$\{compId\}\$\{index\}\`]
    }
    if (!value) {
      value=getComponentDataValue(compId, index)
    }
    return value
  }

  // ensure token set if lost during domain change
  useEffect(() => {
    ensureToken()
  }, [])

  const {user}=useUserContext()
  ${autoRedirect}

  ${hooksCode}
  ${filterStates}

  return ${redirectPage ? 'user===null && ': ''} (
  <ChakraProvider resetCSS theme={theme}>
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
