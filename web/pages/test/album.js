import Box from '../../components/Box/Box'
import Album from '../../components/Album/Album'
import {withTranslation} from 'react-i18next'
import React from 'react'

class AlbumTest extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      users: [],
      user: null,
    }
  }

  render() {
    return(
      <Box>
        <Album user={'5e16f578b9a2462bc340c64e'}/>
      </Box>
    )
  }

}

export default withTranslation('custom', {withRef: true})(AlbumTest)
