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
  | "Alert"
  | "AlertIcon"
  | "AlertTitle"
  | "AlertDescription"
  | "Code";

interface IComponent {
  children: string[];
  type: ComponentType;
  parent: string;
  id: string;
  props: any;
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
