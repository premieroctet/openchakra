import React, {useState, Fragment} from 'react'
import {Tab} from '@headlessui/react'
import OrderCreate from './OrderCreate'
import MyOrders from './MyOrders'
import MyQuotations from './MyQuotations'

const tabsContent = [
  {
    title: 'Créer une commande',
    component: <OrderCreate />,
  },
  {
    title: 'Mes commandes',
    component: <MyOrders />,
  },
  {
    title: 'Mes devis',
    component: <MyQuotations />,
  },
]

const Tabs = props => {


  return (
    <Tab.Group >
      <Tab.List>
        {tabsContent.map((elem, i) => (
          <Tab key={`tab${i}`} as={Fragment}>
            {({selected}) => (
              <button
                className={
                  selected ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }
              >{elem.title}</button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabsContent.map((elem, i) => (
          <Tab.Panel key={`panel${i}`}>
            {elem.component}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  
  )
}
export default Tabs
