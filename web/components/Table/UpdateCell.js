import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Tooltip from '../Tooltip.js/Tooltip'


const UpdateCell = ({
  value: initialValue,
  row: {index},
  column: {id},
  cell: {row},
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)

  // const alertStock = row?.original?.product?.stock && value > row.original.product.stock
  //   ? (<div className='stockalert'>⚠️<span>Qté disponible&nbsp;: {row.original.product.stock}</span></div>)
  //   : null


  const itemToUpdate = row?.original?.product
  const qty = !isNaN(parseInt(value)) && parseInt(value)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    if (typeof updateMyData === 'function') {
      updateMyData({item: itemToUpdate, qty})
    }
    else {
      console.error('React Table Data not updated. Did you forget the prop updateMyData on your table ?')
    }
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <><input type={'number'} value={value} onChange={onChange} onBlur={onBlur} /> <Tooltip trigger={() => '⚠️'} content={() => '2'}/> </>
  
}

export default UpdateCell
