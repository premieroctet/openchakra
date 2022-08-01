import {IconButton} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

class CardAlbum extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const{item, onClick, onDelete} = this.props

    if (!item) {
      return null
    }

    const canDelete = !!onDelete

    return (
      <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
        {canDelete &&
          <IconButton size={'small'} style={{float: 'right'}} onClick={() => onDelete && onDelete(item)}>
            <DeleteForeverIcon style={{color: 'gray'}} />
          </IconButton>
        }
        <img src={`/${item.picture || item.path || item}`} width={100} onClick={() => onClick && onClick(item)}/>
        <div>{item.label}</div>
      </Grid>

    )
  }
}

export default withTranslation(null, {withRef: true})(CardAlbum)
