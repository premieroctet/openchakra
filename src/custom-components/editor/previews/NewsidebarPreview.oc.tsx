import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

import { Newsidebar } from 'src/custom-components/customOcTsx/newsidebar'

interface Props {
  component: IComponent;
}

const NewsidebarPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  const {
    sidebarTitle,
    group1Name,
    group2Name,
    showTitle,
    showGroup1,
    showGroup2
  } = props

  return (
    <Box {...props} ref={ref}>
      <Newsidebar {...props} />
    </Box>
  )
}

export default NewsidebarPreview
