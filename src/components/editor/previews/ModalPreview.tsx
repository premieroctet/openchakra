import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Card, CardHeader, CardBody, CardFooter, Box } from '@chakra-ui/react'

interface Props {
  component: IComponent
}

const ModalPreview = ({ component }: Props) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }
  let prop = { ...props }
  delete prop['size']
  delete prop['isOpen']
  delete prop['showpreview']

  return props.showpreview ? (
    <Box display="flex" justifyContent="center">
      <Card ref={drop(ref)} minW={props.size} {...prop} maxW={props.size}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Card>
    </Box>
  ) : (
    <></>
  )
}

export const ModalCloseButtonPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const {
    props: { icon, ...props },
    ref,
  } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return <></>
}

export const ModalHeaderPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return <CardHeader fontWeight="semibold" fontSize="xl" ref={ref} {...props} />
}

export const ModalContentPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </>
  )
}

export const ModalFooterPreview = ({ component }: Props) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <CardFooter
      display="flex"
      justifyContent="flex-end"
      ref={drop(ref)}
      {...props}
    >
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </CardFooter>
  )
}

export const ModalBodyPreview = ({ component }: Props) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <CardBody ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </CardBody>
  )
}

export const ModalOverlayPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return <></>
}

export default ModalPreview
