import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Slider } from '@chakra-ui/react'

const SliderPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props } = useInteractive(component, false)

  return (
    <Slider {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Slider>
  )
}

export default SliderPreview
