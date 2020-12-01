import { generateComponentCode, generateCode, formatCode } from './code'

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
    componentName: 'MyBox',
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

const componentFixturesWithButtonIcon: IComponents = {
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
    componentName: 'MyBox',
  },
  'comp-2': {
    id: 'comp-2',
    props: {
      leftIcon: 'PhoneIcon',
    },
    children: [],
    type: 'Button',
    parent: 'comp-1',
    rootParentType: 'Button',
  },
}

describe('Code utils', () => {
  it('should generate component code', async () => {
    const code = await generateComponentCode({
      component: componentFixtures['root'],
      components: componentFixtures,
      componentName: 'MyBox',
      forceBuildBlock: true,
    })

    expect(await formatCode(code)).toEqual(`const MyBox = () => (
  <Box bg="whatsapp.500">
    <Text>Lorem Ipsum</Text>
  </Box>
)
`)
  })

  it('should generate whole tree code', async () => {
    const code = await generateCode(componentFixtures)

    expect(code).toEqual(`import React from 'react'
import { ChakraProvider, Box, Text } from '@chakra-ui/react'

const MyBox = () => (
  <Box bg="whatsapp.500">
    <Text>Lorem Ipsum</Text>
  </Box>
)

const App = () => (
  <ChakraProvider resetCSS>
    <MyBox />
  </ChakraProvider>
)

export default App
`)
  })

  it('should generate icons imports and icon instanciation', async () => {
    const code = await generateCode(componentFixturesWithButtonIcon)

    expect(code).toEqual(`import React from 'react'
import { ChakraProvider, Box, Button } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'

const MyBox = () => (
  <Box bg="whatsapp.500">
    <Button leftIcon={<PhoneIcon />} />
  </Box>
)

const App = () => (
  <ChakraProvider resetCSS>
    <MyBox />
  </ChakraProvider>
)

export default App
`)
  })
})
