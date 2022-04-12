import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const Shiprates = require('../../../components/Feurst/Shiprates')
const {BASEPATH_EDI} = require('../../../utils/feurst/consts')
const {SHIPRATE, VIEW} = require('../../../utils/consts')

const ShipratesList = ({accessRights}) => {

  return (<>
    <Shiprates accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(ShipratesList, {model: SHIPRATE, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
