import React from 'react'
  import { useDropComponent } from '~hooks/useDropComponent'
  import { useInteractive } from '~hooks/useInteractive'
  import {
    Button
  } from "@chakra-ui/react";

  
  
  interface Props { 
    component: IComponent
  }
  
  const ButonPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)
  
  if (isOver) {
      props.bg = 'teal.50'
    }
  
    return (<><Button {...props} variant='solid' size='md' >Button text</Button></>)
  }
  
  export default ButonPreview