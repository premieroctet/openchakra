import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

const DataProviderPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { drop } = useDropComponent(component.id, ['Avatar'])
  const { props, ref } = useInteractive(component, true)

  const label = props?.model
    ? `Data provider/${props?.model}`
    : `Unlinked data provider (${component.id})`
  return (
    <Box ref={drop(ref)} id={component.id} {...props}>
      <h1>{label}</h1>
    </Box>
  )
}

export default DataProviderPreview
