import { useSelector } from 'react-redux'
import * as Chakra from '@chakra-ui/react'
import React, { memo } from 'react'

import { InputLeftElementPreview } from '~components/editor/previews/InputLeftElement'
import { InputRightElementPreview } from '~components/editor/previews/InputRightElement'
import { getComponentBy } from '~core/selectors/components'
import AccordionPreview, {
  AccordionButtonPreview,
  AccordionItemPreview,
  AccordionPanelPreview,
} from '~components/editor/previews/AccordionPreview'
import AlertPreview from '~components/editor/previews/AlertPreview'
import AspectRatioPreview from '~components/editor/previews/AspectRatioBoxPreview'
import AvatarPreview, {
  AvatarBadgePreview,
  AvatarGroupPreview,
} from '~components/editor/previews/AvatarPreview'
import ButtonPreview from '~components/editor/previews/ButtonPreview'
import NumberInputPreview from '~components/editor/previews/NumberInputPreview'
import IconCheckPreview from '~components/editor/previews/IconCheckPreview'
import RadioGroupPreview from '~components/editor/previews/RadioGroupPreview'
import CheckboxGroupPreview from '~components/editor/previews/CheckboxGroupPreview'
import PreviewContainer from '~components/editor/PreviewContainer'
import SelectPreview from '~components/editor/previews/SelectPreview'
import WithChildrenPreviewContainer from '~components/editor/WithChildrenPreviewContainer'

import { getComponentWarnings } from '../../core/selectors/components'
import { getShowOverview } from '../../core/selectors/app'
import BreadcrumbItemPreview from './previews/BreadcrumbItemPreview'
import BreadcrumbPreview from './previews/BreadcrumbPreview'
import IconButtonPreview from './previews/IconButtonPreview'
import IconPreview from './previews/IconPreview'

type previews = {
  [index: string]: {
    previewComponent?: React.FC<IPreviewProps>
    isBoxWrapped?: boolean
  }
}
let extraPreviews: previews = {}

const ComponentPreview: React.FC<{
  componentName: string
  id?: string
  bgColor?: string | null
}> = ({ componentName, ...forwardedProps }) => {
  const showOverview = useSelector(getShowOverview)

  const component: IComponent = useSelector(getComponentBy(componentName))
  if (!component) {
    console.error(`ComponentPreview unavailable for component ${componentName}`)
  }

  //* TODO reimplement
  // const warnings = useSelector(getComponentWarnings(component))
  //
  // // Light red background in case of warnings
  // if (showOverview) {
  //   if (warnings.length > 0) {
  //     forwardedProps.bgColor = 'red.100'
  //   }
  // }

  const type = (component && component.type) || null

  const extraPreview = extraPreviews[type]
  if (extraPreview) {
    const { previewComponent /**isBoxWrapped*/ } = extraPreview
    if (previewComponent) {
      //@ts-ignore
      return React.createElement(previewComponent, { component })
    }
    throw new Error('Extra component without previewComponent')
  }

  switch (type) {
    // Simple components
    case 'Badge':
    case 'Image':
    case 'Text':
    case 'Spinner':
    case 'Checkbox':
    case 'Textarea':
    case 'CircularProgress':
    case 'Heading':
    case 'Switch':
    case 'FormHelperText':
    case 'FormErrorMessage':
    case 'Input':
    case 'Radio':
    case 'ListItem':
    case 'BreadcrumbLink':
      return (
        <PreviewContainer
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
        />
      )
    // Wrapped functional components (forward ref issue)
    case 'AlertIcon':
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
    case 'FormLabel':
    case 'Tabs':
    case 'Tab':
    case 'Link':
    case 'List':
    case 'Progress':
    case 'TabList':
    case 'TabPanel':
    case 'TabPanels':
    case 'Grid':
    case 'GridItem':
    case 'Center':
    case 'Container':
    case 'VisuallyHidden':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
        />
      )
    case 'Stack':
    case 'InputGroup':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
        />
      )
    // More complex components
    case 'CheckboxGroup':
      return <CheckboxGroupPreview component={component} />
    case 'RadioGroup':
      return <RadioGroupPreview component={component} />
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
    case 'Accordion':
      return <AccordionPreview component={component} />
    case 'AccordionButton':
      return <AccordionButtonPreview component={component} />
    case 'AccordionItem':
      return <AccordionItemPreview component={component} />
    case 'AccordionPanel':
      return <AccordionPanelPreview component={component} />
    case 'AspectRatio':
      return <AspectRatioPreview component={component} />
    case 'Button':
      return <ButtonPreview component={component} />
    case 'Breadcrumb':
      return <BreadcrumbPreview component={component} />
    case 'BreadcrumbItem':
      return <BreadcrumbItemPreview component={component} />
    case 'Icon':
      return <IconPreview component={component} />
    case 'IconButton':
      return <IconButtonPreview component={component} />
    case 'Select':
      return <SelectPreview component={component} />
    case 'NumberInput':
      return <NumberInputPreview component={component} />
    case 'IconCheck':
      return <IconCheckPreview component={component} />
    default:
      return null
  }
}

type previewParams = {
  componentType: string
  previewComponent?: React.FC<IPreviewProps>
  isBoxWrapped?: boolean
}

export const registerPreview = ({
  componentType,
  previewComponent,
  isBoxWrapped,
}: previewParams) => {
  extraPreviews[componentType] = { previewComponent, isBoxWrapped }
}

export default memo(ComponentPreview)
