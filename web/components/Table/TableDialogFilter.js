import React, {useEffect, useRef, useCallback} from 'react'

const TableDialogFilter = ({children}) => {

  const dialog = useRef()

  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      dialog.current.close()
    }
  }, [])

  const handleClickOutside = useCallback(event => {
    if (dialog.current && !dialog.current.contains(event.target)) {
      dialog.current.close()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escFunction)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('keydown', escFunction)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <button onClick={() => { dialog.current.show() }} >Filtrer</button>
      <dialog ref={dialog} role="dialog">
        <button onClick={() => dialog.current.close()}>X</button>
        {children}
      </dialog>
    </>
  )
}

export default TableDialogFilter
