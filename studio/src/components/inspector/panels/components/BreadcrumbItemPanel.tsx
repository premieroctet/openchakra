import React, { memo } from 'react'

import SwitchControl from '~components/inspector/controls/SwitchControl'

const BreadcrumbItemPanel = () => {
  return (
    <>
      <SwitchControl label="Is current page" name="isCurrentPage" />
    </>
  )
}

export default memo(BreadcrumbItemPanel)
