import {
  CloseButton,
  Heading,
  Textarea,
  Spinner,
  Code,
  Link,
  Progress,
  Text,
  Image,
  Icon,
  IconButton,
  Button,
  Box,
  Badge,
  Tag,
  SimpleGrid,
  Switch,
  Checkbox,
  AvatarBadge,
  AvatarGroup,
  Avatar,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
  TabPanel,
  Tab,
  FormHelperText,
  FormErrorMessage,
  InputProps,
  Input,
  AspectRatioBoxProps,
  BreadcrumbItemProps,
  EditableProps,
  MenuProps,
  NumberInputProps,
  RadioProps,
  SelectProps,
  RadioGroupProps,
  RadioGroup,
  Radio,
  Select,
  List,
  ListIcon,
  ListItem,
  Accordion,
  AccordionItem,
  InputGroupProps,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Flex,
  GridProps,
  Grid,
} from '@chakra-ui/core'
import FormLabel, { FormLabelProps } from '@chakra-ui/core/dist/FormLabel'

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
  Editable?: EditableProps
  Menu?: MenuProps
  NumberInput?: NumberInputProps
  Radio?: RadioProps
  RadioGroup?: RadioGroupProps
  List?: any
  ListIcon?: IconProps
  ListItem?: any
  // meta components
  AlertMeta?: any
  InputGroupMeta?: any
  FormControlMeta?: any
  AccordionMeta?: any
  ListMeta?: any
}

export const DEFAULT_PROPS: PreviewDefaultProps = {
  Badge: {
    ...Badge.defaultProps,
    children: 'Lorem Ipsum',
    variant: 'subtle',
  },
  Box: Box.defaultProps,
  Button: { ...Button.defaultProps, children: 'Lorem Ipsum' },
  Divider: { borderColor: 'blackAlpha.500' },
  IconButton: {
    ...IconButton.defaultProps,
    'aria-label': 'icon',
    icon: 'copy',
    size: 'md',
  },
  Icon: { ...Icon.defaultProps, name: 'copy' },
  Image: {
    ...Image.defaultProps,
    size: '100px',
    fallbackSrc: 'https://via.placeholder.com/150',
  },
  Text: { ...Text.defaultProps, children: 'Lorem Ipsum' },
  Progress: { ...Progress.defaultProps, size: 'md' },
  Link: { ...Link.defaultProps, children: 'Lorem Ipsum' },
  Code: {
    ...Code.defaultProps,
    children: 'Lorem Ipsum',
    variantColor: 'yellow',
  },
  Spinner: {
    ...Spinner.defaultProps,
    size: 'md',
    thickness: '2px',
    speed: '0.45s',
  },
  Textarea: Textarea.defaultProps,
  Input: { ...Input.defaultProps, variant: 'outline' },
  Heading: {
    ...Heading.defaultProps,
    size: 'xl',
    as: 'h2',
    lineHeight: 'shorter',
    fontWeight: 'bold',
    fontFamily: 'heading',
    children: 'Lorem Ipsum',
  },
  CloseButton: CloseButton.defaultProps,
  Tag: {
    ...Tag.defaultProps,
    children: 'Lorem Ipsum',
    size: 'md',
    variant: 'solid',
  },
  SimpleGrid: {
    ...SimpleGrid.defaultProps,
    columns: 2,
    spacingX: 1,
    spacingY: 1,
  },
  Switch: Switch.defaultProps,
  Checkbox: {
    ...Checkbox.defaultProps,
    children: 'Lorem Ipsum',
    isReadOnly: true,
  },
  AvatarBadge: {
    ...AvatarBadge.defaultProps,
    bg: 'green.500',
    size: '1.25em',
    borderColor: 'white',
  },
  AvatarGroup: {
    ...AvatarGroup.defaultProps,
    max: 2,
    spacing: -3,
    size: 'md',
  },
  Avatar: Avatar.defaultProps,
  Alert: Alert.defaultProps,
  AlertIcon: AlertIcon.defaultProps,
  AlertTitle: {
    ...AlertTitle.defaultProps,
    children: 'Lorem Ipsum',
    mr: 1,
  },
  AlertDescription: {
    ...AlertDescription.defaultProps,
    children: 'Lorem Ipsum',
  },
  TabPanel: { ...TabPanel.defaultProps, children: 'Tab' },
  Tab: { ...Tab.defaultProps, children: 'Tab' },
  FormLabel: { ...FormLabel.defaultProps, children: 'Label' },
  FormHelperText: {
    ...FormHelperText.defaultProps,
    children: 'Helper message',
  },
  FormErrorMessage: {
    ...FormErrorMessage.defaultProps,
    children: 'Error message',
  },
  Grid: {
    ...Grid.defaultProps,
    templateColumns: 'repeat(5, 1fr)',
    gap: 6,
  },
  Radio: { ...Radio.defaultProps, children: 'Radio' },
  RadioGroup: { ...RadioGroup.defaultProps },
  Select: { ...Select.defaultProps, variant: 'outline', size: 'md' },
  List: { ...List.defaultProps, styleType: 'none' },
  ListIcon: { ...ListIcon.defaultProps },
  ListItem: { ...ListItem.defaultProps, children: 'list' },
  Accordion: {
    ...Accordion.defaultProps,
  },
  AccordionItem: {
    ...AccordionItem.defaultProps,
    defaultIsOpen: true,
  },
  InputLeftAddon: { ...InputLeftAddon.defaultProps, children: 'left' },
  InputRightAddon: {
    ...InputRightAddon.defaultProps,
    children: 'right',
  },
  Stack: { ...Stack.defaultProps },
  Flex: { ...Flex.defaultProps, display: 'flex' },
}
