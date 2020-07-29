import isBoolean from 'lodash/isBoolean'
import filter from 'lodash/filter'

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
  } catch (e) {}

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
    if (!childComponent) {
      console.error(`invalid component ${key}`)
    } else if (forceBuildBlock || !childComponent.componentName) {
      const componentName = capitalize(childComponent.type)
      let propsContent = ''

      const propsNames = Object.keys(childComponent.props)

      propsNames.forEach((propName: string) => {
        const propsValue = childComponent.props[propName]

        if (propName !== 'children' && propsValue) {
          let operand = `='${propsValue}'`

          if (propsValue === true || propsValue === 'true') {
            operand = ``
          } else if (
            propsValue === 'false' ||
            isBoolean(propsValue) ||
            !isNaN(propsValue)
          ) {
            operand = `={${propsValue}}`
          }

          propsContent += `${propName}${operand} `
        }
      })

      if (
        typeof childComponent.props.children === 'string' &&
        childComponent.children.length === 0
      ) {
        content += `<${componentName} ${propsContent}>${childComponent.props.children}</${componentName}>`
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

export const generateCode = async (components: IComponents) => {
  let code = buildBlock({ component: components.root, components })
  let componentsCodes = buildComponents(components)

  const imports = [
    ...new Set(
      Object.keys(components)
        .filter(name => name !== 'root')
        .map(name => components[name].type),
    ),
  ]

  code = `import React from 'react';
import {
  ThemeProvider,
  CSSReset,
  theme,
  ${imports.join(',')}
} from "@chakra-ui/core";

${componentsCodes}

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    ${code}
  </ThemeProvider>
);

export default App;`

  return await formatCode(code)
}
