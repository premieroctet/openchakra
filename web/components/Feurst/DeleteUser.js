// @ts-check
import React, {useState, useEffect} from 'react'


const DeleteUser = ({
  value: initialValue,
  cell: {row},
  deleteUser, // This is a custom function that we supplied to our table instance
  sellers,
}) => {
  // We need to keep and update the state of the cell normally
  const [enabled, setEnabled] = useState(false)

  const onChangeSeller = e => {
    deleteUser({company_id: row.original.id})
    setEnabled(!enabled)
  }


  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setEnabled(initialValue)
  }, [initialValue])

  return (
    <button >
      <span role='image'>🗑️</span>
    </button>
  )
  
}

export default DeleteUser
