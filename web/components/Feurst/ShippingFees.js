import React from 'react'

const ShippingFees = ({shippingoptions}) => {

  console.log(shippingoptions, shippingoptions === null)
  return (
    <div>
      {Object.entries(shippingoptions).map(([key, value]) => console.log(key, value))}
    </div>
  )
}

export default ShippingFees
