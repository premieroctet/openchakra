import React from 'react'
import styled from 'styled-components'


const ImportWithWarnings = ({created, warnings}) => (<>
  <p>Import partiel&nbsp;: {created.length} sur {warnings.length} produits ajoutés</p>
  <div>
  Erreurs&nbsp;:
    <ul>
      {warnings.map((warn, i) => <li key={`warn${i}`}>{warn}</li>)}
    </ul>

  </div>
</>
)

const ImportOK = ({created}) => (
  <p>Import réussi&nbsp;: {created.length} produits ajoutés</p>
)


const ImportResult = ({result}) => {

  const {created, warnings} = result
  const warnQuantity = warnings?.length

  return (
    <StyledImportResult className={warnQuantity ? 'notok' : 'ok'}>
      {warnQuantity ?
        <ImportWithWarnings created={created} warnings={warnings} />
        : <ImportOK created={created} />}
    </StyledImportResult>
  )
}

const StyledImportResult = styled.div`
  
  
  padding-block: var(--spc-1);
  padding-inline: var(--spc-12);
  color: var(--white);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  border-radius: var(--rounded-7xl);
  
  &.notok {
    background-color: #b15d31;

    p {
      margin-block: var(--spc-1);
    }
  }
  &.ok {
    background-color: #496f1c;
  }

  /* Errors container */
  div {
    display: flex;
    column-gap: var(--spc-4);
    font-size: var(--text-base);

    ul {
      margin-top: 0;
      list-style-type: none;
      padding: 0;
    }
  }
  
`

export default ImportResult
