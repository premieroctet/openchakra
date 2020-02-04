import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import BoxPreview from './previews/BoxPreview'
import ButtonPreview from './previews/ButtonPreview'
import BadgePreview from './previews/BadgePreview'
import IconPreview from './previews/IconPreview'
import ImagePreview from './previews/ImagePreview'
import TextPreview from './previews/TextPreview'
import CheckboxPreview from './previews/CheckboxPreview'
import IconButtonPreview from './previews/IconButtonPreview'
import ProgressPreview from './previews/ProgressPreview'
import LinkPreview from './previews/LinkPreview'
import SpinnerPreview from './previews/SpinnerPreview'
import CloseButtonPreview from './previews/CloseButtonPreview'
import DividerPreview from './previews/DividerPreview'
import CodePreview from './previews/CodePreview'
import TextareaPreview from './previews/TextareaPreview'
import CircularProgressPreview from './previews/CircularProgressPreview'
import HeadingPreview from './previews/HeadingPreview'
import TagPreview from './previews/TagPreview'
import SimpleGridPreview from './previews/SimpleGridPreview'
import SwitchPreview from './previews/SwitchPreview'
import FlexPreview from './previews/FlexPreview'
import AlertPreview, {
  AlertIconPreview,
  AlertTitlePreview,
  AlertDescriptionPreview,
} from './previews/AlertPreview'
import { RootState } from '../..'
import AvatarPreview, {
  AvatarBadgePreview,
  AvatarGroupPreview,
} from './previews/AvatarPreview'
import StackPreview from './previews/StackPreview'
import AccordionPreview, {
  AccordionHeaderPreview,
  AccordionItemPreview,
  AccordionPanelPreview,
  AccordionIconPreview,
} from './previews/AccordionPreview'
import FormControlPreview, {
  FormLabelPreview,
  FormHelperTextPreview,
  FormErrorMessagePreview,
} from './previews/FormControlPreview'
import TabsPreview, {
  TabListPreview,
  TabPanelPreview,
  TabPanelsPreview,
  TabPreview,
} from './previews/TabsPreview'
import InputPreview from './previews/InputPreview'
import { RadioPreview, RadioGroupPreview } from './previews/RadioPreview'
import SelectPreview from './previews/SelectPreview'
import {
  ListPreview,
  ListItemPreview,
  ListIconPreview,
} from './previews/ListPreview'

const ComponentPreview: React.FC<{
  componentName: string
}> = ({ componentName }) => {
  const component = useSelector(
    (state: RootState) => state.components.present.components[componentName],
  )
  const type = (component && component.type) || null

  switch (type) {
    case 'Badge':
      return <BadgePreview component={component} />
    case 'Box':
      return <BoxPreview component={component} />
    case 'Button':
      return <ButtonPreview component={component} />
    case 'Icon':
      return <IconPreview component={component} />
    case 'IconButton':
      return <IconButtonPreview component={component} />
    case 'Image':
      return <ImagePreview component={component} />
    case 'Text':
      return <TextPreview component={component} />
    case 'Progress':
      return <ProgressPreview component={component} />
    case 'Avatar':
      return <AvatarPreview component={component} />
    case 'AvatarBadge':
      return <AvatarBadgePreview component={component} />
    case 'AvatarGroup':
      return <AvatarGroupPreview component={component} />
    case 'Link':
      return <LinkPreview component={component} />
    case 'Spinner':
      return <SpinnerPreview component={component} />
    case 'CloseButton':
      return <CloseButtonPreview component={component} />
    case 'Checkbox':
      return <CheckboxPreview component={component} />
    case 'Divider':
      return <DividerPreview component={component} />
    case 'Code':
      return <CodePreview component={component} />
    case 'Textarea':
      return <TextareaPreview component={component} />
    case 'CircularProgress':
      return <CircularProgressPreview component={component} />
    case 'Heading':
      return <HeadingPreview component={component} />
    case 'Tag':
      return <TagPreview component={component} />
    case 'SimpleGrid':
      return <SimpleGridPreview component={component} />
    case 'Switch':
      return <SwitchPreview component={component} />
    case 'Alert':
      return <AlertPreview component={component} />
    case 'AlertIcon':
      return <AlertIconPreview component={component} />
    case 'AlertTitle':
      return <AlertTitlePreview component={component} />
    case 'AlertDescription':
      return <AlertDescriptionPreview component={component} />
    case 'Flex':
      return <FlexPreview component={component} />
    case 'Stack':
      return <StackPreview component={component} />
    case 'Accordion':
      return <AccordionPreview component={component} />
    case 'AccordionHeader':
      return <AccordionHeaderPreview component={component} />
    case 'AccordionItem':
      return <AccordionItemPreview component={component} />
    case 'AccordionPanel':
      return <AccordionPanelPreview component={component} />
    case 'AccordionIcon':
      return <AccordionIconPreview component={component} />
    case 'FormControl':
      return <FormControlPreview component={component} />
    case 'FormLabel':
      return <FormLabelPreview component={component} />
    case 'FormHelperText':
      return <FormHelperTextPreview component={component} />
    case 'FormErrorMessage':
      return <FormErrorMessagePreview component={component} />
    case 'Tabs':
      return <TabsPreview component={component} />
    case 'TabList':
      return <TabListPreview component={component} />
    case 'TabPanel':
      return <TabPanelPreview component={component} />
    case 'TabPanels':
      return <TabPanelsPreview component={component} />
    case 'Tab':
      return <TabPreview component={component} />
    case 'Input':
      return <InputPreview component={component} />
    case 'Radio':
      return <RadioPreview component={component} />
    case 'RadioGroup':
      return <RadioGroupPreview component={component} />
    case 'Select':
      return <SelectPreview component={component} />
    case 'List':
      return <ListPreview component={component} />
    case 'ListItem':
      return <ListItemPreview component={component} />
    case 'ListIcon':
      return <ListIconPreview component={component} />
    default:
      return null
  }
}

export default memo(ComponentPreview)
