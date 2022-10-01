import isBoolean from 'lodash/isBoolean'
import filter from 'lodash/filter'
import icons from '~iconsList'

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

const buildStyledProps = (propsNames: string[], childComponent: IComponent) => {
  let propsContent = ``

  propsNames.forEach((propName: string) => {
    const propsValue = childComponent.props[propName]

    if (
      propName.toLowerCase().includes('icon') &&
      childComponent.type !== 'Icon'
    ) {
      if (Object.keys(icons).includes(propsValue)) {
        let operand = `={<${propsValue} />}`

        propsContent += `${propName}${operand} `
      }
    } else if (propName !== 'children' && propsValue) {
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

  return propsContent
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

      const propsNames = Object.keys(childComponent.props).filter(propName => {
        if (childComponent.type === 'Icon') {
          return propName !== 'icon'
        }

        return true
      })

      // Special case for Highlight component
      if (componentName === 'Highlight') {
        const [query, children, ...restProps] = propsNames
        propsContent += buildStyledProps([query, children], childComponent)

        propsContent += `styles={{${restProps
          .filter(propName => childComponent.props[propName])
          .map(
            propName => `${propName}:'${childComponent.props[propName]}'`,
          )}}}`
      } else {
        propsContent += buildStyledProps(propsNames, childComponent)
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

export const generateCode = async (components: IComponents) => {
  let code = buildBlock({ component: components.root, components })
  let componentsCodes = buildComponents(components)
  const iconImports = Array.from(new Set(getIconsImports(components)))

  const imports = [
    ...new Set(
      Object.keys(components)
        .filter(name => name !== 'root')
        .map(name => components[name].type),
    ),
  ]

  code = `import React from 'react';
import {
  ChakraProvider,
  ${imports.join(',')}
} from "@chakra-ui/react";${
    iconImports.length
      ? `
import { ${iconImports.join(',')} } from "@chakra-ui/icons";`
      : ''
  }

${componentsCodes}

const App = () => (
  <ChakraProvider resetCSS>
    ${code}
  </ChakraProvider>
);

export default App;`

  return await formatCode(code)
}

export const generatePreview = async ( components: IComponents ) => {
  let code = buildBlock({ component: components.root, components })
  let componentsCodes = buildComponents(components)
  const iconImports = Array.from(new Set(getIconsImports(components)))

  const imports = [
    ...new Set(
      Object.keys(components)
        .map(name => components[name].type),
    ),
  ]

  code = `import React from 'react'
  import { useDropComponent } from '~hooks/useDropComponent'
  import { useInteractive } from '~hooks/useInteractive'
  ${imports.length? 
    `import {
      ${imports.join(',')}
    } from "@chakra-ui/react";` : ''
  }
  ${
    iconImports.length
      ? `
import { ${iconImports.join(',')} } from "@chakra-ui/icons";`
      : ''
  }  
  
  interface Props { 
    component: IComponent
  }
  
  const SamplePreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)
  
  if (isOver) {
      props.bg = 'teal.50'
    }
  
    return (<Box {...props} ref={ref}>${code}</Box>)
  }
  
  export default SamplePreview`

  code = await formatCode(code)

  console.log(code);

  return code;

}

export const generatePanel = async ( components: IComponents ) => {
  let code = buildBlock({ component: components.root, components })
  let componentsCodes = buildComponents(components)
  const iconImports = Array.from(new Set(getIconsImports(components)))

  let panelCode = `import React, { memo } from 'react'
  ${components.root.params?.some(param => param.type === "string" || param.type === "number") ?
   `import TextControl from '~components/inspector/controls/TextControl'` : ''}
  ${components.root.params?.some(param => param.type === "boolean") ? 
  `import SwitchControl from '~components/inspector/controls/SwitchControl'` : ''}
  ${components.root.params?.some(param => param.type === "color") ? 
  `import ColorsControl from '~components/inspector/controls/ColorsControl'` : ''}
  ${components.root.params?.some(param => param.type === "display") ? 
  `import FormControl from '~components/inspector/controls/FormControl'
  import { useForm } from '~hooks/useForm'
  import usePropsSelector from '~hooks/usePropsSelector'
  import { Select } from '@chakra-ui/react'` : ''}
  ${components.root.params?.some(param => param.type === "icon") ? 
  `import IconControl from '~components/inspector/controls/IconControl'` : ''}
  
  const SamplePanel = () => {
    ${components.root.params?.some(param => param.type === "display") ? 
  `const { setValueFromEvent } = useForm()
  ${components.root.params.filter(param => param.type === "display")
    .map(param => {return (`const ${param.name} = usePropsSelector('${param.name}')
      const alignItems = usePropsSelector('alignItems')
      const flexDirection = usePropsSelector('flexDirection')
      const justifyContent = usePropsSelector('justifyContent')`)})}` : ''}
    return (
    <>
    ${components.root.params?.some(param => param.type === "string" || param.type === "number") ? 
    `${components.root.params.filter(param => param.type === "string" || param.type === "number")
    .map(param => `<TextControl label="${param.name}" name="${param.name}" />`)}` : ''}
    ${components.root.params?.some(param => param.type === "boolean") ? 
    `${components.root.params.filter(param => param.type === "boolean")
    .map(param => `<SwitchControl label="${param.name}" name="${param.name}" />`)}` : ''}
    ${components.root.params?.some(param => param.type === "color") ? 
    `${components.root.params.filter(param => param.type === "color")
    .map(param => `<ColorsControl label="${param.name}" name="${param.name}" />`)}` : ''}
    ${components.root.params?.some(param => param.type === "icon") ? 
    `${components.root.params.filter(param => param.type === "icon")
    .map(param => `<IconControl label="${param.name}" name="${param.name}" />`)}` : ''}
    ${components.root.params?.some(param => param.type === "display") ? 
    `${components.root.params.filter(param => param.type === "display")
    .map(param =>{ return ( `<FormControl htmlFor="${param.name}" label="${param.name}">
    <Select
      id="${param.name}"
      onChange={setValueFromEvent}
      name="${param.name}"
      size="sm"
      value={${param.name} || ''}
    >
      <option>block</option>
      <option>flex</option>
      <option>inline</option>
      <option>grid</option>
    </Select>
  </FormControl>
  {${param.name} === 'flex' ? (<><FormControl label="flexDirection">
  <Select
    name="flexDirection"
    size="sm"
    value={flexDirection || ''}
    onChange={setValueFromEvent}
  >
    <option>row</option>
    <option>row-reverse</option>
    <option>column</option>
    <option>column-reverse</option>
  </Select>
</FormControl>

<FormControl label="justifyContent">
  <Select
    name="justifyContent"
    size="sm"
    value={justifyContent || ''}
    onChange={setValueFromEvent}
  >
    <option>flex-start</option>
    <option>center</option>
    <option>flex-end</option>
    <option>space-between</option>
    <option>space-around</option>
  </Select>
</FormControl>

<FormControl label="alignItems">
  <Select
    name="alignItems"
    size="sm"
    value={alignItems || ''}
    onChange={setValueFromEvent}
  >
    <option>stretch</option>
    <option>flex-start</option>
    <option>center</option>
    <option>flex-end</option>
    <option>space-between</option>
    <option>space-around</option>
  </Select>
</FormControl></>) : null}
  `)})}
  ` : ''}
    </>
    )
  }

  export default memo(SamplePanel)
  `

  panelCode = await formatCode(panelCode)

  console.log(panelCode);

  return panelCode;

}
