import React from "react";

import BoxPreview from "./previews/BoxPreview";
import ButtonPreview from "./previews/ButtonPreview";
import BadgePreview from "./previews/BadgePreview";
import IconPreview from "./previews/IconPreview";
import ImagePreview from "./previews/ImagePreview";
import TextPreview from "./previews/TextPreview";
import AvatarPreview, {
  AvatarBadgePreview,
  AvatarGroupPreview
} from "./previews/AvatarPreview";
import CheckboxPreview from "./previews/CheckboxPreview";
import IconButtonPreview from "./previews/IconButtonPreview";
import ProgressPreview from "./previews/ProgressPreview";
import LinkPreview from "./previews/LinkPreview";
import SpinnerPreview from "./previews/SpinnerPreview";
import CloseButtonPreview from "./previews/CloseButtonPreview";
import DividerPreview from "./previews/DividerPreview";
import CodePreview from "./previews/CodePreview";
import TextAreaPreview from "./previews/TextAreaPreview";
import CircularProgressPreview from "./previews/CircularProgressPreview";
import HeadingPreview from "./previews/HeadingPreview";
import TagPreview from "./previews/TagPreview";
import SimpleGridPreview from "./previews/SimpleGridPreview";
import SwitchPreview from "./previews/SwitchPreview";

const ComponentPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  switch (component.type) {
    case "Badge":
      return <BadgePreview component={component} />;
    case "Box":
      return <BoxPreview component={component} />;
    case "Button":
      return <ButtonPreview component={component} />;
    case "Icon":
      return <IconPreview component={component} />;
    case "IconButton":
      return <IconButtonPreview component={component} />;
    case "Image":
      return <ImagePreview component={component} />;
    case "Text":
      return <TextPreview component={component} />;
    case "Progress":
      return <ProgressPreview component={component} />;
    case "Avatar":
      return <AvatarPreview component={component} />;
    case "AvatarBadge":
      return <AvatarBadgePreview component={component} />;
    case "AvatarGroup":
      return <AvatarGroupPreview component={component} />;
    case "Link":
      return <LinkPreview component={component} />;
    case "Spinner":
      return <SpinnerPreview component={component} />;
    case "CloseButton":
      return <CloseButtonPreview component={component} />;
    case "Checkbox":
      return <CheckboxPreview component={component} />;
    case "Divider":
      return <DividerPreview component={component} />;
    case "Code":
      return <CodePreview component={component} />;
    case "TextArea":
      return <TextAreaPreview component={component} />;
    case "CircularProgress":
      return <CircularProgressPreview component={component} />;
    case "Heading":
      return <HeadingPreview component={component} />;
    case "Tag":
      return <TagPreview component={component} />;
    case "SimpleGrid":
      return <SimpleGridPreview component={component} />;
    case "Switch":
      return <SwitchPreview component={component} />;
    default:
      return null;
  }
};

export default ComponentPreview;
