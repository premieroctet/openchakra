import { generateComponentCode, generateCode } from './code'

const componentFixtures: IComponents = {
  root: {
    id: 'root',
    parent: 'root',
    type: 'Box',
    children: ['comp-1'],
    props: {},
  },
  'comp-1': {
    id: 'comp-1',
    props: {
      bg: 'whatsapp.500',
    },
    children: ['comp-2'],
    type: 'Box',
    parent: 'root',
    rootParentType: 'Box',
    userComponentName: 'MyAwesomeComponent',
  },
  'comp-2': {
    id: 'comp-2',
    props: {
      children: 'Lorem Ipsum',
    },
    children: [],
    type: 'Text',
    parent: 'comp-1',
    rootParentType: 'Text',
  },
}

const userComponents: IComponent[] = [componentFixtures['comp-1']]

describe('Code utils', () => {
  it('should generate component code', async () => {
    const name = 'MyAwesomeComponent'
    const code = await generateComponentCode({
      component: componentFixtures['root'],
      components: componentFixtures,
      userComponents,
      name,
      forceBuildBlock: true,
    })

    expect(code).toEqual(`const ${name} = () => (
  <Box bg="whatsapp.500">
    <Text>Lorem Ipsum</Text>
  </Box>
)
`)
  })

  it('should generate whole tree code', async () => {
    const code = await generateCode(componentFixtures, userComponents)

    expect(code).toEqual(`import React from 'react'
import { ThemeProvider, CSSReset, theme, Box, Text } from '@chakra-ui/core'

const ${componentFixtures['comp-1'].userComponentName} = () => (
  <Box bg="whatsapp.500">
    <Text>Lorem Ipsum</Text>
  </Box>
)

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <MyAwesomeComponent />
  </ThemeProvider>
)

export default App
`)
  })
})
