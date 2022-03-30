import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../hoc/withEdiAuth'
import Tabs from '../../components/Feurst/Tabs'

const Orders = ({}) => {
  
  return (<>
    <Tabs />
  </>)
}

export default withEdiAuth(Orders, {pathAfterFailure: '/edi/login'})
