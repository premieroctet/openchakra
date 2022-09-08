import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import { Box, Highlight } from '@chakra-ui/react'

const HighlightPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, false)
  const { drop } = useDropComponent(component.id)

  let boxProps: any = {}

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Highlight
        styles={{
          bg: props.highlightBgColor,
          color: props.highlightTextColor,
          px: props.highlightPx,
          py: props.highlightPy,
          rounded: props.highlightRounded,
        }}
        {...props}
      />
    </Box>
  )
}

export default HighlightPreview
