const ALERT_COMPONENTS: (ComponentType | MetaComponentType)[] = [
  'Alert',
  'AlertDescription',
  'AlertIcon',
  'AlertTitle',
]
const TABLE_COMPONENTS: (ComponentType | MetaComponentType)[] = [
  'Table',
  'Thead',
  'Tbody',
  'Tfoot',
  'Tr',
  'Th',
  'Td',
  'TableCaption',
  'TableContainer',
]

const COMPONENTS: (ComponentType | MetaComponentType)[] = [
  ...ALERT_COMPONENTS,
  'Avatar',
  'AvatarBadge',
  'AvatarGroup',
  'Badge',
  'Box',
  'Button',
  'Card', 
  'CardHeader', 
  'CardBody', 
  'CardFooter',
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
  'Popover',
  'PopoverTrigger',
  'PopoverContent',
  'PopoverHeader',
  'PopoverBody',
  'PopoverFooter',
  'PopoverArrow',
  'PopoverCloseButton',
  'PopoverAnchor',
  'Modal',
  'ModalOverlay',
  'ModalContent',
  'ModalHeader',
  'ModalFooter',
  'ModalBody',
  'ModalCloseButton',
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
  'TagLabel',
  'TagLeftIcon',
  'TagRightIcon',
  'TagCloseButton',
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
  ...TABLE_COMPONENTS,
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
  'Tooltip',
  // Allow meta components
  'AlertMeta',
  'FormControlMeta',
  'AccordionMeta',
  'ListMeta',
  'InputGroupMeta',
  'BreadcrumbMeta',
  'TabsMeta',
  'StatMeta',
  'TableMeta',
  'TableRowMeta',
  'ConditionalMeta',
  'ModalMeta',
  'CardMeta',
  'TagMeta',
  'PopoverMeta',
  // Allow custom components
  'Conditional',
  'Loop',
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
