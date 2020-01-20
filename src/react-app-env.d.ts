/// <reference types="react-scripts" />

declare module "prettier/standalone";
declare module "coloreact";

type ComponentType =
  | "Badge"
  | "Box"
  | "Button"
  | "Icon"
  | "Image"
  | "Text"
  | "AvatarBadge"
  | "AvatarGroup"
  | "Avatar"
  | "Checkbox";

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
  Image?: ImageProps;
  Text?: BoxProps;
  AvatarBadge?: AvatarBadgeProps;
  AvatarGroup?: Omit<AvatarGroupProps, "children">;
  Avatar?: AvatarProps;
  Checkbox?: CheckboxProps;
};
