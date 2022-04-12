
import React, {useState} from 'react'
import Autocomplete from '../Autocomplete/Autocomplete'
import {StyledAutocomplete} from '../Autocomplete/Autocomplete.styles'

const DeliveryAddresses = () => {

  const [userAddress, setUserAddress] = useState({
    item: null,
  })

  const paramsCombobox = {
    itemToString: item => (item ? `${item.reference}` : ''),
    onSelectedItemChange: ({selectedItem}) => {
      setUserAddress({item: selectedItem})
    },
  }

  return (
    <StyledAutocomplete noborder={true}>
      <Autocomplete
        urlToFetch={`myAlfred/api/users/addresses`}
        item={userAddress}
        setItem={setUserAddress}
        paramsCombobox={paramsCombobox}
        errorMsg= 'Aucune adresse trouvée'
        dbSearchField= 'reference'
        label={null}
        placeholder='1 rue de la poupée'
        formattingResult={item => `${item.reference} - ${item.description} ${item.description_2}`}
      />
    </StyledAutocomplete>
  )
    
}


export default DeliveryAddresses
