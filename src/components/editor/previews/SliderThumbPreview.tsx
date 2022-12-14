import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { SliderThumb, Box } from '@chakra-ui/react'

export const SliderThumbPreview = ({ component }: IPreviewProps) => {
  const { props } = useInteractive(component, false)

  return (
    <Box display="inline-block" {...props}>
      <SliderThumb {...component.props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </SliderThumb>
    </Box>
  )
}

export default SliderThumbPreview