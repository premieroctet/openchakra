import React, {useState, useEffect} from 'react'
import Autocomplete from '../Autocomplete/Autocomplete'
import {StyledAutocomplete} from '../Autocomplete/Autocomplete.styles'
import {PleasantButton} from './Button'
import {FormAddArticle, Label, Input, Refquantity} from './AddArticle.styles'


const AddArticle = ({addProduct, checkProduct}) => {

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
    <FormAddArticle>
      
      <StyledAutocomplete>
        <Autocomplete
          urlToFetch={`myAlfred/api/products?pattern=`}
          item={article}
          setItem={setArticle}
          paramsCombobox={paramsCombobox}
          errorMsg= 'Aucune adresse trouvée'
          dbSearchField= 'reference'
          label={'Réf. catalogue'}
          placeholder='Saissisez la référence du produit'
          formattingResult={item => `${item.reference} - ${item.description} ${item.description_2}`}
        />
      </StyledAutocomplete>
      
      <Refquantity>
        <Label htmlFor="articleQty">Quantité</Label>
        <Input
          type="number"
          id='articleQty'
          placeholder='Qté souhaitée'
          value={article.qty}
          onChange={ev => !isNaN(parseInt(ev.target.value)) && setArticle({...article, qty: parseInt(ev.target.value)})}
        />
      </Refquantity>
      <PleasantButton rounded={'full'} onClick={() => addProduct(article)}>Ajouter</PleasantButton>

    </FormAddArticle>
  )

}

export default AddArticle
