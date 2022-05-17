import React, {useState} from 'react'
import Link from 'next/link'
import {
  HANDLED,
  PARTIALLY_HANDLED,
  VALID,
} from '../../utils/feurst/consts'
import {StyledTabs} from '../../styles/feurst/StyledComponents'
import {handledQuotationsColumns} from './tablestructures'
import BaseListTable from './BaseListTable'


const HandledQuotations = ({accessRights}) => {

  const [selectedTab, setSelectedTab]=useState(0)

  const TABS=[{
    title: 'Devis à traiter',
    filter: o => [PARTIALLY_HANDLED, VALID].includes(o.status),
  },
  {
    title: 'Devis traités',
    filter: o => [HANDLED].includes(o.status),
  }]

  const currentFilter=TABS[selectedTab].filter

  return (
    <>
      <StyledTabs className='container-base'>
        {TABS.map((tab, i) => (
          <Link key={i} href='#' passHref>
            <a className={selectedTab == i ? 'highlight' : ''} onClick={() => setSelectedTab(i)}>{tab.title}</a>
          </Link>
        ))}
      </StyledTabs>

      <BaseListTable
        caption='Traitement des devis'
        endpoint='quotations'
        filter={currentFilter}
        accessRights={accessRights}
        columns={handledQuotationsColumns}
      />
    </>
  )
}

export default HandledQuotations
