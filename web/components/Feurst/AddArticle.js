import React, {useState, useEffect} from 'react'
import Autocomplete from '../Autocomplete/Autocomplete'
import {StyledAutocomplete} from '../Autocomplete/Autocomplete.styles'
import {API_PATH} from '../../utils/consts'
import {client} from '../../utils/client'
import {snackBarError} from '../../utils/notifications'
import {PleasantButton} from './Button'
import {FormAddArticle, Label, Input, Refquantity} from './components.styles'
import CheckingProduct from './CheckingProduct'

const AddArticle = ({endpoint, orderid, updateTable, addProduct, wordingSection}) => {


  const [article, setArticle] = useState({
    item: null,
    info: null,
    qty: 1,
    showArticlePanel: false,
  })


  const paramsCombobox = {
    itemToString: item => (item ? `${item.reference}` : ''),
    onSelectedItemChange: ({selectedItem}) => {
      setArticle({...article, item: selectedItem})
    },
  }

  const checkProduct = async article => {

    if (article?.item?._id) {
      return await client(`${API_PATH}/${endpoint}/${orderid}/products/${article.item._id}`)
        .then(articleInfoCheck => setArticle({...article, info: articleInfoCheck, showArticlePanel: true}))
        .catch(error => `Cant fetch article info ${error}`)
    }

    snackBarError('Veuillez renseigner une référence')
  }


  return (
    <>
      <FormAddArticle>

        <StyledAutocomplete>
          <Autocomplete
            urlToFetch={`${API_PATH}/products?pattern=`}
            item={article}
            setItem={setArticle}
            paramsCombobox={paramsCombobox}
            errorMsg= 'Aucun article trouvé'
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
            disabled={article.showArticlePanel}
            onChange={ev => !isNaN(parseInt(ev.target.value)) && setArticle({...article, qty: parseInt(ev.target.value)})}
          />
        </Refquantity>
        <PleasantButton disabled={article.showArticlePanel} rounded={'full'} onClick={() => checkProduct(article)}>Vérifier</PleasantButton>


      </FormAddArticle>
      {article.showArticlePanel ? <CheckingProduct endpoint={endpoint} orderid={orderid} updateTable={updateTable} article={article} setArticle={setArticle} addProduct={addProduct} wordingSection={wordingSection} /> : null}

    </>
  )

}

export default AddArticle
