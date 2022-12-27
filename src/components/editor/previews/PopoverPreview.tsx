import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Box,
} from '@chakra-ui/react'

interface Props {
  component: IComponent
}

const PopoverPreview = ({ component }: Props) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }
  let prop = { ...props }
  delete prop['isOpen']
  return (
    <Popover isOpen={props.showpreview} ref={drop(ref)} {...prop}>
      <div>
        {component.children
          .filter((key: string, index: number) => index === 0)
          .map((key: string) => (
            <ComponentPreview key={key} componentName={key} />
          ))}
      </div>
      {component.children
        .filter((key: string, index: number) => index !== 0)
        .map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
    </Popover>
  )
}

export const PopoverCloseButtonPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const {
    props: { icon, ...props },
    ref,
  } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return <PopoverCloseButton ref={ref} {...props} />
}

export const PopoverHeaderPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return <PopoverHeader ref={ref} {...props} />
}

export const PopoverContentPreview = ({ component }: Props) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <PopoverContent ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </PopoverContent>
  )
}

export const PopoverTriggerPreview = ({ component }: Props) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return component.children.length > 0 ? (
    <PopoverTrigger ref={drop(ref)} {...props}>
      <span>
        <ComponentPreview componentName={component.children[0]} />
      </span>
    </PopoverTrigger>
  ) : (
    <Box pos="relative" ref={drop(ref)} {...props} />
  )
}

export const PopoverFooterPreview = ({ component }: Props) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <PopoverFooter ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </PopoverFooter>
  )
}

export const PopoverArrowPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return <PopoverArrow ref={ref} {...props} />
}

export const PopoverBodyPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return <PopoverBody ref={ref} {...props} />
}

export default PopoverPreview
