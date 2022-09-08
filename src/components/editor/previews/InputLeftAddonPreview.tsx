import React from 'react'
import { Box, InputLeftAddon } from '@chakra-ui/react'
import { useInteractive } from '~hooks/useInteractive'

const InputLeftAddonPreview: React.FC<IPreviewProps> = ({
  component,
  index,
}) => {
  const { props, ref } = useInteractive(component, index)
  const boxProps: any = {}

  return (
    <Box {...boxProps} ref={ref}>
      <InputLeftAddon {...props} />
    </Box>
  )
}

export default InputLeftAddonPreview
