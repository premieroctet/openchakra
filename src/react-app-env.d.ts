/// <reference types="react-scripts" />;
declare module "prettier/standalone";
declare module "coloreact";

type ComponentType =
  | "AspectRatioBox"
  | "Badge"
  | "Box"
  | "Button"
  | "Breadcrumb"
  | "ControlBox"
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
  | "Textarea"
  | "CircularProgress"
  | "Heading"
  | "Tag"
  | "Switch"
  | "SimpleGrid"
  | "Alert"
  | "AlertIcon"
  | "AlertTitle"
  | "AlertDescription"
  | "Flex"
  | "Stack"
  | "Accordion"
  | "AccordionItem"
  | "AccordionHeader"
  | "AccordionPanel"
  | "AccordionIcon"
  | "FormControl"
  | "FormLabel"
  | "FormHelperText"
  | "FormErrorMessage"
  | "TabList"
  | "TabPanel"
  | "TabPanels"
  | "Tab"
  | "Tabs"
  | "Code"
  | "Editable"
  | "Menu"
  | "NumberInput"
  | "Radio"
  | "RadioGroup"
  | "Select"
  | "Input";

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
  id: string;
  type: ComponentType;
  isMoved?: boolean;
  soon?: boolean;
}
