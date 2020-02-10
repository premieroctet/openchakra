import React from 'react'
import { render } from '@testing-library/react'
import { init } from '@rematch/core'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { ThemeProvider, theme } from '@chakra-ui/core'

import ComponentPreview from './ComponentPreview'
import { storeConfig } from '../../core/store'

function renderWithRedux(
  components: React.ReactNode,
  {
    // @ts-ignore
    initialState,
    // @ts-ignore
    store = init(storeConfig),
  } = {},
) {
  return {
    ...render(
      <ThemeProvider theme={theme}>
        <DndProvider backend={Backend}>
          <Provider store={store}>{components}</Provider>
        </DndProvider>
      </ThemeProvider>,
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

const componentsToTest = [
  'Badge',
  'Button',
  'Icon',
  'IconButton',
  'Image',
  'Text',
  'Progress',
  'Link',
  'Spinner',
  'CloseButton',
  'Checkbox',
  'Divider',
  'Code',
  'Textarea',
  'CircularProgress',
  'Heading',
  'Tag',
  'Switch',
  'FormLabel',
  'FormHelperText',
  'FormErrorMessage',
  'TabPanel',
  // 'Tab',
  'Input',
  'Radio',
  'ListItem',
  'ListIcon',
  // 'AlertIcon',
  // 'AccordionIcon',
  'Box',
  'SimpleGrid',
  'Flex',
  // 'AccordionPanel',
  // 'AccordionItem',
  'FormControl',
  // 'Tabs',
  // 'TabList',
  // 'TabPanels',
  'InputLeftElement',
  'InputRightElement',
  'List',
  'Avatar',
  'AvatarBadge',
  'AvatarGroup',
  'Alert',
  'AlertTitle',
  'AlertDescription',
  'Stack',
  'Accordion',
  // 'AccordionHeader',
  'RadioGroup',
  'Select',
  'InputGroup',
  'InputLeftAddon',
  'InputRightAddon',
]

test.each(componentsToTest)('Component Preview for %s', componentName => {
  // const spy = jest.spyOn(global.console, 'error')
  // @ts-ignore
  const store = init(storeConfig)
  store.dispatch.components.addComponent({
    parentName: 'root',
    type: componentName,
    rootParentType: componentName,
    testId: 'test',
  })

  // console.log(componentName, store.getState().components.present.components);
  // @ts-ignore
  renderWithRedux(<ComponentPreview componentName="test" />, { store })
  // expect(spy).not.toHaveBeenCalled();
})
