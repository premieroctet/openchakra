import { useSelector } from 'react-redux'
import { getCustomComponentNames } from '~core/selectors/customComponents'

const ALERT_COMPONENTS: (ComponentType | MetaComponentType)[] = [
  'Alert',
  'AlertDescription',
  'AlertIcon',
  'AlertTitle',
]

const CustomComponents = () => {
  const customComponents = useSelector(getCustomComponentNames)
  return customComponents
}

export const COMPONENTS: (ComponentType | MetaComponentType)[] = [
  ...ALERT_COMPONENTS,
  'Avatar',
  'AvatarBadge',
  'AvatarGroup',
  'Badge',
  'Box',
  'Button',
  'Center',
  'Checkbox',
  'CircularProgress',
  'CloseButton',
  'Code',
  'Container',
  'Divider',
  'Flex',
  'FormControl',
  'FormLabel',
  'FormHelperText',
  'FormErrorMessage',
  'Grid',
  'Heading',
  'Highlight',
  'Icon',
  'IconButton',
  'Image',
  'Input',
  'InputGroup',
  'InputRightAddon',
  'InputLeftAddon',
  'Link',
  'List',
  'ListItem',
  'Progress',
  'Radio',
  'RadioGroup',
  'SimpleGrid',
  'Spinner',
  'Select',
  'Skeleton',
  'SkeletonCircle',
  'SkeletonText',
  'Stack',
  'Switch',
  'Tag',
  'Text',
  'Kbd',
  'Textarea',
  'Tab',
  'Accordion',
  'Editable',
  'AspectRatio',
  'Breadcrumb',
  'BreadcrumbItem',
  'BreadcrumbLink',
  'Menu',
  'NumberInput',
  'AccordionItem',
  'AccordionButton',
  'AccordionPanel',
  'AccordionIcon',
  'InputRightElement',
  'InputLeftElement',
  'Tab',
  'TabList',
  'TabPanel',
  'TabPanels',
  'Tabs',
  'Stat',
  'StatLabel',
  'StatNumber',
  'StatHelpText',
  'StatArrow',
  'StatGroup',
  // Allow meta components
  'AlertMeta',
  'FormControlMeta',
  'AccordionMeta',
  'ListMeta',
  'InputGroupMeta',
  'BreadcrumbMeta',
  'TabsMeta',
  'StatMeta',
  // Allow custom components
  'CC',
  'Sample',
  ...CustomComponents(),
]

export const AccordionWhitelist: (
  | ComponentType
  | MetaComponentType
)[] = COMPONENTS.filter(name => !ALERT_COMPONENTS.includes(name))

export const rootComponents = COMPONENTS
  // Remove specific components
  .filter(
    name =>
      ![
        'AlertIcon',
        'AlertDescription',
        'AlertTitle',
        'AvatarBadge',
        'AccordionButton',
        'AccordionPanel',
        'AccordionIcon',
        'BreadcrumbItem',
        'BreadcrumbLink',
      ].includes(name),
  )
