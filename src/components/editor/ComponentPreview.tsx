import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import AlertPreview, { AlertTitlePreview } from './previews/AlertPreview'
import { RootState } from '../..'
import AvatarPreview, {
  AvatarBadgePreview,
  AvatarGroupPreview,
} from './previews/AvatarPreview'
import StackPreview from './previews/StackPreview'
import AccordionPreview, {
  AccordionHeaderPreview,
} from './previews/AccordionPreview'
import { RadioGroupPreview } from './previews/RadioPreview'
import SelectPreview from './previews/SelectPreview'
import SimplePreviewContainer from './SimplePreviewContainer'
import * as Chakra from '@chakra-ui/core'
import WithChildrenPreviewContainer from './WithChildrenPreviewContainer'
import InputGroupPreview from './previews/InputGroupPreview'
import InputLeftAddonPreview from './previews/InputLeftAddonPreview'
import InputRightAddonPreview from './previews/InputRightAddonPreview'

const ComponentPreview: React.FC<{
  componentName: string
}> = ({ componentName }) => {
  const component = useSelector(
    (state: RootState) => state.components.present.components[componentName],
  )
  const type = (component && component.type) || null

  switch (type) {
    // Simple components
    case 'Badge':
    case 'Button':
    case 'Icon':
    case 'IconButton':
    case 'Image':
    case 'Text':
    case 'Progress':
    case 'Link':
    case 'Spinner':
    case 'CloseButton':
    case 'Checkbox':
    case 'Divider':
    case 'Code':
    case 'Textarea':
    case 'CircularProgress':
    case 'Heading':
    case 'Tag':
    case 'Switch':
    case 'AlertIcon':
    case 'AlertDescription':
    case 'FormLabel':
    case 'FormHelperText':
    case 'FormErrorMessage':
    case 'TabPanel':
    case 'Tab':
    case 'Input':
    case 'Radio':
    case 'ListItem':
    case 'ListIcon':
      return (
        <SimplePreviewContainer component={component} type={Chakra[type]} />
      )
    // Components with childrens
    case 'Box':
    case 'SimpleGrid':
    case 'Flex':
    case 'AccordionPanel':
    case 'AccordionItem':
    case 'AccordionIcon':
    case 'FormControl':
    case 'Tabs':
    case 'TabList':
    case 'TabPanels':
    case 'InputLeftElement':
    case 'InputRightElement':
    case 'List':
      return (
        <WithChildrenPreviewContainer
          component={component}
          type={Chakra[type]}
        />
      )
    // More complex components
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
    default:
      return null
  }
}

export default memo(ComponentPreview)
