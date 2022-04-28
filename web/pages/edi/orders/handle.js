const React=require('react')
const withEdiAuth=require('../../../hoc/withEdiAuth')
const {ORDER, BASEPATH_EDI} = require('../../../utils/consts')
const HandledOrders = require('../../../components/Feurst/HandledOrders')
const {HANDLE} = require('../../../utils/feurst/consts')

const Orders = ({accessRights}) => {

  return (<>
    <HandledOrders accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(Orders, {model: ORDER, action: HANDLE, pathAfterFailure: `${BASEPATH_EDI}/login`})
