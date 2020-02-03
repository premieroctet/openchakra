import React, { memo } from "react";

import ButtonPanel from "./components/ButtonPanel";
import BadgePanel from "./components/BadgePanel";
import IconPanel from "./components/IconPanel";
import ImagePanel from "./components/ImagePanel";
import BoxPanel from "./components/BoxPanel";
import ChildrenControl from "../controls/ChildrenControl";
import AvatarPanel from "./components/AvatarPanel";
import AvatarGroupPanel from "./components/AvatarGroupPanel";
import AvatarBadgePanel from "./components/AvatarBadgePanel";
import CheckboxPanel from "./components/CheckboxPanel";
import IconButtonPanel from "./components/IconButtonPanel";
import ProgressPanel from "./components/ProgressPanel";
import LinkPanel from "./components/LinkPanel";
import SpinnerPanel from "./components/SpinnerPanel";
import CloseButtonPanel from "./components/CloseButtonPanel";
import DividerPanel from "./components/DividerPanel";
import CodePanel from "./components/CodePanel";
import TextareaPanel from "./components/TextareaPanel";
import CircularProgressPanel from "./components/CircularProgressPanel";
import HeadingPanel from "./components/HeadingPanel";
import TagPanel from "./components/TagPanel";
import SimpleGridPanel from "./components/SimpleGridPanel";
import SwitchPanel from "./components/SwitchPanel";
import AlertPanel from "./components/AlertPanel";
import AlertIconPanel from "./components/AlertIconPanel";
import AlertTitlePanel from "./components/AlertTitlePanel";
import AlertDescriptionPanel from "./components/AlertDescriptionPanel";
import FlexPanel from "./styles/FlexPanel";
import StackPanel from "./components/StackPanel";
import FormControlPanel from "./components/FormControlPanel";
import TabsPanel from "./components/TabsPanel";
import InputPanel from "./components/InputPanel";
import RadioPanel from "./components/RadioPanel";
import RadioGroupPanel from "./components/RadioGroupPanel";

const Panels: React.FC<{ component: IComponent }> = ({ component }) => {
  const { type } = component;

  return (
    <>
      {type === "Button" && <ButtonPanel />}
      {type === "Checkbox" && <CheckboxPanel />}
      {type === "Box" && <BoxPanel />}
      {type === "Badge" && <BadgePanel />}
      {type === "Image" && <ImagePanel />}
      {type === "Icon" && <IconPanel />}
      {type === "IconButton" && <IconButtonPanel />}
      {type === "Progress" && <ProgressPanel />}
      {type === "Text" && <ChildrenControl />}
      {type === "Link" && <LinkPanel />}
      {type === "Avatar" && <AvatarPanel />}
      {type === "AvatarGroup" && <AvatarGroupPanel />}
      {type === "AvatarBadge" && <AvatarBadgePanel />}
      {type === "Spinner" && <SpinnerPanel />}
      {type === "Code" && <CodePanel />}
      {type === "CloseButton" && <CloseButtonPanel />}
      {type === "Divider" && <DividerPanel />}
      {type === "Textarea" && <TextareaPanel />}
      {type === "CircularProgress" && <CircularProgressPanel />}
      {type === "Heading" && <HeadingPanel />}
      {type === "SimpleGrid" && <SimpleGridPanel />}
      {type === "Switch" && <SwitchPanel />}
      {type === "Alert" && <AlertPanel />}
      {type === "AlertIcon" && <AlertIconPanel />}
      {type === "AlertTitle" && <AlertTitlePanel />}
      {type === "AlertDescription" && <AlertDescriptionPanel />}
      {type === "Tag" && <TagPanel />}
      {type === "Flex" && <FlexPanel />}
      {type === "Stack" && <StackPanel />}
      {type === "FormControl" && <FormControlPanel />}
      {type === "Tabs" && <TabsPanel />}
      {type === "Input" && <InputPanel />}
      {type === "Radio" && <RadioPanel />}
      {type === "RadioGroup" && <RadioGroupPanel />}
    </>
  );
};

export default memo(Panels);
