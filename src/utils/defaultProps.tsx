import React from 'react'
import * as Chakra from '@chakra-ui/core'

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
  AccordionHeaderProps,
  AccordionItemProps,
  FormControlProps,
  TabListProps,
  TabPanelProps,
  TabPanelsProps,
  TabsProps,
  InputProps,
  AspectRatioBoxProps,
  BreadcrumbItemProps,
  EditableProps,
  MenuProps,
  NumberInputProps,
  RadioProps,
  SelectProps,
  RadioGroupProps,
  InputGroupProps,
  GridProps,
} from '@chakra-ui/core'
import { FormLabelProps } from '@chakra-ui/core/dist/FormLabel'

type PreviewDefaultProps = {
  Badge?: BadgeProps
  Box?: BoxProps
  Button?: ButtonProps
  Icon?: IconProps
  IconButton?: IconButtonProps
  Image?: ImageProps
  Text?: BoxProps
  Progress?: ProgressProps
  AvatarBadge?: any
  AvatarGroup?: Omit<AvatarGroupProps, 'children'>
  Avatar?: AvatarProps
  Checkbox?: CheckboxProps
  Link?: LinkProps
  Spinner?: SpinnerProps
  CloseButton?: CloseButtonProps
  Divider?: any
  Code?: any
  Textarea?: any
  CircularProgress?: any
  Heading?: HeadingProps
  Tag?: TagProps
  SimpleGrid?: SimpleGridProps
  Switch?: SwitchProps
  Alert?: AlertProps
  AlertIcon?: IconProps
  AlertTitle?: BoxProps
  AlertDescription?: BoxProps
  Flex?: FlexProps
  Stack?: StackProps
  Accordion?: Omit<AccordionProps, 'children'>
  AccordionHeader?: AccordionHeaderProps
  AccordionItem?: Omit<AccordionItemProps, 'children'>
  AccordionPanel?: any
  AccordionIcon?: IconProps
  FormControl?: FormControlProps
  FormLabel?: FormLabelProps
  FormHelperText?: any
  FormErrorMessage?: any
  Grid?: GridProps
  TabList?: TabListProps
  TabPanel?: TabPanelProps
  TabPanels?: TabPanelsProps
  Tab?: any
  Tabs?: TabsProps
  Select?: SelectProps
  Input?: InputProps
  InputGroup?: InputGroupProps
  InputLeftAddon?: any
  InputRightAddon?: any
  InputLeftElement?: any
  InputRightElement?: any
  AspectRatioBox?: AspectRatioBoxProps
  Breadcrumb?: BreadcrumbItemProps
  BreadcrumbItem?: BreadcrumbItemProps
  BreadcrumbLink?: any
  Editable?: EditableProps
  Menu?: MenuProps
  NumberInput?: NumberInputProps
  Radio?: RadioProps
  RadioGroup?: RadioGroupProps
  List?: any
  ListIcon?: IconProps
  ListItem?: any
}

export const DEFAULT_PROPS: PreviewDefaultProps = {
  Badge: {
    children: 'Badge name',
  },
  Button: {
    children: 'Button text',
  },
  Divider: { borderColor: 'blackAlpha.500' },
  IconButton: {
    'aria-label': 'icon',
    icon: 'copy',
  },
  Icon: { name: 'copy' },
  Image: {
    height: '100px',
    width: '100px',
  },
  Text: { children: 'Text value' },
  Link: { children: 'Link text' },
  Code: {
    children: 'Code value',
  },
  Heading: {
    children: 'Heading title',
  },
  Tag: {
    children: 'Tag name',
  },
  SimpleGrid: {
    columns: 2,
    spacingX: 1,
    spacingY: 1,
  },
  Checkbox: {
    children: 'Label checkbox',
    isReadOnly: true,
  },
  AlertTitle: {
    children: 'Alert title',
    mr: 1,
  },
  AlertDescription: {
    children: 'Alert description',
  },
  AvatarBadge: {
    bg: 'green.500',
    size: '1.25em',
    borderColor: 'white',
  },
  TabPanel: { children: 'Tab' },
  Tab: { children: 'Tab' },
  FormLabel: { children: 'Label' },
  FormHelperText: {
    children: 'Helper message',
  },
  FormErrorMessage: {
    children: 'Error message',
  },
  Grid: {
    templateColumns: 'repeat(5, 1fr)',
    gap: 6,
  },
  Radio: { children: 'Radio' },
  ListItem: { children: 'list' },
  AccordionItem: {
    defaultIsOpen: true,
  },
  InputLeftAddon: { children: 'left' },
  InputRightAddon: {
    children: 'right',
  },
  BreadcrumbLink: {
    children: 'Lorem Ipsum',
  },
  AvatarGroup: {
    spacing: -3,
    max: 3,
    size: 'md',
  },
  Select: {
    icon: 'chevron-down',
  },
}

export const DEFAULT_FORM_PROPS: PreviewDefaultProps = {
  AlertTitle: {
    fontWeight: 'bold',
  },
  SimpleGrid: {
    display: 'grid',
  },
  Grid: {
    display: 'grid',
  },
  CircularProgress: {
    size: '48px',
  },
  Badge: {
    variant: 'subtle',
  },
  Input: {
    variant: 'outline',
  },
  Button: {
    variant: 'solid',
    size: 'md',
    children: 'Lorem ipsum',
  },
  IconButton: {
    'aria-label': 'icon',
    size: 'md',
  },
  Spinner: {
    size: 'md',
    thickness: '2px',
    speed: '0.45s',
  },
  Heading: {
    size: 'xl',
    as: 'h2',
    lineHeight: 'shorter',
    fontWeight: 'bold',
    fontFamily: 'heading',
  },
  Tag: {
    size: 'md',
    variant: 'subtle',
  },
  Textarea: {
    size: 'md',
  },
  AvatarGroup: {
    display: 'flex',
  },
  Radio: {
    size: 'md',
  },
  Select: {
    variant: 'outline',
    size: 'md',
    iconSize: '20px',
    children: (
      <>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </>
    ),
  },
  List: { styleType: 'none' },
  Stack: { display: 'flex', spacing: 2 },
  Flex: { display: 'flex' },
  Breadcrumb: {
    separator: '/',
    addSeparator: true,
  },
  CloseButton: { size: 'md' },
}

export const getDefaultFormProps = (type: ComponentType) => {
  const chakraDefaultProps = Chakra[type].defaultProps

  return { ...chakraDefaultProps, ...DEFAULT_FORM_PROPS[type] }
}
