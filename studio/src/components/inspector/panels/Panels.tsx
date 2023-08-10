import { useSelector } from 'react-redux'
import React, { useEffect, useState, memo } from 'react'

import AccordionItemPanel from '~components/inspector/panels/components/AccordionItemPanel'
import AccordionPanel from '~components/inspector/panels/components/AccordionPanel'
import AlertDescriptionPanel from '~components/inspector/panels/components/AlertDescriptionPanel'
import AlertIconPanel from '~components/inspector/panels/components/AlertIconPanel'
import AlertPanel from '~components/inspector/panels/components/AlertPanel'
import AlertTitlePanel from '~components/inspector/panels/components/AlertTitlePanel'
import AspectRatioPanel from '~components/inspector/panels/components/AspectRatioPanel'
import AvatarBadgePanel from '~components/inspector/panels/components/AvatarBadgePanel'
import AvatarGroupPanel from '~components/inspector/panels/components/AvatarGroupPanel'
import AvatarPanel from '~components/inspector/panels/components/AvatarPanel'
import BadgePanel from '~components/inspector/panels/components/BadgePanel'
import BoxPanel from '~components/inspector/panels/components/BoxPanel'
import BreadcrumbItemPanel from '~components/inspector/panels/components/BreadcrumbItemPanel'
import BreadcrumbPanel from '~components/inspector/panels/components/BreadcrumbPanel'
import ButtonPanel from '~components/inspector/panels/components/ButtonPanel'
import CheckboxPanel from '~components/inspector/panels/components/CheckboxPanel'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import CircularProgressPanel from '~components/inspector/panels/components/CircularProgressPanel'
import CloseButtonPanel from '~components/inspector/panels/components/CloseButtonPanel'
import CodePanel from '~components/inspector/panels/components/CodePanel'
import DividerPanel from '~components/inspector/panels/components/DividerPanel'
import FlexPanel from '~components/inspector/panels/styles/FlexPanel'
import FormControlPanel from '~components/inspector/panels/components/FormControlPanel'
import FormErrorMessagePanel from '~components/inspector/panels/components/FormErrorMessagePanel'
import FormHelperTextPanel from '~components/inspector/panels/components/FormHelperTextPanel'
import FormLabelPanel from '~components/inspector/panels/components/FormLabelPanel'
import GridPanel from '~components/inspector/panels/components/GridPanel'
import HeadingPanel from '~components/inspector/panels/components/HeadingPanel'
import IconButtonPanel from '~components/inspector/panels/components/IconButtonPanel'
import IconPanel from '~components/inspector/panels/components/IconPanel'
import ImagePanel from '~components/inspector/panels/components/ImagePanel'
import InputPanel from '~components/inspector/panels/components/InputPanel'
import LinkPanel from '~components/inspector/panels/components/LinkPanel'
import ListIconPanel from '~components/inspector/panels/components/ListIconPanel'
import ListItemPanel from '~components/inspector/panels/components/ListItemPanel'
import ListPanel from '~components/inspector/panels/components/ListPanel'
import NumberInputPanel from '~components/inspector/panels/components/NumberInputPanel'
import ProgressPanel from '~components/inspector/panels/components/ProgressPanel'
import RadioGroupPanel from '~components/inspector/panels/components/RadioGroupPanel'
import RadioPanel from '~components/inspector/panels/components/RadioPanel'
import SelectPanel from '~components/inspector/panels/components/SelectPanel'
import SimpleGridPanel from '~components/inspector/panels/components/SimpleGridPanel'
import SpinnerPanel from '~components/inspector/panels/components/SpinnerPanel'
import StackPanel from '~components/inspector/panels/components/StackPanel'
import SwitchPanel from '~components/inspector/panels/components/SwitchPanel'
import TabPanel from '~components/inspector/panels/components/TabPanel'
import TabsPanel from '~components/inspector/panels/components/TabsPanel'
import TagPanel from '~components/inspector/panels/components/TagPanel'
import TextareaPanel from '~components/inspector/panels/components/TextareaPanel'

import { allowsActions } from '../../../utils/actions'
import { allowsDataSource } from '../../../utils/dataSources'
import { getComponents } from '../../../core/selectors/components'
import { useForm } from '../../../hooks/useForm'
import ActionsPanel from './ActionsPanel'
import DataProviderPanel from '../../../custom-components/DataProvider/DataProviderPanel'
import RedirectPanel from '../../../custom-components/Navigation/RedirectPanel'
import DataSourcePanel from './DataSourcePanel'
import FormControl from '../controls/FormControl'
import VisibilityPanel from './VisibilityPanel'
import useDispatch from '../../../hooks/useDispatch'
import usePropsSelector from '../../../hooks/usePropsSelector'

let extraPanels: { [key: string]: React.FC<React.Component> } = {}

const Panels: React.FC<{ component: IComponent; isRoot: boolean }> = ({
  component,
  isRoot,
}) => {
  const { type } = component

  if (isRoot) {
    return (
      <>
        <DataProviderPanel />
        <RedirectPanel />
      </>
    )
  }

  const compPanel = extraPanels[type]
  if (compPanel) {
    return (
      <>
        {React.createElement(compPanel)}
        <VisibilityPanel name='visibility'/>
        <DataSourcePanel />
      </>
    )
  }

  return (
    <>
      <VisibilityPanel name='visibility'/>
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
      {type === 'Tab' && <TabPanel />}
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
      {type === 'AspectRatio' && <AspectRatioPanel />}
      {type === 'Breadcrumb' && <BreadcrumbPanel />}
      {type === 'BreadcrumbItem' && <BreadcrumbItemPanel />}
      {type === 'BreadcrumbLink' && <LinkPanel />}
      {allowsDataSource(component) && <DataSourcePanel />}
      {allowsActions(component) && <ActionsPanel />}
    </>
  )
}

export const registerPanel = ({ componentType, componentPanel }) => {
  extraPanels[componentType] = componentPanel
}

export default memo(Panels)
