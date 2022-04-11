
import React, {useState} from 'react'
import Autocomplete from '../Autocomplete/Autocomplete'

const DeliveryAddresses = () => {

  const [article, setArticle] = useState({
    item: null,
    qty: 1,
  })

  const paramsCombobox = {
    itemToString: item => (item ? `${item.reference}` : ''),
    onSelectedItemChange: ({selectedItem}) => {
      setArticle({...article, item: selectedItem})
    },
  }

  return (
    <div>
        
      <Autocomplete
        urlToFetch={`myAlfred/api/products?pattern=`}
        item={article}
        setItem={setArticle}
        paramsCombobox={paramsCombobox}
        errorMsg= 'Aucune adresse trouvée'
        dbSearchField= 'reference'
        label={null}
        placeholder='1 rue de la poupée'
        formattingResult={item => `${item.reference} - ${item.description} ${item.description_2}`}
      />
        
    </div>
  )
    
}


export default DeliveryAddresses
