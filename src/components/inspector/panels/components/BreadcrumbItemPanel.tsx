import React, { memo } from 'react'

import SwitchControl from '../../controls/SwitchControl'

const BreadcrumbItemPanel = () => {
  return (
    <>
      <SwitchControl label="is Current Page" name="isCurrentPage" />
    </>
  )
}

export default memo(BreadcrumbItemPanel)
