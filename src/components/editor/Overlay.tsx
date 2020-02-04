import React, { ReactNode } from 'react'
import { Box } from '@chakra-ui/core'

type OverlayProps = {
  rect: DOMRect
  children?: ReactNode
}

const Overlay: React.FC<OverlayProps> = ({ rect, children }) => {
  return (
    <Box
      pointerEvents="none"
      cursor="pointer"
      zIndex={40}
      borderWidth={1}
      borderColor="teal.300"
      position="absolute"
      width={rect.width + 10}
      height={rect.height + 10}
      top={`${rect.top - 53}px`}
      left={`${rect.left - 229}px`}
    >
      {children}
    </Box>
  )
}

export default Overlay
