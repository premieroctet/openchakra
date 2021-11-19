import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'

class CardAlbum extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const{item, onClick} = this.props

    if (!item) {
      return null
    }

    return (
      <Grid>
        <img src={`/${item.picture || item.path || item}`} width={100} onClick={onClick ? () => { onClick(item._id) } : {}}/>
        <div>{item.label}</div>
      </Grid>

    )
  }
}

export default withTranslation('custom', {withRef: true})(CardAlbum)
