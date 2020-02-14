import React, { memo } from 'react'

import ButtonPanel from './components/ButtonPanel'
import BadgePanel from './components/BadgePanel'
import IconPanel from './components/IconPanel'
import ImagePanel from './components/ImagePanel'
import BoxPanel from './components/BoxPanel'
import ChildrenControl from '../controls/ChildrenControl'
import AvatarPanel from './components/AvatarPanel'
import AvatarGroupPanel from './components/AvatarGroupPanel'
import AvatarBadgePanel from './components/AvatarBadgePanel'
import CheckboxPanel from './components/CheckboxPanel'
import IconButtonPanel from './components/IconButtonPanel'
import ProgressPanel from './components/ProgressPanel'
import LinkPanel from './components/LinkPanel'
import SpinnerPanel from './components/SpinnerPanel'
import CloseButtonPanel from './components/CloseButtonPanel'
import DividerPanel from './components/DividerPanel'
import CodePanel from './components/CodePanel'
import TextareaPanel from './components/TextareaPanel'
import CircularProgressPanel from './components/CircularProgressPanel'
import HeadingPanel from './components/HeadingPanel'
import TagPanel from './components/TagPanel'
import SimpleGridPanel from './components/SimpleGridPanel'
import SwitchPanel from './components/SwitchPanel'
import AlertPanel from './components/AlertPanel'
import AlertIconPanel from './components/AlertIconPanel'
import AlertTitlePanel from './components/AlertTitlePanel'
import AlertDescriptionPanel from './components/AlertDescriptionPanel'
import FlexPanel from './styles/FlexPanel'
import StackPanel from './components/StackPanel'
import FormControlPanel from './components/FormControlPanel'
import TabsPanel from './components/TabsPanel'
import InputPanel from './components/InputPanel'
import RadioPanel from './components/RadioPanel'
import RadioGroupPanel from './components/RadioGroupPanel'
import SelectPanel from './components/SelectPanel'
import ListPanel from './components/ListPanel'
import ListItemPanel from './components/ListItemPanel'
import ListIconPanel from './components/ListIconPanel'
import AccordionItemPanel from './components/AccordionItemPanel'
import AccordionPanel from './components/AccordionPanel'
import FormLabelPanel from './components/FormLabelPanel'
import FormHelperTextPanel from './components/FormHelperTextPanel'
import FormErrorMessagePanel from './components/FormErrorMessagePanel'
import GridPanel from './components/GridPanel'
import NumberInputPanel from './components/NumberInputPanel'
import AspectRatioPanel from './components/AspectRatioPanel'
import BreadcrumbPanel from './components/BreadcrumbPanel'
import BreadcrumbItemPanel from './components/BreadcrumbItemPanel'
import MenuPanel from './components/MenuPanel'
import MenuOptionGroupPanel from './components/MenuOptionGroupPanel'
import MenuItemPanel from './components/MenuItemPanel'
import MenuItemOptionPanel from './components/MenuItemOptionPanel'
import MenuListPanel from './components/MenuListPanel'

const Panels: React.FC<{ component: IComponent; isRoot: boolean }> = ({
  component,
  isRoot,
}) => {
  const { type } = component

  if (isRoot) {
    return null
  }

  return (
    <>
      {type === 'Button' && <ButtonPanel />}
      {type === 'Checkbox' && <CheckboxPanel />}
      {type === 'Box' && <BoxPanel />}
      {type === 'Badge' && <BadgePanel />}
      {type === 'Image' && <ImagePanel />}
      {type === 'Icon' && <IconPanel />}
      {type === 'IconButton' && <IconButtonPanel />}
      {type === 'Progress' && <ProgressPanel />}
      {type === 'Text' && <ChildrenControl />}
      {type === 'Link' && <LinkPanel />}
      {type === 'Avatar' && <AvatarPanel />}
      {type === 'AvatarGroup' && <AvatarGroupPanel />}
      {type === 'AvatarBadge' && <AvatarBadgePanel />}
      {type === 'Spinner' && <SpinnerPanel />}
      {type === 'Code' && <CodePanel />}
      {type === 'CloseButton' && <CloseButtonPanel />}
      {type === 'Divider' && <DividerPanel />}
      {type === 'Textarea' && <TextareaPanel />}
      {type === 'CircularProgress' && <CircularProgressPanel />}
      {type === 'Heading' && <HeadingPanel />}
      {type === 'SimpleGrid' && <SimpleGridPanel />}
      {type === 'Switch' && <SwitchPanel />}
      {type === 'Alert' && <AlertPanel />}
      {type === 'AlertIcon' && <AlertIconPanel />}
      {type === 'AlertTitle' && <AlertTitlePanel />}
      {type === 'AlertDescription' && <AlertDescriptionPanel />}
      {type === 'Tag' && <TagPanel />}
      {type === 'Flex' && <FlexPanel />}
      {type === 'Stack' && <StackPanel />}
      {type === 'FormControl' && <FormControlPanel />}
      {type === 'Tabs' && <TabsPanel />}
      {type === 'Input' && <InputPanel />}
      {type === 'Radio' && <RadioPanel />}
      {type === 'RadioGroup' && <RadioGroupPanel />}
      {type === 'Select' && <SelectPanel />}
      {type === 'List' && <ListPanel />}
      {type === 'ListItem' && <ListItemPanel />}
      {type === 'ListIcon' && <ListIconPanel />}
      {type === 'Accordion' && <AccordionPanel />}
      {type === 'AccordionItem' && <AccordionItemPanel />}
      {type === 'FormLabel' && <FormLabelPanel />}
      {type === 'FormHelperText' && <FormHelperTextPanel />}
      {type === 'FormErrorMessage' && <FormErrorMessagePanel />}
      {type === 'InputRightAddon' && <ChildrenControl />}
      {type === 'InputLeftAddon' && <ChildrenControl />}
      {type === 'Grid' && <GridPanel />}
      {type === 'NumberInput' && <NumberInputPanel />}
      {type === 'AspectRatioBox' && <AspectRatioPanel />}
      {type === 'Breadcrumb' && <BreadcrumbPanel />}
      {type === 'BreadcrumbItem' && <BreadcrumbItemPanel />}
      {type === 'BreadcrumbLink' && <LinkPanel />}
      {type === 'Menu' && <MenuPanel />}
      {type === 'MenuOptionGroup' && <MenuOptionGroupPanel />}
      {type === 'MenuItem' && <MenuItemPanel />}
      {type === 'MenuItemOption' && <MenuItemOptionPanel />}
      {type === 'MenuList' && <MenuListPanel />}
    </>
  )
}

export default memo(Panels)
