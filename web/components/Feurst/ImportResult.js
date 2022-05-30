import React from 'react'


const ImportWithWarnings = ({created, warnings}) => (<>
  <p>Import partiel&nbsp;: {created.length} sur {warnings.length} produits ajoutés</p>
  <ul>
    {warnings.map}
  </ul>
</>
)

const ImportOK = ({created}) => (
  <p>Import réussi&nbsp;: {created.length} produits ajoutés</p>
)


const ImportResult = data => {

  const {created, warnings} = data

  return (
    <StyledImportResult>
      {warnings.length ?
        <ImportWithWarnings created={created} warnings={warnings} />
        : <ImportOK created={created} />}
    </StyledImportResult>
  )
}

const StyledImportResult = styled.div`
  
`

export default ImportResult
