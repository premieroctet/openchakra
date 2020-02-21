import isBoolean from 'lodash/isBoolean'

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const formatCode = async (code: string) => {
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

type BuildBlock = {
  component: IComponent
  components: IComponents
  userComponents: IComponent[]
  forceBuildBlock?: boolean
}

const buildBlock = ({
  component,
  components,
  userComponents,
  forceBuildBlock = false,
}: BuildBlock) => {
  let content = ''

  component.children.forEach((key: string) => {
    let childComponent = components[key]
    if (!childComponent) {
      console.error(`invalid component ${key}`)
    } else if (
      forceBuildBlock ||
      (!childComponent.instanceOf && !childComponent.userComponentName)
    ) {
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
      ${buildBlock({
        component: childComponent,
        components,
        userComponents,
        forceBuildBlock,
      })}
      </${componentName}>`
      } else {
        content += `<${componentName} ${propsContent} />`
      }
    } else {
      if (childComponent.instanceOf) {
        content += `<${
          components[childComponent.instanceOf].userComponentName
        } />`
      } else if (childComponent.userComponentName) {
        content += `<${childComponent.userComponentName} />`
      }
    }
  })

  return content
}

const buildComponents = async (
  components: IComponents,
  userComponents: IComponent[],
) => {
  const codes = await Promise.all(
    userComponents.map(comp => {
      return generateComponentCode({
        component: {
          ...components[comp.parent],
          children: [comp.id],
        },
        components: {
          ...components,
          [comp.id]: {
            ...components[comp.id],
            userComponentName: undefined,
          },
        },
        name: comp.userComponentName,
        userComponents,
      })
    }),
  )

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
  name?: string
  userComponents: IComponent[]
  forceBuildBlock?: boolean
}

export const generateComponentCode = async ({
  component,
  components,
  name = `My${component.type}`,
  userComponents,
  forceBuildBlock = false,
}: GenerateComponentCode) => {
  let code = buildBlock({
    component,
    components,
    userComponents,
    forceBuildBlock,
  })

  code = `
const ${name} = () => (
  ${code}
)`

  return await formatCode(code)
}

export const generateCode = async (
  components: IComponents,
  userComponents: IComponent[],
) => {
  let code = buildBlock({
    component: components.root,
    components,
    userComponents,
  })
  let componentsCodes = await buildComponents(components, userComponents)

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
