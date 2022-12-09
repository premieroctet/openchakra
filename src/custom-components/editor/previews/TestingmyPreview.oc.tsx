import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

import { Testingmy } from 'src/custom-components/customOcTsx/testingmy'

interface Props {
  component: IComponent;
}

const TestingmyPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  const {} = props

  return (
    <Box {...props} ref={ref}>
      <Testingmy {...props} />
    </Box>
  )
}

export default TestingmyPreview
