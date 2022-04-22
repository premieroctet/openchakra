
import React, {useState} from 'react'
import Autocomplete from '../Autocomplete/Autocomplete'
import {StyledAutocomplete} from '../Autocomplete/Autocomplete.styles'

const DeliveryAddresses = ({address, setAddress, onChange}) => {

  const paramsCombobox = {
    itemToString: item => (item ? `${item.label}` : ''),
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
        onChange={onChange}
        paramsCombobox={paramsCombobox}
        errorMsg= 'Aucune adresse trouvée'
        label={null}
        placeholder={`Nom de l'adresse`}
        formattingResult={item => `${item.label} : ${item.address}, ${item.zip_code} ${item.city}`}
      />
    </StyledAutocomplete>
  )

}


export default DeliveryAddresses
