import React from 'react'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/core'
import ComponentPreview from '../ComponentPreview'
import { TabsWhiteList } from '../../../utils/editor'

const TabsPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, TabsWhiteList)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Tabs ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Tabs>
  )
}

export const TabPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, TabsWhiteList)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Tab ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Tab>
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

export const TabPanelPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, TabsWhiteList)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <TabPanel ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </TabPanel>
  )
}

export const TabPanelsPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, TabsWhiteList)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <TabPanels ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </TabPanels>
  )
}

export default TabsPreview
