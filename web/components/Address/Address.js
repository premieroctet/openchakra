import React, {useState} from 'react'
import {withTranslation} from 'react-i18next'
import {TextField} from '@material-ui/core'

const Address = ({t}) => {

  const [address, setAddress] = useState({})

  const changeAddress = e => setAddress({...address, [e.target.name]: e.target.value})

  return (
    <div>
      <h3>Indiquez l'adresse de livraison</h3>
      
      <div className='grid grid-cols'>
        <TextField label={'rue'} variant='standard' name="street" autoComplete='street-address' value={address?.street} onChange={changeAddress}/>
        <TextField label={'code postal'} variant='standard' type="text" name="postcode" autoComplete='postal-code' value={address?.postcode} onChange={changeAddress} />
        <TextField label={'ville'} variant='standard' type="text" name="city" autoComplete='address-level2' value={address?.city} onChange={changeAddress} />
        <TextField label={'pays'} variant='standard' type="text" name="country" autoComplete='country' value={address?.country} onChange={changeAddress} />
      </div>
      
    </div>
  )
}

export default withTranslation('custom', {withRef: true})(Address)
