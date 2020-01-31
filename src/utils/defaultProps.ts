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
  CircularProgress,
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
  AlertProps
} from "@chakra-ui/core";

type PreviewDefaultProps = {
  Badge?: BadgeProps;
  Box?: BoxProps;
  Button?: ButtonProps;
  Icon?: IconProps;
  IconButton?: IconButtonProps;
  Image?: ImageProps;
  Text?: BoxProps;
  Progress?: ProgressProps;
  AvatarBadge?: any;
  AvatarGroup?: Omit<AvatarGroupProps, "children">;
  Avatar?: AvatarProps;
  Checkbox?: CheckboxProps;
  Link?: LinkProps;
  Spinner?: SpinnerProps;
  CloseButton?: CloseButtonProps;
  Divider?: any;
  Code?: any;
  Textarea?: any;
  CircularProgress?: any;
  Heading?: HeadingProps;
  Tag?: TagProps;
  SimpleGrid?: SimpleGridProps;
  Switch?: SwitchProps;
  Alert?: AlertProps;
  AlertIcon?: IconProps;
  AlertTitle?: BoxProps;
  AlertDescription?: BoxProps;
};

export const DEFAULT_PROPS: PreviewDefaultProps = {
  Badge: {
    ...Badge.defaultProps,
    children: "Lorem Ipsum",
    variant: "subtle"
  },
  Box: Box.defaultProps,
  Button: { ...Button.defaultProps, children: "Lorem Ipsum" },
  Divider: { borderColor: "blackAlpha.500" },
  IconButton: {
    ...IconButton.defaultProps,
    "aria-label": "icon",
    icon: "copy",
    size: "md"
  },
  Icon: { ...Icon.defaultProps, name: "copy" },
  Image: {
    ...Image.defaultProps,
    size: "100px",
    fallbackSrc: "https://via.placeholder.com/150"
  },
  Text: { ...Text.defaultProps, children: "Lorem Ipsum" },
  Progress: { ...Progress.defaultProps, size: "md" },
  Link: { ...Link.defaultProps, children: "Lorem Ipsum" },
  Code: {
    ...Code.defaultProps,
    children: "Lorem Ipsum",
    variantColor: "yellow"
  },
  Spinner: {
    ...Spinner.defaultProps,
    size: "md",
    thickness: "2px",
    speed: "0.45s"
  },
  Textarea: Textarea.defaultProps,
  Heading: {
    ...Heading.defaultProps,
    size: "xl",
    as: "h2",
    lineHeight: "shorter",
    fontWeight: "bold",
    fontFamily: "heading",
    children: "Lorem Ipsum"
  },
  CloseButton: CloseButton.defaultProps,
  Tag: {
    ...Tag.defaultProps,
    children: "Lorem Ipsum",
    size: "md",
    variant: "solid"
  },
  SimpleGrid: {
    ...SimpleGrid.defaultProps,
    columns: 2,
    spacingX: 1,
    spacingY: 1
  },
  Switch: Switch.defaultProps,
  CircularProgress: CircularProgress.defaultProps,
  Checkbox: {
    ...Checkbox.defaultProps,
    children: "Lorem Ipsum",
    isChecked: true
  },
  AvatarBadge: {
    ...AvatarBadge.defaultProps,
    bg: "green.500",
    size: "1.25em",
    borderColor: "white"
  },
  AvatarGroup: {
    ...AvatarGroup.defaultProps,
    max: 2,
    spacing: -3,
    size: "md"
  },
  Avatar: Avatar.defaultProps,
  Alert: Alert.defaultProps,
  AlertIcon: AlertIcon.defaultProps,
  AlertTitle: { ...AlertTitle.defaultProps, children: "Lorem Ipsum" },
  AlertDescription: {
    ...AlertDescription.defaultProps,
    children: "Lorem Ipsum"
  }
};
