import Composer from './composer'

export const buildAlert = (parent: string) => {
  const composer = new Composer()

  const nodeId = composer.addNode('Alert')

  composer.addNode('AlertIcon', nodeId)
  composer.addNode('AlertTitle', nodeId)
  composer.addNode('AlertDescription', nodeId)

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildFormControl = (parent: string) => {
  const composer = new Composer()

  const nodeId = composer.addNode('FormControl')

  composer.addNode('FormLabel', nodeId)
  composer.addNode('Input', nodeId)
  composer.addNode('FormHelperText', nodeId)
  composer.addNode('FormErrorMessage', nodeId)

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildAccordion = (parent: string) => {
  const composer = new Composer()

  const nodeId = composer.addNode('Accordion')
  const itemId = composer.addNode('AccordionItem', nodeId)
  const headerId = composer.addNode('AccordionHeader', itemId)
  const panelId = composer.addNode('AccordionPanel', itemId)

  composer.addNode('Text', headerId)
  composer.addNode('AccordionIcon', headerId)
  composer.addNode('Text', panelId)

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildList = (parent: string) => {
  const composer = new Composer()

  const nodeId = composer.addNode('List')
  composer.addNode('ListItem', nodeId)

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildInputGroup = (parent: string) => {
  const composer = new Composer()

  const nodeId = composer.addNode('InputGroup')
  composer.addNode('InputLeftAddon', nodeId)
  composer.addNode('Input', nodeId)
  composer.addNode('InputRightAddon', nodeId)

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

const builders: any = {
  AlertMeta: buildAlert,
  FormControlMeta: buildFormControl,
  AccordionMeta: buildAccordion,
  ListMeta: buildList,
  InputGroupMeta: buildInputGroup,
}

export default builders
