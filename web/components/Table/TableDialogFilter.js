import React from 'react'
import {Popover} from '@headlessui/react'


const TableDialogFilter = ({children}) => {

  //   useEffect(() => {
  //     document.addEventListener('keydown', escFunction)
  //     document.addEventListener('mousedown', handleClickOutside)
    
  //     return () => {
  //       document.removeEventListener('keydown', escFunction)
  //       document.removeEventListener('mousedown', handleClickOutside)
  //     }
  //   }, [])

  return (
    <>
      <Popover className="filter_table">
        {({open}) => (
          <>
            <Popover.Button
              className={` filter_trigger
                ${open ? '' : 'text-opacity-90'}
                `}
            >
              <img src='/static/assets/icon/funnel.svg' width={20} height={20} alt="" />
            </Popover.Button>
           
            <Popover.Panel className="filter_panel">
              {children}
            </Popover.Panel>
           
          </>
        )}
      </Popover>
    </>
  )
}

export default TableDialogFilter
