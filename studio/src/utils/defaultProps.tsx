import React from 'react'
import * as Chakra from '@chakra-ui/react'

import {
  BadgeProps,
  BoxProps,
  ButtonProps,
  IconProps,
  IconButtonProps,
  ImageProps,
  ProgressProps,
  AvatarGroupProps,
  AvatarProps,
  CheckboxProps,
  LinkProps,
  SpinnerProps,
  CloseButtonProps,
  HeadingProps,
  TagProps,
  SimpleGridProps,
  SwitchProps,
  AlertProps,
  FlexProps,
  StackProps,
  AccordionProps,
  AccordionButtonProps,
  AccordionItemProps,
  FormControlProps,
  TabListProps,
  TabPanelProps,
  TabPanelsProps,
  TabsProps,
  InputProps,
  AspectRatioProps,
  BreadcrumbItemProps,
  EditableProps,
  MenuProps,
  NumberInputProps,
  NumberInputFieldProps,
  NumberInputStepperProps,
  NumberIncrementStepperProps,
  NumberDecrementStepperProps,
  RadioProps,
  SelectProps,
  RadioGroupProps,
  InputGroupProps,
  GridProps,
  CenterProps,
  ContainerProps,
  AvatarBadgeProps,
  CircularProgressProps,
  TextProps,
  DividerProps,
  CodeProps,
  TextareaProps,
  AlertIconProps,
  AlertTitleProps,
  AlertDescriptionProps,
  AccordionPanelProps,
  FormLabelProps,
  FormErrorMessageProps,
  TabProps,
  BreadcrumbLinkProps,
  ListProps,
} from '@chakra-ui/react'

import iconsList from '~iconsList'

type DataProviderProps = {
  model?: string
}
type PropsWithForm<T> = T & {
  dataProvider?: string
  form?: T
}

interface DynamicTextProps extends TextProps {
  attribte?: string
}

type PreviewDefaultProps = {
  Badge?: PropsWithForm<BadgeProps>
  Box?: PropsWithForm<BoxProps>
  Button?: PropsWithForm<ButtonProps>
  Icon?: PropsWithForm<IconProps> & { icon: keyof typeof iconsList }
  IconButton?: PropsWithForm<IconButtonProps>
  Image?: PropsWithForm<ImageProps>
  Text?: PropsWithForm<DynamicTextProps>
  Progress?: PropsWithForm<ProgressProps>
  AvatarBadge?: PropsWithForm<AvatarBadgeProps>
  AvatarGroup?: PropsWithForm<Omit<AvatarGroupProps, 'children'>>
  Avatar?: PropsWithForm<AvatarProps>
  Checkbox?: PropsWithForm<CheckboxProps>
  Link?: PropsWithForm<LinkProps>
  Spinner?: PropsWithForm<SpinnerProps>
  CloseButton?: PropsWithForm<CloseButtonProps>
  Divider?: PropsWithForm<DividerProps>
  Code?: PropsWithForm<CodeProps>
  Textarea?: PropsWithForm<TextareaProps>
  CircularProgress?: PropsWithForm<CircularProgressProps>
  Heading?: PropsWithForm<HeadingProps>
  Tag?: PropsWithForm<TagProps>
  SimpleGrid?: PropsWithForm<SimpleGridProps>
  Switch?: PropsWithForm<SwitchProps>
  Alert?: PropsWithForm<AlertProps>
  AlertIcon?: PropsWithForm<AlertIconProps>
  AlertTitle?: PropsWithForm<AlertTitleProps>
  AlertDescription?: PropsWithForm<AlertDescriptionProps>
  Flex?: PropsWithForm<FlexProps>
  Stack?: PropsWithForm<StackProps>
  Accordion?: PropsWithForm<Omit<AccordionProps, 'children'>>
  AccordionButton?: PropsWithForm<AccordionButtonProps>
  AccordionItem?: PropsWithForm<Omit<AccordionItemProps, 'children'>>
  AccordionPanel?: PropsWithForm<AccordionPanelProps>
  AccordionIcon?: PropsWithForm<IconProps>
  FormControl?: PropsWithForm<FormControlProps>
  FormLabel?: PropsWithForm<FormLabelProps>
  FormHelperText?: PropsWithForm<TextProps>
  FormErrorMessage?: PropsWithForm<FormErrorMessageProps>
  Grid?: PropsWithForm<GridProps>
  TabList?: PropsWithForm<TabListProps>
  TabPanel?: PropsWithForm<TabPanelProps>
  TabPanels?: PropsWithForm<TabPanelsProps>
  Tab?: PropsWithForm<TabProps>
  Tabs?: PropsWithForm<TabsProps>
  Select?: PropsWithForm<SelectProps & { children: JSX.Element }>
  Input?: PropsWithForm<InputProps>
  InputGroup?: PropsWithForm<InputGroupProps>
  InputLeftAddon?: PropsWithForm<any>
  InputRightAddon?: PropsWithForm<any>
  InputLeftElement?: PropsWithForm<any>
  InputRightElement?: PropsWithForm<any>
  AspectRatio?: PropsWithForm<AspectRatioProps>
  Breadcrumb?: PropsWithForm<BreadcrumbItemProps>
  BreadcrumbItem?: PropsWithForm<BreadcrumbItemProps>
  BreadcrumbLink?: PropsWithForm<BreadcrumbLinkProps>
  Editable?: PropsWithForm<EditableProps>
  Menu?: PropsWithForm<MenuProps>
  NumberInput?: PropsWithForm<NumberInputProps>
  NumberInputField?: PropsWithForm<NumberInputFieldProps>
  NumberInputStepper?: PropsWithForm<NumberInputStepperProps>
  NumberIncrementStepper?: PropsWithForm<NumberIncrementStepperProps>
  NumberDecrementStepper?: PropsWithForm<NumberDecrementStepperProps>
  Radio?: PropsWithForm<RadioProps>
  RadioGroup?: PropsWithForm<RadioGroupProps>
  List?: PropsWithForm<ListProps>
  ListIcon?: PropsWithForm<IconProps>
  ListItem?: PropsWithForm<any>
  Center?: PropsWithForm<CenterProps>
  Container?: PropsWithForm<ContainerProps>
  Card?: PropsWithForm<any>
  Table?: PropsWithForm<DataProviderProps>
  DataProvider?: PropsWithForm<DataProviderProps>
}

let DEFAULT_PROPS: PreviewDefaultProps = {
  Alert: {
    status: 'error',
  },
  AlertDescription: {
    children: 'Alert description',
  },
  AlertTitle: {
    children: 'Alert title',
    mr: 1,
    fontWeight: 'bold',
  },
  AvatarBadge: {
    bg: 'green.500',
    boxSize: '1.25rem',
    borderColor: 'white',
  },
  AvatarGroup: {
    spacing: -3,
    max: 3,
    size: 'md',
    form: {
      display: 'flex',
    },
  },
  Badge: {
    children: 'Badge name',
    variant: 'subtle',
  },
  Breadcrumb: {
    form: {
      separator: '/',
    },
  },
  BreadcrumbLink: {
    children: 'Lorem Ipsum',
  },
  Button: {
    children: 'Button text',
    variant: 'solid',
    size: 'md',
  },
  Checkbox: {
    children: 'Label checkbox',
    isReadOnly: true,
    isChecked: false,
  },
  CircularProgress: {
    size: '48px',
    value: 60,
    min: 0,
    max: 100,
  },
  CloseButton: {
    size: 'md',
  },
  Code: {
    children: 'Code value',
  },
  Divider: { borderColor: 'blackAlpha.500' },
  Flex: {
    form: {
      display: 'flex',
    },
  },
  FormLabel: { children: 'Label' },
  FormHelperText: {
    children: 'Helper message',
  },
  FormErrorMessage: {
    children: 'Error message',
  },
  Grid: {
    templateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 6,
    form: {
      display: 'grid',
    },
  },
  Heading: {
    children: 'Heading title',
  },
  Icon: { icon: 'CopyIcon' },
  IconButton: {
    'aria-label': 'icon',
    // @ts-ignore
    icon: 'CopyIcon',
    size: 'md',
  },
  Image: {
    height: '100px',
    width: '100px',
  },
  InputLeftAddon: { children: 'left' },
  InputRightAddon: {
    children: 'right',
  },
  Link: { children: 'Link text' },
  List: {
    form: {
      styleType: 'none',
    },
  },
  ListItem: { children: 'list' },
  Progress: {
    value: 60,
    min: 0,
    max: 100,
  },
  Radio: { children: 'Radio' },
  Select: {
    // @ts-ignore
    icon: 'ChevronDownIcon',
    variant: 'outline',
    size: 'md',
    // @ts-ignore
    form: {
      children: (
        <>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </>
      ),
    },
  },
  SimpleGrid: {
    columns: 2,
    spacingX: 1,
    spacingY: 1,
    minChildWidth: 300,
  },
  Stack: {
    spacing: 2,
    form: {
      display: 'flex',
    },
  },
  Switch: {
    isChecked: false,
  },
  Tab: { children: 'Tab' },
  Tabs: { children: '', size: 'md' },
  TabPanel: { children: 'Tab' },
  Tag: {
    children: 'Tag name',
  },
  Text: { children: 'Text value' },
  VisuallyHidden: { children: '' },
}

//@ts-ignore
export const registerDefaultProps = ({ componentType, defaultProps }) => {
  if (componentType in DEFAULT_PROPS) {
    throw new Error(`${componentType} is already registered in default props`)
  }
  //@ts-ignore
  DEFAULT_PROPS[componentType] = defaultProps
}

const getDefaultFormProps = (type: ComponentType) => {
  //@ts-ignore
  const chakraDefaultProps = (Chakra[type] && Chakra[type].defaultProps) || {}
  // @ts-ignore
  return { ...chakraDefaultProps, ...DEFAULT_PROPS[type]?.form }
}

export { DEFAULT_PROPS, getDefaultFormProps }
