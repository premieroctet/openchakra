export type MenuItem = {
  children?: MenuItems
  soon?: boolean
  rootParentType?: ComponentType
  group?: 'positionnement' | 'formulaire' | 'typographie'
}

type MenuItems = Partial<
  {
    [k in ComponentType]: MenuItem
  }
>

let menuItems: MenuItems = {
  Accordion: {
    children: {
      Accordion: {},
      AccordionItem: {},
      AccordionButton: {},
      AccordionPanel: {},
      AccordionIcon: {},
    },
  },
  Alert: {
    children: {
      Alert: {},
      AlertDescription: {},
      AlertIcon: {},
      AlertTitle: {},
    },
  },
  AspectRatio: {
    group: 'positionnement',
  },
  AvatarGroup: {
    rootParentType: 'Avatar',
  },
  Avatar: {},
  AvatarBadge: {
    rootParentType: 'Avatar',
  },
  Badge: {},
  Box: {
    group: 'positionnement',
  },
  Breadcrumb: {
    children: {
      BreadcrumbItem: {},
      BreadcrumbLink: {},
    },
  },
  Button: {},
  Center: {
    group: 'positionnement',
  },
  Container: {
    group: 'positionnement',
  },
  Checkbox: {
    group: 'formulaire',
  },
  CircularProgress: {},
  CloseButton: {},
  Code: {},
  Divider: {},
  Flex: {
    group: 'positionnement',
  },
  FormControl: {
    children: {
      FormControl: {},
      FormLabel: {},
      FormHelperText: {},
      FormErrorMessage: {},
    },
  },
  Grid: {
    group: 'positionnement',
  },
  GridItem: {
    group: 'positionnement',
  },
  Heading: {
    group: 'typographie',
  },
  Icon: {},
  IconButton: {},
  Image: {},
  Input: {
    group: 'formulaire',
  },
  InputGroup: {
    group: 'formulaire',
    rootParentType: 'Input',
    children: {
      InputGroup: {},
      Input: {},
      InputLeftAddon: {},
      InputRightAddon: {},
      InputRightElement: {},
      InputLeftElement: {},
    },
  },
  Link: {},
  List: {
    children: {
      List: {},
      ListItem: {},
    },
  },
  NumberInput: {
    group: 'formulaire',
  },
  Progress: {},
  Radio: {
    group: 'formulaire',
  },
  RadioGroup: {
    group: 'formulaire',
    rootParentType: 'Radio',
  },
  SimpleGrid: {
    group: 'positionnement',
  },
  Spinner: {},
  Select: {
    group: 'formulaire',
  },
  Stack: {
    group: 'positionnement',
  },
  Switch: {
    group: 'formulaire',
  },
  Tag: {},
  Text: {
    group: 'typographie',
  },
  Textarea: {
    group: 'formulaire',
  },
  Menu: { soon: true },
  Tab: { soon: true },
  /*"Tabs",
  "TabList",
  "TabPanel",
  "TabPanels"*/
}

const componentsList: ComponentType[] = [
  'Accordion',
  'AccordionIcon',
  'AccordionItem',
  'AccordionPanel',
  'Alert',
  'AlertDescription',
  'AlertIcon',
  'AlertTitle',
  'AspectRatio',
  'Avatar',
  'AvatarBadge',
  'AvatarGroup',
  'Badge',
  'Box',
  'Breadcrumb',
  'BreadcrumbItem',
  'BreadcrumbLink',
  'Button',
  'Center',
  'Checkbox',
  'CircularProgress',
  'CloseButton',
  'Code',
  'Container',
  'Divider',
  'Editable',
  'Flex',
  'FormControl',
  'FormErrorMessage',
  'FormHelperText',
  'FormLabel',
  'Grid',
  'Heading',
  'Icon',
  'IconButton',
  'Image',
  'Input',
  'InputGroup',
  'InputLeftAddon',
  'InputLeftElement',
  'InputRightAddon',
  'InputRightElement',
  'Link',
  'List',
  'ListIcon',
  'ListItem',
  'Menu',
  'NumberInput',
  'Progress',
  'Radio',
  'RadioGroup',
  'Select',
  'SimpleGrid',
  'Spinner',
  'Stack',
  'Switch',
  'Tab',
  'TabList',
  'TabPanel',
  'TabPanels',
  'Tabs',
  'Tag',
  'Text',
  'Textarea',
]

export const registerComponentType = (componentType: ComponentType) => {
  if (componentsList.includes(componentType)) {
    throw new Error(`${componentType} is already registered`)
  }
  componentsList.push(componentType)
}

type menuParams = {
  componentType: ComponentType
  menuChildren: object
}

export const registerComponentMenu = ({
  componentType,
  menuChildren,
}: menuParams) => {
  if (componentType in menuItems) {
    throw new Error(`${componentType} is already registered in menus`)
  }
  menuItems[componentType] = menuChildren
}

export { menuItems, componentsList }
