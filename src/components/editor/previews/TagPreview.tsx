import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'
import icons from '~iconsList'

interface Props {
  component: IComponent
}

const TagPreview = ({ component }: Props) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }
  return (
    <Tag ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Tag>
  )
}

export const TagCloseButtonPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const {
    props: { icon, ...props },
    ref,
  } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return <TagCloseButton ref={ref} {...props} />
}

export const TagLabelPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return <TagLabel ref={ref} {...props} />
}

export const TagLeftIconPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  if (props.as) {
    if (Object.keys(icons).includes(props.as)) {
      const Icon = icons[props.as as keyof typeof icons]
      props.children = <Icon path="" />
    } else {
      props.children = undefined
    }
  }

  return <TagLeftIcon ref={ref} {...props} p={0} />
}

export const TagRightIconPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  if (props.as) {
    if (Object.keys(icons).includes(props.as)) {
      const Icon = icons[props.as as keyof typeof icons]
      props.children = <Icon path="" />
    } else {
      props.children = undefined
    }
  }

  return <TagRightIcon ref={ref} {...props} p={0} />
}

export default TagPreview
