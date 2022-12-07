import React from 'react'
import { Box, InputLeftAddon } from '@chakra-ui/react'
import { useInteractive } from '~hooks/useInteractive'

const InputLeftAddonPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { props, ref } = useInteractive(component)
  const boxProps: any = {}

  return (
    <Box {...boxProps} ref={ref}>
      <InputLeftAddon {...props} />
    </Box>
  )
}

export default InputLeftAddonPreview
