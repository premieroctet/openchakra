
import React, {useState} from 'react'
import Autocomplete from '../Autocomplete/Autocomplete'
import {StyledAutocomplete} from '../Autocomplete/Autocomplete.styles'

const DeliveryAddresses = ({address, setAddress}) => {

  const paramsCombobox = {
    itemToString: item => (item ? `${item.address}, ${item.zip_code} ${item.city}` : ''),
    onSelectedItemChange: ({selectedItem}) => {
      setAddress(selectedItem)
    },
  }

  return (
    <StyledAutocomplete noborder={true}>
      <Autocomplete
        urlToFetch={`myAlfred/api/users/addresses`}
        item={address}
        setItem={setAddress}
        paramsCombobox={paramsCombobox}
        errorMsg= 'Aucune adresse trouvée'
        label={null}
        placeholder={`Nom de l'adresse`}
        onChange={e => console.log(e)}
        formattingResult={item => `${item.address}, ${item.zip_code} ${item.city}`}
      />
    </StyledAutocomplete>
  )
    
}


export default DeliveryAddresses
