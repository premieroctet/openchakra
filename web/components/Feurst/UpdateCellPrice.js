import React, {useState, useEffect} from 'react'


const UpdateCellPrice = ({
  value: initialValue,
  row: {index},
  column: {id},
  cell: {row},
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)

  const itemToUpdate = row?.original?.product

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    if (typeof updateMyData === 'function') {
      updateMyData({item: itemToUpdate, quantity: row?.original?.quantity, net_price: value, replace: true})
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
    <input className='grow' type={'number'} value={value?.toFixed ? value.toFixed(2) : value} onChange={onChange} onBlur={onBlur} />
  </div>

}

export default UpdateCellPrice
