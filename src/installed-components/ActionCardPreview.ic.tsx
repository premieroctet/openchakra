import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

import { ActionCard } from '@tiui/remote.ui.action-card'

interface Props {
  component: IComponent;
}

const ActionCardPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box {...props} ref={ref}>
      <ActionCard {...props} />
    </Box>
  )
}

export default ActionCardPreview
