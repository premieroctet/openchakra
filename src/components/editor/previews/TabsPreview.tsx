import React from 'react'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import ComponentPreview from '../ComponentPreview'
import { TabsWhiteList } from '../../../utils/editor'

const acceptedTypes: ComponentType[] = [
  'TabList',
  'TabPanels',
  'TabPanel',
  'Tab',
]

const TabsPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Tabs {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Tabs>
    </Box>
  )
}

export const TabListPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, TabsWhiteList)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <TabList ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </TabList>
  )
}

export const TabPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, TabsWhiteList)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Tab {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Tab>
    </Box>
  )
}

export const TabPanelsPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, TabsWhiteList)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <TabPanels {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </TabPanels>
    </Box>
  )
}

export const TabPanelPreview = ({
  component,
  ...forwardedProps
}: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, TabsWhiteList)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <TabPanel ref={drop(ref)} {...props} {...forwardedProps}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </TabPanel>
  )
}

export default TabsPreview
