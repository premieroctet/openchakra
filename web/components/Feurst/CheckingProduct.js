import React from 'react'
import styled from 'styled-components'
import {withTranslation} from 'react-i18next'
import {screen} from '../../styles/screenWidths'
import {localeMoneyFormat} from '../../utils/converters'
import {snackBarError} from '../../utils/notifications'
import {NormalButton} from './Button'


const CheckingProduct = ({endpoint, orderid, article, setArticle, selectItem, addProduct, wordingSection, t}) => {

  const {info, quantity} = article

  const confirmAdd = async() => {
    await addProduct({endpoint, orderid, ...article})
      .then(() => {
        setArticle({...article, item: null, quantity: null, showArticlePanel: false})
        selectItem(null)
      })
      .catch(() => snackBarError(`Ajout de l'article non effectué`))

  }

  return (info ?
    <>
      <CheckingProductArea role={'status'} aria-live='polite'>
        <dl>
          <dt>Désignation du produit :</dt>
          <dd>{info.description} {info.description_2}</dd>
          <dt>Référence :</dt>
          <dd>{info.reference}</dd>
          <dt>Quantité disponible :</dt>
          <dd>{quantity > info.stock ? `${info.stock || 0} sur ${quantity} ⚠️ stock partiel` : `${quantity} sur ${quantity}`} </dd>
        </dl>
        <dl>
          <dt>Prix catalogue :</dt>
          <dd>{localeMoneyFormat({value: info?.catalog_price})}</dd>
          <dt>Poids unitaire :</dt>
          <dd>{info?.weight?.toLocaleString()} kg</dd>
          <dt>Votre prix :</dt>
          <dd>{localeMoneyFormat({value: info?.net_price})}</dd>
        </dl>

        // TODO RPA: Afficher sur une ligne en-dessous
        {info.components.length>0 && !info.is_assembly && <div>
        Les articles suivants sont liés à la réference {info.reference}, ils seront ajoutés à la commande
        Vous aurez la possibilité de les retirer si nécessaire.
          <ul>
            {info.components.map(c =>
              <li>{c.reference} {c.description} {c.description_2}</li>,
            )}
          </ul>
        </div>
        }
        <NormalButton
          bgColor={`#dabb42`}
          rounded={'full'}
          onClick={confirmAdd}
        >
          {t(`${wordingSection}.addTo`)}
        </NormalButton>

      </CheckingProductArea>
    </>
    : null
  )
}


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
        min-width: 15ch;
      }
  }
`

export default withTranslation('feurst', {withRef: true})(CheckingProduct)
