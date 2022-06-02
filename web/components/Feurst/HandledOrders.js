import React, {useState} from 'react'
import Link from 'next/link'
import {StyledTabs} from '../../styles/feurst/StyledComponents'
import {
  HANDLED,
  PARTIALLY_HANDLED,
  VALID,
} from '../../utils/feurst/consts'
import {handledOrdersColumns} from './tablestructures'
import BaseListTable from './BaseListTable'


const HandledOrders = ({accessRights}) => {

  const [selectedTab, setSelectedTab]=useState(0)

  const TABS=[{
    title: 'Commandes à traiter',
    filter: o => [PARTIALLY_HANDLED, VALID].includes(o.status),
  },
  {
    title: 'Commandes traitées',
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
        caption='Traitement des commandes'
        endpoint='orders'
        filter={currentFilter}
        accessRights={accessRights}
        columns={handledOrdersColumns}
        wordingSection={'EDI.ORDER'}
      />
    </>
  )
}

export default HandledOrders
