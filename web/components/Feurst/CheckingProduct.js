import React from 'react'
import styled from 'styled-components'
import {screen} from '../../styles/screenWidths'
import {localeMoneyFormat} from '../../utils/converters'
import {snackBarError} from '../../utils/notifications'
import {PleasantButton} from './Button'

const CheckingProductArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: var(--gray-200);
  border-radius: var(--rounded-3xl);
  font-weight: var(--font-bold);
  column-gap: var(--spc-6);
  padding-inline: var(--spc-5);
  margin-inline: var(--spc-12);
  margin-bottom: var(--spc-6);

  @media (${screen.md}) {
    grid-template-columns: repeat(3, auto);
    grid-template-columns: auto auto min-content;
  }

  dl:first-of-type {
      border-right: 1px solid var(--black);
      padding-right: var(--spc-8);
      justify-self: end;
  }

  dl {
      display: grid;
      grid-template-columns: max-content auto;
      align-content: center;
      column-gap: var(--spc-2);
      row-gap: var(--spc-2);
      padding: var(--spc-2);
  }

  dd {
    margin-left: 0;
    border-bottom: 1px solid var(--black);
    width: fit-content;
  }

  button {
      align-self: center;

      & > span:last-child {
        font-size: var(--text-base);
        font-weight: var(--font-bold);
        padding: 6px 30px;
        border: 1px solid var(--gray-500);
      }
  }
`


const CheckingProduct = ({article, setArticle, addProduct}) => {

  const {info, qty} = article

  const confirmAdd = async() => {
    const addTo = await addProduct(article)
      .catch(() => snackBarError(`Ajout de l'article non effectué`))

    if (addTo) {
      setArticle({...article, showArticlePanel: false})
    }
    else {
      snackBarError(`Ajout de l'article non effectué`)
    }
  }

  return (
    <CheckingProductArea role={'status'} aria-live='polite'>
      <dl>
        <dt>Désignation du produit :</dt>
        <dd>{info.description} {info.description_2}</dd>
        <dt>Référence :</dt>
        <dd>{info.reference}</dd>
        <dt>Quantité disponible :</dt>
        <dd>{qty > info.stock ? `${info.stock} sur ${qty} ⚠️ stock partiel` : `${qty} sur ${qty}`} </dd>
      </dl>
      <dl>
        <dt>Prix catalogue :</dt>
        <dd>{localeMoneyFormat({value: info.catalog_price})}</dd>
        <dt>Poids unitaire :</dt>
        <dd>{info.weight.toLocaleString()} kg</dd>
        <dt>Votre prix :</dt>
        <dd>{localeMoneyFormat({value: info.net_price})}</dd>
      </dl>

      <PleasantButton
        bgColor={`#dabb42`}
        rounded={'full'}
        onClick={confirmAdd}
      >
        Ajouter&nbsp;à&nbsp;ma commande
      </PleasantButton>

    </CheckingProductArea>
  )
}

export default CheckingProduct
