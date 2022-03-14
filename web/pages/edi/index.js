import React from 'react'
import EDIHeader from '../../components/Feurst/EDIHeader'
import LogIn from '../../components/LogIn/LogIn'
import Table from '../../components/Table/Table'

import '../../static/feurst.css'

export const feurstImgPath = '../../static/assets/img/feurst'

const Edi = () => {
  
  return (<>
    <EDIHeader />
    <LogIn />
    <Table /></>)
}

export default Edi
