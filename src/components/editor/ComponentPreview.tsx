import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import AlertPreview from './previews/AlertPreview'
import AvatarPreview, {
  AvatarBadgePreview,
  AvatarGroupPreview,
} from './previews/AvatarPreview'
import AccordionPreview, {
  AccordionHeaderPreview,
  AccordionItemPreview,
  AccordionPanelPreview,
} from './previews/AccordionPreview'
import * as Chakra from '@chakra-ui/core'
import WithChildrenPreviewContainer from './WithChildrenPreviewContainer'
import { getComponentBy } from '../../core/selectors/components'
import PreviewContainer from './PreviewContainer'
import { InputRightElementPreview } from './previews/InputRightElement'
import { InputLeftElementPreview } from './previews/InputLeftElement'
import AspectRatioBoxPreview from './previews/AspectRatioBoxPreview'
import MenuPreview, {
  MenuListPreview,
  MenuButtonPreview,
  MenuGroupPreview,
  MenuItemPreview,
} from './previews/MenuPreview'

const ComponentPreview: React.FC<{
  componentName: string
}> = ({ componentName, ...forwardedProps }) => {
  const componentToBeDisplayed = useSelector(getComponentBy(componentName))

  if (!componentToBeDisplayed) {
    console.error(`ComponentPreview unavailable for component ${componentName}`)
  }

  const type = (componentToBeDisplayed && componentToBeDisplayed.type) || null
  switch (type) {
    // Simple components
    case 'Badge':
    case 'Button':
    case 'IconButton':
    case 'Image':
    case 'Text':
    case 'Link':
    case 'Spinner':
    case 'Checkbox':
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
    case 'BreadcrumbLink':
    case 'Select':
      return (
        <PreviewContainer
          component={componentToBeDisplayed}
          type={Chakra[type]}
          {...forwardedProps}
        />
      )
    // Wrapped functional components (forward ref issue)
    case 'AlertIcon':
    case 'Progress':
    case 'CloseButton':
    case 'AccordionIcon':
    case 'Code':
    case 'Icon':
    case 'ListIcon':
    case 'Divider':
    case 'AlertDescription':
    case 'AlertTitle':
    case 'InputRightAddon':
    case 'InputLeftAddon':
    case 'Tag':
    case 'MenuDivider':
    case 'MenuItemOption':
      return (
        <PreviewContainer
          component={componentToBeDisplayed}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
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
          component={componentToBeDisplayed}
          type={Chakra[type]}
          {...forwardedProps}
        />
      )
    case 'RadioGroup':
    case 'Stack':
    case 'Breadcrumb':
    case 'InputGroup':
    case 'BreadcrumbItem':
    case 'MenuOptionGroup':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={componentToBeDisplayed}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
        />
      )
    // More complex components
    case 'InputRightElement':
      return <InputRightElementPreview component={componentToBeDisplayed} />
    case 'InputLeftElement':
      return <InputLeftElementPreview component={componentToBeDisplayed} />
    case 'Avatar':
      return <AvatarPreview component={componentToBeDisplayed} />
    case 'AvatarBadge':
      return <AvatarBadgePreview component={componentToBeDisplayed} />
    case 'AvatarGroup':
      return <AvatarGroupPreview component={componentToBeDisplayed} />
    case 'Alert':
      return <AlertPreview component={componentToBeDisplayed} />
    case 'Accordion':
      return <AccordionPreview component={componentToBeDisplayed} />
    case 'AccordionHeader':
      return <AccordionHeaderPreview component={componentToBeDisplayed} />
    case 'AccordionItem':
      return <AccordionItemPreview component={componentToBeDisplayed} />
    case 'AccordionPanel':
      return <AccordionPanelPreview component={componentToBeDisplayed} />
    case 'AspectRatioBox':
      return <AspectRatioBoxPreview component={componentToBeDisplayed} />
    case 'Menu':
      return <MenuPreview component={componentToBeDisplayed} />
    case 'MenuList':
      return <MenuListPreview component={componentToBeDisplayed} />
    case 'MenuButton':
      return <MenuButtonPreview component={componentToBeDisplayed} />
    case 'MenuItem':
      return <MenuItemPreview component={componentToBeDisplayed} />
    case 'MenuGroup':
      return <MenuGroupPreview component={componentToBeDisplayed} />
    default:
      return null
  }
}

export default memo(ComponentPreview)
