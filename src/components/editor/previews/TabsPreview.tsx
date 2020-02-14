import React from 'react'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import { Tabs } from '@chakra-ui/core'
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

export default TabsPreview
