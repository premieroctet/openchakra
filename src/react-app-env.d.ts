/// <reference types="react-scripts" />;

declare module "prettier/standalone";
declare module "coloreact";

type ComponentType =
  | "Badge"
  | "Box"
  | "Button"
  | "Icon"
  | "IconButton"
  | "Image"
  | "Text"
  | "Progress"
  | "AvatarBadge"
  | "AvatarGroup"
  | "Avatar"
  | "Checkbox"
  | "Link"
  | "Spinner"
  | "CloseButton"
  | "Divider"
  | "TextArea"
  | "CircularProgress"
  | "Heading"
  | "Tag"
  | "Switch"
  | "SimpleGrid"
  | "Code";

interface IComponent {
  children: string[];
  type: ComponentType;
  parent: string;
  name: string;
  props?: any;
}

interface IComponents {
  [name: string]: IComponent;
}

interface IPreviewProps {
  component: IComponent;
}

interface ComponentItemProps {
  name: string;
  type: ComponentType;
  isUpdated?: boolean;
}

type PreviewDefaultProps = {
  Badge?: BadgeProps;
  Box?: BoxProps;
  Button?: ButtonProps;
  Icon?: IconProps;
  IconButton?: IconButtonProps;
  Image?: ImageProps;
  Text?: BoxProps;
  Progress?: ProgressProps;
  AvatarBadge?: AvatarBadgeProps;
  AvatarGroup?: Omit<AvatarGroupProps, "children">;
  Avatar?: AvatarProps;
  Checkbox?: CheckboxProps;
  Link?: LinkProps;
  Spinner?: SpinnerProps;
  CloseButton?: CloseButtonProps;
  Divider?: any;
  Code?: any;
  TextArea?: any;
  CircularProgress?: any;
  Heading?: HeadingProps;
  Tag?: TagProps;
  SimpleGrid?: SimpleGridProps;
  Switch?: SwitchProps;
};
