// @ts-check
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Tooltip from '../Tooltip.js/Tooltip'

const AlertStockMsgTrigger = props => <span {...props}>⚠️</span>
const StyledAlertStockTrigger = styled(AlertStockMsgTrigger)`
  margin-inline: var(--spc-2);
  padding: var(--spc-1);
  border-radius: var(--rounded-full);
  background-color: #cc6e29;
  `

const AlertStockMsg = ({className, row}) => <div className={className}><span>Qté disponible&nbsp;: {row.original.product.stock}</span></div>
  
const StyledAlertStockMsg = styled(AlertStockMsg)`
    background: #cc6e29;
    padding: var(--spc-2);
    color: var(--white);
    width: max-content;
    left: 50%;
    top: 0;
    transform: translate(calc(-50% + 1rem), 0);
`

const UpdateCell = ({
  value: initialValue,
  row: {index},
  column: {id},
  cell: {row},
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)

  const itemToUpdate = row?.original?.product
  const qty = !isNaN(parseInt(value)) && parseInt(value)

  const stock = +row?.original?.product?.stock || 0
  const isAvailableStock = qty > stock

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    if (typeof updateMyData === 'function') {
      updateMyData({item: itemToUpdate, quantity: qty, replace: true})
    }
    else {
      console.error('React Table Data not updated. Did you forget the prop updateMyData on your table ?')
    }
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <div className='flex items-center'>
    <input className='grow' type={'number'} value={value} onChange={onChange} onBlur={onBlur} />
    {isAvailableStock && <Tooltip trigger={<StyledAlertStockTrigger />} content={<StyledAlertStockMsg row={row} qty={qty} />}/>}
  </div>
  
}

export default UpdateCell
