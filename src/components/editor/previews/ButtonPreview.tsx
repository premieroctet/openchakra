import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import { Button } from '@chakra-ui/react'
import icons from '~iconsList'

interface Props {
  component: IComponent
  index: number
}

const ButtonPreview = ({ component, index }: Props) => {
  const { props, ref } = useInteractive(component, index, true)

  if (props.leftIcon) {
    if (Object.keys(icons).includes(props.leftIcon)) {
      const Icon = icons[props.leftIcon as keyof typeof icons]
      props.leftIcon = <Icon path="" />
    } else {
      props.leftIcon = undefined
    }
  }

  if (props.rightIcon) {
    if (Object.keys(icons).includes(props.rightIcon)) {
      const Icon = icons[props.rightIcon as keyof typeof icons]
      props.rightIcon = <Icon path="" />
    } else {
      props.rightIcon = undefined
    }
  }

  return <Button ref={ref} index={index} {...props} />
}

export default ButtonPreview
