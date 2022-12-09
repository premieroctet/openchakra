import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

import { Login } from 'src/custom-components/customOcTsx/login'

interface Props {
  component: IComponent;
}

const LoginPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  const {} = props

  return (
    <Box {...props} ref={ref}>
      <Login {...props} />
    </Box>
  )
}

export default LoginPreview
