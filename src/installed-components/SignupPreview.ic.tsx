import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

import { Signup } from '@tiui/remote.ui-made-easy-2-components.signup'

interface Props {
  component: IComponent;
}

const SignupPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box {...props} ref={ref}>
      <Signup {...props} />
    </Box>
  )
}

export default SignupPreview
