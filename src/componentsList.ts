export type MenuItem = {
  children?: MenuItems
  soon?: boolean
  rootParentType?: ComponentType
  group?: 'positionnement' | 'formulaire' | 'typographie'
  title?: string
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
      AccordionItem: {
        title: 'Accordion item',
      },
      AccordionButton: {
        title: 'Accordion button',
      },
      AccordionPanel: {
        title: 'Accordion panel',
      },
      AccordionIcon: {
        title: 'Accordion icon',
      },
    },
  },
  Alert: {
    children: {
      Alert: {},
      AlertDescription: {
        title: 'Alert description',
      },
      AlertIcon: {},
      AlertTitle: {},
    },
  },
  AspectRatio: {
    title: 'Aspect Ratio',
    group: 'positionnement',
  },
  AvatarGroup: {
    title: 'Avatar group',
    rootParentType: 'Avatar',
  },
  Avatar: {},
  AvatarBadge: {
    title: 'Avatar badge',
    rootParentType: 'Avatar',
  },
  Badge: {},
  Box: {
    group: 'positionnement',
  },
  Breadcrumb: {
    children: {
      BreadcrumbItem: {
        title: 'Breadcrumb item',
      },
      BreadcrumbLink: {
        title: 'Breadcrumb link',
      },
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
    title: 'Form Control',
    children: {
      FormControl: {},
      FormLabel: {
        title: 'Form label',
      },
      FormHelperText: {
        title: 'Form helper text',
      },
      FormErrorMessage: {
        title: 'Form error message',
      },
    },
  },
  Grid: {
    group: 'positionnement',
  },
  GridItem: {
    group: 'positionnement',
    title: 'Grid Item',
  },
  Heading: {
    group: 'typographie',
  },
  Icon: {},
  IconButton: {
    title: 'Icon Button',
  },
  Image: {},
  Input: {
    group: 'formulaire',
  },
  InputGroup: {
    group: 'formulaire',
    title: 'Input group',
    rootParentType: 'Input',
    children: {
      InputGroup: {
        title: 'Input group',
      },
      Input: {},
      InputLeftAddon: {
        title: 'Input left addon',
      },
      InputRightAddon: {
        title: 'Input right addon',
      },
      InputRightElement: {
        title: 'Input right element',
      },
      InputLeftElement: {
        title: 'Input left element',
      },
    },
  },
  Link: {},
  List: {
    children: {
      List: {},
      ListItem: {
        title: 'List item',
      },
    },
  },
  NumberInput: {
    title: 'Number input',
    group: 'formulaire',
  },
  Progress: {},
  Radio: {
    group: 'formulaire',
  },
  RadioGroup: {
    title: 'Radio group',
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
