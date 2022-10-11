import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

const DatePreview: React.FC<IPreviewProps> = ({ component }) => {
  
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  const dateToConsider = props?.['data-value'] ? new Date(props?.['data-value']) : new Date()
  const dateOptionsToConsider = props?.['data-format'] ? props?.['data-format'] : {}

  // TODO fr-FR locale dynamic
  const dateTimeFormat = new Intl.DateTimeFormat('fr-FR', dateOptionsToConsider);
  const dateToDisplay = dateTimeFormat.format(dateToConsider)

  return (
    <Box pos="relative" ref={drop(ref)} {...props}>
      <div>{dateToDisplay}</div>
    </Box>
  )
}

export default DatePreview
