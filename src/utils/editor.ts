const ALERT_COMPONENTS: (ComponentType | MetaComponentType)[] = [
  'Alert',
  'AlertDescription',
  'AlertIcon',
  'AlertTitle',
]

const MENU_COMPONENTS: (ComponentType | MetaComponentType)[] = [
  'Menu',
  'MenuList',
  'MenuButton',
  'MenuItem',
  'MenuGroup',
  'MenuDivider',
  'MenuOptionGroup',
  'MenuItemOption',
]

export const COMPONENTS: (ComponentType | MetaComponentType)[] = [
  ...ALERT_COMPONENTS,
  'Avatar',
  'AvatarBadge',
  'AvatarGroup',
  'Badge',
  'Box',
  'Button',
  'Checkbox',
  'CircularProgress',
  'CloseButton',
  'Code',
  'Divider',
  'Flex',
  'FormControl',
  'FormLabel',
  'FormHelperText',
  'FormErrorMessage',
  'Grid',
  'Heading',
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
  'Stack',
  'Switch',
  'Tag',
  'Text',
  'Textarea',
  'Tab',
  'Accordion',
  'Editable',
  'AspectRatioBox',
  'Breadcrumb',
  'BreadcrumbItem',
  'BreadcrumbLink',
  ...MENU_COMPONENTS,
  'NumberInput',
  'AccordionItem',
  'AccordionHeader',
  'AccordionPanel',
  'AccordionIcon',
  'InputRightElement',
  'InputLeftElement',
  // Allow meta components
  'AlertMeta',
  'FormControlMeta',
  'AccordionMeta',
  'ListMeta',
  'InputGroupMeta',
  'BreadcrumbMeta',
  'MenuMeta',
]

export const AccordionWhitelist: (
  | ComponentType
  | MetaComponentType
)[] = COMPONENTS.filter(name => !ALERT_COMPONENTS.includes(name))

export const MenuWhitelist: (
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
        'AccordionHeader',
        'AccordionPanel',
        'AccordionIcon',
        'MenuButton',
        'MenuItem',
        'MenuGroup',
        'MenuDivider',
        'MenuOptionGroup',
        'MenuItemOption',
        'MenuList',
      ].includes(name),
  )
