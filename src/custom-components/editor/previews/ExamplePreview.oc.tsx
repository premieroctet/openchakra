import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

import { Example } from 'src/custom-components/customOcTsx/example'

interface Props {
  component: IComponent;
}

const ExamplePreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  const {
    headline,
    signup_url,
    forgot_password_url,
    show_forgot_password,
    auth_provider_name_1,
    auth_provider_name_2,
    img_url,
    email_value,
    onEmailChange,
    passwordValue,
    onPasswordChange,
    show_both_auth_providers,
    show_auth_provider_1,
    show_auth_provider_2
  } = props

  return (
    <Box {...props} ref={ref}>
      <Example {...props} />
    </Box>
  )
}

export default ExamplePreview
