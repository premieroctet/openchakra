import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import AlertPreview from '~components/editor/previews/AlertPreview'
import AvatarPreview, {
  AvatarBadgePreview,
  AvatarGroupPreview,
} from '~components/editor/previews/AvatarPreview'
import AccordionPreview, {
  AccordionButtonPreview,
  AccordionItemPreview,
  AccordionPanelPreview,
} from '~components/editor/previews/AccordionPreview'
import * as Chakra from '@chakra-ui/react'
import { getComponentBy } from '~core/selectors/components'
import { InputRightElementPreview } from '~components/editor/previews/InputRightElement'
import { InputLeftElementPreview } from '~components/editor/previews/InputLeftElement'
import AspectRatioPreview from '~components/editor/previews/AspectRatioBoxPreview'
import ButtonPreview from '~components/editor/previews/ButtonPreview'
import PreviewContainer from '~components/editor/PreviewContainer'
import WithChildrenPreviewContainer from '~components/editor/WithChildrenPreviewContainer'
import IconPreview from './previews/IconPreview'
import IconButtonPreview from './previews/IconButtonPreview'
import SelectPreview from '~components/editor/previews/SelectPreview'
import NumberInputPreview from '~components/editor/previews/NumberInputPreview'
import BreadcrumbPreview from './previews/BreadcrumbPreview'
import BreadcrumbItemPreview from './previews/BreadcrumbItemPreview'

const ComponentPreview: React.FC<{
  componentName: string
  index: number
}> = ({ componentName, index, ...forwardedProps }) => {
  const component = useSelector(getComponentBy(componentName))

  if (!component) {
    console.error(`ComponentPreview unavailable for component ${componentName}`)
  }

  const type = (component && component.type) || null

  switch (type) {
    // Simple components
    case 'Badge':
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
    case 'BreadcrumbLink':
      return (
        <PreviewContainer
          index={index}
          component={component}
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
    case 'ListIcon':
    case 'Divider':
    case 'AlertDescription':
    case 'AlertTitle':
    case 'InputRightAddon':
    case 'InputLeftAddon':
    case 'Tag':
      return (
        <PreviewContainer
          index={index}
          component={component}
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
    case 'Center':
    case 'Container':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          index={index}
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
        />
      )
    case 'RadioGroup':
    case 'Stack':
    case 'InputGroup':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          index={index}
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
        />
      )
    // More complex components
    case 'InputRightElement':
      return <InputRightElementPreview component={component} index={index} />
    case 'InputLeftElement':
      return <InputLeftElementPreview component={component} index={index} />
    case 'Avatar':
      return <AvatarPreview component={component} index={index} />
    case 'AvatarBadge':
      return <AvatarBadgePreview component={component} index={index} />
    case 'AvatarGroup':
      return <AvatarGroupPreview component={component} index={index} />
    case 'Alert':
      return <AlertPreview component={component} index={index} />
    case 'Accordion':
      return <AccordionPreview component={component} index={index} />
    case 'AccordionButton':
      return <AccordionButtonPreview component={component} index={index} />
    case 'AccordionItem':
      return <AccordionItemPreview component={component} index={index} />
    case 'AccordionPanel':
      return <AccordionPanelPreview component={component} index={index} />
    case 'AspectRatio':
      return <AspectRatioPreview component={component} index={index} />
    case 'Button':
      return <ButtonPreview component={component} index={index} />
    case 'Breadcrumb':
      return <BreadcrumbPreview component={component} index={index} />
    case 'BreadcrumbItem':
      return <BreadcrumbItemPreview component={component} index={index} />
    case 'Icon':
      return <IconPreview component={component} index={index} />
    case 'IconButton':
      return <IconButtonPreview component={component} index={index} />
    case 'Select':
      return <SelectPreview component={component} index={index} />
    case 'NumberInput':
      return <NumberInputPreview component={component} index={index} />
    default:
      return null
  }
}

export default memo(ComponentPreview)
