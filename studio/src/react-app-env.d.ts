/// <reference types="react-scripts" />;
declare module 'prettier/standalone'
declare module 'coloreact'
declare module 'browser-fs-access'

type ComponentType =
  | 'Accordion'
  | 'AccordionItem'
  | 'AccordionButton'
  | 'AccordionPanel'
  | 'AccordionIcon'
  | 'Alert'
  | 'AlertIcon'
  | 'AlertTitle'
  | 'AlertDescription'
  | 'AspectRatio'
  | 'AvatarBadge'
  | 'AvatarGroup'
  | 'Avatar'
  | 'Badge'
  | 'Box'
  | 'Breadcrumb'
  | 'BreadcrumbItem'
  | 'BreadcrumbLink'
  | 'Button'
  | 'Calendar'
  | 'Card'
  | 'Chart'
  | 'Center'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'CircularProgress'
  | 'CloseButton'
  | 'Code'
  | 'Container'
  | 'Date'
  | 'DataProvider'
  | 'Divider'
  | 'Editable'
  | 'Flex'
  | 'FormControl'
  | 'FormLabel'
  | 'FormHelperText'
  | 'FormErrorMessage'
  | 'Grid'
  | 'GridItem'
  | 'Heading'
  | 'Icon'
  | 'IconButton'
  | 'Image'
  | 'Input'
  | 'UploadFile'
  | 'IconCheck'
  | 'InputGroup'
  | 'InputLeftAddon'
  | 'InputRightAddon'
  | 'InputLeftElement'
  | 'InputRightElement'
  | 'Lexical'
  | 'Link'
  | 'List'
  | 'ListItem'
  | 'ListIcon'
  | 'Media'
  | 'Menu'
  | 'NumberFormat'
  | 'NumberInput'
  | 'NumberInputField'
  | 'NumberInputStepper'
  | 'NumberIncrementStepper'
  | 'NumberDecrementStepper'
  | 'Rating'
  | 'Progress'
  | 'Radio'
  | 'RadioGroup'
  | 'Select'
  | 'SimpleGrid'
  | 'Spinner'
  | 'Stack'
  | 'Switch'
  | 'Tab'
  | 'Tabs'
  | 'Table'
  | 'Tabs'
  | 'TabList'
  | 'TabPanel'
  | 'TabPanels'
  | 'Tag'
  | 'Text'
  | 'Textarea'
  | 'Timer'
  | 'VisuallyHidden'

type MetaComponentType =
  | 'FormControlMeta'
  | 'AccordionMeta'
  | 'ListMeta'
  | 'AlertMeta'
  | 'CardMeta'
  | 'InputGroupMeta'
  | 'NumberInputMeta'
  | 'UploadFileMeta'
  | 'BreadcrumbMeta'
  | 'TabsMeta'

interface IComponent {
  children: string[]
  type: ComponentType
  parent: string
  id: string
  props: any
  rootParentType?: ComponentType
  componentName?: string
}

interface IComponents {
  [name: string]: IComponent
}

interface IPreviewProps {
  component: IComponent
}

interface IDataType {
  type: string
  multiple: boolean
  ref: boolean
}

interface IWarning {
  pageId: string
  pageName: string
  component: IComponent
  message: string
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
  children?: React.ReactNode
}

class Filter {
  attribute: string
  operator: string
  value?: any
}
