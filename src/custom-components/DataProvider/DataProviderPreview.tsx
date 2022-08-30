import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

const DataProviderPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id, ['Avatar'])
  const { props, ref } = useInteractive(component, true)

  return (
    <Box ref={drop(ref)} id={component.id} {...props}>
      <h1>
        Data provider {props?.model ? `pour ${props?.model}` : 'non paramétré'}{' '}
        (id ${component.id})
      </h1>
    </Box>
  )
}

export default DataProviderPreview
