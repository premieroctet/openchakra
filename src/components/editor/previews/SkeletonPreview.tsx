import React from 'react'
import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import ComponentPreview from '~components/editor/ComponentPreview'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'

const SkeletonPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...props} m={0}>
      <Skeleton {...component.props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Skeleton>
    </Box>
  )
}

export const SkeletonTextPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <SkeletonText {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </SkeletonText>
    </Box>
  )
}

export const SkeletonCirclePreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true, true)
  const { drop, isOver } = useDropComponent(component.id)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box display="inline-block" ref={drop(ref)} {...props}>
      <SkeletonCircle {...component.props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </SkeletonCircle>
    </Box>
  )
}

export default SkeletonPreview
