import Composer from './composer'

type ComposedComponent = {
  components: IComponents
  root: string
  parent: string
}

export const buildAlert = (parent: string): ComposedComponent => {
  const composer = new Composer()

  const nodeId = composer.addNode({
    type: 'Alert',
    parent,
  })

  composer.addNode({ type: 'AlertIcon', parent: nodeId })
  composer.addNode({ type: 'AlertTitle', parent: nodeId })
  composer.addNode({ type: 'AlertDescription', parent: nodeId })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildTable = (parent: string): ComposedComponent => {
  const composer = new Composer()

  const nodeId = composer.addNode({
    type: 'TableContainer',
    parent,
  })

  const tableId = composer.addNode({ type: 'Table', parent: nodeId })
  const headId = composer.addNode({ type: 'Thead', parent: tableId })
  const headRowId = composer.addNode({ type: 'Tr', parent: headId })
  composer.addNode({ type: 'Th', parent: headRowId })
  composer.addNode({ type: 'Th', parent: headRowId })
  const bodyId = composer.addNode({ type: 'Tbody', parent: tableId })
  const bodyRowId = composer.addNode({ type: 'Tr', parent: bodyId })
  composer.addNode({ type: 'Td', parent: bodyRowId })
  composer.addNode({ type: 'Td', parent: bodyRowId })
  const footId = composer.addNode({ type: 'Tfoot', parent: tableId })
  const footRowId = composer.addNode({ type: 'Tr', parent: footId })
  composer.addNode({ type: 'Th', parent: footRowId })
  composer.addNode({ type: 'Th', parent: footRowId })
  composer.addNode({ type: 'TableCaption', parent: tableId })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildTableRow = (parent: string): ComposedComponent => {
  const composer = new Composer()

  const nodeId = composer.addNode({
    type: 'Tr',
    parent,
  })

  composer.addNode({ type: 'Td', parent: nodeId })
  composer.addNode({ type: 'Td', parent: nodeId })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildBreadcrumb = (parent: string): ComposedComponent => {
  const composer = new Composer()

  const nodeId = composer.addNode({ type: 'Breadcrumb', parent })
  const itemId = composer.addNode({ type: 'BreadcrumbItem', parent: nodeId })
  composer.addNode({ type: 'BreadcrumbLink', parent: itemId })

  const secondItemId = composer.addNode({
    type: 'BreadcrumbItem',
    parent: nodeId,
  })
  composer.addNode({ type: 'BreadcrumbLink', parent: secondItemId })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildConditional = (parent: string): ComposedComponent => {
  const composer = new Composer()

  const nodeId = composer.addNode({ type: 'Conditional', parent })
  composer.addNode({ type: 'Box', parent: nodeId })
  composer.addNode({ type: 'Box', parent: nodeId })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildFormControl = (parent: string): ComposedComponent => {
  const composer = new Composer()

  const nodeId = composer.addNode({ type: 'FormControl', parent })

  composer.addNode({ type: 'FormLabel', parent: nodeId })
  composer.addNode({ type: 'Input', parent: nodeId, rootParentType: 'Input' })
  composer.addNode({ type: 'FormHelperText', parent: nodeId })
  composer.addNode({ type: 'FormErrorMessage', parent: nodeId })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildAccordion = (parent: string): ComposedComponent => {
  const composer = new Composer('Accordion')

  const nodeId = composer.addNode({ type: 'Accordion', parent })
  const itemId = composer.addNode({ type: 'AccordionItem', parent: nodeId })
  const headerId = composer.addNode({ type: 'AccordionButton', parent: itemId })
  const panelId = composer.addNode({ type: 'AccordionPanel', parent: itemId })

  composer.addNode({ type: 'Text', parent: headerId, rootParentType: 'Text' })
  composer.addNode({ type: 'AccordionIcon', parent: headerId })
  composer.addNode({ type: 'Text', parent: panelId, rootParentType: 'Text' })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildModal = (parent: string): ComposedComponent => {
  const composer = new Composer()

  const nodeId = composer.addNode({ type: 'Modal', parent })
  composer.addNode({ type: 'ModalOverlay', parent: nodeId })
  const content = composer.addNode({ type: 'ModalContent', parent: nodeId })
  composer.addNode({ type: 'ModalHeader', parent: content })
  composer.addNode({ type: 'ModalCloseButton', parent: content })
  const body = composer.addNode({ type: 'ModalBody', parent: content })
  composer.addNode({
    type: 'Text',
    parent: body,
    props: {
      children:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore.',
    },
  })
  const footer = composer.addNode({ type: 'ModalFooter', parent: content })
  composer.addNode({
    type: 'Button',
    parent: footer,
    props: { children: 'Cancel', variant: 'ghost' },
  })
  composer.addNode({
    type: 'Button',
    parent: footer,
    props: { children: 'Proceed', variant: 'solid', ml: 3 },
  })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildTabs = (parent: string): ComposedComponent => {
  const composer = new Composer('Tabs')

  const nodeId = composer.addNode({ type: 'Tabs', parent })
  const tabListId = composer.addNode({ type: 'TabList', parent: nodeId })
  const tabPanelsId = composer.addNode({ type: 'TabPanels', parent: nodeId })

  composer.addNode({
    type: 'Tab',
    parent: tabListId,
    props: { children: 'One' },
  })
  composer.addNode({
    type: 'Tab',
    parent: tabListId,
    props: { children: 'Two' },
  })

  const firstPanel = composer.addNode({
    type: 'TabPanel',
    parent: tabPanelsId,
  })
  const secondPanel = composer.addNode({
    type: 'TabPanel',
    parent: tabPanelsId,
  })

  composer.addNode({
    type: 'Text',
    parent: firstPanel,
    props: { children: 'One !' },
  })

  composer.addNode({
    type: 'Text',
    parent: secondPanel,
    props: { children: 'Two !' },
  })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildStats = (parent: string): ComposedComponent => {
  const composer = new Composer('Stat')

  const nodeId = composer.addNode({ type: 'Stat', parent })

  composer.addNode({
    type: 'StatLabel',
    parent: nodeId,
    props: { children: 'Stat label' },
  })
  composer.addNode({
    type: 'StatNumber',
    parent: nodeId,
    props: { children: '45' },
  })
  const helpTextId = composer.addNode({
    type: 'StatHelpText',
    parent: nodeId,
  })
  composer.addNode({
    type: 'StatArrow',
    parent: helpTextId,
    props: { type: 'increase' },
  })

  composer.addNode({
    type: 'Text',
    parent: helpTextId,
    props: { children: '23.36%' },
  })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildList = (parent: string): ComposedComponent => {
  const composer = new Composer('List')

  const nodeId = composer.addNode({ type: 'List', parent })
  composer.addNode({ type: 'ListItem', parent: nodeId })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildInputGroup = (parent: string): ComposedComponent => {
  const composer = new Composer('Input')

  const nodeId = composer.addNode({ type: 'InputGroup', parent })
  composer.addNode({
    type: 'InputLeftAddon',
    parent: nodeId,
    props: { children: 'Email' },
  })
  composer.addNode({ type: 'Input', parent: nodeId })

  const elementId = composer.addNode({
    type: 'InputRightElement',
    parent: nodeId,
  })
  composer.addNode({
    type: 'Icon',
    parent: elementId,
    props: { name: 'email' },
  })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildPopover = (parent: string): ComposedComponent => {
  const composer = new Composer()

  const nodeId = composer.addNode({ type: 'Popover', parent })
  composer.addNode({ type: 'PopoverTrigger', parent: nodeId })
  const content = composer.addNode({ type: 'PopoverContent', parent: nodeId })
  composer.addNode({ type: 'PopoverArrow', parent: content })
  composer.addNode({ type: 'PopoverCloseButton', parent: content })
  composer.addNode({ type: 'PopoverHeader', parent: content })
  composer.addNode({ type: 'PopoverBody', parent: content })
  const footer = composer.addNode({ type: 'PopoverFooter', parent: content })
  composer.addNode({
    type: 'Button',
    parent: footer,
    props: { children: 'Confirm!', variant: 'ghost', size: 'sm' },
  })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildCard = (parent: string): ComposedComponent => {
  const composer = new Composer()

  const nodeId = composer.addNode({ type: 'Card', parent })
  const header = composer.addNode({ type: 'CardHeader', parent: nodeId })
  composer.addNode({
    type: 'Heading',
    parent: header,
    props: { children: 'Card Title' },
  })
  const body = composer.addNode({ type: 'CardBody', parent: nodeId })
  composer.addNode({
    type: 'Text',
    parent: body,
    props: {
      children:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore.',
    },
  })
  const footer = composer.addNode({ type: 'CardFooter', parent: nodeId })
  composer.addNode({
    type: 'Button',
    parent: footer,
    props: { children: 'Accept' },
  })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildTag = (parent: string): ComposedComponent => {
  const composer = new Composer()

  const nodeId = composer.addNode({ type: 'Tag', parent })
  composer.addNode({ type: 'TagLeftIcon', parent: nodeId })
  composer.addNode({ type: 'TagLabel', parent: nodeId })
  composer.addNode({ type: 'TagCloseButton', parent: nodeId })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildRangeSlider = (parent: string): ComposedComponent => {
  const composer = new Composer()
  const nodeId = composer.addNode({ type: 'RangeSlider' })
  const track = composer.addNode({ type: 'RangeSliderTrack', parent: nodeId })
  composer.addNode({ type: 'RangeSliderFilledTrack', parent: track })
  composer.addNode({ type: 'RangeSliderThumb', parent: nodeId , props: {index: '0'}})
  composer.addNode({ type: 'RangeSliderThumb', parent: nodeId , props: {index: '1'}})
  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

type BuilderFn = (parent: string) => ComposedComponent

type ComposerBuilders = {
  [k: string]: BuilderFn
}

const builders: ComposerBuilders = {
  AlertMeta: buildAlert,
  FormControlMeta: buildFormControl,
  AccordionMeta: buildAccordion,
  ListMeta: buildList,
  InputGroupMeta: buildInputGroup,
  BreadcrumbMeta: buildBreadcrumb,
  TabsMeta: buildTabs,
  StatMeta: buildStats,
  TableMeta: buildTable,
  TableRowMeta: buildTableRow,
  ConditionalMeta: buildConditional,
  ModalMeta: buildModal,
  CardMeta: buildCard,
  TagMeta: buildTag,
  PopoverMeta: buildPopover,
  RangeSliderMeta: buildRangeSlider,
}

export default builders
