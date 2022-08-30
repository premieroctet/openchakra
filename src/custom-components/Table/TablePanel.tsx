import React from 'react'

import ChildrenControl from '~components/inspector/controls/ChildrenControl'

import DataSourcePanel from '../../components/inspector/panels/DataSourcePanel';

const TablePanel = () => {
  return (
    <>
      <DataSourcePanel />
      <ChildrenControl />
    </>
  )
}

export default TablePanel
