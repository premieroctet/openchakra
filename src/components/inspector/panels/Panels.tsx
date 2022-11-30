import React, { memo, lazy, Suspense, useState, useEffect } from 'react'
import ButtonPanel from '~components/inspector/panels/components/ButtonPanel'
import BadgePanel from '~components/inspector/panels/components/BadgePanel'
import IconPanel from '~components/inspector/panels/components/IconPanel'
import ImagePanel from '~components/inspector/panels/components/ImagePanel'
import BoxPanel from '~components/inspector/panels/components/BoxPanel'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import AvatarPanel from '~components/inspector/panels/components/AvatarPanel'
import AvatarGroupPanel from '~components/inspector/panels/components/AvatarGroupPanel'
import AvatarBadgePanel from '~components/inspector/panels/components/AvatarBadgePanel'
import CheckboxPanel from '~components/inspector/panels/components/CheckboxPanel'
import IconButtonPanel from '~components/inspector/panels/components/IconButtonPanel'
import ProgressPanel from '~components/inspector/panels/components/ProgressPanel'
import LinkPanel from '~components/inspector/panels/components/LinkPanel'
import SpinnerPanel from '~components/inspector/panels/components/SpinnerPanel'
import CloseButtonPanel from '~components/inspector/panels/components/CloseButtonPanel'
import DividerPanel from '~components/inspector/panels/components/DividerPanel'
import CodePanel from '~components/inspector/panels/components/CodePanel'
import TextareaPanel from '~components/inspector/panels/components/TextareaPanel'
import CircularProgressPanel from '~components/inspector/panels/components/CircularProgressPanel'
import HeadingPanel from '~components/inspector/panels/components/HeadingPanel'
import TagPanel from '~components/inspector/panels/components/TagPanel'
import TagLabelPanel from './components/TagLabelPanel'
import TagIconPanel from './components/TagIconPanel'
import SimpleGridPanel from '~components/inspector/panels/components/SimpleGridPanel'
import SwitchPanel from '~components/inspector/panels/components/SwitchPanel'
import AlertPanel from '~components/inspector/panels/components/AlertPanel'
import AlertIconPanel from '~components/inspector/panels/components/AlertIconPanel'
import AlertTitlePanel from '~components/inspector/panels/components/AlertTitlePanel'
import AlertDescriptionPanel from '~components/inspector/panels/components/AlertDescriptionPanel'
import FlexPanel from '~components/inspector/panels/styles/FlexPanel'
import StackPanel from '~components/inspector/panels/components/StackPanel'
import FormControlPanel from '~components/inspector/panels/components/FormControlPanel'
import TabsPanel from '~components/inspector/panels/components/TabsPanel'
import InputPanel from '~components/inspector/panels/components/InputPanel'
import RadioPanel from '~components/inspector/panels/components/RadioPanel'
import RadioGroupPanel from '~components/inspector/panels/components/RadioGroupPanel'
import SelectPanel from '~components/inspector/panels/components/SelectPanel'
import ListPanel from '~components/inspector/panels/components/ListPanel'
import ListItemPanel from '~components/inspector/panels/components/ListItemPanel'
import ListIconPanel from '~components/inspector/panels/components/ListIconPanel'
import AccordionItemPanel from '~components/inspector/panels/components/AccordionItemPanel'
import AccordionPanel from '~components/inspector/panels/components/AccordionPanel'
import FormLabelPanel from '~components/inspector/panels/components/FormLabelPanel'
import FormHelperTextPanel from '~components/inspector/panels/components/FormHelperTextPanel'
import FormErrorMessagePanel from '~components/inspector/panels/components/FormErrorMessagePanel'
import GridPanel from '~components/inspector/panels/components/GridPanel'
import NumberInputPanel from '~components/inspector/panels/components/NumberInputPanel'
import AspectRatioPanel from '~components/inspector/panels/components/AspectRatioPanel'
import BreadcrumbPanel from '~components/inspector/panels/components/BreadcrumbPanel'
import BreadcrumbItemPanel from '~components/inspector/panels/components/BreadcrumbItemPanel'
import HighlightPanel from '~components/inspector/panels/components/HighlightPanel'
import KbdPanel from './components/KbdPanel'
import TabPanel from './components/TabPanel'
import StatArrowPanel from './components/StatArrowPanel'
import StatLabelPanel from './components/StatLabelPanel'
import SkeletonPanel from './components/SkeletonPanel'
import TablePanel from './components/TablePanel'
import ConditionalPanel from './components/ConditionalPanel'
import LoopPanel from './components/LoopPanel'
import { useSelector } from 'react-redux'
import { getCustomComponentNames } from '~core/selectors/customComponents'
import { convertToPascal } from '~components/editor/Editor'
import TdPanel from './components/TdPanel'
import TableCaptionPanel from './components/TableCaptionPanel'
import CardPanel from './components/CardPanel'
import TooltipPanel from './components/TooltipPanel'

const importView = (component: any) => {
  component = convertToPascal(component)
  return lazy(() =>
    import(
      `src/custom-components/inspector/panels/components/${component}Panel.oc.tsx`
    ).catch(() => import('src/custom-components/fallback')),
  )
}

const Panels: React.FC<{
  component: IComponent
  isRoot: boolean
  isCustom?: boolean
}> = ({ component, isRoot, isCustom = false }) => {
  const { type } = component
  const [views, setViews] = useState<any>([])
  const customComponents = useSelector(getCustomComponentNames)

  useEffect(() => {
    async function loadViews() {
      const componentPromises = await customComponents.map(
        async (component: any) => {
          const View = await importView(component)
          return <View key={component} />
        },
      )
      Promise.all(componentPromises).then(setViews)
    }
    loadViews()
  }, [customComponents])

  if (isRoot) {
    return null
  }

  if (isCustom) {
    const ind = customComponents.indexOf(type)
    if (ind !== -1)
      return <Suspense fallback={'Loading...'}>{views[ind]}</Suspense>
    return <>Loading...</>
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
      {type === 'Highlight' && <HighlightPanel />}
      {type === 'SimpleGrid' && <SimpleGridPanel />}
      {type === 'Switch' && <SwitchPanel />}
      {type === 'Alert' && <AlertPanel />}
      {type === 'AlertIcon' && <AlertIconPanel />}
      {type === 'AlertTitle' && <AlertTitlePanel />}
      {type === 'AlertDescription' && <AlertDescriptionPanel />}
      {type === 'Tag' && <TagPanel />}
      {type === 'TagLabel' && <TagLabelPanel />}
      {type === 'TagLeftIcon' && <TagIconPanel />}
      {type === 'TagRightIcon' && <TagIconPanel />}
      {type === 'Flex' && <FlexPanel />}
      {type === 'Stack' && <StackPanel />}
      {type === 'FormControl' && <FormControlPanel />}
      {type === 'Tabs' && <TabsPanel />}
      {type === 'Tab' && <TabPanel />}
      {type === 'Input' && <InputPanel />}
      {type === 'Radio' && <RadioPanel />}
      {type === 'RadioGroup' && <RadioGroupPanel />}
      {type === 'Select' && <SelectPanel />}
      {type === 'Skeleton' && <SkeletonPanel />}
      {type === 'SkeletonCircle' && <SkeletonPanel isSkeletonCircle />}
      {type === 'SkeletonText' && <SkeletonPanel isSkeletonText />}
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
      {type === 'Kbd' && <KbdPanel />}
      {type === 'StatArrow' && <StatArrowPanel />}
      {type === 'StatLabel' && <StatLabelPanel />}
      {type === 'StatNumber' && <StatLabelPanel />}
      {type === 'Table' && <TablePanel />}
      {type === 'TableCaption' && <TableCaptionPanel />}
      {type === 'Td' && <TdPanel />}
      {type === 'Th' && <TdPanel />}
      {type === 'Conditional' && <ConditionalPanel />}
      {type === 'Loop' && <LoopPanel />}
      {type === 'Card' && <CardPanel />}
      {type === 'Tooltip' && <TooltipPanel />}
    </>
  )
}

export default memo(Panels)
