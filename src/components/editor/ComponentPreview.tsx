import React, { memo, Suspense, lazy, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AlertPreview from '~components/editor/previews/AlertPreview'
import TablePreview, {
  TrPreview,
} from '~components/editor/previews/TablePreview'
import AvatarPreview, {
  AvatarBadgePreview,
  AvatarGroupPreview,
} from '~components/editor/previews/AvatarPreview'
import AccordionPreview, {
  AccordionButtonPreview,
  AccordionItemPreview,
  AccordionPanelPreview,
} from '~components/editor/previews/AccordionPreview'
import * as Chakra from '@chakra-ui/react'
import { getComponentBy } from '~core/selectors/components'
import { InputRightElementPreview } from '~components/editor/previews/InputRightElement'
import { InputLeftElementPreview } from '~components/editor/previews/InputLeftElement'
import AspectRatioPreview from '~components/editor/previews/AspectRatioBoxPreview'
import ButtonPreview from '~components/editor/previews/ButtonPreview'
import PreviewContainer from '~components/editor/PreviewContainer'
import WithChildrenPreviewContainer from '~components/editor/WithChildrenPreviewContainer'
import IconPreview from './previews/IconPreview'
import IconButtonPreview from './previews/IconButtonPreview'
import SelectPreview from '~components/editor/previews/SelectPreview'
import ConditionalPreview from './previews/ConditionalPreview'
import LoopPreview from './previews/LoopPreview'
import NumberInputPreview from '~components/editor/previews/NumberInputPreview'
import BreadcrumbPreview from './previews/BreadcrumbPreview'
import BreadcrumbItemPreview from './previews/BreadcrumbItemPreview'
import HighlightPreview from './previews/HighlightPreview'
import StatGroupPreview, {
  StatHelpTextPreview,
  StatPreview,
} from './previews/StatPreview'
import SkeletonPreview, {
  SkeletonCirclePreview,
  SkeletonTextPreview,
} from './previews/SkeletonPreview'
import RangeSliderPreview from './previews/RangeSliderPreview'
import RangeSliderTrackPreview from './previews/RangeSliderTrackPreview'
import RangeSliderThumbPreview from './previews/RangeSliderThumbPreview'
import RangeSliderFilledTrackPreview from './previews/RangeSliderFilledTrackPreview'
import ModalPreview, {
  ModalCloseButtonPreview,
  ModalBodyPreview,
  ModalContentPreview,
  ModalFooterPreview,
  ModalHeaderPreview,
  ModalOverlayPreview,
} from './previews/ModalPreview'
import PopoverPreview, {
  PopoverHeaderPreview,
  PopoverArrowPreview,
  PopoverBodyPreview,
  PopoverCloseButtonPreview,
  PopoverContentPreview,
  PopoverFooterPreview,
  PopoverTriggerPreview,
} from './previews/PopoverPreview'
import CardPreview, {
  CardHeaderPreview,
  CardBodyPreview,
  CardFooterPreview,
} from './previews/CardPreview'
import TooltipPreview from './previews/TooltipPreview'
import TagPreview, {
  TagLabelPreview,
  TagLeftIconPreview,
  TagRightIconPreview,
  TagCloseButtonPreview,
} from './previews/TagPreview'
import {
  getCustomComponentNames,
  getInstalledComponents,
} from '~core/selectors/customComponents'
import MenuPreview, {
  MenuListPreview,
  MenuButtonPreview,
  MenuItemPreview,
  MenuItemOptionPreview,
  MenuGroupPreview,
  MenuOptionGroupPreview,
  MenuDividerPreview,
} from './previews/MenuPreview'
import SliderPreview from './previews/SliderPreview'
import SliderTrackPreview from './previews/SliderTrackPreview'
import SliderThumbPreview from './previews/SliderThumbPreview'
import { convertToPascal } from './Editor'

const importView = (component: any, isInstalled: boolean = false) => {
  if (isInstalled) {
    return lazy(() =>
    import(
      `src/installed-components/${component}Preview.ic.tsx`
    ).catch(() => import('src/custom-components/fallback')),
  )
  }
  component = convertToPascal(component)
  return lazy(() =>
    import(
      `src/custom-components/editor/previews/${component}Preview.oc.tsx`
    ).catch(() => import('src/custom-components/fallback')),
  )
}

const ComponentPreview: React.FC<{
  componentName: string
}> = ({ componentName, ...forwardedProps }) => {
  const component = useSelector(getComponentBy(componentName))
  if (!component) {
    console.error(`ComponentPreview unavailable for component ${componentName}`)
  }
  const type = (component && component.type) || null
  const [views, setViews] = useState<any>([])
  const [instView, setInstView] = useState<any>()
  const customComponents = useSelector(getCustomComponentNames)
  const installedComponents = useSelector(getInstalledComponents)

  useEffect(() => {
    async function loadViews() {
      const componentPromises = await customComponents.map(
        async (customComponent: string) => {
          const View = await importView(customComponent)
          return <View key={customComponent} component={component} />
        },
      )
      Promise.all(componentPromises).then(setViews)
    }
    loadViews()
  }, [customComponents])

  useEffect(() => {
    async function loadViews() {
      const installedComponent = componentName.split('-')[0]
      const View = await importView(installedComponent, true)
      const loadedComponent = <View key={installedComponent} component={component} />
      Promise.all([loadedComponent]).then(setInstView)
    }
    loadViews()
  }, [installedComponents])


  if (type && Object.keys(installedComponents).includes(type)) {
    return <Suspense fallback={'Loading...'}>{instView}</Suspense>
  }

  if (type && customComponents.includes(type)) {
    const ind = customComponents.indexOf(type)
    if (ind !== -1)
      return <Suspense fallback={'Loading...'}>{views[ind]}</Suspense>
    return <>Loading...</>
  }

  switch (type) {
    // Simple components
    case 'Badge':
    case 'Image':
    case 'Text':
    case 'Link':
    case 'Spinner':
    case 'Checkbox':
    case 'Textarea':
    case 'CircularProgress':
    case 'Heading':
    case 'Switch':
    case 'FormLabel':
    case 'SliderFilledTrack':
    case 'SliderMark':
    case 'FormHelperText':
    case 'FormErrorMessage':
    case 'Tab':
    case 'Input':
    case 'Radio':
    case 'ListItem':
    case 'BreadcrumbLink':
    case 'Kbd':
    case 'StatLabel':
    case 'StatNumber':
    case 'StatArrow':
    case 'RangeSliderFilledTrack':
    case 'Td':
    case 'Th':
    case 'TableCaption':
      return (
        <PreviewContainer
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
        />
      )
    // Wrapped functional components (forward ref issue)
    case 'AlertIcon':
    case 'Progress':
    case 'CloseButton':
    case 'AccordionIcon':
    case 'Code':
    case 'ListIcon':
    case 'Divider':
    case 'AlertDescription':
    case 'AlertTitle':
    case 'InputRightAddon':
    case 'InputLeftAddon':
      return (
        <PreviewContainer
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
        />
      )
    // Components with childrens
    case 'Box':
    case 'SimpleGrid':
    case 'Flex':
    case 'FormControl':
    case 'Tabs':
    case 'List':
    case 'TabList':
    case 'TabPanel':
    case 'TabPanels':
    case 'Grid':
    case 'Center':
    case 'Container':
    case 'TableContainer':
    case 'Thead':
    case 'Tbody':
    case 'Tfoot':
      // case 'Tr':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
        />
      )
    case 'RadioGroup':
    case 'Stack':
    case 'InputGroup':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
        />
      )
    // More complex components
    case 'InputRightElement':
      return <InputRightElementPreview component={component} />
    case 'InputLeftElement':
      return <InputLeftElementPreview component={component} />
    case 'Avatar':
      return <AvatarPreview component={component} />
    case 'AvatarBadge':
      return <AvatarBadgePreview component={component} />
    case 'AvatarGroup':
      return <AvatarGroupPreview component={component} />
    case 'Alert':
      return <AlertPreview component={component} />
    case 'Accordion':
      return <AccordionPreview component={component} />
    case 'AccordionButton':
      return <AccordionButtonPreview component={component} />
    case 'AccordionItem':
      return <AccordionItemPreview component={component} />
    case 'AccordionPanel':
      return <AccordionPanelPreview component={component} />
    case 'AspectRatio':
      return <AspectRatioPreview component={component} />
    case 'Button':
      return <ButtonPreview component={component} />
    case 'Breadcrumb':
      return <BreadcrumbPreview component={component} />
    case 'BreadcrumbItem':
      return <BreadcrumbItemPreview component={component} />
    case 'Icon':
      return <IconPreview component={component} />
    case 'IconButton':
      return <IconButtonPreview component={component} />
    case 'Select':
      return <SelectPreview component={component} />
    case 'NumberInput':
      return <NumberInputPreview component={component} />
    case 'Highlight':
      return <HighlightPreview component={component} />
    case 'Skeleton':
      return <SkeletonPreview component={component} />
    case 'SkeletonText':
      return <SkeletonTextPreview component={component} />
    case 'SkeletonCircle':
      return <SkeletonCirclePreview component={component} />
    case 'RangeSliderTrack':
      return <RangeSliderTrackPreview component={component} />
    case 'RangeSlider':
      return <RangeSliderPreview component={component} />
    case 'RangeSliderThumb':
      return <RangeSliderThumbPreview component={component} />
    case 'Stat':
      return <StatPreview component={component} />
    case 'StatHelpText':
      return <StatHelpTextPreview component={component} />
    case 'Popover':
      return <PopoverPreview component={component} />
    case 'PopoverCloseButton':
      return <PopoverCloseButtonPreview component={component} />
    case 'PopoverHeader':
      return <PopoverHeaderPreview component={component} />
    case 'PopoverContent':
      return <PopoverContentPreview component={component} />
    case 'PopoverArrow':
      return <PopoverArrowPreview component={component} />
    case 'PopoverFooter':
      return <PopoverFooterPreview component={component} />
    case 'PopoverBody':
      return <PopoverBodyPreview component={component} />
    case 'PopoverTrigger':
      return <PopoverTriggerPreview component={component} />
    case 'StatGroup':
      return <StatGroupPreview component={component} />
    case 'Table':
      return <TablePreview component={component} />
    case 'Tr':
      return <TrPreview component={component} />
    case 'Tag':
      return <TagPreview component={component} />
    case 'TagLabel':
      return <TagLabelPreview component={component} />
    case 'TagLeftIcon':
      return <TagLeftIconPreview component={component} />
    case 'TagRightIcon':
      return <TagRightIconPreview component={component} />
    case 'TagCloseButton':
      return <TagCloseButtonPreview component={component} />
    case 'Conditional':
      return <ConditionalPreview component={component} />
    case 'Loop':
      return <LoopPreview component={component} />
    case 'Modal':
      return <ModalPreview component={component} />
    case 'ModalCloseButton':
      return <ModalCloseButtonPreview component={component} />
    case 'ModalHeader':
      return <ModalHeaderPreview component={component} />
    case 'ModalContent':
      return <ModalContentPreview component={component} />
    case 'ModalOverlay':
      return <ModalOverlayPreview component={component} />
    case 'ModalFooter':
      return <ModalFooterPreview component={component} />
    case 'ModalBody':
      return <ModalBodyPreview component={component} />
    case 'Card':
      return <CardPreview component={component} />
    case 'CardHeader':
      return <CardHeaderPreview component={component} />
    case 'CardBody':
      return <CardBodyPreview component={component} />
    case 'CardFooter':
      return <CardFooterPreview component={component} />
    case 'Tooltip':
      return <TooltipPreview component={component} />
    case 'Menu':
      return <MenuPreview component={component} />
    case 'MenuButton':
      return <MenuButtonPreview component={component} />
    case 'MenuList':
      return <MenuListPreview component={component} />
    case 'MenuGroup':
      return <MenuGroupPreview component={component} />
    case 'MenuOptionGroup':
      return <MenuOptionGroupPreview component={component} />
    case 'MenuItemOption':
      return <MenuItemOptionPreview component={component} />
    case 'MenuItem':
      return <MenuItemPreview component={component} />
    case 'MenuDivider':
      return <MenuDividerPreview component={component} />
    case 'SliderTrack':
      return <SliderTrackPreview component={component} />
    case 'Slider':
      return <SliderPreview component={component} />
    case 'SliderThumb':
      return <SliderThumbPreview component={component} />
    default:
      return null
  }
}

export default memo(ComponentPreview)
