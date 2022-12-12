import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

import { Testingtt } from 'src/custom-components/customOcTsx/testingtt'

interface Props {
  component: IComponent;
}

const TestingttPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  const {} = props

  return (
    <Box {...props} ref={ref}>
      <Testingtt {...props} />
    </Box>
  )
}

export default TestingttPreview
