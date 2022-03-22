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
      <Popover className="relative">
        {({open}) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                text-white group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Filtrer</span>
            </Popover.Button>
           
            <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                  {children}
                </div>
              </div>
            </Popover.Panel>
           
          </>
        )}
      </Popover>
    </>
  )
}

export default TableDialogFilter
