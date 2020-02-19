/// <reference types="react-scripts" />;
declare module 'prettier/standalone'
declare module 'coloreact'

type ComponentType =
  | 'AspectRatioBox'
  | 'Badge'
  | 'Box'
  | 'Button'
  | 'Breadcrumb'
  | 'Icon'
  | 'IconButton'
  | 'Image'
  | 'Text'
  | 'Progress'
  | 'AvatarBadge'
  | 'AvatarGroup'
  | 'Avatar'
  | 'Checkbox'
  | 'Link'
  | 'Spinner'
  | 'CloseButton'
  | 'Divider'
  | 'Textarea'
  | 'CircularProgress'
  | 'Heading'
  | 'Tag'
  | 'Switch'
  | 'SimpleGrid'
  | 'Alert'
  | 'AlertIcon'
  | 'AlertTitle'
  | 'AlertDescription'
  | 'Flex'
  | 'Stack'
  | 'Accordion'
  | 'AccordionItem'
  | 'AccordionHeader'
  | 'AccordionPanel'
  | 'AccordionIcon'
  | 'FormControl'
  | 'FormLabel'
  | 'FormHelperText'
  | 'FormErrorMessage'
  | 'TabList'
  | 'TabPanel'
  | 'TabPanels'
  | 'Tab'
  | 'Tabs'
  | 'Code'
  | 'Editable'
  | 'Menu'
  | 'NumberInput'
  | 'Radio'
  | 'RadioGroup'
  | 'Select'
  | 'List'
  | 'ListItem'
  | 'ListIcon'
  | 'Input'
  | 'InputGroup'
  | 'InputLeftAddon'
  | 'InputRightAddon'
  | 'InputLeftElement'
  | 'InputRightElement'
  | 'FormControlMeta'
  | 'AccordionMeta'
  | 'ListMeta'
  | 'AlertMeta'
  | 'InputGroupMeta'
  | 'Grid'
  | 'NumberInput'
  | 'Breadcrumb'
  | 'BreadcrumbItem'
  | 'BreadcrumbLink'
  | 'BreadcrumbMeta'

interface IComponent {
  children: string[]
  type: ComponentType
  parent: string
  id: string
  props: any
  rootParentType?: ComponentType
  masterComponentName?: string
  originId?: string
}

interface IComponents {
  [name: string]: IComponent
}

interface IPreviewProps {
  component: IComponent
}

interface IUserComponent {
  root: IComponent
  components: IComponents
}

interface IUserComponents {
  [name: string]: IUserComponent
}

interface ComponentItemProps {
  id: string
  label: string
  type: ComponentType
  isMoved?: boolean
  isChild?: boolean
  isMeta?: boolean
  soon?: boolean
  rootParentType?: ComponentType
  isUserComponent?: boolean
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    REACT_APP_VERSION: string
  }
}
