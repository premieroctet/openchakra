import React from 'react'
import styled from 'styled-components'


const ImportWithWarnings = ({created, warnings, errors, total}) => {

  const sentence = created
    ? `Import partiel : ${created} sur ${total} ${created > 1 ? 'éléments ajoutés' : 'élément ajouté'}.`
    : `Import non effectué.`

  return (<>
    <p>{sentence}</p>
    <div>
  Erreurs&nbsp;:
      <ul>
        {errors.map((error, i) => <li key={`error${i}`}>{JSON.stringify(error)}</li>)}
        {warnings.map((warn, i) => <li key={`warn${i}`}>{JSON.stringify(warn)}</li>)}
      </ul>
    </div>
  </>
  )
}

const ImportOK = ({created, total}) => (
  <p>Import réussi&nbsp;: {created} {created > 1 ? 'éléments importés' : 'élément importé'}.</p>
)

const ImportResult = ({result}) => {

  const {created, warnings, errors, total} = result
  const warnQuantity = errors?.length || warnings?.length

  return (
    <StyledImportResult className={warnQuantity ? 'notok' : 'ok'}>
      {warnQuantity ?
        <ImportWithWarnings created={created} total={total} warnings={warnings} errors={errors}/>
        : <ImportOK created={created} total={total} />}
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
