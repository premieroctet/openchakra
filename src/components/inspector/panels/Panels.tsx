import React from "react";
import ButtonPanel from "./ButtonPanel";
import BadgePanel from "./BadgePanel";
import IconPanel from "./IconPanel";
import ImagePanel from "./ImagePanel";
import BoxPanel from "./BoxPanel";
import ChildrenControl from "../controls/ChildrenControl";
import AvatarPanel from "./AvatarPanel";
import AvatarGroupPanel from "./AvatarGroupPanel";
import AvatarBadgePanel from "./AvatarBadgePanel";
import CheckboxPanel from "./CheckboxPanel";
import IconButtonPanel from "./IconButtonPanel";
import ProgressPanel from "./ProgressPanel";
import LinkPanel from "./LinkPanel";
import SpinnerPanel from "./SpinnerPanel";
import CloseButtonPanel from "./CloseButtonPanel";
import DividerPanel from "./DividerPanel";
import CodePanel from "./CodePanel";
import TextAreaPanel from "./TextAreaPanel";
import CircularProgressPanel from "./CircularProgressPanel";
import HeadingPanel from "./HeadingPanel";
import TagPanel from "./TagPanel";
import SimpleGridPanel from "./SimpleGridPanel";
import SwitchPanel from "./SwitchPanel";
import AlertPanel from "./AlertPanel";
import AlertIconPanel from "./AlertIconPanel";
import AlertTitlePanel from "./AlertTitlePanel";
import AlertDescriptionPanel from "./AlertDescriptionPanel";

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
      {type === "TextArea" && <TextAreaPanel />}
      {type === "CircularProgress" && <CircularProgressPanel />}
      {type === "Heading" && <HeadingPanel />}
      {type === "SimpleGrid" && <SimpleGridPanel />}
      {type === "Switch" && <SwitchPanel />}
      {type === "Alert" && <AlertPanel />}
      {type === "AlertIcon" && <AlertIconPanel />}
      {type === "AlertTitle" && <AlertTitlePanel />}
      {type === "AlertDescription" && <AlertDescriptionPanel />}
      {type === "Tag" && <TagPanel />}
    </>
  );
};

export default Panels;
