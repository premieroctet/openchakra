export type MenuItem = {
  children?: MenuItems
  soon?: boolean
  rootParentType?: ComponentType
  group?: 'position' | 'form' | 'typography'
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
    group: 'position',
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
    group: 'position',
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
    group: 'position',
  },
  Container: {
    group: 'position',
  },
  Checkbox: {
    group: 'form',
  },
  CircularProgress: {},
  CloseButton: {},
  Code: {},
  Divider: {},
  Flex: {
    group: 'position',
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
    group: 'position',
  },
  GridItem: {
    group: 'position',
    title: 'Grid Item',
  },
  Heading: {
    group: 'typography',
  },
  Icon: {},
  IconButton: {
    title: 'Icon Button',
  },
  Image: {},
  Input: {
    group: 'form',
  },
  InputGroup: {
    group: 'form',
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
    group: 'form',
    title: 'Number Input',
    rootParentType: 'Input',
    children: {},
  },
  Progress: {},
  Radio: {
    group: 'form',
  },
  RadioGroup: {
    title: 'Radio group',
    group: 'form',
    rootParentType: 'Radio',
  },
  SimpleGrid: {
    group: 'position',
  },
  Spinner: {},
  Select: {
    group: 'form',
  },
  Stack: {
    group: 'position',
  },
  Switch: {
    group: 'form',
  },
  Tabs: {
    children: {
      Tabs: {},
      Tab: {},
      TabList: {},
      TabPanel: {},
      TabPanels: {},
    },
  },
  Tag: {},
  Text: {
    group: 'typography',
  },
  Textarea: {
    group: 'form',
  },
  Menu: { soon: true },
  Tabs: {
    children: {
      Tabs: {},
      Tab: {},
      TabList: {},
      TabPanel: {},
      TabPanels: {},
    },
  },
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
