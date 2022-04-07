import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../hoc/withEdiAuth'
import Tabs from '../../components/Feurst/Tabs'

const Orders = ({userRights}) => {
  
  return (<>
    <Tabs userRights={userRights} />
  </>)
}

export default withEdiAuth(Orders, {pathAfterFailure: '/edi/login'})
