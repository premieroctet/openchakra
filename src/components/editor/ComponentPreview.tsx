import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import AlertPreview, {
  AlertTitlePreview,
  AlertDescriptionPreview,
} from './previews/AlertPreview'
import AvatarPreview, {
  AvatarBadgePreview,
  AvatarGroupPreview,
} from './previews/AvatarPreview'
import StackPreview from './previews/StackPreview'
import AccordionPreview, {
  AccordionHeaderPreview,
  AccordionItemPreview,
  AccordionPanelPreview,
} from './previews/AccordionPreview'
import { RadioGroupPreview } from './previews/RadioPreview'
import SelectPreview from './previews/SelectPreview'
import SimplePreviewContainer from './SimplePreviewContainer'
import * as Chakra from '@chakra-ui/core'
import WithChildrenPreviewContainer from './WithChildrenPreviewContainer'
import InputGroupPreview from './previews/InputGroupPreview'
import InputLeftAddonPreview from './previews/InputLeftAddonPreview'
import InputRightAddonPreview from './previews/InputRightAddonPreview'
import { getComponentBy } from '../../core/selectors/components'
import WithBoxRefSimplePreviewContainer from './WithRefSimplePreviewContainer'
import { InputRightElementPreview } from './previews/InputRightElement'
import { InputLeftElementPreview } from './previews/InputLeftElement'
import AspectRatioBoxPreview from './previews/AspectRatioBoxPreview'

const ComponentPreview: React.FC<{
  componentName: string
}> = ({ componentName }) => {
  const component = useSelector(getComponentBy(componentName))
  if (!component) {
    console.error(`ComponentPreview unavailable for component ${componentName}`)
  }

  const type = (component && component.type) || null

  switch (type) {
    // Simple components
    case 'Badge':
    case 'Button':
    case 'Icon':
    case 'IconButton':
    case 'Image':
    case 'Text':
    case 'Link':
    case 'Spinner':
    case 'Checkbox':
    case 'Divider':
    case 'Textarea':
    case 'CircularProgress':
    case 'Heading':
    case 'Switch':
    case 'FormLabel':
    case 'FormHelperText':
    case 'FormErrorMessage':
    case 'TabPanel':
    case 'Tab':
    case 'Input':
    case 'Radio':
    case 'ListItem':
    case 'NumberInput':
      return (
        <SimplePreviewContainer component={component} type={Chakra[type]} />
      )
    // Wrapped functional components (forward ref issue)
    case 'AlertIcon':
    case 'Progress':
    case 'CloseButton':
    case 'AccordionIcon':
    case 'Code':
    case 'ListIcon':
    case 'Tag':
      return (
        <WithBoxRefSimplePreviewContainer
          component={component}
          type={Chakra[type]}
        />
      )
    // Components with childrens
    case 'Box':
    case 'SimpleGrid':
    case 'Flex':
    case 'FormControl':
    case 'Tabs':
    case 'List':
    case 'TabList':
    case 'TabPanels':
    case 'Grid':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Chakra[type]}
        />
      )
    // More complex components
    case 'InputRightElement':
      return <InputRightElementPreview component={component} />
    case 'InputLeftElement':
      return <InputLeftElementPreview component={component} />
    case 'Avatar':
      return <AvatarPreview component={component} />
    case 'AvatarBadge':
      return <AvatarBadgePreview component={component} />
    case 'AvatarGroup':
      return <AvatarGroupPreview component={component} />
    case 'Alert':
      return <AlertPreview component={component} />
    case 'AlertTitle':
      return <AlertTitlePreview component={component} />
    case 'AlertDescription':
      return <AlertDescriptionPreview component={component} />
    case 'Stack':
      return <StackPreview component={component} />
    case 'Accordion':
      return <AccordionPreview component={component} />
    case 'AccordionHeader':
      return <AccordionHeaderPreview component={component} />
    case 'RadioGroup':
      return <RadioGroupPreview component={component} />
    case 'Select':
      return <SelectPreview component={component} />
    case 'InputGroup':
      return <InputGroupPreview component={component} />
    case 'InputLeftAddon':
      return <InputLeftAddonPreview component={component} />
    case 'InputRightAddon':
      return <InputRightAddonPreview component={component} />
    case 'AccordionItem':
      return <AccordionItemPreview component={component} />
    case 'AccordionPanel':
      return <AccordionPanelPreview component={component} />
    case 'AspectRatioBox':
      return <AspectRatioBoxPreview component={component} />
    default:
      return null
  }
}

export default memo(ComponentPreview)
