import React from 'react'
import {localeMoneyFormat} from '../../utils/converters'

const ShippingFees = ({shippingoptions}) => {

  console.log(shippingoptions, shippingoptions === null)
  return (
    <div>
      {Object.entries(shippingoptions).map(([key, value]) => (
        <label>
          <input type={'radio'} name={'shippingOption'} value={key} />
          Livraison {key} - environ {localeMoneyFormat({value})}
        </label>
      ),
      )}
    </div>
  )
}

export default ShippingFees
