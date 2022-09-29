import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import CCPreview from './previews/CCPreview'
import * as Chakra from '@chakra-ui/react'
import { getComponentBy } from '~core/selectors/components'
import PreviewContainer from '~components/editor/PreviewContainer'
import WithChildrenPreviewContainer from '~components/editor/WithChildrenPreviewContainer'

const CustomComponentPreview: React.FC<{
  componentName: string
}> = ({ componentName, ...forwardedProps }) => {
  const component = useSelector(getComponentBy(componentName))
  if (!component) {
    console.error(`ComponentPreview unavailable for component ${componentName}`)
  }

  const type = (component && component.type) || null

  switch (type) {
    case 'CC':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
        />
      )
    case 'CC':
      return <CCPreview component={component} />

    default:
      return null
  }
}

export default memo(CustomComponentPreview)
