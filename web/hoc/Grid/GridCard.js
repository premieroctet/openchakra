import React from 'react'
import styled from 'styled-components'

function withGrid(WrappedComponent) {

  return class extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      const {model, page} = this.props

      const indexes=[...Array(model.getRows()*model.getColumns())].map((v, idx) => idx)

      return(
        <AdaptiveGrid columns={model.getColumns()}>
          { indexes.map((idx, index) => {
            const row=Math.floor(idx/model.getColumns())
            const col=idx%model.getColumns()
            const item=model.getData(page, col, row)

            return(
              item!==undefined && <WrappedComponent key={index} {...this.props} item={item} />
            )
          })
          }
        </AdaptiveGrid>
      )
    }
  }
}

const AdaptiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  row-gap: var(--spc-4);
  column-gap: var(--spc-8);
  justify-items: center;
  margin-inline: var(--spc-12);
`

export default withGrid
